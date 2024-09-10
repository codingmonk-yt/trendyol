import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
import appReducer from './slices/app';
import userReducer from "./slices/user";
import adminReducer from "./slices/admin";

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
};

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  admin: adminReducer,
});

export { rootPersistConfig, rootReducer };