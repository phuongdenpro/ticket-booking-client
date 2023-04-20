import { Box, Divider, Grid, TextField, Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormControlCustom from "../../../components/FormControl";
import SearchInput from "../../../components/InputSearch";
import SelectCustom from "../../../components/SelectCustom";
import customToast from "../../../components/ToastCustom";
import { OrderApi } from "../../../utils/orderApi";
import "./AdminDashboardPromotion.scss";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import DashboardPromotionList from "./components/ListDashboardPromotion";
import { StatisticsApi } from "../../../utils/statisticsApi";
import ExcelJS from "exceljs";
import saveAs from "file-saver";
import Cookies from "js-cookie";
import moment from "moment";

const AdminDashboardPromotion = (props) => {
  const [loadings, setLoadings] = useState([]);
  const currentYear = new Date().getFullYear();
  const firstDay = new Date(currentYear, 0, 1);
  const lastDay = new Date(currentYear, 11, 31);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [filterParams, setFilterParams] = useState(null);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const [orderStatus, setOrderStatus] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState({
    startDate: firstDay,
    endDate: lastDay,
  });

  const filterDateTime = [
    {
      id: 1,
      code: "ALL",
      name: "Tất cả",
    },
    {
      id: 2,
      code: "option",
      name: "Tùy chọn",
    },
  ];

  const [disable, setDisable] = useState(true);
  const handleGetData = async () => {
    try {
      const statisticApi = new StatisticsApi();
      const response = await statisticApi.promotionLine({
        page: page + 1,
        pageSize: pageSize,
        ...filterParams,
      });
      setData(response);
    } catch (error) {
      customToast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    setFilterParams({ ...filterParams, keywords: searchValue });
  }, [searchValue]);

  useEffect(() => {
    handleGetData();
  }, [page, pageSize, filterParams]);

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
  const defaultValues = {
    startDate: null,
    endDate: null,
  };
  const methods = useForm({
    defaultValues,
  });
  const { handleSubmit, reset, watch } = methods;
  const watchTime = watch("time");
  useEffect(() => {
    const params = {
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
    };
    setFilterParams(params);
  }, [watchTime, startDate, endDate]);
  useEffect(() => {
    const now = new Date();

    if (watchTime?.code === "option") {
      // setSelectedDate({ ...selectedDate, dateFrom: '', dateTo: '' });
    } else {
      setStartDate(null);
      setEndDate(null);
    }
  }, [watchTime]);
  useEffect(() => {
    if (watchTime?.code === "option") {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [watchTime]);

  const exportExcel = () => {
    var ExcelJSWorkbook = new ExcelJS.Workbook();
    var worksheet = ExcelJSWorkbook.addWorksheet("Tổng kết CTKM", {
      views: [{ showGridLines: false }],
    });

    worksheet.mergeCells("A1:J1");

    const customCell1 = worksheet.getCell("A1");
    customCell1.font = {
      name: "Times New Roman",
      family: 4,
      size: 12,
    };

    customCell1.value = `HỆ THỐNG ĐẶT VÉ XE PDBUS`;

    worksheet.mergeCells("A2:J2");

    const customCell3 = worksheet.getCell("A2");
    customCell3.font = {
      name: "Times New Roman",
      family: 4,
      size: 12,
    };
    const day = new Date();
    customCell3.value = `Nhân viên: ${Cookies.get("fullName")} `;

    worksheet.mergeCells("A3:J3");

    const customCell4 = worksheet.getCell("A3");
    customCell4.font = {
      name: "Times New Roman",
      family: 4,
      size: 12,
    };
    customCell4.value =
      "Ngày xuất báo cáo: " +
      day.getDate() +
      "/" +
      (day.getMonth() + 1) +
      "/" +
      day.getFullYear();

    worksheet.mergeCells("A5:J5");

    const customCell = worksheet.getCell("A5");
    customCell.font = {
      name: "Times New Roman",
      family: 4,
      size: 14,
      bold: true,
    };
    customCell.alignment = { vertical: "middle", horizontal: "center" };

    worksheet.mergeCells("A6:J6");

    const customCell5 = worksheet.getCell("A6");
    customCell5.font = {
      name: "Times New Roman",
      family: 4,
      size: 8,
    };
    customCell5.alignment = { vertical: "middle", horizontal: "center" };

    let headerColumn = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

    var headerRow = worksheet.addRow();

    customCell.value = `TỔNG KẾT KHUYẾN MÃI`;

    const customCell2 = worksheet.getCell("A6");
    customCell2.font = {
      name: "Times New Roman",
      family: 4,
      size: 12,
      bold: false,
    };
    customCell2.alignment = { vertical: "middle", horizontal: "center" };
    customCell2.value = `(Từ ngày ${moment(selectedDate.startDate).format(
      "DD/MM/YYYY"
    )} đến ngày ${moment(selectedDate.endDate).format("DD/MM/YYYY")})`;

    worksheet.mergeCells("A7:J7");
    const customCell7 = worksheet.getCell("A7");
    customCell7.font = {
      name: "Times New Roman",
      family: 4,
      size: 12,
      bold: false,
    };
    customCell7.alignment = { vertical: "middle", horizontal: "center" };
    customCell7.value = `Tổng số CTKM : ${data?.data?.pagination?.total}`;

    worksheet.getRow(9).font = { bold: true };
    worksheet.getRow(9).height = "25";
    let header = [
      "STT",
      "Mã CTKM",
      "Tiêu đề CTKM",
      "Ngày bắt đầu",
      "Ngày kết thúc",
      "Chiết khấu (%)",
      "Chiết khấu (VND)",
      "Ngân sách tổng",
      "Ngân sách đã sử dụng",
      "Ngân sách còn lại",
    ];

    for (let i = 0; i < headerColumn.length; i++) {
      const columnn = worksheet.getCell(headerColumn[i] + 9);
      columnn.font = {
        name: "Times New Roman",
        family: 4,
        bold: true,
      };
      columnn.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      columnn.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "f2bc76" },
        bgColor: { argb: "f2bc76" },
      };
      if (i == 0) {
        worksheet.getColumn(i + 1).width = "10";
      } else {
        worksheet.getColumn(i + 1).width = "20";
      }
      columnn.alignment = { vertical: "middle", horizontal: "center" };
      columnn.value = header[i];
    }

    worksheet.autoFilter = {
      from: {
        row: 9,
        column: 1,
      },
      to: {
        row: 9,
        column: 10,
      },
    };
    let i = 1;
    data?.data?.data.forEach((element) => {
      worksheet.addRow([
        i,
        element?.code,
        element?.title,
        moment(element?.startDate).format("DD-MM-YYYY"),
        moment(element?.endDate).format("DD-MM-YYYY"),
        element?.promotionDetail?.percentDiscount,
        element?.promotionDetail?.reductionAmount,
        element?.maxBudget,
        element?.useBudget,
        element?.maxBudget - element?.useBudget,
      ]);
      for (let j = 0; j < headerColumn.length; j++) {
        const columnn = worksheet.getCell(headerColumn[j] + (i + 9));
        columnn.font = {
          name: "Times New Roman",
          family: 4,
        };
        columnn.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        if (j == 0) {
          columnn.alignment = { vertical: "middle", horizontal: "center" };
        } else if (j == 1) {
          columnn.alignment = { vertical: "middle", horizontal: "left" };
        }
      }

      i++;
    });

    ExcelJSWorkbook.xlsx.writeBuffer().then(function (buffer) {
      saveAs(
        new Blob([buffer], { type: "application/octet-stream" }),
        `TongKetKhuyenMai-${day.getDate()}${
          day.getMonth() + 1
        }${day.getFullYear()}${day.getHours()}${day.getMinutes()}${day.getSeconds()}.xlsx`
      );
    });
    customToast.success("Xuất báo cáo thành công");
  };
  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Helmet>
        <title> PDBus - Hóa đơn hoàn trả</title>
      </Helmet>
      <Grid container className={"align-items-center header_title"}>
        <Grid item md={7}>
          <h2 className={"txt-title"} style={{ marginTop: 10 }}>
            THỐNG KÊ KHUYẾN MÃI
          </h2>
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
              startIcon={<DownloadOutlinedIcon />}
              onClick={() => exportExcel()}
            >
              <span className={"txt"}>Xuất báo cáo</span>
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Divider style={{ marginTop: 10 }} />
      <Grid
        className="search"
        container
        style={{ marginTop: 10, marginBottom: 20 }}
      >
        <FormProvider {...methods}>
          <Grid item md={7} style={{ marginRight: 30 }}>
            <Box
              style={{ display: "flex", justifyContent: "flex-start" }}
              flexDirection={{ xs: "column", md: "row" }}
            >
              <FormControlCustom label="Thời gian" fullWidth>
                <div className="view-input" style={{ marginRight: 10 }}>
                  <SelectCustom
                    options={filterDateTime}
                    placeholder={"Tất cả"}
                    name={"time"}
                  />
                </div>
              </FormControlCustom>
              <FormControlCustom label="Từ ngày" fullWidth>
                <div className="view-input" style={{ marginRight: 10 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      disabled={disable}
                      onChange={(e) => {
                        setStartDate(new Date(e));
                      }}
                      value={dayjs(startDate)}
                      className={"date-picker"}
                      renderInput={(params) => <TextField {...params} />}
                      format="DD/MM/YYYY"
                    />
                  </LocalizationProvider>
                </div>
              </FormControlCustom>

              <FormControlCustom label="Đến ngày" fullWidth>
                <div className="view-input" style={{ marginRight: 10 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      disabled={disable}
                      onChange={(e) => {
                        setEndDate(new Date(e));
                      }}
                      value={dayjs(endDate)}
                      className={"date-picker"}
                      renderInput={(params) => <TextField {...params} />}
                      format="DD/MM/YYYY"
                    />
                  </LocalizationProvider>
                </div>
              </FormControlCustom>
            </Box>
          </Grid>
          <Grid item md={4} style={{ marginTop: 3 }}>
            <div style={{ marginBottom: 5 }}>
              <span className="txt-find">Tìm kiếm</span>
            </div>

            <SearchInput
              className="txt-search"
              placeholder={"Nhập thông tin tìm kiếm"}
              value={searchValue}
              setSearchValue={setSearchValue}
              handleSearch={handleSearch}
            />
          </Grid>
        </FormProvider>
      </Grid>
      <Grid
        item
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: 10,
        }}
        md={6}
      >
        <span
          className="title-price"
          style={{
            color: "#000",
            marginRight: 5,
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          Tổng số:{" "}{data?.data?.pagination?.total}
        </span>
        <span className="txt-price"> </span>
      </Grid>
      <div style={{ display: "flex" }}>
        <div style={{ flexGrow: 1 }}>
          <DashboardPromotionList
            data={data?.data?.data || []}
            handleChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            total={data?.data?.pagination?.total}
            handleGetData={handleGetData}
            page={page}
            pageSize={pageSize}
          ></DashboardPromotionList>
        </div>
      </div>
    </Box>
  );
};

export default AdminDashboardPromotion;
