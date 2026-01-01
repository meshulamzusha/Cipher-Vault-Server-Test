import { MongoClient } from 'mongodb';

let collection;

export async function connectMongoDBUsersCollection() {
  try {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    collection = client.db(process.env.MONGO_DB_NAME).collection('users');
    console.log('MongoDB connected');

    return collection;
    
  } catch (error) {
    throw error
  }
}
