import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAlertData } from "../../../../types";

interface initialStates {
    showRegForm: boolean,
    showAuthPopUp: boolean,
    authAlertData: null | IAlertData
}

const initialState: initialStates = {
    showRegForm: false,
    showAuthPopUp: true,
    authAlertData: null
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
        }
    }
})

export const { showOrHideAuthPopUp, switchFormToReg, setAuthAlertData } = componentsSlice.actions;
export default componentsSlice.reducer;