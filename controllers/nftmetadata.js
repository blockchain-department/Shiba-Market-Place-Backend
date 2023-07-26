const Nft = require("../modles/nftmetadata");
const dotenv = require('dotenv');
const asyncHandler = require("express-async-handler");

dotenv.config();
const addNft = asyncHandler(async (req, res) => {
    try {
        //const { name, price, feature, rating, company } = req.body;
        const { tokenId, name, image, attributes } = req.body;

        // Example: Create a new NFT metadata document and save it to MongoDB
        if (!tokenId || !name || !image) {
            res.status(400);
            throw new Error("All feilds are mandatory!")
        }



        const createNft = await Nft.create({
            tokenId,
            name,
            image,
            attributes
        });
        res.status(201).json({ products: createNft });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});
const getAllNft = asyncHandler(async (req, res) => {
    const { tokenId, company, name, featured, sort, select, page, limit } = req.query;
    const queryObject = {};

    if (tokenId) {
        queryObject.tokenId = tokenId;
    }
    if (company) {
        queryObject.company = company;
    }
    if (featured) {
        queryObject.featured = featured;
    }
    if (name) {
        queryObject.name = { $regex: name, $options: "i" };
    }

    // Use a projection to exclude "attributes._id"
    const projection = { "attributes._id": 0 };

    if (page) {
        let pagee = Number(req.query.page) || 1;
        let limitt = Number(req.query.limit) || 3;
        console.log("pageee", pagee);
        console.log("limit", limitt);

        let skip = (pagee - 1) * limitt;
        console.log("skip", skip);
        apiData = apiData.skip(skip).limit(limitt);
    }

    const data = await Nft.findOne(queryObject, projection);

    res.status(200).json(data);
});

const checkNftInDB = asyncHandler(async (req, res) => {
    const { name, power, position } = req.body;

    if (!name || !power || !position) {
        res.status(400);
        throw new Error("Name, power, and position attributes are mandatory!");
    }

    const nftInDb = await Nft.findOne({
        name: { $regex: name, $options: "i" },
        "attributes.trait_type": { $in: ["Power", "Position"] },
        $and: [
            { "attributes.trait_type": "Power", "attributes.value": power },
            { "attributes.trait_type": "Position", "attributes.value": position },
        ],
    });

    if (nftInDb) {
        res.status(200).json({ exists: true, nft: nftInDb });
    } else {
        res.status(200).json({ exists: false });
    }
});


module.exports = { addNft, getAllNft, checkNftInDB };
