import { DB_NAME, DB_PASSWORD, DB_USER } from '@env';
import { MongoClient } from 'mongodb';

const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.cgx1nco.mongodb.net/?retryWrites=true&w=majority`;

export const client = new MongoClient(uri);

export const db = client.db(DB_NAME);

export const connect = async () => {
  await client.connect();

  await client.db('admin').command({ ping: 1 });
  console.log('Connected successfully to server');
};
