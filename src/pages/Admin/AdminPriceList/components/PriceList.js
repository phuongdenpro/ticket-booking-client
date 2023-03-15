import { Button, IconButton, Tooltip } from "@mui/material";

import DataTable from "../../../../components/DataTable";
import TableCustom from "../../../../components/TableCustom";
import ClearIcon from "@mui/icons-material/Clear";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import ModalAlert from "../../../../components/Modal";
import { GroupCusApi } from "../../../../utils/groupCusApi";
import customToast from "../../../../components/ToastCustom";
import Badge from "../../../../components/Badge";
import moment from "moment";

const PriceList = (props) => {
  const {
    data,
    handleGetData,
    selectionModel,
    handleSelectionModeChange,
    handleShowDetail,
    handleClick,
    onChangeRowsPerPage,
    handleChangePage,
    total,
    page,
    pageSize,
  } = props;
  const [openModal, setOpenModal] = useState(false);
  const [idGroup, setIdGroup] = useState(null);
  const [nameGroup, setNameGroup] = useState("");
  const [codeGroup, setCodeGroup] = useState("");

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOpenModal = (id, name, code) => {
    setIdGroup(id);
    setNameGroup(name);
    setCodeGroup(code);
    setOpenModal(true);
  };

  const handleConfirm = async () => {
    try {
      const groupCusApi = new GroupCusApi();
      const response = await groupCusApi.deleteById(idGroup);
      customToast.success("Xóa thành công");

      handleGetData();
      setOpenModal(false);
      setIdGroup(null);
    } catch (error) {
      customToast.error(error.response.data.message);
    }
  };
  const columns = [
    {
      field: "code",
      headerName: "Mã",
      flex: 40,
      headerAlign: "center",
      headerClassName: "theme",
      sortable: false,
    },
    {
      field: "name",
      headerName: "Tên bảng giá",
      flex: 100,
      headerAlign: "center",
      headerClassName: "theme",
      sortable: false,
    },

    {
      field: "startDate",
      flex: 130,
      headerName: "Ngày bắt đầu",
      headerAlign: "center",
      headerClassName: "theme",
      renderCell: (params) => {
        return (
          <div>
            <span>
              {params.row?.startDate !== undefined && params.row?.startDate !== null
                ? moment(params.row.startDate).format("DD-MM-YYYY hh:mm A")
                : "chưa xác định"}
            </span>
          </div>
        );
      },
    },
    {
      field: "endDate",
      flex: 130,
      headerName: "Ngày kết thúc",
      headerAlign: "center",
      headerClassName: "theme",
      renderCell: (params) => {
        return (
          <div>
            <span>
              {params.row?.endDate !== undefined && params.row?.endDate !== null
                ? moment(params.row.endDate).format("DD-MM-YYYY hh:mm A")
                : "chưa xác định"}
            </span>
          </div>
        );
      },
    },
    {
      field: "note",
      headerName: "Ghi chú",
      flex: 100,
      headerAlign: "center",
      headerClassName: "theme",
      sortable: false,
    },
    {
      field: "status",
      headerName: "Trạng thái",
      flex: 100,
      headerAlign: "center",
      headerClassName: "theme",
      sortable: false,
      renderCell: (params) => {
        return (
          <div>
            <Badge
              type={params?.row?.status == true ? "success" : "danger"}
              content={params?.row?.status == true ? "Hoạt động" : "Tạm ngưng"}
            />
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "",
      flex: 70,
      headerAlign: "center",
      headerClassName: "theme",
      sortable: false,
      renderCell: (params) => {
        return (
          <div>
            {" "}
            <Tooltip title="Xem chi tiết">
              <IconButton>
                <VisibilityIcon
                  style={{
                    backgroundColor: "white",
                    borderRadius: 5,
                    fill: "#1a89ac",
                    width: 17,
                    height: 17,
                  }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Cập nhật">
              <IconButton>
                <BorderColorIcon
                  style={{
                    backgroundColor: "white",
                    borderRadius: 5,
                    fill: "#fca11a",
                    width: 17,
                    height: 17,
                  }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa">
              <IconButton>
                <ClearIcon
                  onClick={() =>
                    handleOpenModal(
                      params?.row?.id,
                      params?.row?.name,
                      params?.row?.code
                    )
                  }
                  style={{
                    backgroundColor: "white",
                    borderRadius: 5,
                    fill: "#fb0b12",
                    width: 17,
                    height: 17,
                  }}
                />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <TableCustom
        rows={data}
        columns={columns}
        {...props}
        // checkboxSelection
        handleSelectAllClick={handleSelectionModeChange}
        handleClick={handleClick}
        selected={selectionModel}
        handleShowDetail={handleShowDetail}
        handleChangePage={handleChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
        total={total}
        page={page}
        pageSize={pageSize}
      />
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
            <span>Mã nhóm: {codeGroup} </span>
          </div>
        }
      />
    </div>
  );
};

export default PriceList;