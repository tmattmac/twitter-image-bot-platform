const knex = require('../db');

const getOrCreateUser = async (id, profile, token, tokenSecret) => {
  const [user] = await knex('users')
    .insert({
      id,
      display_name: profile.displayName,
      avatar: profile.photos[0].value,
      twitter_oauth_token: token,
      twitter_oauth_secret: tokenSecret,
    })
    .onConflict('id')
    .merge()
    .returning(['id', 'display_name', 'avatar']);
  return user;
};

const getUser = async (id) => {
  const [user] = await knex('users')
    .column('id', 'display_name', 'avatar')
    .where({ id });
  return user;
};

module.exports = {
  getUser,
  getOrCreateUser,
};
