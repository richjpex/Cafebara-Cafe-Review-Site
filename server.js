require('dotenv/config');   // environment variables
const dbconn = require('./conn.js');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { URLSearchParams } = require('url');
const { ObjectId } = require('mongodb');
const fs = require('fs');


const app = express();
const port = process.env.SERVER_PORT;



// current signed up user
let activeUser, currentEst;


// express stuff
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// load views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public/html/user-views'));
app.set('views', path.join(__dirname, 'public/html/cafes'));


// register
app.post('/register', async (req, res) => {
    try {
        const userdata = req.body;
        console.log(userdata);    
        const db = dbconn.getDb();
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
                
                delete userdata.usertype;
                delete userdata.confirmpassword;
                delete userdata.submit;
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

                delete userdata.usertype;
                delete userdata.confirmpassword;
                delete userdata.submit;
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

        const db = dbconn.getDb();

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

        const db = dbconn.getDb();
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
    const review_data = await dbconn.getDb().collection('reviews').find({estname: 'starbucks'}).toArray();
    console.log(review_data);
    console.log(review_data[0].reviewee.firstname);
    console.log(activeUser._id);
    const cafe_data = await dbconn.getDb().collection('cafes').findOne({_id: new ObjectId('64ad3715b9871bb37ff2993c')});
    console.log(cafe_data);
    

    res.render('cafe-view', { cafe_data, review_data });
});

// load Obscure cafe data
app.get('/cafe/obscure', async (req, res) => {
    currentEst = "obscure";
    console.log(activeUser._id);
    const cafe_data = await dbconn.getDb().collection('cafes').findOne({_id: new ObjectId('64ada22db9871bb37ff2994b')});
    console.log(cafe_data);
    res.render('cafe-view', { cafe_data, review_data });
});




// run index.html (guest-views)
app.get('/cafebara', (req, res) => {

    //const activeUser = req.query.activeUser;
    res.sendFile(path.join(__dirname, 'public/html/guest-views/index.html'));
});


// Connect to MongoDB
dbconn.connectToMongo((err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
  
    // Start the server
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});