import { MongoClient } from "mongodb";
import "dotenv/config";
import express from "express";
const router = express.Router();
const mongourl = process.env.mongourl;
const documents = process.env.documents;
const client = new MongoClient(mongourl);
let db;

const connection = async () => {
  try {
    await client.connect();
    db = client.db(documents);
  } catch (error) {
    console.log(error + "failed");
  }
};
connection()

const postblog = async (req, res, next) => {
  const collection = db.collection("blog");
  await collection.insertOne(req.body);
  next();
};

router.use(postblog)

router.post("/",(req,res) => {
   const {contents,sender} = req.body
      if(contents && sender){
      res.status(201).json({"data":req.body,massage:"insert data success","status-code":201})}
      else{
         res.status(403).json({massage:"insert data failed",data:req.method})
      }
   }
)

router.use((req,res) => res.status(405).send({ message: 'Method Not Allowed' }))

export default router;