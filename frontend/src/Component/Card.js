import React, { useState } from "react";
import "../Styles/cardStyle.css";
import pic from "../logo.svg";
const Card = ({ data, addToCart }) => {
  const [quantity, setQuantity] = useState(0);
  const productCategory = data[0];
  const productName = data[1];
  const productPrice = data[2];
  const productUnit = data[3];
  const productImage = data[4];
  console.log(productName);
  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };
  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  const handleAddToCart = () => {
    // if (quantity > 0) {
      addToCart(data, quantity);
      
    // }
  };
  // function convertToProxyUrl(driveUrl) {
  //   const encodedUrl = encodeURIComponent(driveUrl);
  //   const proxyUrl = `http://localhost:8000/proxy?url=${encodedUrl}`;
  //   return proxyUrl;
  // }
  // const driveUrl = productImage;
  // const proxyUrl = driveUrl ? convertToProxyUrl(driveUrl) : pic;
  // console.log(proxyUrl)
  return (
    
    <div className="card">
    
      <div className="card-image" style={{alignItems:"center",marginTop:"10px"}}>
        <img src={productImage} alt="Pro" />
      </div>
      <div className="card-content">
        <div className="product-name" >{productName}</div>
        <div className="pricing">
          <span className="discounted-price">₹{productPrice}</span>
          <span className="price-unit">Per{productUnit}</span>
        </div>
      </div>
      <div className="quantity-controls">
          <button className="decrement-button" onClick={decrementQuantity}>
            -
          </button>
          <span className="quantity">{quantity}</span>
          <button className="increment-button" onClick={incrementQuantity}>
            +
          </button>
        </div>
        <div>
      <button className="add-button" style={{width:"60px"}} onClick={handleAddToCart}>
        ADD
      </button></div>
    
    </div>
    
  );
};
export default Card;
