import React, { useState, useEffect } from "react";
import "./App.css";
import { FaSquarePhone } from "react-icons/fa6";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "./Component/Card";
import OrderData from "./Component/OrderData";
import logo from "./Assets/sairam logo.png";
import email from "./Assets/email icon.svg";
import what from "./Assets/whatsapp-icon.svg";
import ints from "./Assets/instagram icon.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import {
  faWhatsapp,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function App() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState({});
  // const [discount,setDiscount] = useState(0);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [mrpPrice, setMrp] = useState(0);
  const [discountedItems, setDiscountedItems] = useState(0);
  const [dicountTotal,setDicountTotal]=useState(0);
  const [nonDiscountedItems, setNonDiscountedItems] = useState(0);
  const addToCart = (item, quantity) => {
    const existingItemIndex = cart.findIndex((i) => i[1] === item[1]);
    if (existingItemIndex !== -1) {
      const updatedCart = cart.map((cartItem, index) => {
        if (index === existingItemIndex) {
          return { ...cartItem, quantity: quantity };
        }
        return cartItem;
      });
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity }]);
    }
  };

  const [data, setData] = useState({
    CrackersList: [],
    Coupons: [],
    Categories: [],
  });

  const apiKey = "AIzaSyAflW6JJ0xrU-WWkTcWtd7k7i10ptMTR5A";
  const spreadsheetId = "155K13Dp0pC8XwgU0SYxpOAZWb-K6ndePNZwTX4C4CXU";

  const ranges = ["CrackersList", "Coupons", "Categories"];
  const urls = ranges.map(
    (range) =>
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}&majorDimension=ROWS`
  );

  useEffect(() => {
    Promise.all(urls.map((url) => fetch(url).then((res) => res.json())))
      .then((results) => {
        const newData = {};
        results.forEach((result, index) => {
          const sheetName = ranges[index];
          newData[sheetName] = result.values || [];
        });
        setData(newData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    console.log(Coupons);
  }, [cart]);

  useEffect(() => {
    const calculateTotal = () => {
      let totalPrice = 0;
      let totalItems = 0;
      let discounted = 0;
      let nonDiscounted = 0;
      cart.forEach((item, index) => {
        if (item.quantity === 0) {
          cart.splice(index, 1);
        }
        totalItems += item.quantity;
        totalPrice += Number(item[2]) * item.quantity;
        if (item[5] == "Discount") {
          discounted += Number(item[2]) * item.quantity;
        } else {
          nonDiscounted += Number(item[2]) * item.quantity;
        }
      });
      console.log("Coupons  ");
      console.log(Coupons);
      console.log(data)
      const offer = Coupons[0] && Coupons[0][0];
      const finalDicount = discounted * (offer / 100);
      setMrp(discounted);
      setDiscountedItems(finalDicount);
      setDicountTotal(discounted-finalDicount);
      setNonDiscountedItems(nonDiscounted);
      setTotal({ totalPrice:(dicountTotal+nonDiscountedItems), totalItems });
    };
    calculateTotal();
    console.log(cart);
  }, [cart]);

  const toggleCategory = (Category) => {
    setExpandedCategory(expandedCategory === Category ? null : Category);
  };

  const { CrackersList, Coupons, Categories } = data;

  return (
    <div className="fin">
      <center>
        <img
          src={logo}
          style={{
            width: "130px",
            height: "110px",
            borderRadius: "5px",
            marginBottom: "1px",
          }}
          alt="Logo"
        />
        <h4 style={{color:"white",marginBottom:"23px"}}>SRI SAIRAM CRACKERS</h4>
      </center>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="social">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <a href="https://wa.me/+919344953787" target="_blank">
              <img src={what} width="30px" height="30px"></img>
            </a>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <a href="#">
              <img src={ints} width="30px" height="30px"></img>
            </a>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <a href="mailto:devacrackersonline@email.com">
              <img src={email} width="30px" height="30px"></img>
            </a>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <a href="tel:+919344953787">
              <FaSquarePhone style={{ width: "30px", height: "30px" }} />
            </a>
          </div>
        </div>
      </div>
      <br />
      <div className="app-container">
        <div className="left-side">
          <h2 style={{ fontWeight: "bold" }}>Our Products</h2>
          <h6>Explore all our product collections</h6>
          <hr
            style={{
              height: "2px",
              borderWidth: 0,
              color: "gold",
              backgroundColor: "#DAA520",
            }}
          />
          {Categories &&
            Categories.slice(1).map((category, categoryIndex) => (
              <div key={categoryIndex} className="categorycss">
                <div
                  className="catname"
                  onClick={() => toggleCategory(category)}
                >
                  <div className="aro">
                    <div>
                      <h6 style={{ padding: "10px", fontWeight: "10px" }}>
                        {category}
                      </h6>
                    </div>
                    <div className="arrow">
                      {expandedCategory === category ? (
                        <FontAwesomeIcon
                          icon={faChevronUp}
                          size="1x"
                          onClick={() => toggleCategory(category)}
                          className="aro"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          size="1x"
                          onClick={() => toggleCategory(category)}
                          className="aro"
                        />
                      )}
                    </div>
                  </div>
                </div>
                {expandedCategory === category && (
                  <div className="cards-container">
                    {CrackersList &&
                      CrackersList.slice(1).map((dataVal, dataIndex) => {
                        if (dataVal[0] == category) {
                          return (
                            <div
                              className="d-flex justify-content-center"
                              key={dataIndex}
                            >
                              <Card data={dataVal} addToCart={addToCart} />
                            </div>
                          );
                        }
                        return null;
                      })}
                  </div>
                )}
              </div>
            ))}
        </div>
        <br />
        <div className="right-side">
          <OrderData
            total={dicountTotal+nonDiscountedItems}
            discountPercent={Coupons[0] && Coupons[0][0]}
            coupons={Coupons}
            cart={cart}
            mrpPrice={mrpPrice}
            discountedItems={discountedItems}
            dicountTotal={dicountTotal}
            nonDiscountedItems={nonDiscountedItems}
          />
        </div>
      </div>
      <div className=" roles">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div class="newone">
            Total Items : {total.totalItems} | Total Price : ₹{" "} 
            {(dicountTotal+nonDiscountedItems) ? dicountTotal+nonDiscountedItems : 0}
          </div>
        </div>
        <center style={{ padding: "20px", color: "white", paddingTop: "60px" }}>
          <p>&copy; 2024 Sri Sairam Crackers,Inc. All rights reserved</p>
        </center>
      </div>
    </div>
  );
}

export default App;
