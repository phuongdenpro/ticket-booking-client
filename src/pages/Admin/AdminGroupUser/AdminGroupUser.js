import { Box, Button, Divider, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import PrintIcon from "@mui/icons-material/Print";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchInput from "../../../components/InputSearch";
import { FormProvider, useForm } from "react-hook-form";
import FormControlCustom from "../../../components/FormControl";
import SelectCustom from "../../../components/SelectCustom";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import UserGroupList from "./components/ListGroupUser";
import { GroupCusApi } from "../../../utils/groupCusApi";

const AdminGroupUser = (props) => {
  const [loadings, setLoadings] = useState([]);
  const [showDrawerEdit, setShowDrawerEdit] = useState(false);
  const [showDrawerCreate, setShowDrawerCreate] = useState(false);
  const [showDrawerDetail, setShowDrawerDetail] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [idStation, setIdStation] = useState(null);
  const [detailStation, setDetailStation] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [selectedStation, setSelectedStation] = useState([]);
  const [selected, setSelected] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filterParams, setFilterParams] = useState(null);
  const [data, setData] = useState([]);

  const handleGetData = async () => {
    console.log("vào");
    const groupCusApi = new GroupCusApi();
    const response = await groupCusApi.getAll({
      page: page + 1,
      pageSize: pageSize,
      ...filterParams,
    });
    setData(response);
  };
  useEffect(() => {
    handleGetData();
  }, [page, pageSize, filterParams]);
  return (
    <Box sx={{ height: 480, width: "100%" }}>
      <Grid container className={"align-items-center header_title"}>
        <Grid item md={7}>
          <h2 className={"txt-title"} style={{ marginTop: 10 }}>
            NHÓM KHÁCH HÀNG
          </h2>
        </Grid>
        <Grid item md={5}>
          <Box
            style={{ display: "flex", justifyContent: "flex-end" }}
            flexDirection={{ xs: "column", md: "row" }}
          >
            <Button
              className={"btn-create"}
              style={{ marginTop: 10, marginRight: 20 }}
              variant="contained"
              color="info"
              startIcon={<RefreshOutlinedIcon />}
            >
              <span className={"txt"}>Làm mới</span>
            </Button>
            <Button
              variant="contained"
              color="warning"
              className={"btn-create"}
              startIcon={<AddIcon />}
              style={{ marginTop: 10, marginRight: 20 }}
            >
              <span className={"txt"}>Thêm mới</span>
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Divider style={{ marginTop: 10 }} />
      <Grid className="search" container style={{ marginTop: 10 }}>
        <Grid item md={4} style={{ marginTop: 3 }}>
          <div style={{ marginBottom: 5 }}>
            <span className="txt-find">Tìm kiếm</span>
          </div>

          <SearchInput
            className="txt-search"
            placeholder={"Tìm kiếm khách hàng"}
            // value={searchValue}
            // setSearchValue={setSearchValue}
            // handleSearch={handleSearch}
          />
        </Grid>
      </Grid>
      <Grid
        item
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: 10,
        }}
        md={6}
      >
        <span className="title-price">Tổng số khách hàng: </span>
        <span className="txt-price"> 0</span>
      </Grid>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <UserGroupList data={data?.data?.data || []}></UserGroupList>
        </div>
      </div>
    </Box>
  );
};

export default AdminGroupUser;
