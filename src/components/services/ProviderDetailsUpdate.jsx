import  { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {useUpdateProviderDetailsMutation} from "../../api/providerApi"
export default function ProviderDetailsUpdate() {
  const [formData, setFormData] = useState({
    serviceProviderId: "", // Ensure userId is included
    companyName: "",
    experienceYears: "",
    address: "",
    companyNumber: "",
    imageUrl: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const [updateProviderDetails, { isLoading, error }] = useUpdateProviderDetailsMutation();
  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("serviceproviderid",decoded.serviceProviderId)
        if (!decoded.serviceProviderId) {
          console.error("provider ID not found in token!");
          return;
        }
        setFormData((prev) => ({ ...prev, serviceProviderId: decoded.serviceProviderId }));
      } catch (error) {
        console.log("Invalid token",error);
      }
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file!");
        return;
      }
      setFormData({
        ...formData,
        profilePictureUrl: formData.profilePictureUrl || "",
      }); // Ensure it's a string });

      // Image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        //setFormData({ ...formData, profilePictureUrl: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await updateProviderDetails(formData).unwrap();
      console.log("response", response);
      toast.success("provider details updated successfully!");
      navigate("/me");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to submit user details.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-4 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">
        Update Provider Details Form
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: "companyName", label: "companyName" },
          { name: "experienceYears", label: "experienceYears" },
          { name: "address", label: "address" },
          { name: "companyNumber", label: "companyNumber" },

       
        ].map(({ name, label, type = "text" }) => (
          <div key={name}>
            <label className="block text-gray-700 font-medium">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>
        ))}

        {/* Profile Picture Upload */}
        <div>
          <label className="block text-gray-700 font-medium">
            Profile Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded"
          />

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Profile Preview"
              className="mt-2 w-32 h-32 rounded-full object-cover border"
            />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
