import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String, 
        required: true, 
        unique: true
    },
    password: {
        type: String, 
        required:true
    },
    email: {type: String, 
        required: true, 
        unique: true},
    firstname: String,
    lastname: String,
    dateCreated: {
        type: Date, 
        required: true,
        default: Date.now()
    }
});

export const User = mongoose.model('User', userSchema);