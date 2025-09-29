import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import LanguageReducer from "./slice/languageSlice";
import userReducer from "./slice/userSlice";

const store = configureStore({
  reducer: {
    language: LanguageReducer,
    user: userReducer,
  },
});

export const rootReducer = combineReducers({
  language: LanguageReducer,
});

export default store;
