import express from "express";
const update = express.Router();
import "dotenv/config";
import { MongoClient, ObjectId ,ServerApiVersion} from "mongodb";
const mongourl = process.env.mongourl;
const documents = process.env.documents;
const client = new MongoClient(mongourl,{
  serverApi:{
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const connection = async () => {
  try {
    await client.connect();
    client.db(documents);
    console.log("connected success");
  } catch (error) {
    console.log(error + "failed");
  }
};

connection();

update.put("/", async (req, res) => {
  const { target, change } = req.body;
  const collection = client.db(documents).collection("blog");
  const updatedocument = await collection.updateOne(
    { _id:new ObjectId(target) },
    { $set: { "contents.blog": change } }
  );
  res.status(201).send({hasil:updatedocument.modifiedCount});
});

export default update