// pages/faq.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PrimaryButton from "../components/PrimaryButton";

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: "What is your return policy?",
    answer:
      "We accept returns within 30 days of purchase. Items must be in their original condition.",
  },
  {
    id: 2,
    question: "How do I track my order?",
    answer:
      "Once your order is shipped, you'll receive a tracking number via email.",
  },
  {
    id: 3,
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship worldwide! Shipping fees and delivery times vary by destination.",
  },
  // Add more FAQs as needed.
];

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 200 },
  },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
};

const FAQPage = () => {
  const [selectedFAQ, setSelectedFAQ] = useState<FAQ | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h1>
        <div className="grid gap-4">
          {faqs.map((faq) => (
            <motion.div
              key={faq.id}
              whileHover={{ scale: 1.02 }}
              className="p-4 bg-white rounded-lg shadow cursor-pointer"
              onClick={() => setSelectedFAQ(faq)}
            >
              <h2 className="text-xl font-semibold">{faq.question}</h2>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ Answer Modal */}
      <AnimatePresence>
        {selectedFAQ && (
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setSelectedFAQ(null)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white p-8 rounded-2xl text-center max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4">
                {selectedFAQ.question}
              </h2>
              <p className="text-gray-700 mb-6">{selectedFAQ.answer}</p>
              <PrimaryButton
                text="Close"
                onClick={() => setSelectedFAQ(null)}
                className="w-full"
                variant="secondary"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQPage;
