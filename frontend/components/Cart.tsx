// components/Cart.tsx
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import PrimaryButton from "./PrimaryButton";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  size: string[]; // e.g., ["small"], ["medium"], etc.
}

const Cart: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const handleRemoveItem = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  if (cart.length === 0) {
    return (
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">Your Cart</h3>
        <p>Your cart is currently empty.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold mb-4">Your Cart</h3>
      <AnimatePresence>
        {cart.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex items-center gap-4 mb-4 p-4 bg-gray-50 rounded-xl shadow-sm"
          >
            <div className="relative w-16 h-16 rounded-lg overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="flex-1">
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-gray-500">Size: {item.size[0]}</p>
              <p className="text-sm">${item.price.toFixed(2)}</p>
            </div>
            <button
              onClick={() => handleRemoveItem(item.id)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
      <div className="mt-4 border-t pt-4">
        <p className="font-bold text-xl">
          Total: ${totalPrice.toFixed(2)}
        </p>
        <PrimaryButton
          text="Checkout"
          href="/checkout"
          className="mt-4"
        />
      </div>
    </div>
  );
};

export default Cart;
