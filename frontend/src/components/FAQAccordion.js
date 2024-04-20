import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const FAQAccordion = ({ faqs, handleFAQClick }) => {
  const [showFAQs, setShowFAQs] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleFAQs = () => {
    setShowFAQs(!showFAQs);
  };

  const toggleAccordion = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
      setShowFAQs(false); // Hide the accordion
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <div className="mt-4 w-full max-w-md">
      <div className="flex justify-between items-center">
        <button
          onClick={toggleFAQs}
          className="focus:outline-none flex justify-end items-center gap-4"
        >
          <h2 className="text-md font-bold">FAQs</h2>
          <FaChevronDown
            className={`text-gray-500 transition-transform ${
              showFAQs ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
      {showFAQs && (
        <div className="border border-gray-300 rounded-md">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border-b border-gray-300 last:border-b-0 ${
                expandedIndex === index ? "bg-blue-100" : ""
              }`}
            >
              <button
                onClick={() => {
                  handleFAQClick(faq);
                  toggleAccordion(index);
                }}
                className="w-full flex justify-between items-center px-4 py-3 text-left focus:outline-none"
              >
                <span>{faq}</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FAQAccordion;
