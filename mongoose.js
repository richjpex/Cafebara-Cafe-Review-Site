import mongoose from 'mongoose';
import {User} from './userSchema.js';
import {Est} from './estSchema.js';
import {Reviews} from './reviewsSchema.js';
import express from 'express';
import 'dotenv/config';

const app = express();

main()

//async function since a lot of the mongoose functions are async
//and not doing this will make it so a lot of the code will run before
//we actually get stuff from the db
async function main(){
    try {
        mongoose.connect("mongodb://localhost:27017/cafebara")
        
        // npm run dev to run this file
        // note: make sure to npm i first to install new dependencies I added
        // npm run dev will make it so the server auto restarts when you save a file

        // NO NEED TO CREATE THE DATABASE MANUALLY
        // OR ADD THE COLLECTIONS MANUALLY (see comment below)

        // commented out section from here to newEst.save should only be run once
        // to populate the database with test data
        // unless you delete the stuff from the database
        // also this stuff should be in a separate js file
        // but i put it here for now

        // const newUser = new User({
        //     username: "sei",
        //     password: "test",
        //     email: "test",
        //     firstname: "test",
        //     lastname: "test",
        // })

        // newUser.save().then((result) => {
        //     console.log("User saved to DB!")
        // })

        // const newEst = new Est({
        //     name: "test",
        //     address: "test",
        //     description: "test",
        //     weekdays_avail: "test",
        //     weekends_avail: "test",
        //     website: "test",
        //     phone: "test",
        //     email: "test",
        // })

        // newEst.save().then((result) => {
        //     console.log("Est saved to DB!")
        // })

        const est = await Est.find({name: "test"})

        const user = await User.find({username: 'sei'})

        //see reviewsSchema.js comment for duplicates
        const review = new Reviews({
            review_title: "test",
            review: "test",
            rating: 5,
            estName: est[0]._id,
            reviewer: user[0]._id,
        })

        console.log(review.estName)
        review.save().then((result) => {
            console.log(result)
        })

        // front end connect draft
        // app.listen(process.env.SERVER_PORT, () => {
        //     console.log(`Server is running on port ${process.env.SERVER_PORT}`);
        // });

        // app.get('/', (req, res) => {
        //     User.estimatedDocumentCount().then((count) => {
        //         console.log(count)
        //         });
        //     res.send("peeen")
        // });

    } catch (error) {
        console.log(error);
    }
}