import { Box, Button, Drawer, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridToolbarFilterButton,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { Breadcrumb, Col, Row, Space } from "antd";

const AdminStation = (props) => {
  const [pageSize, setPageSize] = useState(5);
  const [loadings, setLoadings] = useState([]);
  const [open, setOpen] = useState(false);
  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "name",
      headerName: "Tên bến xe",
      width: 150,
      editable: true,
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      width: 150,
      editable: true,
    },
    {
      field: "createAt",
      headerName: "Ngày tạo",
      type: "date",
      width: 150,
      editable: true,
    },
    {
      field: "addressFull",
      headerName: "Địa chỉ cụ thể",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 150,
    },
    {
      field: "fromTrips",
      headerName: "Các điểm đi",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 150,
    },
    {
      field: "toTrips",
      headerName: "Các điểm đến",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 150,
    },
    {
      field: "images",
      headerName: "Hình ảnh",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 150,
    },
  ];
  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
  };

  const stopLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = false;
      return newLoadings;
    });
  };
  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Admin</Breadcrumb.Item>
        <Breadcrumb.Item>Station</Breadcrumb.Item>
      </Breadcrumb>
      <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: 14 }}
        onClick={showDrawer}
      >
        Thêm mới
      </Button>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 15, 20]}
            checkboxSelection
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            sx={{
              borderColor: "light",
              "& .MuiDataGrid-cell:hover": {
                color: "primary.main",
              },
            }}
          />
        </div>
      </div>

      <Drawer
        title="Thêm bến xe"
        onClose={onClose}
        anchor="right"
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
        sx={{
          "& .MuiPaper-root": {
            width: 600,
          },
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <TextField></TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField></TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField></TextField>
          </Grid>
          <Grid item xs={8}>
            <TextField></TextField>
          </Grid>
        </Grid>
      </Drawer>
    </Box>
  );
};

export default AdminStation;
