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
        type: String,
        default: "No description... Uncappy-bara :("
    },
    weekdays_avail:{
        type: String,
    },
    weekends_avail:{
        type: String,
    },
    website:{
        type: String,
        default: "N/A"
    },
    phone:{
        type: String,
        default: "N/A"
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

    image: {
        type: String,
        default: "./uploads/cafes/default_cafe.webp"
    },

    rating: {
        type: Number,
        required: true,
        default: 0
    },

    price: {
        type: Number,
        required: true,
        default: 100
    },

    dateCreated: {
        type: Date,
        default: Date.now()
    },

    menu: {
        type: String    }
});

export const Cafe = mongoose.model('Cafes', cafeSchema);