// components/Cart.tsx (Wishlist Component)
"use client";
import { useEffect, useState } from "react";
import BuyNowCard from "../components/BuyNowCard";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiHeart, FiArrowRight } from "react-icons/fi";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  quantity: number;
  size: string[];
  image: string;
}

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  const toggleWishlist = (product: Product) => {
    const isInWishlist = wishlist.some(item => item.id === product.id);
    let updatedWishlist: Product[];
    
    if (isInWishlist) {
      updatedWishlist = wishlist.filter(item => item.id !== product.id);
    } else {
      updatedWishlist = [...wishlist, product];
    }
    
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col">
      {/* Enhanced Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-2">
          <FiHeart className="text-red-500" /> 
          My Wishlist
          <span className="text-lg text-gray-500 ml-2">({wishlist.length} items)</span>
        </h1>
        <p className="text-gray-600">
          Your curated collection of favorite plants.
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="text-center">
            <div className="text-9xl text-gray-200 mb-4 mx-auto">
              <FiHeart />
            </div>
            <h2 className="text-2xl font-semibold mb-2">
              Your Green Wishlist Awaits
            </h2>
            <p className="text-gray-600 max-w-md mb-4">
              Start exploring our botanical collection and add your favorite plants to grow your wishlist!
            </p>
            <Link
              href="/products"
              className="inline-flex items-center hover:text-[var(--primary)] hover:outline hover:outline-1 gap-2 bg-[var(--primary)] text-white px-6 py-3 rounded-lg hover:bg-[var(--primary-dark)] transition-colors"
            >
              Browse Plants
              <FiArrowRight className="text-lg" />
            </Link>
          </div>
        </div>
        ) : (
          <motion.div className="flex-1 overflow-hidden relative">
            <div className="h-full pb-8 overflow-y-auto scrollbar-thin scrollbar-thumb-[var(--primary)] scrollbar-track-gray-100 pr-4">
              <AnimatePresence initial={false}>
                <div className="flex flex-col gap-16 h-screen ">
                  {wishlist.map((item) => {
                    const isFavorite = wishlist.some(product => product.id === item.id);
                    
                    return (
                      <motion.div
                        key={item.id}
                        layout
                        className="relative group"
                      >
                        <button
                          onClick={() => toggleWishlist(item)}
                          className="absolute top-4 right-4 z-20 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-red-50 transition-colors"
                          aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
                        >
                          <FiHeart className={`w-6 h-6 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                        </button>
  
                        <Link href={`/product/${item.id}`} passHref>
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="hover:shadow-lg transition-shadow duration-300 rounded-xl"
                          >
                            <BuyNowCard
                              productImage={item.image}
                              productImageHover={item.image}
                              title={item.title}
                              price={item.price}
                              sizes={item.size}
                              buttonHref="#"
                            />
                          </motion.div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </AnimatePresence>
            </div>
            
            {/* Scroll gradient overlay remains */}
          </motion.div>
        )}
      </div>
    );
  };
  
  export default Wishlist;