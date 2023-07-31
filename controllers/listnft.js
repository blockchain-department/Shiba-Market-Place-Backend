
const ListNft = require("../modles/listnft"); // Import the ListNft model
const Nft = require("../modles/nftmetadata");
const dotenv = require('dotenv');
const asyncHandler = require("express-async-handler");

// Function to list an NFT
const NFTListing = asyncHandler(
    async (req, res) => {

        const { tokenId, listPrice, useraddress } = req.body;

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
            token_id: nftRecord.tokenId,
            price: listPrice, // Copy the token_id from the Nft record (if needed)
            userAddress: useraddress
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

const unlistNft = asyncHandler(async (req, res) => {
    try {
        const { token_id } = req.body;

        // Find the listed NFT record that matches the token_id
        const nft = await ListNft.findOne({ token_id });

        if (!nft) {
            res.status(404);
            throw new Error("Nft not found");
        }

        // Delete the found nft record from the database
        await ListNft.deleteOne({ token_id });
        res.status(200).send({ message: "Deleted" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

const updateNftPrice = asyncHandler(async (req, res) => {
    const { token_id, listPrice } = req.body;

    // Check if the NFT is already listed in the ListNft table
    const existingListNft = await ListNft.findOne({ token_id });

    if (!existingListNft) {
        res.status(404);
        throw new Error("NFT is not Listed!");

    }
    console.log("exsisting", existingListNft);
    // If the NFT is already listed, update the price with the new value
    existingListNft.price = listPrice;
    await existingListNft.save();

    // Return a success response
    res.status(200).json({ success: true, message: 'NFT price updated successfully' });
}
);


const getNftsFiltered = asyncHandler(async (req, res) => {
    const userAddress = req.query; // Assuming you are passing the user address as a parameter

    // Fetch all the listed NFTs along with the NFT details
    const Nfts = await ListNft.aggregate([
        {
            $lookup: {
                from: "nfts",
                localField: "nft_id",
                foreignField: "_id",
                as: "nft",
            },
        },
    ]);
    const lowercasedUserAddress = userAddress?.userAddress.toLowerCase();

    // Add the "owned" field to each NFT based on the userAddress
    const NftsWithOwnership = Nfts.map((nft) => ({

        ...nft,
        owned: nft?.userAddress?.toLowerCase() === lowercasedUserAddress, // Check if the NFT is owned by the user
    }));

    res.status(200).json(NftsWithOwnership);
});

module.exports = { NFTListing, getAllListedNfts, unlistNft, updateNftPrice, getNftsFiltered };