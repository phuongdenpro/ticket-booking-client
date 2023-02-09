import {
  BarChartOutlined,
  UserOutlined,
  TagsOutlined,
  ShoppingCartOutlined,
  InboxOutlined,
  DashboardOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CarOutlined,
  IdcardOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { Typography } from "antd";
import React, { useEffect, useState } from "react";
import store from "../../redux/store";
import logo from "../../assets/logo.png";
import CarRentalIcon from "@mui/icons-material/CarRental";
import DepartureBoardIcon from "@mui/icons-material/DepartureBoard";
import DirectionsTransitIcon from "@mui/icons-material/DirectionsTransit";
const { Title } = Typography;

const rootSubmenuKeys = [
  "user",
  "dashboard",
];

const Sidebar = (props) => {
  const [openKeys, setOpenKeys] = useState();
  const navigate = useNavigate();
  const getItem = (label, key, icon, children, type) => {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  };

  const getChildItem = (label, key) => {
    return {
      key,
      label,
    };
  };
  const items = [
    getItem("Dashboard", "", <DashboardOutlined />),
    getItem(
      "Quản Lý Người Dùng",
      "user",
      <UserOutlined />,
      [getChildItem("Người dùng", "user/user"), getChildItem("Nhóm người dùng", "user/group-user")],
      true
    ),
    getItem("Quản lý Chuyến Xe", "trip", <DepartureBoardIcon />),
    getItem("Quản Lý Nhà Xe", "passenger", <DirectionsTransitIcon />),
    getItem("Quản Lý Xe", "vehicle", <CarOutlined />),
    getItem("Quản Lý Vé", "ticket", <IdcardOutlined />),
    getItem("Quản Lý Bến Xe", "station", <CarRentalIcon />),
    getItem("Chương Trình Khuyến Mãi", "promotion", <DollarCircleOutlined />),
    getItem("Thống kê", "dashboard", <BarChartOutlined />, [
      getChildItem("Thống kê doanh thu", "dashboard/cost"),
      getChildItem("Thống kê người dùng", "dashboard/user"),
      getChildItem("Thống kê vé", "dashboard/ticket"),
      getChildItem("Thống kê tổng hợp ", "dashboard/default"),
    ]),
  ];

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys?.indexOf(key) === -1);

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const onSelect = (selected) => {
    navigate(`/admin/${selected.key}`);
  };

  const onClick = (selected) => {
    navigate(`/admin/${selected.key}`);
  };

  return (
    <div>
      <Menu
        mode="inline"
        theme="dark"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        items={items}
        onSelect={onSelect}
        onClick={onClick}
        style={{minHeight:'100vh'}}
      />
    </div>
  );
};

export default Sidebar;
