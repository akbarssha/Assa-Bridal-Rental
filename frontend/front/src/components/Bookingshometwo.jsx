import { useNavigate } from "react-router-dom";
import Navbartwo from "./Navbartwo";

export default function Bookingshometwo() {
  const navigate = useNavigate();

  return (
    <div className="w-full py-10 sm:py-20 bg-gradient-to-br from-rose-300 via-pink-300 to-amber-200 min-h-screen">
      <Navbartwo />

      <div className="flex flex-col items-center justify-center py-16 sm:py-32 px-4 sm:px-6">
        
        {/* Title */}
        <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-10 sm:mb-16 text-center">
          Bookings Dashboard
        </h2>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-6 sm:gap-10 w-full max-w-2xl">

          {/* My Bookings */}
          <button
            onClick={() => navigate("/vbt")}
            className="flex-1 bg-gradient-to-r from-indigo-500 to-blue-500 shadow-xl rounded-2xl sm:rounded-3xl py-6 sm:py-10 text-base sm:text-xl font-semibold text-white hover:scale-105 transition-all duration-300"
          >
            My Outfit Bookings
          </button>

          {/* All Bookings */}
          <button
            onClick={() => navigate("/abt")}
            className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 shadow-xl rounded-2xl sm:rounded-3xl py-6 sm:py-10 text-base sm:text-xl font-semibold text-white hover:scale-105 transition-all duration-300"
          >
            All Bookings
          </button>

        </div>
      </div>
    </div>
  );
}