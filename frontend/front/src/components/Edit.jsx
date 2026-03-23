import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../components/api/axios";
import Navbartwo from "./Navbartwo";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    pricePerDay: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  // ✅ FIX: Base URL from ENV
  const BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:3036";

  useEffect(() => {
    API.get(`/outfits/${id}`).then((res) => {
      setForm(res.data);

      // ✅ FIXED IMAGE PREVIEW
      if (res.data.images && res.data.images.length > 0) {
        setImagePreview(`${BASE_URL}${res.data.images[0]}`);
      }
    });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("pricePerDay", form.pricePerDay);

    if (imageFile) {
      formData.append("images", imageFile);
    }

    await API.put(`/outfits/update/${id}`, formData);

    alert("Outfit Updated Successfully 🎉");

    navigate("/u"); // go back to My Outfits page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-indigo-300 to-slate-300 py-16 px-6">
      <Navbartwo />

      <div className="max-w-lg mx-auto bg-white p-8 rounded-3xl shadow-2xl">
        <h2 className="text-2xl font-bold text-center mb-6">
          Edit Outfit
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Image Preview */}
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-64 object-cover rounded-xl"
            />
          )}

          <input
            type="file"
            onChange={handleImageChange}
            className="w-full"
          />

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-3 border rounded-xl"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-3 border rounded-xl"
          />

          <input
            name="pricePerDay"
            value={form.pricePerDay}
            onChange={handleChange}
            placeholder="Price Per Day"
            className="w-full p-3 border rounded-xl"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Update Outfit
          </button>
        </form>
      </div>
    </div>
  );
}