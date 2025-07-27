const express = require("express");
const {
  getAllQuery,
  deleteQuery,
  queryRegister,
  replyToQuery,getQueryReply
} = require("../controllers/contactUsController");
const isAuthenticated = require("../middleware/isAuthenticated");
const router = express.Router();

router.post("/querycreate", isAuthenticated, queryRegister);
router.get("/getallquery", isAuthenticated, getAllQuery);
router.delete("/:queryId/deletequery", isAuthenticated, deleteQuery);
router.put("/:queryId/replytoquery", isAuthenticated, replyToQuery);
router.get("/getqueryreply", isAuthenticated, getQueryReply);


module.exports = router;
