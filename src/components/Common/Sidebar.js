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
  OrderedListOutlined,
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

const rootSubmenuKeys = ["subUser", "subDashboard", "subTicket", "subOrder"];

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
      "Quản Lý Khách Hàng",
      "subUser",
      <UserOutlined />,
      [
        getChildItem("Khách hàng", "customer"),
        getChildItem("Nhóm khách hàng", "group-customer"),
      ],
      true
    ),
    getItem(
      "Quản Lý Vé",
      "subTicket",
      <IdcardOutlined />,
      [
        getChildItem("Đặt vé", "create-ticket"),
        getChildItem("Bảng giá", "ticket/price-list"),
        getChildItem("Danh sách vé", "ticket-list"),
      ],
      true
    ),

    getItem("Quản Lý Xe", "vehicle", <CarOutlined />),
    getItem("Quản Lý Bến Xe", "station", <CarRentalIcon />),
    getItem("Quản lý Chuyến Xe", "trip", <DepartureBoardIcon />),
    getItem("Khuyến Mãi", "promotion", <DollarCircleOutlined />),
    getItem("Hóa đơn", "subOrder", <OrderedListOutlined />, [
      getChildItem("Hóa đơn đặt vé", "order-list"),
      getChildItem("Hóa đơn hồi vé", "order-refund-list"),
    ]),
    getItem("Thống kê", "subDashboard", <BarChartOutlined />, [
      getChildItem("Thống kê vé", "dashboard-ticket"),
      getChildItem("Thống kê khuyến mãi ", "dashboard-promotion"),
      getChildItem("Thống kê doanh thu", "dashboard-cost"),
      
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
    <>
      <div
        style={{
          background: "rgb(18, 10, 39)",
          minHeight: "16vh",
          alignItems:'center',
          justifyContent:'center',
          display: "flex",
          flexDirection:'column',
          items:'center',
        }}
      >
        <img src={logo} alt="logo" style={{ width: props.collapsed? '50%':"30%" }} />
        <span style={{color:'white', fontWeight:'bold', fontSize:25}}>PDBus</span>
      </div>
      <Menu
        mode="inline"
        theme="dark"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        items={items}
        onSelect={onSelect}
        onClick={onClick}
        style={{
          minHeight: "84vh",
          overflow: "auto",
        }}
      />
    </>
  );
};

export default Sidebar;
