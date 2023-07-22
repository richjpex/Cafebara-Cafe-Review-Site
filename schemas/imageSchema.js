// Define a Mongoose schema for storing image paths in MongoDB
import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const imageSchema = new mongoose.Schema({
    path: String
});

export const Image = mongoose.model('Image', imageSchema);