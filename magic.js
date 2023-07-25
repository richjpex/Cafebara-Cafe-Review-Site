import mongoose from "mongoose";

import { User } from "./model/userSchema.js";
import { Cafe } from "./model/cafeSchema.js";
import { About } from "./model/aboutSchema.js";

//import { ReviewDetails } from "./schemas/review_detailsSchema.js";

//change this to the env
mongoose.connect('mongodb://127.0.0.1:27017/apdev_test', { useNewUrlParser: true, useUnifiedTopology: true });

createUsers();
createCafes();
createAbout()
console.log("Process can be terminated safely now");

function createUsers(){
    const users = [];

    users.push(new User({
        password: "password",
        email: "orrin@gmail.com",
        firstname: "Orrin",
        lastname: "Uy",
        birthday: "2002-08-13",
        profilepic: "./uploads/orrin.jpg"
    }));

    users.push(new User({
        password: "password",
        email: "migs@gmail.com",
        firstname: "Migs",
        lastname: "Leysa",
        birthday: "2002-01-01",
        profilepic: "./uploads/migs.jpg"
    }));

    users.push(new User({
        password: "password",
        email: "rich@gmail.com",
        firstname: "Rich",
        lastname: "Pex",
        birthday: "2002-01-01",
        profilepic: "./uploads/rich.jpg"
    }));

    users.push(new User({
        password: "password",
        email: "ice@gmail.com",
        firstname: "Francis",
        lastname: "Mart",
        birthday: "2002-12-15",
        profilepic: "./uploads/francis.jpg"
    }));

    users.push(new User({
        password: "password",
        email: "shinji@eva.com",
        firstname: "Shinji",
        lastname: "Ikari",
        birthday: "2002-01-01",
        profilepic: "./uploads/shinji.jpg"
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
        image: "./uploads/cafes/bigboss.jpeg",
        rating: 4,
        price: 200,
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
        image: "./uploads/cafes/bos.jpeg",
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
        image: "./uploads/cafes/coffee-project.jpeg",
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
        image: "./uploads/cafes/nitro7.jpeg",
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
        image: "./uploads/cafes/obscure.jpg",
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
        image: "./uploads/cafes/starbs.jpg",
        rating: 5,
        price: 200
        }));

    for (let i = 0; i < cafes.length; i++) {
        cafes[i].save();
    }
}


function createAbout(){

    const aboutBios = {
        francis: "Francis Martinez is an experienced web developer specializing in front-end and back-end development. With expertise in HTML, CSS, JavaScript, and popular frameworks like React and Angular, he creates visually appealing and user-friendly websites. Passionate about delivering top-notch digital solutions, Francis' attention to detail and problem-solving skills make him a valuable asset to any web development team.",
        migs: "Miguel Leysa is a talented web developer with a focus on creating dynamic and responsive websites. With a strong background in HTML, CSS, and JavaScript, he brings creativity and technical expertise to every project. His ability to translate client requirements into intuitive and visually appealing web experiences sets him apart in the field.",
        orrin: "Orrin Uy is a skilled web developer specializing in crafting modern and user-centric websites. With a solid foundation in HTML, CSS, and JavaScript, Orrin leverages his expertise to create seamless and engaging online experiences. Known for his attention to detail and dedication to staying abreast of the latest industry trends, he consistently delivers high-quality websites that exceed client expectations",
        rich: "Richard Pecson is a versatile web developer known for her ability to blend creativity and technical expertise. With a proficiency in HTML, CSS, and JavaScript, His crafts visually stunning and interactive websites that captivate users. His passion for continuous learning and problem-solving allows her to adapt to evolving technologies and deliver innovative digital solutions."
    }

    const abouts = []

    abouts.push(new About({
        name: "Francis Martinez",
        position: "Web Developer",
        image: "./uploads/francis.jpg",
        bio: aboutBios.francis
    }));

    abouts.push(new About({
        name: "Miguel Leysa",
        position: "Web Developer",
        image: "./uploads/migs.jpg",
        bio: aboutBios.migs
    }));

    abouts.push(new About({
        name: "Orrin Uy",
        position: "Web Developer",
        image: "./uploads/orrin.jpg",
        bio: aboutBios.orrin
    }));

    abouts.push(new About({
        name: "Richard Pecson",
        position: "Web Developer",
        image: "./uploads/rich.jpg",
        bio: aboutBios.rich
    }));

    for (let i = 0; i < abouts.length; i++) {
        abouts[i].save();
    }
}