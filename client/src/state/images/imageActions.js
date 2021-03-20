import { DEFAULT_FETCH_ERROR } from '../../lib/constants';
import APIClient from '../../services/api';

const api = new APIClient();

export const actions = {
  FETCH_DATA: 'FETCH_DATA',
  FETCH_DATA_FAILURE: 'FETCH_DATA_FAILURE',
  IMAGE_UPLOAD: 'IMAGE_UPLOAD',
  IMAGE_UPLOAD_SUCCESS: 'IMAGE_UPLOAD_SUCCESS',
  IMAGE_UPLOAD_FAILURE: 'IMAGE_UPLOAD_FAILURE',
  IMAGE_UPLOAD_RETRY: 'IMAGE_UPLOAD_RETRY',
  IMAGE_CAPTION_UPDATE: 'IMAGE_CAPTION_UPDATE',
  IMAGE_CAPTION_UPDATE_SUCCESS: 'IMAGE_CAPTION_UPDATE_SUCCESS',
  IMAGE_CAPTION_UPDATE_FAILURE: 'IMAGE_CAPTION_UPDATE_FAILURE',
  IMAGE_SELECTED: 'IMAGE_SELECTED',
  IMAGE_UNSELECTED: 'IMAGE_UNSELECTED',
  IMAGE_DELETE: 'IMAGE_DELETE',
  IMAGE_DELETE_SUCCESS: 'IMAGE_DELETE_SUCCESS',
  IMAGE_DELETE_FAILURE: 'IMAGE_DELETE_FAILURE'
}

export function fetchData() {
  return (dispatch) => {
    api.getAll()
      .then(data => {
        const transformedData = data.map(image => {
          return Object.assign(image, {
            clientId: null,
            status: {
              upload: {
                pending: false,
                error: null,
                file: null
              },
              edit: {
                pending: false,
                error: null
              },
              delete: {
                pending: false,
                error: null
              }
            }
          });
        });
    
        dispatch({
          type: actions.FETCH_DATA,
          payload: transformedData
        });
      })
      .catch(err => {
        dispatch({
          type: actions.FETCH_DATA_FAILURE,
          error: err.response?.data?.message || DEFAULT_FETCH_ERROR
        })
      })
  }
}

export function uploadFiles(files) {
  return (dispatch) => {
    const uploads = api.queueFileUploads(files);

    dispatch({
      type: actions.IMAGE_UPLOAD,
      payload: uploads.map(upload => ({
        ...upload,
        url: URL.createObjectURL(upload.file)
      }))
    });

    uploads.forEach(upload => {
      upload.request
        .then(data => {
          dispatch({
            type: actions.IMAGE_UPLOAD_SUCCESS,
            payload: {
              id: data.id,
              clientId: upload.clientId
            }
          })
        })
        .catch(error => {
          dispatch({
            type: actions.IMAGE_UPLOAD_FAILURE,
            payload: {
              clientId: upload.clientId
            },
            error: error.response?.data?.message || DEFAULT_FETCH_ERROR
          })
        })
    });
  }
}