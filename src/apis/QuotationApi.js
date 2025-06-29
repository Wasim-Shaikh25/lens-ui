import axiosInstance from "../axios/axiosInstance";



export const handleSubmit = async(e, navigate, formData, savedItems)=>{
    e.preventDefault();
    // Update the formData with the new items array
    const updatedFormData = { ...formData, items: savedItems };

    console.log("Updated formData:", updatedFormData);

    try {
      const res = await axiosInstance.post('lens/Quotation/save',updatedFormData);
      const {data} = res;
      console.log("data is ",data)
      navigate('/quotationSuccess')
    } catch (error) {
      console.log(error)
    }
  
  }

  export const getAllQuotation = async(setData)=>{

    try
    {
      const {data} = await axiosInstance.get("lens/Quotation/getAll")
      setData(data)
      console.log("Response Data is ",data)
    }
    
    catch(err){
        console.log(err);   
    }

  }