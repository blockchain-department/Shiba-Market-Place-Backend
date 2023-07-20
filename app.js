const express = require("express")
const dotenv = require('dotenv');
const app = express();
const connectDB = require("./db/connect");
const bodyParser = require('body-parser');
var cors = require('cors')
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;
dotenv.config();

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