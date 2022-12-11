module.exports = {
  getLogin(req, res) {
    res.render("auth/login", {
      path: "/login",
      pageTitle: "Login",
    });
  },

  getRegister(req, res) {
    res.render("auth/register", {
      path: "/register",
      pageTitle: "Register",
    });
  },
};
