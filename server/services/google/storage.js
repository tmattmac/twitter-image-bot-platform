const { Storage } = require('@google-cloud/storage');
const { v4: uuid } = require('uuid');

const storage = new Storage();

async function createBucket(id) {
  await storage.createBucket(id);
  // TODO: Use folders instead of buckets
}

async function uploadToBucket(id, inputFileBuffer) {

  return new Promise((resolve, reject) => {
    const bucket = storage.bucket("natsuki-bot.appspot.com");
    const fileId = uuid();
    const fileObject = bucket.file(fileId);
    
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

module.exports = { 
  createBucket,
  uploadToBucket
}