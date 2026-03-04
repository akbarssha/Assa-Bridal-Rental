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
    <div>
    <Navbartwo/>
    <div className="min-h-screen bg-gradient-to-br from-rose-200 to-pink-300 flex justify-center items-center p-6 pt-24">
      
      <form
        onSubmit={submitHandler}
        className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-xl"
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          Create Outfit 👗
        </h2>

        {/* Bride or Groom Selection */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Outfit For
          </label>
          <select
            name="forWhom"
            value={form.forWhom}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border"
          >
            <option value="bride">Bride</option>
            <option value="groom">Groom</option>
          </select>
        </div>

        {["title", "description", "pricePerDay", "size"].map(
          (field) => (
            <input
              key={field}
              name={field}
              placeholder={field}
              value={form[field]}
              onChange={handleChange}
              className="w-full p-3 mb-4 rounded-xl border"
            />
          )
        )}

      <input type="file"
       multiple
  onChange={(e) =>
    setForm({ ...form, images: e.target.files })
  }
  className="w-full p-3 mb-6 rounded-xl border"
/>

        <button className="w-full bg-pink-500 text-white py-3 rounded-xl hover:bg-pink-600 transition">
          Create Outfit
        </button>
      </form>
    </div>
    </div>
  );
}