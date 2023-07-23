import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const replySchema = new Schema({

    reply_text: {
        type: String,
        required: true
    },

    date: {
        type: String,
        required: true,
        immutable : true,
        default: Date.now().toString().substring(0,10)
    }
    
});

export const Reply = mongoose.model('Reply', replySchema);