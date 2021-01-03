const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
    userNum: {
        type: Number,
        required: true,
        unique: true
    },
    nickname: {
        type: String,
        required: true,
    },
    rank: {
        type: Number
    },
    mmr: {
        type: Number
    },
    updateDate: {
        type: Date,
        default: Date.now
    },
}, {
    versionKey: false,
    strict: false
})

module.exports = mongoose.model('user', userSchema);