import axios from 'axios';
import moment from 'moment';


export const handleSubmit = async (e,formData,navigate) => {

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
      const res = await axios.post("https://lens-svc.azurewebsites.net/lens-svc/pumSeal/save", formData);
      console.log("response is ", res.data);
      navigate(`/pumpSealSuccess/${res.data}`);
    }
    catch (err) {
      console.log(err);
    }


  };



//update data
export const handleUpdatePumpSeal = async (e,formData,pId,navigate) => {
    e.preventDefault();
    const dateTime = moment().format('YYYY-MM-DD HH:mm:ss');
    formData.lastEditedDate = dateTime;

    console.log("formData sales is ", formData);

    const res = await axios.put("https://lens-svc.azurewebsites.net/lens-svc/pumSeal/Update", formData);
    console.log("response from update is ", res.data);


    pId = "";
    navigate(`/pumpSealSuccess/${formData.pumpSealDrfNumber}`);
  }

  //get particular data
  export const getPumpSeal = (pId,setFormData)=>{

    axios.get(`https://lens-svc.azurewebsites.net/lens-svc/pumSeal/get?pumSealDrfNo=${pId}`)
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
  export const getColumnData = async (colName, setptOption,setarOption,setsaOption,setstOption,setstgOption,setcstOption,setpfOption,setfnOption)=>{

    try {
      const res = await axios.get(`https://lens-svc.azurewebsites.net/lens-svc/queryDrawingMasterTablebyColumn?columnName=${colName}`);
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
  export const getAll = (currentPage, itemsPerPage,setData, setIsDeleted)=>{
    axios.get(`https://lens-svc.azurewebsites.net/lens-svc/pumSeal/getAllPumSealByFilter?pageNo=${currentPage}&pageSize=${itemsPerPage}`)
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
export  const deleteDetail = async (crId, data, setData) => {
    try {
      await axios.delete(`https://lens-svc.azurewebsites.net/lens-svc/pumSeal/delete?pumSealDrfNo=${crId}`);
      const newData = data.filter(item => item.pumpSealDrfNumber !== crId);
      console.log("data is ",data)
      console.log("New data is ",newData)
      setData(newData);
    } catch (err) {
      console.log(err);
    }
  };