import db from '../schemas/db.js';
import {About} from '../schemas/aboutSchema.js';
import { Cafe } from '../schemas/cafeSchema.js';
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
            profilecards: profilecards
        });
    },

    getCafes: function(req, res) {
        // your code here
        // do database stuff here
        const cafes = [];

        db.findAll(Cafe, function(result) {
            for(let i = 0; i < result.length; i++){
                cafes.push({
                    cafeName: result[i].name,
                    numOfReviews: result[i].rating,
                    cafeShortInfo: result[i].description,
                    open_details: result[i].weekdays_avail,
                    cafeImg: result[i].image
                });
            }
        });

        res.render('cafes', {
            cafeCards: cafes
        });
    },

    cafe: function(req, res){
       //change render to the correct one
       const cafe=[];

       const reviews = [];
       db.findAll(Review, {cafeName: req.params.cafeName}, function(result) {
            for(let i = 0; i < result.length; i++){
                reviews.push({
                    review_text: result[i].review_text,
                    date: result[i].date,
                    rating: result[i].rating,
                    cafeName: result[i].cafeName,
                    username: result[i].username
                });
            }
        });

       db.findOne(Cafe, {name: req.params.cafeName}, function(result) {
            cafe.push({
                cafeName: result.name,
                imgPath: result.image,
                description: result.description,
                weekday_avail: result.weekdays_avail,
                weekend_avail: result.weekends_avail,
                website: result.website,
                phonenumber: result.phone,
                price: result.price,
                numReviews: reviews.length,
                menu: result.menu,
                address: result.address
            });
        });
       res.render("viewCafe");
    }


}

export default controller;