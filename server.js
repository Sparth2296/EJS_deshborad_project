const express = require("express");
const app = express();
const port = 3000;
const db = require("./config/db");
const path = require("path");
const session = require("express-session");
const expressLayouts = require('express-ejs-layouts');

// View Engine
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set('layout', 'partials/layout');
app.set("views", path.join(__dirname, "views"));

// Body Parser
app.use(express.urlencoded({ extended: true }));

// Static Files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static("public"));

// Session
app.use(
  session({
    secret: "supersecret",
    resave: false,
    saveUninitialized: true
  })
);



// Make session user available in all EJS files
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Router
const router = require("./Router/router");
app.use("/", router);

// Start Server
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
