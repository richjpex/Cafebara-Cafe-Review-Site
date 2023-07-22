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
});

export const User = mongoose.model('User', userSchema);