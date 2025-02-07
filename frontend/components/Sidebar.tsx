"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiX } from "react-icons/hi";
import Login from "./Login";
import Register from "./Register";
import WishList from "./Wishlist";
import Cart from "./Cart";
import Profile from "./Profile";

export interface SidebarProps {
  onClose: () => void;
  title?: string;
  // Updated union to include "profile"
  contentType: "login" | "wishlist" | "cart" | "register" | "profile";
  children?: React.ReactNode;
  widthClass?: string;
  overlayClassName?: string;
  onContentTypeChange?: (type: "login" | "register") => void;
  onLoginSuccess?: (user: { name: string; email: string }) => void;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const sidebarVariants = {
  hidden: { x: "100%" },
  visible: { x: 0 },
  exit: { x: "100%" },
};

const Sidebar: React.FC<SidebarProps> = ({
  onClose,
  title,
  contentType,
  children,
  widthClass = "w-3/4 max-w-sm",
  overlayClassName = "bg-black/30",
  onContentTypeChange,
  onLoginSuccess,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        className={`fixed inset-0 z-50 ${overlayClassName}`}
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={overlayVariants}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      >
        <motion.div
          className={`absolute top-0 right-0 h-full ${widthClass} bg-[var(--background)] shadow-lg p-6`}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={sidebarVariants}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            {title && <h2 className="text-xl font-bold">{title}</h2>}
            <button onClick={onClose} className="p-2">
              <HiX className="h-6 w-6" />
            </button>
          </div>
          {contentType === "login" && (
            <Login
              onContentTypeChange={() =>
                onContentTypeChange && onContentTypeChange("register")
              }
              onLoginSuccess={onLoginSuccess}
            />
          )}
          {contentType === "register" && (
            <Register
              onContentTypeChange={() =>
                onContentTypeChange && onContentTypeChange("login")
              }
            />
          )}
          {contentType === "wishlist" && <WishList />}
          {contentType === "cart" && <Cart />}
          {contentType === "profile" && <Profile />}
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Sidebar;
