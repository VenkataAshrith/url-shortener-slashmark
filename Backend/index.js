import express from 'express';
import Urls from './database.js';
import mongoose from 'mongoose';
import cors from 'cors';
const connectDB = async () => {
    try{
        await mongoose.connect("mongodb://localhost:27017/urlshortner");
        console.log("Connected to Database");
    }catch(error){
        console.log("Cannot connect to Database");
    }
}

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.get("/", (req, res)=>{
    res.send("<h1>URL Shortner</h1>");
});

app.get("/:id", async (req, res)=>{
    const {id} = req.params;
    const result = await Urls.findOne({id});
    return res.redirect(result.url);
});

app.post('/', async (req, res)=>{
    const {url} = req.body;
    const newURL = await Urls.create({'url': url});
    await newURL.save();
    return res.status(200).json({url: `http://localhost:5000/${newURL.id}`});
});

app.listen(5000, ()=>{
    console.log("Server running on PORT 5000");
});