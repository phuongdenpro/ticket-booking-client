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
import QRCode from "qrcode.react";
moment.locale('vi');

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
        marginTop: 50,
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
        <QRCode value={dataOrder?.code} style={{ marginBottom: 50 }} />
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
              <p>
                Nơi đi:{" "}
                {
                  dataOrder?.orderDetails[0]?.ticketDetail.ticket.tripDetail
                    .trip.fromStation.name
                }{" "}
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
              <p>
                Nơi đến:{" "}
                {
                  dataOrder?.orderDetails[0]?.ticketDetail.ticket.tripDetail
                    .trip.toStation.name
                }
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
              <p>
                Tên xe:{" "}
                {dataOrder?.orderDetails[0]?.ticketDetail.seat?.vehicle?.name}
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
              <p>
                Biển số xe:{" "}
                {
                  dataOrder?.orderDetails[0]?.ticketDetail.seat?.vehicle
                    ?.licensePlate
                }
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
              <p>
                Số ghế:{" "}
                {dataOrder?.orderDetails
                  ?.map((item) => item.ticketDetail.seat.name)
                  .join(",")}
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
              <p>
                Thời gian khởi hành:{" "}
                {moment(
                  dataOrder?.orderDetails[0]?.ticketDetail?.ticket?.tripDetail
                    ?.departureTime
                ).format("DD/MM/YYYY HH:MM")}
              </p>
            </div>
          </Grid>
        </Grid>
        <div>
          <Grid container spacing={2} style={{ marginTop: 10 }}>
            <Grid item xs={7}></Grid>
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <p>
                  <span style={{ fontWeight: "bold", marginRight: 20 }}>
                    Nhân viên:{" "}
                  </span>
                </p>
                <p> {dataOrder?.staff?.fullName}</p>
              </div>
            </Grid>
          </Grid>
          
        </div>

        <div>
          <p style={{ marginTop: 100, textAlign: "center" }}>
            Cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi!
          </p>
        </div>
      </div>
    </div>
  );
});

export default PrintForm;
