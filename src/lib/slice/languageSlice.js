import { createSlice } from "@reduxjs/toolkit";

const languageSlice = createSlice({
  name: "language",
  initialState: { language: "en" },
  reducers: {
    languageSwitch: (state, { payload }) => {
      state.language = payload.languageSwitch;
    },
  },
});

export const { languageSwitch } = languageSlice.actions;

export const selectLanguage = ({ language }) => language.language;

export default languageSlice.reducer;
