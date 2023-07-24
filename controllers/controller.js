import db from '../schemas/db.js';
import {About} from '../schemas/aboutSchema.js';
import { Cafe } from '../schemas/cafeSchema.js';
import { Review } from '../schemas/reviewsSchema.js';
import { User } from '../schemas/userSchema.js';
import { Reply } from '../schemas/ownerReply.js';

let email = ``;
let isLogged = 0;

const controller = {

    getIndex: async function(req, res) {
        // your code here
        const cafeCarouselCards = [];
        const resp = await db.findLimitSorted(Cafe, {}, 5, function(result) {
            if(result != false)for(let i = 0; i < result.length; i++){
                cafeCarouselCards.push({
                    cafeName: result[i].name,
                    cafePath: result[i].image,
                    avgPrice: result[i].price
                });
            }
        });
       res.render('index', {
            isIndex: true,
            carouselCards: cafeCarouselCards,
            session: isLogged
       });
       res.status(200);
       return;
    },


    getAbout: async function(req, res) {
        // your code here
        const profilecards = [];
        const resp = await db.findAll(About, function(result) {
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
    },

    getCafes: async function(req, res) {
        // your code here
        // do database stuff here
        const cafes = [];
        const resp = await db.findAll(Cafe, async function(result) {
            for(let i = 0; i < result.length; i++){
                await db.findAllQuery(Review, {cafeName: result[i]._id}, function(result2) {
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
 
    cafe: async function(req, res){
       //change render to the correct one
       const cafe = [];
       const reviews = [];

       const cafeName = req.params.cafeName;

        let cafe_id;
        const resp1 = await db.findOne(Cafe, {name: cafeName}, function(result) { 
            if(result!= false){
                cafe_id = result._id;
            }
        });
        
        let revs = [];
        const resp2 = await db.findAllQuery(Review, {cafeName: cafe_id}, function(result2) {
            if(result2 != false){
                revs = result2
            }
        });

        for(let i = 0; i < revs.length; i++){
            let ownerreply= null;
            let ownerreplydate = null;
            const getOwnerReply = await db.findOne(Reply, {_id: revs[i].ownerReply}, function(result4) {
                if(result4 != false){
                    ownerreply = result4.reply_text;
                    ownerreplydate = result4.date.toString().substring(0, 15);
                }
            })
            const resp3 = await db.findOne(User, {_id: revs[i].reviewer}, function(result3) {
                    const author = (email == result3.email) ? true: false;
                  
                    reviews.push({
                        review: revs[i].review,
                        reviewdate: revs[i].dateCreated.toString().substring(0, 15),
                        rating: revs[i].rating,
                        username: result3.firstname + " " + result3.lastname,
                        dateModified: revs[i].dateModified,
                        up: revs[i].upvotes,
                        down: revs[i].downvotes,
                        media: revs[i].mediaPath,
                        profilepic: result3.profilepic,
                        title: revs[i].review_title,
                        author: author,
                        date: result3.dateCreated.toString().substring(11, 15),
                        ownerreply: ownerreply,
                        ownerreplydate: ownerreplydate,
                        cafe_id: revs[i].cafeName,
                        user_id: revs[i].reviewer
                    });
                });
            }
            
        const resp4 = await db.findOne(Cafe, {name: cafeName}, function(result4) {
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
       res.render("viewCafe", {
            layout: 'cafeTemplate',
            cafePage: cafe,
            reviews: reviews,
            session: isLogged
       });

    },

    addReview: async function(req, res) {
        const cafeName = req.body.cafeName;
        const review = req.body.review;
        const review_title = req.body.review_title;
        const rating = req.body.rating;
        const dateCreated = req.body.dateCreated;
        const media = req.body.media;
        const user = email;
        let user_id;
        let cafe_id;
        
        const resp1 = await db.findOne(User, {email: user}, function(result) {
            if(result != false)
                user_id = result._id;
        });
        const resp2 = await db.findOne(Cafe, {name: cafeName}, function(result2) {
            if(result2){
                cafe_id = result2._id;
            }
        });
        const newReview = {
            cafeName: cafe_id,
            reviewer: user_id,
            review: review,
            review_title: review_title,
            rating: rating,
            dateCreated: dateCreated,
            mediaPath: media,
            ownerreply: null
        };

        const resp3 = await db.insertOne(Review, newReview, function(flag) {
            if(flag!=false){
                console.log("Review added");
            }
            else{
                console.log("Review not added");
            }
        });

        res.redirect('/review?cafeid=' + cafe_id);
    },

    login: function (req, res) {
        res.render ('login', {layout: 'logregTemplate'});
    },

    logsucc: function (req, res) {
        email = req.body.email;
        isLogged = 1;
        res.redirect(`/`);
    },

    logout: function (req, res) {
        email = ``;
        isLogged = 0;
        res.redirect(`/`);
    },


    register: async function (req, res) {
        
        res.render ('register', {layout: 'logregTemplate'});
    },

    register_process: async function (req, res) {
        try {
            console.log("check");
            const userdata = req.body;

            
            console.log(userdata);
            
            
            // check if email exists in either User or cafe colleciton
            const existingUser = await db.findOne(User, {email: userdata.email}, function(result) {
                if(result != false)
                    user_id = result._id;
            });
            const existingCafe = await db.findOne(Cafe, {email: userdata.email}, function(result) {
                if(result != false)
                    user_id = result._id;
            });
            

            if (existingUser || existingCafe) {
                const queryParams = new URLSearchParams();
                queryParams.append('usertype', userdata.usertype);
                queryParams.append('message', 'Email already exists!');
                const queryString = queryParams.toString();
                return res.redirect(`/`);
            }
            else {
                if(userdata.usertype === 'customer'){
                    // create new user
                    const newUser = new User({
                        password: userdata.password,
                        email: userdata.email,
                        firstname: userdata.firstname,
                        lastname: userdata.lastname,
                        
                        });
                    console.log(newUser);
                    //save to db
                    newUser.save().then(function (err) {
                        if (err) {
                            console.log(err);
                            const queryParams = new URLSearchParams();
                            queryParams.append('message', 'Error creating user!');
                            return res.redirect(`/`);
                        }
                        res.redirect('/');
                    });
                }   
                else if(userdata.usertype ==='owner'){
                    // create new est profile
                    console.log(userdata)
                    const newCafe = new Cafe({
                        name: userdata.estname,
                        address: userdata.estaddress,
                        email: userdata.email,
                        password: userdata.password,
                    });

                    //save to db
                    newCafe.save().then(function (err) {
                        if (err) {
                            const queryParams = new URLSearchParams();
                            queryParams.append('message', 'Error creating establishment!');
                            return res.redirect(`/`);
                        }
                        res.redirect('/');
                    });
                }
            }
        } catch (err) {
            console.error(err);
            return res.sendStatus(500);
        }
        // insert information into DB here
        /*
        @BANANZAI
        req.body.email
        req.body.firstname
        req.body.lastname
        req.body.password
        req.body.confirmpassword

        req.body.estname
        req.body.estaddress
        */
    },

    profile: function (req, res) {
        res.render ('userProfile', {layout: 'profileTemplate', session: isLogged});
    },

    settings: function (req, res) {
        res.render ('settings', {layout: 'profileTemplate', session: isLogged    });
    },

    searchcafes: async function (req, res) {
        const cafes = [];
        console.log(`Search Query: ${req.body.search}`);
        // i call the db 
        // select * from est where=`%req.body.search%`
        // then just display everything
        // refresh page with the new list of cafes badabing badaboom!!!
        
        const v = await db.findAllQuery(Cafe, {name: { $regex : '.*' + req.body.search + '.*', $options: 'i'}}, async function(result){
                //write here what you want to happen after it finds teh stuff
     
                for(let i = 0; i < result.length; i++){
                    await db.findAllQuery(Review, {cafeName: result[i]._id}, function(result2) {
                        cafes.push({
                            cafeName: result[i].name,
                            numOfReviews: result2.length,
                            cafeShortInfo: result[i].description,
                            open_details: result[i].weekdays_avail,
                            cafeImg: result[i].image,
                            price: result[i].price,
                        });
                    })
                }
        });

        if (cafes.length == 0) {
            res.render('cafes', {
                cafeCards: cafes,
                error: "<h2 style='width: 100%; text-align: center;'>No results found...</h2>",
                session: isLogged
            });
        }
        else{
            res.render('cafes', {
                cafeCards: cafes,
                session: isLogged
            });
        }
        
    },

    refreshCafe: async function(req, res) {
        const cafe_id= req.query.cafeid;

        const cafe = []
        let revs = [];
        const reviews = []
        const resp2 = await db.findAllQuery(Review, {cafeName: cafe_id}, function(result2) {
            if(result2 != false){
                revs = result2
            }
        });

        for(let i = 0; i < revs.length; i++){
            const resp3 = await db.findOne(User, {_id: revs[i].reviewer}, function(result3) {
                    reviews.push({
                        review: revs[i].review,
                        reviewdate: revs[i].dateCreated.toString().substring(0, 15),
                        rating: revs[i].rating,
                        cafeName: revs[i].cafeName,
                        username: result3.firstname + " " + result3.lastname,
                        dateModified: revs[i].dateModified,
                        up: revs[i].upvotes,
                        down: revs[i].downvotes,
                        media: revs[i].mediaPath,
                        profilepic: result3.profilepic,
                        title: revs[i].review_title,
                        date: result3.dateCreated.toString().substring(11, 15)
                    });
                });
            }
            
        const resp4 = await db.findOne(Cafe, {_id: cafe_id}, function(result4) {
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
       res.render("viewCafe", {
            layout: 'cafeTemplate',
            cafePage: cafe,
            reviews: reviews,
            session: isLogged
       });

    },
    
    deleteReview: async function(req, res) {
        const review_id = req.body.user_id;
        const cafe_id = req.body.cafe_id;
        let ownerreplyID;
        console.log(review_id + cafe_id)
        const resp2 = await db.findOne(Review, {reviewer: review_id, cafeName: cafe_id}, function(flag) {
            if(flag.ownerReply != null){
                ownerreplyID = flag.ownerReply;                
            }
        });

        const resp3 = await db.deleteOne(Reply, {_id: ownerreplyID}, function(flag) {
            if(flag != false){
                console.log("Owner reply deleted");
            }
            else{
                console.log("Owner reply not deleted");
            }
        });
        
        const resp = await db.deleteOne(Review, {reviewer: review_id, cafeName: cafe_id}, function(flag) {
            if(flag != false){
                console.log("Review deleted");
            }
            else{
                console.log("Review not deleted");
            }
        });
        res.sendStatus(200);
    },

    editReview: async function(req, res) {
        const review_id = req.body.user_id;
        const cafe_id = req.body.cafe_id;
        const newReview = req.body.review;
        const newTitle = req.body.review_title;
        const newRating = req.body.rating;
        console.log(newRating)
        const resp = await db.updateOne(Review, {reviewer: review_id, cafeName: cafe_id}, {review: newReview, review_title: newTitle, rating: newRating}, function(flag) {
            if(flag != false){
                console.log("Review updated");
            }
            else{
                console.log("Review not updated");
            }
        });
    }

}

export default controller;