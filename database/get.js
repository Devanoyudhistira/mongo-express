import express from "express";
const router = express.Router()
import "dotenv/config"
import { MongoClient } from "mongodb"
let db
const mongourl = process.env.mongourl;
const documents = process.env.documents
const client = new MongoClient(mongourl)

const connection = async () => {
   try {
    await client.connect()
    db = client.db(documents)
    console.log("connected success")
   } catch (error) {
    console.log(error + "failed")
   }
}
connection()

const getdata = async (req,res,next) => {
    const collection = db.collection("blog");
    try {
        const documents = await collection.find().toArray();
        req.blogdata = documents
        next()
    } catch (error) {
       console.log(error) 
    }
    
}

router.use(getdata)

router.get("/",(req,res) => res.json(req.blogdata))
export default router
