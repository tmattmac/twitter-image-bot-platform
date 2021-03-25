import { DEFAULT_FETCH_ERROR } from '../../lib/constants';
import api from '../../services/api';

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
  IMAGE_CAPTION_CLEAR_ERROR: 'IMAGE_CAPTION_CLEAR_ERROR',
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
        dispatch({
          type: actions.FETCH_DATA,
          payload: data
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

export function updateImageCaption(id, caption) {
  return (dispatch) => {
    dispatch({
      type: actions.IMAGE_CAPTION_UPDATE,
      payload: { id }
    });

    api.update(id, { caption })
      .then(() => {
        dispatch({
          type: actions.IMAGE_CAPTION_UPDATE_SUCCESS,
          payload: { id, caption }
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: actions.IMAGE_CAPTION_UPDATE_FAILURE,
          payload: { id },
          error: error.response?.data?.message || DEFAULT_FETCH_ERROR
        })
      })
  }
}

export function clearEditError(id) {
  return {
    type: actions.IMAGE_CAPTION_CLEAR_ERROR,
    payload: { id }
  }
}