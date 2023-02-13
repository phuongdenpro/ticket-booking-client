import React, { useMemo } from "react";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Autocomplete,
  Drawer,
  FormControl,
  Grid,
  TextField,
} from "@mui/material";
import FormControlCustom from "../../../../../components/FormControl";
import InputField from "../../../../../components/InputField";
import { messageToast } from "../../../../../components/Toast";
import SelectCustom from "../../../../../components/SelectCustom";
import { ProvinceApi } from "../../../../../utils/provinceApi";
import "./index.scss";
import { DistrictApi } from "../../../../../utils/districtApi";
import { WardApi } from "../../../../../utils/wardApi";
import UploadImage from "../../../../../components/UploadImage";
const CreateStation = (props) => {
  const toast = messageToast();
  const { setShowDrawer, showDrawer, type, dataStation } = props;
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
    } catch (error) {
      toast("error", "Có lỗi xảy ra");
    }
  };

  const getDataDistrict = async () => {
    try {
      console.log(selectedProvince.value);
      const districtApi = new DistrictApi();
      const res = await districtApi.getDistrictByProvinceId(
        selectedProvince.value
      );
      console.log(res);
      const options = [];
      res.data.data.map((item) =>
        options.push({ label: item.name, value: item.code })
      );
      setOptionsDistrict(options);
    } catch (error) {}
  };

  const getDataWard = async () => {
    try {
      console.log(selectedDistrict.value);
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
      name: dataStation?.sku || "",
      address: dataStation?.address || "",
      wardId: dataStation?.wardId || "",
      images: "" || null,
    }),
    [dataStation]
  );

  const schema = yup.object().shape({
    name: yup.string().required("Mã SKU không được phép bỏ trống"),
    address: yup.string().required("Tên sản phẩm không được phép bỏ trống"),
    type: yup.string().required("Loại sản phẩm không được phép bỏ trống"),
    brand: yup.string().required("Thương hiệu không đươc phép bỏ trống"),
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
    if (!selectedDistrict) setOptionsWard([]);
    else {
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

  const onSubmit = (value = defaultValues) => {};

  const goBack = () => {
    setShowDrawer(false);
    reset();
  };

  const getTitle = (type) => {
    if (type === "update") {
      return "Cập nhật";
    } else {
      return "Tạo mới";
    }
  };

  return (
    <Drawer
      PaperProps={{
        sx: { width: "40%" },
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

              <span>{getTitle(type)}</span>
            </div>
          </div>
          <div className="content-drawer">
            <div className="title-group">
              <span>{getTitle(type)} bến xe</span>
            </div>
            <div className="content">
              <Grid container spacing={2}>
                <Grid item xs={9}>
                  <FormControlCustom label={"Tên bến xe"} fullWidth>
                    <InputField
                      name={"name"}
                      placeholder={"Nhập tên bến xe"}
                      error={Boolean(errors.name)}
                      helperText={errors?.name?.message}
                    />
                  </FormControlCustom>
                </Grid>
                <Grid item xs={4}>
                  <FormControlCustom label={"Chọn địa chỉ"} fullWidth>
                    <Autocomplete
                      noOptionsText={"Không có dữ liệu"}
                      disablePortal
                      id="combo-box-demo"
                      className={"select-custom"}
                      options={optionsProvince}
                      onChange={(event, value) => setSelectedProvince(value)}
                      renderInput={(params) => (
                        <TextField {...params} placeholder={"Chọn tỉnh/thành phố"} />
                      )}
                    />
                  </FormControlCustom>
                </Grid>
                <Grid item xs={4} style={{ marginTop: 20 }}>
                  <FormControlCustom label={""} fullWidth>
                    <Autocomplete
                      noOptionsText={"Không có dữ liệu"}
                      disablePortal
                      id="combo-box-demo"
                      className={"select-custom"}
                      options={optionsDistrict}
                      onChange={(event, value) => setSelectedDistrict(value)}
                      renderInput={(params) => (
                        <TextField {...params} placeholder={"Chọn quận/huyện"} />
                      )}
                    />
                  </FormControlCustom>
                </Grid>
                <Grid item xs={4} style={{ marginTop: 20 }}>
                  <FormControlCustom label={""} fullWidth>
                    <Autocomplete
                      noOptionsText={"Không có dữ liệu"}
                      disablePortal
                      id="combo-box-demo"
                      className={"select-custom"}
                      options={optionsWard}
                      onChange={(event, value) => setSelectedWard(value)}
                      renderInput={(params) => (
                        <TextField {...params} placeholder={"Chọn phường/thị xã"} />
                      )}
                    />
                  </FormControlCustom>
                </Grid>
                <Grid item xs={12}>
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
            <div className="title-group">
              <span>Hình ảnh bến xe</span>
            </div>
            <div className="view-image">
              <div className="image-product">
                <UploadImage onChange={onChange} images={images} />
              </div>
            </div>

            <div className="content"></div>
          </div>
        </form>
      </FormProvider>
    </Drawer>
  );
};

export default CreateStation;
