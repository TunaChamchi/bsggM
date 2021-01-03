const mongoose = require('mongoose');

const { Schema } = mongoose;
const characterTierSchema = new Schema({
    versionMajor: {
        type: Number,
        required: true
    },
    versionMinor: {
        type: Number,
        required: true
    },
    matchingTeamMode : {
        type: Number,
        required: true
    },

    max: {
        type: Object,
        required: true
    },
    min: {
        type: Object,
        required: true
    },    
    avg: {
        type: Object,
        required: true
    },

    tier : {
        type: Object,
        required: true
        // tier: {
        //     type: Number,
        //     required: true
        // },
        // rank: {
        //     type: Number,
        //     required: true
        // },
        // winRate: {
        //     type: Number,
        //     required: true
        // },
        // pinkRate: {
        //     type: Number,
        //     required: true
        // },
        // avgKAM: {
        //     type: Number,
        //     required: true
        // },
        // avgRank: {
        //     type: Number,
        //     required: true
        // },
    }
}, {
    versionKey: false,
    strict: false
})

module.exports = mongoose.model('characterTier', characterTierSchema);