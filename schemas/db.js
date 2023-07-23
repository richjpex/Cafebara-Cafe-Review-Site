import mongoose from 'mongoose';

const url = process.env.MONGODB_URI;

const database = {

    connect: function () {
        mongoose.connect(url + 'CAFEBARA').then(function() {
            console.log('Connected to: ' + url);
        }).catch(function(error) {
            console.log(error)
        });
    },

    insertOne: function(model, doc, callback) {
        const newDoc = new model(doc);
        newDoc.save(function(error, result) {
            if(error) { 
                console.log(error);
                return callback(false);
            }
            console.log('Added ' + result);
            return callback(result);
        });
    },

    insertMany: function(model, docs, callback) {

        const newDocs = [];
        for(let i = 0; i < docs.length; i++) {
            new model(docs[i]).save(function(error, result) {
                if(error) {
                    console.log(error);
                    return callback(false);
                }
                console.log('Added ' + result);
                return callback(result);4
            });
        }
    },

    findOne: async function(model, query, projection) {
        try {
            const result = await model.findOne(query, projection).exec();
            return result;
        } catch (error) {
            console.error(error);
            return null;
        }
        
    },

    findMany: function(model, query, projection, callback) {
        model.find(query, projection, function(error, result) {
            if(error) { 
                console.log(error);
                return callback(false);
            }
            return callback(result);
        });
    },

    updateOne: function(model, filter, update, callback) {
        model.updateOne(filter, update, function(error, result) {
            if(error) { 
                console.log(error);
                return callback(false);
            }
            console.log('Document modified: ' + result.nModified);
            return callback(true);
        });
    },

    updateMany: function(model, filter, update, callback) {
        model.updateMany(filter, update, function(error, result) {
            if(error) { 
                console.log(error);
                return callback(false);
            }
            console.log('Documents modified: ' + result.nModified);
            return callback(true);
        });
    },

    deleteOne: function(model, conditions, callback) {
        model.deleteOne(conditions, function (error, result) {
            if(error) { 
                console.log(error);
                return callback(false);
            }
            console.log('Document deleted: ' + result.deletedCount);
            return callback(true);
        });
    },

    deleteMany: function(model, conditions, callback) {
        model.deleteMany(conditions, function (error, result) {
            if(error) { 
                console.log(error);
                return callback(false);
            }
            console.log('Document deleted: ' + result.deletedCount);
            return callback(true);
        });
    }

}

export default database;