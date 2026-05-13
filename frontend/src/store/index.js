import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './slices/projectSlice';
import skillReducer from './slices/skillSlice';
import authReducer from './slices/authSlice';
import certificateReducer from './slices/certificateSlice';

export const store = configureStore({
    reducer: {
        projects: projectReducer,
        skills: skillReducer,
        auth: authReducer,
        certificates: certificateReducer,
    },
});
