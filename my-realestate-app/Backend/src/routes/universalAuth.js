const express = require('express');
const router = express.Router();
const {login , logout} = require("../controllers/universalAuth")
const { authenticate } = require("../middleware/universalAuthMiddleware");

router.post('/login' , login)
router.post('/logout' , logout)
module.exports = router
