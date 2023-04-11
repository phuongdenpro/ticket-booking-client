import React, { useMemo } from "react";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Drawer,
  FormControl,
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  TextField,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import "./seat.scss";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  dialogRoot: {
    minWidth: "60%",
    maxWidth: "60%",
    maxHeight: "100%",
    position: "fixed",
  },
  dialogContent: {
    padding: theme.spacing(2),
  },
}));

const ListTicketDetail = (props) => {
  const {
    setShowDrawer,
    showDrawer,
    dataTicket,
    setIdsSelected,
    dataTripDetail,
  } = props;
  const [seatsFloor1, setSeatsFloor1] = useState([]);
  const [seatsFloor2, setSeatsFloor2] = useState([]);
  const classes = useStyles();

  const handleSeat = async () => {
    const seatsFloor1 = [];
    const seatsFloor2 = [];
    if (dataTicket) {
      for (let i = 0; i < dataTicket.length; i++) {
        if (dataTicket[i].seat.floor == 1) {
          dataTicket[i].selected = false;
          seatsFloor1.push(dataTicket[i]);
        } else {
          dataTicket[i].selected = false;
          seatsFloor2.push(dataTicket[i]);
        }
      }
    }
    setSeatsFloor1(seatsFloor1);
    setSeatsFloor2(seatsFloor2);
  };

  useEffect(() => {
    handleSeat();
  }, [dataTicket]);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedSeatNames, setSelectedSeatNames] = useState([]);

  const handleSeatClick = (seatId) => {
    const seat = dataTicket.find((seat) => seat.id === seatId);
    const seatName = seat?.seat?.name;
    if (seat?.status == "Đã bán") {
      // seat is already booked, do not allow clicking
      return;
    }
    if (selectedSeats.includes(seatId)) {
      // If seat is already selected, remove it from the array
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
      setSelectedSeatNames(
        selectedSeatNames.filter((name) => name !== seatName)
      );
    } else {
      // Otherwise, add it to the array
      setSelectedSeats([...selectedSeats, seatId]);
      setSelectedSeatNames([...selectedSeatNames, seatName]);
    }
  };

  const onClickConfirm = () => {
    setShowDrawer(false);
    setIdsSelected(selectedSeats);
  };

  return (
    <div>
      <Dialog
        classes={{ paper: classes.dialogRoot }}
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        PaperProps={{
          sx: {
            width: 1000,
          },
        }}
      >
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            textAlign: "center",
            fontSize: 23,
            display: "flex",

            flexDirection: "row",
          }}
        >
          <InfoIcon
            style={{
              display: "block",
              fill: "#1a89ac",
              marginRight: 10,
              marginTop: 5,
              borderRadius: "50%",
              padding: 2,
              backgroundColor: "#fff",
            }}
          />
          Đặt vé xe khách ({dataTripDetail?.vehicle?.name}, biển số{" "}
          {dataTripDetail?.vehicle?.licensePlate},{" "}
          {dataTripDetail?.vehicle?.totalSeat} ghế)
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <div
              className="row"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginLeft: 20,
                marginRight: 0,
              }}
            >
              <div>
                <span>Tầng 1</span>
                <div
                  className="seats-container"
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <div>
                    <span></span>
                    {seatsFloor1
                      .slice(0, Math.ceil(seatsFloor1.length / 3))
                      .map((seat) => (
                        <div
                          key={seat?.id}
                          className={`seat ${
                            selectedSeats.includes(seat?.id) ? "selected" : ""
                          } ${
                            seat?.status == "Đã bán"
                              ? "disabled-sale"
                              : seat?.status == "Đang chờ thanh toán"
                              ? "disabled-pending"
                              : ""
                          }`}
                          onClick={() => handleSeatClick(seat?.id)}
                        >
                          {seat?.seat?.name}
                        </div>
                      ))}
                  </div>
                  
                  <div>
                    {seatsFloor1
                      .slice(
                        Math.ceil(seatsFloor1.length / 3),
                        Math.ceil((seatsFloor1.length * 2) / 3)
                      )
                      .map((seat) => (
                        <div
                          key={seat?.id}
                          className={`seat ${
                            selectedSeats.includes(seat?.id) ? "selected" : ""
                          } ${
                            seat?.status == "Đã bán"
                              ? "disabled-sale"
                              : seat?.status == "Đang chờ thanh toán"
                              ? "disabled-pending"
                              : ""
                          }`}
                          onClick={() => handleSeatClick(seat?.id)}
                        >
                          {seat?.seat?.name}
                        </div>
                      ))}
                  </div>
                  <div>
                    <span></span>
                    {seatsFloor1
                      .slice(Math.ceil((seatsFloor1.length * 2) / 3))
                      .map((seat) => (
                        <div
                          key={seat?.id}
                          className={`seat ${
                            selectedSeats.includes(seat?.id) ? "selected" : ""
                          } ${
                            seat?.status == "Đã bán"
                              ? "disabled-sale"
                              : seat?.status == "Đang chờ thanh toán"
                              ? "disabled-pending"
                              : ""
                          }`}
                          onClick={() => handleSeatClick(seat?.id)}
                        >
                          {seat?.seat?.name}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div>
                <span>Tầng 2</span>
                <div
                  className="seats-container"
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <div>
                    <span></span>
                    {seatsFloor2
                      .slice(0, Math.ceil(seatsFloor2.length / 3))
                      .map((seat) => (
                        <div
                          key={seat?.id}
                          className={`seat ${
                            selectedSeats.includes(seat?.id) ? "selected" : ""
                          } ${
                            seat?.status == "Đã bán"
                              ? "disabled-sale"
                              : seat?.status == "Đang chờ thanh toán"
                              ? "disabled-pending"
                              : ""
                          }`}
                          onClick={() => handleSeatClick(seat?.id)}
                        >
                          {seat?.seat?.name}
                        </div>
                      ))}
                  </div>
                  <div>
                    {seatsFloor2
                      .slice(
                        Math.ceil(seatsFloor2.length / 3),
                        Math.ceil((seatsFloor2.length * 2) / 3)
                      )
                      .map((seat) => (
                        <div
                          key={seat?.id}
                          className={`seat ${
                            selectedSeats.includes(seat?.id) ? "selected" : ""
                          } ${
                            seat?.status == "Đã bán"
                              ? "disabled-sale"
                              : seat?.status == "Đang chờ thanh toán"
                              ? "disabled-pending"
                              : ""
                          }`}
                          onClick={() => handleSeatClick(seat?.id)}
                        >
                          {seat?.seat?.name}
                        </div>
                      ))}
                  </div>
                  <div>
                    <span></span>
                    {seatsFloor2
                      .slice(Math.ceil((seatsFloor2.length * 2) / 3))
                      .map((seat) => (
                        <div
                          key={seat?.id}
                          className={`seat ${
                            selectedSeats.includes(seat?.id) ? "selected" : ""
                          } ${
                            seat?.status == "Đã bán"
                              ? "disabled-sale"
                              : seat?.status == "Đang chờ thanh toán"
                              ? "disabled-pending"
                              : ""
                          }`}
                          onClick={() => handleSeatClick(seat?.id)}
                        >
                          {seat?.seat?.name}
                        </div>
                      ))}
                  </div>
                  <div style={{ color: "#000", marginLeft: 30 }}>
                    <span style={{ color: "#000" }}>Chú thích:</span>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div className={`seat`}></div>
                      <span>Trống</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",

                        alignItems: "center",
                      }}
                    >
                      <div className={`seat selected`}></div>
                      <span>Đang chọn</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div className={`seat disabled-sale`}></div>
                      <span>Đã đặt</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div className={`seat disabled-pending`}></div>
                      <span>Chờ xác nhận</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <span>
            <span style={{ color: "#000", float: "left" }}>Ghế đang chọn:</span>{" "}
            {selectedSeatNames.join(", ")}
          </span>
          <div>
            <Button
              variant="contained"
              onClick={() => setShowDrawer(false)}
              style={{ marginBottom: 1, marginRight:5 }}
            >
              Quay lại
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={onClickConfirm}
              style={{ marginBottom: 1 }}
            >
              Xác nhận
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ListTicketDetail;
