import { Button } from "@mui/material";
import TableCustom from "../../../../components/TableCustom";
import moment from "moment";
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
      field: "images",
      headerName: "Hình ảnh",
      headerAlign: "center",
      headerClassName: "theme",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      flex: 100,
      renderCell: (params) => {
        return (
          <img
            src={params.row.images?.[0]?.url}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
            }}
            alt=""
            style={{
              aspectRatio: 1,
              width: "60%",
              height: "40%",
              backgroundSize: "cover",
            }}
          />
        );
      },
    },

    {
      field: "action",
      headerName: "Thao tác",
      flex: 85,
      headerAlign: "center",
      headerClassName: "theme",
      sortable: false,
      renderCell: (params) => {
        return (
          <Button onClick={() => handleShowDetail(params.id)} style={{ backgroundColor: "transparent" }}>
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
