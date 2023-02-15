import React, { useMemo } from "react";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Autocomplete,
  Button,
  Drawer,
  FormControl,
  Grid,
  TextField,
} from "@mui/material";
import FormControlCustom from "../../../../../components/FormControl";
import InputField from "../../../../../components/InputField";
import SelectCustom from "../../../../../components/SelectCustom";
import { ProvinceApi } from "../../../../../utils/provinceApi";
import "./index.scss";
import { DistrictApi } from "../../../../../utils/districtApi";
import { WardApi } from "../../../../../utils/wardApi";
import UploadImage from "../../../../../components/UploadImage";
import { isEmpty } from "lodash";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import customToast from "../../../../../components/ToastCustom";
const EditStation = (props) => {
  const { setShowDrawer, showDrawer, dataStation } = props;
  const [images, setImages] = useState();
  const [urlImage, setUrlImage] = useState();
  const [optionsProvince, setOptionsProvince] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState({});
  const [optionsDistrict, setOptionsDistrict] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState({});
  const [optionsWard, setOptionsWard] = useState([]);
  const [selectedWard, setSelectedWard] = useState({});

  const getDataProvince = async () => {
    try {
      const provinceApi = new ProvinceApi();
      const res = await provinceApi.getAllProvince();

      const options = [];
      res.data.data.map((item) =>
        options.push({ label: item.name, value: item.code })
      );

      setOptionsProvince(options);
    } catch (error) {}
  };

  const getDataDistrict = async () => {
    try {
      const districtApi = new DistrictApi();
      const res = await districtApi.getDistrictByProvinceId(
        selectedProvince.value
      );
      const options = [];
      res.data.data.map((item) =>
        options.push({ label: item.name, value: item.code })
      );
      setOptionsDistrict(options);
    } catch (error) {}
  };

  const getDataWard = async () => {
    try {
      const wardApi = new WardApi();
      const res = await wardApi.getWardByDistrictId(selectedDistrict.value);
      console.log(res);
      const options = [];
      res.data.data.map((item) =>
        options.push({ label: item.name, value: item.code })
      );
      setOptionsWard(options);
    } catch (error) {}
  };

  const defaultValues = useMemo(
    () => ({
      name: dataStation?.name || "",
      address: dataStation?.address || "",
      wardId: dataStation?.wardId || "",
      images: "" || null,
    }),
    [dataStation]
  );

  const schema = yup.object().shape({
    name: yup.string().required("Tên bến xe không được phép bỏ trống"),
    address: yup.string().required("Địa chỉ không được phép bỏ trống"),

    wardId: yup
      .object()
      .typeError("Phường/thị xã không được bỏ trống")
      .required("Phường/thị xã không được bỏ trống"),
    provinceId: yup
      .string()
      .required("Tỉnh/thành phố xã không được phép bỏ trống"),
    districtId: yup.string().required("Quận/huyện không được phép bỏ trống"),
  });

  useEffect(() => {
    reset({ ...defaultValues });
    setImages(dataStation?.images || []);
    setUrlImage(dataStation?.images || []);
  }, [dataStation]);

  useEffect(() => {
    getDataProvince();
  }, []);

  useEffect(() => {
    if (!selectedProvince) setOptionsDistrict([]);
    else {
      getDataDistrict();
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (!selectedDistrict) {
      setOptionsWard([]);
    } else {
      getDataWard();
    }
  }, [selectedDistrict]);

  const methods = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const { handleSubmit, reset, formState, setValue } = methods;
  const { errors } = formState;
  const toggleDrawer = (open) => (event) => {
    setShowDrawer(open);
  };

  const getUrlFromIMG = async (fromData) => {
    const data = new FormData();
    data.append("images", fromData[0].file, fromData[0].file.name);
    // const a = await uploadImage(data);
    // setUrlImage([a?.data?.images[0].Location]);
  };

  const onChange = (imageList) => {
    // data for submit
    setImages(imageList);
    funcUpload(imageList);
  };

  const funcUpload = async (image) => {
    function readFileAsync() {
      return new Promise((resolve, reject) => {
        const file = image;
        getUrlFromIMG(file).then((response) => {
          if (!response) {
            return;
          }
          const reader = new FileReader();
          reader.onload = () => {
            resolve({
              id: response?.data?.id,
              url: response?.data?.url,
              name: response?.data?.name,
              type: "image",
            });
          };
          reader.onerror = reject;
          // reader.readAsBinaryString(file);
        });
      });
    }
    await readFileAsync();
  };

  const onSubmit = (value = defaultValues) => {
    console.log(value);
  };

  const goBack = () => {
    setShowDrawer(false);
    reset();
  };
  useEffect(() => {
    reset();
  }, [showDrawer]);

  return (
    <Drawer
      PaperProps={{
        sx: { width: "45%" },
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
              <ArrowBackIosIcon
                className="icon-back"
                style={{ marginTop: 10 }}
              />
              <span style={{ fontSize: 30, fontWeight: "bolder" }}>
                Cập nhật
              </span>
            </div>
          </div>
          <div className="content-drawer" style={{ marginTop: 30 }}>
            <div
              className="title-group"
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <span
                style={{
                  fontSize: 25,
                  marginTop: 20,
                  marginLeft: 280,
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                Cập nhật bến xe
              </span>
            </div>
            <div className="content" style={{ marginLeft: 40 }}>
              <Grid container spacing={2} style={{ marginTop: 10 }}>
                <Grid item xs={11.25}>
                  <FormControlCustom label={"Tên bến xe"} fullWidth>
                    <InputField
                      name={"name"}
                      placeholder={"Nhập tên bến xe"}
                      error={Boolean(errors.name)}
                      helperText={errors?.name?.message}
                    />
                  </FormControlCustom>
                </Grid>
                <Grid item xs={3.8}>
                  <FormControlCustom label={"Chọn địa chỉ"} fullWidth>
                    <SelectCustom
                      name={"provinceId"}
                      placeholder={"Chọn tỉnh/thành phố"}
                      error={Boolean(errors?.provinceId)}
                      helperText={errors?.provinceId?.message}
                      onChange={setSelectedProvince}
                      options={optionsProvince}
                      optionLabelKey={"label"}
                    />
                  </FormControlCustom>
                </Grid>
                <Grid item xs={4} style={{ marginTop: 23 }}>
                  <FormControlCustom label={""} fullWidth>
                    <SelectCustom
                      name={"districtId"}
                      placeholder={"Chọn quận/huyện"}
                      error={Boolean(errors?.districtId)}
                      helperText={errors?.districtId?.message}
                      onChange={setSelectedDistrict}
                      options={optionsDistrict}
                      optionLabelKey={"label"}
                    />
                  </FormControlCustom>
                </Grid>
                <Grid item xs={3.5} style={{ marginTop: 23 }}>
                  <FormControlCustom label={""} fullWidth>
                    <SelectCustom
                      name={"wardId"}
                      placeholder={"Chọn phường/thị xã"}
                      error={Boolean(errors?.wardId)}
                      helperText={errors?.wardId?.message}
                      options={optionsWard}
                      optionLabelKey={"label"}
                    />
                  </FormControlCustom>
                </Grid>
                <Grid item xs={11.25}>
                  <FormControlCustom label={"Địa chỉ chi tiết"} fullWidth>
                    <InputField
                      name={"address"}
                      placeholder={"Nhập địa chỉ chi tiết"}
                      error={Boolean(errors.address)}
                      helperText={errors?.address?.message}
                    />
                  </FormControlCustom>
                </Grid>
              </Grid>
            </div>
            <div
              className="title-group"
              style={{ marginLeft: 40, marginTop: 10 }}
            >
              <span>Hình ảnh bến xe</span>
            </div>
            <div className="view-image">
              <div className="image-product">
                <UploadImage onChange={onChange} images={images} />
              </div>
            </div>

            <div className="content"></div>
          </div>

          <div className="footer-drawer">
            <Grid
              container
              spacing={3}
              justifyContent="space-between"
              alignItems="center"
              style={{ marginTop: 20 }}
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
                  {"Xác nhận"}
                </LoadingButton>
              </Grid>
            </Grid>
          </div>
        </form>
      </FormProvider>
    </Drawer>
  );
};

export default EditStation;
