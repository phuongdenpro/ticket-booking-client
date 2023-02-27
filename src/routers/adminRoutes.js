import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import AdminTicket from "../pages/Admin/AdminTicketList/AdminTicket";
import AdminDashboard from "../pages/Admin/AdminDashboard/AdminDashboard";
import AdminStation from "../pages/Admin/AdminStation/AdminStation";
import AdminTrip from "../pages/Admin/AdminTrip/AdminTrip";
import AdminUser from "../pages/Admin/AdminUser/AdminUser";
import AdminVehicle from "../pages/Admin/AdminVehicle/AdminVehicle";
import AdminGroupUser from "../pages/Admin/AdminGroupUser/AdminGroupUser";
import AdminPromotion from "../pages/Admin/AdminPromotion/AdminPromotion";
import AdminAddTicket from "../pages/Admin/AdminTicketList/AdminTicket";
import AdminPriceList from "../pages/Admin/AdminPriceList/AdminPriceList";
import AdminOrder from "../pages/Admin/AdminOrder/AdminOrder";
import AdminOrderRefund from "../pages/Admin/AdminOrderRefund/AdminOrderRefund";
import AdminDashboardTicket from "../pages/Admin/AdminDashboardTicket/AdminDashboardTicket";
import AdminDashboardPromotion from "../pages/Admin/AdminDashboardPromotion/AdminDashboardPromotion";
import AdminDashboardCost from "../pages/Admin/AdminDashboardCost/AdminDashboardCost";

const adminRoutes = [
  {
    index: true,
    element: <AdminDashboard />,
  },
  {
    path: "/admin/customer",
    element: <AdminUser />,
  },
  {
    path: "/admin/group-customer",
    element: <AdminGroupUser />,
  },
  {
    path: "/admin/station",
    element: <AdminStation />,
  },
  {
    path: "/admin/ticket-list",
    element: <AdminTicket />,
  },
  {
    path: "/admin/ticket/price-list",
    element: <AdminPriceList />,
  },
  {
    path: "/admin/create-ticket",
    element: <AdminAddTicket />,
  },
  {
    path: "/admin/trip",
    element: <AdminTrip />,
  },
  {
    path: "/admin/promotion",
    element: <AdminPromotion />,
  },
  {
    path: "/admin/vehicle",
    element: <AdminVehicle />,
  },
  {
    path: "/admin/dashboard/default",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/order-list",
    element: <AdminOrder />,
  },
  {
    path: "/admin/order-refund-list",
    element: <AdminOrderRefund />,
  },
  {
    path: "/admin/dashboard-ticket",
    element: <AdminDashboardTicket />,
  },
  {
    path: "/admin/dashboard-promotion",
    element: <AdminDashboardPromotion />,
  },
  {
    path: "/admin/dashboard-cost",
    element: <AdminDashboardCost />,
  },



];

export default adminRoutes;
