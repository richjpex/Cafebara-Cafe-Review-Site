import db from '../schemas/db.js';
import {About} from '../schemas/aboutSchema.js';
import { Cafe } from '../schemas/cafeSchema.js';
import { Review } from '../schemas/reviewsSchema.js';
import { User } from '../schemas/userSchema.js';

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

        console.log(cafeCarouselCards)
       res.render('index', {
            isIndex: true,
            carouselCards: cafeCarouselCards
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
            profilecards: profilecards
        });
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
            cafeCards: cafes
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

            for(let i = 0; i < result2.length; i++){
                    db.findOne(User, {_id: result2[i].reviewer}, function(result3) {
                            reviews.push({
                                review: result2[i].review,
                                date: result2[i].dateCreated.toString().substring(11, 15),
                                // rating: result[i].rating,
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
                            numReviews: reviews.length,
                            menu: result4.menu,
                            address: result4.address
                        });
                    });
        });
        } 
    });
    
      
       

       res.render("viewCafe", {
            layout: 'cafeTemplate',
            cafePage: cafe,
            reviews: reviews
       });

    },

    addReview: function(req, res) {

    },

    login: function (req, res) {
        res.render ('login', {layout: 'main'});
    },

}

export default controller;