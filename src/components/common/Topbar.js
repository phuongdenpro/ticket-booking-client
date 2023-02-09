import { ClockCircleOutlined, SettingOutlined } from "@ant-design/icons";
import { AppBar, Menu, Toolbar } from "@mui/material";
import { Avatar, Dropdown, message, Typography, notification } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import colorConfigs from "../../config/colorConfigs";
import sizeConfigs from "../../config/sizeConfigs";
import { AdminApi } from "../../utils/apis";
import Cookies from "js-cookie";

const Topbar = (props) => {
  const navigate = useNavigate();
  const [time, setTime] = useState();
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
      const response = adminApi.logout();
      navigate("/admin/login");

      notification.config({ top: 10 });
      setTimeout(() => {
        notification.open({
          type: "success",
          duration: 2,
          description: `Tạm biệt quý khách`,
          message: "Logout success !",
        });
      }, 1000);
    } catch (error) {
      message.error("Có lỗi sảy ra");
    }
  };
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
        width: `calc(100% - ${sizeConfigs.sidebar.width})`,
        ml: sizeConfigs.sidebar.width,
        boxShadow: "unset",
        backgroundColor: colorConfigs.topbar.bg,
        color: colorConfigs.topbar.color,
        marginLeft: 0,
        zIndex: 1,
      }}
    >
      <Toolbar
        style={{
          top: 3,
          right: 40,
          padding: 15,
          justifyContent: "flex-end",
        }}
      >
        <ClockCircleOutlined style={{ marginRight: 7 }} />
        <Typography style={{ fontWeight: "600", marginRight: 30, width: 200 }}>
          {" "}
          {time}
        </Typography>
        <Typography
          style={{ fontWeight: "500", color: "#333", marginLeft: 20 }}
        >
          Xin chào, Phương
        </Typography>
        <Dropdown menu={{ items }}>
          <Avatar
            style={{
              color: "#f56a00",
              backgroundColor: "#fde3cf",
              width: "35px",
              height: "35px",
              marginRight: "10px",
              marginLeft: "10px",
            }}
            onClick={(e) => e.preventDefault()}
          >
            P
          </Avatar>
        </Dropdown>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
