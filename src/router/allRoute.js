import {Routes , Route } from "react-router-dom";
// import {Form2} from '../form/form2'
import {Quotation} from '../formPage/quotationId/quotationId'
import {OfmId} from '../formPage/ofmId/ofmId'
import {OfmCommunication} from '../formPage/ofmcommunication/ofmcommunication'
import Customer from '../Pages/customerPage/createCustomer/Customer.js';
import EditCustomer from "../Pages/customerPage/editCustomer/EditCustomer.js";
import RegistrationSuccessPage from "../Pages/customerPage/createCustomer/CustomerSuccess.js";
import UpdateSuccessPage from "../Pages/customerPage/editCustomer/UpdateSuccess.js";
import CreateSales from "../Pages/salesinquiryPage/CreateSales.js";
import SalesSuccessPage from "../Pages/salesinquiryPage/SalesSuccess.js";
import EditSales from "../Pages/salesinquiryPage/EditSales.js";
import CreatePumpSeal from "../Pages/pumpSeal/CreatePumpSeal.js";
import PumpSealSuccessPage from "../Pages/pumpSeal/PumpSealSuccess.js";
import EditPump from "../Pages/pumpSeal/EditPumpSeal.js";
import CreateRotatory from "../Pages/rotatoryJoint/CreateRotatory.js";
import RotarySuccessPage from "../Pages/rotatoryJoint/RotarySuccess.js";
import EditRotary from "../Pages/rotatoryJoint/EditRotryJoint.js";


const AllRoute = () => {
  return (
    <Routes>
      <Route path="/SalesInquiry" element={<CreateSales />} />
      <Route path="/createRotary" element={<CreateRotatory />} />
      <Route path="/createRotary/:rjId" element={<CreateRotatory />} />
      <Route path="/rotarySuccess/:id" element={<RotarySuccessPage />} />
      <Route path="/createPump" element={<CreatePumpSeal />} />
      <Route path="/createPump/:pId" element={<CreatePumpSeal />} />
      <Route path="/editPump" element={<EditPump />} />
      <Route path="/editRotary" element={<EditRotary />} />
      <Route path="/pumpSealSuccess/:id" element={<PumpSealSuccessPage />} />
      <Route path="/editSales" element={<EditSales />} />
      <Route path="/SalesInquiry/:sId" element={<CreateSales />} />
      <Route path="/Quotation" element={<Quotation/>} />
      <Route path="/OfmId" element={<OfmId/>} />
      <Route path="/OfmCommunication" element={<OfmCommunication/>}/>  
      <Route path="/Customer/:rId" element={<Customer/>}/>
      <Route path="/Customer" element={<Customer/>}/>
      <Route path="/editCustomer" element={<EditCustomer/>}/>
      <Route path="/registerSuccess/:id" element={<RegistrationSuccessPage />}/>
      <Route path="/salesSuccess/:sId" element={<SalesSuccessPage />}/>
      <Route path="/updateSuccess/:id" element={<UpdateSuccessPage />}/>
    </Routes>
  );
};

export default AllRoute;

