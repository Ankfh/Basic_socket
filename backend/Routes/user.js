const express = require("express");
const router = express.Router();
// const upload = require("../helper/upload");

const {
  userSignup,
  getAllUser,
  userLogin,
} = require("../Controller/userController");

router.post("/register", userSignup);
router.get("/getall", getAllUser);
router.post("/login", userLogin);

module.exports = router;
