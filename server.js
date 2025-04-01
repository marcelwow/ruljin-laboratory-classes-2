const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const config = require("./config");
const { requestRouting } = require("./routing/routing");


const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(morgan("dev"));


app.use("/", requestRouting);


app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
  console.error(`Błąd 404: ${req.url} nie istnieje.`);
});


app.listen(config.PORT, () => {
  console.log(`Serwer działa na: http://localhost:${config.PORT}`);
});
