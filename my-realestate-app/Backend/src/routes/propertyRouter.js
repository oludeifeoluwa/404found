const express = require("express");
const router = express.Router();
const {
  createProperty,
  getSingleProperty,
  getAllProperties,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyController");
const { authenticateAgent } = require("../middleware/agentAuthMiddleware");

router
  .route("/")
  .post(authenticateAgent, createProperty)
  .get(getAllProperties);
router
  .route("/:id")
  .get(getSingleProperty)
  .patch(authenticateAgent, updateProperty)
  .delete(authenticateAgent, deleteProperty);

module.exports = router;
