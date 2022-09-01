import { connectDatabase, insertDocument } from "../../helpers/db-utils";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connectiong to the database failed!" });
      return;
    }
    try {
      await insertDocument(client, "emails", { email: userEmail });
      res.status(201).json({ message: "Signed up!" });
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
    }
  }
};

export default handler;
