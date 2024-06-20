import axios from 'axios';
import moment from 'moment';

// submit data
export const handleSubmit = async (e, formData, navigate, token) => {
  e.preventDefault();
  const dateTime = moment().format('YYYY-MM-DD HH:mm:ss');

  if (formData.customerDetail && formData.customerDetail.length > 0) {
    formData.customerDetail[formData.customerDetail.length - 1].lastUpdatedOn = dateTime;
    formData.customerDetail[formData.customerDetail.length - 1].insertedOn = dateTime;
  } else {
    formData.insertedOn = dateTime;
    formData.lastUpdatedOn = dateTime;
  }

  const res = await axios.post("http://lens-env.eba-fanbcwd6.ap-south-1.elasticbeanstalk.com/lens/customer/save", formData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  console.log("response is ", res.data);
  navigate(`/registerSuccess/${res.data}`);
  console.log(formData);
};

// edit detail
export const editDetail = (detail, navigate) => {
  console.log("edit detail is ", detail.customerReferenceNumber);
  navigate(`/Customer/${detail.customerReferenceNumber}`);
};

// getApi
export const handleUpdate = async (e, formData, rId, navigate, token) => {
  e.preventDefault();
  const dateTime = moment().format('YYYY-MM-DD HH:mm:ss');

  if (formData.customerDetail && formData.customerDetail.length > 0) {
    formData.customerDetail[formData.customerDetail.length - 1].lastUpdatedOn = dateTime;
  } else {
    formData.lastUpdatedOn = dateTime;
  }

  const res = await axios.put("http://lens-env.eba-fanbcwd6.ap-south-1.elasticbeanstalk.com/lens/customer/Update", formData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  console.log("response from update is ", res.data);
  console.log(formData);
  rId = null;
  navigate(`/updateSuccess/${formData.customerReferenceNumber}`);
};

// get single data
export const getCustomer = async (rId, setFormData, token) => {
  try {
    const res = await axios.get(`http://lens-env.eba-fanbcwd6.ap-south-1.elasticbeanstalk.com/lens/customer/get?customerRefrenceNumber=${rId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const { data } = res;
    setFormData(data);
  } catch (err) {
    console.log(err);
  }
};

// getAll Customers
export const getAllCustomer = (currentPage, itemsPerPage, setData, setIsDeleted, token) => {
  axios.get(`http://lens-env.eba-fanbcwd6.ap-south-1.elasticbeanstalk.com/lens/customer/getAll?pageNo=${currentPage}&pageSize=${itemsPerPage}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => {
    setData(res.data);
    console.log("the fetched data is ", res.data);
    setIsDeleted(false);
  })
  .catch((err) => {
    console.log(err);
  });
};

// delete data
export const deleteDetail = (crId, data, setIsDeleted, setData, token) => {
  axios.delete(`http://lens-env.eba-fanbcwd6.ap-south-1.elasticbeanstalk.com/lens/customer/delete?customerRefrenceNumber=${crId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
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
export const searchFilter = async (startDate, endDate, branch, customerName, customerRef, currentPage, itemsPerPage, setData, token) => {
  const formattedStartDate = startDate ? moment(startDate).format('YYYY-MM-DD HH:mm:ss') : null;
  const formattedEndDate = endDate ? moment(startDate).format('YYYY-MM-DD HH:mm:ss') : null;

  if (formattedStartDate) {
    console.log("start date is", formattedStartDate);
  }
  if (formattedEndDate) {
    console.log("end date is", formattedEndDate);
  }

  try {
    let url = `http://lens-env.eba-fanbcwd6.ap-south-1.elasticbeanstalk.com/lens/customer/getAllCustomerByFilter?`;
    if (startDate) url += `startDate=${formattedStartDate}&`;
    if (endDate) url += `endDate=${formattedEndDate}&`;
    if (branch) url += `branch=${branch}&`;
    if (customerName) url += `customerName=${customerName}&`;
    if (customerRef) url += `customerReferenceNumber=${customerRef}&`;
    url += `pageNo=${currentPage}&pageSize=${itemsPerPage}`;

    console.log("URL:", url); // Log the constructed URL

    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const { data } = res;
    setData(data);
    console.log("response is", res);
  } catch (err) {
    console.log(err);
  }
};
