const express = require("express");
const router = express.Router();
const { listNft, getAllListedNfts, unlistNft, getNftsFiltered, updateNftPrice } = require("./../controllers/listnft")

router.route("/listnft").post(listNft);
router.route("/allListedNfts").get(getAllListedNfts);
router.route("/unlistnft").post(unlistNft);
router.route("/updateprice").post(updateNftPrice);
router.route("/listedNfts").get(getNftsFiltered);
module.exports = router;    