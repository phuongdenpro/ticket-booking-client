import { Button } from "@mui/material";

import moment from "moment";
import { useState } from "react";
import '../../../../assets/scss/default.scss';
import TableCustom from "../../../../components/TableCustom";
import Badge from "../../../../components/Badge";

const DashboardTicketList = (props) => {
  const {
    data,
    handleGetData,
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
        field: 'code',
        headerName: 'Mã tuyến',
        flex: 100,
        headerAlign: 'center',
        headerClassName: 'theme',
        sortable: false,
        
      },
      {
        field: 'name',
        headerName: 'Tên tuyến',
        flex: 150,
        headerAlign: 'center',
        headerClassName: 'theme',
        sortable: false,
        
      },
      {
        field: 'fromStation',
        headerName: 'Nơi đi',
        flex: 100,
        headerAlign: 'center',
        headerClassName: 'theme',
        renderCell: (params) => {
          return (
            <div style={{ padding: '5px' }}>
              <div
                style={{
                  borderRadius: '15px',
                  padding: '2px 5px',
                }}
                className={'padding-status'}
              >
                <span
                  style={{
                    fontSize: '0.8rem',
                  }}
                >
                  {params?.row?.fromStation?.name}({params?.row?.fromStation?.code})
                </span>
              </div>
            </div>
          );
        },
      },
      {
        field: 'toStation',
        headerName: 'Nơi đến',
        flex: 120,
        headerAlign: 'center',
        headerClassName: 'theme',
        renderCell: (params) => {
            return (
              <div style={{ padding: '5px' }}>
                <div
                  style={{
                    borderRadius: '15px',
                    padding: '2px 5px',
                  }}
                  className={'padding-status'}
                >
                  <span
                    style={{
                      fontSize: '0.8rem',
                    }}
                  >
                    {params?.row?.toStation?.name}({params?.row?.toStation?.code})
                  </span>
                </div>
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
        field: 'totalTickets',
        headerName: 'Số vé đặt',
        flex: 80,
        headerAlign: 'center',
        contentAlign: 'center',
        headerClassName: 'theme',
        
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
    </div>
  );
};

export default DashboardTicketList;
