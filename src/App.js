/** @format */

import { Routes, Route } from "react-router-dom";
import Login from "./components/forms/Login";
import Dashboard from "./components/pages/Dashboard";
import { ToastContainer } from "react-toastify";
import MSG from "./components/vendorPanel/components/pages/Message/Message";
import "react-toastify/dist/ReactToastify.css";
import UserKundli from "./components/pages/UserKundli/UserKundli";
import Discount from "./components/pages/discount/Discount";
import VendorLogin from "./components/vendorPanel/components/forms/VendorLogin";
import VendorDashboard from "./components/vendorPanel/components/pages/VendorDashboard";
import Fedd from "./components/pages/FeedBack/Fedd";
import Users from "./components/vendorPanel/components/pages/Users/Users";
import TimeSlots from "./components/pages/TimeSlots/TimeSlots";
import Product from "./components/vendorPanel/components/pages/Products/Product";
import Category from "./components/vendorPanel/components/pages/Category/Category";
import Order from "./components/vendorPanel/components/pages/Orders/Order";
import Ban from "./components/vendorPanel/components/pages/Ban/Ban";
import Coupon from "./components/vendorPanel/components/pages/Coupon/Coupon";
import Complaint from "./components/vendorPanel/components/pages/Complaint/Complaint";
import Vendor from "./components/vendorPanel/components/pages/Vendors/Vendor";
import Privacy from "./components/vendorPanel/components/pages/Products/Privacy";
import Terms from "./components/vendorPanel/components/pages/Products/Terms";
import SubAdmin from "./components/vendorPanel/components/pages/Category/SubAdmin";
import DeliveryPartner from "./components/vendorPanel/components/pages/DeliveryPartner";
import DeliveryOrder from "./components/vendorPanel/components/pages/DeliveryOrder";

import { ReactNotifications } from "react-notifications-component";
import VehicleType from "./components/vendorPanel/components/pages/VehicleType/VehicleType";
import Vehicle from "./components/vendorPanel/components/pages/Vehicle/Vehicle";
import Driver from "./components/vendorPanel/components/pages/Driver/Driver";
import Notifications from "./components/vendorPanel/components/pages/Notifications/Notifications";
import SubCategory from "./components/vendorPanel/components/pages/Category/SubCategory";

function App() {
  return (
    <>
      <ReactNotifications />
      <Routes>
        <Route path="/vendorLogin" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/userkundli" element={<UserKundli />} />
        <Route path="feedback" element={<Fedd />} />
        <Route path="/time" element={<TimeSlots />} />
        <Route path="/discount" element={<Discount />} />

        <Route path="/deliveryPartner" element={<DeliveryPartner />} />

        {/* Admin Panel */}
        <Route path="/" element={<VendorLogin />} />
        <Route path="/vehicle_type" element={<VehicleType />} />
        <Route path="/vehicle" element={<Vehicle />} />
        <Route path="/driver" element={<Driver />} />
        <Route path="/dis" element={<Coupon />} />
        <Route path="/users" element={<Users />} />
        <Route path="/ban" element={<Ban />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/sub-category/:id" element={<SubCategory />} />

        <Route path="/vendorDashboard" element={<VendorDashboard />} />
        <Route path="/ven" element={<Vendor />} />
        <Route path="/category" element={<Category />} />
        <Route path="/product" element={<Product />} />
        <Route path="/msg" element={<MSG />} />
        <Route path="/complaint" element={<Complaint />} />
        <Route path="/order" element={<Order />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/term" element={<Terms />} />
        <Route path="/subAdmin" element={<SubAdmin />} />
        <Route path="/deliveryOrder/:id" element={<DeliveryOrder />} />
      </Routes>
    </>
  );
}

export default App;
