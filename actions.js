import { createActions } from 'redux-actions';
import { DefaultRoutine } from 'utils';

const Actions = createActions({
  POSTS: {
    CREATE: DefaultRoutine
  },
});

export default Actions;
