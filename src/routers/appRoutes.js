import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import AdminPassenger from '../pages/Admin/AdminPassenger';
import AdminTicket from '../pages/Admin/AdminTicket';
import AdminDashboard from '../pages/Admin/AdminDashboard';

const appRoutes = [
  {
    index: true,
    element: <AdminDashboard />,
  },
  {
    path: "/admin/1",
    element: <AdminPassenger />,
  },
  {
    path: "admin/dashboard",
    element: <AdminPassenger />,
  },
  {
    path: "admin/component",
    element: <AdminPassenger />,
  },
  {
    path: "admin/documentation",
    element: <AdminPassenger />,
  },
  {
    path: "admin/changelog",
    element: <AdminPassenger />,
  }
];

export default appRoutes;