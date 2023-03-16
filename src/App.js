import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createBrowserHistory } from "history";
import Login from "./pages/Admin/AdminLogin/AdminLogin";
import AdminLayout from "./components/Layout/AdminLayout";
import AdminAddTicket from "./pages/Admin/AdminAddTicket/AdminTicket";
import AdminDashboard from "./pages/Admin/AdminDashboard/AdminDashboard";
import AdminDashboardCost from "./pages/Admin/AdminDashboardCost/AdminDashboardCost";
import AdminDashboardPromotion from "./pages/Admin/AdminDashboardPromotion/AdminDashboardPromotion";
import AdminDashboardTicket from "./pages/Admin/AdminDashboardTicket/AdminDashboardTicket";
import AdminGroupUser from "./pages/Admin/AdminGroupUser/AdminGroupUser";
import AdminOrder from "./pages/Admin/AdminOrder/AdminOrder";
import AdminOrderRefund from "./pages/Admin/AdminOrderRefund/AdminOrderRefund";
import AdminPriceList from "./pages/Admin/AdminPriceList/AdminPriceList";
import AdminPromotion from "./pages/Admin/AdminPromotion/AdminPromotion";
import AdminStation from "./pages/Admin/AdminStation/AdminStation";
import AdminTicket from "./pages/Admin/AdminTicketList/AdminTicket";
import AdminTrip from "./pages/Admin/AdminTrip/AdminTrip";
import AdminUser from "./pages/Admin/AdminUser/AdminUser";
import AdminVehicle from "./pages/Admin/AdminVehicle/AdminVehicle";
import Home from "./pages/Home/Home";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./assets/scss/grid.scss";
import "./assets/scss/theme.scss";
import "./assets/scss/index.scss";

export const history = createBrowserHistory();

function App() {
  return (
    <BrowserRouter history={history}>
      <Routes>
        <Route path="admin" element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} index/>
          <Route path="/admin/customer" element={<AdminUser />} />
          <Route path="/admin/group-customer" element={<AdminGroupUser />} />
          <Route path="/admin/station" element={<AdminStation />} />
          <Route path="/admin/ticket-list" element={<AdminTicket />} />
          <Route path="/admin/ticket/price-list" element={<AdminPriceList />} />
          <Route path="/admin/create-ticket" element={<AdminAddTicket />} />
          <Route path="/admin/trip" element={<AdminTrip />} />
          <Route path="/admin/promotion" element={<AdminPromotion />} />
          <Route path="/admin/vehicle" element={<AdminVehicle />} />
          <Route path="/admin/order">
            <Route path="/admin/order/order-list" element={<AdminOrder />} />
            <Route path="/admin/order/detail" element={<Home />} />
          </Route>
          <Route
            path="/admin/order-refund-list"
            element={<AdminOrderRefund />}
          />
          <Route
            path="/admin/dashboard-ticket"
            element={<AdminDashboardTicket />}
          />
          <Route
            path="/admin/dashboard-promotion"
            element={<AdminDashboardPromotion />}
          />
          <Route
            path="/admin/dashboard-cost"
            element={<AdminDashboardCost />}
          />
        </Route>
        <Route path="/admin/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
