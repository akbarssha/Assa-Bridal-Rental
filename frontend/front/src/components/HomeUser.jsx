import { useNavigate } from "react-router-dom";
import Login from "./Login";

export default function HomeUser() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-700 via-rose-700 to-red-900 overflow-x-hidden">

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center px-6 py-32">
        
        <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-2xl mb-6">
          Assa Bride & Groom Rental 👑
        </h1>

        <p className="text-red-100 text-lg md:text-xl max-w-2xl mb-14 leading-relaxed">
          Discover stunning bridal lehengas and royal groom sherwanis for your
          special day. Rent luxury outfits at affordable prices.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-8">

          {/* Bride Button */}
          <button
            onClick={() => navigate("/bpt")}
            className="px-14 py-4 rounded-full text-lg font-semibold 
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
            onClick={() => navigate("/gpt")}
            className="px-14 py-4 rounded-full text-lg font-semibold 
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
      <Login/>

     

      {/* Footer */}
      <div className="text-center text-red-200 py-8 text-sm opacity-90">
        © 2026 Assa Bride & Groom Rentals. All rights reserved.
      </div>

    </div>
  );
}