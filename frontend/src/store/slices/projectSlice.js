import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/projects';

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

export const addProject = createAsyncThunk('projects/addProject', async (projectData) => {
    // If projectData is FormData (for file uploads), axios handles it automatically
    const response = await axios.post(API_URL, projectData);
    return response.data;
});

export const updateProject = createAsyncThunk('projects/updateProject', async ({ id, projectData }) => {
    const response = await axios.put(`${API_URL}/${id}`, projectData);
    return response.data;
});

export const deleteProject = createAsyncThunk('projects/deleteProject', async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});

const projectSlice = createSlice({
    name: 'projects',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(addProject.fulfilled, (state, action) => {
                state.items.unshift(action.payload);
            })
            .addCase(updateProject.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item._id === action.payload._id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item._id !== action.payload);
            });
    },
});

export default projectSlice.reducer;
