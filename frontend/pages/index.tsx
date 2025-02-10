import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
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
import Footer from "../components/Footer";
import BuyNowCard from "../components/BuyNowCard";
import { HiArrowRight, HiSparkles } from "react-icons/hi2";
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

  return (
    <div className="relative bg-background">
      {/* Navbar Start */}
      <Navbar />
      {/* Navbar End */}

      {/* Banner Start */}
      <div className="min-h-[95vh] flex flex-col-reverse sm:flex-row">
        <div className="sm:pl-32">
          <h1 className="text-2xl line-clamp-2 sm:text-5xl leading-snug m-5 sm:mb-16 font-unbounded">
            {"Cultivate Nature's Beauty, Delivered Fresh"}
          </h1>
          <div className="flex flex-col sm:flex-row items-center">
            <Image
              src={bannerImage}
              alt="banner plant image"
              loading="lazy"
              className="rounded-xl w-[90vw] sm:w-[30vw]"
            />
            <div className="p-5 pb-10 sm:p-16 flex flex-col gap-10 items-start">
              <p className="font-hanken font-thin text-xl">
                Discover your perfect green companion with our curated selection of{" "}
                <span className="font-semibold text-[var(--primary)]">650+</span> plants and artisan-crafted pots. Expert guidance included with every purchase!
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
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 sm:flex gap-6 px-4 sm:px-0 pt-8 sm:pt-12">
            {[
              { number: 880, label: "Happy Customers", emoji: "😊" },
              { number: 650, label: "Plant Varieties", emoji: "🌿" },
              { number: 320, label: "Unique Pots", emoji: "🪴" },
            ].map((stat, index) => (
              <div key={index} className="p-4 backdrop-blur-sm rounded-xl shadow-sm border border-emerald-50">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl">{stat.emoji}</span>
                  <CountUp end={stat.number} className="font-bold text-3xl text-emerald-600" />
                  <span className="text-emerald-600">+</span>
                </div>
                <p className="mt-1 text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="sm:w-[70vw]">
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
        </div>
      </div>
      {/* Banner End */}

      {/* Featured Botanicals Section */}
      <div className="flex items-center mb-10 sm:mb-32 flex-col justify-center sm:gap-10 max-w-[85vw] mx-auto">
        <h2 className="text-2xl sm:text-5xl font-unbounded mb-10">Featured Botanicals</h2>
        <div className="flex justify-between flex-col sm:flex-row gap-7 w-full flex-wrap">
          {featuredBotanicals.length > 0 ? (
            featuredBotanicals
              .slice(0, showAllBotanicals ? featuredBotanicals.length : 4)
              .map((item) => (
                <BuyNowCard
                  key={item.id}
                  productImage={item.image}
                  productImageHover={item.image}
                  title={item.title}
                  price={item.price}
                  sizes={item.size}  // Remove the extra array brackets
                  buttonHref="#"
                />
              ))
          ) : (
            <p className="text-center text-gray-500">Loading products...</p>
          )}
        </div>
        {featuredBotanicals.length > 4 && (
          <button
            onClick={() => setShowAllBotanicals(!showAllBotanicals)}
            className="mt-10 bg-[var(--primary)] text-white px-6 py-3 rounded-lg font-unbounded hover:text-[var(--primary)] hover:outline hover:outline-1 hover:bg-[var(--primary-dark)] transition-colors"
          >
            {showAllBotanicals ? "Show Less" : "See More"}
          </button>
        )}
      </div>
      {/* Featured Botanicals End */}

      {/* Transformation Gallery (BeforeAfter) */}
      <div className="flex items-center mb-10 sm:mb-32 flex-col justify-center sm:gap-10 max-w-[85vw] mx-auto">
        <h2 className="text-2xl sm:text-5xl font-unbounded mb-10">Transformation Gallery</h2>
        <div className="w-full relative">
          <Compare
            firstImage={beforeImage}
            secondImage={afterImage}
            firstImageClassName="object-cover object-left-top"
            secondImageClassname="object-cover object-left-top"
            className="h-[250px] md:h-[600px] w-full"
            slideMode="hover"
          />
          <div className="flex justify-between bottom-5 left-5 right-5 absolute z-20">
            <p className="bg-[var(--background)] text font-unbounded font-bold px-5 py-2 tracking-widest sm:text-lg">
              After
            </p>
            <p className="bg-[var(--background)] font-unbounded font-bold px-5 py-2 tracking-widest sm:text-lg">
              Before
            </p>
          </div>
        </div>
      </div>
      {/* Transformation Gallery End */}

      {/* Latest Collection Section */}
      <section className="py-16 bg-gradient-to-b from-green-50/20 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 lg:mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-unbounded font-bold bg-gradient-to-r from-green-600 to-emerald-800 bg-clip-text text-transparent">
              New Arrivals
            </h2>
            <p className="mt-4 font-hanken text-lg text-gray-600 max-w-2xl mx-auto">
              {`Discover our freshest botanical additions - carefully curated to bring nature's beauty to your space`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
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
                    {[
                      'Air Purifying Plants',
                      'Low-Light Champions',
                      'Pet-Friendly Greens'
                    ][index]}
                  </h3>
                  <p className="font-hanken text-lg opacity-90 mb-4">
                    {[
                      'Natural air filters for healthier living spaces',
                      'Thrives in any light condition',
                      'Safe and beautiful for furry friends'
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
          </div>

          <div className="mt-12 text-center">
            <button className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-3 rounded-full font-unbounded transition-colors duration-300 flex items-center gap-2 mx-auto">
              <HiSparkles className="w-5 h-5" />
              View All Collections
              <HiArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
      {/* Latest Collection End */}

      {/* Footer Start */}
      <Footer />
      {/* Footer End */}
    </div>
  );
}
