import { useState } from "react";
import API from "../components/api/axios";
import Navbartwo from "./Navbartwo";

export default function CreateOutfit() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    pricePerDay: "",
    size: "",
    images: "",
    forWhom: "bride",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("pricePerDay", form.pricePerDay);
    formData.append("size", form.size);
    formData.append("forWhom", form.forWhom);

    for (let i = 0; i < form.images.length; i++) {
      formData.append("images", form.images[i]);
    }

    await API.post("/outfits", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    alert("Outfit Created 🎉");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-200 via-pink-300 to-rose-300 overflow-x-hidden">
      <Navbartwo />

      <div className="flex justify-center items-center p-6 pt-24">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-xl bg-white/30 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl p-8 transition-all duration-500 hover:scale-105"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 drop-shadow-md">
            Create Outfit 👗
          </h2>

          {/* Outfit For */}
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">
              Outfit For
            </label>
            <select
              name="forWhom"
              value={form.forWhom}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-white/40 bg-white/50 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
            >
              <option value="bride">Bride</option>
              <option value="groom">Groom</option>
            </select>
          </div>

          {/* Text Inputs */}
          {["title", "description", "pricePerDay", "size"].map((field) => (
            <input
              key={field}
              name={field}
              placeholder={field}
              value={form[field]}
              onChange={handleChange}
              className="w-full p-3 mb-4 rounded-xl border border-white/40 bg-white/50 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
            />
          ))}

          {/* File Upload */}
          <input
            type="file"
            multiple
            onChange={(e) => setForm({ ...form, images: e.target.files })}
            className="w-full p-3 mb-6 rounded-xl border border-white/40 bg-white/50 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
          />

          <button className="w-full py-3 rounded-xl bg-pink-500 text-white font-semibold shadow-lg hover:shadow-xl hover:bg-pink-600 transition-all duration-300">
            Create Outfit
          </button>
        </form>
      </div>
    </div>
  );
}