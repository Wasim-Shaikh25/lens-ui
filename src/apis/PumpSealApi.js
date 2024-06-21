import axios from 'axios';
import moment from 'moment';




const baseUrl = process.env.REACT_APP_BASE_URL; 



export const handleSubmit = async (e,formData,navigate, token) => {

    e.preventDefault();
    const dateTime = moment().format('YYYY-MM-DD HH:mm:ss');


    if (!formData.createdDate) {
      // Update insertedOn and lastUpdatedOn for the last item in customerDetail
      formData.createdDate = dateTime;
    }
    formData.lastEditedDate = dateTime;

    formData.srNo = parseInt(formData.srNo)

    console.log("formData sales is ", formData);

    try {
      const res = await axios.post(`${baseUrl}/lens/pumSeal/save`, formData,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("response is ", res.data);
      navigate(`/pumpSealSuccess/${res.data}`);
    }
    catch (err) {
      console.log(err);
    }


  };



//update data
export const handleUpdatePumpSeal = async (e,formData,pId,navigate, token) => {
    e.preventDefault();
    const dateTime = moment().format('YYYY-MM-DD HH:mm:ss');
    formData.lastEditedDate = dateTime;

    console.log("formData sales is ", formData);

    const res = await axios.put(`${baseUrl}/lens/pumSeal/Update`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log("response from update is ", res.data);


    pId = "";
    navigate(`/pumpSealSuccess/${formData.pumpSealDrfNumber}`);
  }

  //get particular data
  export const getPumpSeal = (pId,setFormData,token)=>{

    axios.get(`${baseUrl}/lens/pumSeal/get?pumSealDrfNo=${pId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      const { data } = res;
      setFormData(data);
      console.log("the pId fetched data is ", data)

    })
    .catch(err => {
      console.log(err)
    })

  }



  //get data by column name
  export const getColumnData = async (colName, setptOption,setarOption,setsaOption,setstOption,setstgOption,setcstOption,setpfOption,setfnOption, token)=>{

    try {
      const res = await axios.get(`${baseUrl}/lens/queryDrawingMasterTablebyColumn?columnName=${colName}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      switch(colName){
        case 'Pump Type' :
          setptOption(res.data);
          break;
          case 'Arrangement':
          setarOption(res.data);
          break;
          case 'Seal Arrangement':
          setsaOption(res.data);
          break;
          case 'Seal Type':
          setstOption(res.data);
          break;
          case 'Stages':
          setstgOption(res.data);
          break;
          case 'Casing Type':
          setcstOption(res.data);
          break;
          case 'Performance':
          setpfOption(res.data);
          break;
          case 'Fluid Nature':
          setfnOption(res.data);
          break;
          default:
            break;
      }
      console.log("res is ",res.data);

    } catch (error) {
        console.log(error)
    }

  }



  //get All data
  export const getAll = (currentPage, itemsPerPage,setData, setIsDeleted, token)=>{
    axios.get(`${baseUrl}/lens/pumSeal/getAll`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      setData(res.data);
      console.log("the fetched data is ",res.data);
      setIsDeleted(false)
    })
    .catch((err)=>{
      console.log(err)
    })
  }


  //delete pump seal
export  const deleteDetail = async (crId, data, setData, token) => {
    try {
      await axios.delete(`${baseUrl}/lens/pumSeal/delete?pumSealDrfNo=${crId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const newData = data.filter(item => item.pumpSealDrfNumber !== crId);
      console.log("data is ",data)
      console.log("New data is ",newData)
      setData(newData);
    } catch (err) {
      console.log(err);
    }
  };


  //search and filter
  //Customer filter Search
export const searchFilter = async (startDate,endDate,branch,customerName,pumpSealDrfNumber,currentPage,itemsPerPage,setData, token) => {
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
    let url = `${baseUrl}/lens/pumpSeal/getAllPumpSealByFilter?`;
    if (startDate) url += `startDate=${formattedStartDate}&`;
    if (endDate) url += `endDate=${formattedEndDate}&`;
    if (branch) url += `branch=${branch}&`;
    if (customerName) url += `customerName=${customerName}&`;
    if (pumpSealDrfNumber) url += `pumpSealDrfNumber=${pumpSealDrfNumber}&`;
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
}