import axios from 'axios';
import { v4 as uuid } from 'uuid';

const isImage = (file) => file.type.startsWith('image');

export default {
  _axios: axios.create(),

  _uploadQueue: [], // TODO: Use an actual queue implementation

  getAll() {
    this._axios.get('/api/images').then(response => response.data.files);
  },

  queueFileUploads(fileList) {
    const uploadFile = this.uploadFile;
    const queue = this._uploadQueue;

    const uploads = [];

    fileList.forEach(file => {
      if (!isImage(file)) return; // consider showing an error instead
      const clientId = uuid();
      
      const request = new Promise((resolve, reject) => {
        const upload = () => {
          uploadFile(file)
            .then(resolve)
            .catch(reject)
            .finally(() => {
              if (queue.length > 0) {
                const nextUpload = queue.shift();
                nextUpload();
              }
            });
        }
        queue.push(upload);
      });

      // immediately dequeue first set of uploads
      queue.splice(0, 5).forEach(upload => upload());

      uploads.push({
        clientId,
        request,
        file
      });
    });

    return uploads;
  },

  uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    return new Promise((resolve, reject) => {
      this._axios.post('/api/images', formData)
        .then((response) => resolve(response.data))
        .catch(reject);
    });
    
  }
}