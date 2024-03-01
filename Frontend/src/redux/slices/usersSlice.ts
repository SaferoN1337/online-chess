import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UsersInitialState {
    playerColor: "black" | "white"
}

const initialState: UsersInitialState = {
    playerColor: "black"
}

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        updateUserColor: (state, action: PayloadAction<{ playerColor: "black" | "white" }>)=> {
            state.playerColor = action.payload.playerColor;
        }
    }
});

export const { updateUserColor } = usersSlice.actions
export default usersSlice.reducer;
