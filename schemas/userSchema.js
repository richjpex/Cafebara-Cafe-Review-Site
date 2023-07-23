import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({

    password: {
        type: String, 
        required:true
    },
    email: {
        type: String, 
        required: true, 
        unique: true
    },
    firstname: String,

    lastname: String,
    
    dateCreated: {
        type: Date, 
        required: true,
        default: Date.now()
    },

    profilepic: String,

    bio: String,
    
    birthday: {
        type: Date
    }
});

export const User = mongoose.model('User', userSchema);