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
      navigate('/EditQuotation')
    } catch (error) {
      console.log(error)
    }
  
  }
  


export const handleUpdate = async(e, navigate, formData, savedItems)=>{

    e.preventDefault();
    // Update the formData with the new items array
    const updatedFormData = { ...formData, items: savedItems };

    console.log("Updated formData:", updatedFormData);

    try {
      const res = await axiosInstance.put('lens/Quotation/update',updatedFormData);
      const {data} = res;
      console.log("data is ",data)
      navigate('/EditQuotation')
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


  export const deleteDetail = async(quotationId,data,setData, setIsDeleted)=>{

    try
    {
      await axiosInstance.delete(`lens/Quotation/delete?id=${quotationId}`)
      const newData  = data.filter((elem)=>(elem.quotationId!==quotationId))
    setIsDeleted(true);
    setData(newData);
      console.log("Response Data is ",data)
    }
    
    catch(err){
        console.log(err);   
    }

  }

  export const getQuotation = async(qId,setFormData)=>{

    try{
      const {data} = await axiosInstance.get(`lens/Quotation/get?id=${qId}`)
      setFormData(data)
    }
    catch(err){
      console.log(err);
      
    }

  }