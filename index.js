const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const login = require("./routes/login/handler.js");
const signup = require("./routes/signup/handler.js");
const db = require("./database/index.js");
const PORT = 3000;

app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(morgan("dev"));

app.use("/auth/signup", signup);
app.use("/auth/login", login);
app.use("/auth/verify", signup);

app.use("/login", login);
app.use("/signup", signup);

app.get("/", (req, res) => {
  res.send("working the applicatio eninfnn");
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
