const Nft = require("../modles/nftmetadata");
const dotenv = require('dotenv');
const asyncHandler = require("express-async-handler");
const NFTMetaData = require('../nftscript/script');
const { Web3 } = require('web3');
dotenv.config();
const contractAbi = require('../ShibaFootballNFTAbi.json');
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.PROVIDER));
const contract = new web3.eth.Contract(contractAbi, process.env.CONTRACT);
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
const addNfts = asyncHandler(async (req, res) => {
    try {
        var owner = undefined;
        var _nftIDs = [];
        const tx = req.body;
        const result = await web3.eth.getTransactionReceipt(tx.tx);
        for (const log of result.logs) {
            const eventSignature = web3.eth.abi.encodeEventSignature('Transfer(address,address,uint256)')
            if (eventSignature == log.topics[0]) {
                var eventData = web3.eth.abi.decodeLog(
                    contract._jsonInterface.find(o => o.name == 'Transfer' && o.type == 'event').inputs,
                    log.data,
                    log.topics.slice(1)
                );
                owner = eventData[1];
                _nftIDs.push(eventData[2].toString());
            }
        };
        try{
            var NFTs = [];
            for (const tokenId of _nftIDs) {
                const metaDataNFT = NFTMetaData();
                const name = metaDataNFT.name;
                const image = metaDataNFT.image;
                const attributes = metaDataNFT.attributes;
                NFTs.push({
                    tokenId,
                    owner,
                    name,
                    image,
                    attributes
                });
            }
            if(NFTs.length > 0){
                Nft.insertMany(NFTs, { ordered: false, throwOnValidationError: true }).catch(err => {});
            }
        } catch (error) {
          //console.error(error);
        }
        var results = await Nft.find().where('tokenId').in(_nftIDs).sort({ tokenId: 'asc' }).exec();
        
        res.status(201).json({ nfts: results });
    } catch (error) {
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
module.exports = { addNft, addNfts, getAllNft, checkNftInDB };
