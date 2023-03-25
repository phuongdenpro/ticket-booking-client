import { Button } from "@mui/material";
import moment from "moment";
import { useState } from "react";

import DataTable from "../../../../components/DataTable";
import ModalAlert from "../../../../components/Modal";
import TableCustom from "../../../../components/TableCustom";
import customToast from "../../../../components/ToastCustom";
import { convertCurrency } from "../../../../data/curren";
import { PriceListApi } from "../../../../utils/priceListApi";

const PromotionDetailList = (props) => {
  const {
    data,
    selectionModel,
    handleSelectionModeChange,
    handleShowDetail,
    handleClick,
    onChangeRowsPerPage,
    getPriceListDetails,
    handleChangePage,
    total,
    page,
    pageSize,
  } = props;

  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState(null);
  const [code, setCode] = useState("");

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleOpenModal = (id, code) => {
    setId(id);
    setCode(code);
    setOpenModal(true);
  };

  const handleConfirm = async () => {
    try {
      const priceListApi = new PriceListApi();
      const response = await priceListApi.deletePriceListDetail(id);
      console.log(response);
      customToast.success("Xóa thành công");

      getPriceListDetails();
      setOpenModal(false);
      setId(null);
    } catch (error) {
      customToast.error(error.response.data.message);
    }
  };

  const columns = [
    {
      field: "code",
      headerName: "Mã",
      flex: 50,
      headerAlign: "center",
      headerClassName: "theme",
      contentAlign:'center',
      sortable: false,
      renderCell: (params) => {
        return (
          <span
            style={{
              color: "#1A89AC",
              fontSize: "0.8rem",
              display: "inline-block",
              textTransform: "none",
            }}
          >
            {params.row?.code}
          </span>
        );
      },
    },
    {
      field: "ticketGroup",
      headerName: "Mô tả",
      contentAlign:'center',
      flex: 70,
      headerAlign: "center",
      headerClassName: "theme",
      sortable: false,
      renderCell: (params) => {
        return <span>{params.row?.ticketGroup.code}</span>;
      },
    },
    {
      field: "ticketGroup",
      headerName: "Loại khuyến mãi",
      contentAlign:'center',
      flex: 100,
      headerAlign: "center",
      headerClassName: "theme",
      sortable: false,
      renderCell: (params) => {
        return <span>{params.row?.ticketGroup.name}</span>;
      },
    },
    

    {
      field: "createdAt",
      headerName: "Ngày áp dụng",
      contentAlign:'center',
      flex: 100,
      headerAlign: "center",
      headerClassName: "theme",
      sortable: false,
      renderCell: (params) => {
        return (
          <span>{moment(params.row?.createdAt).format("DD/MM/YYYY")}</span>
        );
      },
    },
    {
        field: "endDateAt",
        headerName: "Ngày kết thúc",
        contentAlign:'center',
        flex: 100,
        headerAlign: "center",
        headerClassName: "theme",
        sortable: false,
        renderCell: (params) => {
          return (
            <span>{moment(params.row?.endDateAt).format("DD/MM/YYYY")}</span>
          );
        },
      },
    {
      field: "action",
      headerName: "Thao tác",
      contentAlign:'center',
      flex: 70,
      headerAlign: "center",
      headerClassName: "theme",
      sortable: false,
      renderCell: (params) => {
        return (
          <Button
            onClick={() => handleOpenModal(params?.row?.id, params?.row?.code)}
            style={{ backgroundColor: "transparent" }}
          >
            <span
              style={{
                textDecorationLine: "underline",
                color: "#1A89AC",
                fontSize: "0.8rem",
                display: "inline-block",
                textTransform: "none",
              }}
            >
              Xóa
            </span>
          </Button>
        );
      },
    },
  ];

  return (
    <div>
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
        pagination={false}
      />
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
            <span>Mã: {code} </span>
          </div>
        }
      />
    </div>
  );
};

export default PromotionDetailList;
