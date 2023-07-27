const express = require("express");
const router = express.Router();
const { listNft, getAllListedNfts, unlistNft, updateNftPrice } = require("./../controllers/listnft")

router.route("/listnft").post(listNft);
router.route("/allListedNfts").get(getAllListedNfts);
router.route("/unlistnft").post(unlistNft);
router.route("/updateprice").post(updateNftPrice);
module.exports = router;    