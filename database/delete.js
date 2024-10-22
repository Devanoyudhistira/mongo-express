import express from "express";
const router = express.Router();
import "dotenv/config";
import { MongoClient,ObjectId,ServerApiVersion } from "mongodb";
let db;
const mongourl =  process.env.MONGODB_URI || process.env.MONGODB_URL_BLOG || process.env.mongourl;
const documents = process.env.documents || "production"
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
    client.db(documents).command({ping:1});
    console.log("connected success");
  } catch (error) {
    console.log(error + "failed");
  }
};
connection();

const deleteblog = async (req, res, next) => {
  const collection = client.db(documents).collection("blog");
  const result = await collection.deleteOne({_id:new ObjectId(req.body.id) });
  req.deletecount = result.deletedCount
  next();
};

router.use(deleteblog);

router.delete("/", (req, res) => {
  const { id } = req.body;
  if (id) {
    res.status(200).json({
      status: 200,
      massage: "delete success",
      deletecount: req.deletecount,
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
