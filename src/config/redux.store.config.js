import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../lib/redux/auth.slice';

export default configureStore({
  reducer: {
    auth: authReducer
  }
});
