import { Button } from '@mui/material';

import DataTable from '../../../../components/DataTable';
import TableCustom from '../../../../components/TableCustom';

const VehicleList = (props) => {
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
      field: 'stt',
      headerName: 'STT',
      flex: 40,
      headerAlign: 'center',
      headerClassName: 'theme',
      sortable: false,
    },
    {
      field: 'name',
      headerName: 'Tên xe',
      flex: 100,
      headerAlign: 'center',
      headerClassName: 'theme',
      sortable: false,
    },
   
    {
      field: 'images',
      headerName: 'Ảnh',
      flex: 70,
      headerAlign: 'center',
      headerClassName: 'theme',
      sortable: false,
      renderCell: (params) => {
        return (
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <img
              src={params.row.images?.[0]}
              alt=""
              style={{ aspectRatio: 1, width: '60px', backgroundSize: 'cover' }}
            />
          </div>
        );
      },
    },
    {
      field: 'description',
      flex: 200,
      headerName: 'Mô tả',
      headerAlign: 'center',
      headerClassName: 'theme',
    },
    {
      field: 'type',
      headerName: 'Loại xe',

      flex: 100,
      headerAlign: 'center',
      headerClassName: 'theme',
      sortable: false,
    },
    
    {
      field: 'licensePlate',
      headerName: 'Biển số xe',
      flex: 120,
      headerAlign: 'center',
      headerClassName: 'theme',
      sortable: false,
    },

    {
      field: 'floorNumber',
      headerName: 'Số tầng',
      flex: 100,
      headerAlign: 'center',
      headerClassName: 'theme',
      sortable: false,
    },
    {
      field: 'action',
      headerName: 'Thao tác',
      flex: 70,
      headerAlign: 'center',
      headerClassName: 'theme',
      sortable: false,
      renderCell: (params) => {
        return (
          <Button onClick={() => handleShowDetail(params.id)} style={{ backgroundColor: 'transparent' }}>
            <span
              style={{
                textDecorationLine: 'underline',
                color: '#1A89AC',
                fontSize: '0.8rem',
                display: 'inline-block',
                textTransform: 'none',
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

export default VehicleList;
