
const express = require("express");
const path = require("path");
const app = express();


const PORT = process.env.PORT || 3000;

const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static(path.join(__dirname, "public")));

const apiPostRoutes = require("./routes/apiPostRoutes");
const apiGetRoutes = require("./routes/apiGetRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
app.use(apiPostRoutes);
app.use(apiGetRoutes);
//app.use("./routes/apiPutRoutes");
//app.use("./routes/apiDeleteRoutes");
app.use(htmlRoutes);

db.sequelize.sync({ force: true }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT: " + PORT);
    });
});