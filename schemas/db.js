import mongoose from 'mongoose';

const url = process.env.MONGODB_URI;

const database = {

    connect: function () {
        mongoose.connect(url + 'apdev_test').then(function() {
            console.log('Connected to: ' + url);
        }).catch(function(error) {
            console.log(error)
        });
    },

    insertOne: function(model, doc, callback) {
        const newDoc = new model(doc);
        newDoc.save().then(function(error, result) {
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
            new model(docs[i]).save().then(function(error, result) {
                if(error) {
                    console.log(error);
                    return callback(false);
                }
                console.log('Added ' + result);
                return callback(result);
            });
        }
    },

    findOne: function(model, query, callback) {
        model.findOne(query).then(function(result) {
            return callback(result);
        });
    },

    find: function(model, query, callback) {
        model.find(query).then(function(result) {
            return callback(result);
        });
    },

    findLimitSorted: function(model, query, limit, callback) {
        model.find(query).sort({dateCreated:-1}).limit(limit).then(function(result) {
            return callback(result);
        });
    },

    findAll: function(model, callback) {
        model.find({}).then(function(result) {
            return callback(result);
        });
    },

    findAllQuery: function(model, query, callback) {
        model.find(query).then(function(result) {
            return callback(result);
        });
    },

    findMany: function(model, query, projection, callback) {
        model.find(query, projection).then(function(error, result) {
            if(error) { 
                console.log(error);
                return callback(false);
            }
            return callback(result);
        });
    },

    updateOne: function(model, filter, update, callback) {
        model.updateOne(filter, update).then(function(error, result) {
            if(error) { 
                console.log(error);
                return callback(false);
            }
            console.log('Document modified: ' + result.nModified);
            return callback(true);
        });
    },

    updateMany: function(model, filter, update, callback) {
        model.updateMany(filter, update).then(function(error, result) {
            if(error) { 
                console.log(error);
                return callback(false);
            }
            console.log('Documents modified: ' + result.nModified);
            return callback(true);
        });
    },

    deleteOne: function(model, conditions, callback) {
        model.deleteOne(conditions).then(function (error, result) {
            if(error) { 
                console.log(error);
                return callback(false);
            }
            console.log('Document deleted: ' + result.deletedCount);
            return callback(true);
        });
    },

    deleteMany: function(model, conditions, callback) {
        model.deleteMany(conditions).then(function (error, result) {
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