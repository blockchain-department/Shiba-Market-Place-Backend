
// Excel sheet data
const names = [
    "William Hall",
    "Daniel Phillips",
    "Matthew Ward",
    "James Lee",
    "Alexander Johnson",
    "Christopher Young",
    "Benjamin Butler",
    "William Clark",
    "Alexander Baker",
    "Daniel Hill",
    "Michael Murphy",
    "Samuel Stewart",
    "Noah Richardson",
    "Samuel Mitchell",
    "Joseph Adams",
    "James Murphy",
    "William Hughes",
    "Michael Turner",
    "Andrew Carter",
    "Noah Scott",
    "Michael Martinez",
    "Benjamin Cooper",
    "Alexander Kelly",
    "Joseph Cook",
    "Andrew Wright",
    "Benjamin Anderson",
    "Christopher Reed",
    "Joseph King",
    "Matthew Simmons",
    "James Nelson",
    "Christopher Wilson",
    "Joseph Davis",
    "Andrew Thompson",
    "Noah Garcia",
    "Samuel Walker",
    "Daniel Wright",
    "Matthew Robinson",
    "James Torres",
    "William Parker",
    "Michael Lewis",
    "Alexander Smith",
    "Benjamin Adams",
    "Christopher Martinez",
    "Joseph Young",
    "Andrew Clark",
    "Noah Davis",
    "Samuel Anderson",
    "Daniel Johnson",
    "Matthew Turner",
    "James Reed",
    "William King",
    "Michael Wright",
    "Alexander Lewis",
    "Benjamin Ward",
    "Christopher Mitchell",
    "Joseph Hall",
    "Andrew Murphy",
    "Noah Baker",
    "Samuel Phillips",
    "Daniel Green",
    "Matthew Lee",
    "James Thompson",
    "William Hill",
    "Michael Scott",
    "Alexander Carter",
    "Benjamin Richardson",
    "Christopher Stewart",
    "Joseph Phillips",
    "Andrew Simmons",
    "Noah Mitchell",
    "Samuel Nelson",
    "Daniel Hughes",
    "Matthew Murphy",
    "James Kelly",
    "William Butler",
    "Michael Cooper",
    "Alexander Cook",
    "Benjamin Stewart",
    "Christopher Phillips",
    "Joseph Reed",
];
const rarities = [
    {
        name: "common",
        count: 30,
        powerRange: { min: 10, max: 100 },
        probability: 0.4,
    },
    {
        name: "uncommon",
        count: 20,
        powerRange: { min: 100, max: 200 },
        probability: 0.3,
    },
    {
        name: "rare",
        count: 15,
        powerRange: { min: 200, max: 350 },
        probability: 0.2,
    },
    {
        name: "epic",
        count: 10,
        powerRange: { min: 350, max: 600 },
        probability: 0.08,
    },
    {
        name: "legendary",
        count: 5,
        powerRange: { min: 600, max: 1500 },
        probability: 0.02,
    },
];
const positions = [
    "GK",
    "LF",
    "RF",
    "CF",
    "SW",
    "ST",
    "CB",
    "LB",
    "RB",
    "RS",
    "LS",
    "LM",
    "RM",
];
const imageUrls = [
    "https://data.ball.exchange/images/NFT/Common/Common_1.png",
    "https://data.ball.exchange/images/NFT/Common/Common_2.png",
    "https://data.ball.exchange/images/NFT/Common/Common_3.png",
    "https://data.ball.exchange/images/NFT/Common/Common_4.png",
    "https://data.ball.exchange/images/NFT/Common/Common_5.png",
    "https://data.ball.exchange/images/NFT/Common/Common_6.png",
    "https://data.ball.exchange/images/NFT/Common/Common_7.png",
    "https://data.ball.exchange/images/NFT/Common/Common_8.png",
    "https://data.ball.exchange/images/NFT/Common/Common_9.png",
    "https://data.ball.exchange/images/NFT/Common/Common_10.png",
    "https://data.ball.exchange/images/NFT/Common/Common_11.png",
    "https://data.ball.exchange/images/NFT/Common/Common_12.png",
    "https://data.ball.exchange/images/NFT/Common/Common_13.png",
    "https://data.ball.exchange/images/NFT/Common/Common_14.png",
    "https://data.ball.exchange/images/NFT/Common/Common_15.png",
    "https://data.ball.exchange/images/NFT/Common/Common_16.png",
    "https://data.ball.exchange/images/NFT/Common/Common_17.png",
    "https://data.ball.exchange/images/NFT/Common/Common_18.png",
    "https://data.ball.exchange/images/NFT/Common/Common_19.png",
    "https://data.ball.exchange/images/NFT/Common/Common_20.png",
    "https://data.ball.exchange/images/NFT/Common/Common_21.png",
    "https://data.ball.exchange/images/NFT/Common/Common_22.png",
    "https://data.ball.exchange/images/NFT/Common/Common_23.png",
    "https://data.ball.exchange/images/NFT/Common/Common_24.png",
    "https://data.ball.exchange/images/NFT/Common/Common_25.png",
    "https://data.ball.exchange/images/NFT/Common/Common_26.png",
    "https://data.ball.exchange/images/NFT/Common/Common_27.png",
    "https://data.ball.exchange/images/NFT/Common/Common_28.png",
    "https://data.ball.exchange/images/NFT/Common/Common_29.png",
    "https://data.ball.exchange/images/NFT/Common/Common_30.png",
    "https://data.ball.exchange/images/NFT/Uncommon/Uncommon_16.png",
    "https://data.ball.exchange/images/NFT/Uncommon/Uncommon_2.png",
    "https://data.ball.exchange/images/NFT/Uncommon/Uncommon_8.png",
    "https://data.ball.exchange/images/NFT/Uncommon/Uncommon_6.png",
    "https://data.ball.exchange/images/NFT/Uncommon/Uncommon_1.png",
    "https://data.ball.exchange/images/NFT/Uncommon/Uncommon_19.png",
    "https://data.ball.exchange/images/NFT/Uncommon/Uncommon_4.png",
    "https://data.ball.exchange/images/NFT/Uncommon/Uncommon_10.png",
    "https://data.ball.exchange/images/NFT/Uncommon/Uncommon_14.png",
    "https://data.ball.exchange/images/NFT/Uncommon/Uncommon_3.png",
    "https://data.ball.exchange/images/NFT/Uncommon/Uncommon_18.png",
    "https://data.ball.exchange/images/NFT/Uncommon/Uncommon_17.png",
    "https://data.ball.exchange/images/NFT/Uncommon/Uncommon_12.png",
    "https://data.ball.exchange/images/NFT/Uncommon/Uncommon_9.png",
    "https://data.ball.exchange/images/NFT/Uncommon/Uncommon_7.png",
    "https://data.ball.exchange/images/NFT/Uncommon/Uncommon_13.png",
    "https://data.ball.exchange/images/NFT/Uncommon/Uncommon_20.png",
    "https://data.ball.exchange/images/NFT/Uncommon/Uncommon_11.png",
    "https://data.ball.exchange/images/NFT/Uncommon/Uncommon_5.png",
    "https://data.ball.exchange/images/NFT/Uncommon/Uncommon_15.png",
    "https://data.ball.exchange/images/NFT/Rare/Rare_5.png",
    "https://data.ball.exchange/images/NFT/Rare/Rare_7.png",
    "https://data.ball.exchange/images/NFT/Rare/Rare_12.png",
    "https://data.ball.exchange/images/NFT/Rare/Rare_10.png",
    "https://data.ball.exchange/images/NFT/Rare/Rare_4.png",
    "https://data.ball.exchange/images/NFT/Rare/Rare_3.png",
    "https://data.ball.exchange/images/NFT/Rare/Rare_6.png",
    "https://data.ball.exchange/images/NFT/Rare/Rare_8.png",
    "https://data.ball.exchange/images/NFT/Rare/Rare_9.png",
    "https://data.ball.exchange/images/NFT/Rare/Rare_2.png",
    "https://data.ball.exchange/images/NFT/Rare/Rare_11.png",
    "https://data.ball.exchange/images/NFT/Rare/Rare_1.png",
    "https://data.ball.exchange/images/NFT/Rare/Rare_15.png",
    "https://data.ball.exchange/images/NFT/Rare/Rare_14.png",
    "https://data.ball.exchange/images/NFT/Rare/Rare_13.png",
    "https://data.ball.exchange/images/NFT/Epic/Epic_8.png",
    "https://data.ball.exchange/images/NFT/Epic/Epic_6.png",
    "https://data.ball.exchange/images/NFT/Epic/Epic_9.png",
    "https://data.ball.exchange/images/NFT/Epic/Epic_7.png",
    "https://data.ball.exchange/images/NFT/Epic/Epic_4.png",
    "https://data.ball.exchange/images/NFT/Epic/Epic_10.png",
    "https://data.ball.exchange/images/NFT/Epic/Epic_1.png",
    "https://data.ball.exchange/images/NFT/Epic/Epic_5.png",
    "https://data.ball.exchange/images/NFT/Epic/Epic_3.png",
    "https://data.ball.exchange/images/NFT/Epic/Epic_2.png",
    "https://data.ball.exchange/images/NFT/Legendary/Legendary_1.png",
    "https://data.ball.exchange/images/NFT/Legendary/Legendary_2.png",
    "https://data.ball.exchange/images/NFT/Legendary/Legendary_3.png",
    "https://data.ball.exchange/images/NFT/Legendary/Legendary_4.png",
    "https://data.ball.exchange/images/NFT/Legendary/Legendary_5.png",
];
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to save JSON object to a file


// Function to generate random metadata JSON object
function generateMetadata(index) {
    const name = names[index];
    const rarity = getRarity(name);
    const power = getRandomNumber(rarity.powerRange.min, rarity.powerRange.max);
    const position = getRandomPosition();

    const metadata = {
        name,
        attributes: [
            { trait_type: "Rarity", value: rarity.name },
            { trait_type: "Power", value: power },
            { trait_type: "Position", value: position },
        ],
        image: imageUrls[index],
    };

    return metadata;
}

// Function to get the rarity based on the name's index
function getRarity(name) {
    const index = names.indexOf(name);

    if (index === 1 || index < 30) {
        return rarities[0]; // For "William Hall" (index 0) and names at indices 1 to 30, use common rarity
    } else if (index < 50) {
        return rarities[1]; // For names from 31 to 50, use rare rarity
    } else if (index < 65) {
        return rarities[2]; // For names from 51 to 65, use epic rarity
    } else if (index < 75) {
        return rarities[3]; // For names from 51 to 65, use epic rarity
    } else {
        return rarities[4]; // For names from 66 to 80, use legendary rarity
    }
}

// Helper function to get a random position from the list
function getRandomPosition() {
    return positions[Math.floor(Math.random() * positions.length)];
}

// Function to generate and save a single JSON object

module.exports = function generateAndSaveJSONObject() {
    const index = Math.floor(Math.random() * names.length);
    const metadata = generateMetadata(index);
    return metadata;
}