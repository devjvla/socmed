import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import UserServices from "../services/user.services";
import UserServices from "../services/user.services";

export const googleSignIn = createAsyncThunk(
    `users/signin`,
    async (access_token) => {
        return await UserServices.googleSignIn(access_token);
    }
)

export const signoutUser = createAsyncThunk(
    `users/signout`,
    async () => {
        // return await UserServices.signoutUser();
    }
)

export const userSlice = createSlice({
    name: "user",
    initialState: {user_info: null},
    reducers: {},
    extraReducers: (builder) => {
        builder
            /* googleSignIn-related */
            .addCase(googleSignIn.pending, (state) => {
                console.log("GOOGLE SIGN IN | PENDING");
            })
            .addCase(googleSignIn.fulfilled, (state, action) => {
                console.log("GOOGLE SIGN IN | FULFILLED");
                console.log(action);

                if(action.payload.status){
                    state.user_info = action.payload.result;
                }
            })
            .addCase(googleSignIn.rejected, (state, action) => {
                console.log("GOOGLE SIGN IN | REJECTED");
                console.log(action);
            })
            /* signoutUser-related */
            .addCase(signoutUser.pending, (state) => {
                console.log("SIGN OUT USER | PENDING");
            })
            .addCase(signoutUser.fulfilled, (state, action) => {
                console.log("SIGN OUT USER | FULFILLED");

                if(action.payload.status){
                    state.user_info = null;
                }
            })
            .addCase(signoutUser.rejected, (state, action) => {
                console.log("SIGN OUT USER | REJECTED");
            })
    }
});

export const userActions = {...userSlice.actions};
export default userSlice.reducer;