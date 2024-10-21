import express from "express";
const router = express.Router();
import "dotenv/config";
import { MongoClient,ServerApiVersion } from "mongodb";
let db;
const mongourl = process.env.mongourl || process.env.MONGODB_URI;
const documents = process.env.documents;
const client = new MongoClient(mongourl,{
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const connection = async () => {
  try {
    await client.connect();
    console.log("connected success");
  } catch (error) {
    console.log(error + "failed");
  }
};

connection()

router.get("/:target", (async (req,res) => {
    const {target} = req.params
    const collection = client.db(documents).collection("blog");
    const finddocument = await collection.find({"contents.blog":{$regex:target, $options: 'i' }}).toArray()
    res.status(201).send(finddocument)
}))

export default router