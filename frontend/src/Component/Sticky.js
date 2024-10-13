import React, { useState } from "react";

const StickyCart = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  // Function to update the cart
  const updateCart = (priceChange, itemChange) => {
    setTotalPrice(prevPrice => prevPrice + priceChange);
    setItemCount(prevCount => prevCount + itemChange);
  };

  return (
    <>
      <div id="cart" className="sticky-cart">
        <p>Items: <span id="item-count">{itemCount}</span></p>
        <p>Total: ₹<span id="total-price">{totalPrice.toFixed(2)}</span></p>
      </div>
      {/* Pass updateCart to all cards */}
      <Card data={["Category", "Product 1", 100, "kg", "image-url.jpg"]} updateCart={updateCart} />
      <Card data={["Category", "Product 2", 200, "kg", "image-url.jpg"]} updateCart={updateCart} />
    </>
  );
};

export default StickyCart;
