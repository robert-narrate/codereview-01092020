import _ from 'lodash';
import { handleActionsImmer } from 'utils';
import Actions from 'actions';

const form = {
  values: null,
  error: null,
  submitting: false,
  accessImage: null,
  accessImageMeta: null,
  loading: false,
};

export const initialState = {
  create: form
};

const {
  posts: {
    create
  },
} = Actions;

const Reducer = handleActionsImmer(
  {
    [create.trigger]: (draft, data) => {
      draft.create.loading = true;
      draft.create.accessImage = data.accessImage;
    },
    [create.fulfill]: draft => {
      draft.create.loading = false;
    },
  },
  initialState,
);

export default Reducer;
