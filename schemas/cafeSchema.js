import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const cafeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        //required: true,
        //unique: true
    },
    description: {
        type: String
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
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    image: String,

    rating: {
        type: Number,
        required: true,
        default: 0
    },

    price: {
        type: Number,
        required: true,
        default: 0
    }
});

export const Cafe = mongoose.model('Cafes', cafeSchema);