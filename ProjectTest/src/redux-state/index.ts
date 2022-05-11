import { createWrapper, Context } from 'next-redux-wrapper'
import reducer from './reducer'
import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore
} from "redux-persist";
import runSagas, { sagaMiddleware } from './saga';

const isDev = process.env.NODE_ENV !== 'production'
const blackListedAction = [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER];
const middlewares = [sagaMiddleware]

const initialStore = () => {
  const toolkitStore = configureStore({
    reducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [...blackListedAction]
        }
      }).concat(middlewares),
    devTools: process.env.NODE_ENV !== "production"
  });

  runSagas()
  
  return toolkitStore
}

const store = initialStore()

const makeStore = () => store

export type AppState = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof store.getState>
export const wrapper = createWrapper<AppState>(makeStore);
export const persistor = persistStore(store);


export { default as runReduxSaga } from './saga'
export default store;