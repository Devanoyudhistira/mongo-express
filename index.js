import express from "express";
import getdata from "./database/get.js";
import postdata from "./database/create.js";
import deletedata from "./database/delete.js";
import finddata from "./database/single.js";
import update from "./database/update.js";
import "dotenv/config";
const app = express();
const port = process.env.port || 3000;
import cors from "cors";

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/", (req, res) =>
  res.status(200).json({ massage: "welcome to the api", code: 200 })
);
app.use("/get", getdata);
app.use("/post", postdata);
app.use("/delete", deletedata);
app.use("/find", finddata);
app.use("/update", update);

app.use((req,res) => res.status(404).json({
"status-code":404,
"massage":"wrong http"
}))

app.listen(port, () => console.log(`http://localhost:${port}`));

export default app
