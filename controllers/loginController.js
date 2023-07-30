import { Cafe } from '../model/cafeSchema.js';
import { User } from '../model/userSchema.js';
import bcrypt from 'bcrypt';
import passport from 'passport';

const loginController = {

    getLogin: function (req, res) {
        if(req.isAuthenticated()){
            res.redirect('/');
        }
        else{
            res.render ('login', {layout: 'logregTemplate'});
        }
    },

    loginAuth: async function(req, res, next) {
        console.log(req.cookies)
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next);
    },

    logout: function (req, res) {
        req.logout(function(err) {
            if (err) { return next(err); }
            res.redirect('/');
          });
    },

    getRegister: async function (req, res) {
        if(req.isAuthenticated()){
            res.redirect('/');
        }
        else{
            res.render ('register', {layout: 'logregTemplate'});
        }
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
    }

}

export default loginController;