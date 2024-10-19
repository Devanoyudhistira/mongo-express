import express from "express";
const router = express.Router();
import "dotenv/config";
import { MongoClient,ObjectId } from "mongodb";
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

const deleteblog = async (req, res, next) => {
  const collection = db.collection("blog");
  await collection.deleteOne({_id:new ObjectId(req.body.id) });
  next();
};

router.use(deleteblog);

router.delete("/", (req, res) => {
  const { id } = req.body;
  if (id) {
    res.status(200).json({
      status: 200,
      massage: "delete success",
      item:id
    });
  } else {
    res.status(400).json({
      status: 400,
      massage: "delete failed",
      
    });
  }
});

export default router;
