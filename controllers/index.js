module.exports = {
  getIndex(req, res) {
    res.render("index", {
      path: "/",
      pageTitle: "Index",
    });
  },
};
