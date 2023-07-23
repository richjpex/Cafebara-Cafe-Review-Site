import db from '../schemas/db.js';
const controller = {

    getIndex: function(req, res) {
        // your code here
        const cafeCarouselCards = [];
        cafeCarouselCards.push({
            cafeName: "Starbees",
            cafePath: "starbs.jpg",
            avgPrice: "1000.00"
        });
        cafeCarouselCards.push({
            cafeName: "Obscure",
            cafePath: "obscure.jpg",
            avgPrice: "300.00"
        });
        cafeCarouselCards.push({
            cafeName: "Bos",
            cafePath: "bos.jpeg",
            avgPrice: "300.00"
        });
        cafeCarouselCards.push({
            cafeName: "bigboss",
            cafePath: "bigboss.jpeg",
            avgPrice: "300.00"
        });
        cafeCarouselCards.push({
            cafeName: "nitro7",
            cafePath: "nitro7.jpeg",
            avgPrice: "300.00"
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
        res.render('about');
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