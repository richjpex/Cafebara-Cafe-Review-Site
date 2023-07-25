import mongoose from "mongoose";

import { User } from "./model/userSchema.js";
import { Cafe } from "./model/cafeSchema.js";
import { Review } from "./model/reviewsSchema.js";
import { Reply } from "./model/ownerReply.js";

//change this to the env
mongoose.connect('mongodb://127.0.0.1:27017/apdev_test', { useNewUrlParser: true, useUnifiedTopology: true });

const ownerreplyids = ["64bd8915051d07496bdbca9b", "64bd8915051d07496bdbca9c"]

makeOwnerReplies()
doStuff()


async function getIdPair(cafeName, firstName, lastName){
    const user = await User.findOne({firstname: firstName, lastname: lastName})
    const cafe = await Cafe.findOne({name: cafeName});
    return {cafeName :cafe.id, reviewer: user.id}
}

function createReviews(idPairs, reviewDetails){
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
        reviews[i].save();
    }
}

function makeOwnerReplies(){
    const replies = [];

    replies.push(new Reply({
        id: ownerreplyids[0],
        reply_text: "Please keep reviews relevant",
        date: "2021-08-02"
    }));

    replies.push(new Reply({
        id: ownerreplyids[1],
        reply_text: "Thank you for your feedback",
        date: "2021-12-13"
    }));

    for(let i = 0; i < replies.length; i++){
        replies[i].save();
    }
}

function doStuff(){
    const reviewIdPairs = [
        getIdPair("Big Boss Cafe", "Orrin", "Uy"),
        getIdPair("Big Boss Cafe", "Migs", "Leysa"),
        getIdPair("Coffee Project", "Rich", "Pex"),
        getIdPair("Coffee Project", "Francis", "Mart"),
        getIdPair("Coffee Project", "Shinji", "Ikari"),
    ];

    const reviewDetails = [
        {review_title: "SNAKEEEEE!!",  
        review: "Big Boss is my go-to cafe when I'm in need of a delicious cup of coffee. The moment you step inside, you're greeted by the warm and inviting aroma of freshly brewed beans. The staff is incredibly knowledgeable and passionate about coffee, and they always go the extra mile to ensure you have a fantastic experience. The menu offers a great variety of unique coffee blends, and the baristas are skilled in their craft. The cozy ambiance and comfortable seating make it a great spot to unwind and savor your coffee. Big Boss truly delivers excellence in every cup.",
        rating: 4,
        dateCreated: "2021-12-12",
        upvotes: 10,
        downvotes: 2,
        mediaPath: null,
        ownerReply: ownerreplyids[1]},
    
        {review_title: "Bo's Coffee Review",
        review: "This is a review for Bo's Coffee",
        rating: 4,
        dateCreated: "2021-10-10",
        upvotes: 2,
        downvotes: 0,
        mediaPath: "starbs_rev1.jpg",
        ownerReply: null},
    
        {review_title: "Coffee Project Review",
        review: "This is a review for Coffee Project",
        rating: 3,
        dateCreated: "2021-06-24",
        upvotes: 2,
        downvotes: 5,
        mediaPath: "gacha.mp4",
        ownerReply: null},
    
        {review_title: "Coffee Project Review",
        review: "This is a review for Coffee Pradasdaasdoject",
        rating: 3,
        dateCreated: "2021-12-23",
        upvotes: 2,
        downvotes: 5,
        mediaPath: null,
        ownerReply: null},
        
        {review_title: "GET IN THE COFFEE PROJECT SHINJI",
        review: "I wonder if Asuka will like the coffee here...",
        rating: 4,
        dateCreated: "2021-07-02",
        upvotes: 0,
        downvotes: 100,
        mediaPath: null,
        ownerReply: ownerreplyids[0]}
    ]    

    Promise.all(reviewIdPairs).then((result) => {
        createReviews(result, reviewDetails)
    });

    console.log("Process can be terminated safely now")
}