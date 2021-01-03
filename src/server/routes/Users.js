const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const schedule = require('node-schedule');

const UserStat = require('../schemas/userStat');
const User = require('../schemas/user');
const Match = require('../schemas/match');
const { response } = require('express');

const router = express.Router();

const searchSeason = [0, 1];
const searchTeamMode = [1, 2, 3];
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

// 6시 0분에 전체 유저 전적 검색
schedule.scheduleJob('0 10 20 * * *', async () => {
    console.log(new Date().toString().slice(16,24), ': GetUserStat Start');
    const users = await User.find({}, { _id:0, userNum: 1 }, { sort : { updateDate: 1 }});

    for (let i = 0 ; i < users.length ; i++) {        
        await getUserData(users[i]['userNum']);
    }

    console.log(new Date().toString().slice(16,24), ': GetUserStat Complete');
})

const getUserSreach = async (userName) => {
    while (true) {
        try {
            return await axios.get('https://open-api.bser.io/v1/user/nickname?query='+encodeURI(userName), {
                    headers: {
                        'x-api-key': 'sWNQXtP4Po3Sd1dWWzHqT5EZSKQfj8478omeZWg0'
                    }
            });
        } catch (error) {
            if (error.response.status !== 429) {
                console.log(new Date().toString().slice(16,24), ': getUserStats() Error', error.response.status, '{ userName }', { userName });
                return;
            }
            
            await sleep(250);
        }
    }
};
const getUserStats = async (userNum, seasonId) => {
    while (true) {
        try {
            return await axios.get('https://open-api.bser.io/v1/user/stats/'+userNum+'/'+seasonId, {
                    headers: {
                        'x-api-key': 'sWNQXtP4Po3Sd1dWWzHqT5EZSKQfj8478omeZWg0'
                    }
            });
        } catch (error) {
            if (error.response.status !== 429) {
                console.log(new Date().toString().slice(16,24), ': getUserStats() Error', error.response.status, '{ userNum, seasonId }', { userNum, seasonId });
                return;
            }
            
            await sleep(250);
        }
    }
};
const getUserGame = async (userNum, next) => {
    while (true) {
        try {
            return await axios.get('https://open-api.bser.io/v1/user/games/'+userNum + (next?'?next='+next:''), {
                    headers: {
                        'x-api-key': 'sWNQXtP4Po3Sd1dWWzHqT5EZSKQfj8478omeZWg0'
                    }
            });
        } catch (error) {
            if (error.response.status !== 429) {
                console.log(new Date().toString().slice(16,24), ': getUserGame() Error', error.response.status, '{ userNum, next }', { userNum, next });
                return;
            }
            
            await sleep(250);
        }
    }
};

// 메인 화면 유저 이름 검색
router.get('/', async (req, res, next) => {
    console.log('/', req.query);
    const search = req.query.search;

    const users = await UserStat.find({ nickname: { $regex: '^'+search } });
    res.json(users.slice(0, 5));
});

// 유저 검색 DB
router.get('/:userName', async (req, res, next) => {
    console.log('/:userName', req.params);
    const userName = req.params.userName;

    let user = await User.findOne({ nickname: userName });
    if (!user) {
        await getUserData(userName);
        user = await User.findOne({ nickname: userName });
    }
    const userStat = await UserStat.findOne({ nickname: userName });
    
    const ranking = {};
    if (userStat && userStat['seasonStats'] && userStat['seasonStats'][1]) {
        for (const key in userStat['seasonStats'][1]) {
            ranking[key] = await UserStat.find({ ["seasonStats.1."+key+".mmr"]: { $gt: userStat['seasonStats'][1][key]['mmr'] } }).count();
            ++ranking[key];
        }
    }

    const response = {
        user:user,
        userStat:userStat,
        ranking:ranking
    }
    res.json(response);
});

// 유저 전적 검색 DB
router.get('/:userNum/match', async (req, res, next) => {
    console.log('/:userNum/match', req.params, req.query);
    const userNum = parseInt(req.params.userNum) || -1;
    const matchMode =  parseInt(req.query.matchMode) || 0;
    const teamMode =  parseInt(req.query.teamMode) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const skip =  parseInt(req.query.skip) || 0;

    if (userNum === -1) {
        res.json(null);
    } else {
        const query = {
            userNum: userNum
        }
        if (matchMode !== 0)
            query['seasonId'] = matchMode;
        if (teamMode !== 0)
            query['matchingTeamMode'] = teamMode;

        const match = await Match.find(
            query, 
            null,
            {
                skip: skip,
                limit: limit,
                sort: { startDtm: -1 }
            }
        );
        
        res.json(match);
    }
});

// 유저 전적 갱신
router.get('/:userName/renew', async (req, res, next) => {
    console.log('/:userName/renew', req.params);
    const userName = req.params.userName;
    try {    
        await getUserData(userName);
        
        res.json('{ "code": 200, "message": "Success" }');
    } catch (error) {
        res.json('{ "code": 500, "message": "Fail" }');
    }
});

// 상제 전적
router.get('/Detail/:gameId', async (req, res, next) => {
    console.log('/Detail/:gameId', req.params);
    const gameId = parseInt(req.params.gameId);

    //const match = await Match.find({ gameId: gameId }, null, { sort: { gameRank: 1 } });
    const match = await Match.aggregate([
        { $match: { gameId: gameId } }, 
        { 
            $project: {
                _id:0,
                gameRank:1,
                userNum:1,
                characterNum:1,
                equipment:1,
                killDetail:1,
                damageToPlayer:1,
                mmrBefore:1,
                playerKill:1,
                playerAssistant:1,
                matchingTeamMode:1,
            }
        }, 
        { 
            $lookup: {
                from: 'users',
                localField: 'userNum',
                foreignField: 'userNum',
                as: 'user'
            }
        },
        { $sort: { gameRank: 1 } }
    ]);
    res.json(match);
});

// 유저 전적 검색 API
router.post('/userData', async (req, res, next) => {
    const userNum = parseInt(req.query.userNum);
    await getUserData(userNum);

    const response = { 
        code: 200, 
        message: 'Success'
    }
    res.json(response);
});

module.exports = router;

const getUserData = async (userName) => {
    // api에서 유저 검색
    const u = (await getUserSreach(userName)).data.user;
    if (!u) {
        return;
    }

    const userNum = u.userNum;
    const nickname = u.nickname;
    
    // 유저 등록
    const user = {
        userNum: userNum,
        nickname: nickname,
        updateDate: Date.now()
    }
    await User.findOneAndUpdate({ userNum: user['userNum'] }, user, { upsert:true });

    // 최근 매치 전적 검색
    const matchLately = await Match.findOne({ userNum:userNum }, null, { sort: { startDtm:-1 } });
    let lately;

    if (matchLately !== null)
        lately = new Date(matchLately['startDtm']);
    else
        lately = new Date('2020-01-01');

    // 매치 검색
    let isChange = false;
    let next;
    while(true) {
        const _matchs = await getUserGame(userNum, next);
        const matchs = _matchs.data.userGames;
        next = _matchs.data.next;

        if (!matchs)
            return;
        
        const insertMatchs = matchs.filter(m => new Date(m['startDtm']) > lately);

        if (insertMatchs.length !== 0) {
            isChange = true;

            for (var i = 0 ; i < insertMatchs.length ; i++) {
                const m = insertMatchs[i];
                let equipmentOrder = '_';
                let skillOrder = '_';

                for (const key in m['equipment']) {
                    equipmentOrder += m['equipment'][key] + '_';
                }

                const keys = Object.keys(m['skillOrderInfo']).filter(code => parseInt(m['skillOrderInfo'][code]/1000000)!==3);
                if (keys.length >= 16) {
                    for (var j = 0 ; j < 16 ; j++) {
                        const key = keys[j];
                        let skillCode = parseInt(m['skillOrderInfo'][key]);
                        if (skillCode > 1016500 && skillCode < 1017000) {
                            m['skillOrderInfo'][key] -= 400;
                            skillCode -= 400;
                        }
                        if (skillCode === 1016900) {
                            m['skillOrderInfo'][key] = 1016900;
                            skillCode = 1016900;
                        }
                        skillOrder += skillCode + '_';
                    }
                }

                m['equipmentOrder'] = equipmentOrder;
                m['skillOrder'] = skillOrder;

                const _ = await new Match(m).save();
            }
        } else {
            break;
        }

        if (!next)
            break;
    }

    // 매치 추가 확인
    if (!isChange) {
        console.log('isChange : ', isChange);
        return null;
    }

    // userStat 변경
    const userStat = (await getUserStats1(userNum))[0];
    try {
        delete userStat['_id'];
    } catch (err) {
        console.log('getUserData : ', userNum, userStat);
        return;
    }
    userStat['userNum'] = userNum;
    userStat['nickname'] = nickname;
    
    userStat['seasonStats'] = {};
    for (var i = 0 ; i < searchSeason.length ; i++) {
        const seasonId = searchSeason[i];
        userStat['seasonStats'][seasonId] = {};

        const teamModeStats = await getUserStats2(userNum, seasonId);
        for (var j = 0 ; j < teamModeStats.length ; j++) {
            const teamModeStat = teamModeStats[j];
            const teamMode = teamModeStat['_id'];
            delete teamModeStat['_id'];
            teamModeStat['characterStats'] = {};

            const characterStats = await getUserStats3(userNum, seasonId, teamMode);
            teamModeStat['mostCharacter'] = characterStats[0]['_id'];
            for (var k = 0 ; k < characterStats.length ; k++) {
                const characterStat = characterStats[k];
                const characterCode = characterStat['_id'];
                delete characterStat['_id'];

                teamModeStat['characterStats'][characterCode] = characterStat;
            }
            
            userStat['seasonStats'][seasonId][teamMode] = teamModeStat;
        }

        // mmr  값 가져오기
        const _user = await getUserStats(userNum, seasonId);//.userStats;
        const user = _user.data.userStats;
        if (user !== undefined) {
            for (let j = 0 ; j < user.length ; j++) {
                const _userStats = user[j];
                const teamMode = _userStats['matchingTeamMode'];

                try {
                    userStat['seasonStats'][seasonId][teamMode]['mmr'] = _userStats['mmr'];
                    userStat['seasonStats'][seasonId][teamMode]['rankPercent'] = _userStats['rankPercent'];
                } catch (err) {
                    console.log('getUserData : ', nickname, userNum, seasonId, teamMode);
                    return null;
                }
            }
        }
    }
    
    const characterStats = await getCharacterStats(userNum);
    userStat['mostCharacter'] = characterStats[0]['_id'];
    userStat['characterStats'] = {};
    for (var i = 0 ; i < characterStats.length ; i++) {
        const characterStat = characterStats[i];
        const characterCode = characterStat['_id'];
        delete characterStat['_id'];

        userStat['characterStats'][characterCode] = characterStat;
    }

    await UserStat.findOneAndUpdate({ userNum: userStat['userNum'] }, userStat, { upsert:true });
    
    return 'Success'
}

const getUserStats1 = async (userNum) => {
    return await Match.aggregate([
        { $match: { userNum: userNum } },
        { 
            $group: {
                _id: '$userNum',
                totalGames: { $sum: 1 },
                totalKills:{ $sum: '$playerKill' },
                maxKill: { $max: '$playerKill' },
                totalAssistants:{ $sum: '$playerAssistant' },
                totalMonsterKills:{ $sum: '$monsterKill' },
                rank:{ $avg: '$gameRank' },
                top1: { 
                  $sum: {
                    $cond : [
                        { $eq: [ '$gameRank', 1 ] },
                        1, 
                        0
                    ]
                  }
                },
                top3: { 
                  $sum: {
                    $cond : [
                        { $lte: [ '$gameRank', 3 ] },
                        1, 
                        0
                    ]
                  }
                },
            }
        }
    ]);
}

const getUserStats2 = async (userNum, seasonId) => {
    return await Match.aggregate([
        { $match: { userNum: userNum, seasonId: seasonId } },
        { 
            $group: {
                _id: '$matchingTeamMode',
                totalGames: { $sum: 1 },
                totalKills:{ $sum: '$playerKill' },
                maxKill: { $max: '$playerKill' },
                totalAssistants:{ $sum: '$playerAssistant' },
                totalMonsterKills:{ $sum: '$monsterKill' },
                rank:{ $avg: '$gameRank' },
                top1: { 
                  $sum: {
                    $cond : [
                        { $eq: [ '$gameRank', 1 ] },
                        1, 
                        0
                    ]
                  }
                },
                top3: { 
                  $sum: {
                    $cond : [
                        { $lte: [ '$gameRank', 3 ] },
                        1, 
                        0
                    ]
                  }
                },
            }
        },
        { $sort: { _id: -1 } }
    ]);
}

const getUserStats3 = async (userNum, seasonId, matchingTeamMode) => {
    return await Match.aggregate([
    { $match: { userNum: userNum, seasonId: seasonId, matchingTeamMode: matchingTeamMode } },
        { 
            $group: {
                _id: '$characterNum',
                totalGames: { $sum: 1 },
                totalKills:{ $sum: '$playerKill' },
                maxKill: { $max: '$playerKill' },
                totalAssistants:{ $sum: '$playerAssistant' },
                totalMonsterKills:{ $sum: '$monsterKill' },
                rank:{ $avg: '$gameRank' },
                top1: { 
                  $sum: {
                    $cond : [
                        { $eq: [ '$gameRank', 1 ] },
                        1, 
                        0
                    ]
                  }
                },
                top3: { 
                  $sum: {
                    $cond : [
                        { $lte: [ '$gameRank', 3 ] },
                        1, 
                        0
                    ]
                  }
                },
            }
        },
        { $sort: { totalGames: -1 } }
    ]);
}

const getCharacterStats = async (userNum) => {
    return await Match.aggregate([
    { $match: { userNum: userNum, seasonId: 1 } },
        { 
            $group: {
                _id: '$characterNum',
                totalGames: { $sum: 1 },
                totalKills:{ $sum: '$playerKill' },
                maxKill: { $max: '$playerKill' },
                totalAssistants:{ $sum: '$playerAssistant' },
                totalMonsterKills:{ $sum: '$monsterKill' },
                rank:{ $avg: '$gameRank' },
                top1: { 
                  $sum: {
                    $cond : [
                        { $eq: [ '$gameRank', 1 ] },
                        1, 
                        0
                    ]
                  }
                },
                top3: { 
                  $sum: {
                    $cond : [
                        { $lte: [ '$gameRank', 3 ] },
                        1, 
                        0
                    ]
                  }
                },
            }
        },
        { $sort: { totalGames: -1 } }
    ]);
}

router.post('/userStat', async (req, res, next) => {
    console.log(new Date().toString().slice(16,24), ': GetUserStat Start');

    const users = await User.find({}, { _id:0, userNum: 1 }, { sort : { updateDate: 1 }});

    for (let i = 0 ; i < users.length ; i++) {        
        await getUserData(users[i]['userNum']);

        if (i%100===99)
            console.log(i+1);
    }

    console.log(new Date().toString().slice(16,24), ': GetUserStat Complete', users.length);

    res.json("{ 'data': Date.now() }")
});