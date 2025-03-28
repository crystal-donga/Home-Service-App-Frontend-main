
import  { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode
import { useGetProviderDetailsQuery,useDeleteProviderDetailsMutation } from "../../api/providerApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

 const ProviderProfile = () => {
  const [userId, setUserId] = useState();
  //const [serviceProviderId,setServiceProviderId] = useState();
   const navigate = useNavigate()
   const [deleteProviderDetails] = useDeleteProviderDetailsMutation();
  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded JWT:", decoded);

        if (!decoded.userId) {
          console.error("User ID not found in token!");
          return;
        }
        setUserId(decoded.userId);
      } catch (error) {
        console.error("Invalid Token");
      }
    }
  }, []);

  const handleEdit = () => {
    navigate("/provider-profile-update");
  };
   const handleDelete = async () => {
      const confirmDelete = window.confirm("Are you sure you want to delete your profile? This action is irreversible!");
    
      if (confirmDelete) {
        try {
          // Call API to delete user (assuming you have `useDeleteUserMutation` hook)
          const response = await deleteProviderDetails({ serviceProviderId: provider.serviceProviderId }).unwrap();

          console.log("provider deleted successfully:", response);
    
          // Remove auth token from cookies
          Cookies.remove("authToken");
    
          // Clear local storage
          localStorage.removeItem("user");
    
          // Show success message
          toast.success("Your profile has been deleted successfully!");
    
          // Redirect to login page
          navigate("/login");
        } catch (error) {
          console.error("Error deleting profile:", error);
          toast.error("Failed to delete profile. Please try again.");
        }
      }
    };
  // Fetch provider details only when userId is available
  const { data: provider, error, isLoading } = useGetProviderDetailsQuery(userId, {
    skip: !userId, // Skip API call if userId is null
  });
  console.log("provider",provider)
  if (isLoading) return <div className="text-center text-blue-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error fetching profile</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">My Profile</h2>
      {provider ? (
        <div className="flex flex-col items-center">
          <img
           src={provider.profilePictureUrl || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-md object-cover"
            onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
          />
          <div className="mt-4 w-full">
            <p className="text-gray-700 text-lg">
              <span className="font-medium text-gray-900">Name:</span> {provider.userName}
            </p>
            <p className="text-gray-700 text-lg">
              <span className="font-medium text-gray-900">Email:</span> {provider.email}
            </p>
            <p className="text-gray-700 text-lg">
              <span className="font-medium text-gray-900">Company Name:</span> {provider.companyName}
            </p>
            <p className="text-gray-700 text-lg">
              <span className="font-medium text-gray-900">Company Number:</span> {provider.companyNumber}
            </p>
            <p className="text-gray-700 text-lg">
              <span className="font-medium text-gray-900">role:</span> {provider.role}
            </p>
            <p className="text-gray-700 text-lg">
              <span className="font-medium text-gray-900">Experience:</span> {provider.experienceYears} years
            </p>
            <p className="text-gray-700 text-lg">
              <span className="font-medium text-gray-900">Address:</span> {provider.address}
            </p>
            <p className="text-gray-700 text-lg">
              <span className="font-medium text-gray-900">Phone:</span> {provider.phoneNumber}
            </p>
            <p className="text-gray-700 text-lg">
              <span className="font-medium text-gray-900">Joinind Date :</span> {provider.joiningDate}
            </p>
             {/* Edit & Delete Buttons */}
          <div className="flex space-x-4 mt-6">
            <button
              onClick={handleEdit}
              className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded-md shadow hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No Profile Data</p>
      )}
    </div>
  );
};
export default ProviderProfile