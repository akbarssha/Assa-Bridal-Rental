import { useNavigate } from "react-router-dom";
import Navbartwo from "./Navbartwo";

export default function HomeUsertwo() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 overflow-x-hidden">
      
      <Navbartwo />

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center px-4 sm:px-6 py-20 sm:py-24 md:py-32">
        
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white drop-shadow-2xl mb-6 leading-tight">
          Vendor Dashboard 👗✨
        </h1>

        <p className="text-white text-base sm:text-lg md:text-xl max-w-2xl mb-10 sm:mb-14 opacity-90 leading-relaxed">
          Manage your bridal and groom collections, track bookings, 
          and grow your rental business efficiently.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 sm:gap-8 w-full max-w-md sm:max-w-none">

          {/* Add Product */}
          <button
            onClick={() => navigate("/o")}
            className="w-full sm:w-auto px-8 sm:px-14 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold 
                       text-white 
                       bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500
                       shadow-xl hover:shadow-green-500/40
                       transition-all duration-500 
                       hover:scale-105 hover:brightness-110"
          >
            Add New Outfit ➕
          </button>

          {/* Manage */}
          <button
            onClick={() => navigate("/u")}
            className="w-full sm:w-auto px-8 sm:px-14 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold 
                       text-white 
                       bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500
                       shadow-xl hover:shadow-orange-500/40
                       transition-all duration-500 
                       hover:scale-105 hover:brightness-110"
          >
            Manage Collections 📦
          </button>

          {/* Bookings */}
          <button
            onClick={() => navigate("/bht")}
            className="w-full sm:w-auto px-8 sm:px-14 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold 
                       text-white 
                       bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600
                       shadow-xl hover:shadow-blue-500/40
                       transition-all duration-500 
                       hover:scale-105 hover:brightness-110"
          >
            View Bookings 📋
          </button>

        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-white py-6 sm:py-8 text-xs sm:text-sm opacity-80 px-4">
        © 2026 Assa Vendor Panel. All rights reserved.
      </div>

    </div>
  );
}