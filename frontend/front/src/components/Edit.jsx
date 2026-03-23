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
  const [loading, setLoading] = useState(false);

  // ✅ Base URL
  const BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:3036";

  // ✅ Fetch outfit safely
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get(`/outfits/${id}`);
        setForm({
          title: res.data.title || "",
          description: res.data.description || "",
          pricePerDay: res.data.pricePerDay || "",
        });

        if (res.data.images?.length > 0) {
          setImagePreview(`${BASE_URL}${res.data.images[0]}`);
        }
      } catch (err) {
        alert("Failed to load outfit");
      }
    };

    fetchData();
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

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("pricePerDay", form.pricePerDay);

      if (imageFile) {
        formData.append("images", imageFile);
      }

      await API.put(`/outfits/update/${id}`, formData);

      alert("Outfit Updated Successfully 🎉");
      navigate("/u");
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-indigo-300 to-slate-300 pt-20 px-4 sm:px-6 md:px-10 pb-10">
      <Navbartwo />

      <div className="max-w-md sm:max-w-lg mx-auto bg-white p-6 sm:p-8 rounded-3xl shadow-2xl">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">
          Edit Outfit
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          
          {/* ✅ Image Preview */}
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-48 sm:h-64 object-cover rounded-xl"
            />
          )}

          {/* File Upload */}
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full text-sm"
          />

          {/* Title */}
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-3 border rounded-xl text-sm sm:text-base"
            required
          />

          {/* Description */}
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-3 border rounded-xl text-sm sm:text-base"
            required
          />

          {/* Price */}
          <input
            type="number"
            name="pricePerDay"
            value={form.pricePerDay}
            onChange={handleChange}
            placeholder="Price Per Day"
            className="w-full p-3 border rounded-xl text-sm sm:text-base"
            required
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Outfit"}
          </button>
        </form>
      </div>
    </div>
  );
}