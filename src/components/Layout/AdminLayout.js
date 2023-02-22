import { Box, Toolbar } from "@mui/material";
import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { right } from "glamor";
import React, { useLayoutEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import colorConfigs from "../../config/colorConfigs";
import sizeConfigs from "../../config/sizeConfigs";
import Sidebar from "../Common/Sidebar";
import Topbar from "../Common/Topbar";

const AdminLayout = () => {
  const ref = useRef(null);
  const [collapsed, setCollapsed] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  return (
    <Box sx={{ display: "flex" }}>
      <Topbar collapsed={collapsed} setCollapsed={setCollapsed} width={width} height={height}/>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={270}
        style={{
          height: "100vh",
          overflow: "auto",
          position:"fixed",
          top: 0,
          bottom:0,
        }}
      >
        <Sidebar collapsed={collapsed} />
      </Sider>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          width: collapsed ? `calc(100% - 80px)` : `calc(100% - 270px)`,
          minHeight: "100vh",
          background: colorConfigs.mainBg,

        }}
        style={{marginLeft: collapsed? 80 : 270}}

      >
        <Toolbar></Toolbar>
        <Outlet></Outlet>
      </Box>
    </Box>
  );
};

export default AdminLayout;
