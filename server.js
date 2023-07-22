import dotenv from 'dotenv';   // environment variables
dotenv.config();
import {connectToMongo, getDb} from './conn.js';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { URLSearchParams } from 'url';
import { ObjectId } from 'mongodb';
import fs from 'fs';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import mongoose from 'mongoose';





const app = express();
const port = process.env.SERVER_PORT;

mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // The folder where uploaded images will be stored
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.originalname + '-' + uniqueSuffix);
  }
});

const upload = multer({ storage: storage });

// Define a Mongoose schema for storing image paths in MongoDB
const imageSchema = new mongoose.Schema({
    path: String
});
const Image = mongoose.model('Image', imageSchema);

// current signed up user
let activeUser, currentEst;


// express stuff
app.use(express.static(path.join(dirname(fileURLToPath(import.meta.url)), 'public')));
app.use('/uploads', express.static(path.join(dirname(fileURLToPath(import.meta.url)), 'uploads')));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// load views
app.set('view engine', 'ejs');
app.set('views', [
    path.join(dirname(fileURLToPath(import.meta.url)), 'public/html/user-views'),
    path.join(dirname(fileURLToPath(import.meta.url)), 'public/html/cafes')
]);


// register
app.post('/register', upload.single('profilepic'), async (req, res) => {
    try {
        const userdata = req.body;
        console.log(userdata);  
        const imagePath = req.file.path;
        const image = new Image({ path: imagePath });
        
        const db = getDb();
        var collection;


        // user is customer
        if(userdata.usertype === 'customer'){
            collection = db.collection('user-customers');
            const existingUser = await collection.findOne({email: userdata.email});
            
            // if user already exists
            if (existingUser) { 
                const queryParams = new URLSearchParams(userdata);
                queryParams.append('message', 'Email already exists!');
                const queryString = queryParams.toString();
                return res.redirect(`./html/guest-views/register.html?${queryString}`);
            }

            // create new user
            else{      
                delete userdata.profilepic;          
                delete userdata.usertype;
                delete userdata.confirmpassword;
                delete userdata.submit;
                userdata['profilepic'] = image;
                activeUser = userdata;
                await collection.insertOne(activeUser);
                res.redirect('../../html/user-views/index.html');
            }   
                    
        }

        // user is owner
        else if(userdata.usertype ==='owner'){
            collection = db.collection('user-owners');
            const existingUser = await collection.findOne({email: userdata.email});
            
            // if user already exists
            if (existingUser) { 
                const queryParams = new URLSearchParams(userdata);
                queryParams.append('message', 'Email already exists!');
                const queryString = queryParams.toString();
                return res.redirect(`./html/guest-views/register.html?${queryString}`);
            }

            // create new user
            else{

                // Assuming you have the binary data in a file
                const binaryFilePath = req.file.path;
                const binaryData = fs.readFileSync(binaryFilePath);

                // Convert the binary data to a Base64 string
                const base64Data = binaryData.toString('base64');

                // Create an object containing the Base64 data
                const imageObject = {
                base64Data,
                mimetype: 'image/png', // Replace with the appropriate MIME type of your binary file
                };

                delete userdata.profilepic;
                delete userdata.usertype;
                delete userdata.confirmpassword;
                delete userdata.submit;
                userdata['profilepic'] = imageObject;
                activeUser = userdata;
                await collection.insertOne(activeUser);
                res.render('owner-profile', { activeUser });
            }
        }
        
        
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
});

// login
app.post('/login', async (req, res) => {
    try {
        const userdata = req.body;
        console.log(userdata);

        const db = getDb();

        const customer_user = await db.collection('user-customers').findOne({email: userdata.email});
        const owner_user = await db.collection('user-owners').findOne({email: userdata.email});
        
        // check if user is a customer
        if(customer_user){
            activeUser = customer_user;
            res.redirect('../../html/user-views/index.html');

        }

        // check if user is an owner
        else if(owner_user){
            activeUser = owner_user;
            res.render('owner-profile', { activeUser });
            //res.redirect('../../html/user-views/owner-profile.html');
        }

        // user and/or pass doesn't exist
        else{
            const queryParams = new URLSearchParams(userdata);
            queryParams.append('message', 'Invalid username or password');
            const queryString = queryParams.toString();
            return res.redirect(`./html/guest-views/login.html?${queryString}`);
            
        }
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }

});

// store reviews
app.post('/review', async (req, res) => {
    try{
        const review_data = req.body;
        console.log(review_data);

        const db = getDb();
        const collection = await db.collection('reviews');
        //const temp_review = await collection.insertOne(review_data);
        console.log(currentEst);
        const temp_user = await collection.insertOne({...review_data, estname: currentEst, reviewee: activeUser});
        console.log(temp_user.reviewee.firstname);
        //await collection.updateOne({_id: temp_review._id}, {$set: { estname: currentEst }});
        res.redirect('/cafe/'+currentEst);

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
app.get('/cafe/starbucks', async (req, res) => {
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
    currentEst = "obscure";
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


// Connect to MongoDB
connectToMongo((err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
  
    // Start the server
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});