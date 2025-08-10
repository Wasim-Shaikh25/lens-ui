import axiosInstance from "../axios/axiosInstance";
import moment from "moment";




//handle Submit
export const handleSubmit = async(e,formData,navigate) => {
    e.preventDefault();
       
      console.log("formData sales is ",formData);
      try{
        const res = await axiosInstance.post(`lens/salesInquiry/save`, formData);
      console.log("response is ",res.data);

      navigate(`/SalesInquiry/${encodeURIComponent(res.data[1].referenceValue)}`)

      }
      catch(err){
        console.log(err);
        
      }
    // navigate(`/salesSuccess/${res.data}`);

    // Add form submission logic here

  };



  //Update
  export const handleUpdate = async (e,formData,sId,navigate)=>{
    e.preventDefault();
    // const dateTime = moment().format('YYYY-MM-DD HH:mm:ss');

   
     
      console.log("formData inside update ",formData);
      
    const res = await axiosInstance.put(`lens/salesInquiry/Update`, formData);
    console.log("response from update is ",res.data);

    
    sId="";
    navigate(`/editSales`);
  }



//get Sales
// export const getSales = (sId, setFormData, setInquiryToggles,inquiryTypes, defaultFormData) => {
//   axiosInstance.get(`lens/salesInquiry/get?itemReferenceNo=${sId}`)
//     .then(res => {
//       const { data } = res;

//       const toArray = (val) => Array.isArray(val) ? val : (val ? [val] : []);



//       const fetchedData = {
//         ...defaultFormData,
//         ...data.salesInquiry,
//         pumpInquiries: toArray(data?.pumpInquiry),
//         agitatorInquiries: toArray(data?.agitatorInquiry),
//         apiPlanInquiries: toArray(data?.apiPlanInquiry),
//         rotaryJointInquiries: toArray(data?.rotaryJointInquiry)
//       };

//       setFormData(fetchedData);

//       // Set toggles here
//       const newToggles = {};
//       Object.keys(inquiryTypes).forEach(typeKey => {
//         const inquiryKey = inquiryTypes[typeKey];
//         newToggles[inquiryKey] = fetchedData[inquiryKey]?.some(item => item && Object.keys(item).length > 0);
//       });
//       setInquiryToggles(newToggles);

//       console.log("Toggles",newToggles)
      

//     })
//     .catch(err => {
//       console.error("Error fetching sales:", err);
//     });
// };

export const getSales = (sId, setFormData,  defaultFormData) => {
  axiosInstance.get(`lens/salesInquiry/get?itemReferenceNo=${sId}`)
    .then(res => {
      const { data } = res;

      const inquiryTypes = {
        Agitator: "agitatorInquiries",
        Pump: "pumpInquiries",
        ApiPlan: "apiPlanInquiries",
        RotaryJoin: "rotaryJointInquiries"
      }; 

      const toArray = (val) => Array.isArray(val) ? val : (val ? [val] : []);

      const fetchedData = {
        ...defaultFormData,
        ...data.salesInquiry,
        pumpInquiries: toArray(data?.pumpInquiry),
        agitatorInquiries: toArray(data?.agitatorInquiry),
        apiPlanInquiries: toArray(data?.apiPlanInquiry),
        rotaryJointInquiries: toArray(data?.rotaryJointInquiry)
      };


      Object.entries(inquiryTypes).forEach(([sealType, inquiryKey]) => {
        if (Array.isArray(fetchedData[inquiryKey]) && fetchedData[inquiryKey].some(obj => obj && Object.keys(obj).length > 0)) {
          fetchedData[inquiryKey] = fetchedData[inquiryKey].map(obj => ({ ...obj, sealType }));
        }
      });

      setFormData(fetchedData);

 
    })
    .catch(err => {
      console.error("Error fetching sales:", err);
    });
};


//get All sales
export const searchFilter = (branch,customerName,industry,salesRef,currentPage,itemsPerPage,setData)=>{
  
  let url = `lens/salesInquiry/getAllSalesInquiryByFilter?`;
  if (branch) url += `branch=${branch}&`;
  if (customerName) url += `customerName=${customerName}&`;
  if (salesRef) url += `salesInquiryItemReferenceNo=${encodeURIComponent(salesRef)}&`;
  if (industry) url += `industry=${industry}&`;
  url += `pageNo=${currentPage}&pageSize=${itemsPerPage}`;
  
  axiosInstance.get(url)
      .then(res => {
        setData(res.data);
        console.log("the fetched data is ",res.data);
      })
      .catch((err)=>{
        console.log(err)
      })
}



//gee delete detail
export const deleteDetail = (sId,data,setData, setIsDeleted) => {
    console.log("sId is ", sId)
    
    axiosInstance.delete(`lens/salesInquiry/delete?salesInquiryReferenceNo=${sId}`)
    .then(res=>{
      console.log(res)
      const newData = data.filter(item => item.salesInquiryReferenceNo !== sId);
      setIsDeleted(true)
      setData(newData);

    }).catch(err=>{
      console.log(err)
    })
    
    console.log("Sales Inquiry Number of deletion elem is ", sId);
  };
