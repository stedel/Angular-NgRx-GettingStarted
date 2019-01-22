export function userReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_MASK_USERNAME':
      return { ...state, maskUserName: action.payload };

    default:
      return state;
  }
}
