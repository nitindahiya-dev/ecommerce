import { useState, useEffect } from "react";
import bannerImage from "../public/image/bannerImage.jpg";
import carouselImage1 from "../public/image/carousel-image-1.jpg";
import carouselImage2 from "../public/image/carousel-image-2.jpg";
import beforeImage from "../public/image/before.jpg";
import afterImage from "../public/image/after.jpg";
import latestImage1 from "../public/image/latest-image-1.jpg";
import latestImage2 from "../public/image/latest-image-2.jpg";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import PrimaryButton from "../components/PrimaryButton";
import CountUp from "react-countup";
import { Compare } from "../components/ui/compare";
import BuyNowCard from "../components/BuyNowCard";
import { HiArrowRight } from "react-icons/hi2";
import { motion } from "framer-motion";
import Link from "next/link";

// Animation Variants
const slideInVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const popUpVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } },
};

const rotateVariants = {
  hidden: { opacity: 0, rotate: -45 },
  visible: { opacity: 1, rotate: 0, transition: { type: "spring", stiffness: 120 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  quantity: number;
  size: string[];
  image: string;
}

export default function Home() {
  const [featuredBotanicals, setFeaturedBotanicals] = useState<Product[]>([]);
  const [showAllBotanicals, setShowAllBotanicals] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL!);
        const data = await res.json();
        // Use data.plants as the array of products
        if (data && data.plants && Array.isArray(data.plants)) {
          setFeaturedBotanicals(data.plants);
        } else {
          setFeaturedBotanicals([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Stats data as an array of tuples: [number, label, emoji]
  const stats: [number, string, string][] = [
    [880, "Happy Customers", "😊"],
    [650, "Plant Varieties", "🌿"],
    [320, "Unique Pots", "🪴"],
  ];

  return (
    <div className="relative bg-background">

      {/* Animated Banner Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="min-h-[95vh] flex flex-col-reverse sm:flex-row"
      >
        <motion.div variants={slideInVariants} className="sm:pl-32">
          <motion.h1
            variants={popUpVariants}
            className="text-2xl line-clamp-2 sm:text-5xl leading-snug m-5 sm:mb-16 font-unbounded"
          >
            {"Cultivate Nature's Beauty, Delivered Fresh"}
          </motion.h1>
          <motion.div variants={rotateVariants} className="flex flex-col sm:flex-row items-center">
            <Image
              src={bannerImage}
              alt="banner plant image"
              loading="lazy"
              className="rounded-xl w-[90vw] sm:w-[30vw]"
            />
            <div className="p-5 pb-10 sm:p-16 flex flex-col gap-10 items-start">
              <p className="font-hanken font-thin text-xl">
                Discover your perfect green companion with our curated selection of{" "}
                <span className="font-semibold text-[var(--primary)]">650+</span> plants and artisan-crafted pots.
                Expert guidance included with every purchase!
              </p>
              <PrimaryButton
                className="text-xl"
                href="#"
                text="Start Your Green Journey"
                icon={
                  <svg
                    stroke="currentColor"
                    className="mr-2 mt-1"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 256 256"
                    height="1.2em"
                    width="1.2em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M235.55,71.3a9.44,9.44,0,0,0-8.28-6.51L187.9,61.68,172.75,25.77a9.51,9.51,0,0,0-17.49,0L140.1,61.68l-39.36,3.11a9.39,9.39,0,0,0-5.4,16.53l30,25.28-9.14,37.79a9.24,9.24,0,0,0,3.58,9.75,9.52,9.52,0,0,0,10.56.48L164,134.32l33.72,20.3a9.52,9.52,0,0,0,10.56-.48,9.24,9.24,0,0,0,3.58-9.75l-9.15-37.79,29.95-25.28A9.34,9.34,0,0,0,235.55,71.3Z" />
                  </svg>
                }
              />
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 sm:flex gap-6 px-4 sm:px-0 pt-8 sm:pt-12"
          >
            {stats.map(([num, label, emoji], index) => (
              <motion.div
                key={index}
                variants={popUpVariants}
                className="p-4 backdrop-blur-sm rounded-xl shadow-sm border border-emerald-50"
              >
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl">{emoji}</span>
                  <CountUp end={Number(num)} className="font-bold text-3xl text-emerald-600" />
                  <span className="text-emerald-600">+</span>
                </div>
                <p className="mt-1 text-gray-600 font-medium">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Carousel Section */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: 100 },
            visible: { opacity: 1, x: 0 },
          }}
          className="sm:w-[70vw]"
        >
          <Carousel
            showThumbs={false}
            showIndicators={false}
            showArrows={false}
            showStatus={false}
            infiniteLoop={true}
            interval={6000}
            dynamicHeight={true}
            autoPlay={true}
          >
            <Image src={carouselImage1} alt="carousel image 1" priority />
            <Image src={carouselImage2} loading="lazy" alt="carousel image 2" />
          </Carousel>
        </motion.div>
      </motion.div>

      {/* Featured Botanicals Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={staggerContainer}
        viewport={{ once: true, amount: 0.2 }}
        className="flex items-center mb-10 sm:mb-32 flex-col justify-center sm:gap-10 max-w-[85vw] mx-auto"
      >
        <motion.h2 variants={fadeIn} className="text-2xl sm:text-5xl font-unbounded mb-10">
          Featured Botanicals
        </motion.h2>
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full gap-8 lg:gap-12"
        >
          {featuredBotanicals.length > 0 ? (
            featuredBotanicals
              .slice(0, showAllBotanicals ? featuredBotanicals.length : 4)
              .map((item) => (
                <Link key={item.id} href={`/product/${item.id}`} passHref>
                  {/* Wrap your BuyNowCard with Link */}

                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 50 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <BuyNowCard
                      productImage={item.image}
                      productImageHover={item.image}
                      title={item.title}
                      price={item.price}
                      sizes={item.size}
                      buttonHref="#"  // This can be ignored now since the Link handles the routing.
                    />
                  </motion.div>

                </Link>
              ))
          ) : (
            <p className="text-center text-gray-500">Loading products...</p>
          )}
        </motion.div>
        {/* See More button */}
        {featuredBotanicals.length > 4 && (
          <button
            onClick={() => setShowAllBotanicals(!showAllBotanicals)}
            className="mt-10 bg-[var(--primary)] text-white px-6 py-3 rounded-lg font-unbounded hover:text-[var(--primary)] hover:outline hover:outline-1 hover:bg-[var(--primary-dark)] transition-colors"
          >
            {showAllBotanicals ? "Show Less" : "See More"}
          </button>
        )}
      </motion.div>

      {/* Transformation Gallery Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="flex items-center mb-10 sm:mb-32 flex-col justify-center sm:gap-10 max-w-[85vw] mx-auto relative"
      >
        <motion.h2 variants={fadeIn} className="text-2xl sm:text-5xl font-unbounded mb-10">
          Transformation Gallery
        </motion.h2>
        <Compare
          firstImage={beforeImage}
          secondImage={afterImage}
          firstImageClassName="object-cover object-left-top"
          secondImageClassname="object-cover object-left-top"
          className="h-[250px] md:h-[600px] w-full"
          slideMode="hover"
        />
        <div className="flex justify-between absolute bottom-5 left-5 right-5 z-20">
          <p className="bg-[var(--background)] text font-unbounded font-bold px-5 py-2 tracking-widest sm:text-lg">
            After
          </p>
          <p className="bg-[var(--background)] font-unbounded font-bold px-5 py-2 tracking-widest sm:text-lg">
            Before
          </p>
        </div>
      </motion.div>

      {/* Latest Collection Section */}
      <motion.section
        className="py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeIn} className="text-center mb-14 lg:mb-20">
            <h2 className="text-2xl sm:text-5xl font-unbounded mb-5 ">
              New Arrivals
            </h2>
            <p className="font-hanken text-lg text-gray-600 max-w-xl mx-auto">
              {` Discover our freshest botanical additions - carefully curated to bring nature's beauty to your space`}
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
            variants={staggerContainer}
          >
            {[latestImage1, latestImage2, latestImage1].map((img, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative h-96 overflow-hidden">
                  <Image
                    src={img}
                    alt={`New arrival plant ${index + 1}`}
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                    placeholder="blur"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-unbounded text-2xl mb-2 drop-shadow-md">
                    {["Air Purifying Plants", "Low-Light Champions", "Pet-Friendly Greens"][index]}
                  </h3>
                  <p className="font-hanken text-lg opacity-90 mb-4">
                    {[
                      "Natural air filters for healthier living spaces",
                      "Thrives in any light condition",
                      "Safe and beautiful for furry friends",
                    ][index]}
                  </p>
                  <button className="flex items-center gap-2 text-green-100 hover:text-white transition-colors">
                    <span className="font-semibold">Explore Collection</span>
                    <HiArrowRight className="w-5 h-5" />
                  </button>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-hanken font-medium text-emerald-700">
                    New Arrival
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <PrimaryButton
            className="text-xl w-96 mt-16 mx-auto"
            href="#"
            text="Start Your Green Journey"
            icon={
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="mr-2 mt-1"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
                  clipRule="evenodd"
                ></path>
              </svg>
            }
          />
        </div>
      </motion.section>
      {/* Latest Collection End */}

    </div>
  );
}
