import { createSlice } from "@reduxjs/toolkit";

// Initial state of the Restaurant, with all values set to null.
const initialState = {
  restaurant: {
    id: null,
    imgUrl: null,
    title: null,
    rating: null,
    genre: null,
    address: null,
    short_description: null,
    dishes: null,
  },
};

// Creating a slice of the Restaurant slice of the store.
export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setRestaurant: (state, action) => {
        state.restaurant = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRestaurant } = restaurantSlice.actions;

// Selector that access the global store and pull the items from the basket slice.
export const selectRestaurant = (state) => state.restaurant.restaurant;

export default restaurantSlice.reducer;
