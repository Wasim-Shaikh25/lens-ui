import axios from 'axios';

export const getPumpSeal = async (pId, setFormData) => {
  try {
    const response = await axios.get(`/api/pump-seal/${pId}`);
    setFormData(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error loading data');
  }
};
export const handleSubmit = async (e, formData, navigate) => {
  try {
    const response = await axios.post('/api/pump-seal', formData);
    navigate('/');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error submitting form');
  }
};

export const handleUpdatePumpSeal = async (e, formData, pId, navigate) => {
  try {
    const response = await axios.put(`/api/pump-seal/${pId}`, formData);
    navigate('/');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error updating form');
  }
};

export const getColumnData = async () => {
  try {
    const response = await axios.get('/api/column-data');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error loading column data');
  }
};

export const getAll = async () => {
  try {
    const response = await axios.get('/api/pump-seal');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error loading data');
  }
};

export const searchFilter = async (startDate, endDate, branch, customerName, pumpSealDrfNumber, page, limit, setData) => {
  try {
    const params = {
      startDate: startDate || '',
      endDate: endDate || '',
      branch: branch || '',
      customerName: customerName || '',
      pumpSealDrfNumber: pumpSealDrfNumber || '',
      page: page || 0,
      limit: limit || 10
    };

    const queryString = Object.keys(params)
      .map(key => `${key}=${encodeURIComponent(params[key])}`)
      .join('&');

    const response = await axios.get(`/api/pump-seal/search?${queryString}`);
    if (setData) {
      setData(response.data);
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error searching data');
  }
};

export const deleteDetail = async (id, data, setData) => {
  try {
    await axios.delete(`/api/pump-seal/${id}`);
    if (data && setData) {
      const updatedData = data.filter(item => item.pumpSealDrfNumber !== id);
      setData(updatedData);
    }
    return { message: 'Record deleted successfully' };
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error deleting data');
  }
};