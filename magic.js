import mongoose from "mongoose";
import { ObjectId } from "mongodb";

import { User } from "./schemas/userSchema.js";
import { Cafe } from "./schemas/cafeSchema.js";
import { Review } from "./schemas/reviewsSchema.js";
import { create } from "domain";
//import { ReviewDetails } from "./schemas/review_detailsSchema.js";

//change this to the env
mongoose.connect('mongodb://127.0.0.1:27017/apdev_test', { useNewUrlParser: true, useUnifiedTopology: true });
function createUsers(){
    const users = [];

    users.push(new User({
        password: "password",
        email: "orrin@gmail.com",
        firstname: "Orrin",
        lastname: "Uy",
        birthday: "2002-08-13",
        profilepic: "/uploads/orrin.jpg"
    }));

    users.push(new User({
        password: "password",
        email: "migs@gmail.com",
        firstname: "Migs",
        lastname: "Leysa",
        birthday: "2002-01-01",
        profilepic: "/uploads/migs.jpg"
    }));

    users.push(new User({
        password: "password",
        email: "rich@gmail.com",
        firstname: "Rich",
        lastname: "Pex",
        birthday: "2002-01-01",
        profilepic: "/uploads/rich.jpg"
    }));

    users.push(new User({
        password: "password",
        email: "ice@gmail.com",
        firstname: "Francis",
        lastname: "Mart",
        birthday: "2002-12-15",
        profilepic: "/uploads/francis.jpg"
    }));

    users.push(new User({
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

function createCafes(){
    const cafes = [];
    
    cafes.push(new Cafe({
        name: "Big Boss Cafe",
        address: "EGI Tower, Taft Ave, Malate, Manila, 1004 Metro Manila",
        description: "A cafe for the big boss",
        weekdays_avail: "7:00 AM - 10:00 PM",
        weekends_avail: "9:00 AM - 10:00 PM",
        website: "https://www.facebook.com/bigbosscafe",
        phone: "+63917 546 9130",
        email: "bigbosscafe@gmail.com",
        password: "b1gb0ss",
        image: "../../images/cafes/bigboss.jpeg",
        rating: 4,
        price: 200
        }));

    cafes.push(new Cafe({
        name: "Bo's Coffee",
        address: "Unit 110 G/F SMDC Green Residences, Taft, Zone 78, Malate, Manila, Metro Manila",
        description: "Bo's Coffee is a homegrown brew that has been serving coffee from the heart since 1996.",
        weekdays_avail: "8:30 AM - 9:00 PM",
        weekends_avail: "8:30 AM - 9:00 PM",
        website: "https://www.facebook.com/boscoffee",
        phone: "+63995 484 2599",
        email: "boscoffee@gmail.com",
        password: "b0sc0ffee",
        image: "../../images/cafes/bos.jpeg",
        rating: 4,
        price: 240
        }));

    cafes.push(new Cafe({
        name: "Coffee Project",
        addresss: "G/F, Vista Taft Residences, 2587 Taft Ave, Malate, Manila, 1004 Metro Manila",
        description: "Coffee Project is a rustic coffee shop that offers a wide variety of food and drinks.",
        weekdays_avail: "7:00 AM - 9:00 PM",
        weekends_avail: "7:00 AM - 9:00 PM",
        website: "https://www.facebook.com/coffeeprojectofficial",
        phone: "+63920 331 6503",
        email: "coffeeproject@gmail.com",
        password: "c0ff33pr0ject",
        image: "../../images/cafes/coffeeproject.jpeg",
        rating: 3,
        price: 250
        }));

    cafes.push(new Cafe({
        name: "Nitro 7 Tea and Coffee Bar",
        address: "Taft Avenue WH Taft Residences, Unit G7 (Ground Floor, Malate, Manila, 1004",
        description: "Nitro 7 is a cafe that offers a wide variety of coffee and tea.",
        weekdays_avail: "7:00 AM - 8:00 PM",
        weekends_avail: "7:00 AM - 8:00 PM",
        website: "https://www.facebook.com/Nitro7WHTaft/",
        phone: "+63921 498 2255",
        email: "nitro7taft@gmail.com",
        password: "n1tr07",
        image: "../../images/cafes/nitro7.jpeg",
        rating: 3,
        price: 190
        }));

    cafes.push(new Cafe({
        name: "Obscure Cafe",
        address: "One Archers Palace, Taft Ave, Malate, 1004 Metro Manila",
        description: "Obscure Cafe is a cafe that offers a wide variety of coffee and tea.",
        weekdays_avail: "8:00 AM - 11:00 PM",
        weekends_avail: "8:00 AM - 11:00 PM",
        website: "https://www.instagram.com/obscurecafe/",
        phone: "+63917 546 9130",
        email: "obscurecafetaft@gmail.com",
        password: "0bscur3",
        image: "../../images/cafes/obscure.jpeg",
        rating: 4,
        price: 220
        }));

    cafes.push(new Cafe({
        name: "Starbucks",
        address: "Fidel A.Reyes, Malate, Manila, 1004 Metro Manila",
        description: "Seattle-based coffeehouse chain known for its signature roasts, light bites and WiFi availability.",
        weekdays_avail: "7:00 AM - 10:00 PM",
        weekends_avail: "7:00 AM - 10:00 PM",
        website: "https://www.foodpanda.ph/restaurant/djr7/starbucks-green-court",
        phone: "+63917 546 9130",
        email: "starbucksgreencourt@gmail.com",
        password: "st4rbuck5",
        image: "../../images/cafes/starbucks.jpeg",
        rating: 5,
        price: 200
        }));

    for (let i = 0; i < cafes.length; i++) {
        cafes[i].save();
    }
}

function getCafeId(cafeName){
    const cafe = Cafe.findOne({name: cafeName});
    return new ObjectId(cafe._id);

}

function getUserId(firstName, lastName){
    const user = User.findOne({firstname: firstName, lastname: lastName});
    return new ObjectId(user._id);

}

function createReviews(){
    const reviews = []

    reviews.push(new Review({
        cafeName: getCafeId("Big Boss Cafe"),  
        reviewer: getUserId("Orrin", "Uy"),
        review_title: "SNAKEEEEE!!",
        review: "Big Boss is my go-to cafe when I'm in need of a delicious cup of coffee. The moment you step inside, you're greeted by the warm and inviting aroma of freshly brewed beans. The staff is incredibly knowledgeable and passionate about coffee, and they always go the extra mile to ensure you have a fantastic experience. The menu offers a great variety of unique coffee blends, and the baristas are skilled in their craft. The cozy ambiance and comfortable seating make it a great spot to unwind and savor your coffee. Big Boss truly delivers excellence in every cup.",
        rating: 4,
        dateCreated: "2021-05-01",
        upvotes: 10,
        downvotes: 2
    }));

    reviews.push(new Review({
        //get the _id of cafeName and reviewer
        cafeName: getCafeId("Big Boss Cafe"),
        reviewer: getUserId("Migs", "Leysa"),
        review_title: "Bo's Coffee Review",
        review: "This is a review for Bo's Coffee",
        rating: 4,
        dateCreated: "2021-05-01",
        upvotes: 2,
        downvotes: 0
    }));

    reviews.push(new Review({
        _id: new ObjectId(),
        cafeName: getCafeId("Coffee Project"),
        reviewer: getUserId("Rich", "Pex"),
        review_title: "Coffee Project Review",
        review: "This is a review for Coffee Project",
        rating: 3,
        dateCreated: "2021-05-01",
        upvotes: 2,
        downvotes: 5
    }));

    reviews.push(new Review({
        cafeName: getCafeId("Coffee Project"),
        reviewer: getUserId("Rich", "Pex"),
        review_title: "Coffee Project Review",
        review: "This is a review for Coffee Project",
        rating: 3,
        dateCreated: "2021-05-01",
        upvotes: 2,
        downvotes: 5
    }));

    for (let i = 0; i < reviews.length; i++) {
        reviews[i].save();
    }

    


}

createUsers();
createCafes();
createReviews();