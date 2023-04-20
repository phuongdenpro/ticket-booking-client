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
import "./AdminDashboardCost.scss";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import DashboardCostList from "./components/List";
import { StatisticsApi } from "../../../utils/statisticsApi";
import moment from "moment";
import { convertCurrency } from "../../../data/curren";
import * as XLSX from "xlsx";
import ExcelJS from "exceljs";
import saveAs from "file-saver";
import Cookies from "js-cookie";

const AdminDashboardCost = (props) => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [filterParams, setFilterParams] = useState(null);
  const [data, setData] = useState([]);
  var now = new Date();
  var sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const [startDate, setStartDate] = useState(sevenDaysAgo);
  const [endDate, setEndDate] = useState(now);
  const [total, setTotal] = useState(0);

  const handleGetData = async () => {
    try {
      const statisticApi = new StatisticsApi();
      const response = await statisticApi.revenueByCustomer({
        page: page + 1,
        pageSize: pageSize,
        ...filterParams,
      });

      setData(response);
    } catch (error) {
      customToast.error(error.response.data.message);
    }
  };
  const handleTotal = () => {
    let total = 0;
    const dataNew = data?.data?.data;
    for (let i = 0; i < dataNew?.length; i++) {
      total += dataNew[i].finalTotal;
    }
    setTotal(total);
  };

  useEffect(() => {
    handleTotal();
  }, [data]);

  useEffect(() => {
    setFilterParams({ ...filterParams, keyword: searchValue });
  }, [searchValue]);

  useEffect(() => {
    handleGetData();
  }, [page, pageSize, filterParams]);

  const handleSearch = (e) => {
    setFilterParams({ ...filterParams, keyword: searchValue || undefined });
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

  useEffect(() => {
    const params = {
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
    };
    console.log(params);
    setFilterParams(params);
  }, [startDate, endDate]);
  console.log(startDate);

  const exportExcel = () => {
    var ExcelJSWorkbook = new ExcelJS.Workbook();
    var worksheet = ExcelJSWorkbook.addWorksheet("Thống kê doanh thu", {
      views: [{ showGridLines: false }],
    });

    worksheet.mergeCells("A1:I1");

    const customCell1 = worksheet.getCell("A1");
    customCell1.font = {
      name: "Times New Roman",
      family: 4,
      size: 12,
    };

    customCell1.value = `HỆ THỐNG ĐẶT VÉ XE PDBUS`;

    worksheet.mergeCells("A2:I2");

    const customCell3 = worksheet.getCell("A2");
    customCell3.font = {
      name: "Times New Roman",
      family: 4,
      size: 12,
    };
    const day = new Date();
    customCell3.value = `Nhân viên: ${Cookies.get("fullName")} `;

    worksheet.mergeCells("A3:I3");

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

    worksheet.mergeCells("A5:I5");

    const customCell = worksheet.getCell("A5");
    customCell.font = {
      name: "Times New Roman",
      family: 4,
      size: 14,
      bold: true,
    };
    customCell.alignment = { vertical: "middle", horizontal: "center" };

    worksheet.mergeCells("A6:I6");

    const customCell5 = worksheet.getCell("A6");
    customCell5.font = {
      name: "Times New Roman",
      family: 4,
      size: 8,
    };
    customCell5.alignment = { vertical: "middle", horizontal: "center" };

    let headerColumn = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

    var headerRow = worksheet.addRow();

    customCell.value = `Thống kê doanh thu `;

    const customCell2 = worksheet.getCell("A6");
    customCell2.font = {
      name: "Times New Roman",
      family: 4,
      size: 12,
      bold: false,
    };
    customCell2.alignment = { vertical: "middle", horizontal: "center" };
    customCell2.value = `(Từ ngày ${moment(startDate).format("DD/MM/YYYY")} đến ngày ${moment(
      endDate
    ).format("DD/MM/YYYY")})`;

    worksheet.mergeCells("A7:I7");
    const customCell7 = worksheet.getCell("A7");
    customCell7.font = {
      name: "Times New Roman",
      family: 4,
      size: 12,
      bold: false,
    };
    customCell7.alignment = { vertical: "middle", horizontal: "center" };
    customCell7.value = `Tổng doanh thu ${convertCurrency(total)}`;


    worksheet.getRow(9).font = { bold: true };
    worksheet.getRow(9).height = "25";
    let header = [
      "STT",
      "Khách hàng",
      "Số điện thoại",
      "Email",
      "Nhóm khách hàng",
      "Số đơn đặt vé",
      "Tổng tiền vé",
      "Giảm giá",
      "Thành tiền",
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
        column: 9,
      },
    };
    let i = 1;
    data?.data?.data.forEach((element) => {
      worksheet.addRow([
        i,
        element?.fullName,
        element?.phone,
        element?.email,
        element?.customerGroupName,
        element?.numberOfOrders,
        element?.total,
        element?.total - element?.finalTotal,
        element?.finalTotal,
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
        `ThongKeDoanhThu-${day.getDate()}${
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
            THỐNG KÊ DOANH THU
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
          <Grid item md={6} style={{ marginRight: 30 }}>
            <Box
              style={{ display: "flex", justifyContent: "flex-start" }}
              flexDirection={{ xs: "column", md: "row" }}
            >
              <FormControlCustom label="Từ ngày" fullWidth>
                <div className="view-input" style={{ marginRight: 10 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
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
          <Grid item md={5} style={{ marginTop: 3 }}>
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
          Tổng doanh thu: {convertCurrency(total)}
        </span>
        <span className="txt-price"> </span>
      </Grid>
      <div style={{ display: "flex" }}>
        <div style={{ flexGrow: 1 }}>
          <DashboardCostList
            data={data?.data?.data || []}
            handleChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            total={data?.data?.pagination?.total}
            handleGetData={handleGetData}
            page={page}
            pageSize={pageSize}
          ></DashboardCostList>
        </div>
      </div>
    </Box>
  );
};

export default AdminDashboardCost;
