import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import videoReducer from './features/videoSlice';
import themeReducer from './features/Theme';
import commentReducer from './features/commentSlice';
import profileReducer from './features/profileSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}
const rootReducer = combineReducers({
  user: userReducer,
  video: videoReducer,
  theme: themeReducer,
  comment: commentReducer,
  profile: profileReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
export const persistor = persistStore(store)