const express = require("express");
const router = express.Router();
const {
  createProperty,
  getSingleProperty,
  getAllProperties,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyController");
const { authenticate } = require("../middleware/universalAuthMiddleware");

router.route("/").post(authenticate, createProperty).get(getAllProperties);
router
  .route("/:id")
  .get(getSingleProperty)
  .patch(authenticate, updateProperty)
  .delete(authenticate, deleteProperty);

module.exports = router;
