"use client";
import React from "react";

const Cart: React.FC = () => {
  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Your Cart</h3>
      <p>Your cart is currently empty.</p>
      {/* You can expand this with cart items, totals, etc. */}
    </div>
  );
};

export default Cart;
