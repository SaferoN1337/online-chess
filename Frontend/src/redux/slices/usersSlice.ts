import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Colors } from "../../../../types";

interface UsersInitialState {
    playerColor: Colors
}

const initialState: UsersInitialState = {
    playerColor: "white"
}

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        updateUserColor: (state, action: PayloadAction<{ playerColor: Colors }>)=> {
            state.playerColor = action.payload.playerColor;
        },

        setPlayerColor: (state, action: PayloadAction<{ color: Colors }>)=> {
            state.playerColor = action.payload.color;
        }
    }
});

export const { updateUserColor, setPlayerColor } = usersSlice.actions
export default usersSlice.reducer;
