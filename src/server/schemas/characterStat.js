const mongoose = require('mongoose');

const { Schema } = mongoose;
const characterStatSchema = new Schema({
    matchingTeamMode : {
        type: Number,
        required: true
    },
    versionMajor: {
        type: Number,
        required: true
    },
    versionMinor: {
        type: Number,
        required: true
    },

    characterNum: {
        type: Number,
        required: true
    },
    bestWeapon: {
        type: Number,
        required: true
    },
    
    // tier: {
    //     type: Number,
    //     required: true
    // },

    totalGames: {
        type: Number,
        required: true
    },
    totalKills: {
        type: Number,
        required: true
    },
    totalAssistants: {
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

    skillOrder: {
        type: Object,
        required: true
    },
    itemOrder: {
        type: Object,
        required: true
    },
    itemStats: {
        type: Object,
        required: true
    },
}, {
    versionKey: false,
    strict: false
})

module.exports = mongoose.model('characterStat', characterStatSchema);