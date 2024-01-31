const express = require("express");

const UsersController = require("../controllers/users");

const router = express.Router();

router.post("/", UsersController.create);
router.post("/", UsersController.getUser);

module.exports = router;
