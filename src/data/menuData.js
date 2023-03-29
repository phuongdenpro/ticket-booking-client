export const menu = () => {
  const menuData = [
    {
      text: "Quản lý khách hàng",
      path: "/admin/customer",
    },
    {
      text: "Nhóm khách hàng",
      path: "/admin/group-customer",
    },
    {
      text: "Bảng giá",
      path: "/admin/price-list",
    },
    {
      text: "Quản lý xe",
      path: "/admin/vehicle",
    },
    {
      text: "Quản lý bến xe",
      path: "/admin/station",
    },
    {
      text: "Quản lý chuyến xe",
      path: "/admin/trip",
    },
    {
      text: "Chương trình khuyến mãi",
      path: "/admin/promotion",
    },
    {
      text: "Đặt vé",
      path: "/admin/create-ticket",
    },
    {
      text: "Hóa đơn đặt vé",
      path: "/admin/order/order-list",
    },
    {
      text: "Hóa đơn hoàn trả",
      path: "/admin/order-refund-list",
    },
    {
      text: "Thống kê vé",
      path: "/admin/dashboard-ticket",
    },
    {
      text: "Thống kê khuyến mãi",
      path: "/admin/dashboard-promotion",
    },
    {
      text: "Thống kê doanh thu",
      path: "/admin/dashboard-cost",
    },
  ];
  return menuData;
};
