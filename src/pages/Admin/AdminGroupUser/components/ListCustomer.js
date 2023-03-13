import { Button, IconButton, Tooltip } from "@mui/material";

import DataTable from "../../../../components/DataTable";
import TableCustom from "../../../../components/TableCustom";
import ClearIcon from "@mui/icons-material/Clear";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import VisibilityIcon from "@mui/icons-material/Visibility";

const CustomerList = (props) => {
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
      field: "fullName",
      headerName: "Tên",
      flex: 70,
      headerAlign: "center",
      headerClassName: "theme",
      sortable: false,
    },

    {
      field: "email",
      flex: 50,
      headerName: "Email",
      headerAlign: "center",
      headerClassName: "theme",
    },
    {
      field: "phone",
      headerName: "Điện thoại",
      flex: 50,
      headerAlign: "center",
      headerClassName: "theme",
      sortable: false,
    },
    {
      field: "gender",
      headerName: "Giới tính",
      flex: 70,
      headerAlign: "center",
      headerClassName: "theme",
      sortable: false,
    },
    {
      field: "birthday",
      headerName: "Ngày sinh",
      flex: 70,
      headerAlign: "center",
      headerClassName: "theme",
      sortable: false,
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
        pagination={false}
        total={total}
        page={page}
        pageSize={pageSize}
      />
    
  );
};

export default CustomerList;
