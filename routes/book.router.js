const express = require("express");
const router = express.Router();
const { USER_TYPE } = require("../json/enums.json");

const {
  BOOK: { VALIDATOR, APIS },
} = require("../controllers");

router.get("/", VALIDATOR.fetch, APIS.fetch);

router.post("/", VALIDATOR.create, APIS.create);

router.put("/:_id", VALIDATOR.update, APIS.update);

router.delete("/:_id", VALIDATOR.delete, APIS.delete);
module.exports = router;
