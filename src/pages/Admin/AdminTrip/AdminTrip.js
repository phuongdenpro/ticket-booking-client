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
import TripList from "./components/TripList";
import { TripApi } from "../../../utils/tripApi";
import customToast from "../../../components/ToastCustom";
import { Helmet } from "react-helmet";

const AdminTrip = (props) => {
  const [data, setData] = useState([]);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [filterParams, setFilterParams] = useState(null);
  const [fromStationId, setFromStationId] = useState(null);
  const [toStationId, setToStationId] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleGetData = async () => {
    try {
      const tripApi = new TripApi();
      const response = await tripApi.getAll({
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
    setFilterParams({
      ...filterParams,
      fromStationId: fromStationId,
      toStationId: toStationId,
      startDate: startDate,
      endDate: endDate,
    });
  }, [fromStationId, toStationId, startDate, endDate]);

  useEffect(() => {
    handleGetData();
  }, [page, pageSize, filterParams]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(+event.target.value);
    setPage(0);
  };
  const defaultValues = {
    typeSearch: null,
    licensePlateSearch: null,
    floorNumber: null,
  };
  const methods = useForm({
    defaultValues,
  });
  const { handleSubmit, reset, watch } = methods;
  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Helmet>
        <title> PDBus - Quản lý chuyến xe</title>
      </Helmet>
      <Grid container className={"align-items-center header_title"}>
        <Grid item md={7}>
          <h2 className={"txt-title"} style={{ marginTop: 20 }}>
            DANH SÁCH CÁC CHUYẾN ĐI
          </h2>
        </Grid>
        <Grid item md={5}>
          <Box
            style={{ display: "flex", justifyContent: "flex-end" }}
            flexDirection={{ xs: "column", md: "row" }}
          >
            <Button
              className={"btn-create"}
              style={{ marginTop: 20, marginRight: 20 }}
              variant="contained"
              color="info"
              startIcon={<RefreshOutlinedIcon />}
            >
              <span className={"txt"}>Làm mới</span>
            </Button>
            <Button
              className={"btn-create"}
              style={{ marginTop: 20, marginRight: 20 }}
              variant="contained"
              color="success"
              startIcon={<DownloadOutlinedIcon />}
            >
              <span className={"txt"}>Xuất danh sách</span>
            </Button>
            <Button
              variant="contained"
              color="warning"
              className={"btn-create"}
              startIcon={<AddIcon />}
              style={{ marginTop: 20, marginRight: 20 }}
            >
              <span className={"txt"}>Thêm mới</span>
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Divider style={{ marginTop: 10 }} />
      <Grid
        className="search"
        container
        style={{ marginTop: 10, marginBottom: 10 }}
      >
        <FormProvider {...methods}>
          <Grid item md={8.5} style={{ marginRight: 30 }}>
            <Box
              style={{ display: "flex", justifyContent: "flex-start" }}
              flexDirection={{ xs: "column", md: "row" }}
            >
              <FormControlCustom label="Nơi đi" fullWidth>
                <div className="view-input" style={{ marginRight: 20 }}>
                  <SelectCustom placeholder={"Tất cả"} name={"status"} />
                </div>
              </FormControlCustom>
              <FormControlCustom label="Nơi đến" fullWidth>
                <div className="view-input" style={{ marginRight: 20 }}>
                  <SelectCustom placeholder={"Tất cả"} name={"outOfDate"} />
                </div>
              </FormControlCustom>
              <FormControlCustom label="Ngày xuất phát" fullWidth>
                <div className="view-input" style={{ marginRight: 20 }}>
                  <SelectCustom placeholder={"Tất cả"} name={"brand"} />
                </div>
              </FormControlCustom>
              <FormControlCustom label="Ngày đến" fullWidth>
                <div className="view-input">
                  <SelectCustom placeholder={"Tất cả"} name={"brand"} />
                </div>
              </FormControlCustom>
            </Box>
          </Grid>
          <Grid item md={3} style={{ marginTop: 3 }}>
            <div style={{ marginBottom: 5 }}>
              <span className="txt-find" style={{ marginBottom: 20 }}>
                Tìm kiếm
              </span>
            </div>

            <SearchInput
              className="txt-search"
              placeholder={"Tìm kiếm chuyến xe"}
              // value={searchValue}
              // setSearchValue={setSearchValue}
              // handleSearch={handleSearch}
            />
          </Grid>
        </FormProvider>
      </Grid>
      <Grid
        item
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 10,
          marginRight: 30,
        }}
        md={6}
      >
        <span className="title-price">Tổng số chuyến xe: </span>
        <span className="txt-price">{data?.data?.pagination?.total}</span>
      </Grid>
      <div style={{ display: "flex" }}>
        <div style={{ flexGrow: 1 }}>
          <TripList
            data={data?.data?.data || []}
            handleChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            total={data?.data?.pagination?.total}
            handleGetData={handleGetData}
            page={page}
            pageSize={pageSize}
          ></TripList>
        </div>
      </div>
    </Box>
  );
};

export default AdminTrip;
