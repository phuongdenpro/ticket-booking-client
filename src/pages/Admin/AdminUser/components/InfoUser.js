import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button, Drawer, Typography } from "@mui/material";
import moment from "moment";

import { useState } from "react";
import "../../../../assets/scss/default.scss";
import Badge from "../../../../components/Badge";

const InfoUser = (props) => {
  const { setShowDrawerDetail, showDrawerDetail, dataCustomer, handleGetData } =
    props;
  const [showDrawerEdit, setShowDrawerEdit] = useState(false);
  return (
    <Drawer
      PaperProps={{
        sx: { width: "45%", minWidth: "39rem" },
      }}
      anchor={"right"}
      open={showDrawerDetail}
      className="drawer"
      onClose={() => setShowDrawerDetail(false)}
    >
      <div className="title-drawer">
        <div className="btn-close" onClick={() => setShowDrawerDetail(false)}>
          <ArrowBackIosIcon className="icon-back" />
        </div>
        <div>
          <span>Chi tiết</span>
        </div>
      </div>
      <div className="content-drawer">
        <div className="title-group">
          <span>Thông tin khách hàng</span>
          <div>
            <Button
              variant="outlined"
              size="small"
              color="secondary"
              onClick={() => setShowDrawerEdit(true)}
              style={{marginRight:10}}
            >
              sửa thông tin
            </Button>
            <Button
              variant="outlined"
              size="small"
              color="error"
              onClick={() => setShowDrawerEdit(true)}
            >
              xóa
            </Button>
          </div>
        </div>
      </div>
      <div
        className="row"
        style={{ marginLeft: 20, marginTop: 20, width: "97%" }}
      >
        <div className="col-3">
          <span style={{ color: "#000", fontSize: 16 }}>Tên khách hàng:</span>{" "}
        </div>
        <div className="col-8">
          <span variant="h6" style={{ fontSize: 16 }}>
            {dataCustomer?.fullName}
          </span>
        </div>

        <div className="col-12"></div>
        <div className="col-3" style={{ marginTop: 10 }}>
          <span style={{ color: "#000", fontSize: 16, marginTop: 20 }}>
            Giới tính:
          </span>{" "}
        </div>
        <div className="col-8" style={{ marginTop: 10 }}>
          <Typography style={{ fontSize: 16 }}>
            {dataCustomer?.gender === 'M'? "Nam": dataCustomer?.gender === 'F'? 'Nữ': 'Khác'}
          </Typography>
        </div>
        <div className="col-12"></div>
        <div className="col-3" style={{ marginTop: 10 }}>
          <span style={{ color: "#000", fontSize: 16 }}>Số điện thoại:</span>{" "}
        </div>
        <div className="col-8" style={{ marginTop: 10 }}>
          <span style={{ fontSize: 16 }}>{dataCustomer?.phone}</span>
        </div>
        <div className="col-12"></div>
        <div className="col-3" style={{ marginTop: 10 }}>
          <span style={{ color: "#000", fontSize: 16 }}>Email:</span>{" "}
        </div>
        <div className="col-8" style={{ marginTop: 10 }}>
          <Typography style={{ fontSize: 16 }}>
            {dataCustomer?.email}
          </Typography>
        </div>
        <div className="col-12"></div>
        <div className="col-3" style={{ marginTop: 10 }}>
          <span style={{ color: "#000", fontSize: 16 }}>Nhóm khách hàng:</span>{" "}
        </div>
        <div className="col-8" style={{ marginTop: 10 }}>
          <Typography style={{ fontSize: 16 }}>
            {dataCustomer?.customerGroup.name}
          </Typography>
        </div>
        <div className="col-12"></div>
        <div className="col-3" style={{ marginTop: 10 }}>
          <span style={{ color: "#000", fontSize: 16 }}>Địa chỉ:</span>{" "}
        </div>
        <div className="col-8" style={{ marginTop: 10 }}>
          <Typography style={{ fontSize: 16 }}>
            {dataCustomer?.fullAddress}
          </Typography>
        </div>
        <div className="col-12"></div>
        <div className="col-3" style={{ marginTop: 10 }}>
          <span style={{ color: "#000", fontSize: 16 }}>Ghi chú:</span>{" "}
        </div>
        <div className="col-8" style={{ marginTop: 10 }}>
          <Typography style={{ fontSize: 16 }}>
            {dataCustomer?.note}
          </Typography>
        </div>
        <div className="col-12"></div>
        <div className="col-3" style={{ marginTop: 10 }}>
          <span style={{ color: "#000", fontSize: 16 }}>Trạng thái:</span>{" "}
        </div>
        <div className="col-8" style={{ marginTop: 10 }}>

        <Badge
          type={
            dataCustomer?.status == "Chưa kích hoạt"
              ? "warning"
              : dataCustomer?.status == "Tạm khóa"
              ? "error"
              : "success"
          }
          content={dataCustomer?.status}
        />

        </div>
        <div className="col-12"></div>
        <div className="col-3" style={{ marginTop: 10 }}>
          <span style={{ color: "#000", fontSize: 16 }}>Ngày tạo:</span>{" "}
        </div>
        <div className="col-8" style={{ marginTop: 10 }}>
          <Typography style={{ fontSize: 16 }}>
            {moment(dataCustomer?.createdAt).format('YYYY-MM-DD')}
          </Typography>
        </div>
        
      </div>
    </Drawer>
  );
};

export default InfoUser;
