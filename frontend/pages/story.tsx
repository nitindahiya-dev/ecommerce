// components/Story.tsx
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import storyImage from "../public/image/bannerImage.jpg";
import PrimaryButton from "../components/PrimaryButton";

const Story = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="container mx-auto px-4 py-12"
    >
      <div className="flex flex-col md:flex-row items-center gap-20">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={storyImage}
            alt="Our Story"
            className="rounded-lg shadow-xl"
            width={600}
            height={400}
          />
        </motion.div>
        <motion.div className="md:w-1/2 space-y-6 font-hanken">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold mb-8 text-[var(--primary)]"
          >
            Our Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg leading-relaxed text-gray-700"
          >
            It all began with a passion for nature and a dream to bring a touch of green into every home.
            Founded by enthusiasts who believe in the transformative power of plants, our journey started with a
            simple mission: to cultivate nature’s beauty and deliver it fresh right to your doorstep.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg leading-relaxed text-gray-700"
          >
            From humble beginnings, we have grown into a community of green thumbs, design aficionados, and
            sustainability advocates. Every plant in our collection is handpicked, nurtured, and curated with care
            so that you can enjoy the very best of nature.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg leading-relaxed text-gray-700"
          >
            Join us as we continue to grow, innovate, and bring a breath of fresh air to your living spaces,
            one plant at a time.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <PrimaryButton
              text="Explore Plants"
              href="/products"
              className="px-8 py-4 inline-flex items-center gap-2"
              icon={
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" aria-hidden="true" className="mr-2 mt-1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clipRule="evenodd"></path></svg>
              }
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Story;
