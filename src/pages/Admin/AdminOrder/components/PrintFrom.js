import { Box, Grid } from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import TicketOrderList from "./TicketOrderList";
import { DataGrid } from "@mui/x-data-grid";
import { convertCurrency } from "../../../../data/curren";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const PrintForm = React.forwardRef((props, ref) => {
  const dataOrder = props.dataOrder;


  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop:50
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <span
          style={{
            fontSize: 25,
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          Hệ thống đặt vé xe PDBus
        </span>
        <span>Dịa chỉ: Gò Vấp - Thành phố Hồ Chí Minh</span>
        <span>Điện thoại: 0354.043.344</span>
        <span
          style={{
            fontSize: 20,
            textTransform: "uppercase",
            fontWeight: "bold",
            marginTop: 10,
            marginBottom: 20,
          }}
        >
          Hóa đơn đặt vé
        </span>
      </div>
      <div style={{ width: "100%" }}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <p>Mã hóa đơn: {dataOrder?.code}</p>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <p>
                Ngày đặt:{" "}
                {moment(dataOrder?.createdAt).format("DD/MM/YYYY HH:MM")}
              </p>
            </div>
          </Grid>

          <Grid item xs={6}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <p>Khách hàng: {dataOrder?.customer?.fullName}</p>
            </div>
          </Grid>

          <Grid item xs={6}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <p>Điện thoại: {dataOrder?.customer?.phone}</p>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <p>Nhân viên: {dataOrder?.staff?.fullName}</p>
            </div>
          </Grid>

          <Grid item xs={12}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <p>
                Tuyến xe:{" "}
                {
                  dataOrder?.orderDetails[0]?.ticketDetail.ticket.tripDetail
                    .trip.fromStation.name
                }{" "}
                -{" "}
                {
                  dataOrder?.orderDetails[0]?.ticketDetail.ticket.tripDetail
                    .trip.toStation.name
                }
              </p>
            </div>
          </Grid>
        </Grid>
        <TableContainer component={Paper} style={{ marginTop: 20 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Mã vé</TableCell>

                <TableCell align="right">Tên xe</TableCell>
                <TableCell align="right">Biển số</TableCell>
                <TableCell align="right">Thời gian đi</TableCell>
                <TableCell align="right">Gía vé</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataOrder?.orderDetails.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row?.ticketDetail?.code}
                  </TableCell>
                  <TableCell align="right">
                    {row?.ticketDetail?.seat?.vehicle?.name}
                  </TableCell>
                  <TableCell align="right">
                    {row?.ticketDetail?.seat?.vehicle?.licensePlate}
                  </TableCell>
                  <TableCell align="right">
                    {moment(
                      row?.ticketDetail?.ticket?.tripDetail?.departureTime
                    ).format("DD-MM-YYYY HH:MM")}
                  </TableCell>
                  <TableCell align="right">
                    {convertCurrency(row?.total)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div>
          <Grid container spacing={2} style={{ marginTop: 10 }}>
            <Grid item xs={8}></Grid>
            <Grid item xs={4}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <p>
                  {" "}
                  <span style={{ fontWeight: "bold", marginRight: 20 }}>
                    Số lượng vé:
                  </span>{" "}
                </p>
                <p>{dataOrder?.orderDetails.length}</p>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <p>
                  {" "}
                  <span style={{ fontWeight: "bold", marginRight: 20 }}>
                    Tổng tiền:{" "}
                  </span>
                </p>
                <p>{convertCurrency(dataOrder?.total)}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <p>
                  <span style={{ fontWeight: "bold", marginRight: 20 }}>
                    Giảm giá:
                  </span>{" "}
                </p>
                <p>
                  {convertCurrency(dataOrder?.finalTotal - dataOrder?.total)}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <p>
                  <span style={{ fontWeight: "bold", marginRight: 20 }}>
                    Thành tiền:{" "}
                  </span>
                </p>
                <p>{convertCurrency(dataOrder?.finalTotal)}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <p>
                  <span style={{ fontWeight: "bold", marginRight: 20 }}>
                    Trạng thái:{" "}
                  </span>
                </p>
                <p> {dataOrder?.status}</p>
              </div>
            </Grid>
          </Grid>
          
        </div>
        <div>
        <p style={{marginTop:30, textAlign:'center'}}>Cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi!</p>
        </div>
        
      </div>
    </div>
  );
});

export default PrintForm;
