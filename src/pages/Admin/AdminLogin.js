import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Grid, IconButton, InputAdornment } from "@mui/material";
import { Button, Col, Row, Checkbox, Form, Input, message } from "antd";
import {UserOutlined, LockOutlined } from "@ant-design/icons";
import logo from "../../assets/logo.png";
import imgLogin from "../../assets/imgLogin.png";

import "../../sass/AdminLogin.scss";

const Login = () => {
  return (
    <div>
      <Grid container>
        <Grid className="item-login" md={5.5} xs={24}>
          <div className="container">
          <img src={logo} alt="Logo" style={{height:100}} />
            <div className="form-field">
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                  remember: true,
                }}
              >
                <Form.Item
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập email hoặc số điện thoại!",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Nhập email hoặc số điện thoại"
                    autoFocus
                    style={{height:50}}
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mật khẩu!",
                    },
                  ]}
                >
                  <Input.Password
                    size="large"
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Nhập mật khẩu"
                    style={{height:50}}
                  />
                </Form.Item>

                <Form.Item>
                  <div className="view-link">
                    <Link to="/quen-mat-khau" style={{color:'white'}}>Quên mật khẩu ?</Link>{" "}
                  </div>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="btn-primary-hover btn-login"
                    size="large"
                  >
                    Đăng nhập
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </Grid>
        <Grid md={6.5} className="item-content-right">
          <div className="container-right">
            <div className="text-welcome">Chào mừng bạn quay lại</div>
            <h5 className="text">Vui lòng đăng nhập để sử dụng hệ thống</h5>
            <div>
              <img src={imgLogin} alt="Image" className="image-right" />
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
