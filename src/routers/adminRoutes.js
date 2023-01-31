import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import AdminPassenger from "../pages/Admin/AdminPassenger";
import AdminTicket from "../pages/Admin/AdminTicket";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminStation from "../pages/Admin/AdminStation";
import AdminTrip from "../pages/Admin/AdminTrip";
import AdminTripPassenger from "../pages/Admin/AdminTripPassenger";
import AdminUser from "../pages/Admin/AdminUser";
import AdminVehicle from "../pages/Admin/AdminVehicle";

const adminRoutes = [
  {
    index: true,
    element: <AdminDashboard />,
  },
  {
    path: "/admin/user/user",
    element: <AdminUser />,
  },
  {
    path: "/admin/passenger",
    element: <AdminPassenger />,
  },
  {
    path: "/admin/station",
    element: <AdminStation />,
  },
  {
    path: "/admin/ticket",
    element: <AdminTicket />,
  },
  {
    path: "/admin/trip",
    element: <AdminTrip />,
  },
  {
    path: "/admin/trip-passenger",
    element: <AdminTripPassenger />,
  },
  {
    path: "/admin/vehicle",
    element: <AdminVehicle />,
  },
  {
    path: "/admin/dashboard/default",
    element: <AdminDashboard />,
  },

];

export default adminRoutes;
