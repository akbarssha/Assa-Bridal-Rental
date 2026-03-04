import { useNavigate } from "react-router-dom";
import Navbartwo from "./Navbartwo";

export default function Bookingshometwo() {
  const navigate = useNavigate();

  return (
    <div className="w-full py-20 bg-gradient-to-br from-rose-300 via-pink-300 to-amber-200 min-h-screen overflow-x-hidden">
      <Navbartwo />

      <div className="flex flex-col items-center justify-center py-32 px-6">
        
        <h2 className="text-4xl font-bold text-gray-800 mb-16 text-center">
          Bookings Dashboard
        </h2>

        <div className="flex flex-col md:flex-row gap-10 w-full max-w-2xl">

          {/* My Outfit Bookings Button */}
          <button
            onClick={() => navigate("/vbt")}
            className="flex-1 bg-white shadow-2xl rounded-3xl py-10 text-xl font-semibold text-white hover:scale-105 transition-all duration-300 hover:bg-pink-50"
          >
            My Outfit Bookings
          </button>

          {/* All Bookings Button */}
          <button
            onClick={() => navigate("/abt")}
            className="flex-1 bg-white shadow-2xl rounded-3xl py-10 text-xl font-semibold text-white hover:scale-105 transition-all duration-300 hover:bg-pink-50"
          >
            All Bookings
          </button>

        </div>
      </div>
    </div>
  );
}