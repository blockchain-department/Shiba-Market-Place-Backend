const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    nft_id: {
        type: mongoose.Schema.ObjectId,
        require: true,
    },
    token_id: {
        type: String,
        required: [true, "Please enter tokenid"]
    },
    price: {
        type: Number,
        required: [true, "Please enter nftPrice"]
    }
})

module.exports = mongoose.model("ListNft", productSchema);