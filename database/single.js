import express from "express";
const router = express.Router();
import "dotenv/config";
import { MongoClient } from "mongodb";
let db;
const mongourl = process.env.mongourl;
const documents = process.env.documents;
const client = new MongoClient(mongourl);

const connection = async () => {
  try {
    await client.connect();
    db = client.db(documents);
    console.log("connected success");
  } catch (error) {
    console.log(error + "failed");
  }
};

connection()

router.get("/:target", (async (req,res) => {
    const {target} = req.params
    const collection = db.collection("blog")
    const finddocument = await collection.find({"contents.blog":{$regex:target, $options: 'i' }}).toArray()
    res.status(201).send(finddocument)
}))

export default router