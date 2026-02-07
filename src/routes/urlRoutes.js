const express = require("express");
const router = express.Router();
const urlController = require("../controllers/urlController");

router.post("/shorten", urlController.create);
router.get("/urls", urlController.getAll);

module.exports = router;
