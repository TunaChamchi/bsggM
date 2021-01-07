import { getItem } from "lib/data";
import map from 'data/inGame/map.json'


let select = { type:'단검', start: '단검' };
let filterType = { 1: "무기", 2: "다리" };
let filterMap = { };

// 생명의 나무 : 1일 밤 호텔, 2일 낮 숲, 2일 밤 묘지
//                      가죽   돌멩이  나뭇가지 미스릴   운석   VF혈액샘플
const defultOutList = [401103, 112101, 108101, 401304, 401209, 401401, ];
const startWeapon = {'단검':101104,'양손검':102101,'도끼':105103,'권총':116101,'돌격소총':117101,'저격총':118101,'레이피어':120101,'창':107101,
    '망치':104101,'배트':108102,'투척':112105,'암기':113101,'활':114101,'석궁':115101,'글러브':110102,'톤파':108103,'기타':121101,'쌍절곤':119101,'채찍':109101}
            
const typeList = ['무기', '옷', '머리', '팔', '다리', '장식'];
const type = ["단검","양손검","도끼","쌍검","권총","돌격소총","저격총","레이피어","창","망치","배트","투척","암기","활","석궁","글러브","톤파","기타","쌍절곤"];
const start = ["단검","양손검","도끼","권총","돌격소총","저격총","레이피어","창","망치","배트","투척","암기","활","석궁","글러브","톤파","기타","쌍절곤"];
const mapMove = {
    '골목길': ['절', '번화가', '연못', '병원', '양궁장', '학교', '묘지', '공장', '호텔', '숲', '성당', '모래사장', '고급주택가', '항구'],
    '절': ['골목길', '번화가', '연못', '병원', '양궁장', '학교', '묘지', '공장', '호텔', '숲', '성당', '모래사장', '고급주택가', '항구'],
    '번화가': ['골목길', '절', '연못', '병원', '양궁장', '학교', '묘지', '공장', '호텔', '숲', '성당', '모래사장', '고급주택가', '항구'],
    '연못': ['번화가', '절', '병원', '묘지'], 
    '병원': ['골목길', '절', '번화가', '연못', '양궁장', '학교', '묘지', '공장', '호텔', '숲', '성당', '모래사장', '고급주택가', '항구'],
    '양궁장': ['골목길', '절', '번화가', '연못', '병원', '학교', '묘지', '공장', '호텔', '숲', '성당', '모래사장', '고급주택가', '항구'],
    '학교': ['양궁장', '골목길', '숲', '호텔', '번화가'],
    '묘지': ['성당', '공장', '병원', '연못'],
    '공장': ['항구', '성당', '묘지', '병원'],
    '호텔': ['골목길', '절', '번화가', '연못', '병원', '양궁장', '학교', '묘지', '공장', '숲', '성당', '모래사장', '고급주택가', '항구'],
    '숲': ['학교', '호텔', '모래사장', '고급주택가', '번화가', '성당'],
    '성당': ['골목길', '절', '번화가', '연못', '병원', '양궁장', '학교', '묘지', '공장', '호텔', '숲', '모래사장', '고급주택가', '항구'],
    '모래사장': ['골목길', '절', '번화가', '연못', '병원', '양궁장', '학교', '묘지', '공장', '호텔', '숲', '성당', '고급주택가', '항구'],
    '고급주택가': ['골목길', '절', '번화가', '연못', '병원', '양궁장', '학교', '묘지', '공장', '호텔', '숲', '성당', '모래사장', '항구'],
    '항구': ['고급주택가', '성당', '공장'],
}

const mapSrc = {}
for (const mapName in map) {
    const _map = map[mapName]['quest'];
    const _name = map[mapName]['name'];
    mapSrc[_name] = _map;
} 


let allSrc = [];
let extSrc = {};
let selectSrc = {}
export const routeCalc = (ref_select, ref_filterType, ref_filterMap) => {
    select = { ...ref_select };
    filterType = { ...filterType, ...ref_filterType };
    filterMap = { ...filterMap, ...ref_filterMap };

    if (Object.keys(select).length !== 8) return;

    //console.log('select', select); 

    getSelectSrc();
    //console.log('selectSrc', selectSrc);
    
    allSrc = [];
    
    typeList.forEach(type => {
        selectSrc[type].forEach(src => { 
            if (!allSrc.includes(src)) allSrc.push(src);
        });
    });
    //console.log('allSrc', allSrc);
    
    extSrc = {
        ALL: extMapByAll(),
    };
    typeList.forEach(type => {
        extSrc[type] = extMapByType(type);

        // TBD : 하위 아이템 먼저 제작 할 경우 추가 점수
        // if (selectSrc['_'+type] !== undefined) {
        //     extSrc['_'+type] = [];
        //     selectSrc['_'+type].forEach(sub => {
        //         extSrc['_'+type].push(extMapByType(mapSrc, type, selectSrc));
        //     })
        // }
    });
    //console.log('extSrc', extSrc);

    //console.log('filterType', filterType);
    const filterTypeList = [];
    const _filterType = {};

    [1, 2, 3, 4, 5].forEach(index => {
        if (filterType[index] !== undefined && filterType[index] !== '' && !filterTypeList.includes(filterType[index])) {
            _filterType[index] = filterType[index];
            filterTypeList.push(filterType[index]);
        }
    });

    [1, 2, 3, 4].forEach(index => {
        if (_filterType[index] === undefined || _filterType[index] === '') {
            if (_filterType[index+1] !== undefined && _filterType[index+1] !== '') {
                _filterType[index] = _filterType[index+1];
                _filterType[index+1] = undefined;
            }
        }
    })        

    if (filterType['2'] === undefined || filterType['2'] === '') {
        if (_filterType['1'] === undefined || _filterType['1'] === '') {
            _filterType['1'] = '무기';
            _filterType['2'] = '다리';
        } else if (_filterType['1'] !== '무기') {
            _filterType['2'] = '무기';
        } else {
            _filterType['2'] = '다리';
        }
    }
    //console.log('_filterType', _filterType);

    filterType = _filterType;
    let routeList = routeListByAll(6);

    //console.log('routeList1', [...routeList]);

    const extTypeList = typeList.filter(type => !filterTypeList.includes(type));
    //console.log('extTypeList', extTypeList);

    routeList.forEach(route => {
        const score = {
            '1': -route[_filterType['1']] *10.1,
            '2': -route[_filterType['2']] *6.9,
            '3': 0,
            '4': 0,
            '5': 0,
            '6': 0,
        };

        [3, 4, 5].forEach(index => {
            if (_filterType[index] !== undefined && _filterType[index] !== '') {
                score[index] = -route[_filterType[index]] *(12.5-index*2.5); // 3순위 5점, 4순위 2.5점, 5순위 0점
            }
        });

        extTypeList.forEach((type, idx) => {
            const index = 7-extTypeList.length+idx;
            score[index] = -route[type] *(extTypeList.length-1.5); // 6순위부터 -0.5점, 5순위부터 0.5점, 4순위부터 1.5점, 3순위부터 2.5점
        });

        route['score2'] = score;
        route['score'] = score['1'] + score['2'] + score['3'] + score['4'] + score['5'] + score['6'] - route['route'].length*3;
    });
    const topList = routeSortTop(routeList, 20);
    //console.log('topList', topList);

    setRouteListForItem(topList);
    //console.log('topList2', topList);

    return topList;
    //setState({routeList: topList, selectRoute:{route:[]}, selectMap:'', selectMapSrc: []});
};

export const getSelectSrc = () => {
    selectSrc = {};
    const startItem = [
        { name: startWeapon[select['start']], count: 1 },
        { name: 301102, count: 2 },
        //{ name: 302110, count: 2 },
    ];
    
    typeList.forEach(type => {
        selectSrc[type] = [];
        itemSrc(selectSrc[type], select[type], type, startItem);
    });
};

export const itemSrc = (src, itemCode, type, startItem) =>  {
    const outList = [...defultOutList];

    let list = [];

    getItem(itemCode)['src'].forEach(_srcName => {
        if (getItem(_srcName)['src'].length) {
            const srcList = itemSrc(src, _srcName, type, startItem);

            if (type === '무기') {

                if (getItem(_srcName)['weaponType'] === select['type']) {
                    const _src = { name: _srcName, grade: getItem(_srcName)['itemGrade'], src: [...srcList] };
                    if (selectSrc['_무기'] !== undefined) {
                        selectSrc['_무기'].push(_src);
                    } else {
                        selectSrc['_무기'] = [_src];
                    }
                }
            } else {
                if (getItem(_srcName)['armorType'] === type) {
                    const _src = { name: _srcName, grade: getItem(_srcName)['itemGrade'], src: [...srcList] };
                    if (selectSrc['_'+type] !== undefined) {
                        selectSrc['_'+type].push(_src);
                    } else {
                        selectSrc['_'+type] = [_src];
                    }
                }
            }

            list = [...list, ...srcList];
        } else {
            if (!src.includes(_srcName) && !outList.includes(_srcName)) {
                let isStart = false;
                startItem.forEach(_ => {
                    if (_['name'] === _srcName && _['count'] !== 0) {
                        isStart = true;
                        _['count']--;
                    }
                })

                if (!isStart) {
                    src.push(_srcName);
                    list.push(_srcName);
                }
            }
        }
    })

    return list;
}

export const extMapByAll = () => {
    const extMapSrc = {}
    for (const mapName in mapSrc) {
        extMapSrc[mapName] = allSrc.filter(src => !mapSrc[mapName].includes(src));
    }
    return extMapSrc;
}

export const extMapByType = (type) => {
    const extMapSrc = {}
    for (const mapName in mapSrc) {
        extMapSrc[mapName] = selectSrc[type].filter(src => !mapSrc[mapName].includes(src));
    }
    return extMapSrc;
}

export const routeListByAll = (MapIdx) => {
    const list = [];

    for (const mapName in mapMove) {
        const route = {
            route: []
        };

        routeListByAll2(list, route, extSrc['ALL'][mapName], mapName, 1, MapIdx);
    }

    return list;
}

export const routeListByAll2 = (list, route, _extSrc, mapName, idx, MapIdx) => {
    if (filterMap[idx] !== undefined && mapName !== filterMap[idx]) {
        return;
    }
    if (route['route'].length > MapIdx || idx > MapIdx) {
        return;
    }

    if (MapIdx === 7 && idx === MapIdx-1) {
        let count = 0;
        ['무기', '다리', '머리', '옷', '팔', '장식'].forEach(type => {
            if (route[type] === undefined) {
                count++;
            }
        });
        if (count > 2) { return };
    }
    if (idx === MapIdx) {
        let count = 0;
        ['무기', '다리', '머리', '옷', '팔', '장식'].forEach(type => {
            if (route[type] === undefined) {
                count++;
            }
        });
        if (count > 1) { return };
    }

    _extSrc = _extSrc.filter(src => extSrc['ALL'][mapName].includes(src));

    const _route = {
        ...route,
        route: [...route['route'], mapName]
    };

    ['무기', '옷', '머리', '팔', '다리', '장식'].forEach(type => {
        if (_route[type] !== undefined) return;

        const _extSrcType = _extSrc.filter(src => extSrc[type][mapName].includes(src));
        if (_extSrcType.length === 0) {
            _route[type] = idx
        }

    });

    if (_extSrc.length === 0) {
        list.push(_route);
        //console.log(_route);
    } else {
        mapMove[mapName].forEach(nextMap => {
            if (_route['route'].includes(nextMap)) return;

            routeListByAll2(list, _route, _extSrc, nextMap, idx+1, MapIdx);
        });
    }
};

export const routeSortTop = (routeList, topCount) => {
    const list = routeList;//.filter(route => route['score'] > 0);
    list.sort((r1, r2) => r2['score']-r1['score']);

    try {
        const top = list[topCount-1]['score'];

        return list.filter(route => route['score'] >= top);
    } catch(error) {
        return list;
    }
};

export const setRouteListForItem = (routeList) => {   
    let getSrcList = [];
    const srcList = getSelectSrcNonOut();
    ['무기', '옷', '머리', '팔', '다리', '장식'].forEach(type => {
        srcList[type].forEach(src => { 
            if (!getSrcList.includes(src)) getSrcList.push(src);
        });
    });

    routeList.forEach(route => {
        let _mapSrc = [];
        route['view'] = [];

        const itemList = [];
        ['무기', '옷', '머리', '팔', '다리', '장식'].forEach(type => {
            const _type = selectSrc['_'+type];
            let rank = 0;
            if (_type !== undefined) {
                rank = _type.length;
                _type.forEach((sub, idx) => {
                    itemList.push({ name: sub['name'], type: type, rank: idx, src: sub['src'] });
                })
            }
            itemList.push({ name: select[type], type: type, rank: rank, src: selectSrc[type] });
        });
        itemList.sort((i1, i2) => i2['rank']-i1['rank']);

        route['route'].forEach(mapName => {
            const view = {
                name: mapName,
                item: []
            }

            _mapSrc = [..._mapSrc, ...mapSrc[mapName].filter(src => !_mapSrc.includes(src))];

            const rmList = [];
            itemList.forEach(item => {
                const typeSrc = item['src'].filter(src => !_mapSrc.includes(src));                    
                if (typeSrc.length === 0) {
                    const filter = view['item'].filter(_item => _item['type'] === item['type']);

                    if (filter.length === 0 || filter[0]['rank'] < item['rank']) {
                        view['item'].push(item);
                    }
                    rmList.push(item);
                };
            });

            if (rmList.length !== 0) {
                rmList.forEach(item => {
                    const rm_idx = itemList.findIndex(function(_item) { return _item['name'] === item['name'] });
                    if (rm_idx > -1) itemList.splice(rm_idx, 1)
                })
            }

            let getSrc = mapSrc[mapName].filter(src => getSrcList.includes(src))
                    
            getSrc = getSrc.concat(defultOutList.filter(src => getSrcList.includes(src)));

            view['getScr'] = getSrc;

            route['view'].push(view);
        });
    });
}

export const getSelectSrcNonOut = () => {
    const itemSrc = {};
    const startItem = [
        { name: startWeapon[select['type']], count: 1 },
        { name: 301102, count: 2 },
        //{ name: 302110, count: 2 },
    ];

    typeList.forEach(type => {
        itemSrc[type] = [];
        itemSrcNonOut(itemSrc[type], select[type], type, startItem);
    });
    return itemSrc;
};

export const itemSrcNonOut = (src, itemCode, type, startItem) =>  {
    let list = [];

    getItem(itemCode)['src'].forEach(_srcName => {
        if (getItem(_srcName)['src'].length) {
            const srcList = itemSrcNonOut(src, _srcName, type, startItem);
        } else {
            if (!src.includes(_srcName)) {
                let isStart = false;
                startItem.forEach(_ => {
                    if (_['name'] === _srcName && _['count'] !== 0) {
                        isStart = true;
                        _['count']--;
                    }
                })

                if (!isStart) {
                    src.push(_srcName);
                }
            }
        }
    })
}