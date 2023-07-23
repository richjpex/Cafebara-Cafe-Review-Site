import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const reviewsSchema = new Schema({

    // review_details depreciated... use cafeName and reviewer instead
    // code that has index in it below does the thing but better
    // review_details:{
    //     type: Schema.Types.ObjectId,
    //     required: true,
    //     unique: true,
    //     immutable: true
    // },

    cafeName:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Cafe',
        immutable: true
    },

    reviewer:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
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
    modified: {
        type: Boolean,
        required: true,
        default: false
    },
    
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

reviewsSchema.index({cafeName: 1, reviewer: 1}, {unique: true});

export const Reviews = mongoose.model('Reviews', reviewsSchema);