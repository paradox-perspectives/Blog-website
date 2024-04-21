const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profile_picture: {
        type: String,
        default: 'https://www.kindpng.com/picc/m/451-4517876_default-profile-hd-png-download.png'
    },
    uploadCount: {
        type: Number,
        default: 0
    },
    lastUploadDate: {
        type: Date
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
