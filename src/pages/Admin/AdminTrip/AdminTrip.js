import { Box, Button, Divider, Grid } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import PrintIcon from "@mui/icons-material/Print";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchInput from "../../../components/InputSearch";
import { FormProvider, useForm } from "react-hook-form";
import FormControlCustom from "../../../components/FormControl";
import SelectCustom from "../../../components/SelectCustom";
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import TripList from "./components/TripList";

const AdminTrip = (props) => {
  const defaultValues = {
    brand: null,
    status: null,
    supplier: null,
    outOfDate: null,
    branch: null,
  };

  const methods = useForm({
    defaultValues,
  });
  const { handleSubmit, reset, watch } = methods;
  return (
    <Box sx={{ height: 480, width: "100%" }}>
      <Grid container className={"align-items-center header_title"}>
        <Grid item md={7}>
          <h2 className={"txt-title"} style={{marginTop:20}}>DANH SÁCH CÁC CHUYẾN ĐI</h2>
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
              size="large"
              startIcon={<RefreshOutlinedIcon />}
            >
              <span className={"txt"}>Làm mới</span>
            </Button>
            <Button
              className={"btn-create"}
              style={{ marginTop: 20, marginRight: 20 }}
              variant="contained"
              color="success"
              size="large"
              startIcon={<DownloadOutlinedIcon />}
            >
              <span className={"txt"}>Xuất danh sách</span>
            </Button>
            <Button
              variant="contained"
              color="warning"
              className={"btn-create"}
              startIcon={<AddIcon />}
              size="large"
              style={{ marginTop: 20, marginRight: 20 }}
            >
              <span className={"txt"}>Thêm mới</span>
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Divider style={{marginTop:20}} />
      <Grid className="search" container style={{marginTop:20, marginBottom:20}}>
        <FormProvider {...methods}>
          <Grid item md={6} style={{marginRight:200}}>
            <Box style={{ display: 'flex', justifyContent: 'flex-start' }} flexDirection={{ xs: 'column', md: 'row' }}>
              <FormControlCustom label="Nơi đi" fullWidth>
                <div className="view-input" style={{marginRight:20}}>
                  <SelectCustom  placeholder={'Tất cả'} name={'status'} />
                </div>
              </FormControlCustom>
              <FormControlCustom label="Nơi đến" fullWidth>
                <div className="view-input" style={{marginRight:20}}>
                  <SelectCustom placeholder={'Tất cả'} name={'outOfDate'} />
                </div>
              </FormControlCustom>
              <FormControlCustom label="Ngày xuất phát" fullWidth>
                <div className="view-input">
                  <SelectCustom placeholder={'Tất cả'} name={'brand'} />
                </div>
              </FormControlCustom>
              
            </Box>
          </Grid>
          <Grid item md={4} style={{marginTop:3}}>
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
      <Grid item style={{ display: 'flex', justifyContent: 'flex-end', marginBottom:20, marginRight:30 }} md={6}>
          <span className="title-price">Tổng số chuyến xe: </span>
          <span className="txt-price">  0</span>
        </Grid>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <TripList>
          </TripList>
        </div>
      </div>
    </Box>
  );
};

export default AdminTrip;
