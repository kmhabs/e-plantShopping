import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: { items: [] },
    reducers: {
        addItem: (state, action) => {
            const { name, cost, image } = action.payload;
            const existingItem = state.items.find(item => item.name === name);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ name, cost, image, quantity: 1 });
            }
        },
        updateQuantity: (state, action) => {
            const { name, quantity } = action.payload;
            const item = state.items.find(item => item.name === name);
            if (item) {
                item.quantity = quantity;
            }
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.name !== action.payload);
        }
    }
});

export const { addItem, updateQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;