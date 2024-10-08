import axiosInstance from "../axios/axiosInstance";
import moment from 'moment';



// submit data
export const handleSubmit = async (e, formData, navigate,setErrors,validateField) => {

  e.preventDefault();
  const dateTime = moment().format('YYYY-MM-DD HH:mm:ss');
     
  
  // Validation
  let validationErrors = {};

  
  if (!formData.customerName || formData.customerName.trim() === "") {
    validationErrors['customerName'] = "Customer Name cannot be empty.";
    console.log("Customer Name is empty");
  } else {
    // Validate the customerName field
    const customerNameError = validateField('customerName', formData.customerName);
    if (customerNameError) {
      validationErrors['customerName'] = customerNameError;
      console.log("Customer error is:", customerNameError);
    }
  }  

  // Iterate over customerDetail array to check each industryName
  for (const detail of formData.customerDetail) {
    // Ensure industryName is not empty or undefined
    if (!detail.industryName || detail.industryName.trim() === "") {
      validationErrors['industryName'] = "Industry name cannot be empty.";
      console.log("Industry name is empty");
    } else {
      // Validate the industryName field
      const industryError = validateField('industryName', detail.industryName);
      if (industryError) {
        validationErrors['industryName'] = industryError;
        console.log("Industry error is:", industryError);
      }
    }
  }
  
  // Set the validation errors
  setErrors(validationErrors);
  
  // Proceed with form submission only if there are no validation errors
  if (Object.keys(validationErrors).length === 0) {       
    if (formData.customerDetail && formData.customerDetail.length > 0) {
      formData.customerDetail[formData.customerDetail.length - 1].lastUpdatedOn = dateTime;
      formData.customerDetail[formData.customerDetail.length - 1].insertedOn = dateTime;
    }
    
    formData.insertedOn = dateTime;
    formData.lastUpdatedOn = dateTime;
  
    console.log("Length of error keys: " + Object.keys(validationErrors).length);
    
    try {
      // Proceed with the submission
      console.log("Submitting form data:", formData);
      
      // Call your submit API function here
      const res = await axiosInstance.post(`/lens/customer/save`, formData);
      
      console.log("response is", res.data);
      // navigate(`/registerSuccess/${res.data}`);
      console.log(formData);
    } catch (err) {
      console.log("Error during form submission:", err);
    }
  } else {
    console.log("Form submission blocked due to validation errors:", validationErrors);
  }
};



// edit detail
export const editDetail = (detail, navigate) => {
  console.log("edit detail is ", detail.customerReferenceNumber);
  navigate(`/Customer/${detail.customerReferenceNumber}`);
};


// getApi
export const handleUpdate = async (e, formData, rId, navigate) => {
  e.preventDefault();
  const dateTime = moment().format('YYYY-MM-DD HH:mm:ss');

  if (formData.customerDetail && formData.customerDetail.length > 0) {
    formData.customerDetail[formData.customerDetail.length - 1].lastUpdatedOn = dateTime;
  }
  
    formData.lastUpdatedOn = dateTime;

  const res = await axiosInstance.put(`lens/customer/Update`, formData);

  console.log("response from update is ", res.data);
  console.log(formData);
  rId = null;
  navigate(`/updateSuccess/${formData.customerReferenceNumber}`);
};


// get single data
export const getCustomer = async (rId, setFormData) => {
  try {
    const res = await axiosInstance.get(`lens/customer/get?customerRefrenceNumber=${rId}`);

    const { data } = res;
    setFormData(data);
  } catch (err) {
    console.log(err);
  }
};



// delete data
export const deleteDetail = (crId, data, setIsDeleted, setData) => {
  axiosInstance.delete(`lens/customer/delete?customerRefrenceNumber=${crId}`)
  .then(res => {
    console.log(res);
    const newData = data.filter(item => item.customerReferenceNumber !== crId);
    setIsDeleted(true);
    setData(newData);
  })
  .catch(err => {
    console.log(err);
  });

  console.log("customer reference id of deletion elem is ", crId);
};



// Customer filter Search
export const searchFilter = async (startDate, endDate, branch, customerName, customerRef, currentPage, itemsPerPage, setData) => {
  const formattedStartDate = startDate ? moment(startDate).format('YYYY-MM-DD HH:mm:ss') : null;
  const formattedEndDate = endDate ? moment(startDate).format('YYYY-MM-DD HH:mm:ss') : null;

  if (formattedStartDate) {
    console.log("start date is", formattedStartDate);
  }
  if (formattedEndDate) {
    console.log("end date is", formattedEndDate);
  }

  try {
    let url = `lens/customer/getAllCustomerByFilter?`;
    if (startDate) url += `startDate=${formattedStartDate}&`;
    if (endDate) url += `endDate=${formattedEndDate}&`;
    if (branch) url += `branch=${branch}&`;
    if (customerName) url += `customerName=${customerName}&`;
    if (customerRef) url += `customerReferenceNumber=${customerRef}&`;
    url += `pageNo=${currentPage}&pageSize=${itemsPerPage}`;

    console.log("URL is :", url); // Log the constructed URL

    const res = await axiosInstance.get(url);

    const { data } = res;
    setData(data);
    console.log("response is", res);
  } catch (err) {
    console.log(err);
  }
};
