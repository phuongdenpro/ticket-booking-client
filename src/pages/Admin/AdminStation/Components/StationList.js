import { Button } from '@mui/material';
import TableCustom from '../../../../components/TableCustom';

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
      width: 50,
    },
    {
      field: "name",
      headerName: "Tên bến xe",
      headerAlign: "center",
      headerClassName: "theme",
      width: 150,
      editable: true,
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      headerAlign: "center",
      headerClassName: "theme",
      width: 200,
      editable: true,
    },
    {
      field: "createAt",
      headerName: "Ngày tạo",
      headerAlign: "center",
      headerClassName: "theme",
      type: "date",
      width: 180,
      editable: true,
    },
    {
      field: "addressFull",
      headerName: "Địa chỉ cụ thể",
      description: "This column has a value getter and is not sortable.",
      headerAlign: "center",
      headerClassName: "theme",
      sortable: false,
      width: 200,
    },
    {
      field: "images",
      headerName: "Hình ảnh",
      headerAlign: "center",
      headerClassName: "theme",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 200,
      renderCell: (params) => {
        return (
          <img
            src={params.row.images?.[0]}
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
      flex: 70,
      headerAlign: "center",
      headerClassName: "theme",
      sortable: false,
      renderCell: (params) => {
        return (
          <Button style={{ backgroundColor: "transparent" }}>
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