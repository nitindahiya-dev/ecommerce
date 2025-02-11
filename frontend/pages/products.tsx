// pages/products.tsx
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  quantity: number;
  size: string[];
  image: string;
}

const productCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  const [sortOrder, setSortOrder] = useState("default"); // "default" | "asc" | "desc"
  const [filterSize, setFilterSize] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL!);
        const data = await res.json();
        if (data && data.plants && Array.isArray(data.plants)) {
          setProducts(data.plants);
          setSortedProducts(data.plants);
        } else {
          setProducts([]);
          setSortedProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Update sortedProducts when products, sortOrder, or filterSize changes.
  useEffect(() => {
    let updated = [...products];

    // Filter by size if selected.
    if (filterSize) {
      updated = updated.filter((product) => product.size.includes(filterSize));
    }

    // Sort by price if requested.
    if (sortOrder === "asc") {
      updated.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      updated.sort((a, b) => b.price - a.price);
    }
    setSortedProducts(updated);
  }, [sortOrder, filterSize, products]);

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Products</h1>

        {/* Filter & Sort Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-2">
            <label className="font-semibold text-gray-700">Sort by Price:</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="default">Default</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold text-gray-700">Filter by Size:</label>
            <select
              value={filterSize}
              onChange={(e) => setFilterSize(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">All</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="tall">Tall</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {sortedProducts.length === 0 ? (
          <p className="text-center text-gray-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={productCardVariants}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-lg shadow p-4 hover:shadow-xl transition-shadow"
              >
                <Link href={`/product/${product.id}`} passHref>
                  
                    <div className="relative h-64 rounded overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.title}
                        layout="fill"
                        objectFit="cover"
                        className="hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="mt-4">
                      <h2 className="text-xl font-semibold">{product.title}</h2>
                      <p className="text-gray-600 mt-2">${product.price.toFixed(2)}</p>
                    </div>
                  
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
