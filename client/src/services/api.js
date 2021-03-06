import axios from 'axios';
import { v4 as uuid } from 'uuid';

const isImage = (file) => file.type.startsWith('image');

class APIClient {
  constructor() {
    this._axios = axios.create({
      baseURL: '/api',
    });
    this._uploadQueue = []; // TODO: Use an actual queue implementation
    this.uploadFile = this.uploadFile.bind(this);
  }

  getAll() {
    return this._axios.get('/images').then((response) => response.data.files);
  }

  update(id, metadata) {
    return this._axios
      .patch(`/images/${id}`, { metadata })
      .then((response) => response.data);
  }

  queueFileUploads(fileList) {
    const uploadFile = this.uploadFile;
    const queue = this._uploadQueue;

    const uploads = [];

    [...fileList].forEach((file) => {
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
        };
        queue.push(upload);
      });

      uploads.push({
        clientId,
        request,
        file,
      });
    });

    // immediately dequeue first set of uploads
    queue.splice(0, 5).forEach((upload) => upload());

    return uploads;
  }

  uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    const _axios = this._axios;

    return new Promise((resolve, reject) => {
      _axios
        .post('/images', formData)
        .then((response) => resolve(response.data))
        .catch(reject);
    });
  }

  delete(id) {
    return this._axios.delete(`/images/${id}`);
  }

  getSchedule() {
    return this._axios
      .get('/schedule')
      .then((response) => response.data.options);
  }

  updateSchedule(options) {
    const timeZone = new Intl.DateTimeFormat().resolvedOptions().timeZone;

    return this._axios.patch('/schedule', {
      options: {
        ...options,
        timeZone,
      },
    });
  }
}

const instance = new APIClient();
export default instance;
