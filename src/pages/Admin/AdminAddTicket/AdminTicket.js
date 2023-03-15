import { Divider, Grid } from "@mui/material";
import { Button } from "antd";
import React, { useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { FormProvider, useForm } from "react-hook-form";
import AutocompleteCustom from "../../../components/AutocompleteCustom";
import FormControlCustom from "../../../components/FormControl";
import InputField from "../../../components/InputField";
import * as yup from 'yup';
import { isEmpty } from 'lodash';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from "moment";
import SelectCustom from "../../../components/SelectCustom";
import './AdminTicket.scss'
import PriceList from "../AdminPriceList/components/PriceList";

const AdminAddTicket = (props) => {
  const [dataCustomer, setData] = useState();
  const dateNow = moment(new Date()).format('DD-MM-YYYY hh:mm');
  const defaultValues = useMemo(
    () => ({
      province: dataCustomer?.citiesId || '',
      email: dataCustomer?.email || '',
      address: dataCustomer?.address || '',
      phone: dataCustomer?.phone || '',
      district: dataCustomer?.districtId || '',
      customer: dataCustomer || '',
      note: '',
      price: '',
      createdDate: dateNow,
      placePickOrder: '',
      branch: '',
      userReview: '',
      paymentTime: dateNow,
      paymentPrice: '',
    }),
    [dataCustomer],
  );
  const schema = yup.object().shape({
    customer: yup.object().typeError('Vui lòng chọn khách hàng').required('Vui lòng chọn khách hàng'),
    phone: yup.string().required('Vui lòng nhập số điện thoại'),
    address: yup.string().required('Vui lòng nhập địa chỉ'),
    branch: yup.object().typeError('Vui lòng chọn chi nhánh').required('Vui lòng chọn chi nhánh'),
  });
  const methods = useForm({
    mode: 'onSubmit',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { formState, watch, setValue, handleSubmit, reset, getValues } = methods;
  return (
    <div className={"page-layout-blank"} style={{ width:'100%'}}>
      <Grid container spacing={1}>
        <Grid md={8}>
          <div className={"page-layout"}>
            <Grid className={"align-items-center header_title"}>
              <Grid md={7}>
                <h2 className={"txt-title"}>THÔNG TIN KHÁCH HÀNG</h2>
              </Grid>
            </Grid>
            <Divider />
            <FormProvider {...methods}>
              <form>
                <div className="content mt-2">
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <FormControlCustom
                        label={'Khách hàng*'}
                        classNameLabel={
                          'flex justify-content-center align-items-center mr-1 w-100 justify-content-start order-custom-title'
                        }
                        className={'flex-direction-row'}
                        fullWidth
                      >
                        <AutocompleteCustom
                          style={{ width: '100%' }}
                          name={'customer'}
                          placeholder={'Chọn khách hàng'}
                        
                          optionLabelKey={'name'}
                        />
                      </FormControlCustom>
                    </Grid>

                    <Grid item xs={6}>
                      <FormControlCustom
                        label={'Địa chỉ'}
                        classNameLabel={
                          'flex justify-content-center align-items-center mr-1 w-100 justify-content-start order-custom-title'
                        }
                        className={'flex-direction-row'}
                        fullWidth
                      >
                        <InputField
                         
                          style={{ width: '100%' }}
                          name={'address'}
                          placeholder={''}
                         
                        />
                      </FormControlCustom>
                    </Grid>

                    <Grid item xs={6}>
                      <FormControlCustom
                        classNameLabel={
                          'flex justify-content-center align-items-center mr-1 w-100 justify-content-start order-custom-title'
                        }
                        className={'flex-direction-row'}
                        label={'Điện thoại'}
                        fullWidth
                      >
                        <InputField
                          
                          style={{ width: '100%' }}
                          name={'phone'}
                          helperText={''}
                          placeholder={''}
                          
                        />
                      </FormControlCustom>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlCustom
                        classNameLabel={
                          'flex justify-content-center align-items-center mr-1 w-100 justify-content-start order-custom-title'
                        }
                        className={'flex-direction-row'}
                        label={'Tỉnh thành'}
                        fullWidth
                      >
                        <SelectCustom
                          
                          style={{ width: '100%' }}
                          name={'province'}
                          placeholder={''}
                          
                          optionLabelKey={'name'}
                          
                        />
                      </FormControlCustom>
                    </Grid>

                    <Grid item xs={6}>
                      <FormControlCustom
                        classNameLabel={
                          'flex justify-content-center align-items-center mr-1 w-100 justify-content-start order-custom-title'
                        }
                        className={'flex-direction-row'}
                        label={'Email'}
                        fullWidth
                      >
                        <InputField
                         
                          style={{ width: '100%' }}
                          name={'email'}
                          helperText={''}
                          placeholder={''}
                          
                        />
                      </FormControlCustom>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControlCustom
                        classNameLabel={
                          'flex justify-content-center align-items-center mr-1 w-100 justify-content-start order-custom-title'
                        }
                        className={'flex-direction-row'}
                        label={'Quận huyện'}
                        fullWidth
                      >
                        <SelectCustom
                         
                          style={{ width: '100%' }}
                          name={'district'}
                          placeholder={''}
                          
                          optionLabelKey={'name'}
                          
                        />
                      </FormControlCustom>
                    </Grid>

                    <Grid item xs={6}>
                      <FormControlCustom
                        classNameLabel={
                          'flex justify-content-center align-items-center mr-1 w-100 justify-content-start order-custom-title'
                        }
                        className={'flex-direction-row'}
                        label={'Nơi chốt đơn'}
                        fullWidth
                      >
                        <SelectCustom
                          style={{ width: '100%' }}
                          name={'placeCreateOrder'}
                          placeholder={'Chọn nơi chốt đơn'}
                         
                        />
                      </FormControlCustom>
                    </Grid>

                    <Grid item xs={6}>
                      <FormControlCustom
                        classNameLabel={
                          'flex justify-content-center align-items-center mr-1 w-100 justify-content-start order-custom-title'
                        }
                        className={'flex-direction-row'}
                        label={'Chi nhánh'}
                        fullWidth
                      >
                        <SelectCustom
                          style={{ width: '100%' }}
                          name={'branch'}
                          placeholder={'Chọn chi nhánh'}
                         
                          // helperText={errors?.branch?.message as string}
                        />
                      </FormControlCustom>
                    </Grid>
                  </Grid>
                </div>
              </form>
            </FormProvider>
          </div>

          <div className={'page-layout'}>
            <Grid className={'align-items-center header_title'}>
              <Grid md={7}>
                <h2 className={'txt-title'}>Danh sách vé đặt</h2>
              </Grid>
              <div className="item-btn-right">
                <Button className={'btn-create'}>
                  <span className={'txt'}>Thêm vé</span>
                </Button>
              </div>
            </Grid>
            <PriceList  />
          </div>
        </Grid>
        <Grid md={4}>
          <span>Thông tin chi tiết</span>
        </Grid>
      </Grid>

      <div></div>
    </div>
  );
};

export default AdminAddTicket;
