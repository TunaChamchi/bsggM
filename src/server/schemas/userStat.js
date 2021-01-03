const mongoose = require('mongoose');

const { Schema } = mongoose;
const userStatSchema = new Schema({
    userNum: {
        type: Number,
        required: true,
        unique: true
    },
    totalGames: {
        type: Number,
        required: true
    },
    totalKills: {
        type: Number,
        required: true
    },
    maxKill: {
        type: Number,
        required: true
    },
    totalAssistants: {
        type: Number,
        required: true
    },
    totalMonsterKills: {
        type: Number,
        required: true
    },
    rank: {
        type: Number,
        required: true
    },
    top1: {
        type: Number,
        required: true
    },
    top3: {
        type: Number,
        required: true
    },
    seasonStats: {
        type: Object,
        required: true
    },
    characterStats: {
        type: Object,
        required: true
    },
}, {
    versionKey: false,
    strict: false
})

module.exports = mongoose.model('userStat', userStatSchema);