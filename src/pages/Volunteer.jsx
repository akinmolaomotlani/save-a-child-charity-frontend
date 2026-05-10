import { useState } from "react";
import axios from "axios";
import PageNav from "../components/PageNav";
import API_URL from "../config/api";

export default function VolunteerForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    skills: "",
    availability: "",
    address: "",
    motivation: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // CREATE FORMDATA
      const volunteerData = new FormData();

      volunteerData.append("fullName", formData.fullName);
      volunteerData.append("email", formData.email);
      volunteerData.append("phone", formData.phone);
      volunteerData.append("skills", formData.skills);
      volunteerData.append("availability", formData.availability);
      volunteerData.append("address", formData.address);
      volunteerData.append("motivation", formData.motivation);

      if (formData.image) {
        volunteerData.append("image", formData.image);
      }

      // API REQUEST
      const response = await axios.post(`${API_URL}`, volunteerData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(response.data.message);

      console.log(response.data);

      // RESET FORM
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        skills: "",
        availability: "",
        address: "",
        motivation: "",
        image: null,
      });
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageNav />

      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
          <h2 className="text-2xl font-bold text-center mb-6">
            Volunteer Signup
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label className="block mb-1 font-medium">Full Name</label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 font-medium">Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-1 font-medium">Phone Number</label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            {/* Skills */}
            <div>
              <label className="block mb-1 font-medium">Skills</label>

              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="Teaching, Fundraising, Cooking"
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            {/* Availability */}
            <div>
              <label className="block mb-1 font-medium">Availability</label>

              <select
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
              >
                <option value="">Select Availability</option>

                <option value="weekdays">Weekdays</option>

                <option value="weekends">Weekends</option>

                <option value="full-time">Full Time</option>
              </select>
            </div>

            {/* Address */}
            <div>
              <label className="block mb-1 font-medium">Address</label>

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            {/* Motivation */}
            <div>
              <label className="block mb-1 font-medium">
                Why do you want to volunteer?
              </label>

              <textarea
                name="motivation"
                value={formData.motivation}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block mb-1 font-medium">Upload Photo</label>

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="w-full"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
