import { createSlice } from "@reduxjs/toolkit";

// Initial state of the basket is set to an empty array.
const initialState = {
  items: [],
};

// Creating a slice of the Basket slice of the store.
export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      // Keep whatever is in the basket, and add the new dish to it.
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      // Check if the ID we are giving is in the basket.
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      // Creating a copy of the basket
      let newBasket = [...state.items];
      // Checking if there's anything in the basket
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          "Can't remove product (id: ${action.payload.id}) as it's not in the basket"
        );
      }
      // Replacing the basket with the new one.
      state.items = newBasket;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selector that access the global store and pull the items from the basket slice.
export const selectBasketItems = (state) => state.basket.items;

export const selectBasketItemsWithId = (state, id) =>
  state.basket.items.filter((item) => item.id === id);

// Helper function to calculate the total price of the basket.
export const selectBasketTotal = (state) =>
  state.basket.items.reduce((total, item) =>(total += item.price), 0);

export default basketSlice.reducer;
