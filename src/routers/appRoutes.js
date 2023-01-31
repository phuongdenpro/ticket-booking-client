import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import AdminPassenger from '../pages/Admin/AdminPassenger';
import AdminTicket from '../pages/Admin/AdminTicket';

const appRoutes = [
  {
    index: true,
    element: <AdminTicket />,
    state: "home"
  },
  {
    path: "/admin/1",
    element: <AdminPassenger />,
    state: "installation",
    sidebarProps: {
      displayText: "installation",
      icon: <FileDownloadOutlinedIcon />
    }
  },
  {
    path: "admin/dashboard",
    element: <AdminPassenger />,
    state: "dashboard",
    sidebarProps: {
      displayText: "Dashboard",
      icon: <DashboardOutlinedIcon />
    },
    child: [
      {
        index: true,
        element: <AdminPassenger />,
        state: "dashboard.index"
      },
      {
        path: "admin/dashboard/default",
        element: <AdminPassenger />,
        state: "dashboard.default",
        sidebarProps: {
          displayText: "Default"
        },
      },
      {
        path: "admin/dashboard/analytics",
        element: <AdminPassenger />,
        state: "dashboard.analytics",
        sidebarProps: {
          displayText: "Analytic"
        }
      },
      {
        path: "admin/dashboard/saas",
        element: <AdminPassenger />,
        state: "dashboard.saas",
        sidebarProps: {
          displayText: "Saas"
        }
      }
    ]
  },
  {
    path: "admin/component",
    element: <AdminPassenger />,
    state: "component",
    sidebarProps: {
      displayText: "Components",
      icon: <AppsOutlinedIcon />
    },
    child: [
      {
        path: "admin/component/alert",
        element: <AdminPassenger />,
        state: "component.alert",
        sidebarProps: {
          displayText: "Alert"
        },
      },
      {
        path: "admin/component/button",
        element: <AdminPassenger />,
        state: "component.button",
        sidebarProps: {
          displayText: "Button"
        }
      }
    ]
  },
  {
    path: "admin/documentation",
    element: <AdminPassenger />,
    state: "documentation",
    sidebarProps: {
      displayText: "Documentation",
      icon: <ArticleOutlinedIcon />
    }
  },
  {
    path: "admin/changelog",
    element: <AdminPassenger />,
    state: "changelog",
    sidebarProps: {
      displayText: "Changelog",
      icon: <FormatListBulletedOutlinedIcon />
    }
  }
];

export default appRoutes;