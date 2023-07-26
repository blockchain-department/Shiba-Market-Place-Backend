
const ListNft = require('../modles/listnft'); // Import the ListNft model
const Nft = require("../modles/nftmetadata");
const dotenv = require('dotenv');
const asyncHandler = require("express-async-handler");

// Function to list an NFT
const listNft = asyncHandler(
    async (req, res) => {

        const { tokenId } = req.body;

        // Find the NFT record that matches the nftId
        const nftRecord = await Nft.findOne({ tokenId });

        if (!nftRecord) {
            // If NFT with the given nftId does not exist, return an error
            res.status(404)
            throw new Error("Nft does not exsits!")
        }

        // Create a new record in the listnft table
        const newListNft = new ListNft({
            nft_id: nftRecord.id, // Associate the Nft object ID with the listnft record
            token_id: nftRecord.tokenId, // Copy the token_id from the Nft record (if needed)
        });

        // Save the newListNft record to the database
        await newListNft.save();

        // Return a success response
        res.status(201).json({ success: true, message: 'NFT listed successfully' });

    }
);
const getAllListedNfts = asyncHandler(async (req, res) => {
    const Nfts = await ListNft.aggregate([
        {
            $lookup: {
                from: "nfts",
                localField: "nft_id",
                foreignField: "_id",
                as: "nft"

            }
        }
    ]);
    res.status(200).json(Nfts);
});

module.exports = { listNft, getAllListedNfts };