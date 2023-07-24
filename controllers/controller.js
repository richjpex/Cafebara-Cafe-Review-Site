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
        db.findLimitSorted(Cafe, {}, 5, function(result) {
            console.log(result);
            for(let i = 0; i < result.length; i++){
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
        db.findAll(About, function(result) {
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
        db.findAll(Cafe, function(result) {
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


    db.findOne(Cafe, {name: cafeName}, function(result) { 
        if (result){
            
        db.findAllQuery(Review, {cafeName: result._id}, function(result2) {

            db.findOne(Cafe, {name: cafeName}, function(result4) {
                cafe.push({
                    cafeName: result4.name,
                    imgPath: result4.image,
                    description: result4.description,
                    weekday_avail: result4.weekdays_avail,
                    weekend_avail: result4.weekends_avail,
                    website: result4.website,
                    phonenumber: result4.phone,
                    price: result4.price,
                    numReviews: result2.length,
                    menu: result4.menu,
                    address: result4.address
                });
            });
            for(let i = 0; i < result2.length; i++){
                    db.findOne(User, {_id: result2[i].reviewer}, function(result3) {
                            reviews.push({
                                review: result2[i].review,
                                reviewdate: result2[i].dateCreated.toString().substring(11, 15),
                                rating: result2[i].rating,
                                cafeName: result2[i].cafeName,
                                username: result3.firstname + " " + result3.lastname,
                                dateModified: result2[i].dateModified,
                                up: result2[i].upvotes,
                                down: result2[i].downvotes,
                                media: result2[i].mediaPath,
                                profilepic: result3.profilepic,
                                title: result2[i].review_title
                            });
                        });
                    }
        });
        } 
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
        db.findOne(User, {email: user}, function(result) {
            if(result){
                console.log("HERE")
                user_id = result._id;

                db.findOne(Cafe, {name: cafeName}, function(result2) {
                    if(result2){
                        cafe_id = result2._id;

                        const newReview = {
                            cafeName: cafe_id,
                            reviewer: user_id,
                            review: review,
                            review_title: review_title,
                            rating: rating,
                            dateCreated: dateCreated,
                            mediaPath: media,
                        };
                        db.insertOne(Review, newReview, function(flag) {
                            console.log(flag)
                            res.redirect('/cafes/' + cafeName + '?email=' + user);
                    });
                    }
                }
                );
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
    },

    register: function (req, res) {
        res.render ('register', {layout: 'logregTemplate'});
    }

}

export default controller;