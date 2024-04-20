const FAQButtons = ({ faqs, handleFAQClick }) => {
  return (
    <div className="mt-4 w-full max-w-md">
      <h2 className="text-md font-bold mb-2">FAQs</h2>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
        {faqs.map((faq, index) => (
          <button
            key={index}
            onClick={() => handleFAQClick(faq)}
            className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded"
          >
            {faq}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FAQButtons;
