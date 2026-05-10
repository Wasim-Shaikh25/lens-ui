import axiosInstance from "../axios/axiosInstance";
import moment from 'moment';




//Submit form
export const handleSubmit = async (e, formData, navigate, savedItems) => {
  e.preventDefault();

  const cleanedItems = savedItems
    .filter((item) => item.factor || item.description || item.ciCode || item.quantity)
    .map((item) => ({
      srNo: Number(item.srNo) || 0,
      header: item.header || "",
      factor: item.factor || "",
      type: item.type || "",
      size: item.size || "",
      face: item.face || "",
      description: item.description || "",
      ciCode: item.ciCode || "",
      lpItemCode: item.lpItemCode || "",
      drfNo: item.drfNo || "",
      drawingNo: item.drawingNo || "",
      quantity: Number(item.quantity) || 0,
      bookedQuantity: Number(item.bookedQuantity) || 0,
      unit: item.unit || "",
      unitPrice: Number(item.unitPrice) || 0,
      unitLPrice: Number(item.unitLPrice) || 0,
      discount: Number(item.discount) || 0,
      totalValue: Number(item.totalValue) || 0,
      totalListValue: Number(item.totalListValue) || 0,
      naDrgNo: item.naDrgNo === "NA" ? true : item.naDrgNo === "DRG" ? false : Boolean(item.naDrgNo),
      grandTotalListPrice: Number(formData.grandTotalListPrice) || 0,
    }));

  const updatedFormData = {
    branch: formData.branch || "",
    ofmNo: formData.ofmNo || "",
    qutationNumber: formData.qutationNumber || "",
    ofmDate: formData.ofmDate || null,
    poNo: formData.poNo || "",
    poDate: formData.poDate || null,
    orderType: formData.orderType || "",
    category: formData.category || "",
    transportThrough: formData.transportThrough || "",
    customer: formData.customer || "",
    customerAddress: formData.customerAddress || "",
    kindAttentionTo: formData.kindAttentionTo || "",
    transport: formData.transport || "",
    deliveryPeriod: formData.deliveryPeriod || "",
    preQANo: formData.preQANo || "",
    preQADate: formData.preQADate || null,
    statutoryRegulatoryRequirements: Boolean(formData.statutoryRegulatoryRequirements),
    specialInformation: formData.specialInformation || "",
    engineer: formData.engineer || "",
    paymentTerms: formData.paymentTerms || "",
    oaNo: formData.oaNo || "",
    industry: formData.industry || "",
    projectOrder: Boolean(formData.projectOrder),
    penaltyApplicable: Boolean(formData.penaltyApplicable),
    poReceived: Boolean(formData.poReceived),   // ✅ swagger expects boolean, you're sending string
    invoiceTo: formData.invoiceTo || "",
    quotationNo: formData.quotationNo || "",
    priority: formData.priority || "",
    ofmStatus: formData.ofmStatus || "",
    externalInspection: Boolean(formData.externalInspection),
    externalInspectionWhere: formData.externalInspectionWhere || "",
    externalInspectionByWhom: formData.externalInspectionByWhom || "",
    rawMaterialTC: Boolean(formData.rawMaterialTC),
    qcReport: Boolean(formData.qcReport),
    testReport: Boolean(formData.testReport),
    guaranteeCertificate: Boolean(formData.guaranteeCertificate),
    fitmentCertificate: Boolean(formData.fitmentCertificate),
    complianceCertificate: Boolean(formData.complianceCertificate),
    consigneeName: formData.consigneeName || "",
    consigneeAddress: formData.consigneeAddress || "",
    createdOn: formData.createdOn || null,
    updatedOn: formData.updatedOn || null,
    createdByUser: formData.createdByUser || "",
    updatedByUser: formData.updatedByUser || "",
    insurance: Boolean(formData.insurance),      // ✅ swagger expects boolean, you're sending ""
    insuranceBy: formData.insuranceBy || "",
    insuranceBorneBy: formData.insuranceBorneBy || "",
    company: formData.company || "",
    otherCharges: formData.otherCharges || "",
    discount: Number(formData.discount) || 0,   // ✅ swagger expects number, you're sending string "65"
    qapRequired: Boolean(formData.qapRequired),  // ✅ swagger expects boolean, you're sending ""
    oaDate: formData.oaDate || null,
    location: formData.location || "",
    endUserDetail: {
      branch: formData.endUserDetail?.branch || "",
      customerName: formData.endUserDetail?.customerName || "",
      place: formData.endUserDetail?.place || "",
      contactPersonName: formData.endUserDetail?.contactPersonName || "",
      mobileNumber: formData.endUserDetail?.mobileNumber || "",
      emailId: formData.endUserDetail?.emailId || "",
      endUserIndustry: formData.endUserDetail?.endUserIndustry || "",
      knots: formData.endUserDetail?.knots || "",
    },
    ofmItems: cleanedItems,
  };

  console.log("Payload to send:", JSON.stringify(updatedFormData, null, 2));

  try {
    const res = await axiosInstance.post('lens/OrderForwardingMemo/save', updatedFormData);
    console.log("Response:", res.data);
    navigate('/editOfm');
  } catch (error) {
    console.log("Error:", error?.response?.data || error);
  }
};


//getApi
export const getOfm = async(oId,setFormData, setSavedItems)=>{

  try{
    const res = await axiosInstance.get(`lens/OrderForwardingMemo/get?ofmNo=${oId}`)
    const {data} = res;
    console.log("the oId fetched data is ",data)
    setFormData({...data,ofmItems:[]});
    setSavedItems(data.ofmItems);
    }
    catch(err){
      console.log(err);
    }
    
}


//Update API
export const handleUpdate = async (e, formData,oId,savedItems, navigate)=>{
  e.preventDefault();
  console.log("Saved Items are ",savedItems);

  const updatedFormData = { ...formData, ofmItems: savedItems };
    console.log("sending request data is ",updatedFormData);

    try{
        const res = await axiosInstance.put(`lens/OrderForwardingMemo/update`, updatedFormData);
        console.log("response from update is ",res.data);
        oId="";
        navigate(`/ofmSuccess`);
    }
    catch(err){
      console.log(err)
    }

  
}

//get All 
export const getAllApi = async(setData,setIsDeleted)=>{

  try{
    const res = await axiosInstance.get(`lens/OrderForwardingMemo/getAll`)
    setData(res.data);
    console.log("the fetched data is ",res.data);
    setIsDeleted(false)
  
  }catch(err){
    console.log(err)
  }

} 


// delete One
export const deleteDetail = async (ofId,data, setData,setIsDeleted) => {
  try {
    await axiosInstance.delete(`lens/OrderForwardingMemo/delete?ofmNo=${ofId}`);
    const newData = data.filter(item => item.ofmNo !== ofId);
    console.log("data is ",data)
    console.log("New data is ",newData)
    setData(newData);
    setIsDeleted(true)
  } catch (err) {
    console.log(err);
  }
}


export const searchFilter = async (startDate, endDate, branch, ofmNo,engineer,customer,poNo, currentPage,industry,category, itemsPerPage, setData) => {
  console.log("recieved Page number is",currentPage)
  const formattedStartDate = startDate ? moment(startDate).format('YYYY-MM-DD HH:mm:ss') : null;
  const formattedEndDate = endDate ? moment(startDate).format('YYYY-MM-DD HH:mm:ss') : null;

  if (formattedStartDate) {
    console.log("start date is", formattedStartDate);
  }
  if (formattedEndDate) {
    console.log("end date is", formattedEndDate);
  }

  try {
    let url = `lens/getAllOrderForwardingMemoByFilter?`;
    if (startDate) url += `startDate=${formattedStartDate}&`;
    if (endDate) url += `endDate=${formattedEndDate}&`;
    if (branch) url += `branch=${branch}&`;
    if (ofmNo) url += `ofmNo=${ofmNo}&`;
    if (engineer) url += `engineer=${engineer}&`;
    if (customer) url += `customer=${customer}&`;
    if (poNo) url += `poNo=${poNo}&`;
    if (industry) url += `industry=${industry}&`;
    if (category) url += `category=${category}&`;
    url += `pageNo=${currentPage}&pageSize=${itemsPerPage}`;

    console.log("URL:", url); // Log the constructed URL

    const res = await axiosInstance.get(url);
    const { data } = res;
    setData(data);
    console.log("response is", res);
  } catch (err) {
    console.log(err);
  }
}