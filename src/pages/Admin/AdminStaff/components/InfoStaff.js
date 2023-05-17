import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button, Drawer, Typography } from "@mui/material";
import moment from "moment";

import { useState } from "react";
import "../../../../assets/scss/default.scss";
import Badge from "../../../../components/Badge";
import ModalAlert from "../../../../components/Modal";
import customToast from "../../../../components/ToastCustom";
import { CustomerApi } from "../../../../utils/customerApi";
import { StaffApi } from "../../../../utils/staffApi";

const InfoStaff = (props) => {
  const { setShowDrawerDetail, showDrawerDetail, dataStaff, handleGetData } =
    props;
  const [showDrawerEdit, setShowDrawerEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [idStaff, setIdStaff] = useState(null);
  const [nameStaff, setNameStaff] = useState("");

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOpenModal = (id, name) => {
    setIdStaff(id);
    setNameStaff(name);
    setOpenModal(true);
  };

  const handleConfirm = async () => {
    try {
      const staffApi = new StaffApi();
      const response = await staffApi.deleteByCode(idStaff);
      customToast.success("Xóa thành công");
      handleGetData();
      setOpenModal(false);
      setIdStaff(null);
      setShowDrawerDetail(false);
    } catch (error) {
      customToast.error(error.response.data.message);
    }
  };
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
          <span>Thông tin nhân viên</span>
          <div>
            <Button
              variant="outlined"
              size="small"
              color="secondary"
              onClick={() => setShowDrawerEdit(true)}
              style={{ marginRight: 10 }}
            >
              sửa thông tin
            </Button>
            <Button
              variant="outlined"
              size="small"
              color="error"
              onClick={() =>
                handleOpenModal(dataStaff?.code, dataStaff?.fullName)
              }
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
          <span style={{ color: "#000", fontSize: 16 }}>Mã nhân viên:</span>{" "}
        </div>
        <div className="col-8">
          <span variant="h6" style={{ fontSize: 16 }}>
            {dataStaff?.code}
          </span>
        </div>

        <div className="col-12"></div>
        <div className="col-3" style={{ marginTop: 10 }}>
          <span style={{ color: "#000", fontSize: 16 }}>
            Tên nhân viên:
          </span>{" "}
        </div>
        <div className="col-8" style={{ marginTop: 10 }}>
          <span variant="h6" style={{ fontSize: 16 }}>
            {dataStaff?.fullName}
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
            {dataStaff?.gender === "M"
              ? "Nam"
              : dataStaff?.gender === "F"
              ? "Nữ"
              : "Khác"}
          </Typography>
        </div>
        <div className="col-12"></div>
        <div className="col-3" style={{ marginTop: 10 }}>
          <span style={{ color: "#000", fontSize: 16 }}>Số điện thoại:</span>{" "}
        </div>
        <div className="col-8" style={{ marginTop: 10 }}>
          <span style={{ fontSize: 16 }}>{dataStaff?.phone}</span>
        </div>
        <div className="col-12"></div>
        <div className="col-3" style={{ marginTop: 10 }}>
          <span style={{ color: "#000", fontSize: 16 }}>Email:</span>{" "}
        </div>
        <div className="col-8" style={{ marginTop: 10 }}>
          <Typography style={{ fontSize: 16 }}>{dataStaff?.email}</Typography>
        </div>

        <div className="col-12"></div>
        <div className="col-3" style={{ marginTop: 10 }}>
          <span style={{ color: "#000", fontSize: 16 }}>Địa chỉ:</span>{" "}
        </div>
        <div className="col-8" style={{ marginTop: 10 }}>
          <Typography style={{ fontSize: 16 }}>
            {dataStaff?.fullAddress}
          </Typography>
        </div>
        <div className="col-12"></div>
        <div className="col-3" style={{ marginTop: 10 }}>
          <span style={{ color: "#000", fontSize: 16 }}>Ghi chú:</span>{" "}
        </div>
        <div className="col-8" style={{ marginTop: 10 }}>
          <Typography style={{ fontSize: 16 }}>{dataStaff?.note}</Typography>
        </div>
        <div className="col-12"></div>
        <div className="col-3" style={{ marginTop: 10 }}>
          <span style={{ color: "#000", fontSize: 16 }}>Trạng thái:</span>{" "}
        </div>

        <div className="col-12"></div>
        <div className="col-3" style={{ marginTop: 10 }}>
          <span style={{ color: "#000", fontSize: 16 }}>Ngày tạo:</span>{" "}
        </div>
        <div className="col-8" style={{ marginTop: 10 }}>
          <Typography style={{ fontSize: 16 }}>
            {moment(dataStaff?.createdAt).format("YYYY-MM-DD")}
          </Typography>
        </div>
      </div>
      <ModalAlert
        open={openModal}
        handleClose={() => handleCloseModal()}
        handleCancel={() => handleCloseModal()}
        handleConfirm={() => handleConfirm()}
        title={"Xác nhận xóa"}
        description={
          "Thao tác sẽ không thể hoàn tác, bạn có chắc chắn muốn tiếp tục không?"
        }
        type={"error"}
        icon={true}
        renderContentModal={
          <div className="view-input-discount">
            <span>Nhân viên: {nameStaff} </span>
          </div>
        }
      />
    </Drawer>
  );
};

export default InfoStaff;
