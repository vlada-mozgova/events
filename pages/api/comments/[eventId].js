import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from "../../../helpers/db-utils";

const handler = async (req, res) => {
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connectiong to the database failed!" });
    return;
  }

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
    try {
      const result = await insertDocument(client, "comments", newComment);
      newComment.id = result.insertedId;

      res.status(201).json({ message: "Added comment!", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
      return;
    }
  }
  if (req.method === "GET") {
    try {
      const documents = await getAllDocuments(
        client,
        "comments",
        { _id: -1 },
        { eventId: eventId }
      );
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: "Loading comments failed!" });
    }
  }
};

export default handler;
