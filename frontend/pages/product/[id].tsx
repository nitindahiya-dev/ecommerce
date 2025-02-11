// pages/product/[id].tsx
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import { motion } from "framer-motion";
import PrimaryButton from "../../components/PrimaryButton";
import Footer from "../../components/Footer";
import { useState } from "react";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  quantity: number;
  size: string[];
  image: string;
}

interface ProductPageProps {
  product: Product | null;
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ProductPage({ product }: ProductPageProps) {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState("");

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 text-center">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl text-gray-600">
          Product not found
        </motion.p>
      </div>
    );
  }

  const addToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    // Retrieve existing cart from localStorage or initialize empty array
    const storedCart = localStorage.getItem("cart");
    const cart: Product[] = storedCart ? JSON.parse(storedCart) : [];
    // Add the product with the selected size (you can override the size array)
    cart.push({ ...product, size: [selectedSize] });
    localStorage.setItem("cart", JSON.stringify(cart));
    // Redirect to the add-to-cart page
    router.push("/addtocart");
  };

  return (
    <div className="min-h-screen bg-background">
      <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="container mx-auto p-8">
        <motion.button
          variants={fadeIn}
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 text-gray-600 hover:text-[var(--primary)] transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Shop
        </motion.button>

        <div className="flex flex-col lg:flex-row gap-12">
          <motion.div variants={fadeIn} className="lg:w-1/2">
            <div className="relative rounded-2xl overflow-hidden shadow-lg bg-white p-6">
              <Image
                src={product.image}
                alt={product.title}
                width={600}
                height={600}
                className="object-cover w-full h-full"
              />
              {product.quantity < 5 && (
                <div className="absolute top-4 right-4 bg-[var(--primary)] text-white px-4 py-2 rounded-full text-sm">
                  Almost Gone!
                </div>
              )}
            </div>
          </motion.div>

          <motion.div variants={staggerContainer} className="lg:w-1/2 space-y-6">
            <motion.h1 variants={fadeIn} className="text-4xl font-unbounded font-bold">
              {product.title}
            </motion.h1>

            <motion.p variants={fadeIn} className="text-2xl font-semibold text-[var(--primary)]">
              ${product.price.toFixed(2)}
            </motion.p>

            <motion.div variants={fadeIn} className="space-y-4">
              <h3 className="text-lg font-semibold">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </motion.div>

            <motion.div variants={fadeIn} className="space-y-4">
              <h3 className="text-lg font-semibold">Available Sizes</h3>
              <div className="flex flex-wrap gap-3">
                {product.size.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-full border-2 ${
                      selectedSize === size
                        ? "border-[var(--primary)] bg-green-50 text-[var(--primary)]"
                        : "border-gray-200 hover:border-[var(--primary)]"
                    } transition-all`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="flex items-center gap-4">
              <PrimaryButton
                onClick={addToCart}
                text="Add to Cart"
                className="w-full py-4 text-lg"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                }
              />
            </motion.div>

            <motion.div variants={fadeIn} className="flex items-center gap-2 text-sm text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>In Stock: {product.quantity} units available</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  // If id is an array, take the first value
  const productId = Array.isArray(id) ? id[0] : id;

  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL!);
    if (!res.ok) {
      return { props: { product: null } };
    }
    const data = await res.json();
    const product = data.plants.find((p: Product) => String(p.id) === String(productId)) || null;
    return { props: { product } };
  } catch (error) {
    console.error("Error fetching product:", error);
    return { props: { product: null } };
  }
};
