import express from "express";
const router = express.Router();
import "dotenv/config";
import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.mongourl;
const mongourl = process.env.mongourl || process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const connection = async () => {
   try {
    await client.connect();
    client.db(documents).command({ ping: 1 });
    console.log("connected success");
   } catch (error) {
    console.log(error + "failed");
   }
};
connection();

const getdata = async (req, res, next) => {
  try {
    const collection = client.db(documents).collection("blog");
    const result = await collection.find().toArray();
    req.blogdata = result;
    next();
    } catch (error) {
    console.log(error);
}
};

router.use(getdata);

router.get("/", (req, res) => res.json(req.blogdata));
export default router;
