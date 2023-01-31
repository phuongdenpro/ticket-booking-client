import {
  BarChartOutlined,
  UserOutlined,
  TagsOutlined,
  ShoppingCartOutlined,
  InboxOutlined,
  DashboardOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { Typography } from "antd";
import React, { useEffect, useState } from "react";
import store from "../../redux/store";
const { Title } = Typography;

const rootSubmenuKeys = [
  "quan-ly-ban-hang",
  "quan-ly-san-pham",
  "quan-ly-kho",
  "quan-ly-doi-tac",
  "quan-ly-bao-cao",
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
    getItem("Dashboard", "/dashboard", <DashboardOutlined />),
    getItem("Quản Lý Người Dùng", "sub1", <TagsOutlined />, [
      getChildItem("Nhóm sản phẩm", "2"),
      getChildItem("Sản phẩm", "3"),
      getChildItem("Ngành hàng", "4"),
    ]),
    getItem(
      "Quản lý chuyến xe",
      "sub2",
      <InboxOutlined />,
      [
        getChildItem("Phiếu nhập hàng", "5"),
        getChildItem("Phiếu kiểm kê", "6"),
        getChildItem("Lịch sử biến động kho", "7"),
      ],
      true
    ),
    getItem("Quản lý nhà xe", "sub3", <UserOutlined />, [
      getChildItem("Nhà cung cấp", "1", true),
      getChildItem("Quản lý xe", "9"),
      getChildItem("Khách hàng", "10"),
      getChildItem("Nhân viên", "11", true),
    ]),
    getItem("Quản lý bến xe", "12", <BarChartOutlined />),
    getItem("Quản lý vé", "13", <BarChartOutlined />),
    getItem("Thống kê", "13", <BarChartOutlined />),
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
    navigate(`/admin/${selected.key}`)
  }

  const onClick = (selected) => {
    navigate(`/admin/${selected.key}`)
  }

  return (
    <div>
      <Menu
        mode="inline"
        theme="light"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        items={items}
        onSelect={onSelect}
        onClick={onClick}
      />
    </div>
  );
};

export default Sidebar;
