import axiosInstance from "../axios/axiosInstance";
import moment from 'moment';


const formatDateTime = (val) => {
  if (!val) return null;
  return moment(val).format("YYYY-MM-DD HH:mm:ss"); // space not T
};

export const handleSubmit = async(e, navigate, formData, savedItems)=>{
    e.preventDefault();
    // Update the formData with the new items array
    const updatedFormData = { ...formData,
      freight: parseFloat(formData.freight) || 0,
      discount: parseFloat(formData.discount) || 0,
      sgst: parseFloat(formData.sgst) || 0,
      cgst: parseFloat(formData.cgst) || 0,
      igst: parseFloat(formData.igst) || 0,
      quotationDate: formatDateTime(formData.quotationDate),
      pAndF: parseFloat(formData.pAndF) || 0,
      enquiryDate: formatDateTime(formData.enquiryDate),
      revisionDate: formatDateTime(formData.revisionDate),

       items: savedItems };

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
    const updatedFormData = { ...formData,    freight: parseFloat(formData.freight) || 0,
      discount: parseFloat(formData.discount) || 0,
      sgst: parseFloat(formData.sgst) || 0,
      cgst: parseFloat(formData.cgst) || 0,
      igst: parseFloat(formData.igst) || 0,
      quotationDate: formatDateTime(formData.quotationDate),
      pAndF: parseFloat(formData.pAndF) || 0,
      enquiryDate: formatDateTime(formData.enquiryDate),
      revisionDate: formatDateTime(formData.revisionDate),
       items: savedItems };

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

  export const getQuotation = async(qId,setFormData, setSavedItems)=>{

    try{
      const {data} = await axiosInstance.get(`lens/Quotation/get?id=${qId}`)
      setFormData({...data,quotationDate: data.quotationDate ? moment(data.quotationDate) : moment(),
        enquiryDate: data.enquiryDate ? moment(data.enquiryDate) : null,
        revisionDate: data.revisionDate ? moment(data.revisionDate) : null,
        dueOn: data.dueOn ? moment(data.dueOn) : null, items: [
        { itemName: '', itemDescription: '', quantity: 0, unitPrice: 0, totalPrice: 0, currency: '', itemCode: '', uom: '', discount: 0, tax: 0 }
      ]})
      setSavedItems([...data.items])
    }
    catch(err){
      console.log(err);
      
    }

  }