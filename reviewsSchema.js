import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const reviewsSchema = new Schema({

    //review_details is basically a combination of reviewer and estblishment ids from the db
    //more details @revew_detailsSchema
    //this just makes it so that a user can't have more than 1 review per est
    review_details:{
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
        immutable: true
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
    },

    mediaPath: String,

    dateCreated: {
        type: Date,
        required: true,
        default: Date.now()
    },

    dateModified: Date,

    upvotes: {
        type: Number,
        required: true,
        default: 0
    },

    downvotes: {
        type: Number,
        required: true,
        default: 0
    }

});

export const Reviews = mongoose.model('Reviews', reviewsSchema);