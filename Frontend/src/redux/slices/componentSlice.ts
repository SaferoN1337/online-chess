import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface initialStates {
    showRegForm: boolean,
    showAuthPopUp: boolean
}

const initialState: initialStates = {
    showRegForm: false,
    showAuthPopUp: true
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
        }
    }
})

export const { showOrHideAuthPopUp, switchFormToReg } = componentsSlice.actions;
export default componentsSlice.reducer;