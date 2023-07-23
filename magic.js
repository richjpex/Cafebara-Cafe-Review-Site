import mongoose from "mongoose";

import { User } from "./schemas/userSchema.js";
import { Est } from "./schemas/estSchema.js";
import { Review } from "./schemas/reviewsSchema.js";
import { ReviewDetails } from "./schemas/review_detailsSchema.js";

//change this to the env
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });
function createUsers(){
    const users = [];

    users.append(new User({
        password: "password",
        email: "orrin@gmail.com",
        firstname: "Orrin",
        lastname: "Uy",
        birthday: "2002-08-13",
        profilepic: "/uploads/orrin.jpg"
    }));

    users.append(new User({
        password: "password",
        email: "migs@gmail.com",
        firstname: "Migs",
        lastname: "Leysa",
        birthday: "2002-01-01",
        profilepic: "/uploads/migs.jpg"
    }));

    users.append(new User({
        password: "password",
        email: "rich@gmail.com",
        firstname: "Rich",
        lastname: "Pex",
        birthday: "2002-01-01",
        profilepic: "/uploads/rich.jpg"
    }));

    users.append(new User({
        password: "password",
        email: "ice@gmail.com",
        firstname: "Francis",
        lastname: "Mart",
        birthday: "2002-12-15",
        profilepic: "/uploads/francis.jpg"
    }));

    users.append(new User({
        password: "password",
        email: "shinji@eva.com",
        firstname: "Shinji",
        lastname: "Ikari",
        birthday: "2002-01-01",
        profilepic: "/uploads/shinji.jpg"
    }));

    for (let i = 0; i < users.length; i++) {
        users[i].save();
    }
}

function createEsts(){

}

function createReviews(){

}