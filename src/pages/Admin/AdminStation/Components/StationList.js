import { Button, IconButton, Tooltip } from "@mui/material";
import TableCustom from "../../../../components/TableCustom";
import moment from "moment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import BorderColorIcon from '@mui/icons-material/BorderColor';
moment.locale("vi");

const StationList = (props) => {
  const {
    data,
    selectionModel,
    handleSelectionModeChange,
    handleShowDetail,
    handelDetail,
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
      field: "fullAddress",
      headerName: "Địa chỉ chi tiết",
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
                <VisibilityIcon
                onClick={() => handelDetail(params.id)}
                style={{ backgroundColor: "white", borderRadius: 5,fill: "#1a89ac",width:17,height:17 }}/>
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Cập nhật">
              <IconButton>
                <BorderColorIcon
                  onClick={() => handleShowDetail(params.id)}
                  style={{ backgroundColor: "white", borderRadius: 5,fill: "#fca11a", width:17,height:17}}
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
