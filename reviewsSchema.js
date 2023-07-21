import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const reviewsSchema = new Schema({

    //probably change estName and reviewer into an array
    //and set unique: true
    //to prevent multiple reviews from the same user to the same est
    //im not sure if it will work though
    estName: {
        type: Schema.Types.ObjectId,
        ref: 'Est',
        required: true
    },
    reviewer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    review_title: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }

});

export const Reviews = mongoose.model('Reviews', reviewsSchema);