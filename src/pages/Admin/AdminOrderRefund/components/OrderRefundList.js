import { Button } from "@mui/material";

import moment from "moment";
import { useState } from "react";
import '../../../../assets/scss/default.scss';
import TableCustom from "../../../../components/TableCustom";

const OrderRefundList = (props) => {
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
  const [openModal, setOpenModal] = useState(false);
  const [idGroup, setIdGroup] = useState(null);
  const [nameGroup, setNameGroup] = useState("");
  const [codeGroup, setCodeGroup] = useState("");

  //   const handleCloseModal = () => {
  //     setOpenModal(false);
  //   };
  //   const handleOpenModal = (id, name, code) => {
  //     setIdGroup(id);
  //     setNameGroup(name);
  //     setCodeGroup(code);
  //     setOpenModal(true);
  //   };

  //   const handleConfirm = async () => {
  //     try {
  //       const groupCusApi = new GroupCusApi();
  //       const response = await groupCusApi.deleteById(idGroup);
  //       customToast.success("Xóa thành công");

  //       handleGetData();
  //       setOpenModal(false);
  //       setIdGroup(null);
  //     } catch (error) {
  //       customToast.error(error.response.data.message);
  //     }
  //   };
  const columns = [
    {
        field: 'createdAt',
        headerName: 'Ngày tạo đơn',
        flex: 100,
        headerAlign: 'center',
        headerClassName: 'theme',
        sortable: false,
        renderCell: (params) => {
          return <span>{moment(params.row.createdAt)?.format('DD/MM/YYYY')}</span>;
        },
      },
      {
        field: 'orderNumber',
        headerName: 'Mã Đơn Trả',
        flex: 100,
        headerAlign: 'center',
        headerClassName: 'theme',
        sortable: false,
        renderCell: (params) => {
          return (
            <Button
              onClick={() => handleShowDetail(params.id)}
              style={{ backgroundColor: 'transparent' }}
              disabled={false}
              color="primary"
            >
              <span
                style={{
                  textDecorationLine: 'underline',
                  color: '#1A89AC',
                  fontSize: '0.8rem',
                  display: 'inline-block',
                  textTransform: 'none',
                }}
              >
                {params?.row?.code}
              </span>
            </Button>
          );
        },
      },
      {
        field: 'customer',
        headerName: 'Khách hàng',
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
                  {params?.row?.customer?.name}
                </span>
              </div>
            </div>
          );
        },
      },
      {
        field: 'status',
        headerName: 'Trạng thái',
        flex: 120,
        headerAlign: 'center',
        headerClassName: 'theme',
        renderCell: (params) => {
          return (
            <div >
              <div
                style={{
                  borderRadius: '15px',
                  padding: '2px 5px',
                }}
                className={'padding-status'}
              >
                <span
                  style={{
                    color: 'white',
                    fontSize: '0.8rem',
                  }}
                >
                  {params?.row?.status}
                </span>
              </div>
            </div>
          );
        },
      },
  
      {
        field: 'total',
        headerName: 'Tổng tiền',
        flex: 80,
        headerAlign: 'center',
        headerClassName: 'theme',
        renderCell: (params) => {
          return <div></div>;
        },
      },
      {
        field: 'promotion',
        headerName: 'Khuyến mãi',
        flex: 80,
        headerAlign: 'center',
        headerClassName: 'theme',
        renderCell: (params) => {
          return <div></div>;
        },
      },
      {
        field: 'totalAmount',
        headerName: 'Thành tiền',
        flex: 70,
        headerAlign: 'center',
        headerClassName: 'theme',
        renderCell: (params) => {
          return <div></div>;
        },
      },
      
      {
        field: 'note',
        headerName: 'Ghi chú',
        flex: 100,
        headerAlign: 'center',
        headerClassName: 'theme',
      },
      {
        field: 'userCreate',
        headerName: 'NV tạo đơn',
        flex: 80,
        editable: true,
        headerAlign: 'center',
        headerClassName: 'theme',
        renderCell: (params) => {
          return (
            <div style={{ padding: '5px' }}>
              <span
                style={{
                  fontSize: '0.8rem',
                }}
              >
                {params?.row?.userCreate?.name}
              </span>
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
    </div>
  );
};

export default OrderRefundList;
