"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoPersonOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../public/image/Logo-1.svg";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sidebarType, setSidebarType] = useState<"login" | "wishlist" | "cart" | "register" | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    document.body.style.overflow = !isMenuOpen ? "hidden" : "auto";
  };

  const openLoginSidebar = () => {
    setSidebarType("login");
    document.body.style.overflow = "hidden";
  };

  const openWishlistSidebar = () => {
    setSidebarType("wishlist");
    document.body.style.overflow = "hidden";
  };

  const openCartSidebar = () => {
    setSidebarType("cart");
    document.body.style.overflow = "hidden";
  };

  const closeSidebar = () => {
    setSidebarType(null);
    document.body.style.overflow = "auto";
  };

  const menuVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0 },
    exit: { x: "-100%" },
  };

  return (
    <nav className="sticky top-0 z-50">
      {/* Top Navbar */}
      <div className="backdrop-blur-md bg-white/30 border-b border-white/20">
        <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <Image src={logo} alt="xstore logo" className="w-32 md:w-40" />
              </Link>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              <Link href="#" className="hover:text-gray-600 transition-colors">
                Home
              </Link>
              <Link href="#" className="hover:text-gray-600 transition-colors">
                Our Story
              </Link>
              <Link href="#" className="hover:text-gray-600 transition-colors">
                Products
              </Link>
              <Link href="#" className="hover:text-gray-600 transition-colors">
                Blog
              </Link>
              <Link href="#" className="hover:text-gray-600 transition-colors">
                Contacts
              </Link>
            </div>
            {/* Icons and Mobile Menu Button */}
            <div className="flex items-center gap-4 md:gap-6">
              <IoPersonOutline
                onClick={openLoginSidebar}
                className="w-5 h-5 hover:text-gray-600 cursor-pointer transition-colors"
              />
              <FaRegHeart
                onClick={openWishlistSidebar}
                className="w-5 h-5 hover:text-gray-600 cursor-pointer transition-colors"
              />
              <HiMiniShoppingBag
                onClick={openCartSidebar}
                className="w-6 h-6 hover:text-gray-600 cursor-pointer transition-colors"
              />
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                {isMenuOpen ? (
                  <HiX className="h-6 w-6" />
                ) : (
                  <HiOutlineMenu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Sliding Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 left-0 h-full w-3/4 max-w-sm bg-white/95 backdrop-blur-lg z-50 shadow-lg"
          >
            <div className="flex flex-col items-start p-8 space-y-6">
              <Link
                href="#"
                className="text-xl hover:text-gray-600"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                href="#"
                className="text-xl hover:text-gray-600"
                onClick={toggleMenu}
              >
                Our Story
              </Link>
              <Link
                href="#"
                className="text-xl hover:text-gray-600"
                onClick={toggleMenu}
              >
                Products
              </Link>
              <Link
                href="#"
                className="text-xl hover:text-gray-600"
                onClick={toggleMenu}
              >
                Blog
              </Link>
              <Link
                href="#"
                className="text-xl hover:text-gray-600"
                onClick={toggleMenu}
              >
                Contacts
              </Link>
            </div>
            <button
              onClick={toggleMenu}
              className="absolute top-4 right-4 p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <HiX className="h-8 w-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Sidebar for Person/Heart/Cart Icons */}
      <AnimatePresence>
        {sidebarType && (
          <Sidebar
            onClose={closeSidebar}
            title={
              sidebarType === "login"
                ? "User Account"
                : sidebarType === "wishlist"
                ? "Wishlist"
                : sidebarType === "cart"
                ? "Cart"
                : sidebarType === "register"
                ? "Register Now"
                : ""
            }
            
            widthClass="w-3/4 max-w-md"
            contentType={sidebarType}
            onContentTypeChange={(type: "login" | "register") =>
              setSidebarType(type)
            }
          />
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
