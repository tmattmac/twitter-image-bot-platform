require('dotenv').config();
const Twit = require('twit');
const { Storage } = require('@google-cloud/storage');

// init Storage and DB connections in global scope for reuse
const knex = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONN_STRING,
});

const storage = new Storage();
const bucket = storage.bucket(process.env.GCLOUD_BUCKET_NAME);

/**
 * post - post random image from user's Cloud Storage folder to their Twitter account
 * @param message - PubSub message with `id` and `enabled` attributes
 */
exports.post = async function (message) {
  const { enabled, id } = message.attributes;

  if (!(enabled === 'true')) return;

  const [user] = await knex('users')
    .column('id', 'twitter_oauth_token', 'twitter_oauth_secret')
    .where({ id });

  if (!user) {
    console.error(`Schedule with ID ${id} not in database.`);
    return;
  }

  const [files] = await bucket.getFiles({ prefix: `${id}/` });

  if (!files || files.length === 0) {
    return;
  }

  const randomChoice = Math.floor(Math.random() * files.length);
  const image = files[randomChoice];
  const [imageData] = await image.download();
  const { caption } = image.metadata.metadata || {};

  const Twitter = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: user.twitter_oauth_token,
    access_token_secret: user.twitter_oauth_secret,
    timeout_ms: 60 * 1000,
    strictSSL: true,
  });

  try {
    const uploadData = await Twitter.post('media/upload', {
      media_data: imageData.toString('base64'),
    });

    const mediaIdStr = uploadData.data.media_id_string;
    const altText = caption;
    const metaParams = { media_id: mediaIdStr };
    metaParams.alt_text = altText || undefined;

    await Twitter.post('media/metadata/create', metaParams);
    params = {
      status: caption || '',
      media_ids: [mediaIdStr],
    };

    await Twitter.post('statuses/update', params);
  } catch (err) {
    console.error(err);
  }
};
