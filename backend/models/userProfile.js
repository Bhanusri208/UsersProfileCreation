const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    profession: {
        type: String,
        required: true,
    }
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;