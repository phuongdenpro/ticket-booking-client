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
import React, { useEffect, useState } from "react";
import { Breadcrumb, Col, message, notification, Row, Space } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isEmpty } from "lodash";
import AddIcon from "@mui/icons-material/Add";
import PrintIcon from "@mui/icons-material/Print";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchInput from "../../../components/InputSearch";
import CreateStation from "./Components/CreateStation";
import { StationApi } from "../../../utils/apis";
import TableCustom from "../../../components/TableCustom";
import StationList from "./Components/StationList";
import ModalAlert from "../../../components/Modal";
notification.config({ top: 150 });
const AdminStation = (props) => {
  const [loadings, setLoadings] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [idStation, setIdStation] = useState(null);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [selectedStation, setSelectedStation] = useState([]);
  const [selected, setSelected] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filterParams, setFilterParams] = useState(null);
  const [formType, setFormType] = useState(null);
  const [data, setData] = useState([]);

  const handleGetData = async () => {
    enterLoading(0);
    const stationApi = new StationApi();
    const response = await stationApi.getAllStations({
      page: page + 1,
      pageSize: pageSize,
      ...filterParams,
    });
    setData(response);
  };
  useEffect(() => {
    const tmpSelected = [];
    if (!isEmpty(selected)) {
      selected.map((item) =>
        data?.data?.data.map((elm) => {
          if (item === elm?.id) {
            tmpSelected.push(elm);
            setSelectedStation(tmpSelected);
          }
        })
      );
    } else {
      setSelectedStation([]);
    }
  }, [selected]);

  useEffect(() => {
    setFilterParams({ ...filterParams, keywords: searchValue });
  }, [searchValue]);

  useEffect(() => {
    if (!showDrawer) {
      setIdStation("");
    }
  }, [showDrawer]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data?.data?.data?.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handelShowDetail = (id) => {
    setShowDrawer(true);
    setIdStation(id);
    setFormType("update");
  };

  const handleSearch = (e) => {
    setFilterParams({ keywords: searchValue || undefined });
  };
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
      setTimeout(() => {
        notification.open({
          type: "warning",
          duration: 2,
          description: `Vui lòng chọn mã `,
          message: "Error !",
        });
      }, 1000);
    }
  };

  const handleConfirm = async () => {
    const params = {
      ids: selected,
    };

    try {
      const stationApi = new StationApi();
      const response = await stationApi.deleteMultiple({ ids: selected });

      if (response.status == 200) {
        setTimeout(() => {
          notification.open({
            type: "success",
            duration: 2,
            description: `Xóa thành công `,
            message: "Success !",
          });
        }, 1000);
      }
      handleGetData();
      setOpenModal(false);
      setSelected([]);
    } catch (error) {
      setTimeout(() => {
        notification.open({
          type: "error",
          duration: 2,
          description: `Có lỗi xảy ra `,
          message: "Error !",
        });
      }, 1000);
    }
  };
  useEffect(() => {
    handleGetData();
  }, [page, pageSize, filterParams]);

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
              style={{ marginTop: 20, marginRight: 20 }}
            >
              <span className={"txt"}>Thêm mới</span>
            </Button>

            <Button
              variant="contained"
              color="error"
              className={"btn-create"}
              startIcon={<DeleteIcon />}
              style={{ marginTop: 20 }}
              onClick={() => handleOpenModal()}
            >
              <span className={"txt"}>Xóa</span>
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
            value={searchValue}
            setSearchValue={setSearchValue}
            handleSearch={handleSearch}
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
              Tổng số bến xe: {data?.data?.pagination?.total || 0}
            </span>
          </div>
        </Grid>
      </Grid>

      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <StationList
            data={data?.data?.data || []}
            handleShowDetail={handelShowDetail}
            selectionModel={selected}
            handleSelectionModeChange={handleSelectAllClick}
            handleClick={handleClick}
            handleChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            total={data?.data?.pagination?.total}
            page={page}
            pageSize={pageSize}
          ></StationList>
        </div>
      </div>
      <CreateStation
        setShowDrawer={setShowDrawer}
        showDrawer={showDrawer}
        type={formType}
      ></CreateStation>
      <ModalAlert
        open={openModal}
        handleClose={() => handleCloseModal()}
        handleCancel={() => handleCloseModal()}
        handleConfirm={() => handleConfirm()}
        title={"Xác nhận xóa"}
        description={
          "Thao tác sẽ không thể hoàn tác, bạn có chắc chắn muốn tiếp tục không?"
        }
        type={"error"}
        icon={true}
        renderContentModal={
          <div className="view-input-discount">
            <span>Mã station: </span>
            {selectedStation?.map((sku) => {
              return (
                <div>
                  <span
                    style={{
                      fontSize: "17px",
                      fontWeight: "500",
                      marginLeft: "2px",
                    }}
                  >
                    {sku?.id}
                    {","}
                  </span>
                </div>
              );
            })}
          </div>
        }
      />
    </Box>
  );
};

export default AdminStation;
