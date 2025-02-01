// frontend/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
// import your reducers here
// import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    // cart: cartReducer,
  },
});

// Optional: export RootState and AppDispatch types for TypeScript use
export default store;
