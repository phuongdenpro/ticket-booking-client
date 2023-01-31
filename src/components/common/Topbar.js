import { AppBar, Toolbar } from "@mui/material";
import { Typography } from "antd";
import React from "react";
import colorConfigs from "../../config/colorConfigs";
import sizeConfigs from "../../config/sizeConfigs";

const Topbar = (props) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${sizeConfigs.sidebar.width})`,
        ml: sizeConfigs.sidebar.width,
        boxShadow: "unset",
        backgroundColor: colorConfigs.topbar.bg,
        color: colorConfigs.topbar.color
      }}
    >
    <Toolbar>
      <Typography>
      Xin chào</Typography>
    </Toolbar>
    </AppBar>
  );
};

export default Topbar;
