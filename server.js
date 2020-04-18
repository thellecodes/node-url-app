const express = require("express");
const hbs = require("express-handlebars");
const dotenv = require("dotenv");
const morgan = require("morgan");

// Init app
const app = express();

// Load env
dotenv.config({ path: "./config.env" });

// Set view engine
app.set("view engine", "hbs");
app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultView: "main",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
    // helpers: hbsHelpers
  })
);

// Dev logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/:url", require("./middleware/conditional"));

// app.get("/login", (req, res) => {
//   res.render("login", {
//     title: "Loging",
//   });
// });

// app.get("/join", (req, res) => {
//   res.render("join", {
//     title: "Join",
//   });
// });
// app.get("/view", (req, res) => {
//   res.render("view", {
//     title: "View post",
//   });
// });

const PORT = process.env.PORT || 6000;

app.listen(PORT, () =>
  console.log(`Sever running at ${process.env.NODE_ENV} mode on port ${PORT}`)
);
