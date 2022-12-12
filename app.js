const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const indexRoute = require("./routes/index");
const authRoute = require("./routes/auth");
const getAnswersRoute = require("./routes/getAnswers");
const fakeWebRoute = require("./routes/fakeWeb.js");

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(indexRoute);
app.use(authRoute);
app.use(getAnswersRoute);
app.use(fakeWebRoute);

app.use((res, req) => {
  req.send("Page not found");
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
