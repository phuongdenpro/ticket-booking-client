import { Button, IconButton, Tooltip } from "@mui/material";
import TableCustom from "../../../../components/TableCustom";
import moment from "moment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
moment.locale("vi");

const StationList = (props) => {
  const {
    data,
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

  const columns = [
    {
      field: "stt",
      headerName: "STT",
      headerAlign: "center",
      headerClassName: "theme",
      flex: 50,
    },
    {
      field: "code",
      headerName: "Mã bến xe",
      headerAlign: "center",
      headerClassName: "theme",
      flex: 100,
    },
    {
      field: "name",
      headerName: "Tên bến xe",
      headerAlign: "center",
      headerClassName: "theme",
      flex: 250,
      editable: true,
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      headerAlign: "center",
      headerClassName: "theme",
      flex: 410,
      editable: true,
    },
    {
      field: "createdAt",
      headerName: "Ngày tạo",
      headerAlign: "center",
      headerClassName: "theme",
      type: "date",
      flex: 110,
      editable: true,
      renderCell: (params) => {
        return (
          <span>{moment(params.row?.createdAt).format("DD-MM-YYYY")}</span>
        );
      },
    },

    {
      field: "action",
      headerName: "Thao tác",
      flex: 100,
      headerAlign: "center",
      headerClassName: "theme",
      sortable: false,
      renderCell: (params) => {
        return (
          <div>
            {" "}
            
            <Tooltip title="Xem chi tiết">
              <IconButton>
                <VisibilityIcon style={{ backgroundColor: "white", borderRadius: 5 }}/>
              </IconButton>
            </Tooltip>
            <Tooltip title="Cập nhật">
              <IconButton>
                <EditIcon
                  onClick={() => handleShowDetail(params.id)}
                  style={{ backgroundColor: "white", borderRadius: 5 }}
                />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];
  return (
    <TableCustom
      rows={data}
      columns={columns}
      {...props}
      checkboxSelection
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
  );
};

export default StationList;
