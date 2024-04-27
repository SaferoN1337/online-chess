import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Colors } from "../../../../types";

interface UsersInitialState {
    playerColor: Colors
    accessToken: null | string
    accessTokenExpiration: number
}

const initialState: UsersInitialState = {
    playerColor: "white",
    accessToken: null,
    accessTokenExpiration: 0,
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
        },

        setAccessToken: (state, action: PayloadAction<{ accessToken: string | null, accessTokenExpiration: number }>)=> {
            state.accessToken = action.payload.accessToken;
            state.accessTokenExpiration = action.payload.accessTokenExpiration;
        }
    }
});

export const { updateUserColor, setPlayerColor, setAccessToken } = usersSlice.actions
export default usersSlice.reducer;
