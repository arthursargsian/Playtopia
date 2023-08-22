import bodyParser from "express";

const PORT = process.env.PORT || 7000;
import express from "express";
import cors from "cors";
import router from "./routes/";
import passportAuth from "./middlewares/headers.js";
import path from 'path';
import {fileURLToPath} from 'url';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import {Server} from "socket.io";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


const app = express();
app.use(express.json())
app.set('view engine', 'ejs');
app.use(cors());
app.use(logger('dev'));
app.use(cookieParser());
app.use(passportAuth);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(router);

app.use((err, req, res, next) => {

    res.status(422).json({
        message: err.message, status: err.status || 422
    })
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})