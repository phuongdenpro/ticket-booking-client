import { yupResolver } from "@hookform/resolvers/yup";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button, Divider, Drawer, Grid, TextField } from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { isEmpty } from "lodash";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import "../../../../assets/scss/default.scss";
import FormControlCustom from "../../../../components/FormControl";
import InputField from "../../../../components/InputField";
import SelectCustom from "../../../../components/SelectCustom";
import customToast from "../../../../components/ToastCustom";
import { StationApi } from "../../../../utils/stationApi";
import AutocompleteCustom from "../../../../components/AutocompleteCustom";
import { GroupTicketApi } from "../../../../utils/groupTicketApi";
import { TripApi } from "../../../../utils/tripApi";

const AddTrip = (props) => {
  const { setShowDrawer, showDrawer, handleGetData } = props;
  const currentYear = new Date().getFullYear();
  const firstDay = new Date();
  const lastDay = new Date(currentYear, 11, 31);
  const [selectedDate, setSelectedDate] = useState({
    startDate: firstDay,
    endDate: lastDay,
  });
  const optionStatus = ["Kích hoạt", "Tạm ngưng"];
  const [optionStations, setOptionStations] = useState([]);
  const [dataGroupTicket, setDataGroupTicket] = useState([]);
  const handleGetDataGroupTicket = async () => {
    try {
      const groupTicketApi = new GroupTicketApi();
      const response = await groupTicketApi.getList();
      setDataGroupTicket(response);
    } catch (error) {
      customToast.error(error.response.data.message);
    }
  };

  const handelGetOptionStations = async () => {
    try {
      const stationApi = new StationApi();
      const response = await stationApi.getList();
      setOptionStations(response?.data?.data);
    } catch (error) {
      customToast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    handelGetOptionStations();
    handleGetDataGroupTicket();
  }, []);

  const schema = yup.object().shape({
    code: yup
      .string()
      .matches(/^\S*$/, "Mã không chưa khoảng trắng")
      .matches(/^[A-Za-z0-9]*$/, "Không chứa kí tự đặc biệt")
      .required("Mã không được phép bỏ trống"),
    name: yup
      .string()
      .typeError("Tên không được phép bỏ trống")
      .required("Tên không được phép bỏ trống"),
    status: yup
      .string()
      .typeError("Trạng thái không được phép bỏ trống")
      .required("Trạng thái không được phép bỏ trống"),
    codeStationFrom: yup
      .object()
      .typeError("Vui lòng chọn nơi xuất phát")
      .required("Vui lòng chọn nơi xuất phát"),
    codeStationTo: yup
      .object()
      .typeError("Vui lòng chọn nơi đến")
      .required("Vui lòng chọn nơi đến"),
    codeGroupTicket: yup
      .object()
      .typeError("Vui lòng chọn mã nhóm vé")
      .required("Vui lòng chọn mã nhóm vé"),
  });

  const defaultValues = {
    code: "",
    name: "",
    note: "",
    status: "",
  };

  const methods = useForm({
    mode: "onSubmit",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { handleSubmit, reset, formState, setValue, watch } = methods;
  const { errors } = formState;

  const goBack = () => {
    setSelectedDate({
      ...selectedDate,
      startDate: firstDay,
      endDate: lastDay,
    });
    reset();
    setShowDrawer(false);
  };

  const toggleDrawer = (open) => (event) => {
    setShowDrawer(open);
  };
  useEffect(() => {
    reset();
    setSelectedDate({
      ...selectedDate,
      startDate: firstDay,
      endDate: lastDay,
    });
  }, [showDrawer]);

  const onSubmit = async (value) => {
    console.log(value);
    const params = {
      code: value.code,
      name: value.name,
      status: value.status,
      note: value?.note,
      startDate: new Date(selectedDate?.startDate),
      endDate: new Date(selectedDate?.endDate),
      fromStationId: value.codeStationFrom.id,
      toStationId: value.codeStationTo.id,
      ticketGroupId: value.codeGroupTicket.id
    };
    try {
      const tripApi = new TripApi();
      const res = await tripApi.createTrip(params);
      customToast.success("Thêm mới thành công");
      handleGetData();
      setShowDrawer(false);
      reset();
    } catch (error) {
      customToast.error(error.response.data.message);
    }
    handleGetData();
  };
  const buildOptionSelect = (option, props) => {
    return (
      <div style={{ width: "270px" }} {...props}>
        <Grid container style={{ alignItems: "center" }}>
          <Grid item style={{ marginLeft: "5px" }}>
            <div className={"class-display"}>
              <span style={{ fontSize: "13px", color: "#0C59CC" }}>
                {" "}
                {option?.code}
              </span>
              <span style={{ fontSize: "13px" }}>- {option?.name}</span>
            </div>
          </Grid>
        </Grid>
        <Divider />
      </div>
    );
  };
  return (
    <Drawer
      PaperProps={{
        sx: { width: "45%", minWidth: "39rem" },
      }}
      anchor={"right"}
      open={showDrawer}
      className="drawer"
      onClose={toggleDrawer(false)}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="title-drawer">
            <div className="btn-close" onClick={goBack}>
              <ArrowBackIosIcon className="icon-back" />
            </div>
            <div>
              <span>Tạo mới tuyến xe</span>
            </div>
          </div>
          <div className="content-drawer">
            <div className="title-group">
              <span>Thông tin tuyến xe</span>
            </div>
            <div className="content">
              <Grid container spacing={1.5}>
                <Grid item xs={6} className="auto-complete">
                  <FormControlCustom label={"Mã tuyến"} fullWidth isMarked>
                    <InputField
                      name={"code"}
                      placeholder={"Nhập mã tuyến"}
                      error={Boolean(errors.code)}
                      helperText={errors?.code?.message}
                    />
                  </FormControlCustom>
                </Grid>
                <Grid item xs={6}>
                  <FormControlCustom label={"Tên tuyến"} fullWidth isMarked>
                    <InputField
                      name={"name"}
                      placeholder={"Nhập tên tuyến"}
                      helperText={errors?.name?.message}
                      error={Boolean(errors.name)}
                    />
                  </FormControlCustom>
                </Grid>
                <Grid item xs={6}>
                  <FormControlCustom label="Ngày xuất phát" fullWidth isMarked>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={dayjs(selectedDate?.startDate)}
                        onChange={(e) => {
                          setSelectedDate({
                            ...selectedDate,
                            startDate: new Date(e),
                          });
                        }}
                        className={"date-picker"}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControlCustom>
                </Grid>
                <Grid item xs={6}>
                  <FormControlCustom label="Ngày đến" fullWidth isMarked>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={dayjs(selectedDate?.endDate)}
                        onChange={(e) => {
                          setSelectedDate({
                            ...selectedDate,
                            endDate: new Date(e),
                          });
                        }}
                        className={"date-picker"}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControlCustom>
                </Grid>
                <Grid item xs={6}>
                  <FormControlCustom label={"Nơi xuất phát"} fullWidth isMarked>
                    <AutocompleteCustom
                      name={"codeStationFrom"}
                      placeholder={"Chọn nơi xuất phát"}
                      error={Boolean(errors?.codeStationFrom)}
                      helperText={errors?.codeStationFrom?.message}
                      options={optionStations || []}
                      optionLabelKey={"code"}
                      renderOption={buildOptionSelect}
                    />
                  </FormControlCustom>
                </Grid>

                <Grid item xs={6}>
                  <FormControlCustom label={"Nơi đến"} fullWidth isMarked>
                    <AutocompleteCustom
                      name={"codeStationTo"}
                      placeholder={"Chọn nơi đến"}
                      error={Boolean(errors?.codeStationTo)}
                      helperText={errors?.codeStationTo?.message}
                      options={optionStations || []}
                      optionLabelKey={"code"}
                      renderOption={buildOptionSelect}
                    />
                  </FormControlCustom>
                </Grid>

                <Grid item xs={12}>
                  <FormControlCustom label={"Nhóm vé"} fullWidth isMarked>
                    <AutocompleteCustom
                      name={"codeGroupTicket"}
                      placeholder={"Chọn mã nhóm vé"}
                      error={Boolean(errors?.codeGroupTicket)}
                      helperText={errors?.codeGroupTicket?.message}
                      options={dataGroupTicket?.data?.data || []}
                      optionLabelKey={"code"}
                      renderOption={buildOptionSelect}
                    />
                  </FormControlCustom>
                </Grid>

                <Grid item xs={12}>
                  <FormControlCustom label={"Trạng thái"} fullWidth isMarked>
                    <SelectCustom
                      name={"status"}
                      placeholder={"Chọn trạng thái"}
                      error={Boolean(errors?.status)}
                      helperText={errors?.status?.message}
                      options={optionStatus || []}
                    />
                  </FormControlCustom>
                </Grid>

                <Grid item xs={12}>
                  <FormControlCustom label={"Ghi chú"} fullWidth>
                    <InputField
                      className="input-note"
                      name={"note"}
                      helperText={""}
                      placeholder={"Nhập ghi chú"}
                      rows={3}
                      multiline
                    />
                  </FormControlCustom>
                </Grid>
              </Grid>
            </div>
          </div>

          <div className="footer-drawer" style={{ marginTop: 50 }}>
            <Grid
              container
              spacing={3}
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item xs={6} display="flex" justifyContent="end">
                <Button
                  className="btn-secondary-disable"
                  onClick={goBack}
                  variant="outlined"
                  style={{ width: "80%" }}
                >
                  Quay lại
                </Button>
              </Grid>
              <Grid item xs={6} display="flex" justifyContent="end">
                <LoadingButton
                  className={
                    !isEmpty(errors)
                      ? "btn-primary-disable"
                      : "btn-tertiary-normal"
                  }
                  // onClick={onSubmit}
                  type="submit"
                  color="primary"
                  variant="contained"
                  style={{ width: "80%", marginRight: 50 }}
                >
                  {"Thêm mới "}
                </LoadingButton>
              </Grid>
            </Grid>
          </div>
        </form>
      </FormProvider>
    </Drawer>
  );
};

export default AddTrip;
