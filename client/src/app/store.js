import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../actions/postsSlice";

export const store = configureStore({
    reducer:{
        posts:postsReducer
    }
})