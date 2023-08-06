import mongoose from "mongoose";

import { User } from "./model/userSchema.js";
import { Cafe } from "./model/cafeSchema.js";
import { About } from "./model/aboutSchema.js";
import { Reply } from "./model/ownerReply.js";
import { Review } from "./model/reviewsSchema.js";


//import { ReviewDetails } from "./schemas/review_detailsSchema.js";

//change this to the env
mongoose.connect('mongodb://127.0.0.1:27017/apdev_test', { useNewUrlParser: true, useUnifiedTopology: true });

await main()

async function main(){
    await createUsers();
    console.log("1")
    await createCafes();
    console.log("2")
    await createAbout();
    console.log("3")
    await makeOwnerReplies();
    console.log("4")
    await doStuff();
    console.log("5")
    await addReviewVotes();
    console.log("Process can be terminated safely now");
}

async function createUsers(){
    const users = [];

    users.push(new User({
        password: "orrinpassword",
        email: "orrin@gmail.com",
        firstname: "Orrin",
        lastname: "Uy",
        birthday: "2002-08-13",
        profilepic: "./uploads/orrin.jpg"
    }));

    users.push(new User({
        password: "migspassword",
        email: "migs@gmail.com",
        firstname: "Migs",
        lastname: "Leysa",
        birthday: "2002-01-01",
        profilepic: "./uploads/migs.jpg"
    }));

    users.push(new User({
        password: "richpassword",
        email: "rich@gmail.com",
        firstname: "Rich",
        lastname: "Pex",
        birthday: "2002-01-01",
        profilepic: "./uploads/rich.jpg"
    }));

    users.push(new User({
        password: "icepassword",
        email: "ice@gmail.com",
        firstname: "Francis",
        lastname: "Mart",
        birthday: "2002-12-15",
        profilepic: "./uploads/francis.jpg"
    }));

    users.push(new User({
        password: "shinjipassword",
        email: "shinji@eva.com",
        firstname: "Shinji",
        lastname: "Ikari",
        birthday: "2002-01-01",
        profilepic: "./uploads/shinji.jpg"
    }));

    for (let i = 0; i < users.length; i++) {
        await users[i].save();
    }
}

async function createCafes(){
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


async function createAbout(){

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

async function getIdPair(cafeName, firstName, lastName){
    try{
        const user = await User.findOne({firstname: firstName, lastname: lastName})
        const cafe = await Cafe.findOne({name: cafeName});
        return {cafeName :cafe._id, reviewer: user._id}
    }
    catch(err){
        console.log(err)
    }
}

async function createReviews(idPairs, reviewDetails){
    const reviews = []

    for (let i = 0; i < idPairs.length; i++){
        reviews.push(new Review({
            cafeName: idPairs[i].cafeName,
            reviewer: idPairs[i].reviewer,
            review_title: reviewDetails[i].review_title,
            review: reviewDetails[i].review,
            rating: reviewDetails[i].rating,
            dateCreated: reviewDetails[i].dateCreated,
            upvotes: reviewDetails[i].upvotes,
            downvotes: reviewDetails[i].downvotes,
            ownerReply: reviewDetails[i].ownerReply
        })); 
    }

    for (let i = 0; i < reviews.length; i++) {
        await reviews[i].save();
    }
}

async function makeOwnerReplies(){
    const replies = [];

    replies.push(new Reply({
        reply_text: "Please keep reviews relevant",
        date: "2021-08-02"
    }));

    replies.push(new Reply({
        reply_text: "Thank you for your feedback",
        date: "2021-12-13"
    }));

    for(let i = 0; i < replies.length; i++){
        await replies[i].save();
    }
}

async function doStuff(){
    const reviewIdPairs = [
        await getIdPair("Big Boss Cafe", "Orrin", "Uy"),
        await getIdPair("Big Boss Cafe", "Migs", "Leysa"),
        await getIdPair("Coffee Project", "Rich", "Pex"),
        await getIdPair("Coffee Project", "Francis", "Mart"),
        await getIdPair("Coffee Project", "Shinji", "Ikari"),
    ];

    const ownerreply = await Reply.find();
    const ownerreplyids = [];
    for (let i = 0; i < ownerreply.length; i++){
        ownerreplyids.push(ownerreply[i].id);
    }

    const reviewDetails = [
        {review_title: "SNAKEEEEE!!",  
        review: "Big Boss is my go-to cafe when I'm in need of a delicious cup of coffee. The moment you step inside, you're greeted by the warm and inviting aroma of freshly brewed beans. The staff is incredibly knowledgeable and passionate about coffee, and they always go the extra mile to ensure you have a fantastic experience. The menu offers a great variety of unique coffee blends, and the baristas are skilled in their craft. The cozy ambiance and comfortable seating make it a great spot to unwind and savor your coffee. Big Boss truly delivers excellence in every cup.",
        rating: 4,
        dateCreated: "2021-12-12",
        mediaPath: null,
        ownerReply: ownerreplyids[1]},
    
        {review_title: "Bo's Coffee Review",
        review: "This is a review for Bo's Coffee",
        rating: 4,
        dateCreated: "2021-10-10",
        mediaPath: "starbs_rev1.jpg",
        ownerReply: null},
    
        {review_title: "Coffee Project Review",
        review: "This is a review for Coffee Project",
        rating: 3,
        dateCreated: "2021-06-24",
        mediaPath: "gacha.mp4",
        ownerReply: null},
    
        {review_title: "Coffee Project Review",
        review: "This is a review for Coffee Pradasdaasdoject",
        rating: 3,
        dateCreated: "2021-12-23",
        mediaPath: null,
        ownerReply: null},
        
        {review_title: "GET IN THE COFFEE PROJECT SHINJI",
        review: "I wonder if Asuka will like the coffee here...",
        rating: 4,
        dateCreated: "2021-07-02",
        mediaPath: null,
        ownerReply: ownerreplyids[0]}
    ]    

    await createReviews(reviewIdPairs, reviewDetails)
}

async function addReviewVotes(){

    const users = await User.find();
    const reviews = await Review.find();

    users[0].upvotes.push(reviews[0]._id);
    users[4].upvotes.push(reviews[0]._id);
    reviews[0].upvotes = 2;

    users[1].downvotes.push(reviews[0]._id);
    reviews[0].downvotes = 1;

    users[0].upvotes.push(reviews[1]._id);
    users[1].upvotes.push(reviews[1]._id);
    users[4].upvotes.push(reviews[1]._id);
    reviews[1].upvotes = 3;

    users[0].upvotes.push(reviews[2]._id);
    users[1].upvotes.push(reviews[2]._id);
    users[4].upvotes.push(reviews[2]._id);
    reviews[2].upvotes = 3;

    users[4].upvotes.push(reviews[3]._id);
    reviews[3].upvotes = 1;

    users[0].downvotes.push(reviews[3]._id);
    users[1].downvotes.push(reviews[3]._id);
    reviews[3].downvotes = 2;
    
    users[0].downvotes.push(reviews[4]._id);
    users[1].downvotes.push(reviews[4]._id);
    users[2].downvotes.push(reviews[4]._id);
    users[3].downvotes.push(reviews[4]._id);
    reviews[4].downvotes = 4;

    for (let i = 0; i < users.length; i++) {
        await users[i].save();
    }

    for (let i = 0; i < reviews.length; i++) {
        await reviews[i].save();
    }
}