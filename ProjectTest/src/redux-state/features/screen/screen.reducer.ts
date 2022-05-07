import { ActionRedux } from '@utils/types/redux'
import { ScreenType } from '@utils/types/screen'
import { HYDRATE } from 'next-redux-wrapper'
import actionTypes, { ScreenConstantsTypes } from './screen.constant'
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

export type ScreenStateType = {
  screen_type?: ScreenType
}

const initialState: ScreenStateType = {
  screen_type: 'laptop',
}

function reducer(
  state: ScreenStateType = initialState,
  action: ActionRedux<ScreenConstantsTypes & typeof HYDRATE, ScreenStateType>
): ScreenStateType {
  switch (action.type) {
    case actionTypes.SET_SCREEN_TYPE:
      return { ...state, screen_type: action.payload.screen_type }

    default:
      return state
  }
}

export default reducer

// redux persist
const screenPersistConfig = {
  storage,
  key: "screen"
};
export const screenPersistReducer = persistReducer(screenPersistConfig, reducer)