const mongoose = require('mongoose');

const { Schema } = mongoose;
const rankSchema = new Schema({
    userNum: {
        type: Number,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    rank: {
        type: Number,
        required: true
    },
    mmr: {
        type: Number,
        required: true
    },
    matchingTeamMode: {
        type: Number,
        required: true
    }
}, {
    versionKey: false // You should be aware of the outcome after set to false
})

module.exports = mongoose.model('rank', rankSchema);