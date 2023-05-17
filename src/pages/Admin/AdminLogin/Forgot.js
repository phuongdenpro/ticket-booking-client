import { CodeOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Typography, message } from "antd";
import React, { useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";

const { Title } = Typography;

const Forgot = () => {
  // const dispatch = useDispatch();
  // let history = useHistory();
  const phoneRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const navigate = useNavigate();
  const [loadings, setLoadings] = useState([]);
  const [flag, setFlag] = useState(false);
  const [flag2, setFlag2] = useState(false);
  const otpRef = useRef();

  const countryCode = "+84";
  const [phoneNumber, setPhoneNumber] = useState(countryCode);
  const [OTP, setOTP] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [expandForm, setExpandForm] = useState(true);
  const [form] = Form.useForm();
  const regex = /^0/i;

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
  };

  const stopLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = false;
      return newLoadings;
    });
  };
  const handleCancel = () => {
    setFlag(false);
  };

  const onFinish = async (values) => {
    //   // console.log(values.phoneNumber);
    requestOTP();

    // const accountApi = new AccountApi();
    // try {
    //   const response = await accountApi.register(values);
    //   // console.log(response);
    //   if (response.status == 200) {
    //     message.success("Đăng ký thành công!");
    //     navigate("/dang-nhap");
    //   } else {
    //     message.error("Có lỗi xảy ra");
    //   }
    // } catch (error) {
    //   // console.log("Failed:", error);
    //   message.error("Có lỗi xảy ra");
    // } finally {
    //   stopLoading(0);
    // }
  };

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
    message.error("Có lỗi xảy ra");
  };

  const requestOTP = async () => {};

  const verifyOTP = (e) => {};

  return (
    <Row
      justify="space-around"
      align="middle"
      style={{
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Col
        span={8}
        xs={18}
        sm={14}
        md={10}
        lg={8}
        style={{
          backgroundColor: "white",
          padding: "50px",
          borderRadius: "10px",
        }}
      >
        <Helmet>
          <title> PDBus - Quên mật khẩu</title>
        </Helmet>
        <Title level={2} style={{ marginBottom: "20px" }}>
          Quên mật khẩu
        </Title>
        <Form
          form={form}
          onSubmit={requestOTP}
          name="normal_register"
          className="register-form"
          onFinish={onFinish}
          style={{ display: !flag ? "block" : "none" }}
        >
          <Form.Item
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập email hoặc số điện thoại!",
              },
            ]}
          >
            <Input
              size="large"
              ref={phoneRef}
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email hoặc số điện thoại"
              autoFocus
              id="phoneNumberInput"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              size="large"
              loading={loadings[0]}
            >
              Gửi mã OTP
            </Button>
          </Form.Item>
          <br></br>
          <p>
            <Link to="/admin/login">Đăng nhập ngay</Link>{" "}
          </p>
        </Form>
        <div id="recaptcha-container"></div>
        <form
          onSubmit={verifyOTP}
          name="otp"
          className="otp-form"
          initialValues={{
            remember: true,
          }}
          style={{ display: flag ? "block" : "none" }}
        >
          <Form.Item
            name="otp"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mã OTP!",
              },
            ]}
          >
            <p>Nhập mã OTP được gửi đến {phoneNumber}</p>
            <Input
              size="large"
              ref={otpRef}
              prefix={<CodeOutlined className="site-form-item-icon" />}
              placeholder="Nhập mã OTP"
              autoFocus
              id="otpInput"
              value={OTP}
              onChange={(e) => setOTP(e.target.value)}
            />

            <Button
              type="secondary"
              className="register-form-button"
              size="large"
              loading={loadings[0]}
              onClick={handleCancel}
              style={{ marginRight: 10, marginTop: 10 }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="register-form-button"
              size="large"
              loading={loadings[0]}
            >
              Verify
            </Button>
          </Form.Item>
        </form>
      </Col>
    </Row>
  );
};

export default Forgot;
