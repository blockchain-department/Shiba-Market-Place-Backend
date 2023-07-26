const express = require("express");
const router = express.Router();
const { listNft, getAllListedNfts, unlistNft } = require("./../controllers/listnft")

router.route("/listnft").post(listNft);
router.route("/allListedNfts").get(getAllListedNfts);
router.route("/unlistnft").post(unlistNft)
module.exports = router;    