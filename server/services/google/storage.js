const { Storage } = require('@google-cloud/storage');
const { v4: uuid } = require('uuid');

const { GCLOUD_BUCKET_NAME } = process.env;

const storage = new Storage();

async function createBucket(id) {
  await storage.createBucket(id);
  // TODO: Use folders instead of buckets
}

function uploadToBucket(id, inputFileBuffer, contentType) {

  return new Promise((resolve, reject) => {
    const bucket = storage.bucket(GCLOUD_BUCKET_NAME);
    const fileId = uuid();
    const fileObject = bucket.file(`${id}/${fileId}`);
    
    // TODO: Set caching metadata on file
    const output = fileObject.createWriteStream({
      resumable: false,
      metadata: {
        contentType
      }
    });

    output.on('finish', () => resolve(fileId));
    output.on('error', (err) => reject(err));
    inputFileBuffer.pipe(output);

  });
}

async function getFilesFromBucket(id) {
  const bucket = storage.bucket(GCLOUD_BUCKET_NAME);
  const files = await bucket.getFiles({ prefix: `${id}/` });
  return files[0];
}

async function getFileFromBucket(id, fileId) {
  const bucket = storage.bucket(GCLOUD_BUCKET_NAME);
  const file = bucket.file(`${id}/${fileId}`);
  const metadata = await file.getMetadata();
  const { contentType } = metadata[0];
  return [file.createReadStream(), contentType];
}

function updateFileMetadata(id, fileId, metadata) {
  const bucket = storage.bucket(GCLOUD_BUCKET_NAME);
  const file = bucket.file(`${id}/${fileId}`);
  
  const { caption } = metadata;
  return file.setMetadata({
    metadata: {
      caption
    }
  });
}

function deleteFile(id, fileId) {
  const bucket = storage.bucket(GCLOUD_BUCKET_NAME);
  const file = bucket.file(`${id}/${fileId}`);
  
  return file.delete();
}

module.exports = { 
  createBucket,
  uploadToBucket,
  getFilesFromBucket,
  getFileFromBucket,
  updateFileMetadata,
  deleteFile
}