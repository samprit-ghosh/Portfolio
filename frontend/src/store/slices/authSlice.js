import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        localStorage.setItem('token', response.data.token);
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token'),
        isAuthenticated: !!localStorage.getItem('token'),
        status: 'idle',
        error: null,
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token');
            state.token = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.token = action.payload.token;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.message;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
