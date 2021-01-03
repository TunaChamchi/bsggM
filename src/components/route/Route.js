import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';
import map from 'data/inGame/map.json'
import moster from 'data/inGame/moster.json'
import item from 'data/inGame/item.json'
import weapon from 'data/inGame/weapon.json'
import armor from 'data/inGame/armor.json'

class Route extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mapMove: {
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
            },
            startWeapon:{'단검':'가위','양손검':'녹슨검','도끼':'곡괭이','권총':'발터PPK','돌격소총':'페도로프자동소총','저격총':'화승총','레이피어':'바늘','창':'단창','망치':'망치','배트':'단봉','투척':'야구공','암기':'면도칼','활':'양궁','석궁':'석궁','글러브':'목장갑','톤파':'대나무','기타':'보급형기타','쌍절곤':'쇠사슬'},
            mapSrc: {},
            routeList: [],
            _select:{},
            filterType: {'1':'무기','2':'신발',},
            filterTypeSelect: 0,
            filterTypeList: ['무기', '머리', '옷', '팔', '다리', '장신구'],
            filterMap: {},
            filterMapSelect: 0,
            filterMapList: ['골목길', '절', '번화가', '연못', '병원', '양궁장', '학교', '묘지', '공장', '호텔', '숲', '성당', '모래사장', '고급주택가', '항구'],
        };
    }
    
    componentWillMount() {
        this.init();
    };
    componentDidUpdate(prevProps, prevState){
        const { select } = this.props;
        const { _select } = this.state;

        if (Object.keys(select).length === 8) {
            let isEq = true;
            for (const key in select) {
                if (select[key] !== _select[key])
                    isEq = false;
            }
            if (!isEq) {
                this.setState({_select: JSON.parse(JSON.stringify(select))});
                this.routeCalc();
            }
        }
    };

    init() {
        const mapSrc = {}
        for (const mapName in map) {
            const _map = map[mapName]['quest'];
            mapSrc[mapName] = _map;
        } 

        //this.routeCalc(mapSrc);
        this.setState({ mapSrc: mapSrc });
    }

    routeCalc() {
        const { select } = this.props;
        const { isCalc, mapSrc } = this.state;
        //console.log('mapSrc', mapSrc);

        if (Object.keys(select).length !== 8) return;

        //console.log('select', select); 

        const selectSrc = this.selectSrc();
        //console.log('selectSrc', selectSrc);
        
        const allSrc = [];        
        
        ['무기', '머리', '옷', '팔', '다리', '장식'].forEach(type => {
            selectSrc[type].forEach(src => { 
                if (!allSrc.includes(src)) allSrc.push(src);
            });
        });
        //console.log('allSrc', allSrc);
        
        const extSrc = {
            ALL: this.extMapByAll(mapSrc, allSrc),
        };
        ['무기', '머리', '옷', '팔', '다리', '장식'].forEach(type => {
            extSrc[type] = this.extMapByType(mapSrc, type, selectSrc);

            // TBD : 하위 아이템 먼저 제작 할 경우 추가 점수
            // if (selectSrc['_'+type] !== undefined) {
            //     extSrc['_'+type] = [];
            //     selectSrc['_'+type].forEach(sub => {
            //         extSrc['_'+type].push(this.extMapByType(mapSrc, type, selectSrc));
            //     })
            // }
        });
        //console.log('extSrc', extSrc);

        const routeList = this.routeListByAll(extSrc, 7);
        //console.log('routeList', routeList);

        routeList.forEach(route => {
            const 무기 = -route['무기'] *7;
            const 장식 = -route['장식'] *4;
            const 머리 = -route['머리'] *2.5;
            const 옷   = -route['옷']   *2.5;
            const 팔   = -route['팔']   *2.5;
            const 다리 = -route['다리'] *2.5;
            route['score'] = 무기 + 장식 + 머리 + 옷 + 팔 + 다리 - route['route'].length*3;
        });
        const topList = this.routeSortTop(routeList, 20);
        //console.log('topList', topList);

        this.setRouteListForItem(mapSrc, selectSrc, topList);
        console.log('topList2', topList);

        this.setState({routeList: topList});
    }

    selectSrc() {
        const { select } = this.props;
        const itemSrc = {};
        ['무기', '머리', '옷', '팔', '다리', '장식'].forEach(type => {
            itemSrc[type] = [];
            this.itemSrc(itemSrc[type], select[type], itemSrc, type);
        });
        return itemSrc;
    }

    itemSrc(src, itemName, itemSrc, type) {
        const { select } = this.props;
        const { startWeapon } = this.state;

        const outList = ['물', '가죽', '돌멩이', '나뭇가지', '미스릴', '운석', 'VF혈액샘플', startWeapon[select['type']]];

        let list = [];

        item[itemName]['src'].forEach(_srcName => {
            if (item[_srcName]['src']) {
                const srcList = this.itemSrc(src, _srcName, itemSrc, type);

                if (type === '무기') {
                    if (weapon[select['type']][_srcName] !== undefined) {
                        const _src = { name: _srcName, grade: item[_srcName]['grade'], src: [...srcList] };
                        if (itemSrc['_무기'] !== undefined) {
                            itemSrc['_무기'].push(_src);
                        } else {
                            itemSrc['_무기'] = [_src];
                        }
                    }
                } else {
                    if (armor[type][_srcName] !== undefined) {
                        const _src = { name: _srcName, grade: item[_srcName]['grade'], src: [...srcList] };
                        if (itemSrc['_'+type] !== undefined) {
                            itemSrc['_'+type].push(_src);
                        } else {
                            itemSrc['_'+type] = [_src];
                        }
                    }
                }

                list = [...list, ...srcList];
            } else {
                if (!src.includes(_srcName) && !outList.includes(_srcName)){
                    src.push(_srcName);
                    list.push(_srcName);
                }
            }
        })

        return list;
    }

    extMapByType(mapSrc, type, selectSrc) {
        const { select } = this.props;
        const extMapSrc = {}
        for (const mapName in mapSrc) {
            extMapSrc[mapName] = selectSrc[type].filter(src => !mapSrc[mapName].includes(src));
        }
        return extMapSrc;
    }
    
    extMapByAll(mapSrc,  allSrc) {
        const extMapSrc = {}
        for (const mapName in mapSrc) {
            extMapSrc[mapName] = allSrc.filter(src => !mapSrc[mapName].includes(src));
        }
        return extMapSrc;
    }

    routeListByAll(extSrc, MapIdx) {
        const { mapMove } = this.state;

        const list = [];

        for (const mapName in mapMove) {
            const route = {
                route: []
            };

            this.routeListByAll2(extSrc, list, route, extSrc['ALL'][mapName], mapName, 1, MapIdx);
        }

        return list;
    }

    routeListByAll2(extSrc, list, route, _extSrc, mapName, idx, MapIdx) {
        const { mapMove, filterMap, filterType } = this.state;

        if (filterMap[idx] !== undefined && mapName !== filterMap[idx]) {
            return;
        }
        if (route['route'].length > MapIdx || idx > MapIdx) {
            return;
        }
        if (filterType['1'] !== undefined && ((route[filterType['1']] === undefined && idx > 4) || route[filterType['1']] > 3)) {
            return;
        }
        if (filterType['2'] !== undefined && ((route[filterType['2']] === undefined && idx > 5) || route[filterType['2']] > 4)) {
            return;
        } 
        // if (idx === MapIdx) {
        //     let count = 0;
        //     ['머리', '옷', '팔', '장식'].forEach(type => {
        //         if (route[type] === undefined) {
        //             count++;
        //         }
        //     });
        //     if (count > 1) { return };
        // }

        _extSrc = _extSrc.filter(src => extSrc['ALL'][mapName].includes(src));

        const _route = {
            ...route,
            route: [...route['route'], mapName]
        };

        ['무기', '머리', '옷', '팔', '다리', '장식'].forEach(type => {
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

                this.routeListByAll2(extSrc, list, _route, _extSrc, nextMap, idx+1, MapIdx);
            });
        }
    }

    routeSortTop(routeList, topCount) {
        const list = routeList;//.filter(route => route['score'] > 0);
        list.sort((r1, r2) => r2['score']-r1['score']);

        try {
            const top = list[topCount-1]['score'];

            return list.filter(route => route['score'] >= top);
        } catch(error) {
            return list;
        }
    }

    setRouteListForItem(mapSrc, selectSrc, routeList) {
        const { select } = this.props;
        routeList.forEach(route => {
            let _mapSrc = [];
            route['view'] = [];

            const itemList = [];
            ['무기', '머리', '옷', '팔', '다리', '장식'].forEach(type => {
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

                route['view'].push(view);
            });
        });
    }

    routeListXView() {
        const { routeList } = this.state;

        return routeList.map((route, idx) => {
            return (
                <div className='Route_L_RouteX' key={'route_X'+idx}>
                    {this.routeListYView(route)}
                </div>
            )
        });
    }
    routeListYView(route) {
        return route['view'].map((view, idx) => {
            return (
                <div className='Route_L_RouteY' key={'route_Y'+idx}>
                    <div className='Route_L_Route_region'>{view['name']}</div>
                    <div className='Route_L_Route_item_bigbox'>
                        {this.routeListBoxView(view['item'])}
                    </div>
                </div>
            )
        });
    }
    routeListBoxView(itemList) {
        return itemList.map((_item, idx) => {
            return (
                <div className='Route_L_Route_item_box' key={'route_Box'+idx}>
                    <img className='Route_L_Route_item1' src={'img/Item/BackGround/'+item[_item['name']]['grade']+'.jpg'} />
                    <img className='Route_L_Route_item2' src={'img/Item/'+_item['name']+'.png'} />
                </div>
            )
        });
    }

    typeFilterDropHandler = (e, index) => {
        const { filterType, filterTypeSelect } = this.state;        
        if (e.button === 2) {
            filterType[index] = '';
            this.setState({filterType:filterType, filterTypeSelect:0});
        } else if (e.button === 0 && filterTypeSelect !== index) {
            this.setState({filterTypeSelect:index});
        } else if (filterTypeSelect === index) {
            this.setState({filterTypeSelect:0});
        }
    }
    typeFilterSelectHandler = (e, index, type) => {
        const { filterType } = this.state;
        filterType[index] = type;
        this.setState({filterType:filterType, filterTypeSelect:0});
    }
    typeFilterDropView = (index) => {
        const { filterTypeSelect, filterTypeList } = this.state;
        if (filterTypeSelect === index) {
            return (
                <div className='Route_L_Route_Filter_dropbox_all'>
                    {
                        filterTypeList.map((type, idx) => {
                            return (
                                <div className='Route_L_Route_Filter_dropbox' key={'filter_dropbox'+idx}
                                    onClick={(e) => this.typeFilterSelectHandler(e, index, type)}>
                                    {type} 
                                </div>
                            )
                        })
                    }
                </div>
            )
        }
    }
    
    mapFilterDropHandler = (e, index) => {
        const { filterMap, filterMapSelect } = this.state;
        
        if (e.button === 2 ) {
            filterMap[index] = '';
            this.setState({filterMap:filterMap, filterMapSelect:0});
        } else if (e.button === 0 && filterMapSelect !== index) {
            this.setState({filterMapSelect:index});
        } else if (filterMapSelect === index) {
            this.setState({filterMapSelect:0});
        }
    }
    mapFilterSelectHandler = (e, index, map) => {
        const { filterMap } = this.state;
        filterMap[index] = map;
        this.setState({filterMap:filterMap, filterMapSelect:0});
    }
    mapFilterDropView = (index) => {
        const { filterMapSelect, filterMapList } = this.state;
        if (filterMapSelect === index) {
            return (
                <div className='Route_L_Route_Filter_dropbox_all'>
                    {
                        filterMapList.map((map, idx) => {
                            return (
                                <div className='Route_L_Route_Filter_dropbox' key={'filter_dropbox'+idx}
                                    onClick={(e) => this.mapFilterSelectHandler(e, index, map)}>
                                    {map} 
                                </div>
                            )
                        })
                    }
                </div>
            )
        }
    }

    render() {
        const { intl } = this.props;
        const { filterType, filterMap } = this.state;

        return (
            <div className='Route_L_Route'>
                <div className='Route_L_Route_FilterX'>
                    <div className='Route_L_Route_Filter'>우선장비</div>
                    {
                        [1, 2, 3, 4, 5].map(index => 
                            <div className='Route_L_Route_Filter'>
                                <div onMouseUp={(e) => this.typeFilterDropHandler(e, index)}
                                    onContextMenu={(e) => e.preventDefault()}>
                                    {filterType[index] || 'filter'}
                                </div>
                                {this.typeFilterDropView(index)}
                            </div>
                        )
                    }
                    <button className='Route_L_Route_cal' onClick={(e) => this.init()}>계산</button>
                </div>
                <div className='Route_L_Route_FilterX'>                    
                    {
                        [1, 2, 3, 4, 5, 6, 7].map(index => 
                            <div className='Route_L_Route_Filter'>
                                <div onMouseUp={(e) => this.mapFilterDropHandler(e, index)}
                                    onContextMenu={(e) => e.preventDefault()}>
                                    {filterMap[index] || 'filter'}
                                </div>
                                {this.mapFilterDropView(index)}
                            </div>
                        )
                    }
                </div> 
                <div className='Route_L_RouteX_all'>
                    {this.routeListXView()}
                </div>  
            </div>
        );
    };
}

export default injectIntl(Route);