import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
const FAQPopup = ({ faqs, handleFAQClick }) => {
  const [showPopup, setShowPopup] = useState(false);
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  return (
    <div>
      <button onClick={togglePopup} className="orange_btn">
        FAQs
      </button>
      {showPopup && (
        <div
          className="fixed top-0 left-0 w-full h-screen bg-gray-500 bg-opacity-50 flex justify-center items-center md:p-4 lg:p-8 z-50"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white text-black rounded-md p-4 w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
            aria-labelledby="faq-popup-title"
          >
            <h2 id="faq-popup-title" className="text-lg font-bold mb-4">
              FAQs
            </h2>
            <ul>
              {faqs.map((faq, index) => (
                <li key={index}>
                  <button
                    onClick={() => {
                      handleFAQClick(faq);
                      togglePopup();
                    }}
                    className="w-full text-left focus:outline-none py-2 px-4 hover:bg-amber-50"
                  >
                    {faq}
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-center">
              <button onClick={togglePopup} className="cancel_btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default FAQPopup;
