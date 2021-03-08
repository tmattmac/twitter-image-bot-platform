const { Storage } = require('@google-cloud/storage');
const { v4: uuid } = require('uuid');

const { GCLOUD_BUCKET_NAME } = process.env;

const storage = new Storage();

async function createBucket(id) {
  await storage.createBucket(id);
  // TODO: Use folders instead of buckets
}

async function uploadToBucket(id, inputFileBuffer) {

  return new Promise((resolve, reject) => {
    const bucket = storage.bucket(GCLOUD_BUCKET_NAME);
    const fileId = uuid();
    const fileObject = bucket.file(`${id}/${fileId}`);
    
    // TODO: Set caching metadata on file
    const output = fileObject.createWriteStream({
      resumable: false
    });

    output.on('pipe', () => console.log('piping'));
    output.on('finish', () => resolve(fileId));
    output.on('error', (err) => reject(err));
    inputFileBuffer.pipe(output);

  });
}

async function getFilesFromBucket(id) {
  const bucket = storage.bucket(GCLOUD_BUCKET_NAME);
  return bucket.getFiles({ prefix: `${id}/` });
}

module.exports = { 
  createBucket,
  uploadToBucket,
  getFilesFromBucket
}