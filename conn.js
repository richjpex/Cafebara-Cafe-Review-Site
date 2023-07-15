const {MongoClient} = require("mongodb");

const mongoURI = process.env.MONGODB_URI;
const client = new MongoClient(mongoURI);

function connectToMongo (callback) {
    client.connect().then((client) => {
        return callback();
    }).catch( err => {
        callback(err);
    })
}

function getDb(dbName = process.env.DB_NAME) {
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

module.exports = {
    connectToMongo: connectToMongo,
    uri: mongoURI,
    client: client,
    getDb: getDb
}

