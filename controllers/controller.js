import db from '../schemas/db.js';
import {About} from '../schemas/aboutSchema.js';
import { Cafe } from '../schemas/cafeSchema.js';
import { Review } from '../schemas/reviewsSchema.js';
import { User } from '../schemas/userSchema.js';

let email = ``;
let isLogged = 0;

const controller = {

    getIndex: function(req, res) {
        // your code here
        const cafeCarouselCards = [];
        const resp = db.findLimitSorted(Cafe, {}, 5, function(result) {
            if(result != false)for(let i = 0; i < result.length; i++){
                cafeCarouselCards.push({
                    cafeName: result[i].name,
                    cafePath: result[i].image,
                    avgPrice: result[i].price
                });
            }
        });
        console.log(`YESSSSS${email}`);
       res.render('index', {
            isIndex: true,
            carouselCards: cafeCarouselCards,
            session: isLogged
       });
       res.status(200);
       return;
    },

    getAbout: function(req, res) {
        // your code here
        const profilecards = [];
        const resp = db.findAll(About, function(result) {
            for(let i = 0; i < result.length; i++){
                profilecards.push({
                    name: result[i].name,
                    position: result[i].position,
                    bio: result[i].bio,
                    // fb: result[i].fb,
                    // twitter: result[i].twitter,
                    // insta: result[i].insta,
                    // git: result[i].git,
                    image: result[i].image
                });
            }
        });
        res.render('about', {
            isAbout: true,
            profilecards: profilecards,
            session: isLogged
        });
        console.log(`NOOO${email}`);
    },

    getCafes: function(req, res) {
        // your code here
        // do database stuff here
        const cafes = [];
        const resp = db.findAll(Cafe, function(result) {
            for(let i = 0; i < result.length; i++){
                db.findAllQuery(Review, {cafeName: result[i]._id}, function(result2) {
                    cafes.push({
                        cafeName: result[i].name,
                        numOfReviews: result2.length,
                        cafeShortInfo: result[i].description,
                        open_details: result[i].weekdays_avail,
                        cafeImg: result[i].image,
                        price: result[i].price,
                    });
                })
            };
        });

        res.render('cafes', {
            cafeCards: cafes,
            session: isLogged
        });
    },
 
    cafe: function(req, res){
       //change render to the correct one
       const cafe = [];
       const reviews = [];

       const cafeId = [];
       const cafeName = req.params.cafeName;

        let cafe_id;
        const resp1 = db.findOne(Cafe, {name: cafeName}, function(result) { 
            if(result!= false)
                cafe_id = result._id;
        });

        const resp2 = db.findAllQuery(Review, {cafeName: cafe_id}, function(result2) {
            if(result2 != false){
                for(let i = 0; i < result2.length; i++){
                    const resp3 = db.findOne(User, {_id: result2[i].reviewer}, function(result3) {
                            reviews.push({
                                review: result2[i].review,
                                reviewdate: result2[i].dateCreated.toString().substring(0, 15),
                                rating: result2[i].rating,
                                cafeName: result2[i].cafeName,
                                username: result3.firstname + " " + result3.lastname,
                                dateModified: result2[i].dateModified,
                                up: result2[i].upvotes,
                                down: result2[i].downvotes,
                                media: result2[i].mediaPath,
                                profilepic: result3.profilepic,
                                title: result2[i].review_title,
                                date: result3.dateCreated.toString().substring(11, 15)
                            });
                        });
                    }
                }
            });
            
        const resp4 = db.findOne(Cafe, {name: cafeName}, function(result4) {
            cafe.push({
                cafeName: result4.name,
                imgPath: result4.image,
                description: result4.description,
                weekday_avail: result4.weekdays_avail,
                weekend_avail: result4.weekends_avail,
                website: result4.website,
                phonenumber: result4.phone,
                price: result4.price,
                numReviews: reviews.length,
                menu: result4.menu,
                address: result4.address
            });
        });
       res.render("viewCafe", {
            layout: 'cafeTemplate',
            cafePage: cafe,
            reviews: reviews,
            session: isLogged
       });

    },

    addReview: function(req, res) {
        const cafeName = req.body.cafeName;
        const review = req.body.review;
        const review_title = req.body.review_title;
        const rating = req.body.rating;
        const dateCreated = req.body.dateCreated;
        const media = req.body.media;
        const user = email;
        let user_id;
        let cafe_id;
        
        const resp1 = db.findOne(User, {email: user}, function(result) {
            if(result != false)
                user_id = result._id;
        });
        const resp2 = db.findOne(Cafe, {name: cafeName}, function(result2) {
            if(result2){
                cafe_id = result2._id;
            }
        });
        const newReview = {
            cafeName: cafe_id,
            reviewer: user_id,
            review: review,
            review_title: review_title,
            rating: rating,
            dateCreated: dateCreated,
            mediaPath: media,
        };
        const resp3 = db.insertOne(Review, newReview, function(flag) {
            if(flag!=false){
                console.log("Review added");
                res.sendStatus(200);
            }
        });
    },
    login: function (req, res) {
        res.render ('login', {layout: 'logregTemplate'});
    },

    logsucc: function (req, res) {
        email = req.body.email;
        isLogged = 1;
        console.log(`${email}`);
        res.redirect(`/`);
    },

    logout: function (req, res) {
        email = ``;
        isLogged = 0;
        res.redirect(`/`);
    }

}

export default controller;