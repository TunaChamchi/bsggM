import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';
import map from 'data/inGame/map.json'
import moster from 'data/inGame/moster.json'
import item from 'data/inGame/item.json'

class Route2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mapMove: {
                "골목길": ["절", "번화가", "연못", "병원", "양궁장", "학교", "묘지", "공장", "호텔", "숲", "성당", "모래사장", "고급주택가", "항구"],
                "절": ["골목길", "번화가", "연못", "병원", "양궁장", "학교", "묘지", "공장", "호텔", "숲", "성당", "모래사장", "고급주택가", "항구"],
                "번화가": ["골목길", "절", "연못", "병원", "양궁장", "학교", "묘지", "공장", "호텔", "숲", "성당", "모래사장", "고급주택가", "항구"],
                "연못": ["번화가", "절", "병원", "묘지"], 
                "병원": ["골목길", "절", "번화가", "연못", "양궁장", "학교", "묘지", "공장", "호텔", "숲", "성당", "모래사장", "고급주택가", "항구"],
                "양궁장": ["골목길", "절", "번화가", "연못", "병원", "학교", "묘지", "공장", "호텔", "숲", "성당", "모래사장", "고급주택가", "항구"],
                "학교": ["양궁장", "골목길", "숲", "호텔", "번화가"],
                "묘지": ["성당", "공장", "병원", "연못"],
                "공장": ["항구", "성당", "묘지", "병원"],
                "호텔": ["골목길", "절", "번화가", "연못", "병원", "양궁장", "학교", "묘지", "공장", "숲", "성당", "모래사장", "고급주택가", "항구"],
                "숲": ["학교", "호텔", "모래사장", "고급주택가", "번화가", "성당"],
                "성당": ["골목길", "절", "번화가", "연못", "병원", "양궁장", "학교", "묘지", "공장", "호텔", "숲", "모래사장", "고급주택가", "항구"],
                "모래사장": ["골목길", "절", "번화가", "연못", "병원", "양궁장", "학교", "묘지", "공장", "호텔", "숲", "성당", "고급주택가", "항구"],
                "고급주택가": ["골목길", "절", "번화가", "연못", "병원", "양궁장", "학교", "묘지", "공장", "호텔", "숲", "성당", "모래사장", "항구"],
                "항구": ["고급주택가", "성당", "공장"],
            },
            mapSrc: {},
            extMapSrc: {},
        };
    }

    init() {
        const mapSrc = {}
        for (const mapName in map) {
            const _map = map[mapName]['quest'];

            // map[mapName]['hunt'].forEach(mosterName => {
            //     moster[mosterName].forEach(item => {
            //         if (_map.indexOf(item) < 0)
            //             _map.push(item);
            //     })
            // });
            mapSrc[mapName] = _map;
        } 

        this.routeCalc(mapSrc);
    }
    
    routeCalc(mapSrc) {
        const select = {
            무기: '아론다이트',
            type: '양손검',
            start: '양손검',
            머리: '오토바이헬멧',
            옷: '성기사의갑옷',
            팔: '샤자한의검집',
            다리: '매버릭러너',
            장식: '백우선',
        };
        //console.log('mapSrc', mapSrc);

        const selectSrc = this.selectSrc(select);
        //console.log('selectSrc', selectSrc);

        const extSrcByWeapon = this.extMapByType(mapSrc, '무기', selectSrc);
        //console.log('extSrcByWeapon', extSrcByWeapon);
        
        let routeList = this.routeListByWeapon(extSrcByWeapon);
        //console.log('routeList', routeList);
        
        let extSrcByLeg = this.extMapByType(mapSrc, '다리', selectSrc);
        this.routeListByType(extSrcByLeg, '다리', routeList, 5);
        routeList = routeList.filter(route => route['score_다리'] > 0);
        //routeList = this.routeSortTop(routeList, 1000, '다리');
        console.log('다리 routeList', routeList);
        
        const extSrc = [];
        
        selectSrc['옷'].forEach(src =>  { if (!extSrc.includes(src)) extSrc.push(src) });
        selectSrc['팔'].forEach(src =>  { if (!extSrc.includes(src)) extSrc.push(src) });
        selectSrc['머리'].forEach(src => { if (!extSrc.includes(src)) extSrc.push(src) });
        selectSrc['장식'].forEach(src => { if (!extSrc.includes(src)) extSrc.push(src) });

        console.log('extSrc', extSrc);

        this.routeListByType(extSrcByLeg, '나머지', routeList, 7);
        routeList = routeList.filter(route => route['score_나머지'] > 0);
        routeList = this.routeSortTop(routeList, 20, '나머지');
        console.log('나머지 routeList', routeList);
    }

    selectSrc(select) {
        const itemSrc = {};

        ['무기', '머리', '옷', '팔', '다리', '장식'].forEach(type => {
            //console.log('-----------------------------------');
            //console.log('type', type, select[type]);
            itemSrc[type] = [];

            this.itemSrc(itemSrc[type], select[type]);
            /*item[select[type]]['src'].forEach(src => {                
                if (!item[type].includes(src))
                    item[type].push(src);
            })*/
        })

        //console.log('itemSrc', itemSrc);
        return itemSrc;
    }

    itemSrc(src, itemName) {
        //console.log('item[itemName][src]', item[itemName]['src']);
        item[itemName]['src'].forEach(_srcName => {
            //console.log('_srcName', _srcName);
            if (item[_srcName]['src']) {
                this.itemSrc(src, _srcName);
            } else {
                if (!src.includes(_srcName) && _srcName !== '녹슨검') // 기본무기 제외
                    src.push(_srcName);
            }       
        })
    }

    extMapByType(mapSrc, type, select) {
        const extMapSrc = {}
        for (const mapName in mapSrc) {
            extMapSrc[mapName] = [];

            //console.log('-------------------------------------');
            //console.log(mapName, mapSrc[mapName]);

            extMapSrc[mapName] = select[type].filter(src => !mapSrc[mapName].includes(src));

            //console.log('extMapSrc[mapName]', extMapSrc[mapName]);

            /*mapSrc[mapName].forEach(treasure => {
                if (select[type].indexOf(treasure) < 0)
                    extMapSrc[mapName].push(treasure);
            });*/
        }
        return extMapSrc;
    }

    routeListByWeapon(extSrc) {
        const { mapMove } = this.state;

        const list = [];

        for (const mapName1 in mapMove) {
            const _extSrc1 = extSrc[mapName1];

            if (_extSrc1.length === 0) {
                list.push({
                    route: [mapName1],
                    weapon: 1,
                    score: 20
                });
            } else {
                mapMove[mapName1].forEach(mapName2 => {
                    const _extSrc12 = extSrc[mapName1].filter(src => extSrc[mapName2].includes(src));
    
                    if (_extSrc12.length === 0) {
                        list.push({
                            route: [mapName1, mapName2],
                            weapon: 2,
                            score: 10
                        });
                    } else {
                        mapMove[mapName2].forEach(mapName3 => {
                            const _extSrc23 = _extSrc12.filter(src => extSrc[mapName3].includes(src));
            
                            if (_extSrc23.length === 0) {
                                list.push({
                                    route: [mapName1, mapName2, mapName3],
                                    weapon: 3,
                                    score: 5
                                });
                            }
                        })
                    }
                })
            }            
        }

        return list;
    }

    routeListByType(extSrc, type, routeList, Mapidx) {
        routeList.forEach (route => {
            if ('score_'+route[type] > 0) return;

            route['extSrc'] = extSrc[route['route'][0]];
            this.routeListByType2(extSrc, routeList, route, type, 0, Mapidx);
        });
    }

    routeListByType2(extSrc, routeList, route, type, idx, MapIdx) {
        if (route['route'].length === MapIdx) return;

        if (route['route'].length !== idx+1) {
            const mapName = route['route'][idx];
            const _extSrc = route['extSrc'].filter(src => extSrc[mapName].includes(src));

            // console.log('route[extSrc]', route['extSrc']);
            // console.log('_extSrc', _extSrc);
            if (_extSrc.length === 0) {
                route[type] = idx+1;
                route['score'] += 3 + (route[type]-route['weapon']);
                route['score_'+type] += 3 + (route[type]-route['weapon']);
                //console.log('route'+idx, route);
            } else {
                route['extSrc'] = _extSrc;
                this.routeListByType2(extSrc, routeList, route, type, idx+1, MapIdx);
            }
        } else {
            const mapName = route['route'][idx];
            const _extSrc = route['extSrc'].filter(src => extSrc[mapName].includes(src));

            const addMapList = [];
            const _route = {
                route: [],
                extSrc: _extSrc
            }
            this.routeListByType3(extSrc, addMapList, _route, type, mapName, 0, MapIdx-route['route'].length);

            addMapList.forEach(addMap => {
                const legCount = addMap[type]+idx+1;
                routeList.push({
                    ...route,
                    route: [...route['route'], ...addMap['route']],
                    [type]: legCount,
                    score_weapon: route['score'],
                    //score: route['score'] + 3 + (route['weapon']-legCount),
                    ['score_'+type]: route['score'] + 3 + (route['weapon']-legCount)
                });
            });

            // 기존 route 삭제
            const rm_idx = routeList.findIndex(function(item) { return item['route'].filter(src => route['route'].includes(src)) });
            if (rm_idx > -1) routeList.splice(rm_idx, 1)
        }
    }

    routeListByType3(extSrc, addMapList, route, type, mapName, idx, MapIdx) {
        const { mapMove } = this.state;

        if (route['route'].length === MapIdx) return;

        mapMove[mapName].forEach(nextName => {
            const _extSrc = route['extSrc'].filter(src => extSrc[nextName].includes(src));
    
            if (_extSrc.length === 0) {
                addMapList.push({
                    route: [...route['route'], nextName],
                    [type]: idx+1,
                });
            } else {
                const _route = {
                    route: [...route['route'], nextName],
                    extSrc: _extSrc,
                    [type]: idx+1,
                }
                this.routeListByType3(extSrc, addMapList, _route, type, nextName, idx+1, MapIdx);
            }
        });
    }

    routeSortTop(routeList, topCount, type) {
        const list = routeList.filter(route => route['score_'+type] > 0);
        list.sort((r1, r2) => r2['score_'+type]-r1['score_'+type]);

        const top = list[topCount-1]['score_'+type];

        return list.filter(route => route['score_'+type] >= top);
    }

    isWeapon(type, name) {
        return 
    }






    render() {
        const { intl } = this.props;

        this.init();

        return (
            <div className="banner"> 
            </div>
        );
    };
}

export default injectIntl(Route2);