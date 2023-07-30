import db from '../model/db.js';
import {About} from '../model/aboutSchema.js';
import { Cafe } from '../model/cafeSchema.js';
import { Review } from '../model/reviewsSchema.js';
import { User } from '../model/userSchema.js';
import { Reply } from '../model/ownerReply.js';
import bcrypt from 'bcrypt';
import passport from 'passport';
import initPassport from './passport-config.js';

initPassport(passport);

const controller = {

    getIndex: async function(req, res) {
        try{
            const cafeCarouselCards = [];
            const resp = await Cafe.find().sort({dateCreated:-1}).limit(5)
            for(let i = 0; i < resp.length; i++){
                cafeCarouselCards.push({
                    cafeName: resp[i].name,
                    cafePath: resp[i].image,
                    avgPrice: resp[i].price
                });
            };
            res.render('index', {
                isIndex: true,
                carouselCards: cafeCarouselCards,
                session: req.isAuthenticated()
           });
        } catch{
            res.sendStatus(400);   
        }       
    },

    getAbout: async function(req, res) {
        if(req.user)
                console.log(req.user.user)
        try{
            const profilecards = [];
            const result = await About.find();
            
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
            };
            
            res.render('about', {
                isAbout: true,
                profilecards: profilecards,
                session: req.isAuthenticated()
            });
        }catch{
            res.sendStatus(400)
        }
    },

    getCafes: async function(req, res) {
        // your code here
        // do database stuff here
       try{
            const cafes = [];
            const resp = await Cafe.find()
            for(let i = 0; i < resp.length; i++){
                const result = await Review.find({cafeName: resp[i]._id});
                cafes.push({
                    cafeName: resp[i].name,
                    numOfReviews: result.length,
                    cafeShortInfo: resp[i].description,
                    open_details: resp[i].weekdays_avail,
                    cafeImg: resp[i].image,
                    price: resp[i].price,
                });
            };

            res.render('cafes', {
                cafeCards: cafes,
                session: req.isAuthenticated()
            });
        }catch{
            res.sendStatus(400)
        }
    },

    cafe: async function(req, res){
        try{
            const cafeName = req.params.cafeName;
    
            const cafe = await Cafe.findOne({name: cafeName}); 
            
            const reviews = await Review.find({cafeName: cafe._id});
    
            const reviewList = [];
            for(let i = 0; i < reviews.length; i++){
                const reply = await Reply.findOne({_id: reviews[i].ownerReply});

                const reviewer = await User.findOne({_id: reviews[i].reviewer});
                const author = (email == reviewer.email) ? true: false;
                    
                let review = {
                    review: reviews[i].review,
                    reviewdate: reviews[i].dateCreated.toString().substring(0, 15),
                    rating: reviews[i].rating,
                    username: reviewer.firstname + " " + reviewer.lastname,
                    dateModified: reviews[i].dateModified,
                    up: reviews[i].upvotes,
                    down: reviews[i].downvotes,
                    media: reviews[i].mediaPath,
                    profilepic: reviewer.profilepic,
                    title: reviews[i].review_title,
                    author: author,
                    date: reviewer.dateCreated.toString().substring(11, 15),
                    //could probably skip this
                    user_id: reviews[i].reviewer
                };
                if (reply != null) {
                    review.ownerreplydate = reply.date.toString().substring(0, 15);
                    review.ownerreply = reply.reply_text;
                }
                reviewList.push(review);
            }

            const cafeView = {
                cafeName: cafe.name,
                imgPath: cafe.image,
                description: cafe.description,
                weekday_avail: cafe.weekdays_avail,
                weekend_avail: cafe.weekends_avail,
                website: cafe.website,
                phonenumber: cafe.phone,
                price: cafe.price,
                numReviews: reviewList.length,
                menu: cafe.menu,
                address: cafe.address,
                cafe_id: cafe._id
            };

            res.render("viewCafe", {
                layout: 'cafeTemplate',
                cafePage: cafeView,
                reviews: reviewList,
                session: req.isAuthenticated()
            });
        }catch{
            res.sendStatus(400)
        }
 
     },

    // addReview: async function(req, res) {
    //     const cafeName = req.body.cafeName;
    //     const review = req.body.review;
    //     const review_title = req.body.review_title;
    //     const rating = req.body.rating;
    //     const dateCreated = req.body.dateCreated;
    //     const media = req.body.media;
    //     const user = email;
    //     let user_id;
    //     let cafe_id;
        
    //     const resp1 = await db.findOne(User, {email: user}, function(result) {
    //         if(result != false)
    //             user_id = result._id;
    //     });
    //     const resp2 = await db.findOne(Cafe, {name: cafeName}, function(result2) {
    //         if(result2){
    //             cafe_id = result2._id;
    //         }
    //     });
    //     const newReview = {
    //         cafeName: cafe_id,
    //         reviewer: user_id,
    //         review: review,
    //         review_title: review_title,
    //         rating: rating,
    //         dateCreated: dateCreated,
    //         mediaPath: media,
    //         ownerreply: null
    //     };

    //     const resp3 = await db.insertOne(Review, newReview, function(flag) {
    //         if(flag!=false){
    //             console.log("Review added");
    //         }
    //         else{
    //             console.log("Review not added");
    //         }
    //     });

    //     res.redirect('/review?cafeid=' + cafe_id);
    // },

    addReview: async function(req, res) {
        try{
            const cafeName = req.body.cafeName;
            const review = req.body.review;
            const review_title = req.body.review_title;
            const rating = req.body.rating;
            const dateCreated = req.body.dateCreated;
            const media = req.body.media;
            const email = req.user.user.email;
            
            const user = await User.findOne({email: email});
                
            const cafe = await Cafe.findOne({name: cafeName});
            const newDoc = {
                cafeName: cafe._id,
                reviewer: user._id,
                review: review,
                review_title: review_title,
                rating: rating,
                dateCreated: dateCreated,
                mediaPath: media,
                ownerreply: null
            };

            const newReview = new Review(newDoc);
            await newReview.save();
            res.sendStatus(200)
        } catch{
            res.sendStatus(400)
        }
    },

    getLogin: function (req, res) {
        res.render ('login', {layout: 'logregTemplate'});
    },

    // logsucc: function (req, res) {
    //     email = req.body.email;
    //     isLogged = 1;
    //     res.redirect(`/`);
    // },

    logout: function (req, res) {
        email = ``;
        isLogged = 0;
        res.redirect(`/`);
    },


    getRegister: async function (req, res) {
        res.render ('register', {layout: 'logregTemplate'});
    },

    register_user: async function (req, res) {
        try {
            const userdata = req.body;
            const existingUser = await User.findOne({email: userdata.email});
            if(existingUser){
                const queryParams = new URLSearchParams();
                queryParams.append('message', 'Email already exists!');
                const queryString = queryParams.toString();
                return res.redirect(`/register?${queryString}`);
            }
            else{
                if(userdata.password === userdata.confirmpassword){
                    const hashedPassword = await bcrypt.hash(req.body.password, 10);
                    const newUser = new User({
                        password: hashedPassword,
                        email: userdata.email,
                        firstname: userdata.firstname,
                        lastname: userdata.lastname
                    });
                    newUser.save();
                    res.sendStatus(200)
                }else{
                    const queryParams = new URLSearchParams();
                    queryParams.append('message', 'Passwords do not match!');
                    const queryString = queryParams.toString();
                    return res.redirect(`/register?${queryString}`);
                }
            }
        } catch (err) {
            console.error(err);
            return res.sendStatus(500);
        }
    },

    register_owner: async function (req,res){
        try{
            const userdata = req.body;
            const existingCafe = await Cafe.findOne({email: userdata.email});
            if(existingCafe){
                const queryParams = new URLSearchParams();
                queryParams.append('message', 'Email already exists!');
                const queryString = queryParams.toString();
                return res.redirect(`/register?${queryString}`);
            }
            else{
                if(userdata.password === userdata.confirmpassword){
                    const hashedPassword = await bcrypt.hash(req.body.password, 10);
                    const newCafe = new Cafe({
                        name: userdata.estname,
                        address: userdata.estaddress,
                        email: userdata.email,
                        password: hashedPassword
                    });
                    newCafe.save();
                    res.redirect('/login');
                }else{
                    const queryParams = new URLSearchParams();
                    queryParams.append('message', 'Passwords do not match!');
                    const queryString = queryParams.toString();
                    return res.redirect(`/register?${queryString}`);
                }
            }
        }catch{
            console.error(err);
            return res.sendStatus(500);
        }
    },
    // register_process: async function (req, res) {
    //     try {
    //         console.log("check");
    //         const userdata = req.body;

            
    //         console.log(userdata);
            
            
    //         // check if email exists in either User or cafe colleciton
    //         const existingUser = await db.findOne(User, {email: userdata.email}, function(result) {
    //             if(result != false)
    //                 user_id = result._id;
    //         });
    //         const existingCafe = await db.findOne(Cafe, {email: userdata.email}, function(result) {
    //             if(result != false)
    //                 user_id = result._id;
    //         });
            

    //         if (existingUser || existingCafe) {
    //             const queryParams = new URLSearchParams();
    //             queryParams.append('usertype', userdata.usertype);
    //             queryParams.append('message', 'Email already exists!');
    //             const queryString = queryParams.toString();
    //             return res.redirect(`/`);
    //         }
    //         else {
    //             if(userdata.usertype === 'customer'){
    //                 // create new user
    //                 const newUser = new User({
    //                     password: userdata.password,
    //                     email: userdata.email,
    //                     firstname: userdata.firstname,
    //                     lastname: userdata.lastname,
                        
    //                     });
    //                 console.log(newUser);
    //                 //save to db
    //                 newUser.save().then(function (err) {
    //                     if (err) {
    //                         console.log(err);
    //                         const queryParams = new URLSearchParams();
    //                         queryParams.append('message', 'Error creating user!');
    //                         return res.redirect(`/`);
    //                     }
    //                     res.redirect('/');
    //                 });
    //             }   
    //             else if(userdata.usertype ==='owner'){
    //                 // create new est profile
    //                 console.log(userdata)
    //                 const newCafe = new Cafe({
    //                     name: userdata.estname,
    //                     address: userdata.estaddress,
    //                     email: userdata.email,
    //                     password: userdata.password,
    //                 });

    //                 //save to db
    //                 newCafe.save().then(function (err) {
    //                     if (err) {
    //                         const queryParams = new URLSearchParams();
    //                         queryParams.append('message', 'Error creating establishment!');
    //                         return res.redirect(`/`);
    //                     }
    //                     res.redirect('/');
    //                 });
    //             }
    //         }
    //     } catch (err) {
    //         console.error(err);
    //         return res.sendStatus(500);
    //     }
    //     // insert information into DB here
    //     /*
    //     @BANANZAI
    //     req.body.email
    //     req.body.firstname
    //     req.body.lastname
    //     req.body.password
    //     req.body.confirmpassword

    //     req.body.estname
    //     req.body.estaddress
    //     */
    // },

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
    },
    
    loginAuth: async function(req, res, next) {
        console.log(req.cookies)
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next);
    }

}

export default controller;