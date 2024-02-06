import { configureStore } from "@reduxjs/toolkit";

/* Reducers */
import userReducer from "./user.slice";
// import postReducer from "./post.slice";
// import commentReducer from "./comment.slice";


export const store = configureStore({
    reducer: {
        user: userReducer,
        // posts: postReducer,
        // comments: commentReducer,
    },
});