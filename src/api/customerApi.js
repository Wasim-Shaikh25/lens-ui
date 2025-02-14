import axiosInstance from '../axios/axiosInstance';
import { wrapApiCall } from '../utils/errorHandler';

export const customerApi = {
  // Create a new customer
  create: async (customerData) => {
    return await wrapApiCall(
      () => axiosInstance.post('/customers', customerData),
      'create'
    );
  },

  // Get customer by ID
  getById: async (id) => {
    return await wrapApiCall(
      () => axiosInstance.get(`/customers/${id}`),
      'read'
    );
  },

  // Update customer
  update: async (id, customerData) => {
    return await wrapApiCall(
      () => axiosInstance.put(`/customers/${id}`, customerData),
      'update'
    );
  },

  // Delete customer
  delete: async (id) => {
    return await wrapApiCall(
      () => axiosInstance.delete(`/customers/${id}`),
      'delete'
    );
  },

  // Get all customers with pagination
  getAll: async (page = 1, limit = 10) => {
    return await wrapApiCall(
      () => axiosInstance.get(`/customers?page=${page}&limit=${limit}`),
      'read'
    );
  }
};

// Example usage in your component:
/*
import { customerApi } from './api/customerApi';

// In your component:
const handleCreateCustomer = async (customerData) => {
  try {
    const result = await customerApi.create(customerData);
    // Handle success
    console.log(result.message); // "Record created successfully"
    return result.data;
  } catch (error) {
    // Handle error
    console.error(`Error ${error.code}: ${error.message}`);
    // You can also access error.details for more information
  }
};
*/