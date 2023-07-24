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

    insertOne: async function(model, doc, callback) {
        try{
            const newDoc = await new model(doc);
            const result = await newDoc.save();
            return callback(result);
        } catch{
            return callback(false);
        }
    },

    insertMany: async function(model, docs, callback) {

        try{const result = [];
        for(let i = 0; i < docs.length; i++) {
            result.push(await new model(docs[i]).save());
        };
        return callback(result);}
        catch{
            return callback(false);
        }
    },

    findOne: async function(model, query, callback) {
        try{
            const result = await model.findOne(query)
            return callback(result);
        }catch{
            return callback(false);
        }
    },

    find: async function(model, query, callback) {
        try{
            const result = await model.find(query)
            return callback(result);
        }catch{
            return callback(false);
        }
    },

    findLimitSorted: async function(model, query, limit, callback) {
        try{
            const result = await model.find(query).sort({dateCreated:-1}).limit(limit)
            return callback(result);
        } catch{
            return callback(false);
        }
    },

    findAll: async function(model, callback) {
        try{
            const result = await model.find({})
            return callback(result);
        } catch{
            return callback(false);
        }
    },

    findAllQuery: async function(model, query, callback) {
        try{
            const result = await model.find(query)
            return callback(result);
        } catch{
            return callback(false);
        }
    },

    findMany: async function(model, query, projection, callback) {
        try{
            const result = await model.find(query, projection)
            return callback(result);
        } catch{
            return callback(false);
        }
    },

    updateOne: async function(model, filter, update, callback) {
        try{
            const result = await model.updateOne(filter, update)
        } catch{
            return callback(false);
        }
    },

    updateMany: async function(model, filter, update, callback) {
        try{
            const result = await model.updateMany(filter, update);
            return callback(result);
        }catch{
            return callback(false);
        }
    },

    deleteOne: async function(model, conditions, callback) {
        try{
            const result = await model.deleteOne(conditions)
            return callback(result);
        }catch{
            return callback(false);
        }
    },

    deleteMany: async function(model, conditions, callback) {
        try{
            const result = await model.deleteMany(conditions)
            return callback(result);
        }catch{
            return callback(false);
        }
    }

}

export default database;