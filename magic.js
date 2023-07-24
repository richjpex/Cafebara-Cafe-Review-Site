import mongoose from "mongoose";

import { User } from "./schemas/userSchema.js";
import { Est } from "./schemas/cafeSchema.js";
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

function createCafes(){
    const cafes = [];
    
    cafes.append(new Cafe({
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

    cafes.append(new Cafe({
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

    cafes.append(new Cafe({
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

    cafes.append(new Cafe({
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

    cafes.append(new Cafe({
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

    cafes.append(new Cafe({
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
function createReviews(){

}
