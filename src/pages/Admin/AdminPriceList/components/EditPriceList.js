import { Button, Divider, Grid } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { FormProvider, useForm } from "react-hook-form";
import AutocompleteCustom from "../../../../components/AutocompleteCustom";
import FormControlCustom from "../../../../components/FormControl";
import InputField from "../../../../components/InputField";
import * as yup from "yup";
import { isEmpty } from "lodash";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import SelectCustom from "../../../../components/SelectCustom";
import "../../../../assets/scss/default.scss";
import PriceList from "./PriceList";
import GroupTicketList from "./GroupTicketList";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useNavigate, useParams } from "react-router-dom";
import customToast from "../../../../components/ToastCustom";
import { PriceListApi } from "../../../../utils/priceListApi";

const EditPriceList = (props) => {
  const [dataCustomer, setData] = useState();
  const dateNow = moment(new Date()).format("DD-MM-YYYY hh:mm");
  const navigate = useNavigate();
  const codePriceList = useParams();
  const [detailPriceList, setDetailPriceList] = useState({});

  const getDetailPriceList = async () => {
    try {
      console.log(codePriceList);
      const priceListApi = new PriceListApi();
      const res = await priceListApi.getPriceListById(codePriceList.id);
      console.log(res);
      setDetailPriceList(res?.data.data);
    } catch (error) {
      customToast.error(error);
    }
  };

  useEffect(() => {
    getDetailPriceList();
  }, [codePriceList]);
  const defaultValues = useMemo(
    () => ({
      province: dataCustomer?.citiesId || "",
      email: dataCustomer?.email || "",
      address: dataCustomer?.address || "",
      phone: dataCustomer?.phone || "",
      district: dataCustomer?.districtId || "",
      customer: dataCustomer || "",
      note: "",
      price: "",
      createdDate: dateNow,
      placePickOrder: "",
      branch: "",
      userReview: "",
      paymentTime: dateNow,
      paymentPrice: "",
    }),
    [dataCustomer]
  );
  const schema = yup.object().shape({
    customer: yup
      .object()
      .typeError("Vui lòng chọn khách hàng")
      .required("Vui lòng chọn khách hàng"),
    phone: yup.string().required("Vui lòng nhập số điện thoại"),
    address: yup.string().required("Vui lòng nhập địa chỉ"),
    branch: yup
      .object()
      .typeError("Vui lòng chọn chi nhánh")
      .required("Vui lòng chọn chi nhánh"),
  });
  const methods = useForm({
    mode: "onSubmit",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { formState, watch, setValue, handleSubmit, reset, getValues } =
    methods;
  return (
    <div className={"page-layout-blank"} style={{ width: "100%" }}>
      <Helmet>
        <title> PDBus - Đặt vé cho khách hàng</title>
      </Helmet>
      <Grid container spacing={1}>
        <Grid md={12}>
          <div className={"page-layout"}>
            <Grid
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <div>
                  <h2 className={"txt-title"}>
                    Bảng giá #{detailPriceList?.code}
                  </h2>
                </div>
                <div style={{ padding: "2px 5px" }}>
                  <div
                    style={{
                      backgroundColor:
                        detailPriceList?.status == "Tạm ngưng"
                          ? "red"
                          : "green",
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
                      {detailPriceList?.status == "Tạm ngưng"
                        ? "Tạm ngưng"
                        : "Hoạt động"}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <Button
                  style={{
                    padding: "1px 4px",
                    textTransform: "none",
                  }}
                  // onClick={() => setShowAddCustomer(true)}
                >
                  <BorderColorIcon color="primary" fontSize="small" />
                  <span
                    style={{
                      color: "#00354e ",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      padding: "2px 5px",
                      display: "flex",
                      alignItems: "center",
                      marginRight: "5px",
                    }}
                  >
                    Thay đổi
                  </span>
                </Button>
              </div>
            </Grid>
            <Divider />
            <FormProvider {...methods}>
              <form>
                <div className="content mt-2">
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <FormControlCustom
                        label={"Mã bảng giá*"}
                        classNameLabel={
                          "flex justify-content-center align-items-center mr-1 w-100 justify-content-start order-custom-title"
                        }
                        className={"flex-direction-row"}
                        fullWidth
                      >
                        <InputField
                          style={{ width: "100%" }}
                          name={"address"}
                          placeholder={""}
                        />
                      </FormControlCustom>
                    </Grid>

                    <Grid item xs={6}>
                      <FormControlCustom
                        label={"Tên bảng giá"}
                        classNameLabel={
                          "flex justify-content-center align-items-center mr-1 w-100 justify-content-start order-custom-title"
                        }
                        className={"flex-direction-row"}
                        fullWidth
                      >
                        <InputField
                          style={{ width: "100%" }}
                          name={"address"}
                          placeholder={""}
                        />
                      </FormControlCustom>
                    </Grid>

                    <Grid item xs={6}>
                      <FormControlCustom
                        classNameLabel={
                          "flex justify-content-center align-items-center mr-1 w-100 justify-content-start order-custom-title"
                        }
                        className={"flex-direction-row"}
                        label={"Ngày bắt đầu"}
                        fullWidth
                      >
                        <InputField
                          style={{ width: "100%" }}
                          name={"phone"}
                          helperText={""}
                          placeholder={""}
                        />
                      </FormControlCustom>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlCustom
                        classNameLabel={
                          "flex justify-content-center align-items-center mr-1 w-100 justify-content-start order-custom-title"
                        }
                        className={"flex-direction-row"}
                        label={"Ngày kết thúc"}
                        fullWidth
                      >
                        <InputField
                          style={{ width: "100%" }}
                          name={"phone"}
                          helperText={""}
                          placeholder={""}
                        />
                      </FormControlCustom>
                    </Grid>

                    <Grid item xs={6}>
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
                          helperText={""}
                        />
                      </FormControlCustom>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlCustom
                        classNameLabel={
                          "flex justify-content-center align-items-center mr-1 w-100 justify-content-start order-custom-title"
                        }
                        className={"flex-direction-row"}
                        label={"Ngày tạo"}
                        fullWidth
                      >
                        <InputField
                          disabled
                          style={{ width: "100%" }}
                          name={"createdDate"}
                          placeholder={"Nhập ngày tạo bảng giá"}
                          helperText={""}
                        />
                      </FormControlCustom>
                    </Grid>
                  </Grid>
                </div>
              </form>
            </FormProvider>
          </div>

          <div className={"page-layout"} style={{ marginTop: 50 }}>
            <Grid className={"align-items-center header_title"}>
              <Grid md={7}>
                <h2 className={"txt-title"}>DANH SÁCH ÁP DỤNG</h2>
              </Grid>
              <div
                className="item-btn-right"
                style={{ float: "right", marginBottom: 20 }}
              >
                <Button
                  className={"btn-create"}
                  variant="outlined"
                  size="medium"
                  style={{ height: "2rem" }}
                >
                  <span className={"txt"}>Thêm nhóm</span>
                </Button>
              </div>
            </Grid>
            <GroupTicketList />
          </div>
        </Grid>
      </Grid>

      <div></div>
    </div>
  );
};

export default EditPriceList;
