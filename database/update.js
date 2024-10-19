import express from "express";
const update = express.Router();
import "dotenv/config";
import { MongoClient, ObjectId } from "mongodb";
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

connection();

update.put("/", async (req, res) => {
  const { target, change } = req.body;
  const collection = db.collection("blog");
  const updatedocument = await collection.updateOne(
    { _id:new ObjectId(target) },
    { $set: { "contents.blog": change } }
  );
  res.status(201).send({hasil:updatedocument.modifiedCount});
});

export default update