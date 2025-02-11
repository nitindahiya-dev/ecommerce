// pages/checkout.tsx
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import PrimaryButton from "../components/PrimaryButton";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  size: string[]; // For this page, we assume size is already set (e.g., ["medium"])
}

interface ShippingInfo {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  email: string;
}

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Checkout() {
  const router = useRouter();
  const [cart, setCart] = useState<Product[]>([]);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<ShippingInfo>>({});

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  const validateForm = () => {
    const newErrors: Partial<ShippingInfo> = {};
    if (!shippingInfo.name) newErrors.name = "Name is required";
    if (!shippingInfo.address) newErrors.address = "Address is required";
    if (!shippingInfo.city) newErrors.city = "City is required";
    if (!/^\d+$/.test(shippingInfo.postalCode)) newErrors.postalCode = "Invalid postal code";
    if (!shippingInfo.country) newErrors.country = "Country is required";
    if (!/^\S+@\S+\.\S+$/.test(shippingInfo.email)) newErrors.email = "Invalid email address";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ShippingInfo]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleRemoveItem = (id: number) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      // Simulate an API call (you can replace this with real payment integration)
      await new Promise(resolve => setTimeout(resolve, 1500));
      localStorage.removeItem("cart");
      setShowSuccess(true);
      setTimeout(() => router.push("/"), 3000);
    } catch (error) {
      console.error("Order placement error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto p-4 lg:p-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl lg:text-4xl font-unbounded font-bold mb-8 text-center"
        >
          Secure Checkout
        </motion.h1>

        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
              <div className="bg-white p-8 rounded-2xl text-center max-w-md">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold mb-4">Order Placed Successfully!</h3>
                <p className="text-gray-600 mb-6">
                  Thank you for your purchase. A confirmation email has been sent to {shippingInfo.email}.
                </p>
                <PrimaryButton text="Continue Shopping" href="/" className="w-full" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-8"
          >
            <div className="text-6xl">🛒</div>
            <p className="text-xl text-gray-600">Your cart is empty</p>
            <PrimaryButton text="Explore Plants" href="/" className="px-8 py-4" />
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <motion.div variants={formVariants} className="bg-white p-6 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-semibold mb-6">
                Order Summary ({cart.length})
              </h2>
              <div className="space-y-6">
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-gray-500">
                        Size: {item.size[0]}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        ${item.price.toFixed(2)}
                      </p>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700 text-sm mt-1"
                      >
                        Remove
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-semibold">Free</span>
                </div>
                <div className="flex justify-between items-center mt-4 text-xl font-bold">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>

            {/* Shipping Details */}
            <motion.div variants={formVariants} className="bg-white p-6 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-semibold mb-6">Shipping Information</h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={shippingInfo.name}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 ${
                      errors.name ? "ring-2 ring-red-500" : "focus:ring-[var(--primary)]"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={shippingInfo.email}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 ${
                      errors.email ? "ring-2 ring-red-500" : "focus:ring-[var(--primary)]"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 ${
                      errors.address ? "ring-2 ring-red-500" : "focus:ring-[var(--primary)]"
                    }`}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 ${
                        errors.city ? "ring-2 ring-red-500" : "focus:ring-[var(--primary)]"
                      }`}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={shippingInfo.postalCode}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 ${
                        errors.postalCode ? "ring-2 ring-red-500" : "focus:ring-[var(--primary)]"
                      }`}
                    />
                    {errors.postalCode && (
                      <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={shippingInfo.country}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 ${
                      errors.country ? "ring-2 ring-red-500" : "focus:ring-[var(--primary)]"
                    }`}
                  />
                  {errors.country && (
                    <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                  )}
                </div>
              </form>

              <div className="mt-6">
                <PrimaryButton
                  text={isSubmitting ? "Processing..." : "Place Order"}
                  onClick={handlePlaceOrder}
                  className="w-full py-4"
                  disabled={isSubmitting}
                  icon={
                    isSubmitting ? (
                      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )
                  }
                />
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
