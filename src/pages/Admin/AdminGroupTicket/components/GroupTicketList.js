import { Button, IconButton, Tooltip } from "@mui/material";

import DataTable from "../../../../components/DataTable";
import TableCustom from "../../../../components/TableCustom";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { GroupTicketApi } from "../../../../utils/groupTicketApi";
import customToast from "../../../../components/ToastCustom";
import { useState } from "react";
import ModalAlert from "../../../../components/Modal";

const GroupTicketList = (props) => {
  const {
    data,
    handelDetail,
    selectionModel,
    handleSelectionModeChange,
    handleShowDetail,
    handleGetData,
    handleClick,
    onChangeRowsPerPage,
    handleChangePage,
    total,
    page,
    pageSize,
  } = props;

  const [openModal, setOpenModal] = useState(false);
  const [idGroupTicket, setIdGroupTicket] = useState(null);
  const [codeGroupTicket, setCodeGroupTicket] = useState("");


  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOpenModal = (id, code) => {
    setIdGroupTicket(id);
    setCodeGroupTicket(code);
    setOpenModal(true);
  };

  const handleConfirm = async () => {
    try {
      const groupTicketApi = new GroupTicketApi();
      const response = await groupTicketApi.deleteById(idGroupTicket);
      console.log(response);
      customToast.success("Xóa thành công");

      handleGetData();
      setOpenModal(false);
      setIdGroupTicket(null);
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
      headerClassName: "theme",
      sortable: false,
    },
    {
      field: "name",
      headerName: "Tên nhóm vé",
      flex: 100,
      headerAlign: "center",
      headerClassName: "theme",
      sortable: false,
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
      field: "description",
      flex: 200,
      headerName: "Mô tả",
      headerAlign: "center",
      headerClassName: "theme",
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
           
            <Tooltip title="Cập nhật">
              <IconButton>
                <BorderColorIcon
                  onClick={() => handelDetail(params.id)}
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
            <span>Mã nhóm vé: {codeGroupTicket} </span>
          </div>
        }
      />
    </div>
  );
};

export default GroupTicketList;
