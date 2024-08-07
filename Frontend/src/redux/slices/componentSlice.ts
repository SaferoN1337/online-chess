import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAlertData, IGameData } from "../../../../types";

interface initialStates {
    showRegForm: boolean,
    showAuthPopUp: boolean,
    authAlertData: null | IAlertData,
    showGameResult: boolean,
    listOfGames: IGameData[],
    showCreateNewGame: boolean
}

const initialState: initialStates = {
    showRegForm: false,
    showAuthPopUp: false,
    authAlertData: null,
    showGameResult: false,
    listOfGames: [],
    showCreateNewGame: true
}

export const componentsSlice = createSlice({
    name: "components",
    initialState,
    reducers: {
        showOrHideAuthPopUp(state, action: PayloadAction<boolean>) {
            state.showAuthPopUp = action.payload;
        },

        switchFormToReg(state, action: PayloadAction<boolean>) {
            state.showRegForm = action.payload;
        },

        setAuthAlertData(state, action: PayloadAction<null | IAlertData>) {
            state.authAlertData = action.payload;
        },

        setShowGameResult(state, action: PayloadAction<boolean>) {
            state.showGameResult = action.payload;
        },

        setListOfGames(state, action: PayloadAction<IGameData[]>) {
            state.listOfGames = action.payload;
        },

        setShowCreateNewGame(state, action: PayloadAction<boolean>) {
            state.showCreateNewGame = action.payload;
        }
    }
})

export const {
    showOrHideAuthPopUp,
    switchFormToReg,
    setAuthAlertData,
    setShowGameResult,
    setListOfGames,
    setShowCreateNewGame
} = componentsSlice.actions;
export default componentsSlice.reducer;