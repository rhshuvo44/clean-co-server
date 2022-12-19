const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uxp2rtp.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    client.connect();
    const servicesCollection = client.db("clean-co").collection("service");
    const ordersCollection = client.db("clean-co").collection("order");

    //! get all service
    app.get("/get-service", async (req, res) => {
      const result = await servicesCollection.find().toArray();
      res.send(result);
    });
    app.get("/get-service/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await servicesCollection.findOne(query);
      res.send(result);
    });
    // add new service
    app.post("/add-service", async (req, res) => {
      const data = req.body;
      const result = await servicesCollection.insertOne(data);
      res.send(data);
    });
    // update a service
    app.put("/update-service/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = { $set: req.body };
      const result = await servicesCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });
    // deleted a service
    app.delete("/deleted-service/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await servicesCollection.deleteOne(query);
      res.send(result);
    });
    // add new service order
    app.post("/order", async (req, res) => {
      const data = req.body;
      const result = await ordersCollection.insertOne(data);
      res.send(data);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
