import { configureStore } from "@reduxjs/toolkit";
import contactSliceReducer from "./contact-slice"
import favContactSlice from "./favContactSlice";

const store=configureStore({
    reducer:{
        contact:contactSliceReducer,
        favContact:favContactSlice.reducer
    }
    
})
export default store;