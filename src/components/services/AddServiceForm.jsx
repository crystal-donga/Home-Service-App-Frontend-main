// import  { useState } from "react";


// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css"; 
// import { useNavigate } from "react-router-dom";


const AddServiceForm = ( ) => {
 
  // const navigate=useNavigate();
  // const[closeForm,setCloseForm] = useState(false);
  // const handleForm=()=>{               
  //   setCloseForm(true)
  // }
  // const [service, setService] = useState({
  
  //   serviceName: "",
  //   description: "",
  //   serviceImages: null
  // });
  // const [isSubmitting, setIsSubmitting] = useState(false); // Disable button while submitting

  // const handleChange = (e) => {
  //   const { name, value, files } = e.target;
  //   console.log("File selected:", files); // Debugging step
  //   setService((prev) => ({
  //     ...prev,
  //     [name]: files ? files[0] : value,
  //   }));
  // };

  // const handleSubmit = async(e) => {
  //   e.preventDefault();

    //data store in backend and redux-store
  //  console.log("before try block",service)
  //   try{
  //     const formData = new FormData();
    
  //     formData.append("serviceName", service.serviceName);
  //     formData.append("description", service.description);
  //     console.log("images",service.serviceImages)
  //     if (service.serviceImages) {
  //       formData.append("serviceImages", service.serviceImages);
  //     }
  //     // Store image as preview URL
  //     const previewImage = service.serviceImages ? URL.createObjectURL(service.serviceImages) : null;
  //     console.log("url of images",previewImage)
  //     console.log("between try block",service)
      // ----- post to action ----
      // Send data to backend
      // const response = await axios.post("http://localhost:8080/api/addService", formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });

      // console.log("Service stored in backend:", response.data);

      // if(response.status===201 || response.status===200){
      //     console.log("service store in backend",response.data)
      // }

      // Dispatch action to Redux store
    
       //console.log(formData)
      //dispatch(createService(formData))
     

      // Show success toast
      // toast.success("🎉 Service added successfully!", {
      //   position: "top-right",
      //   autoClose: 3000, // Closes after 3 seconds
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   theme: "colored",
      // });

      // Reset form
      // setService({
       
      //   serviceName: "",
      //   description: "",
      //   serviceImages: null,
      // });

      // Automatically close form after successful submission
  //     setTimeout(() => {
  //      navigate("/view-services")
  //     }, 2000);
  //   } catch (error) {
  //     console.error("Error adding service:", error);
  //     toast.error("❌ Failed to add service. Please try again.");
  //   } finally {
  //     setIsSubmitting(false); // Re-enable button
  //   }
  // };
  // if(closeForm) return null;
    return (
     
    //   <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg relative">
    //     <button
    //       onClick={handleForm}
    //       className="absolute top-2 right-2 text-red-500 text-lg"
    //     >
    //       ✖
    //     </button>
    //     <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
    //   <h2 className="text-2xl font-bold mb-4">Add New Service</h2>
    //   <form onSubmit={handleSubmit} className="space-y-4">
       
    //     <input
    //       type="text"
    //       name="serviceName"
    //       placeholder="Service Name"
    //       value={service.serviceName}
    //       onChange={handleChange}
    //       className="w-full p-2 border rounded"
    //       required
    //     />
    //       <textarea
    //       name="description"
    //       placeholder="Service Description"
    //       value={service.description}
    //       onChange={handleChange}
    //       className="w-full p-2 border rounded"
    //       required
    //     />
    //     <input
    //       type="file"
    //       name="serviceImages"
    //       accept="image/*"
    //       onChange={handleChange}
    //       className="w-full p-2 border rounded"
    //     />
    //     <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
    //       Submit
    //     </button>
    //   </form>
    // </div>
    // </div>
      <>
      <h1>add services</h1>
      </>
    );
  };
  
  export default AddServiceForm;
  