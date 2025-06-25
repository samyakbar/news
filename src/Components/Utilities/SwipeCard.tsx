import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import Header from "./Header";
import articles from "./articles";


const SwipeableNewsCard = ({ article }) => {
  const hasImages = Array.isArray(article.images) && article.images.length > 0;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === article.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? article.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md">
  {/* <Header /> */}

      {/* Image slider */}
      <div className="relative h-48 bg-gray-100">
        {hasImages ? (
          <>
            <img
              src={article.images[currentImageIndex]}
              alt="news preview"
              className="w-full h-full object-cover"
            />

           {article.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full"
                >
                  <ArrowRight size={16} />
                </button>
              </>
            )}

            <div className="absolute bottom-2 left-2 flex space-x-1">
              {article.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentImageIndex
                      ? "bg-white"
                      : "bg-white bg-opacity-50"
                  }`}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            No image available
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <div className="flex items-center space-x-2 text-xs">
          <span className="bg-red-600 text-white px-2 py-0.5 rounded font-bold">
            {article.label}
          </span>
          <span className="uppercase text-gray-600 font-semibold">{article.category}</span>
        </div>
        <h2 className="text-red-700 font-bold text-[15px] leading-snug">
          {article.title}
        </h2>
      </div>
    </div>
  );
};

export default SwipeableNewsCard;