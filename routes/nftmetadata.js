const express = require("express");
const router = express.Router();
const { addNft,addNfts, getAllNft, checkNftInDB } = require("./../controllers/nftmetadata")

router.route("/addnft").post(addNft);
router.route("/getAllNft").get(getAllNft);
router.route("/checkNft").post(checkNftInDB);
router.route("/addnfts").post(addNfts);

module.exports = router;