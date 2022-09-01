import { MongoClient } from "mongodb";

export const connectDatabase = async () => {
  const url =
    "mongodb+srv://vlada:H2gAC5Lk@cluster0.7art7wy.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(url);
  await client.connect();
  return client;
};

export const insertDocument = async (client, collection, document) => {
  const coll = client.db("events").collection(collection);
  return await coll.insertOne(document);
};

export const getAllDocuments = async (
  client,
  collection,
  sort,
  filter = {}
) => {
  return await client
    .db("events")
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();
};
