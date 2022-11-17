const expres = require("express");
const router = expres.Router();
const users = require("../controller/users");
const login = require("../controller/login");
const register = require("../controller/register");
const messages = require("../controller/Messages")
const settings = require('../controller/Settings')
const authorization = require("../middleware/authorization");
router.use("/login", login);
router.use("/register", register);
router.use("/users", authorization, users);
router.use('/chat/messages',authorization,messages)
router.use('/settings',authorization,settings)
module.exports = router;
