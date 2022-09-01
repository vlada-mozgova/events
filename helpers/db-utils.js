export const getAllDocuments = async (collection, sort, filter = {}) => {
  return await collection.find(filter).sort(sort).toArray();
};
