import db from '../schemas/db.js';
// Schema model imports
// These are basically the db collections
import { Cafe }             from '../schemas/cafeSchema.js';
import { Reviews }          from '../schemas/reviewsSchema.js';
import { Review_details }   from '../schemas/review_detailsSchema.js';
import { User }             from '../schemas/userSchema.js';
import multer       from 'multer';


let activeUser;
let currentEst ;

const storage = multer.diskStorage ({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // The folder where uploaded images will be stored
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.originalname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// upload multer
export const upload = multer({ storage: storage });

export const controller = {

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

    registerUser:  async function(req, res) {
        try {
            const userdata = req.body;
            console.log("hi");
            console.log(userdata);
            
            // check if email exists in either User or cafe colleciton
            const existingUser = await User.findOne({email: userdata.email});
            const existingCafe = await Cafe.findOne({email: userdata.email});

            

            if (existingUser || existingCafe) {
                const queryParams = new URLSearchParams();
                queryParams.append('usertype', userdata.usertype);
                queryParams.append('message', 'Email already exists!');
                const queryString = queryParams.toString();
                return res.redirect(`register${queryString}`);
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
                        
                    //save to db
                    newUser.save().then(function (err) {
                        if (err) {
                            const queryParams = new URLSearchParams();
                            queryParams.append('message', 'Error creating user!');
                            return res.redirect(`./html/guest-views/register.html?${queryParams.toString()}`);
                        }
                        res.redirect('../../html/user-views/index.html');
                    });
                }   
                else if(userdata.usertype ==='owner'){
                    // create new est profile
                    
                    const newCafe = new Cafe({
                        name: userdata.estname,
                        address: userdata.estaddress,
                        email: userdata.email,
                        password: userdata.password,
                        address: userdata.estaddress
                    });
                    console.log(newCafe);
                    //save to db
                    newCafe.save().then(function (err) {
                        if (err) {
                            console.log(err);
                            const queryParams = new URLSearchParams();
                            queryParams.append('message', 'Error creating establishment!');
                            return res.redirect(`./register?${queryParams.toString()}`);
                        }
                        res.redirect('/index');
                    });
                }
            }
        } catch (err) {
            console.error(err);
            return res.sendStatus(500);
        }
    },

    loginUser: async function(req, res) {
        try {
            const userdata = req.body;
            

            delete userdata.submit;
            console.log(userdata);
            
            const user = await db.findOne(User, userdata, {}); 
                if (user) {
                  console.log('User found:', user);
                } else {
                  console.log('User not found.');
                }
             
            
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

                    res.redirect(`/?user=${activeUser.email}`);
                }
                if(current_cafe){
                    activeUser = current_cafe;
                    //TODO this
                    res.render('owner-profile', { activeUser });
                }
            }
            // user and/or pass doesn't exist
            else{
                const queryParams = new URLSearchParams();
                queryParams.append('message', 'Invalid email or password!');
                const queryString = queryParams.toString();
                console.log(queryString)
                return res.redirect(`/login?${queryString}`);
                
            }
        } catch (err) {
        console.error(err);
        return res.sendStatus(500);
        }
    },

    writeReview: async function(req, res) {
        try{
            const review_data = req.body;
            console.log(review_data);

            
            const newReview_details = new Review_details({
                estName: currentEst,
                reviewer: activeUser
            })

            
            const newReview = new Review({
                review_details: newReview_details,
                review_title: request.body,
                reviewee: activeUser,
                estname: currentEst,
            })
            const db = getDb();
            const collection = await db.collection('reviews');
            //const temp_review = await collection.insertOne(review_data);
            console.log(currentCafe);
            const temp_user = await collection.insertOne({...review_data, estname: currentCafe, reviewee: activeUser});
            console.log(temp_user.reviewee.firstname);
            //await collection.updateOne({_id: temp_review._id}, {$set: { estname: currentEst }});
            res.redirect('/cafe/'+currentCafe);
            res.redirect('/cafe/'+currentEst);
            

        }
        catch(err){
            console.error(err);
            return res.sendStatus(500);
        }
    }


}

export default controller;