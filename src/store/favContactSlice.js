import React from 'react';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    contactKeys: [] // This will hold the keys of favorite contacts
};

const favContactSlice = createSlice({
    name: 'favContactList',
    initialState,
    reducers: {
        setContactKeys: (state, action) => {
            const { key, favKey } = action.payload;
            state.contactKeys.push({ key, favKey });
            console.log("Updated contactKeys:", JSON.stringify(state.contactKeys, null, 2));
        },
        removeContactKey: (state, action) => {
            const keyToRemove = action.payload;
            state.contactKeys = state.contactKeys.filter(contact => contact.key !== keyToRemove);
            console.log("Updated contactKeys:", JSON.stringify(state.contactKeys, null, 2));
        },
    }
});

export const favContactSliceActions = favContactSlice.actions;
export default favContactSlice;
