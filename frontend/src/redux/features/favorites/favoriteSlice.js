import { createSlice } from "@reduxjs/toolkit";
const favoriteSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    addToFavorites: (state, action) => {
      ///check if the Project already exists
      if (!state.some((product) => product._id === action.payload._id)) {
        state.push(action.payload);
      }
    },
    removeFromFavorites: (state, action) => {
      ///remove the product
      return state.filter((product) => product._id !== action.payload._id);
    },
    setFavorites: (state, action) => {
      ////set the Favorites
      return action.payload;
    },
  },
});
export const { addToFavorites, removeFromFavorites, setFavorites } =
  favoriteSlice.actions;
export const selectFavoriteProduct = (state) => state.favorites;
export default favoriteSlice.reducer;
