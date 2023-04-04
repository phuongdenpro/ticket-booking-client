import moment from "moment";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import { TripApi } from "../../utils/tripApi";
import StartIcon from "@mui/icons-material/Start";
import CellWifiIcon from "@mui/icons-material/CellWifi";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import NetworkWifiIcon from "@mui/icons-material/NetworkWifi";
import CircleIcon from "@mui/icons-material/Circle";
import AdjustIcon from "@mui/icons-material/Adjust";
import PlaceIcon from "@mui/icons-material/Place";
import { Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
moment.locale("vi");

const SearchTrip = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const [dataTrip, setDataTrip] = useState([]);
  console.log(dataTrip);

  const searchTripAll = async () => {
    const paramsSearch = {
      fromProvinceCode: params?.codeProvinceFrom,
      toProvinceCode: params?.codeProvinceTo,
      departureTime: params?.startDate,
    };

    try {
      const tripApi = new TripApi();
      const response = await tripApi.getTripDetail({
        isAll: true,
        ...paramsSearch,
      });
      setDataTrip(response?.data?.data);
    } catch (error) {}
  };

  useEffect(() => {
    searchTripAll();
  }, [params]);

  return (
    <div>
      <Helmet>
        <title> PDBus - SearchTrip</title>
      </Helmet>
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            height: 70,
            width: "100%",
            backgroundColor: "#f29252",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span
            style={{ fontSize: 25, fontWeight: "bolder", color: "#ffffff" }}
          >
            PDBus - Cam kết hoàn tiền nếu nhà xe không giữ vé
          </span>
        </div>
        <div
          className="content"
          style={{
            width: "60vw",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ marginTop: 30, marginBottom: 20 }}>
            <h2 className="home_slide_title" style={{ color: "#a53e3e" }}>
              {params?.fromProvinceName} - {params?.toProvinceName}
            </h2>
            <span>{moment(params?.startDate).format("DD-MM-YYYY")}</span>
          </div>
          <div className="content-trip" style={{ width: "50vw" }}>
            <span style={{ color: "#000" }}>
              Các chuyến đi từ {params?.fromProvinceName} -{" "}
              {params?.toProvinceName} ngày{" "}
              {moment(params?.startDate).format("DD-MM-YYYY")}
            </span>
            {dataTrip?.length == 0 ? (
              <div
                style={{
                  marginTop: 50,
                  width: "100%",
                  height: 50,
                  backgroundColor: "#a1daf4",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                }}
              >
                Hiện tại không có chuyến xe nào, mời bạn quay lại sau !!!
              </div>
            ) : (
              dataTrip.map((item) => (
                <div className="card-trip-search">
                  <div
                    className="card-bottom"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <h3>
                      {moment(item?.departureTime).format("HH:mm")}{" "}
                      <StartIcon style={{ height: 15 }} />{" "}
                      {moment(item?.expectedTime).format("HH:mm")}
                    </h3>
                    <span>
                      <LocalActivityIcon style={{ marginRight: 10 }} />
                      <NetworkWifiIcon />
                    </span>
                  </div>
                  <div
                    style={{
                      backgroundColor: "#f2cbcb",
                      width: 300,
                      borderRadius: 10,
                      marginLeft: 20,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span>300.000 VND</span>
                    <CircleIcon style={{ height: 10 }} />
                    <span>{item?.vehicle.type}</span>
                    <CircleIcon style={{ height: 10 }} />
                    <span>{item?.status}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "90%",
                      marginLeft: 20,
                    }}
                  >
                    <div>
                      <div>
                        <PlaceIcon
                          style={{
                            backgroundColor: "white",
                            fill: "#4671f2",
                            marginTop: 20,
                            marginRight: 5,
                          }}
                        ></PlaceIcon>
                        <span>{item?.trip?.fromStation?.name}</span>
                      </div>
                      <span style={{ fontSize: 12, marginLeft: 20 }}>
                        {item?.trip?.fromStation?.fullAddress}
                      </span>
                      <div>
                        <PlaceIcon
                          style={{
                            backgroundColor: "white",
                            fill: "red",
                            marginTop: 20,
                            marginRight: 5,
                          }}
                        ></PlaceIcon>
                        <span>{item?.trip?.toStation?.name}</span>
                      </div>
                      <span style={{ fontSize: 12, marginLeft: 20 }}>
                        {item?.trip?.toStation?.fullAddress}
                      </span>
                    </div>
                    <div
                      style={{
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={
                          "https://upload-ticket-booking.s3.ap-southeast-1.amazonaws.com/images/1679589621118-cho-thue-xe-giuong-nam-viptrip_29-09-2022_762406374.jpg"
                        }
                        alt=""
                        style={{
                          aspectRatio: 1,
                          width: "150px",
                          borderRadius: 10,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <Button
            variant="outlined"
            style={{
              width: "80%",
              borderRadius: 10,
              marginTop: 20,
              marginBottom: 30,
              borderWidth: 1,
              borderColor: "#918787",
              color: "#000",
            }}
            startIcon={<ArrowBackIosIcon />}
            onClick={() =>
              setTimeout(function () {
                navigate("/");
              }, 1000)
            }
          >
            Quay lại
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchTrip;
