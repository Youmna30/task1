const express = require('express');
const router = express.Router();
const usersController = require('../controller/Users');
const checkAuth = require('../middleware/check');

router.post("/signup",usersController.signup);
router.post("/login",usersController.login);
router.delete("/:userId",checkAuth,usersController.delete_user);
router.get("/",checkAuth,usersController.get_all_users);
router.put("/:userId",checkAuth,usersController.update_user);

module.exports =router;
