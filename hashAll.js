import mongoose from "mongoose";
import bcrypt from 'bcrypt';

import { User } from "./model/userSchema.js";
import { Cafe } from "./model/cafeSchema.js";
//import { ReviewDetails } from "./schemas/review_detailsSchema.js";

//change this to the env
mongoose.connect('mongodb://127.0.0.1:27017/apdev_test', { useNewUrlParser: true, useUnifiedTopology: true });


// hashedPassword = await bcrypt.hash(req.body.password, 10);
encryptAll();
console.log("Process can be terminated safely now");

async function encryptAll () {
    var hashedPassword;
    
    
    Cafe.find()
    .then(function (documents) {
        documents.forEach(async (document) => {
            hashedPassword = await bcrypt.hash(document.password, 10);
            document.password = hashedPassword;
      
            // Save the updated document
            document.save()
            .then(function (updatedDocument) {
                console.log('Updated document:', updatedDocument);
            })
            .catch(function (saveErr) {
                console.error('Error saving document:', saveErr);
            });
        });
    })
    .catch(function (err) {
        console.log(err);
    });
    
    User.find()
    .then(function (documents) {
        documents.forEach(async (document) => {
            console.log(`${document.password}`)
            hashedPassword = await bcrypt.hash(document.password, 10);
            document.password = hashedPassword;
      
            // Save the updated document
            document.save()
            .then(function (updatedDocument) {
                console.log('Updated document:', updatedDocument);
            })
            .catch(function (saveErr) {
                console.error('Error saving document:', saveErr);
            });
        });
    })
    .catch(function (err) {
        console.log(err);
    });
    
}