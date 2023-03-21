import { yupResolver } from "@hookform/resolvers/yup";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { LoadingButton } from "@mui/lab";
import {
    Button,
    Drawer, Grid
} from "@mui/material";
import { isEmpty } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import UploadImage from "../../../../components/UploadImage";
import UploadSingle from "../../../../components/UploadImage/uploadSingle";
import { UploadApi } from "../../../../utils/uploadApi";
import "./index.scss";
const AddVehicle = ({ setShowDrawer, showDrawer, handleGetData }) => {
  const [images, setImages] = useState([]);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [urlImage, setUrlImage] = useState([]);

  const defaultValues = useMemo(() => ({
    code: "",
    name: "",
    address: "",
    wardCode: "",
  }));

  const schema = yup.object().shape({
    code: yup.string().required("Mã bến xe không được phép bỏ trống"),
    name: yup.string().required("Tên bến xe không được phép bỏ trống"),
    address: yup.string().required("Địa chỉ không được phép bỏ trống"),

    wardCode: yup
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
    setImages([]);
    setUrlImage([]);
  }, [showDrawer]);

  const methods = useForm({
    mode: "onSubmit",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { handleSubmit, reset, formState, setValue } = methods;
  const { errors } = formState;
  const toggleDrawer = (open) => (event) => {
    setShowDrawer(open);
  };

  const getUrlFromIMG = async (fromData) => {
    setLoadingUpload(true);
    let data = new FormData();
    data.append("images", fromData.file, fromData.file.name);
    const uploadApi = new UploadApi();
    const response = await uploadApi.uploadMutiFile(data);
    setLoadingUpload(false);

    return response?.data?.data?.images[0]?.Location;
  };

  const onChange = async (imageList, addUpdateIndex) => {
    if (addUpdateIndex) {
      imageList[addUpdateIndex] = await getUrlFromIMG(
        imageList[addUpdateIndex]
      );
    }
    setImages(imageList);
  };


  const onSubmit = async (value = defaultValues) => {
    // const imageParams = [];
    // images.map((item) => {
    //   imageParams.push({ url: item });
    // });

    // const params = {
    //   code: value.code,
    //   name: value.name,
    //   address: value.address,
    //   wardCode: value.wardCode.code,
    //   images: imageParams,
    // };
    // console.log(params);
    // try {
    //   const stationApi = new StationApi();
    //   const res = await stationApi.createStation(params);
    //   customToast.success("Thêm mới thành công");
    //   handleGetData();
    //   setShowDrawer(false);
    // } catch (error) {
    //   customToast.error(error.response.data.message);
    // }
    // handleGetData();
  };

  const goBack = () => {
    reset();
    setShowDrawer(false);
    setImages([]);
    setUrlImage([]);
  };
  useEffect(() => {
    handleGetData();
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
              <ArrowBackIosIcon className="icon-back" />
              <span style={{ fontSize: 30, fontWeight: "bolder" }}>
                Tạo mới
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
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                Tạo mới xe
              </span>
            </div>
            
            <div style={{ marginLeft: 40, marginTop: 10 }}>
              <span>Hình ảnh xe</span>
            </div>
            <div className="view-image">
            <div className="image-product">
              <UploadSingle onChange={onChange} images={!isEmpty(urlImage) ? images : ''} />
            </div>
            {errors.image && (
              <span style={{ fontSize: '0.875rem', color: 'red' }}>{errors?.image?.message}</span>
            )}
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
                  {"Lưu thông tin"}
                </LoadingButton>
              </Grid>
            </Grid>
          </div>
        </form>
      </FormProvider>
    </Drawer>
  );
};

export default AddVehicle;
