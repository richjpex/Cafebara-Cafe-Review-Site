import { MongoClient } from "mongodb";
import dotenv from 'dotenv';   // environment variables
dotenv.config();

export const mongoURI = process.env.MONGODB_URI;
export const client = new MongoClient(mongoURI);

export function connectToMongo (callback) {
    client.connect().then((client) => {
        return callback();
    }).catch( err => {
        callback(err);
    })
}

export function getDb(dbName = process.env.DB_NAME) {
    return client.db(dbName);
}

function signalHandler() {
    console.log("Closing connection");
    client.close();
    process.exit();

}

process.on('SIGNINT', signalHandler);
process.on('SIGTERM', signalHandler);
process.on('SIGQUIT', signalHandler);



