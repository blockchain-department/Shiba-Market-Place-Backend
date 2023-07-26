const mongoose = require("mongoose");

const nftmetadataSchema = new mongoose.Schema({
    tokenId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    attributes: [
        {
            trait_type: { type: String, required: true },
            value: { type: String, required: true },
        },
    ],
})

// Define a projection to exclude "attributes._id" from the query results
const projection = {
    "attributes._id": 0,
};

// Apply the projection to the schema
nftmetadataSchema.set("toJSON", { virtuals: true, versionKey: false, transform: (_, ret) => { delete ret._id; return ret; } });
nftmetadataSchema.set("toObject", { virtuals: true, versionKey: false, transform: (_, ret) => { delete ret._id; return ret; } });

module.exports = mongoose.model("Nft", nftmetadataSchema);
