import mongoose from 'mongoose';

const url = process.env.MONGODB_URI;

const database = {

    connect: function () {
        mongoose.connect(url).then(function() {
            console.log('Connected to: ' + url);
        }).catch(function(error) {
            console.log(error)
        });
    }
}

export default database;