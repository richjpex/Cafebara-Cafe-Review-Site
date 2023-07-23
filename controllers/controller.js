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

    getReview: function(req, res) {
        // your code here
        res.render('review');
    },


}

export default controller;