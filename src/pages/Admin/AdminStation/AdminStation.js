import {
  Box,
  Button,
  Checkbox,
  Drawer,
  FormControl,
  Select,
  MenuItem,
  FormControlLabel,
  Grid,
  Icon,
  Input,
  InputLabel,
  Radio,
  TextField,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridToolbarFilterButton,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { Breadcrumb, Col, message, Row, Space } from "antd";
import { isEmpty } from "lodash";
import AddIcon from "@mui/icons-material/Add";
import PrintIcon from "@mui/icons-material/Print";
import SearchInput from "../../../components/InputSearch";
import CreateStation from "./Components/CreateStation";

const AdminStation = (props) => {
  const [loadings, setLoadings] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [selected, setSelected] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filterParams, setFilterParams] = useState(null);
  const [formType, setFormType] = useState(null);
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
      width: 200,
      editable: true,
    },
    {
      field: "createAt",
      headerName: "Ngày tạo",
      type: "date",
      width: 180,
      editable: true,
    },
    {
      field: "addressFull",
      headerName: "Địa chỉ cụ thể",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 200,
    },
    {
      field: "images",
      headerName: "Hình ảnh",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 200,
    },

    {
      field: "action",
      headerName: "Thao tác",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 200,
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(+event.target.value);
    setPage(0);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOpenModal = () => {
    if (!isEmpty(selected)) {
      setOpenModal(true);
    } else {
      message.error("warning", "Vui lòng chọn mã");
    }
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

  const [value, setValue] = useState({
    textfield: "",
    select: "",
    radio: "",
    checkbox: false,
  });

  const handleChange = (event) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(value);
  };
  return (
    <Box sx={{ height: 520, width: "100%" }}>
      <Grid container className={"align-items-center header_title"}>
        <Grid item md={7}>
          <h2 className={"txt-title"}>QUẢN LÝ BẾN XE</h2>
        </Grid>
        <Grid item md={5}>
          <Box
            style={{ display: "flex", justifyContent: "flex-end" }}
            flexDirection={{ xs: "column", md: "row" }}
          >
            <Button
              className={"btn-create"}
              style={{ marginTop: 20, marginRight: 20 }}
              variant="contained"
              color="success"
              startIcon={<PrintIcon />}
            >
              <span className={"txt"}>In danh sách</span>
            </Button>
            <Button
              variant="contained"
              color="warning"
              className={"btn-create"}
              onClick={() => setShowDrawer(true)}
              startIcon={<AddIcon />}
              style={{ marginTop: 20 }}
            >
              <span className={"txt"}>Thêm mới</span>
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Divider />

      <Grid
        container
        className="search"
        style={{ marginTop: 15, marginBottom: 18 }}
      >
        <Grid item md={4}>
          <div style={{ marginBottom: 5 }}>
            <span className="txt-find" style={{ marginBottom: 20 }}>
              Tìm kiếm
            </span>
          </div>

          <SearchInput
            className="txt-search"
            placeholder={"Tìm kiếm theo tên, địa chỉ bến xe"}
          />
        </Grid>
        <Grid item md={4}></Grid>
        <Grid item md={4}>
          <div
            style={{
              marginBottom: 5,
              float: "right",
              marginTop: 30,
              marginRight: 10,
            }}
          >
            <span style={{ fontSize: 20, fontWeight: "bolder" }}>
              Tổng số: 10000
            </span>
          </div>
        </Grid>
      </Grid>

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
              position: "unset",
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: "#FAFAFA",
                color: "black",
                fontWeight: "bold",
                fontSize: 16,
                padding: "10px 10px 10px 10px",
              },

              backgroundColor: "#FAFAFA",
            }}
            componentsProps={{
              pagination: {
                labelRowsPerPage: "Số hàng hiển thị: ",
              },
            }}
          />
        </div>
      </div>
      <CreateStation setShowDrawer={setShowDrawer}
      showDrawer={showDrawer} type={formType}></CreateStation>
    </Box>
  );
};

export default AdminStation;
