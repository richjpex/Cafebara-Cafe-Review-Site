import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const aboutSchema = new Schema({
    name: String,
    position: String,
    bio: String,
    fb: String,
    twitter:String,
    insta:String,
    git:String,
    image:String
});

export const About = mongoose.model('About', aboutSchema);