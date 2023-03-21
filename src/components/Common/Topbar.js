import {
  ClockCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { AppBar, Button, Menu, Toolbar } from "@mui/material";
import { Avatar, Dropdown, Typography, notification } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import colorConfigs from "../../config/colorConfigs";
import sizeConfigs from "../../config/sizeConfigs";
import { AdminApi } from "../../utils/adminApi";
import Cookies from "js-cookie";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import customToast from "../ToastCustom";
import ArticleIcon from "@mui/icons-material/Article";
import { menu } from "../../data/menuData";

const Topbar = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [time, setTime] = useState();
  const [routeName, setRouteName] = useState();
  useEffect(() => {
    setInterval(() => {
      var today = new Date();
      const hour =
        today.getHours() < 10 ? "0" + today.getHours() : today.getHours();
      const minute =
        today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
      const second =
        today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds();
      const date =
        today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
      const month =
        today.getMonth() + 1 < 10
          ? "0" + (today.getMonth() + 1)
          : today.getMonth() + 1;
      const year = today.getFullYear();
      setTime(` ${hour}:${minute}:${second} , ${date} tháng ${month}, ${year}`);
    }, 1000);
  }, []);

  const onClickLogout = async () => {
    const adminApi = new AdminApi();
    try {
      const response = await adminApi.logout();
      navigate("/admin/login");
      Cookies.remove("access_token");
      customToast.success("Đăng xuất thành công");
    } catch (error) {
      customToast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    const name = menu().find((route) => route.path === location?.pathname);
    setRouteName(name);
  }, [location?.pathname]);

  const items = [
    {
      label: "Thông tin tài khoản",
      key: "1",
    },
    {
      label: (
        <a rel="noopener noreferrer" href="/doi-mat-khau">
          Đổi mật khẩu
        </a>
      ),
      key: "2",
    },
    {
      label: (
        <a rel="noopener noreferrer" onClick={onClickLogout}>
          Đăng xuất
        </a>
      ),
      key: "3",
    },
  ];
  return (
    <AppBar
      position="fixed"
      sx={{
        width: props.collapsed ? `calc(100% - 80px)` : `calc(100% - 245px)`,
        ml: sizeConfigs.sidebar.width,
        backgroundColor: colorConfigs.topbar.bg,
        color: colorConfigs.topbar.color,
        marginLeft: 0,
        zIndex: 3,
        boxShadow: "unset",
      }}
    >
      <Toolbar
        style={{
          right: 20,
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row", alignItems:'center' }}>
          <Button
            variant="text"
            onClick={() => {
              props.setCollapsed(!props.collapsed);
            }}
            style={{ color: "#000" }}
          >
            {" "}
            {props.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>

          <a
            href="/admin"
            className="home-title"
            style={{
              textDecoration: "none",
              color: "#000",
              fontWeight: "bold",
            }}
          >
            Home
          </a>
          <ChevronRightIcon className="icon-right-header" />
          <a className="home-title" style={{ color: "#4D4D4D" }}>
            {routeName?.text || "Cài đặt"}
          </a>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ClockCircleOutlined style={{ marginRight: 7 }} />
          <Typography
            style={{ fontWeight: "600", marginRight: 30, width: 200 }}
          >
            {" "}
            {time}
          </Typography>
          <Typography
            style={{ fontWeight: "500", color: "#333", marginLeft: 20 }}
          >
            Xin chào, {Cookies.get("fullName")}
          </Typography>
          <Dropdown menu={{ items }} className="avata-profile">
            <Avatar
              style={{
                color: "#f56a00",
                backgroundColor: "#fde3cf",
                width: "35px",
                height: "35px",
                marginLeft: "10px",
              }}
              onClick={(e) => e.preventDefault()}
              src="https://joesch.moe/api/v1/random?key=1"
            ></Avatar>
          </Dropdown>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
