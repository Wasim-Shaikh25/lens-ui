import axiosInstance from "../axios/axiosInstance";



// Customer filter Search
export const searchDrfFilter = async ( branch, customerName, drfNumber, currentPage, itemsPerPage, setData) => {
  
  
    try {
      let url = `lens/filter?`;
      if (branch) url += `branch=${branch}&`;
      if (customerName) url += `customerName=${customerName}&`;
      if (drfNumber) url += `drfNumbererenceNumber=${drfNumber}&`;
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