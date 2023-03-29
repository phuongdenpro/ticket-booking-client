import React, { useMemo } from "react";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { yupResolver } from "@hookform/resolvers/yup";
import AddIcon from "@mui/icons-material/Add";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Drawer,
  FormControl,
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  TextField,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { makeStyles } from "@material-ui/core/styles";
import TripDetailList from "./TripDetailList";
import { TripApi } from "../../../../utils/tripApi";
import customToast from "../../../../components/ToastCustom";

const useStyles = makeStyles((theme) => ({
  dialogRoot: {
    minWidth: "90%",
    maxWidth: "90%",
    maxHeight: "90%",
    position: "fixed",
    top: "25%",
    left: "25%",

    transform: "translate(-25%, -25%)",
  },
  dialogContent: {
    padding: theme.spacing(2),
  },
}));

const TripDetail = (props) => {
  const { setShowDrawerDetail, showDrawerDetail, dataTrip } = props;
  const [images, setImages] = useState();
  const [urlImage, setUrlImage] = useState();
  const classes = useStyles();
  const [data, setData] = useState([]);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [filterParams, setFilterParams] = useState(null);

  const handleGetData = async (id) => {
    try {
      const tripApi = new TripApi();
      const response = await tripApi.getTripDetail({
        tripId: dataTrip.id,
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
    handleGetData(dataTrip?.id);
  }, [dataTrip, page, pageSize, filterParams]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(+event.target.value);
    setPage(0);
  };
  return (
    <div>
      <Dialog
        classes={{ paper: classes.dialogRoot }}
        open={showDrawerDetail}
        onClose={() => setShowDrawerDetail(false)}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: "#fff",
            height: "100vh",
            width: "100vw",
          },
        }}
      >
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            textAlign: "center",
            fontSize: 23,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <InfoIcon
              style={{
                display: "block",
                fill: "#1a89ac",
                marginRight: 10,
                marginTop: 5,
                borderRadius: "50%",
                padding: 2,
                backgroundColor: "#fff",
              }}
            />
            Danh sách chuyến đi chi tiết của tuyến #
            <span style={{ color: "blue" }}>{dataTrip?.code}</span>
          </div>

          <Button
            variant="contained"
            color="warning"
            className={"btn-create"}
            startIcon={<AddIcon />}
          >
            Thêm mới
          </Button>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <div className="row"></div>

            <Divider />

            <TripDetailList
              data={data?.data?.data || []}
              total={data?.data?.pagination?.total}
              handleGetData={handleGetData}
              handleChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              page={page}
              pageSize={pageSize}
            ></TripDetailList>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => setShowDrawerDetail(false)}
            style={{ marginBottom: 1 }}
          >
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TripDetail;
