require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const nodemailer = require("nodemailer");
const path = require("path");
const bodyParser = require("body-parser");

// Enable CORS for all routes
const corsOptions = {
  origin: "http://localhost:3000", // restrict to this specific domain
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // limit allowed HTTP methods
  credentials: true, // enable cookies if necessary
  optionsSuccessStatus: 200 // response for successful OPTIONS request
};
app.use(cors(corsOptions));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files (for images)
app.use(express.static(path.join(__dirname, "public")));

// Middleware to parse JSON and urlencoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/placeOrder", async (req, res) => {
  const {
    cart,
    userData,
    MrpPrice,
    DiscountPrice,
    totalprice,
    nonDiscountedItems,
    grandtotalPrice,
  discount} = req.body;
  const billData = {
    cart,
    userData,
    MrpPrice,
    DiscountPrice,
    totalprice,
    nonDiscountedItems,
    grandtotalPrice,
    discount
  };

  try {
    // Render the HTML content using the template
    const htmlContent = await renderTemplate("bill", { bill: billData });

    // Send email with the HTML content
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use the service you're using, e.g. Gmail, Yahoo, etc.
      auth: {
        user: process.env.GMAIL_ID,
        pass: process.env.GMAIL_PASSWORD
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_ID, // Sender address
      to: [userData.email,process.env.GMAIL_ID], // Recipient's email
      subject: 'Your Order Receipt',
      html: htmlContent, // Set the HTML content as the email body
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).send({ error: "Failed to send email" });
      } else {
        console.log("Email sent: ");
        return res.status(200).send({ message: "Email sent successfully" });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Failed to generate email" });
  }
});
console.log(process.env.GMAIL_ID, process.env.GMAIL_PASSWORD);
const renderTemplate = (view, data) => {
  return new Promise((resolve, reject) => {
    app.render(view, data, (err, html) => {
      if (err) return reject(err);
      resolve(html);
    });
  });
};
app.listen(7000, () => {
  console.log("Server running on port 7000");
});
 
