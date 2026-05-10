import axiosInstance from "../axios/axiosInstance";
import moment from 'moment';



const formatDateTime = (val) => {
  if (!val) return null;
  return moment(val).format("YYYY-MM-DD HH:mm:ss");
};

const buildOfmPayload = (formData, savedItems, isUpdate = false) => {
  const cleanedItems = savedItems
    .filter((item) => item.factor || item.description || item.ciCode || item.quantity)
    .map((item) => ({
      ...(isUpdate && item.ofmItemId ? { ofmItemId: item.ofmItemId } : {}),
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
      naDrgNo: item.naDrgNo === "NA"
        ? true
        : item.naDrgNo === "DRG"
        ? false
        : Boolean(item.naDrgNo),
      grandTotalListPrice: Number(formData.grandTotalListPrice) || 0,
    }));

  return {
    ...(isUpdate && formData.ofmId ? { ofmId: formData.ofmId } : {}),
    branch: formData.branch || "",
    ofmNo: formData.ofmNo || "",
    qutationNumber: formData.qutationNumber || "",
    ofmDate: formatDateTime(formData.ofmDate),
    poNo: formData.poNo || "",
    poDate: formatDateTime(formData.poDate),
    orderType: formData.orderType || "",
    category: formData.category || "",
    transportThrough: formData.transportThrough || "",
    customer: formData.customer || "",
    customerAddress: formData.customerAddress || "",
    kindAttentionTo: formData.kindAttentionTo || "",
    transport: formData.transport || "",
    deliveryPeriod: formData.deliveryPeriod || "",
    preQANo: formData.preQANo || "",
    preQADate: formatDateTime(formData.preQADate),
    statutoryRegulatoryRequirements: Boolean(formData.statutoryRegulatoryRequirements),
    specialInformation: formData.specialInformation || "",
    engineer: formData.engineer || "",
    paymentTerms: formData.paymentTerms || "",
    oaNo: formData.oaNo || "",
    oaDate: formatDateTime(formData.oaDate),
    industry: formData.industry || "",
    projectOrder: Boolean(formData.projectOrder),
    penaltyApplicable: Boolean(formData.penaltyApplicable),
    poReceived: Boolean(formData.poReceived),
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
    createdOn: formatDateTime(formData.createdOn),
    updatedOn: formatDateTime(formData.updatedOn),
    createdByUser: formData.createdByUser || "",
    updatedByUser: formData.updatedByUser || "",
    insurance: Boolean(formData.insurance),
    insuranceBy: formData.insuranceBy || "",
    insuranceBorneBy: formData.insuranceBorneBy || "",
    company: formData.company || "",
    otherCharges: formData.otherCharges || "",
    discount: parseFloat(formData.discount) || 0,
    qapRequired: Boolean(formData.qapRequired),
    location: formData.location || "",
    endUserDetail: {
      ...(isUpdate && formData.endUserDetail?.endUserDetailId
        ? { endUserDetailId: formData.endUserDetail.endUserDetailId }
        : {}),
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
};


// ── Submit (POST - new record) ──
export const handleSubmit = async (e, navigate, formData, savedItems) => {
  e.preventDefault();
  const payload = buildOfmPayload(formData, savedItems, false);
  console.log("Submit Payload:", JSON.stringify(payload, null, 2));
  try {
    const res = await axiosInstance.post('lens/OrderForwardingMemo/save', payload);
    console.log("Submit Response:", res.data);
    navigate('/editOfm');
  } catch (error) {
    console.log("Submit Error:", error?.response?.data || error);
  }
};


// ── Update (PUT - existing record) ──
export const handleUpdate = async (e, navigate, formData, savedItems) => {
  e.preventDefault();
  const payload = buildOfmPayload(formData, savedItems, true);
  console.log("Update Payload:", JSON.stringify(payload, null, 2));
  try {
    const res = await axiosInstance.put('lens/OrderForwardingMemo/update', payload);
    console.log("Update Response:", res.data);
    navigate('/editOfm');
  } catch (error) {
    console.log("Update Error:", error?.response?.data || error);
  }
};


// ── Get OFM by ID ──
export const getOfm = async (oId, setFormData, setSavedItems) => {
  try {
    const { data } = await axiosInstance.get(`lens/OrderForwardingMemo/get?ofmNo=${oId}`);

    const savedItems = (data.ofmItems || []).map((item) => ({
      ofmItemId: item.ofmItemId,
      srNo: item.srNo || 0,
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
      quantity: item.quantity || "",
      bookedQuantity: item.bookedQuantity || "",
      unit: item.unit || "",
      unitPrice: item.unitPrice || "",
      unitLPrice: item.unitLPrice || "",
      discount: item.discount || "",
      totalValue: item.totalValue || "",
      totalListValue: item.totalListValue || "",
      naDrgNo: item.naDrgNo === true
        ? "NA"
        : (item.naDrgNo === false && item.drawingNo)
        ? "DRG"
        : "",
      grandTotalListPrice: item.grandTotalListPrice || "",
    }));

    setSavedItems(savedItems);

    // Derive grandTotal from items since backend stores it per item
    const grandTotal = (data.ofmItems || []).reduce(
      (sum, it) => sum + (Number(it.totalValue) || 0), 0
    );
    const grandTotalListPrice = (data.ofmItems || []).reduce(
      (sum, it) => sum + (Number(it.grandTotalListPrice) || 0), 0
    );

    // Apply stored discount to derive displayed grand totals
    const storedDiscount = Number(data.discount) || 0;
    const finalGrandTotal = grandTotal - (grandTotal * storedDiscount) / 100;
    const finalGrandListTotal = grandTotalListPrice - (grandTotalListPrice * storedDiscount) / 100;

    setFormData({
      ofmId: data.ofmId,
      branch: data.branch || "",
      ofmNo: data.ofmNo || "",
      qutationNumber: data.qutationNumber || "",
      ofmDate: data.ofmDate ? moment(data.ofmDate) : null,
      poNo: data.poNo || "",
      poDate: data.poDate ? moment(data.poDate) : null,
      orderType: data.orderType || "",
      category: data.category || "",
      transportThrough: data.transportThrough || "",
      customer: data.customer || "",
      customerAddress: data.customerAddress || "",
      kindAttentionTo: data.kindAttentionTo || "",
      transport: data.transport || "",
      deliveryPeriod: data.deliveryPeriod || "",
      preQANo: data.preQANo || "",
      preQADate: data.preQADate ? moment(data.preQADate) : null,
      statutoryRegulatoryRequirements: data.statutoryRegulatoryRequirements ?? false,
      specialInformation: data.specialInformation || "",
      engineer: data.engineer || "",
      paymentTerms: data.paymentTerms || "",
      oaNo: data.oaNo || "",
      oaDate: data.oaDate ? moment(data.oaDate) : null,
      industry: data.industry || "",
      projectOrder: data.projectOrder ?? null,
      penaltyApplicable: data.penaltyApplicable ?? null,
      poReceived: data.poReceived ?? false,
      invoiceTo: data.invoiceTo || "",
      quotationNo: data.quotationNo || "",
      priority: data.priority || "",
      ofmStatus: data.ofmStatus || "",
      externalInspection: data.externalInspection ?? false,
      externalInspectionWhere: data.externalInspectionWhere || "",
      externalInspectionByWhom: data.externalInspectionByWhom || "",
      rawMaterialTC: data.rawMaterialTC ?? false,
      qcReport: data.qcReport ?? false,
      testReport: data.testReport ?? false,
      guaranteeCertificate: data.guaranteeCertificate ?? false,
      fitmentCertificate: data.fitmentCertificate ?? false,
      complianceCertificate: data.complianceCertificate ?? false,
      consigneeName: data.consigneeName || "",
      consigneeAddress: data.consigneeAddress || "",
      createdOn: data.createdOn || null,
      updatedOn: data.updatedOn || null,
      createdByUser: data.createdByUser || "",
      updatedByUser: data.updatedByUser || "",
      insurance: data.insurance ?? false,
      insuranceBy: data.insuranceBy || "",
      insuranceBorneBy: data.insuranceBorneBy || "",
      company: data.company || "",
      otherCharges: data.otherCharges || "",
      location: data.location || "",
      qapRequired: data.qapRequired ?? false,

      // ✅ These are the fields Other Charges section binds to
      discount: data.discount ?? "",
      pandF: data.pandF || "",        // not in response — will be "" (editable)
      freight: data.freight || "",    // not in response — will be "" (editable)
      sgst: data.sgst || "",          // not in response — will be "" (editable)
      cgst: data.cgst || "",          // not in response — will be "" (editable)
      igst: data.igst || "",          // not in response — will be "" (editable)

      // ✅ Grand totals derived from items + stored discount
      grandTotal: Number(finalGrandTotal.toFixed(2)),
      grandTotalListPrice: Number(finalGrandListTotal.toFixed(2)),

      endUserDetail: {
        endUserDetailId: data.endUserDetail?.endUserDetailId,
        branch: data.endUserDetail?.branch || "",
        customerName: data.endUserDetail?.customerName || "",
        place: data.endUserDetail?.place || "",
        contactPersonName: data.endUserDetail?.contactPersonName || "",
        mobileNumber: data.endUserDetail?.mobileNumber || "",
        emailId: data.endUserDetail?.emailId || "",
        endUserIndustry: data.endUserDetail?.endUserIndustry || "",
        knots: data.endUserDetail?.knots || "",
      },

      // ✅ Keep blank item for adding new items in update mode
      ofmItems: [{
        srNo: "", header: "", factor: "", face: "", type: "", size: "",
        description: "", ciCode: "", lpItemCode: "", drfNo: "", drawingNo: "",
        quantity: "", bookedQuantity: "", unit: "", unitPrice: "", unitLPrice: "",
        discount: "", naDrgNo: "", totalValue: "", totalListValue: "",
      }],
    });

  } catch (error) {
    console.log("getOfm error:", error?.response?.data || error);
  }
};

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