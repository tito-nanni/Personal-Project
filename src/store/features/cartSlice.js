import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.items.push(action.payload);
        },
        removeFromCart: (state, action) => {
            const index = state.items.findIndex(item => item.id === action.payload);
            if (index !== -1 ) {
                state.items.splice(index, 1)
            }
        },
        // Add other reducers like updateQuantity, clearCart if needed
    }
})

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer