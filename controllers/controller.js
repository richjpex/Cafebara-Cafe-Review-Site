import db from '../schemas/db.js';
import {About} from '../schemas/aboutSchema.js';
import { Cafe } from '../schemas/cafeSchema.js';
import { Review } from '../schemas/reviewsSchema.js';
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
       let cafe;
       const reviews = [];

       const cafeName = req.params.cafeName;
       let cafeId;

       db.findOne(Cafe, {name: req.params.cafeName}, function(result) {
            console.log(result);    
            cafeId = result._id;
        });

       db.findAllQuery(Review, {cafeName: cafeId}, function(result) {
            for(let i = 0; i < result.length; i++){
                reviews.push({
                    // review_text: result[i].review,
                    // date: result[i].dateCreated,
                    // rating: result[i].rating,
                    cafeName: result[i].cafeName,
                    username: result[i].reviewer,
                    // dateModified: result[i].dateModified
                });
            }
        });
        
       db.findOne(Cafe, {name: req.params.cafeName}, function(result) {
        console.log(result);    
        cafe = {
                cafeName: result[0].name,
                imgPath: result[0].image,
                description: result[0].description,
                weekday_avail: result[0].weekdays_avail,
                weekend_avail: result[0].weekends_avail,
                website: result[0].website,
                phonenumber: result[0].phone,
                price: result[0].price,
                numReviews: reviews.length,
                menu: result[0].menu,
                address: result[0].address
            };
        });

       res.render("viewCafe", {
            cafePage: cafe
       });
    }


}

export default controller;