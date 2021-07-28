import character from 'data/inGame/character.json'
import weaponType from 'data/inGame/weaponType.json'
import item from 'data/inGame/item.json'
import skill from 'data/inGame/skill.json'

import skilTree from 'data/sub/skill.json'

const itemGradeTier = {'일반':0, '고급':1, '희귀':2, '영웅':3, '전설':4}
const itemTypeList = [{}, [], [], [], [], []];
for (const code in item) {
    const _item = item[code];
    if (_item['itemGrade'] !== undefined && _item['itemGrade'] !== '일반') {
        if (_item['itemType'] === 'Weapon') {
            const weaponType = _item['weaponType'];
            if (!itemTypeList[0][weaponType]) {
                itemTypeList[0][weaponType] = [];
            }
            itemTypeList[0][weaponType].push(code);
        } else if (_item['itemType'] === 'Armor') {
            if (_item['armorType'] === '옷') {
                itemTypeList[1].push(code);
            } else if (_item['armorType'] === '머리') {
                itemTypeList[2].push(code);
            } else if (_item['armorType'] === '팔') {
                itemTypeList[3].push(code);
            } else if (_item['armorType'] === '다리') {
                itemTypeList[4].push(code);
            } else if (_item['armorType'] === '장식') {
                itemTypeList[5].push(code);
            }
        }
    }
}

itemTypeList.forEach((itemType, idx) => {
    if (idx === 0) {
        for (const key in itemType) {
            const list = itemType[key];
            list.sort((l1, l2) => itemGradeTier[item[l2]['itemGrade']] - itemGradeTier[item[l1]['itemGrade']]);
        }
    } else {
        itemType.sort((l1, l2) => itemGradeTier[item[l2]['itemGrade']] - itemGradeTier[item[l1]['itemGrade']]);
    }
})


export const getStat = (name, stat, idx) => {
    return character[name]['stat'][stat][idx];
}

export const skillTreeList = (character, weapon) => {
    return skilTree[character][weapon];
}

export const itemBgI = (name) => {
    return 'img/Item/BackGround/'+item[name]['grade']+'.jpg'
}

export const statList = (name) => {
    return item[name]["stat"];
}


export const createJson = (json1, json2) => {
    for (const key in json2) {
        json1[key] = json2[key];
    }
}
export const addJson = (json1, json2) => {
    for (const key in json1) {
        json1[key] += json2[key];
    }
}


export const getCharacter = (code) => {
    return character[code];
}
export const getCharacterKeys = () => {
    return Object.keys(character);
}

export const getItem = (code) => {
    return item[code];
}

export const getWeaponType = (code) => {
    return weaponType[code];
}
export const getWeaponCode = (name) => {
    return weaponType.indexOf(name);
}

export const getSkill = (code) => {
    return skill[code];
}

export const getItemTypeList = (type1, type2) => {
    if (type2)
        return itemTypeList[type1][type2];
    else
        return itemTypeList[type1];
}

export const getSeason = () => {
    return 4;
}
export const getSeasonString = () => {
    return getSeason()+"";
}