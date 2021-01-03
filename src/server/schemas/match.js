const mongoose = require('mongoose');

const { Schema } = mongoose;
const matchSchema = new Schema({
    userNum: {
        type: Number,
        required: true
    },
    gameId: {
        type: Number,
        required: true
    },
    seasonId: {
        type: Number,
        required: true
    },
    matchingMode: {
        type: Number,
        required: true
    },
    matchingTeamMode: {
        type: Number,
        required: true
    },
    characterNum: {
        type: Number,
        required: true
    },
    characterLevel: {
        type: Number,
        required: true
    },
    gameRank: {
        type: Number,
        required: true
    },
    playerKill: {
        type: Number,
        required: true
    },
    playerAssistant: {
        type: Number,
        required: true
    },
    monsterKill: {
        type: Number,
        required: true
    },

    bestWeapon: {
        type: Number,
        required: true
    },
    equipment: {
        type: Object,
        required: true
    },
    skillLevelInfo: {
        type: Object,
        required: true
    },
    skillOrderInfo: {
        type: Object,
        required: true
    },
    damageToPlayer: {
        type: Number,
        required: true
    },

    equipmentOrder: {
        type: String,
        required: true

    },
    skillOrder: {
        type: String,
        required: true
    },

    playTime: {
        type: Number,
        required: true
    },
    teamNumber: {
        type: Number
    },

    killerUserNum: {
        type: Number
    },
    killer: {
        type: String
    },
    killDetail: {
        type: String
    },

    mmrBefore: {
        type: Number,
        required: true
    },

    startDtm: {
        type: Date,
        required: true
    },
    versionMajor: {
        type: Number,
        required: true
    },
    versionMinor: {
        type: Number,
        required: true
    }
}, {
    versionKey: false // You should be aware of the outcome after set to false
})

module.exports = mongoose.model('match', matchSchema);