import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const replySchema = new Schema({

    reply_text: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true,
        immutable : true,
        default: Date.now()
    }
    
});

export const Reply = mongoose.model('Reply', replySchema);