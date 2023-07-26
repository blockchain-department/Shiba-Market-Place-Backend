const express = require("express");
const router = express.Router();
const { listNft, getAllListedNfts } = require("./../controllers/listnft")

router.route("/listnft").post(listNft);
router.route("/allListedNfts").get(getAllListedNfts);
module.exports = router;