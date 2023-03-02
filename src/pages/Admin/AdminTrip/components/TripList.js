import { Button, Typography } from "@mui/material";

import DataTable from "../../../../components/DataTable";
import TableCustom from "../../../../components/TableCustom";
import moment from "moment";
moment.locale("vi");

const TripList = (props) => {
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
      flex: 40,
      headerAlign: "center",
      headerClassName: "theme",
      sortable: false,
    },
    {
      field: "name",
      headerName: "Tên chuyến",
      flex: 100,
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
          <Typography
            style={{
              fontSize: "1rem",
              display: "inline-block",
              textTransform: "none",
            }}
          >
            {params?.row?.fromStation?.name}
          </Typography>
        );
      },
    },
    {
      field: "toStation",
      headerName: "Nơi đến",
      flex: 150,
      headerAlign: "center",
      headerClassName: "theme",
      sortable: false,
      renderCell: (params) => {
        return (
          <Typography
            style={{
              fontSize: "1rem",
              display: "inline-block",
              textTransform: "none",
            }}
          >
            {params?.row?.toStation?.name}
          </Typography>
        );
      },
    },
    {
      field: "startDate",
      headerName: "Thời gian xuất phát",
      flex: 100,
      headerAlign: "center",
      headerClassName: "theme",
      sortable: false,
      renderCell: (params) => {
        return (
          <span>
            {moment(params.row?.startDate).format("DD-MM-YYYY hh:mm A")}
          </span>
        );
      },
    },
    {
      field: "endDate",
      headerName: "Thời gian đến",
      flex: 100,
      headerAlign: "center",
      headerClassName: "theme",
      sortable: false,
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
      field: "TripDetails",
      headerName: "Danh sách chuyến đi chi tiết",
      flex: 150,
      headerAlign: "center",
      headerClassName: "theme",
      sortable: false,
      renderCell: (id) => {
        return (
          <div>
            {" "}
            <Button>
              
               Xem chi tiết
            </Button>
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
          <Button
            onClick={() => handleShowDetail(params.id)}
            style={{ backgroundColor: "transparent" }}
          >
            <span
              style={{
                textDecorationLine: "underline",
                color: "#1A89AC",
                fontSize: "0.8rem",
                display: "inline-block",
                textTransform: "none",
              }}
            >
              Cập nhật
            </span>
          </Button>
        );
      },
    },
  ];

  return (
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
  );
};

export default TripList;
