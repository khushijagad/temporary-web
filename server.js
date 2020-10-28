const express = require("express");
const path = require("path");
const app = express();
const ejs = require("ejs");
const db = require("./spatial_queries/combinedQueries");

// For parsing application/json
app.use(express.json());
app.set("view engine", "ejs");


// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set("views", path.join(__dirname, "views"));

app.post("/user/register", db.userRegister);

app.get("/test", (req, res) => {
  const developers = [
    { id: 1, name: "Bhargavi Sandur", age: 20 },
    { id: 2, name: "Khushi Jagad", age: 21 },
    { id: 3, name: "Ritika Mangla", age: 20 },
  ];
  //res.status(200).json(developers);
  res.render("test", { developers });
});

app.get("/user/drives/enroll/:user_id",(req, res) =>{
  db.activeDrives(req,res);
});

app.post("/user/drives/enroll/:user_id",db.participateCampaign)

app.post("/user/drives/enroll/filter/:user_id",db.filterCampaign)

const PORT = 5000;

app.listen(PORT, (err) => {
  console.log(`server running on port ${PORT}`);
});
