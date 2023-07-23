import db from '../schemas/db.js';
// Schema model imports
// These are basically the db collections
import { Cafe }             from '../schemas/cafeSchema.js';
import { Reviews }          from '../schemas/reviewsSchema.js';
import { Review_details }   from '../schemas/review_detailsSchema.js';
import { User }             from '../schemas/userSchema.js';

let activeUser;
let currentEst ;

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

    gotoRegister: function(req, res) {
        // your code here
        res.render('register');
    },

    loginUser: async function(req, res) {
        try {
            const userdata = req.body;
            

            delete userdata.submit;
            console.log(userdata);
            
            const user = await db.findOne(User, userdata, {}, function (result) {
                if (result) {
                  console.log('User found:', result);
                } else {
                  console.log('User not found.');
                }
              });
            
            console.log(user);
            const current_user = await User.findOne(
                {email: userdata.email, password: userdata.password}
            )
            const current_cafe = await Cafe.findOne(
                {email: userdata.email, password: userdata.password}
            )
        
            if (current_user || current_cafe){
                console.log("user verified");
                if(current_user){
                    activeUser = current_user;

                    res.redirect('../../html/user-views/index.html');
                }
                if(current_cafe){
                    activeUser = current_cafe;
                    //TODO this
                    res.render('owner-profile', { activeUser });
                }
            }
            // // user and/or pass doesn't exist
            // else{
            //     const queryParams = new URLSearchParams();
            //     queryParams.append('message', 'Invalid email or password!');
            //     const queryString = queryParams.toString();
            //     console.log(queryString)
            //     return res.redirect(`./html/guest-views/login.html?${queryString}`);
                
            // }
        } catch (err) {
        console.error(err);
        return res.sendStatus(500);
        }
    },

    registerUser: async function(req, res) {
        try {
            const userdata = req.body;
            console.log(userdata);
        } catch (err) {
            console.error(err);
            return res.sendStatus(500);
        }
    },

    getUser: function(req, res) {
        const user = db.findOne(User, req.body.email, null, err);
        console.log(user);
    },


}

export default controller;