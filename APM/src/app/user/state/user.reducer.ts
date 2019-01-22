import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface UserState {
  maskUserName: boolean;
}

const initialState: UserState = {
  maskUserName: false,
};

const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getMaskUserName = createSelector(
  getUserFeatureState,
  state => state.maskUserName,
);

export function userReducer(state = initialState, action): UserState {
  switch (action.type) {
    case 'TOGGLE_MASK_USERNAME':
      return { ...state, maskUserName: action.payload };

    default:
      return state;
  }
}
