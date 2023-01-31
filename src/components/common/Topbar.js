import { SettingOutlined } from "@ant-design/icons";
import { AppBar, Menu, Toolbar } from "@mui/material";
import { Avatar, Dropdown, message, Typography } from "antd";
import { Header } from "antd/es/layout/layout";
import React from "react";
import { useState } from "react";
import colorConfigs from "../../config/colorConfigs";
import sizeConfigs from "../../config/sizeConfigs";

const Topbar = (props) => {
  const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
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
      label: "Đăng xuất",
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
      }}
    >
      <Toolbar
        style={{
          top: 4.5,
          right: 40,
          padding: 15,
          justifyContent: "flex-end",
        }}
      >
        <Typography>Xin chào,</Typography>
        <Typography
          style={{ fontWeight: "500", color: "#333", marginLeft: 7 }}
        >
          Phương
        </Typography>
        <Dropdown menu={{ items, onClick }}>
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
