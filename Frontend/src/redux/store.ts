import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./slices/gameSlice";
import usersSlice from "./slices/usersSlice";

export const store = configureStore({
    reducer: {
        users: usersSlice,
        game: gameSlice
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch