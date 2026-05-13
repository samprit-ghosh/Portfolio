import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/skills';

export const fetchSkills = createAsyncThunk('skills/fetchSkills', async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

export const addSkill = createAsyncThunk('skills/addSkill', async (skillData) => {
    const response = await axios.post(API_URL, skillData);
    return response.data;
});

export const updateSkill = createAsyncThunk('skills/updateSkill', async ({ id, skillData }) => {
    const response = await axios.put(`${API_URL}/${id}`, skillData);
    return response.data;
});

export const deleteSkill = createAsyncThunk('skills/deleteSkill', async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});

const skillSlice = createSlice({
    name: 'skills',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSkills.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(addSkill.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateSkill.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item._id === action.payload._id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(deleteSkill.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item._id !== action.payload);
            });
    },
});

export default skillSlice.reducer;
