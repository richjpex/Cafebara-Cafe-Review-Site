
/***
 * Server.js
 * 
 * This file is pretty much the server and
 * guides the user to everything in the website.
 */

/***
 * !!! BEGINNING OF ENVIRONMENT VARIABLES AND IMPORTS !!!
 */

// Importing DOTENV
import dotenv from 'dotenv'; 
dotenv.config();

// Importing MONGODB, EXPRESS, BODYPARSER, MONGOOSE, PATH
// AND NODEJS LIBRARIES
import express      from 'express';
import handlebars   from 'express-handlebars';
import bodyParser   from 'body-parser';
import path         from 'path';
import mongoose     from 'mongoose';
import multer       from 'multer';
import fs           from 'fs';

// Importing objects from conn, url, mongodb, and path
import { connectToMongo, getDb }  from './conn.js';
import { URLSearchParams }      from 'url';
import { ObjectId }             from 'mongodb';
import { fileURLToPath }        from 'url';
import { dirname, join }        from 'path';


// Schema model imports
// These are basically the db collections
import { Cafe }             from './schemas/cafeSchema.js';
import { Review }          from './schemas/reviewsSchema.js';
import { User }             from './schemas/userSchema.js';

// declare app for Express library
const app = express();
const port = process.env.SERVER_PORT;

// stores all the images
// Don't try to disect it, it's basically storing images into the file system
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
const upload = multer({ storage: storage });

// current signed up user
let activeUser, currentCafe;

// express stuff
app.use ( express.static(path.join(dirname(fileURLToPath(import.meta.url)), 'public')));
app.use ( '/uploads', express.static(path.join(dirname(fileURLToPath(import.meta.url)), 'uploads')));
app.use ( express.urlencoded({ extended: true }));
app.use ( bodyParser.urlencoded({ extended: true }));
app.use ( bodyParser.json() );

/***
app.set('view engine', 'ejs');
app.set('views', [
    path.join(dirname(fileURLToPath(import.meta.url)), 'public/html/user-views'),
    path.join(dirname(fileURLToPath(import.meta.url)), 'public/html/cafes')
]);
*/

// testing handlebars
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine({
	layoutsDir: `${__dirname}/views/layouts`,
	extname: 'hbs',
	defaultLayout: 'index',
    partialsDir: `${__dirname}/views/partials`
}));

app.use(express.static('public'));
app.get('/', (req, res) => {
	res.render ('index', {layout: 'main'});
});

/*
app.get('/logins', (req, res) => {
    res.render ('login', {layout: 'main'});
});
*/
/*** 
app.get('/different directory view estab;ish')
res.render ('view_establishments!', 'layout: main', ??)
*/


main()
async function main(){

    try{
        // This block connects to the database
        mongoose.connect('mongodb://localhost:27017/apdev_test', { useNewUrlParser: true, useUnifiedTopology: true });
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });

        // This block handles new registers

        app.post('/register', upload.single('profilepic'), async (req, res) => {
            try {
                const userdata = req.body;
                console.log(userdata);
				
                // check if email exists in either User or cafe colleciton
                const existingUser = await User.findOne({email: userdata.email});
                const existingCafe = await Cafe.findOne({email: userdata.email});

                if (existingUser || existingCafe) {
                    const queryParams = new URLSearchParams();
                    queryParams.append('usertype', userdata.usertype);
                    queryParams.append('message', 'Email already exists!');
                    const queryString = queryParams.toString();
                    return res.redirect(`./html/guest-views/register.html?${queryString}`);
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
                                return res.redirect(`./html/guest-views/register.html?${queryParams.toString()}`);
                            }
                            res.redirect('../../html/user-views/index.html');
                        });
                    }
                }
            } catch (err) {
                console.error(err);
                return res.sendStatus(500);
            }
        });
    
        // This block handles logins
        app.post('/login', async (req, res) => {
            try {
                const userdata = req.body;
                console.log(userdata);
                
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
                        /***
                         * TO DO:   @everyone
                         *          Use ? system when logging in,
                         *          index.html?user=askjdnsakd&pw=asdjksandjkas
                         *    
                         */
                        res.redirect('../../html/user-views/index.html');
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
                    return res.redirect(`./html/guest-views/login.html?${queryString}`);
                    
                }
            } catch (err) {
            console.error(err);
            return res.sendStatus(500);
            }
    
        });
    
        //I havent touched anything below here yet so stuff might be broken

        // store reviews
        app.post('/review', async (req, res) => {
            try{
                const review_data = req.body;
                console.log(review_data);

                /*
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
                */
    
            }
            catch(err){
                console.error(err);
                return res.sendStatus(500);
            }
        });
    
        // load profile data of a user to the my profile page
        app.get('/profile', async (req, res) => {
            res.render('user-profile', { activeUser });
        });
    
        app.get('/cafe', async (req, res) => {
            console.log('cafe router');
        });
    
    
        // load Starbucks cafe data
        app.get('/cafe/starbucks-coffee', async (req, res) => {
            currentEst = "starbucks";
            const review_data = await getDb().collection('reviews').find({estname: 'starbucks'}).toArray();
            console.log(review_data);
            console.log(review_data[0].reviewee.firstname);
            console.log(activeUser._id);
            const cafe_data = await getDb().collection('cafes').findOne({_id: new ObjectId('64ad3715b9871bb37ff2993c')});
            console.log(cafe_data);
            
    
            res.render('cafe-view', { cafe_data, review_data });
        });
    
        // load Obscure cafe data
        app.get('/cafe/obscure', async (req, res) => {
            currentCafe = "obscure";
            console.log(activeUser._id);
            const cafe_data = await getDb().collection('cafes').findOne({_id: new ObjectId('64ada22db9871bb37ff2994b')});
            console.log(cafe_data);
            res.render('cafe-view', { cafe_data, review_data });
        });
    
    
    
    
        // run index.html (guest-views)
        app.get('/cafebara', (req, res) => {
    
            //const activeUser = req.query.activeUser;
            res.sendFile(path.join(dirname(fileURLToPath(import.meta.url)), 'public/html/guest-views/index.html'));
        });
    
    
   
    
    } catch(err){
        console.error(err);
    }
}