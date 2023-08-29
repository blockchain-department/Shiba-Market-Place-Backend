const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    nft_id: {
        type: mongoose.Schema.ObjectId,
        require: true,
    },
    token_id: {
        type: Number,
        required: [true, "Please enter tokenid"],
        index: true,
        unique: true
    },
    price: {
        type: Number,
        required: [true, "Please enter nftPrice"]
    },
    userAddress: {
        type: String,
        required: [true, "Please enter userAddress"]
    }
})

module.exports = mongoose.model("ListNft", productSchema);