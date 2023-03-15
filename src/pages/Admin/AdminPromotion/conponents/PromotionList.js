import { Button, IconButton, Tooltip } from "@mui/material";

import DataTable from "../../../../components/DataTable";
import TableCustom from "../../../../components/TableCustom";
import ClearIcon from "@mui/icons-material/Clear";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import ModalAlert from "../../../../components/Modal";
import customToast from "../../../../components/ToastCustom";
import Badge from "../../../../components/Badge";
import moment from "moment";

const PromotionList = (props) => {
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

//   const handleCloseModal = () => {
//     setOpenModal(false);
//   };
//   const handleOpenModal = (id, name, code) => {
//     setIdGroup(id);
//     setNameGroup(name);
//     setCodeGroup(code);
//     setOpenModal(true);
//   };

//   const handleConfirm = async () => {
//     try {
//       const groupCusApi = new GroupCusApi();
//       const response = await groupCusApi.deleteById(idGroup);
//       customToast.success("Xóa thành công");

//       handleGetData();
//       setOpenModal(false);
//       setIdGroup(null);
//     } catch (error) {
//       customToast.error(error.response.data.message);
//     }
//   };
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
        field: 'image',
        headerName: ' Hình ảnh',
        flex: 70,
        headerAlign: 'center',
        headerClassName: 'theme',
        sortable: false,
        renderCell: (params) => {
          return (
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <img
                src={params.row.images?.[0]}
                alt=""
                style={{ aspectRatio: 1, width: '60px', backgroundSize: 'cover' }}
              />
            </div>
          );
        },
      },
    {
      field: "name",
      headerName: "Tiêu đề",
      flex: 100,
      headerAlign: "center",
      headerClassName: "theme",
      sortable: false,
    },
    {
        field: "description",
        headerName: "Mô tả",
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
      headerName: "Thao tác",
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
    </div>
  );
};

export default PromotionList;
