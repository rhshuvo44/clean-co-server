const express = require("express");
const app = express();
const cors = require(cors);
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");

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

        const collection = client.db("test").collection("devices");
      // Query for a movie that has the title 'The Room'
      const query = { title: "The Room" };
      const options = {
        // sort matched documents in descending order by rating
        sort: { "imdb.rating": -1 },
        // Include only the `title` and `imdb` fields in the returned document
        projection: { _id: 0, title: 1, imdb: 1 },
      };
      const movie = await movies.findOne(query, options);
      // since this method returns the matched document, not a cursor, print it directly
      console.log(movie);
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);













app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
