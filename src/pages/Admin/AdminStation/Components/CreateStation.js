import React from "react";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { yupResolver } from "@hookform/resolvers/yup";
import { Drawer, FormControl, Grid } from "@mui/material";
import FormControlCustom from "../../../../components/FormControl";
import InputField from "../../../../components/InputField";
const CreateStation = (props) => {
  const { setShowDrawer, showDrawer, type } = props;
  const [images, setImages] = useState();
  const [urlImage, setUrlImage] = useState();

  const schema = yup.object().shape({
    name: yup.string().required('Tên sản phẩm không được phép bỏ trống'),
  });

  const methods = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const { handleSubmit, reset, formState, setValue } = methods;
  const { errors } = formState;
  const toggleDrawer = (open) => (event) => {
    setShowDrawer(open);
  };

  const getUrlFromIMG = async (fromData) => {};

  const onChange = (imageList) => {
    // data for submit
    setImages(imageList);
    funcUpload(imageList);
  };

  const funcUpload = async (image) => {};

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
  const onSubmit = (values) => {
    console.log(values);
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
            </div>
            <div>
              <span>{getTitle(type)}</span>
            </div>
          </div>
          <div className="content-drawer">
            <div className="title-group">
              <span>{getTitle(type)} SKU</span>
            </div>
            <div className="content">
              <Grid container spacing={2}>
                <Grid item xs={5}>
                  <FormControlCustom label={"Tên bến xe"} fullWidth>
                    <InputField
                      name={"name"}
                      placeholder={"Nhập tên bến xe"}
                      error={Boolean(errors.sku)}
                      helperText={errors?.sku?.message}
                    />
                  </FormControlCustom>
                </Grid>
                <Grid item xs={7}>
                  <FormControlCustom label={"Tên sản phẩm"} fullWidth>
                    <InputField
                      name={"name1"}
                      placeholder={"Nhập tên sản phẩm"}
                      error={Boolean(errors.name)}
                      helperText={errors?.name?.message}
                    />
                  </FormControlCustom>
                </Grid>
                <Grid item xs={5}>
                  <FormControlCustom label={"Thương hiệu"} fullWidth>
                    <InputField
                      name={"brand"}
                      placeholder={"Nhập thương hiệu"}
                      error={Boolean(errors.brand)}
                      helperText={errors?.brand?.message}
                    />
                  </FormControlCustom>
                </Grid>
                <Grid item xs={7}>
                  <FormControlCustom label={"Loại sản phẩm"} fullWidth>
                    <InputField
                      name={"type"}
                      error={Boolean(errors.type)}
                      helperText={errors?.type?.message}
                      placeholder={"Nhập loại sản phẩm"}
                    />
                  </FormControlCustom>
                </Grid>
              </Grid>
            </div>
          </div>
        </form>
      </FormProvider>
    </Drawer>
  );
};

export default CreateStation;