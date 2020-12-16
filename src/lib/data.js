import avg from 'data/avg.json';
import CharList from 'data/character.json';
import CharListPre from 'data/character_pre.json';
import WeaponList from 'data/weapon.json';
import ArmorList from 'data/armor.json';
import version from 'data/version.json';
import dmg_plus from 'data/dmg_plus.json'

import charater from 'data/inGame/charater.json'
import item from 'data/inGame/item.json'

import skilTree from 'data/sub/skillTree.json'
import skilTree2 from 'data/sub/skillTree2.json'

const max = {};
const min = {};

export const Version = 'Upadated ' + version['updated'] + ' / Data period ' + version['data-period'];
export const Upadated = 'Upadated ' + version['updated'];
export const Data_period = 'Data period ' + version['data-period'];

export const Avg = (range, type) => {
    return avg[range][type];
}

export const Max = (range, type) => {
    return max[range][type];
}

export const Min = (range, type) => {
    return min[range][type];
}

export const CharacterScore = (range, type) => {
    const list = {};
    for (const key in CharList) {
        try {
        const data = CharList[key][range][type];

        list[key] = data;
        } catch {
            break;
        }
    }

    const tier = [];
    let max_score = 0;
    let max_win_rate = 0;
    let max_pick_rate = 0;
    let max_avg_kill = 0;
    let max_avg_rank = 18;

    let min_score = 100;
    let min_win_rate = 100;
    let min_pick_rate = 100;
    let min_avg_kill = 100;
    let min_avg_rank = 0;

    // 값 가져오기
    for (const key1 in list) {
        for (const key2 in list[key1]) {
            const data = list[key1][key2];
            const value = {character:key1, weapon:key2, data:data};

            tier.push(value);
            if (data['win-rate']  > max_win_rate)   max_win_rate  = data['win-rate'];
            if (data['pick-rate'] > max_pick_rate)  max_pick_rate = data['pick-rate'];
            if (data['avg-kill']  > max_avg_kill)   max_avg_kill  = data['avg-kill'];
            if (data['avg-rank']  < max_avg_rank)   max_avg_rank  = data['avg-rank'];
            
            if (data['win-rate']  < min_win_rate)   min_win_rate  = data['win-rate'];
            if (data['pick-rate'] < min_pick_rate)  min_pick_rate = data['pick-rate'];
            if (data['avg-kill']  < min_avg_kill)   min_avg_kill  = data['avg-kill'];
            if (data['avg-rank']  > min_avg_rank)   min_avg_rank  = data['avg-rank'];
        }
    }

    // max, min 값 지정
    max[range] = {}
    max[range][type] = {
        'win-rate' : max_win_rate,
        'pick-rate': max_pick_rate,
        'avg-kill' : max_avg_kill,
        'avg-rank' : max_avg_rank 
    }
    min[range] = {}
    min[range][type] = {
        'win-rate' : min_win_rate,
        'pick-rate': min_pick_rate,
        'avg-kill' : min_avg_kill,
        'avg-rank' : min_avg_rank 
    }

    // 순위 계산
    tier.forEach(data1 => {
        data1['rank'] = {
            'win-rate' : 1,
            'pick-rate': 1,
            'avg-kill' : 1,
            'avg-rank' : 1
        }

        tier.forEach(data2 => {
            if (data1['data']['win-rate'] < data2['data']['win-rate']) {
                data1['rank']['win-rate']++;
            }
            if (data1['data']['pick-rate'] < data2['data']['pick-rate']) {
                data1['rank']['pick-rate']++;
            }
            if (data1['data']['avg-kill'] < data2['data']['avg-kill']) {
                data1['rank']['avg-kill']++;
            }
            if (data1['data']['avg-rank'] > data2['data']['avg-rank']) {
                data1['rank']['avg-rank']++;
            }
        });
    });

    // 점수 계산
    tier.forEach(data => {        
        data['score'] = {
            'win-rate' : data['data']['win-rate']   /max_win_rate*100,
            'pick-rate': (1-data['rank']['pick-rate']/tier.length)*100,
            'avg-kill' : data['data']['avg-kill']   /max_avg_kill*100,
            'avg-rank' : (1-data['rank']['avg-rank']/tier.length)*100
        }

        if (type === "solo")
            data['score']['total'] = (data['score']['win-rate']*1.3   + data['score']['pick-rate']*0.8 + data['score']['avg-kill']*1.2    + data['score']['avg-rank']*0.7  )/4;
        else if (type === "duo")
            data['score']['total'] = (data['score']['win-rate']*1.3   + data['score']['pick-rate']*1.1 + data['score']['avg-kill']*0.9    + data['score']['avg-rank']*0.5)/3.8;
        else if (type === "squad")
            data['score']['total'] = (data['score']['win-rate']*1.3   + data['score']['pick-rate']*1.3 + data['score']['avg-kill']*0.7    + data['score']['avg-rank']*0.3)/3.6;
        
        if (data['score']['total'] > max_score) max_score = data['score']['total'];
    });

    // 티어, 순위 계산
    tier.forEach(data1 => {
        const tier_score = data1['score']['total']/max_score;
        if (tier_score > 0.90) {
            data1['tier'] = 1;
        } else if (tier_score > 0.75) {
            data1['tier'] = 2;
        } else if (tier_score > 0.6) {
            data1['tier'] = 3;
        } else if (tier_score > 0.45) {
            data1['tier'] = 4;
        } else {
            data1['tier'] = 5;
        }

        data1['rank']['total'] = 1;
        tier.forEach(data2 => {
            if (data1['score']['total'] < data2['score']['total'])
                data1['rank']['total']++;
        });
    });
    
    return tier;
}

export const CharacterPreRank = (range, type) => {
    const list = {};
    for (const key in CharListPre) {
        try {
        const data = CharListPre[key][range][type];

        list[key] = data;
        } catch {
            break;
        }
    }

    const tier = [];
    let max_score = 0;
    let max_win_rate = 0;
    let max_pick_rate = 0;
    let max_avg_kill = 0;
    let max_avg_rank = 18;

    // 값 가져오기
    for (const key1 in list) {
        for (const key2 in list[key1]) {
            const data = list[key1][key2];
            const value = {character:key1, weapon:key2, data:data};

            tier.push(value);
            if (data['win-rate']  > max_win_rate)   max_win_rate  = data['win-rate'];
            if (data['pick-rate'] > max_pick_rate)  max_pick_rate = data['pick-rate'];
            if (data['avg-kill']  > max_avg_kill)   max_avg_kill  = data['avg-kill'];
            if (data['avg-rank']  < max_avg_rank)   max_avg_rank  = data['avg-rank'];
        }
    }

    // 순위 계산
    tier.forEach(data1 => {
        data1['rank'] = {
            'win-rate' : 1,
            'pick-rate': 1,
            'avg-kill' : 1,
            'avg-rank' : 1
        }

        tier.forEach(data2 => {
            if (data1['data']['win-rate'] < data2['data']['win-rate']) {
                data1['rank']['win-rate']++;
            }
            if (data1['data']['pick-rate'] < data2['data']['pick-rate']) {
                data1['rank']['pick-rate']++;
            }
            if (data1['data']['avg-kill'] < data2['data']['avg-kill']) {
                data1['rank']['avg-kill']++;
            }
            if (data1['data']['avg-rank'] > data2['data']['avg-rank']) {
                data1['rank']['avg-rank']++;
            }
        });
    });

    // 점수 계산
    tier.forEach(data => {        
        data['score'] = {
            'win-rate' : data['data']['win-rate']   /max_win_rate*100,
            'pick-rate': data['data']['pick-rate']  /max_pick_rate*100,
            'avg-kill' : data['data']['avg-kill']   /max_avg_kill*100,
            'avg-rank' : (1-data['rank']['avg-rank']/tier.length)*100
        }

        if (type === "solo")
            data['score']['total'] = data['score']['win-rate']*1.5   + data['score']['pick-rate'] + data['score']['avg-kill']    + data['score']['avg-rank'];
        else if (type === "duo")
            data['score']['total'] = data['score']['win-rate']*1.5   + data['score']['pick-rate'] + data['score']['avg-kill']/2  + data['score']['avg-rank']/2;
        else if (type === "squad")
            data['score']['total'] = data['score']['win-rate']*1.5   + data['score']['pick-rate'] + data['score']['avg-kill']/3  + data['score']['avg-rank']/3;
        
        if (data['score']['total'] > max_score) max_score = data['score']['total'];
    });

    // 티어, 순위 계산
    tier.forEach(data1 => {
        data1['rank']['total'] = 1;
        tier.forEach(data2 => {
            if (data1['score']['total'] < data2['score']['total'])
                data1['rank']['total']++;
        });
    });

    const rank = {}

    tier.forEach(data => {
        const character = data['character'];
        const weapon    = data['weapon'];
        const char = {
            'total'    : data['rank']['total'],
            'win-rate' : data['rank']['pick-rate'],
            'pick-rate': data['rank']['win-rate'],
            'avg-kill' : data['rank']['avg-kill'],
            'avg-rank' : data['rank']['avg-rank']
        }

        rank[character+'-'+weapon] = char;
    });

    return rank;
}

export const Weapon = (character, weapon, type) => {
    const weaponList = WeaponList[character][weapon]
    const list = [];
    for (const key in weaponList) {
        try {
            const data = weaponList[key][type];

            data.weapon = key;
            list.push(data);
        } catch {
            break;
        }
    }

    return list;
}

export const Armor = (range, type) => {
    const armorist = ArmorList[type];
    const list = [];
    for (const key in armorist) {
        try {
            const data = {
                name: key,
                'win-rate': armorist[key][range]
            };

            list.push(data);
        } catch {
            break;
        }
    }

    return list;    
}

export const dmgPlus = (character, type, name) => {
    return dmg_plus[character][type][name];
}

export const getStat = (name, stat, idx) => {
    return charater[name]['stat'][stat][idx];
}

export const skillTreeList = (character) => {
    const tree = skilTree[character];
    const list = [];
    for (const key in tree) {
        try {
            const data = {
                name: key,
                tree: tree[key]
            };

            list.push(data);
        } catch {
            break;
        }
    }

    return list;
}
export const skillTreeList2 = (character) => {
    return skilTree2[character];
}

export const itemBgI = (name) => {
    return 'img/Item/BackGround/'+item[name]['grade']+'.jpg'
}

export const statList = (name) => {
    return item[name]["stat"];
}