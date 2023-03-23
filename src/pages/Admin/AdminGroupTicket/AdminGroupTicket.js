import AddIcon from "@mui/icons-material/Add";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import { Box, Button, Divider, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import SearchInput from "../../../components/InputSearch";
import customToast from "../../../components/ToastCustom";
import { GroupTicketApi } from "../../../utils/groupTicketApi";
import AddGroupTicket from "./components/AddGroupTicket";
import EditGroupTicket from "./components/EditGroupTicket";
import GroupTicketList from "./components/GroupTicketList";

const AdminGroupTicket = (props) => {
  const [loadings, setLoadings] = useState([]);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [filterParams, setFilterParams] = useState(null);
  const [data, setData] = useState([]);
  const [showDrawerCreate, setShowDrawerCreate] = useState(false);
  const [showDrawerDetail, setShowDrawerDetail] = useState(false);
  const [idGroupTicket, setIdGroupTicket] = useState(null);
  const [detailGroupTicket, setDetailGroupTicket] = useState("");

  const handleGetData = async () => {
    try {
      const groupTicketApi = new GroupTicketApi();
      const response = await groupTicketApi.getAll({
        page: page + 1,
        pageSize: pageSize,
        ...filterParams,
      });
      setData(response);
    } catch (error) {
      customToast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    setFilterParams({ ...filterParams, keywords: searchValue });
  }, [searchValue]);

  useEffect(() => {
    handleGetData();
  }, [page, pageSize, filterParams]);

  const handleSearch = (e) => {
    setFilterParams({ keywords: searchValue || undefined });
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(+event.target.value);
    setPage(0);
  };

  const resetFilterParams = () => {
    handleGetData();
    setPage(0);
    setPageSize(10);
    setSearchValue("");
    customToast.success("Làm mới dữ liệu thành công");
  };
  const handelDetail = (id) => {
    setShowDrawerDetail(true);
    setIdGroupTicket(id);
  };

  const getDetailGroupTicket = async (id) => {
    if (!id) return;
    const ticketGroupApi = new GroupTicketApi();
    const response = await ticketGroupApi.getById(id);
    setDetailGroupTicket(response.data.data);
  };
  useEffect(() => {
    getDetailGroupTicket(idGroupTicket);
  }, [idGroupTicket, showDrawerDetail]);

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Helmet>
        <title> PDBus - Nhóm vé</title>
      </Helmet>
      <Grid container className={"align-items-center header_title"}>
        <Grid item md={7}>
          <h2 className={"txt-title"} style={{ marginTop: 10 }}>
            DANH SÁCH NHÓM VÉ
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
              onClick={resetFilterParams}
            >
              <span className={"txt"}>Làm mới</span>
            </Button>
            <Button
              variant="contained"
              color="warning"
              className={"btn-create"}
              startIcon={<AddIcon />}
              style={{ marginTop: 10, marginRight: 20 }}
              onClick={() => {
                setShowDrawerCreate(true);
              }}
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
            placeholder={"Nhập thông tin tìm kiếm"}
            value={searchValue}
            setSearchValue={setSearchValue}
            handleSearch={handleSearch}
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
        <span
          className="title-price"
          style={{
            color: "#000",
            marginRight: 5,
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          Tổng số nhóm vé:{" "}
        </span>
        <span className="txt-price"> {data?.data?.pagination?.total}</span>
      </Grid>
      <div style={{ display: "flex" }}>
        <div style={{ flexGrow: 1 }}>
          <GroupTicketList
            data={data?.data?.data || []}
            handleChangePage={handleChangePage}
            handelDetail={handelDetail}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            total={data?.data?.pagination?.total}
            handleGetData={handleGetData}
            page={page}
            pageSize={pageSize}
          ></GroupTicketList>
        </div>
      </div>

      <AddGroupTicket
        setShowDrawer={setShowDrawerCreate}
        showDrawer={showDrawerCreate}
        handleGetData={handleGetData}
      ></AddGroupTicket>
      <EditGroupTicket
        setShowDrawer={setShowDrawerDetail}
        showDrawer={showDrawerDetail}
        dataGroupTicket={detailGroupTicket}
        handleGetData={handleGetData}
      ></EditGroupTicket>
    </Box>
  );
};

export default AdminGroupTicket;
