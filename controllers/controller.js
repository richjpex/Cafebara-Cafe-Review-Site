import db from '../model/db.js';
import {About} from '../model/aboutSchema.js';
import { Cafe } from '../model/cafeSchema.js';
import { Review } from '../model/reviewsSchema.js';
import { User } from '../model/userSchema.js';
import { Reply } from '../model/ownerReply.js';

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
                let author = false;
                if(req.user){
                    author = (reviewer.email == req.user.user.email) ? true: false;
                }
                    
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
                    reviewId: reviews[i]._id,
                };
                if(reviews[i].dateModified != null)
                    review.editdate = reviews[i].dateModified.toString().substring(0, 15);
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
        }catch(err){
            console.log(err)
            res.sendStatus(400)
        }
 
     },

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

    profile: function (req, res) {
        if(req.isAuthenticated()){
            res.render ('userProfile', {
                layout: 'profileTemplate', 
                session: req.isAuthenticated()
            });
        }
        else{
            res.redirect('/');
        }
    },

    settings: function (req, res) {
        if(req.isAuthenticated()){
            res.render ('settings', {
                layout: 'profileTemplate', 
                session: req.isAuthenticated()
            });
        }
        else{
            res.redirect('/');
        }
    },

    // searchcafes: async function (req, res) {
    //     const cafes = [];
    //     console.log(`Search Query: ${req.body.search}`);
    //     // i call the db 
    //     // select * from est where=`%req.body.search%`
    //     // then just display everything
    //     // refresh page with the new list of cafes badabing badaboom!!!
        
    //     const v = await db.findAllQuery(Cafe, {name: { $regex : '.*' + req.body.search + '.*', $options: 'i'}}, async function(result){
    //             //write here what you want to happen after it finds teh stuff
     
    //             for(let i = 0; i < result.length; i++){
    //                 await db.findAllQuery(Review, {cafeName: result[i]._id}, function(result2) {
    //                     cafes.push({
    //                         cafeName: result[i].name,
    //                         numOfReviews: result2.length,
    //                         cafeShortInfo: result[i].description,
    //                         open_details: result[i].weekdays_avail,
    //                         cafeImg: result[i].image,
    //                         price: result[i].price,
    //                     });
    //                 })
    //             }
    //     });

    //     if (cafes.length == 0) {
    //         res.render('cafes', {
    //             cafeCards: cafes,
    //             error: "<h2 style='width: 100%; text-align: center;'>No results found...</h2>",
    //             session: req.isAuthenticated()
    //         });
    //     }
    //     else{
    //         res.render('cafes', {
    //             cafeCards: cafes,
    //             session: req.isAuthenticated()
    //         });
    //     }
        
    // },

    searchcafes: async function (req, res) {
        console.log(`Search Query: ${req.body.search}`);

        const cafes = [];
        const cafeList = await Cafe.find({name: { $regex : '.*' + req.body.search + '.*', $options: 'i'}})
        for(let i = 0; i < cafeList.length; i++){
            const review = await Review.find({cafeName: cafeList[i]._id})
            
            cafes.push({
                cafeName: cafeList[i].name,
                numOfReviews: review.length,
                cafeShortInfo: cafeList[i].description,
                open_details: cafeList[i].weekdays_avail,
                cafeImg: cafeList[i].image,
                price: cafeList[i].price,
            });
        }

        if (cafes.length == 0) {
            res.render('cafes', {
                cafeCards: cafes,
                error: "<h2 style='width: 100%; text-align: center;'>No results found...</h2>",
                session: req.isAuthenticated()
            });
        }
        else{
            res.render('cafes', {
                cafeCards: cafes,
                session: req.isAuthenticated()
            });
        }
        
    },
    
    //TODO this
    // deleteReview: async function(req, res) {
    //     const review_id = req.body.user_id;
    //     const cafe_id = req.body.cafe_id;
    //     let ownerreplyID;
    //     console.log(review_id + cafe_id)
    //     const resp2 = await db.findOne(Review, {reviewer: review_id, cafeName: cafe_id}, function(flag) {
    //         if(flag.ownerReply != null){
    //             ownerreplyID = flag.ownerReply;                
    //         }
    //     });

    //     const resp3 = await db.deleteOne(Reply, {_id: ownerreplyID}, function(flag) {
    //         if(flag != false){
    //             console.log("Owner reply deleted");
    //         }
    //         else{
    //             console.log("Owner reply not deleted");
    //         }
    //     });
        
    //     const resp = await db.deleteOne(Review, {reviewer: review_id, cafeName: cafe_id}, function(flag) {
    //         if(flag != false){
    //             console.log("Review deleted");
    //         }
    //         else{
    //             console.log("Review not deleted");
    //         }
    //     });
    //     res.sendStatus(200);
    // },

    deleteReview: async function(req, res) {
        try{
            const review_id = req.user.user._id;
            const cafe_id = req.body.cafe_id;
            const review = await Review.findOne({reviewer: review_id, cafeName: cafe_id});

            if(review.ownerReply != null){
                await Reply.deleteOne({_id: review.ownerReply});
            }

            await Review.deleteOne({reviewer: review_id, cafeName: cafe_id});
            res.sendStatus(200);
        }catch{
            res.sendStatus(400)
        }
    },
    

    // //TODO fix this
    // editReview: async function(req, res) {
    //     const review_id = req.body.user_id;
    //     const cafe_id = req.body.cafe_id;
    //     const newReview = req.body.review;
    //     const newTitle = req.body.review_title;
    //     const newRating = req.body.rating;
    //     console.log(newRating)
    //     const resp = await db.updateOne(Review, {reviewer: review_id, cafeName: cafe_id}, {review: newReview, review_title: newTitle, rating: newRating}, function(flag) {
    //         if(flag != false){
    //             console.log("Review updated");
    //         }
    //         else{
    //             console.log("Review not updated");
    //         }
    //     });
    // },

    editReview: async function(req, res) {
        try{
            const review_id = req.body.review_id;
            const newReview = req.body.review;
            const newTitle = req.body.review_title;
            const newRating = req.body.rating;
            await Review.updateOne({_id: review_id}, {review: newReview, review_title: newTitle, rating: newRating, dateModified: Date.now()});
            res.sendStatus(200);
        }
        catch(err){
            console.log(err);
            res.sendStatus(400)
        }
    },

    /*TODO
    - add owner reply
    - add owner reply date
    - add owner reply text
    - add upvotes and downvotes
    - add media
    - add date modified
    - add owner index (if statement using req.user.type)
      - adjust navbar accordingly
    */


    
}

export default controller;