import React, { useEffect, useState } from "react";
import "../Styles/orderDataStyle.css";
import Swal from "sweetalert2";
import axios from "axios";
const OrderData = ({ total, coupons, cart,mrpPrice ,discountedItems,dicountTotal,nonDiscountedItems,discountPercent}) => {
  const [userData, setFormData] = useState({
    name: "",
    address: "",
    pincode: "",
    mobile: "",
    email: "",
  });
  // const [discountPrice, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [message, setMessage] = useState("");
  // useEffect(()=>{
  //    setDiscount(0);
  // },[cart])
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...userData,
      [name]: value,
    });
  };
  const successAlert = () => {
    Swal.fire({
      title: "Success!",
      text: "your order is sended to your gmail",
      icon: "success",
      confirmButtonText: "OK",
    });
  };
  const failureAlert = () => {
    Swal.fire({
      title: "Error!",
      text: "Failed to Place Order",
      icon: "error",
      confirmButtonText: "OK",
    });
  };
  // const minimumAlert = () => {
  //   Swal.fire({
  //     title: "Error!",
  //     text: "Orders Only Above ₹3000",
  //     icon: "error",
  //     confirmButtonText: "OK",
  //   });
  // };
  // const applyCoupon = (e) => {
  //   // Array of coupons

  //   const coupon = coupons.slice(1).find((c) => c[0] === couponCode);
  //   if (coupon) {
  //     const discount = parseFloat(coupon[1]); 
  //     const discountedPrice = total.totalPrice - (total.totalPrice * discount) / 100;
  //     const roundedDiscountedPrice = Math.round(discountedPrice);
  //     // setDiscount(roundedDiscountedPrice);
  //     setMessage("Coupon Applied");
  //   } else {
  //     // setDiscount(0);
  //     setMessage("Invalid Coupon");
  //   }
  // };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // if (total.totalPrice - discountPrice < 3000) {
    //   minimumAlert();
    //   return;
    // }
  
    // Show loader
    Swal.fire({
      title: 'Placing Order...',
      text: 'Please wait while we process your order.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  
    try {
      const response = await axios.post("http://localhost:7000/placeOrder", {
        cart,
        userData,
        MrpPrice: mrpPrice,
        DiscountPrice : discountedItems,
        totalprice: dicountTotal,
        nonDiscountedItems:nonDiscountedItems,
        grandtotalPrice: dicountTotal+nonDiscountedItems,
        discount:discountPercent
      });
      Swal.close();
      successAlert();
    } catch (error) {
      Swal.close();
      failureAlert();
      console.error("Error ", error);
    }
  };
  return (
    <div className="feedback-form-container">
      <form className="feedback-form" onSubmit={handleSubmit}>
        <h2 style={{ fontWeight: "bold" }}>Customer Details</h2>
        <h6>Please fill in your information below</h6>
        <hr
          style={{
            height: "2px",
            borderWidth: 0,
            color: "gold",
            backgroundColor: "#DAA520", 
          }}
        />
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            value={userData.address}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="name">Pin Code</label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            value={userData.pincode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Mobile No</label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={userData.mobile}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>
        {dicountTotal+nonDiscountedItems > 0 && (
          <div className="applyc">
            <h4 style={{ textAlign: "center", fontWeight: "bold" }}>
              ORDER SUMMARY
            </h4>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h6>MRP Price </h6>
              <h6>₹{mrpPrice}</h6>
            </div>
            {/* <div className="coupon-container">
              <label className="coupon-label">COUPON CODE</label>
              <div className="coupon-input-wrapper">
                <div style={{ border: "none", padding: "4px 4px"}}>
                  <input
                    type="text"
                    className="coupon-input"
                    placeholder="Enter your code"
                    name="coupon"
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                </div>
                <div>
                  <button
                    type="button"
                    style={{
                      backgroundColor: "green",
                      color: "white",
                      border: "none",
                      marginBottom: "12px",
                      fontWeight: "bold",
                      borderRadius: "5px",
                      paddingRight: "18px",
                      cursor: "pointer",
                    }}
                    onClick={applyCoupon}
                  >
                    APPLY
                  </button>
                </div>
              </div>
            </div>
            <p>{message}</p>
            <hr></hr> */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h6>Discount Price[{discountPercent}%] </h6>
              {/* <h6>₹{total.totalPrice-discountPrice}</h6> */}
              <h6>
                ₹{discountedItems}
              </h6>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h6>Total Price </h6>
              {/* <h6>₹{total.totalPrice-discountPrice}</h6> */}
              <h6>
                ₹{dicountTotal}
              </h6>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h6>Non Discount price </h6>
              {/* <h6>₹{total.totalPrice-discountPrice}</h6> */}
              <h6>
                ₹{nonDiscountedItems}
              </h6>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h6>Grand Total Price </h6>
              <h6>₹{dicountTotal+nonDiscountedItems}</h6>
            </div>  
          </div>
        )}
        <button
          type="submit"
          style={{
            width: "95%",
            borderRadius: "20px",
            backgroundColor: "green",
          }}
        >
          Place Enquiry
        </button>
      </form>
      <br></br>
    </div>
  );
};
export default OrderData;