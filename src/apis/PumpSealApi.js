import axiosInstance from '../axios/axiosInstance';

export const getPumpSeal = async (pId, setFormData) => {
  try {
    const response = await axiosInstance.get(`/lens/pumpseal/get?pumpSealReferenceNo=${pId}`);
    console.log("single pump is ",response.data);
    setFormData(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error loading data');
  }
};


export const handleSubmit = async (e, formData, navigate) => {
  try {
    e.preventDefault();
    const response = await axiosInstance.post('/lens/pumSeal/save', formData);
    // navigate('/');
    console.log("response is ",response.data)
    navigate(`/editDrf`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error submitting form');
  }
};

export const handleUpdatePumpSeal = async (e, formData, pId, navigate) => {
  try {
    e.preventDefault()
    const response = await axiosInstance.put(`/lens/pumSeal/Update`, formData);
    navigate(`/editDrf`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error updating form');
  }
};

export const getColumnData = async () => {
  try {
    const response = await axiosInstance.get('/api/column-data');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error loading column data');
  }
};



export const getAll = async (setData) => {
  try {
    const response = await axiosInstance.get('lens/pumSeal/getAll');
    console.log("response is ",response.data)
    setData(response.data);

  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error loading data');
  }
};



// export const searchFilter = async (startDate, endDate, branch, customerName, pumpSealDrfNumber, page, limit, setData) => {
//   try {
//     const params = {
//       startDate: startDate || '',
//       endDate: endDate || '',
//       branch: branch || '',
//       customerName: customerName || '',
//       pumpSealDrfNumber: pumpSealDrfNumber || '',
//       page: page || 0,
//       limit: limit || 10
//     };

//     const queryString = Object.keys(params)
//       .map(key => `${key}=${encodeURIComponent(params[key])}`)
//       .join('&');

//     const response = await axiosInstance.get(`/api/pump-seal/search?${queryString}`);
//     if (setData) {
//       setData(response.data);
//     }
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || 'Error searching data');
//   }
// };


export const deletePumpDetail = async (id, data, setData) => {
  try {
    await axiosInstance.delete(`lens/pumSeal/delete?pumSealDrfNo=${encodeURIComponent(id)}`);
    if (data && setData) {
      const updatedData = data.filter(item => item.drfNumber !== id);
      setData(updatedData);
    }
    return { message: 'Record deleted successfully' };
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error deleting data');
  }
};

