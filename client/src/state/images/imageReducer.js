import { defaultsDeep, pick } from 'lodash';
import { actions } from './imageActions';

const defaultImageState = {
  id: null,
  caption: '',
  url: '',
  clientId: null,
  status: {
    upload: {
      pending: false,
      error: null,
      file: null,
    },
    edit: {
      pending: false,
      error: null,
    },
    delete: {
      pending: false,
      error: null,
    },
  },
};

export const initialState = {
  images: [],
  loaded: false,
  error: null,
};

const imageReducer = (state, action) => {
  switch (action.type) {
    case actions.FETCH_DATA:
      return {
        ...state,
        loaded: true,
        error: null,
        images: action.payload.map((image) => {
          return defaultsDeep(
            pick(image, ['id', 'url', 'caption']),
            defaultImageState
          );
        }),
      };

    case actions.FETCH_DATA_FAILURE:
      return {
        ...state,
        loaded: false,
        error: action.error,
      };

    case actions.IMAGE_UPLOAD:
      const newImages = action.payload.map((image) => {
        const newImage = defaultsDeep(
          pick(image, ['clientId', 'url']),
          defaultImageState
        );
        newImage.status.upload.pending = true;
        newImage.status.upload.file = image.file;
        return newImage;
      });
      return {
        ...state,
        images: [...newImages, ...state.images],
      };

    case actions.IMAGE_UPLOAD_SUCCESS:
      return {
        ...state,
        images: state.images.map((image) => {
          if (image.clientId === action.payload.clientId) {
            return {
              ...image,
              id: action.payload.id,
              status: {
                ...image.status,
                upload: {
                  pending: false,
                  file: null,
                  error: null,
                },
              },
            };
          }
          return image;
        }),
      };

    case actions.IMAGE_UPLOAD_FAILURE:
      return {
        ...state,
        // TODO: Handle upload errors more elegantly
        images: state.images.filter((image) => {
          if (image.clientId === action.payload.clientId) {
            return false;
          }
          return image;
        }),
      };

    case actions.IMAGE_UPLOAD_RETRY:
      return {
        ...state,
        images: state.images.map((image) => {
          if (image.clientId === action.payload.clientId) {
            return {
              ...image,
              status: {
                ...image.status,
                upload: {
                  ...image.status.upload,
                  pending: true,
                  error: null,
                },
              },
            };
          }
          return image;
        }),
      };

    case actions.IMAGE_CAPTION_UPDATE:
      return {
        ...state,
        images: state.images.map((image) => {
          if (image.id === action.payload.id) {
            return {
              ...image,
              status: {
                ...image.status,
                edit: {
                  pending: true,
                  error: null,
                },
              },
            };
          }
          return image;
        }),
      };

    case actions.IMAGE_CAPTION_UPDATE_SUCCESS:
      return {
        ...state,
        images: state.images.map((image) => {
          if (image.id === action.payload.id) {
            return {
              ...image,
              caption: action.payload.caption,
              status: {
                ...image.status,
                edit: {
                  pending: false,
                  error: null,
                },
              },
            };
          }
          return image;
        }),
      };

    case actions.IMAGE_CAPTION_UPDATE_FAILURE:
      return {
        ...state,
        images: state.images.map((image) => {
          if (image.id === action.payload.id) {
            return {
              ...image,
              status: {
                ...image.status,
                edit: {
                  pending: false,
                  error: action.error,
                },
              },
            };
          }
          return image;
        }),
      };

    case actions.IMAGE_CAPTION_CLEAR_ERROR:
      return {
        ...state,
        images: state.images.map((image) => {
          if (image.id === action.payload.id) {
            return {
              ...image,
              status: {
                ...image.status,
                edit: {
                  ...image.status.edit,
                  error: null,
                },
              },
            };
          }
          return image;
        }),
      };

    case actions.IMAGE_DELETE:
      return {
        ...state,
        images: state.images.map((image) => {
          if (image.id === action.payload.id) {
            return {
              ...image,
              status: {
                ...image.status,
                delete: {
                  pending: true,
                  error: null,
                },
              },
            };
          }
          return image;
        }),
      };

    case actions.IMAGE_DELETE_SUCCESS:
      return {
        ...state,
        images: state.images.filter((image) => {
          if (image.id === action.payload.id) {
            return false;
          }
          return image;
        }),
      };

    case actions.IMAGE_DELETE_FAILURE:
      return {
        ...state,
        images: state.images.map((image) => {
          if (image.id === action.payload.id) {
            return {
              ...image,
              status: {
                ...image.status,
                delete: {
                  pending: false,
                  error: action.error,
                },
              },
            };
          }
          return image;
        }),
      };

    default:
      return state;
  }
};

export default imageReducer;
