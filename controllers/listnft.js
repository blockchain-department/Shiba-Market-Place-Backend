
const ListNft = require("../modles/listnft"); // Import the ListNft model
const Nft = require("../modles/nftmetadata");
const dotenv = require('dotenv');
const asyncHandler = require("express-async-handler");

const getMetaData = asyncHandler(
    async (req, res) => {
        const { data } = req.body;
        var metaDatas = await Nft.find().where('tokenId').in(data).sort({ tokenId: 'asc' }).exec();
        res.status(201).json({ success: true, result: metaDatas });
    }
);

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
   // const userAddress = req.query; // Assuming you are passing the user address as a parameter

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
    // const lowercasedUserAddress = userAddress?.userAddress.toLowerCase();

    // // Add the "owned" field to each NFT based on the userAddress
    // const NftsWithOwnership = Nfts.map((nft) => ({

    //     ...nft,
    //     owned: nft?.userAddress?.toLowerCase() === lowercasedUserAddress, // Check if the NFT is owned by the user
    // }));

    res.status(200).json(Nfts);
});
const paginatedNFTs = asyncHandler(async (req, res) => {
    const userAddress = req.query.userAddress;
    const rarities = req.query.rarities ? req.query.rarities.split(',') : [];
    const positions = req.query.positions ? req.query.positions.split(',') : [];
    const sorting = req.query.sorting || "default"; // Default to "newest" if sorting not provided
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 12;
    try {
        let aggregationPipeline = [
            {
                $lookup: {
                    from: "nfts",
                    localField: "nft_id",
                    foreignField: "_id",
                    as: "nft",
                },
            },
        ];

        if (rarities.length > 0) {
            aggregationPipeline.push({
                $match: {
                    "nft.0.attributes.value": { $in: rarities.map(rarity => rarity.toLowerCase()) },
                },
            });
        }

        if (positions.length > 0) {
            aggregationPipeline.push({
                $match: {
                    "nft.0.attributes.trait_type": "Position",
                    "nft.0.attributes.value": { $in: positions },
                },
            });
        }

        // Add sorting stages based on the chosen sorting option
        if (sorting === "default") {
            aggregationPipeline.push({
                $sort: { _id: -1 } // Sort by _id in descending order for newest listing
            });
        } else if (sorting === "price-asc") {
            aggregationPipeline.push({
                $sort: { price: 1 }
            });
        } else if (sorting === "price-desc") {
            aggregationPipeline.push({
                $sort: { price: -1 }
            });
        }
        const Nfts = await ListNft.aggregate(aggregationPipeline);
       //console.log(Nfts)

               const lowercasedUserAddress = userAddress?.toLowerCase();

        const NftsWithOwnership = Nfts.map((nft) => ({
            _id: nft._id,
            nft_id: nft.nft_id,
            token_id: nft.token_id,
            price: nft.price,
            userAddress: nft.userAddress,
            __v: nft.__v,
            nft: nft.nft[0],
            owned: nft?.userAddress?.toLowerCase() === lowercasedUserAddress,
        }));
        if (sorting === "likes-asc") {
            NftsWithOwnership.sort((a, b) => b.nft.attributes[1]?.value - a.nft.attributes[1]?.value);
        } else if (sorting === "likes-desc") {
            NftsWithOwnership.sort((a, b) => a.nft.attributes[1]?.value - b.nft.attributes[1]?.value);
        }

        const totalNFTs = NftsWithOwnership.length;
        const totalPages = Math.ceil(totalNFTs / perPage);

        const startIndex = (page - 1) * perPage;
        const endIndex = page * perPage;
        const nftsForPage = NftsWithOwnership.slice(startIndex, endIndex);

        const response = {
            currentPage: page,
            totalPages: totalPages,
            totalNFTs: totalNFTs,
            nfts: nftsForPage,
        };

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({ message: `An error occurred while fetching NFTs${error}` });
    }
});
module.exports = { NFTListing, getAllListedNfts, unlistNft, updateNftPrice, getNftsFiltered,paginatedNFTs, getMetaData };