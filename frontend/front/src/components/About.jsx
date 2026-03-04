import Navbar from "./Navbar";

export default function About() {
  return (
    <div 
      id="about" 
      className="min-h-screen bg-gradient-to-br from-red-700 via-rose-700 to-red-900 py-16 px-6"
    >
      
      <Navbar />

      <h2 className="text-4xl font-bold text-center text-white mb-12 drop-shadow-lg">
        About Us 💍
      </h2>

      <div className="max-w-6xl mx-auto space-y-12">

        {/* Main Story Card */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-10 text-center">
          <h3 className="text-2xl font-bold text-red-900 mb-6">
            Our Story
          </h3>
          <p className="text-red-800 leading-relaxed text-lg">
            At Assa rentals, we believe every bride and groom deserves to 
            shine on their special day. Our curated collection of premium 
            wedding outfits is designed to bring elegance, tradition, and 
            modern style together in perfect harmony.
          </p>
        </div>

        {/* Mission & Vision Section */}
        <div className="grid md:grid-cols-2 gap-10">

          {/* Mission */}
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <h3 className="text-xl font-bold text-red-900 mb-4">
              Our Mission ✨
            </h3>
            <p className="text-red-800 leading-relaxed">
              To make luxury wedding fashion accessible and convenient 
              through a seamless rental experience. We aim to provide 
              exceptional service and unforgettable style.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <h3 className="text-xl font-bold text-red-900 mb-4">
              Our Vision 🌸
            </h3>
            <p className="text-red-800 leading-relaxed">
              To become the most trusted wedding outfit rental platform, 
              helping couples celebrate their love with confidence and grace.
            </p>
          </div>

        </div>

        {/* Why Choose Us Section */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-10">
          <h3 className="text-2xl font-bold text-red-900 mb-6 text-center">
            Why Choose Us?
          </h3>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">

            <div>
              <div className="text-4xl mb-3">👗</div>
              <p className="font-semibold text-red-900">Premium Designs</p>
              <p className="text-red-700 text-sm mt-2">
                Handpicked outfits crafted with elegance and detail.
              </p>
            </div>

            <div>
              <div className="text-4xl mb-3">💎</div>
              <p className="font-semibold text-red-900">Affordable Luxury</p>
              <p className="text-red-700 text-sm mt-2">
                Experience designer fashion without the heavy price tag.
              </p>
            </div>

            <div>
              <div className="text-4xl mb-3">🚚</div>
              <p className="font-semibold text-red-900">Easy Booking</p>
              <p className="text-red-700 text-sm mt-2">
                Simple process with secure payments and timely delivery.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}