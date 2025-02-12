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
  const [sortOrder, setSortOrder] = useState<"default" | "asc" | "desc">("default");
  const [filterSize, setFilterSize] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL!);
        const data = await res.json();
        if (data?.plants) {
          setProducts(data.plants);
          setSortedProducts(data.plants);
          // Set initial price range based on products
          const prices = data.plants.map((p: Product) => p.price);
          setPriceRange([Math.min(...prices), Math.max(...prices)]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let updated = [...products];
    
    // Price filter
    updated = updated.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    
    // Size filter
    if (filterSize) {
      updated = updated.filter(p => p.size.includes(filterSize));
    }
    
    // Sorting
    if (sortOrder === "asc") updated.sort((a, b) => a.price - b.price);
    if (sortOrder === "desc") updated.sort((a, b) => b.price - a.price);
    
    setSortedProducts(updated);
  }, [sortOrder, filterSize, priceRange, products]);

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 text-center font-unbounded">Our Collection</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-80 space-y-8"
          >
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Filters</h2>
              
              {/* Price Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-4">Price Range</h3>
                <div className="flex items-center gap-2 text-sm">
                  <span>${priceRange[0]}</span>
                  <input
                    type="range"
                    min={0}
                    max={1000}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full accent-[var(--primary)]"
                  />
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              {/* Size Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-4">Plant Sizes</h3>
                <div className="flex flex-wrap gap-2">
                  {['small', 'medium', 'tall'].map(size => (
                    <button
                      key={size}
                      onClick={() => setFilterSize(filterSize === size ? "" : size)}
                      className={`px-4 py-2 rounded-full border ${
                        filterSize === size 
                          ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                          : 'border-gray-200 hover:border-[var(--primary)]'
                      } transition-colors capitalize`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sorting */}
              <div>
                <h3 className="font-medium mb-4">Sort By</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSortOrder("asc")}
                    className={`w-full text-left px-4 py-2 rounded-lg ${
                      sortOrder === "asc" ? 'bg-[var(--primary)] text-white' : 'hover:bg-gray-50'
                    }`}
                  >
                    Price: Low to High
                  </button>
                  <button
                    onClick={() => setSortOrder("desc")}
                    className={`w-full text-left px-4 py-2 rounded-lg ${
                      sortOrder === "desc" ? 'bg-[var(--primary)] text-white' : 'hover:bg-gray-50'
                    }`}
                  >
                    Price: High to Low
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Products Grid */}
          <div className="flex-1">
            {sortedProducts.length === 0 ? (
              <div className="text-center py-20">
                <span className="text-6xl">🌵</span>
                <p className="text-xl mt-4 text-gray-600">No plants match your filters</p>
              </div>
            ) : (
              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {sortedProducts.map(product => (
                  <motion.div
                    key={product.id}
                    layout
                    variants={productCardVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all"
                  >
                    <Link href={`/product/${product.id}`} passHref>
                      <div className="cursor-pointer">
                        <div className="relative h-64 rounded-t-2xl overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.title}
                            layout="fill"
                            objectFit="cover"
                            className="hover:scale-105 transition-transform duration-500"
                          />
                          {product.quantity < 5 && (
                            <div className="absolute top-4 right-4 bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                              Low Stock
                            </div>
                          )}
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-[var(--primary)]">
                              ${product.price.toFixed(2)}
                            </span>
                            <div className="flex items-center gap-2">
                              {product.size.map(size => (
                                <span 
                                  key={size}
                                  className="px-2 py-1 text-sm rounded-full bg-gray-100 capitalize"
                                >
                                  {size}
                                </span>
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600 mt-3 line-clamp-2">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}