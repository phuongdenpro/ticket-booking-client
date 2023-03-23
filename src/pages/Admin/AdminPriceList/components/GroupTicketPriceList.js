import { Button } from "@mui/material";
import moment from "moment";

import DataTable from "../../../../components/DataTable";
import TableCustom from "../../../../components/TableCustom";

const GroupTicketPriceList = (props) => {
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
      field: "code",
      headerName: "Mã",
      flex: 50,
      headerAlign: "center",
      headerClassName: "theme",
      sortable: false,
      renderCell: (params) => {
        return (
          <span
            style={{
              color: "#1A89AC",
              fontSize: "0.8rem",
              display: "inline-block",
              textTransform: "none",
            }}
          >
            {params.row?.code}
          </span>
        );
      },
    },
    {
      field: "ticketGroup",
      headerName: "Tên nhóm vé",
      flex: 100,
      headerAlign: "center",
      headerClassName: "theme",
      sortable: false,
      renderCell: (params) => {
        return <span>{params.row?.ticketGroup.name}</span>;
      },
    },
    {
      field: "price",
      flex: 100,
      headerName: "Đơn giá",
      headerAlign: "center",
      headerClassName: "theme",
    },
    {
      field: "note",
      headerName: "Ghi chú",
      flex: 200,
      headerAlign: "center",
      headerClassName: "theme",
      sortable: false,
    },

    {
      field: "createdAt",
      headerName: "Ngày áp dụng",
      flex: 100,
      headerAlign: "center",
      headerClassName: "theme",
      sortable: false,
      renderCell: (params) => {
        return (
          <span>{moment(params.row?.createdAt).format("DD/MM/YYYY")}</span>
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
              Xóa
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
      pagination={false}
    />
  );
};

export default GroupTicketPriceList;
