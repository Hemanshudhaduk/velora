import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    email: "",
    accessToken: "",
    isAuthenticated: false,
  },
  userDetail: {},
  geoLocation: false,
  locationChanged: false,
};
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    login: (state, { payload }) => {
      state.data.accessToken = payload.accessToken;
      state.data.email = payload.userName;
      state.data.isAuthenticated = payload.isAuthenticated;
    },
    userDetail: (state, { payload }) => {
      state.userDetail = payload.userDetail;
    },
    geoLocation: (state, { payload }) => {
      state.geoLocation = payload.geoLocation;
    },
    locationChanged: (state, { payload }) => {
      state.locationChanged = payload.locationChanged;
    },
  },
});

export const { login, userDetail, geoLocation, locationChanged } = userSlice.actions;

export const selectUser = ({ user }) => user;

export const selectUserDetail = ({ user }) => user.userDetail;

export const selectGeoLocation = ({ user }) => user.geoLocation;

export const selectLocationChanged = ({ user }) => user.locationChanged;

export default userSlice.reducer;
