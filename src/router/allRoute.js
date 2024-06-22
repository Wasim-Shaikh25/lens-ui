import React from 'react';
import { Routes, Route } from 'react-router-dom';
import '../App.css'; // Import the CSS file
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
import CreateApi from "../Pages/apiPlan/CreateApiPlan.js";
import EditApi from "../Pages/apiPlan/EditApiPlan.js";
import ApiSuccessPage from "../Pages/apiPlan/ApiSuccess.js";
import AgitatorSeal from '../Pages/agitator/CreateAgitator';
import AgitatorSuccessPage from '../Pages/agitator/AgitatorSuccess';
import EditAgitator from '../Pages/agitator/EditAgitator';
import SignUp from '../Pages/signup/Signup.js';
import Login from '../Pages/login/Login.js';
import ResetPassword from '../Pages/resetPassword/ResetPassword.js';
import UserDashboard from '../Pages/userDashboard/UserDashboard.js';


const AllRoute = ({isSidebar}) => {

  

  return (
    <div style={!isSidebar ? { width: "80%", position: "absolute", right: 0, marginTop: "4.5rem" } : { marginTop: "5.5rem" }}>
    <Routes>

          <Route path="/user" element={<UserDashboard />} />
          <Route path="/createAgitator" element={<AgitatorSeal />} />
          <Route path="/editAgitator" element={<EditAgitator />} />
          <Route path="/createAgitator/:aId" element={<AgitatorSeal />} />
          <Route path="/agitatorSuccess/:id" element={<AgitatorSuccessPage />} />
          <Route path="/SalesInquiry" element={<CreateSales />} />
          <Route path="/createRotary" element={<CreateRotatory />} />
          <Route path="/createRotary/:rjId" element={<CreateRotatory />} />
          <Route path="/editApi" element={<EditApi />} />
          <Route path="/createApi" element={<CreateApi />} />
          <Route path="/apiSuccess/:id" element={<ApiSuccessPage />} />
          <Route path="/createApi/:apId" element={<CreateApi />} />
          <Route path="/rotarySuccess/:id" element={<RotarySuccessPage />} />
          <Route path="/createPump" element={<CreatePumpSeal />} />
          <Route path="/createPump/:pId" element={<CreatePumpSeal />} />
          <Route path="/editPump" element={<EditPump />} />
          <Route path="/editRotary" element={<EditRotary />} />
          <Route path="/pumpSealSuccess/:id" element={<PumpSealSuccessPage />} />
          <Route path="/editSales" element={<EditSales />} />
          <Route path="/SalesInquiry/:sId" element={<CreateSales />} />
          <Route path="/Customer/:rId" element={<Customer />} />
          <Route path="/Customer" element={<Customer />} />
          <Route path="/editCustomer" element={<EditCustomer />} />
          <Route path="/registerSuccess/:id" element={<RegistrationSuccessPage />} />
          <Route path="/salesSuccess/:sId" element={<SalesSuccessPage />} />
          <Route path="/updateSuccess/:id" element={<UpdateSuccessPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup/:uId" element={<SignUp />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/login" element={<Login />} />
      
    </Routes>
  </div>

  );
};

export default AllRoute;
