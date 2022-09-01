import { MongoClient } from "mongodb";
import { getAllDocuments } from "../../../helpers/db-utils";
const url =
  "mongodb+srv://vlada:H2gAC5Lk@cluster0.7art7wy.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);

const handler = async (req, res) => {
  await client.connect();
  const collection = client.db("events").collection("comments");

  const eventId = req.query.eventId;
  if (req.method === "POST") {
    const { email, name, text } = req.body;
    if (
      !email ||
      !email.includes(
        "@" || !name || name.trim() === "" || !text || text.trim() === ""
      )
    ) {
      res.status(422).json({ message: "Unvalid input." });
      return;
    }
    const newComment = {
      email,
      name,
      text,
      eventId,
    };
    const result = await collection.insertOne(newComment);

    newComment.id = result.insertedId;

    res.status(201).json({ message: "Added comment!", comment: newComment });
  }
  if (req.method === "GET") {
    const documents = await getAllDocuments(
      collection,
      { _id: -1 },
      { eventId: eventId }
    );

    res.status(200).json({ comments: documents });
  }
  client.close();
};

export default handler;
