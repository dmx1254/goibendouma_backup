const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const cors = require("cors");

require("./database/db");

// const { checkUser } = require("./middleware/auth.middleware");

const app = express();

const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:4000"],
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

app.disable("x-powered-by");

const serverRoutes = require("./routes/server");
const soldeRoutes = require("./routes/solde.router");

// app.get("*", checkUser);

const userRoutes = require("./routes/user.routes");
const checkEmailRouter = require("./routes/checkEmail");
const codeRouter = require("./routes/code");
const ExchangeRoutes = require("./routes/exhange");
const orderRoutes = require("./routes/order.router");
const euroRoutes = require("./routes/rateEuro.router");
const dollarRoutes = require("./routes/rateDollar.router");
const usdtRoutes = require("./routes/rateUsdt.router");
const cnyRoutes = require("./routes/rateCny.router");
const buyRoutes = require("./routes/buy.routes");
const soldeOrderRoutes = require("./routes/solde.order.route");
const connectRoutes = require("./routes/connect.route");

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());

app.use("/goapi/users", userRoutes);
app.use("/goapi/server", serverRoutes);
app.use("/goapi/checkemail", checkEmailRouter);
app.use("/goapi/code", codeRouter);
app.use("/goapi/exchange", ExchangeRoutes);
app.use("/goapi/solde", soldeRoutes);
app.use("/goapi/order", orderRoutes);
app.use("/goapi/buy", buyRoutes);
app.use("/goapi/euro", euroRoutes);
app.use("/goapi/dollar", dollarRoutes);
app.use("/goapi/usdt", usdtRoutes);
app.use("/goapi/cny", cnyRoutes);
app.use("/goapi/soldeorder", soldeOrderRoutes);
app.use("/goapi/connect", connectRoutes);

app.listen(process.env.PORT, () =>
  console.log(`server running on port ${process.env.PORT}`)
);
