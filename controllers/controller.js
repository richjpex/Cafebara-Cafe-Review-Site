import db from '../schemas/db.js';
const controller = {

    getIndex: function(req, res) {
        // your code here
       res.render('index');
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
            cafePath: "obscure"
        })
        
        cafes.push({
            cafeName: "Starbees",
            numOfReviews: "56",
            cafeShortInfo: "peeens",
            open_details: "Open in my uranus",
            cafePath: "starbs"
        })

        res.render('cafes', {
            cafeCards: cafes
        });
    },


}

export default controller;