import AddIcon from "@mui/icons-material/Add";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import { Box, Button, Divider, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FormProvider, useForm } from "react-hook-form";
import FormControlCustom from "../../../components/FormControl";
import SearchInput from "../../../components/InputSearch";
import SelectCustom from "../../../components/SelectCustom";
import customToast from "../../../components/ToastCustom";
import { GroupCusApi } from "../../../utils/groupCusApi";
import { PriceListApi } from "../../../utils/priceListApi";
import PriceList from "./components/PriceList";

const AdminPriceList = (props) => {
  const [loadings, setLoadings] = useState([]);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [filterParams, setFilterParams] = useState(null);
  const [data, setData] = useState([]);

  const handleGetData = async () => {
    try {
      const priceListApi = new PriceListApi();
      const response = await priceListApi.getAll({
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
        <title> PDBus - Bảng giá</title>
      </Helmet>
      <Grid container className={"align-items-center header_title"}>
        <Grid item md={7}>
          <h2 className={"txt-title"} style={{ marginTop: 10 }}>
            BẢNG GIÁ
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
      <Grid className="search" container style={{ marginTop: 10, marginBottom:20 }}>
        <FormProvider {...methods}>
          <Grid item md={7} style={{ marginRight: 30 }}>
            <Box
              style={{ display: "flex", justifyContent: "flex-start" }}
              flexDirection={{ xs: "column", md: "row" }}
            >
              <FormControlCustom label="Ngày bắt đầu" fullWidth>
                <div className="view-input" style={{ marginRight: 20 }}>
                  <SelectCustom placeholder={"Tất cả"} name={"brand"} />
                </div>
              </FormControlCustom>
              <FormControlCustom label="Ngày kết thúc" fullWidth>
                <div className="view-input" style={{ marginRight: 20 }}>
                  <SelectCustom placeholder={"Tất cả"} name={"brand"} />
                </div>
              </FormControlCustom>
              <FormControlCustom label="Trạng thái" fullWidth>
                <div className="view-input" style={{ marginRight: 20 }}>
                  <SelectCustom placeholder={"Tất cả"} name={"outOfDate"} />
                </div>
              </FormControlCustom>
            </Box>
          </Grid>
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
        </FormProvider>
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
          Tổng số:{" "}
        </span>
        <span className="txt-price"> {data?.data?.pagination?.total}</span>
      </Grid>
      <div style={{ display: "flex" }}>
        <div style={{ flexGrow: 1 }}>
          <PriceList
            data={data?.data?.data || []}
            handleChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            total={data?.data?.pagination?.total}
            handleGetData={handleGetData}
            page={page}
            pageSize={pageSize}
          ></PriceList>
        </div>
      </div>
    </Box>
  );
};

export default AdminPriceList;
