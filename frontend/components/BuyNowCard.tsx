import { cn } from "@/lib/utils";
import PrimaryButton from "./PrimaryButton";
import { StaticImageData } from "next/image";
import { useEffect, useState } from "react";

interface BuyNowCardProps {
  productImage: string | StaticImageData | undefined;
  productImageHover: string | StaticImageData | undefined;
  title: string;
  price: number | string;
  sizes?: string[];
  buttonHref?: string;
  isNew?: boolean;
}


const BuyNowCard = ({
  productImage,
  productImageHover,
  title,
  price,
  sizes = [],
  buttonHref = "#",
  isNew = false,
}: BuyNowCardProps) => {
  const [loaded, setLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const formattedPrice = typeof price === "number" ? price.toFixed(2) : price;

  const getImageSrc = (img: string | StaticImageData | undefined): string => {
    if (!img) {
      // Return a fallback image URL or an empty string
      return "/path/to/placeholder.jpg"; // <-- Replace with your fallback image if needed
      // Or simply: return "";
    }
    return typeof img === "string" ? img : img.src;
  };

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="max-w-sm w-full group/card transform transition-all duration-300 hover:-translate-y-2">
      <div className="flex flex-col gap-3">
        <div
          className="relative h-96 rounded-xl overflow-hidden shadow-lg cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          role="img"
          aria-label={`Product image of ${title}`}
        >
          {/* Image layers with fade transition */}
          <div className="absolute inset-0 transition-opacity duration-500">
            <div
              className={cn(
                "absolute inset-0 bg-cover bg-center transition-opacity duration-500",
                isHovered ? "opacity-0" : "opacity-100"
              )}
              style={{ backgroundImage: `url(${getImageSrc(productImage)})` }}
            />
            <div
              className={cn(
                "absolute inset-0 bg-cover bg-center transition-opacity duration-500",
                isHovered ? "opacity-100" : "opacity-0"
              )}
              style={{ backgroundImage: `url(${getImageSrc(productImageHover)})` }}
            />
          </div>

          {/* New badge */}
          {isNew && (
            <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold tracking-wide shadow-md">
              NEW!
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="flex flex-col gap-3 px-2">
          <h4 className="font-unbounded text-xl font-medium text-gray-900 dark:text-gray-100">
            {title}
          </h4>

          <p className="font-hanken text-2xl text-emerald-600 dark:text-emerald-400 font-semibold">
            ${formattedPrice}
          </p>

          {sizes.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {sizes.map((size, idx) => (
                <button
                  key={idx}
                  className={cn(
                    "px-3 py-1 text-sm rounded-full border transition-all",
                    "border-gray-300 dark:border-gray-600",
                    "hover:bg-gray-100 dark:hover:bg-gray-800",
                    "hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  )}
                  aria-label={`Select size ${size}`}
                >
                  {size}
                </button>
              ))}
            </div>
          )}

          <PrimaryButton
            href={buttonHref}
            text="Add to Cart"
            className={cn(
              "w-full py-4 text-lg font-semibold transition-transform",
              "hover:shadow-lg hover:scale-[1.02]",
              "active:scale-95",
              loaded && "animate-fade-in-up"
            )}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default BuyNowCard;