const express = require('express');
const router = express.Router();
const {createCheckoutSession} = require('../controllers/paymentController')
const { authenticate } = require("../middleware/universalAuthMiddleware");

router.post('/create-checout-session' ,authenticate, createCheckoutSession)

module.exports = router