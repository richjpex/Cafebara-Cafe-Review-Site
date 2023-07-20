import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const estSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    weekdays_avail:{
        type: String,
    },
    weekends_avail:{
        type: String,
    },
    website:{
        type: String
    },
    phone:{
        type: String
    },
    email:{
        type: String
    }
});

export const Est = mongoose.model('Est', estSchema);