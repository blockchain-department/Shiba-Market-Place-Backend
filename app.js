const express = require("express")
const dotenv = require('dotenv');
const app = express();
const connectDB = require("./db/connect");
const bodyParser = require('body-parser');
const nft_Route = require('./routes/nftmetadata')
const list_Route = require('./routes/listnft')
const errorHandler = require('./middleware/errorHandler');
var cors = require('cors')
const corsOptions = {
    origin: "*",
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
dotenv.config();
app.use(bodyParser.json());
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.use('/api', nft_Route);
app.use('/api', list_Route),

    app.get("/", (req, res) => {
        res.send("Hi,I am live");
    });


const Start = async () => {
    try {
        await connectDB(process.env.MANGODB_URL);
        app.listen(PORT, () => {
            console.log(`Running on port ${PORT}`);
        });
    } catch (error) {
        console.log('error', error);
    }
}

Start();