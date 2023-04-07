import {
  Button,
  Divider,
  Grid,
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import FormControlCustom from "../../../components/FormControl";
import SelectCustom from "../../../components/SelectCustom";
import InputField from "../../../components/InputField";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import moment from "moment";
import TicketBookingList from "../AdminAddTicket/TicketBookingList";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { convertCurrency } from "../../../data/curren";
import "./AdminOrder.scss";
import { useParams } from "react-router-dom";
import { OrderApi } from "../../../utils/orderApi";
import customToast from "../../../components/ToastCustom";
import { CustomerApi } from "../../../utils/customerApi";
import TicketOrderList from "./components/TicketOrderList";

const OrderDetail = (props) => {
  const [orderDetail, setOrderDetail] = useState();
  const dateNow = moment(new Date()).format("DD-MM-YYYY hh:mm");
  const [value, setValueChange] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const idOrder = useParams();
  const [dataOrder, setDataOrder] = useState();
  console.log(dataOrder);

  const getDetailOrder = async () => {
    try {
      const orderApi = new OrderApi();
      const res = await orderApi.getOrderById(idOrder.id);
      setDataOrder(res?.data.data);
    } catch (error) {
      customToast.error(error);
    }
  };

  useEffect(() => {
    getDetailOrder();
  }, [idOrder]);

  const schema = yup.object().shape({});

  const defaultValues = {
    note: "",
    paymentPrice: "",
    createdDate: dateNow,
    paymentType: "",
    paymentBank: "",
    branch: "",
    resourceBank: "",
    province: "",
    district: "",
    noteUpdate: "",
  };

  const methods = useForm({
    mode: "onSubmit",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { formState, watch, setValue, handleSubmit, reset } = methods;
  const { errors } = formState;
  const handleChange = (event, newValue) => {
    setValueChange(newValue);
  };

  const onClickCancel = () => {
    customToast.warning("Coming soon...");
  };

  const checkPayment = () => {
    return (
      <div
        className={"page-layout"}
        style={{ marginLeft: "0px", marginTop: 10 }}
      >
        <Grid container overflow={"hidden"}>
          <Grid flexDirection={{ xs: "column", md: "row" }} item>
            <Tabs value={value} onChange={handleChange} textColor="primary">
              <Tab label="Thanh toán" className="left-border" />
              <Tab label="Lịch sử" className="right-border" />
            </Tabs>
          </Grid>
        </Grid>
        <Divider />
        {tabPayment()}
      </div>
    );
  };

  const tabPayment = () => {
    if (value === 0) {
      return (
        <FormProvider {...methods}>
          <form>
            <div className="content mt-2">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControlCustom
                    classNameLabel={
                      "flex justify-content-center align-items-center mr-1 w-100 justify-content-start order-custom-title"
                    }
                    className={"flex-direction-row"}
                    label={"Thời gian"}
                    fullWidth
                  >
                    <InputField
                      style={{ width: "100%" }}
                      name={"createdDate"}
                      placeholder={"Nhập thời gian"}
                      error={Boolean(errors.createdDate)}
                      helperText={""}
                    />
                  </FormControlCustom>
                </Grid>

                <Grid item xs={12}>
                  <FormControlCustom
                    classNameLabel={
                      "flex justify-content-center align-items-center mr-1 w-100 justify-content-start order-custom-title"
                    }
                    className={"flex-direction-row"}
                    label={"Số tiền"}
                    fullWidth
                  >
                    <InputField
                      style={{ width: "100%" }}
                      name={"paymentPrice"}
                      placeholder={"Nhập thành tiền"}
                      error={Boolean(errors.amount)}
                      helperText={""}
                    />
                  </FormControlCustom>
                </Grid>

                <Grid item xs={12}>
                  <FormControlCustom
                    label={"Ngân hàng"}
                    classNameLabel={
                      "flex justify-content-center align-items-center mr-1 w-100 justify-content-start order-custom-title"
                    }
                    className={"flex-direction-row"}
                    fullWidth
                  >
                    <SelectCustom
                      style={{ width: "100%" }}
                      name={"paymentBank"}
                      placeholder={"Chọn bank"}
                    />
                  </FormControlCustom>
                </Grid>
                <Grid item xs={12}>
                  <FormControlCustom
                    label={"PTTT"}
                    classNameLabel={
                      "flex justify-content-center align-items-center mr-1 w-100 justify-content-start order-custom-title"
                    }
                    className={"flex-direction-row"}
                    fullWidth
                  >
                    <SelectCustom
                      style={{ width: "100%" }}
                      name={"paymentType"}
                      placeholder={"Chọn PTTT"}
                    />
                  </FormControlCustom>
                </Grid>

                <Grid item xs={12}>
                  <FormControlCustom
                    classNameLabel={
                      "flex justify-content-center align-items-center mr-1 w-100 justify-content-start order-custom-title"
                    }
                    className={"flex-direction-row"}
                    label={"Ghi chú"}
                    fullWidth
                  >
                    <InputField
                      style={{ width: "100%" }}
                      multiline
                      rows={3}
                      name={"note"}
                      placeholder={"Nhập ghi chú"}
                      error={Boolean(errors.note)}
                      helperText={""}
                    />
                  </FormControlCustom>
                </Grid>
              </Grid>
            </div>
            <Grid
              container
              spacing={2}
              className={`mt-1`}
              justifyContent="center"
            >
              <Grid item xs={7}>
                <Button
                  variant="contained"
                  size="medium"
                  className={`btn-tertiary-normal`}
                  style={{ height: "2rem" }}
                  //   type="submit"
                  onClick={onClickCancel}
                >
                  Thêm thanh toán
                </Button>
              </Grid>
            </Grid>
          </form>
        </FormProvider>
      );
    } else {
      return (
        <FormProvider {...methods}>
          <form>
            <div className="content mt-2" style={{ width: 380 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TableContainer component={Paper} style={{ width: '100%' }}>
                    <Table
                      size="small"
                      aria-label="a dense table"
                      padding="none"
                      style={{ width: '100%' }}
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell
                            align={"center"}
                            padding="none"
                            style={{ width: "100px" }}
                          >
                            Thời gian
                          </TableCell>
                          <TableCell
                            align={"center"}
                            padding="none"
                            style={{ width: "100px" }}
                          >
                            Nội dung
                          </TableCell>
                          <TableCell
                            align={"center"}
                            padding="none"
                            style={{ width: "100px" }}
                          >
                            Số tiền
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell align={"center"}>30/04/2023</TableCell>
                          <TableCell align={"center"}>
                            Phương chuyển khoản
                          </TableCell>
                          <TableCell align={"center"}>330.000đ</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </div>
          </form>
        </FormProvider>
      );
    }
  };

  const checkPaymentOrder = () => {
    return (
      <Grid container md={12}>
        <div
          className={"page-layout"}
          style={{
            marginLeft: "0px",
            border: "3px solid #F5F5F5",
            padding: 10,
          }}
        >
          <Grid item className={"align-items-center header_title"}>
            <Grid item md={7}>
              <h2 className={"txt-title"}>THANH TOÁN</h2>
            </Grid>
          </Grid>
          <Divider style={{ marginTop: 10, marginBottom: 10 }} />
          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span className={"order-custom-title"}>Tổng tiền VND</span>
              <span className={"order-field-value"}>
                {convertCurrency(dataOrder?.total)}
              </span>
            </div>
            <Divider style={{ borderStyle: "dashed", margin: "10px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span className={"order-custom-title"}>Giảm giá</span>
              <span className={"order-field-value"}>
                {convertCurrency(dataOrder?.total - dataOrder?.finalTotal)}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "12px 0",
              }}
            >
              <span className={"order-custom-title"}>Thành tiền</span>
              <span className={"order-field-value"}>
                {convertCurrency(dataOrder?.finalTotal)}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span className={"order-custom-title"}>Đã thanh toán</span>
              <span className={"order-field-value"}>0</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "12px 0",
              }}
            >
              <span className={"order-custom-title"}>
                Số tiền cần thanh toán -100%
              </span>
              <span className={"order-field-value"}>
                {convertCurrency(dataOrder?.total)}
              </span>
            </div>
          </div>
          <Divider />
          {checkPayment()}
        </div>
      </Grid>
    );
  };

  return (
    <div className={"page-layout-blank"}>
      <Helmet>
        <title> PDBus - Chi tiết hóa đơn</title>
      </Helmet>
      <Grid container spacing={1}>
        <Grid item md={8}>
          <div
            className={"page-layout"}
            style={{ border: "3px solid #F5F5F5", padding: 10 }}
          >
            <Grid
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <div>
                  <h2 className={"txt-title"}>HÓA ĐƠN #{dataOrder?.code}</h2>
                </div>
                <div style={{ padding: "2px 5px" }}>
                  <div
                    style={{
                      backgroundColor: "blue",
                      borderRadius: "15px",
                    }}
                  >
                    <span
                      style={{
                        color: "white",
                        fontSize: "0.73rem",
                        fontWeight: "600",
                        padding: "2px 5px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {dataOrder?.status}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <Button
                  style={{
                    backgroundColor: "#27c24c",
                    padding: "1px 4px",
                    textTransform: "none",
                  }}
                  onClick={onClickCancel}
                >
                  <span
                    style={{
                      color: "white",
                      fontSize: "0.7rem",
                      fontWeight: "600",
                      padding: "2px 5px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Hủy đơn hàng
                  </span>
                </Button>
              </div>
            </Grid>

            <Divider style={{ marginTop: 10 }} />

            <FormProvider {...methods}>
              <form>
                <div className="content mt-2">
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <FormControlCustom
                        label={"Khách hàng*"}
                        classNameLabel={
                          "flex justify-content-center align-items-center mr-1 w-100 justify-content-start order-custom-title"
                        }
                        className={"flex-direction-row"}
                        fullWidth
                      >
                        <TextField
                          className={"disabled-field input-detail"}
                          style={{ width: "100%" }}
                          disabled={disabled}
                          value={dataOrder?.customer?.fullName}
                        />
                      </FormControlCustom>
                    </Grid>

                    <Grid item xs={6}>
                      <FormControlCustom
                        label={"Địa chỉ"}
                        classNameLabel={
                          "flex justify-content-center align-items-center mr-1 w-100 justify-content-start order-custom-title"
                        }
                        className={"flex-direction-row"}
                        fullWidth
                      >
                        <TextField
                          className={"disabled-field input-detail"}
                          style={{ width: "100%" }}
                          disabled={disabled}
                          value={dataOrder?.customer?.fullAddress}
                        />
                      </FormControlCustom>
                    </Grid>

                    <Grid item xs={6}>
                      <FormControlCustom
                        classNameLabel={
                          "flex justify-content-center align-items-center mr-1 w-100 justify-content-start order-custom-title"
                        }
                        className={"flex-direction-row"}
                        label={"Điện thoại"}
                        fullWidth
                      >
                        <TextField
                          className={"disabled-field input-detail"}
                          style={{ width: "100%" }}
                          disabled={disabled}
                          value={dataOrder?.customer?.phone}
                        />
                      </FormControlCustom>
                    </Grid>

                    <Grid item xs={6}>
                      <FormControlCustom
                        classNameLabel={
                          "flex justify-content-center align-items-center mr-1 w-100 justify-content-start order-custom-title"
                        }
                        className={"flex-direction-row"}
                        label={"Email"}
                        fullWidth
                      >
                        <TextField
                          style={{ width: "100%" }}
                          disabled={disabled}
                          className={"disabled-field input-detail"}
                          value={dataOrder?.customer?.email}
                        />
                      </FormControlCustom>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlCustom
                        classNameLabel={
                          "flex justify-content-center align-items-center mr-1 w-100 justify-content-start order-custom-title"
                        }
                        className={"flex-direction-row"}
                        label={"Mã khuyến mãi"}
                        fullWidth
                      >
                        <TextField
                          style={{ width: "100%" }}
                          disabled={disabled}
                          className={"disabled-field input-detail"}
                          value={dataOrder?.promotionHistories
                            ?.map((item) => item.promotionLineCode)
                            .join(", ")}
                        />
                      </FormControlCustom>
                    </Grid>

                    <Grid item xs={6}>
                      <FormControlCustom
                        classNameLabel={
                          "flex justify-content-center align-items-center mr-1 w-100 justify-content-start order-custom-title"
                        }
                        className={"flex-direction-row"}
                        label={"Nhân viên"}
                        fullWidth
                      >
                        <TextField
                          style={{ width: "100%" }}
                          disabled={disabled}
                          className={"disabled-field input-detail"}
                          value={dataOrder?.staff?.fullName}
                        />
                      </FormControlCustom>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlCustom
                        classNameLabel={
                          " mr-1 w-100 justify-content-start order-custom-title"
                        }
                        className={"flex-direction-row"}
                        label={"Ghi chú"}
                        fullWidth
                      >
                        <TextField
                          style={{ width: "100%" }}
                          disabled={disabled}
                          className={"disabled-field input-detail"}
                          value={dataOrder?.note}
                          multiline
                          rows={3}
                        />
                      </FormControlCustom>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlCustom
                        classNameLabel={
                          "flex justify-content-center align-items-center mr-1 w-100 justify-content-start order-custom-title"
                        }
                        className={"flex-direction-row"}
                        label={"Thời gian"}
                        fullWidth
                      >
                        <TextField
                          style={{ width: "100%" }}
                          disabled={disabled}
                          className={"disabled-field input-detail"}
                          value={moment(dataOrder?.createdAt).format(
                            "DD/MM/YYYY HH:mm"
                          )}
                        />
                      </FormControlCustom>
                    </Grid>
                  </Grid>
                </div>
              </form>
            </FormProvider>
          </div>
          <div
            className={"page-layout"}
            style={{ border: "3px solid #F5F5F5", padding: 10, marginTop: 20 }}
          >
            <Grid item className={"align-items-center header_title"}>
              <Grid item md={7}>
                <h2 className={"txt-title"}>DANH SÁCH VÉ ĐÃ ĐẶT</h2>
              </Grid>
            </Grid>
            <TicketOrderList
              data={dataOrder?.orderDetails || []}
              onClickPrint={onClickCancel}
            ></TicketOrderList>
          </div>
        </Grid>
        <Grid item md={4}>
          {checkPaymentOrder()}
        </Grid>
      </Grid>
      <div></div>
    </div>
  );
};

export default OrderDetail;
