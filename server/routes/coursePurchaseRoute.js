const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated.js");
const {
  createCheckoutSession,
  verifyPayment,
  getCourseDetaisWithPurchaseStatus,
  getAllPurchasedCourse,
} = require("../controllers/coursePurchaseController.js");

router
  .route("/checkout/create-checkout-session")
  .post(isAuthenticated, createCheckoutSession);
router.post("/checkout/verify-payment", isAuthenticated, verifyPayment);
router.get(
  "/course/:courseId/detail-with-status",
  isAuthenticated,
  getCourseDetaisWithPurchaseStatus
);
router.get("/purchasedcourse", isAuthenticated, getAllPurchasedCourse);

module.exports = router;
