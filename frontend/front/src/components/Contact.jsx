import Navbar from "./Navbar";
import { useState } from "react";
import API from "../components/api/axios";
export default function Contact() {

  const [formData, setFormData] = useState({
  name: "",
  email: "",
  message: "",
});

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await API.post("/contact", formData);

    alert("Message sent successfully 💌");

    setFormData({
      name: "",
      email: "",
      message: "",
    });

  } catch (err) {
    alert("Failed to send message");
  }
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-700 via-rose-700 to-red-900 py-16 px-6">
      
      <Navbar />

      <h2 className="text-4xl font-bold text-center text-white mb-12 drop-shadow-lg">
        Contact Us 💌
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        
        {/* Contact Info Card */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
          <h3 className="text-2xl font-bold text-red-900 mb-6">
            Get In Touch
          </h3>

          <div className="space-y-4 text-red-800">
            <p>
              <span className="font-semibold">📍 Address:</span> Assa rentals, Kerala
            </p>
            <p>
              <span className="font-semibold">📞 Phone:</span> +91 98765 43210
            </p>
            <p>
              <span className="font-semibold">📧 Email:</span> assa@weddingcouture.com
            </p>
            <p>
              We’re here to help you find your perfect wedding outfit.
              Feel free to reach out anytime!
            </p>
          </div>
        </div>

        {/* Contact Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h3 className="text-2xl font-bold text-red-900 mb-6">
            Send a Message
          </h3>

         <form onSubmit={handleSubmit} className="space-y-5">
            
           <input
  type="text"
  name="name"
  value={formData.name}
  onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 rounded-xl border border-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />

            <input
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-3 rounded-xl border border-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />

            <textarea
  name="message"
  value={formData.message}
  onChange={handleChange}
              rows="4"
              placeholder="Your Message"
              className="w-full p-3 rounded-xl border border-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-red-500/40"
            >
              Send Message
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}