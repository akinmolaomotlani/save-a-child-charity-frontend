import { useState } from "react";
import PageNav from "../components/PageNav";

export default function VolunteerForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    idType: "",
    idNumber: "",
    ssn: "",
    passport: null,
    address: "",
    additionalDocs: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Volunteer Data:", formData);
    alert("Form submitted! (Integrate with backend API)");
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
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Means of Identification */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block mb-1 font-medium">ID Type</label>
                <select
                  name="idType"
                  value={formData.idType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select ID Type</option>
                  <option value="driverLicense">Driver's License</option>
                  <option value="nationalID">National ID</option>
                  <option value="passport">Passport</option>
                </select>
              </div>

              <div className="flex-1">
                <label className="block mb-1 font-medium">ID Number</label>
                <input
                  type="text"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* SSN */}
            <div>
              <label className="block mb-1 font-medium">
                Social Security Number (SSN)
              </label>
              <input
                type="text"
                name="ssn"
                value={formData.ssn}
                onChange={handleChange}
                required
                placeholder="XXX-XX-XXXX"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Passport Photo */}
            <div>
              <label className="block mb-1 font-medium">Passport Photo</label>
              <input
                type="file"
                name="passport"
                accept="image/*"
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block mb-1 font-medium">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>

            {/* Additional Documents */}
            <div>
              <label className="block mb-1 font-medium">
                Additional Documents
              </label>
              <input
                type="file"
                name="additionalDocs"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                className="w-full"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
