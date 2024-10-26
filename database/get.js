import express from "express";
const router = express.Router();
import "dotenv/config";
import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.mongourl;
const mongourl =  process.env.MONGODB_URI || process.env.MONGODB_URL_BLOG || process.env.mongourl;
// const mongourl = process.env.mongourl || process.env.MONGODB_URI || process.env.MONGODB_URL_BLOG;
const documents ="production"
const client = new MongoClient(uri,{

  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const connection = async () => {
   try {
    await client.connect();
    await  client.db().command({ ping: 1 });
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

router.get("/", (req, res) => {
  const secretkey = req.get("frontend-secret")
  if(secretkey !== "2223"){
    return res.status(403).json({"code":403, "message": "unauthorized" });
  }
  else{
  res.status(200).json(req.blogdata)}
});
export default router;
