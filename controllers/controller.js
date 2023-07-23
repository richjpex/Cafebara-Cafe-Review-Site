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
        cafes.push({
            cafeName: "MY COFFEe",
            numOfReviews: "255",
            cafeShortInfo: "penis",
            open_details: "Open in my ass",
            cafeImg: "obscure.jpg"
        })
        
        cafes.push({
            cafeName: "Starbees",
            numOfReviews: "56",
            cafeShortInfo: "peeens",
            open_details: "Open in my uranus",
            cafeImg: "starbs.jpg"
        })

        res.render('cafes', {
            cafeCards: cafes
        });
    },

    cafe: function(req, res){
       //change render to the correct one
       res.render("index");
    }


}

export default controller;