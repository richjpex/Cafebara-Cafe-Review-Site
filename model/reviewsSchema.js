import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const reviewsSchema = new Schema({

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
        required: true
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
    },

    ownerReply: {
        type: Schema.Types.ObjectId,
        ref: 'Reply'
    }
});

reviewsSchema.index({cafeName: 1, reviewer: 1}, {unique: true});

export const Review = mongoose.model('Review', reviewsSchema);