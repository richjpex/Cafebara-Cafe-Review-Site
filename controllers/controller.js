import db from '../schemas/db.js';
// Schema model imports
// These are basically the db collections
import { Cafe }             from '../schemas/cafeSchema.js';
import { Reviews }          from '../schemas/reviewsSchema.js';
import { Review_details }   from '../schemas/review_detailsSchema.js';
import { User }             from '../schemas/userSchema.js';

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

    gotoLogin: function(req, res) {
        // your code here
        res.render('login');
    },

    getUser: function(req, res) {
        const user = db.findOne(User, req.body.email, null, null);
        console.log(user);
    },


}

export default controller;