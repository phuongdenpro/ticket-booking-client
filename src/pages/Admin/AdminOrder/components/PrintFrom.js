import React, { useState } from "react";
import { Helmet } from "react-helmet";

const PrintForm = React.forwardRef((props, ref) => {
    const dataOrder = props.dataOrder;
    console.log(dataOrder);
  
    // code to fetch order detail and set it to state
  
    return (
      <div ref={ref}>
        <h3>Thông tin hóa đơn</h3>
        <p>Mã hóa đơn: {dataOrder.code}</p>
      </div>
    );
  });

export default PrintForm;
