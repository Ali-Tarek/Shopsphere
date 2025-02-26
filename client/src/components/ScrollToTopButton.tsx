import React from "react";

const ScrollToTopButton: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <button
        onClick={scrollToTop}
        className="fixed bottom-5 right-4 w-10 h-10 bg-gray-700 text-white rounded-full shadow-lg hover:bg-gray-800 transition">
        ↑
      </button>
    </div>
  );
};

export default ScrollToTopButton;
