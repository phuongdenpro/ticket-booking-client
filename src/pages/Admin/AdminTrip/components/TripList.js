import { Button, IconButton, Tooltip, Typography } from "@mui/material";

import DataTable from "../../../../components/DataTable";
import TableCustom from "../../../../components/TableCustom";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import { useState } from "react";
import ModalAlert from "../../../../components/Modal";
import { TripApi } from "../../../../utils/tripApi";
import customToast from "../../../../components/ToastCustom";
import Badge from "../../../../components/Badge";
moment.locale("vi");

const TripList = (props) => {
  const {
    data,
    selectionModel,
    handleSelectionModeChange,
    handleShowDetail,
    handelDetail,
    handleGetData,
    handleClick,
    onChangeRowsPerPage,
    handleChangePage,
    total,
    page,
    pageSize,
  } = props;

  const [openModal, setOpenModal] = useState(false);
  const [idTrip, setIdTrip] = useState(null);
  const [codeTrip, setCodeTrip] = useState("");

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOpenModal = (id, code) => {
    setIdTrip(id);
    setCodeTrip(code);
    setOpenModal(true);
  };

  const handleConfirm = async () => {
    try {
      const tripApi = new TripApi();
      const response = await tripApi.deleteTrip(idTrip);
      console.log(response);
      customToast.success("Xóa thành công");
      handleGetData();
      setOpenModal(false);
      setIdTrip(null);
      setCodeTrip("");
    } catch (error) {
      customToast.error(error.response.data.message);
    }
  };

  const columns = [
    {
      field: "code",
      headerName: "Mã",
      flex: 50,
      headerAlign: "center",
      contentAlign: "center",
      headerClassName: "theme",
      sortable: false,
    },
    {
      field: "name",
      headerName: "Tên chuyến",
      flex: 200,
      headerAlign: "center",
      headerClassName: "theme",
      sortable: false,
    },

    {
      field: "fromStation",
      flex: 150,
      headerName: "Nơi đi",
      headerAlign: "center",
      headerClassName: "theme",
      renderCell: (params) => {
        return (
          <span>
            {params?.row?.fromStation?.name}({params?.row?.fromStation?.code})
          </span>
        );
      },
    },
    {
      field: "toStation",
      headerName: "Nơi đến",
      flex: 200,
      headerAlign: "center",
      headerClassName: "theme",
      sortable: false,
      renderCell: (params) => {
        return (
          <span
           
          >
            {params?.row?.toStation?.name}({params?.row?.toStation?.code})
          </span>
        );
      },
    },
    {
      field: "startDate",
      headerName: "Thời gian đi",
      flex: 100,
      headerAlign: "center",
      contentAlign: "center",
      headerClassName: "theme",
      sortable: false,
      renderCell: (params) => {
        return (
          <span>{moment(params.row?.startDate).format("DD-MM-YYYY")}</span>
        );
      },
    },
    {
      field: "endDate",
      headerName: "Thời gian đến",
      flex: 110,
      headerAlign: "center",
      contentAlign: "center",
      headerClassName: "theme",
      sortable: false,
      renderCell: (params) => {
        return (
          <div>
            <span>
              {params.row?.endDate !== undefined && params.row?.endDate !== null
                ? moment(params.row.endDate).format("DD-MM-YYYY")
                : "chưa xác định"}
            </span>
          </div>
        );
      },
    },
    {
      field: "status",
      headerName: "Trạng thái",
      flex: 125,
      headerAlign: "center",
      contentAlign: "center",
      headerClassName: "theme",
      sortable: false,
      renderCell: (params) => {
        return (
          <div>
            <Badge
              type={params?.row?.status == "Kích hoạt" ? "success" : "danger"}
              content={
                params?.row?.status == "Kích hoạt" ? "Hoạt động" : "Tạm ngưng"
              }
            />
          </div>
        );
      },
    },
    {
      field: "TripDetails",
      headerName: "Chuyến chi tiết",
      flex: 140,
      headerAlign: "center",
      headerClassName: "theme",
      contentAlign: "center",
      sortable: false,
      renderCell: (id) => {
        return (
          <div>
            {" "}
            <Button>Xem chi tiết</Button>
          </div>
        );
      },
    },

    {
      field: "action",
      headerName: "Thao tác",
      flex: 70,
      headerAlign: "center",
      contentAlign: "center",
      headerClassName: "theme",
      sortable: false,
      renderCell: (params) => {
        return (
          <div>
            {" "}
            <Tooltip title="Cập nhật">
              <IconButton>
                <BorderColorIcon
                  onClick={() => handleShowDetail(params.id)}
                  style={{
                    backgroundColor: "white",
                    borderRadius: 5,
                    width: 17,
                    height: 17,
                  }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa">
              <IconButton>
                <DeleteIcon
                  onClick={() =>
                    handleOpenModal(params?.row?.id, params?.row?.code)
                  }
                  style={{
                    backgroundColor: "white",
                    borderRadius: 5,
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
            <span>Mã chuyến: {codeTrip} </span>
          </div>
        }
      />
    </div>
  );
};

export default TripList;
