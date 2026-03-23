import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import About from "./About";
import Contact from "./Contact";

export default function HomeUserthree() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-700 via-rose-700 to-red-900 overflow-x-hidden">
      
      <Navbar />

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center px-4 sm:px-6 py-20 sm:py-24 md:py-32">
        
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white drop-shadow-2xl mb-6 leading-tight">
          Assa Bride & Groom Rental 👑
        </h1>

        <p className="text-red-100 text-base sm:text-lg md:text-xl max-w-2xl mb-10 sm:mb-14 leading-relaxed">
          Discover stunning bridal lehengas and royal groom sherwanis for your
          special day. Rent luxury outfits at affordable prices.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 sm:gap-8 w-full max-w-md sm:max-w-none">

          {/* Bride Button */}
          <button
            onClick={() => navigate("/bp")}
            className="w-full sm:w-auto px-8 sm:px-14 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold 
                       text-white 
                       bg-gradient-to-r from-rose-600 via-red-600 to-red-800
                       shadow-xl hover:shadow-red-500/40
                       transition-all duration-500 
                       hover:scale-105 hover:brightness-110"
          >
            Bride Collection 👰
          </button>

          {/* Groom Button */}
          <button
            onClick={() => navigate("/gp")}
            className="w-full sm:w-auto px-8 sm:px-14 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold 
                       text-white 
                       bg-gradient-to-r from-red-800 via-rose-700 to-red-900
                       shadow-xl hover:shadow-rose-500/40
                       transition-all duration-500 
                       hover:scale-105 hover:brightness-110"
          >
            Groom Collection 🤵
          </button>

        </div>
      </div>
      
      {/* Sections */}
      <div className="px-4 sm:px-6">
        <About />
        <Contact />
      </div>

      {/* Footer */}
      <div className="text-center text-red-200 py-6 sm:py-8 text-xs sm:text-sm opacity-90 px-4">
        © 2026 Assa Bride & Groom Rentals. All rights reserved.
      </div>

    </div>
  );
}