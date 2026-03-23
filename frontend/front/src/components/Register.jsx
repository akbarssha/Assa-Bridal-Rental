import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../components/api/axios";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", form);
      alert("Registered successfully!");
      console.log(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-700 via-rose-700 to-red-900 flex items-center justify-center px-4 py-10 sm:py-16">
      
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 sm:p-10 transition-all duration-500 hover:scale-105"
      >
        <h2 className="text-2xl sm:text-4xl font-bold text-center text-red-900 mb-8 drop-shadow-lg">
          Create Account 💍
        </h2>

        {/* Name */}
        <div className="mb-5">
          <label className="block text-red-900 mb-2 font-medium">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-2xl bg-white/60 backdrop-blur-md border border-white/40 focus:outline-none focus:ring-2 focus:ring-rose-400 text-red-900 transition-all"
          />
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-red-900 mb-2 font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-2xl bg-white/60 backdrop-blur-md border border-white/40 focus:outline-none focus:ring-2 focus:ring-rose-400 text-red-900 transition-all"
          />
        </div>

        {/* Password */}
        <div className="mb-5">
          <label className="block text-red-900 mb-2 font-medium">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-2xl bg-white/60 backdrop-blur-md border border-white/40 focus:outline-none focus:ring-2 focus:ring-rose-400 text-red-900 transition-all"
          />
        </div>

        {/* Role */}
        <div className="mb-6">
          <label className="block text-red-900 mb-2 font-medium">
            Register As
          </label>
          <select
            name="role"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-2xl bg-white/60 backdrop-blur-md border border-white/40 focus:outline-none focus:ring-2 focus:ring-rose-400 text-red-900 transition-all"
          >
            <option value="customer">Customer</option>
            <option value="vendor">Vendor</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-red-600 to-rose-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          Register
        </button>

        {/* Login Section */}
        <p className="text-center text-red-900 mt-6">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-rose-500 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}