const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
require("./config/config.db");
const passport = require("passport");
const port = process.env.PORT || 5000;
const { addTable, dropTable } = require("./components/model/model");
// dropTable();
// addTable();
const routerArticle = require("./components/routers/article.router");
const routerAuth = require("./components/routers/auth.router");
const routerProfile = require("./components/routers/profile.router");
const routerPost = require("./components/routers/post.router");
const routerCerita = require("./components/routers/cerita.router");
const routerGenre = require("./components/routers/genre.router");
const routerTrends = require("./components/routers/trends.router");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

app.use("/api/v1", routerPost);
app.use("/api/v1/cerita", routerCerita);
app.use("/api/v1", routerAuth);
app.use("/api/v1/articles", routerArticle);
app.use("/api/v1", routerProfile);
app.use("/api/v1/genre", routerGenre);
app.use("/api/v1/trends", routerTrends);

app.listen(port, () => console.log(`port connected on ${port}`));
