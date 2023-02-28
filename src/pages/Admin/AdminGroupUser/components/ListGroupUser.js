import { Button, IconButton, Tooltip } from "@mui/material";

import DataTable from "../../../../components/DataTable";
import TableCustom from "../../../../components/TableCustom";
import ClearIcon from '@mui/icons-material/Clear';
import BorderColorIcon from '@mui/icons-material/BorderColor';

const UserGroupList = (props) => {
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
      headerName: "Tên nhóm",
      flex: 100,
      headerAlign: "center",
      headerClassName: "theme",
      sortable: false,
    },

    {
      field: "description",
      flex: 130,
      headerName: "Mô tả",
      headerAlign: "center",
      headerClassName: "theme",
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
                 
                  style={{ backgroundColor: "white", borderRadius: 5,fill: "#fca11a", width:17,height:17}}
                />
              </IconButton>
            </Tooltip>

            <Tooltip title="Xóa">
            <IconButton>
              <ClearIcon
             
              style={{ backgroundColor: "white", borderRadius: 5,fill: "#fb0b12",width:17,height:17 }}/>
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

export default UserGroupList;
