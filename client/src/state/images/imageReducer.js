import { defaults, pick } from 'lodash';
import { actions } from './imageActions';

const defaultImageState = {
  id: null,
  source: '',
  url: '',
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
}

export const initialState = {
  images: [],
  loaded: false,
  error: null,
}

export default (state, action) => {
  switch (action.type) {
    case actions.FETCH_DATA:
      return {
        ...state,
        loaded: true,
        error: null,
        images: action.payload.map(image => {
          return defaults(
            pick(image, ['id', 'url', 'source']),
            defaultImageState
          )
        })
      }
    
    case actions.FETCH_DATA_FAILURE:
      return {
        ...state,
        loaded: false,
        error: action.error
      }
    
    case actions.IMAGE_UPLOAD:
      const newImages = action.payload.map(image => {
        const newImage = defaults(
          pick(image, ['clientId', 'url']),
          defaultImageState
        );
        newImage.status.upload.pending = true;
        newImage.status.upload.file = image.file;
        return newImage;
      });
      return {
        ...state,
        images: [...newImages, ...state.images]
      }
    
    case actions.IMAGE_UPLOAD_SUCCESS:
      return {
        ...state,
        images: state.images.map(image => {
          if (image.clientId === action.payload.clientId) {
            return {
              ...image,
              id: action.payload.id,
              status: {
                ...image.status,
                upload: {
                  pending: false,
                  file: null,
                  error: null
                }
              }
            }
          }
          return image;
        })
      }
    
    case actions.IMAGE_UPLOAD_FAILURE:
      return {
        ...state,
        images: state.images.map(image => {
          if (image.clientId === action.payload.clientId) {
            return {
              ...image,
              status: {
                ...image.status,
                upload: {
                  ...image.status.upload,
                  pending: false,
                  error: action.error
                }
              }
            }
          }
          return image;
        })
      }
    
    case actions.IMAGE_UPLOAD_RETRY:
      return {
        ...state,
        images: state.images.map(image => {
          if (image.clientId === action.payload.clientId) {
            return {
              ...image,
              status: {
                ...image.status,
                upload: {
                  ...image.status.upload,
                  pending: true,
                  error: null
                }
              }
            }
          }
        })
      }
  }
}