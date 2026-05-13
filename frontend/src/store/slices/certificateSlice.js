import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/certificates';

export const fetchCertificates = createAsyncThunk('certificates/fetchCertificates', async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

export const addCertificate = createAsyncThunk('certificates/addCertificate', async (certificateData) => {
    const response = await axios.post(API_URL, certificateData);
    return response.data;
});

export const updateCertificate = createAsyncThunk('certificates/updateCertificate', async ({ id, certificateData }) => {
    const response = await axios.put(`${API_URL}/${id}`, certificateData);
    return response.data;
});

export const deleteCertificate = createAsyncThunk('certificates/deleteCertificate', async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});

const certificateSlice = createSlice({
    name: 'certificates',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCertificates.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(addCertificate.fulfilled, (state, action) => {
                state.items.unshift(action.payload);
            })
            .addCase(updateCertificate.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item._id === action.payload._id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(deleteCertificate.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item._id !== action.payload);
            });
    },
});

export default certificateSlice.reducer;
