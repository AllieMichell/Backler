import initialState from './initialState';

export default function courseReducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_BOOLEAN_DIALOG_LOGIN':
      return Object.assign({}, state, {
        showDialog: action.value
      });

    default:
      return state;
  }
}
