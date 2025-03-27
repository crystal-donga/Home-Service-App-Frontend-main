import  { useState, useEffect} from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import  {useCreateUserDetailsMutation }  from "../../api/userApi";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // Ensure jwtDecode is imported
import { useNavigate } from "react-router-dom";

const UserDetailsForm = () => {
  const [formData, setFormData] = useState({
    userId: "", // Ensure userId is included
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    dateOfBirth: "",
    profilePictureUrl: null,
   
    
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [createUserDetails] = useCreateUserDetailsMutation();
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (!decoded.userId) {
          console.error("User ID not found in token!");
          return;
        }
        setFormData((prev) => ({ ...prev, userId: decoded.userId }));
      } catch (error) {
        console.log("Invalid token");
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
      setFormData({ ...formData, profilePicture: file });

      // Image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.zipCode) newErrors.zipCode = "Zip Code is required";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of Birth is required";
    //  if (!formData.profilePictureUrl) newErrors.profilePicture = "Profile Picture is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    
//      // Convert date format from "YYYY-MM-DD" to "DD-MM-YYYY"
//   const formattedDate = formData.dateOfBirth
//   ? formData.dateOfBirth.split("-").reverse().join("-")
//   : "";

// const updatedFormData = { ...formData, dateOfBirth: formattedDate };
    try {
      console.log(formData)
     await createUserDetails(formData).unwrap();
    //console.log("response",response)
      toast.success("User details submitted successfully!");
      navigate("/me")
      
    } catch (error) {
      toast.error(error?.data?.message || "Failed to submit user details.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-4 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">User Details Form</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
           { name: "address", label: "Address" },
           { name: "city", label: "City" },
           { name: "state", label: "State" }, 
          { name: "country", label: "Country" },
        
          { name: "zipCode", label: "Zip Code" },
          { name: "dateOfBirth", label: "Date of Birth", type: "date" },
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
            {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
          </div>
        ))}

        {/* Profile Picture Upload */}
        <div>
          <label className="block text-gray-700 font-medium">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.profilePictureUrl && <p className="text-red-500 text-sm">{errors.profilePictureUrl}</p>}
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
};

export default UserDetailsForm;


