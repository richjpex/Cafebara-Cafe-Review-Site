import db from '../model/db.js';
import {About} from '../model/aboutSchema.js';
import { Cafe } from '../model/cafeSchema.js';
import { Review } from '../model/reviewsSchema.js';
import { User } from '../model/userSchema.js';
import { Reply } from '../model/ownerReply.js';

const controller = {

    getIndex: async function(req, res) {
        try{
            if(req.isAuthenticated()){
                if(req.user.type == 'cafe'){
                    res.redirect('/myprofile');
                    return
                }
            }
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
                    rating: resp[i].rating
                });
            };

            res.render('cafes', {
                cafeCards: cafes,
                session: req.isAuthenticated(),
                isCafe: true
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
                cafe_id: cafe._id,
                rating: cafe.rating
            };

            res.render("viewCafe", {
                layout: 'cafeTemplate',
                cafePage: cafeView,
                reviews: reviewList,
                session: req.isAuthenticated(),
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
            cafe.rating = (cafe.rating + rating)/2;
            await cafe.save();

            res.sendStatus(200)
        } catch{
            res.sendStatus(400)
        }
    },

    profile: async function (req, res) {
        if(req.isAuthenticated()){
            if(req.user.type == 'user'){
                const userDetails = await User.findOne({_id: req.user.user._id});
                const reviews = await Review.find({reviewer: req.user.user._id});
                const reviewList = [];
                let five = 0;
                let four = 0;
                let three = 0;
                let two = 0;
                let one = 0;
                for(let i = 0; i < reviews.length; i++){
                    const cafe = await Cafe.findOne({_id: reviews[i].cafeName});
                    reviewList.push({
                        cafe: cafe.name,
                        title: reviews[i].review_title,
                        rating: reviews[i].rating,
                        reviewtext: reviews[i].review,
                        cafeimg: cafe.image,
                    })
                    switch(reviewList[i].rating){
                        case 5:
                            five++; break;
                        case 4:
                            four++; break;
                        case 3:
                            three++; break;
                        case 2:
                            two++; break;
                        case 1:
                            one++; break;
                    }
                }

                const userdetails = {
                    imgsrc: userDetails.profilepic,
                    username: userDetails.firstname + " " + userDetails.lastname,
                    memberyear: userDetails.dateCreated.toString().substring(11, 15),
                    bio: userDetails.bio,
                    go: five,
                    shi: four,
                    san: three,
                    ni: two,
                    ichi: one,
                }

                res.render ('userProfile', {
                    layout: 'profileTemplate', 
                    userProfile: userdetails,
                    reviews: reviewList,
                    session: req.isAuthenticated(),
                    isProfile: true
                });
            }
            else if(req.user.type == 'cafe'){

                const cafe = await Cafe.findOne({_id: req.user.user._id});
                const reviews = await Review.find({cafeName: req.user.user._id});
                const reviewList = [];
                let average = 0;
                for(let i = 0; i < reviews.length; i++){
                    const user = await User.findOne({_id: reviews[i].reviewer});
                    const reply = await Reply.findOne({_id: reviews[i].ownerReply});
                    reviewList.push({
                        reviewtext: reviews[i].review,
                        title: reviews[i].review_title,
                        media: reviews[i].mediaPath,
                        username: user.firstname + " " + user.lastname,
                        reviewdate: reviews[i].dateCreated.toString().substring(0, 15),
                        rating: reviews[i].rating,
                        memberyear: user.dateCreated.toString().substring(11, 15),
                        userimg: user.profilepic,
                        reviewId: reviews[i]._id,
                    })
                    if(reply != null){
                        reviewList[i].reply = reply.reply_text;
                        reviewList[i].reply_date = reply.date.toString().substring(0, 15);
                    }
                    average += reviews[i].rating;
                }
                average /= reviews.length;
                console.log(average)
                const cafedetails = {
                    cafeimg: cafe.image,
                    cafeName: cafe.name,
                    description: cafe.description,
                    numreviews: reviews.length,
                    rating: average
                }
                res.render ('cafeProfile', { //edit to correct one
                    layout: 'ownerTemplate',
                    ownerprofile: cafedetails,
                    reviews: reviewList,
                    session: req.isAuthenticated(),
                    owner: true
                });
            }
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

    editReview: async function(req, res) {
        try{
            const review_id = req.body.review_id;
            const newReview = req.body.review;
            const newTitle = req.body.review_title;
            const newRating = req.body.rating;

            if(newRating != 0){
                await Review.updateOne({_id: review_id}, {review: newReview, review_title: newTitle, rating: newRating, dateModified: Date.now()});
                const rev = Review.findOne({_id: review_id});
                const cafe = Cafe.findOne({_id: rev.cafeName});
                cafe.rating = (cafe.rating + newRating)/2;
            }
            else
                await Review.updateOne({_id: review_id}, {review: newReview, review_title: newTitle, dateModified: Date.now()});
            res.sendStatus(200);
        }
        catch(err){
            console.log(err);
            res.sendStatus(400)
        }
    },

     userProfile: async function (req, res) {
        try{
            const username = req.params.username;
            const split = username.split("%20")[0].split(" ");
            console.log(split)
            const userDetails = await User.findOne({firstname: split[0], lastname: split[1]});
            const reviews = await Review.find({reviewer: userDetails._id});
            const reviewList = [];
            let five = 0;
            let four = 0;
            let three = 0;
            let two = 0;
            let one = 0;
            for(let i = 0; i < reviews.length; i++){
                const cafe = await Cafe.findOne({_id: reviews[i].cafeName});
                reviewList.push({
                    cafe: cafe.name,
                    title: reviews[i].review_title,
                    rating: reviews[i].rating,
                    reviewtext: reviews[i].review,
                    cafeimg: cafe.image,
                })
                switch(reviewList[i].rating){
                    case 5:
                        five++; break;
                    case 4:
                        four++; break;
                    case 3:
                        three++; break;
                    case 2:
                        two++; break;
                    case 1:
                        one++; break;
                }
            }

            const userdetails = {
                imgsrc: userDetails.profilepic,
                username: userDetails.firstname + " " + userDetails.lastname,
                memberyear: userDetails.dateCreated.toString().substring(11, 15),
                bio: userDetails.bio,
                go: five,
                shi: four,
                san: three,
                ni: two,
                ichi: one,
            }

            res.render ('userProfile', {
                layout: 'profileTemplate', 
                userProfile: userdetails,
                reviews: reviewList,
                session: req.isAuthenticated()
            });
        }catch(err){
            res.sendStatus(400)
        }
    },

    reply: async function(req, res) {
        try{
            const review_id = req.body.reviewId;
            const reply = req.body.reply;

            const doc = {
                reply_text: reply,
                date: Date.now()
            }

            const newReply = new Reply(doc);
            await newReply.save();

            await Review.updateOne({_id: review_id}, {ownerReply: newReply._id});
        }
        catch(err){
            console.log(err);
            res.sendStatus(400)
        }

    }

    /*TODO
    - owner profile i feel there is stuff im missing
    
    - cafe menu should hold either an image or image path
    - implement pagination
    - finish register
    - edit profile page
    - upvotes and downvotes (might need to change how the db stores data so the page knows when the user has liked something already)
    - handle adding of media for reviews
    - change media in edit review
    - is the read more thing fixed?
    - fix magic and magic2.js for hashed passwords (and whatever change occurs bc of upvotes and downvotes)
    - dont forget to change passport-config to the hash password one
    */
    
}

export default controller;