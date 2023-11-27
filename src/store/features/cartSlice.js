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
        clearCart: (state) => {
            state.items = []
        },
        updateQuantity: (state, action) => {
            const {id, quantity } = action.payload;
            const itemIndex = state.items.findIndex(item => item.id === id);
            if (itemIndex !== -1) {
                state.items[itemIndex].quantity = Number(quantity) || 1;
            }
        },
    },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer