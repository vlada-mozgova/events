import { MongoClient } from "mongodb";
const url =
  "mongodb+srv://vlada:H2gAC5Lk@cluster0.7art7wy.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);

const handler = async (req, res) => {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    await client.connect();
    const collection = client.db("newsletter").collection("emails");
    await collection.insertOne({ email: userEmail });

    client.close();

    res.status(201).json({ message: "Signed up!" });
  }
};

export default handler;
