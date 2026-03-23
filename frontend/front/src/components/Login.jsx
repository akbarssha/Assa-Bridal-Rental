import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../components/api/axios";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));

      toast.success("Login successful 🎉");

      if (res.data.role === "vendor") {
        navigate("/hut");
      } else {
        navigate("/huth");
      }

    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-300 via-pink-300 to-amber-200 flex items-center justify-center px-4 py-10">
      
      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-xl bg-white/30 border border-white/40 shadow-2xl rounded-3xl 
                   p-6 sm:p-8 md:p-10 
                   w-full max-w-md 
                   transition-all duration-300"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-8">
          Welcome Back 💕
        </h2>

        {/* Email */}
        <div className="mb-4 sm:mb-5">
          <label className="block text-gray-700 mb-2 font-medium text-sm sm:text-base">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl 
                       bg-white/60 backdrop-blur-md border border-white/40 
                       focus:outline-none focus:ring-2 focus:ring-pink-400 
                       text-sm sm:text-base transition-all"
          />
        </div>

        {/* Password */}
        <div className="mb-5 sm:mb-6">
          <label className="block text-gray-700 mb-2 font-medium text-sm sm:text-base">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl 
                       bg-white/60 backdrop-blur-md border border-white/40 
                       focus:outline-none focus:ring-2 focus:ring-pink-400 
                       text-sm sm:text-base transition-all"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full py-2.5 sm:py-3 rounded-xl 
                     bg-gradient-to-r from-pink-500 to-rose-500 
                     text-white text-sm sm:text-base font-semibold 
                     shadow-lg hover:shadow-xl 
                     transition-all duration-300"
        >
          Login
        </button>

        {/* Register */}
        <p className="text-center text-gray-700 mt-5 sm:mt-6 text-sm sm:text-base">
          Don’t have an account?{" "}
          <Link
            to="/r"
            className="text-pink-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}