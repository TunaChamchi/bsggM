import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { injectIntl  } from 'react-intl';
import AdSense from 'react-adsense';
import { Header, MainBanner, AdS, Footer } from 'components/banner'
//import { Route, Stat } from 'components/route'
import item from 'data/inGame/item.json'
import weapon from 'data/inGame/weapon.json'
import armor from 'data/inGame/armor.json'
import map from 'data/inGame/map.json'
import mapImg from 'img/map2.png';

class RouteM extends Component {
    constructor(props) {
        super(props);
        this.state = {
            select: { type:'단검', start: '단검' },
            type:["단검","양손검","도끼","쌍검","권총","돌격소총","저격총","레이피어","창","망치","배트","투척","암기","활","석궁","글러브","톤파","기타","쌍절곤"],
            start:["단검","양손검","도끼","권총","돌격소총","저격총","레이피어","창","망치","배트","투척","암기","활","석궁","글러브","톤파","기타","쌍절곤"],
            selectType: '',
            selectViewList: [],

            mapMove: {
                '골목길': ['절', '번화가', '연못', '병원', '양궁장', '학교', '묘지', '공장', '호텔', '숲', '성당', '모래사장', '고급 주택가', '항구'],
                '절': ['골목길', '번화가', '연못', '병원', '양궁장', '학교', '묘지', '공장', '호텔', '숲', '성당', '모래사장', '고급 주택가', '항구'],
                '번화가': ['골목길', '절', '연못', '병원', '양궁장', '학교', '묘지', '공장', '호텔', '숲', '성당', '모래사장', '고급 주택가', '항구'],
                '연못': ['번화가', '절', '병원', '묘지'], 
                '병원': ['골목길', '절', '번화가', '연못', '양궁장', '학교', '묘지', '공장', '호텔', '숲', '성당', '모래사장', '고급 주택가', '항구'],
                '양궁장': ['골목길', '절', '번화가', '연못', '병원', '학교', '묘지', '공장', '호텔', '숲', '성당', '모래사장', '고급 주택가', '항구'],
                '학교': ['양궁장', '골목길', '숲', '호텔', '번화가'],
                '묘지': ['성당', '공장', '병원', '연못'],
                '공장': ['항구', '성당', '묘지', '병원'],
                '호텔': ['골목길', '절', '번화가', '연못', '병원', '양궁장', '학교', '묘지', '공장', '숲', '성당', '모래사장', '고급 주택가', '항구'],
                '숲': ['학교', '호텔', '모래사장', '고급 주택가', '번화가', '성당'],
                '성당': ['골목길', '절', '번화가', '연못', '병원', '양궁장', '학교', '묘지', '공장', '호텔', '숲', '모래사장', '고급 주택가', '항구'],
                '모래사장': ['골목길', '절', '번화가', '연못', '병원', '양궁장', '학교', '묘지', '공장', '호텔', '숲', '성당', '고급 주택가', '항구'],
                '고급 주택가': ['골목길', '절', '번화가', '연못', '병원', '양궁장', '학교', '묘지', '공장', '호텔', '숲', '성당', '모래사장', '항구'],
                '항구': ['고급 주택가', '성당', '공장'],
            },
            startWeapon:{'단검':'가위','양손검':'녹슨검','도끼':'곡괭이','권총':'발터PPK','돌격소총':'페도로프자동소총','저격총':'화승총','레이피어':'바늘','창':'단창','망치':'망치','배트':'단봉','투척':'야구공','암기':'면도칼','활':'양궁','석궁':'석궁','글러브':'목장갑','톤파':'대나무','기타':'보급형기타','쌍절곤':'쇠사슬'},
            mapSrc: {},
            routeList: [],
            _select:{},
            filterType: {'1':'무기','2':'다리'},
            filterTypeSelect: 0,
            filterTypeList: ['무기', '머리', '옷', '팔', '다리', '장식'],
            filterMap: {},
            filterMapSelect: 0,
            filterMapList: ['골목길', '절', '번화가', '연못', '병원', '양궁장', '학교', '묘지', '공장', '호텔', '숲', '성당', '모래사장', '고급 주택가', '항구'],
        
            selectRoute: {
                route:[]
            },
            selectMap: '',
            selectMapSrc:[],
            mapList: {
                '양궁장': 'Archery',
                '골목길': 'Alley',
                '학교': 'School',
                '호텔': 'Hotel',
                '모래사장': 'Beach',
                '숲': 'Forest',
                '고급주택가': 'Uptown',
                '고급 주택가': 'Uptown',
                '연못': 'Pond',
                '절': 'Temple',
                '병원': 'Hospital',
                '성당': 'Chapel',
                '공장': 'Factory',
                '항구': 'Dock',
                '묘지': 'Cemetery',
                '번화가': 'Avenue'
            },
            addStat:[]
        };
    }

    componentWillMount() {
        this.init();
    };
    componentDidUpdate(prevProps, prevState){
        const { select, _select } = this.state;

        if (Object.keys(select).length === 8) {
            let isEq = true;
            for (const key in select) {
                if (select[key] === '')
                    return;
                else if (select[key] !== _select[key])
                    isEq = false;
            }
            if (!isEq) {
                if (Object.keys(select).length === 8) {
                    this.setState({_select: JSON.parse(JSON.stringify(select))});
                    this.routeCalc();
                }
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
        const { select, mapSrc, filterType } = this.state;
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

        const routeList = this.routeListByAll(extSrc, 6, _filterType);

        //console.log('routeList1', routeList);

        if (routeList.length < 20)
            routeList = this.routeListByAll(extSrc, 7, _filterType);

        //console.log('routeList2', routeList);

        const extTypeList = ['무기', '머리', '옷', '팔', '다리', '장식'].filter(type => !filterTypeList.includes(type));
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
                score[index] = -route[type] *(extTypeList.length-1.5); // 6순위부터 -1.5점, 5순위부터 -0.5점, 4순위부터 0.5점, 3순위부터 1.5점
            });

            route['score'] = score['1'] + score['2'] + score['3'] + score['4'] + score['5'] + score['6'] - route['route'].length*3;
        });
        const topList = this.routeSortTop(routeList, 20);
        //console.log('topList', topList);

        this.setRouteListForItem(mapSrc, selectSrc, topList);
        //console.log('topList2', topList);

        this.setState({routeList: topList, selectRoute:{route:[]}, selectMap:'', selectMapSrc: []});
    }

    selectSrc() {
        const { select, startWeapon } = this.state;
        const itemSrc = {};
        console.log(select['type']);
        console.log(startWeapon[select['type']]);
        console.log(startWeapon);
        const startItem = [
            { name: startWeapon[select['type']], count: 1 },
            { name: '물', count: 2 },
            //{ name: '빵', count: 2 },
        ];
        
        ['무기', '머리', '옷', '팔', '다리', '장식'].forEach(type => {
            itemSrc[type] = [];
            this.itemSrc(itemSrc[type], select[type], itemSrc, type, startItem);
        });
        return itemSrc;
    }

    itemSrc(src, itemName, itemSrc, type, startItem) {
        const { select } = this.state;

        const outList = ['가죽', '돌멩이', '나뭇가지', '미스릴', '운석', 'VF혈액샘플', ];

        let list = [];

        item[itemName]['src'].forEach(_srcName => {
            if (item[_srcName]['src']) {
                const srcList = this.itemSrc(src, _srcName, itemSrc, type, startItem);

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
        //const { select } = this.state;
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

    routeListByAll(extSrc, MapIdx, filterType) {
        const { mapMove } = this.state;

        const list = [];

        for (const mapName in mapMove) {
            const route = {
                route: []
            };

            this.routeListByAll2(extSrc, list, route, extSrc['ALL'][mapName], mapName, 1, MapIdx, filterType);
        }

        return list;
    }

    routeListByAll2(extSrc, list, route, _extSrc, mapName, idx, MapIdx, filterType) {
        const { mapMove, filterMap } = this.state;

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

                this.routeListByAll2(extSrc, list, _route, _extSrc, nextMap, idx+1, MapIdx, filterType);
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
        const { select } = this.state;
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

    typeFilterDropHandler = (e, index) => {
        const { filterType, filterTypeSelect } = this.state;
        if (e.button === 2) {
            filterType[index] = '';
            this.setState({filterType:filterType, filterTypeSelect:0, filterMapSelect:0, selectViewList: [], selectType:''});
        } else if (e.button === 0 && filterTypeSelect !== index) {
            this.setState({filterTypeSelect:index, filterMapSelect:0, selectViewList: [], selectType:''});
        } else if (filterTypeSelect === index) {
            this.setState({filterTypeSelect:0, filterMapSelect:0, selectViewList: [], selectType:''});
        }
    }
    typeFilterDropDubleHandler = (e, index) => {
        const { filterType, filterTypeSelect } = this.state;
        filterType[index] = '';
        this.setState({filterType:filterType, filterTypeSelect:0, filterMapSelect:0, selectViewList: [], selectType:''});
    }
    typeFilterSelectHandler = (e, index, type) => {
        const { filterType } = this.state;
        filterType[index] = type;
        this.setState({filterType:filterType, filterTypeSelect:0});
    }
    typeFilterDropView = (index) => {
        const { intl } = this.props;
        const { filterTypeSelect, filterTypeList } = this.state;
        if (filterTypeSelect === index) {
            return (
                <div className='Route_L_Route_Filter_dropbox_all'>
                    {
                        filterTypeList.map((type, idx) => {
                            return (
                                <div className='Route_L_Route_Filter_dropbox' key={'filter_dropbox'+idx}
                                    onClick={(e) => this.typeFilterSelectHandler(e, index, type)}>
                                    {intl.formatMessage({id: 'armor.'+type})}
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
            this.setState({filterMap:filterMap, filterMapSelect:0, filterTypeSelect:0, selectViewList: [], selectType:''});
        } else if (e.button === 0 && filterMapSelect !== index) {
            this.setState({filterMapSelect:index, filterTypeSelect:0, selectViewList: [], selectType:''});
        } else if (filterMapSelect === index) {
            this.setState({filterMapSelect:0, filterTypeSelect:0, selectViewList: [], selectType:''});
        }
    }
    mapFilterDropDubleHandler = (e, index) => {
        const { filterMap, filterMapSelect } = this.state;
        filterMap[index] = '';
        this.setState({filterMap:filterMap, filterMapSelect:0, filterTypeSelect:0, selectViewList: [], selectType:''});
    }
    mapFilterSelectHandler = (e, index, map) => {
        const { filterMap } = this.state;
        filterMap[index] = map;
        this.setState({filterMap:filterMap, filterMapSelect:0});
    }
    mapFilterDropView = (index) => {
        const { intl } = this.props;
        const { filterMapSelect, filterMapList, mapList } = this.state;
        if (filterMapSelect === index) {
            return (
                <div className='Route_L_Route_Filter_dropbox_all'>
                    {
                        filterMapList.map((map, idx) => {
                            return (
                                <div className='Route_L_Route_Filter_dropbox' key={'filter_dropbox'+idx}
                                    onClick={(e) => this.mapFilterSelectHandler(e, index, map)}>
                                    {intl.formatMessage({id: mapList[map]})}
                                </div>
                            )
                        })
                    }
                </div>
            )
        }
    }

    selectHandler = (e, type, value) => {
        const { select } = this.state;

        if (type === 'type') {
            if (select[type] !== value) {
                select['start'] = '';
                select['무기'] = '';
            }
            if (value !== '쌍검') select['start'] = value;
        }

        select[type] = value;
        this.setState({select: select, selectViewList: [], selectType:''});
    }
    selectTypeHandler = (e, type) => {
        const { select, selectType } = this.state;

        if (e.button === 2) {
            select[type] = '';
            this.setState({selectViewList:[], selectType:'', select:select, filterTypeSelect:0, filterMapSelect:0});
        } else if (e.button === 0 && selectType !== type) {
            let list = [];
            if (type === 'type' || type === 'start' ) {
                list = this.state[type];
            } else if (type === '무기') {
                if (!select['type']) return;
                const _weapon = weapon[select['type']];
                for (const key in _weapon) {
                    if (_weapon[key]['grade'] !== '일반')
                        list.push(key);
                }
            } else {
                const _armor = armor[type];
                for (const key in _armor) {
                    if (_armor[key]['grade'] !== '일반')
                        list.push(key);
                }
            }
            
            this.setState({selectViewList: list, selectType:type, filterTypeSelect:0, filterMapSelect:0});
        } else if (selectType === type) {
            this.setState({selectViewList: [], selectType:'', filterTypeSelect:0, filterMapSelect:0});
        }
    }
    selectTypeDubleHandler = (e, type) => {
        const { select, selectType } = this.state;
        select[type] = '';
        this.setState({selectViewList:[], selectType:'', select:select, filterTypeSelect:0, filterMapSelect:0});
    }

    itemFilterView = () => {
        const { intl } = this.props;
        const { select } = this.state;
        const imgType = select['type'] ? 'img/Weapons/'+select['type']+'.jpg' : '';
        const imgStart = select['start'] ? 'img/Weapons/'+select['start']+'.jpg' : '';

        return (
            <div className="Route_L_Item">
                <div className="Route_L_ItemX">
                    <div className="Route_L_StartItem_box"> 
                        <div className="Route_L_StartItem" onMouseUp={(e) => this.selectTypeHandler(e, 'type')}
                            onDoubleClick={(e) => this.selectTypeDubleHandler(e, 'type')}>
                            <img className="Route_L_StartItem1" src={imgType} />
                            <span className="Route_L_StartItem2">{intl.formatMessage({id:'최종 무기'})}</span>
                        </div>
                        <div className="Route_L_StartItem_dropbox_all"> 
                            {this.itemFilterDropBoxView('type')}
                        </div> 
                    </div>
                    {this.itemFilterView2(['무기', '머리', '옷'])}
                </div>
                <div className="Route_L_ItemX">
                    <div className="Route_L_StartItem_box"> 
                        <div className="Route_L_StartItem" onMouseUp={(e) => this.selectTypeHandler(e, 'start')}
                            onDoubleClick={(e) => this.selectTypeDubleHandler(e, 'start')}>
                            <img className="Route_L_StartItem1" src={imgStart} />
                            <span className="Route_L_StartItem2">{intl.formatMessage({id:'시작 무기'})}</span>
                        </div>
                        <div className="Route_L_StartItem_dropbox_all"> 
                            {this.itemFilterDropBoxView('start')}
                        </div> 
                    </div>
                    {this.itemFilterView2(['팔', '다리', '장식'])}
                </div>
            </div>
        );
    }
    itemFilterView2 = (list) => {
        const { intl } = this.props;
        const { select } = this.state;
        return list.map((type, idx) => {
            const itemName = select[type] ? intl.formatMessage({id: 'items.'+select[type]}) : intl.formatMessage({id: 'armor.'+type})+' '+intl.formatMessage({id: '선택'});
            const imgGrade = select[type] ? 'img/Item/BackGround/'+item[select[type]]['grade']+'.jpg' : 'img/Item/BackGround/일반.jpg';
            const imgItem = select[type] ? 'img/Item/'+select[type]+'.png' : '';
            return (
                <div className="Route_L_PickItem_box" key={'PickItem_box'+idx}> 
                    <div onMouseUp={(e) => this.selectTypeHandler(e, type)}
                        onDoubleClick={(e) => this.selectTypeDubleHandler(e, type)}>
                        <div className="Route_L_PickItem">
                            <img className="Route_L_PickItem1" src={imgGrade} />
                            <img className="Route_L_PickItem2" src={imgItem} />
                        </div>
                        <span className="Route_L_PickItem3">{itemName}</span>
                    </div>
                    <div className="Route_L_PickItem_dropbox_all"> 
                        {this.itemFilterDropBoxView(type)}
                    </div>
                </div>
            )
        });
    }
    itemFilterDropBoxView = (type) => {
        const { intl } = this.props;
        const { selectType, selectViewList } = this.state;

        if (type !== selectType) return;

        return selectViewList.map((name, idx) => {
            if (type === 'type' || type === 'start' ) {
                return (
                    <div className="Route_L_StartItem_dropbox" key={type+'_list'+idx} onClick={(e) => this.selectHandler(e, type, name)}>
                        <img className="Route_L_StartItem_dropbox1" src={'img/Weapons/'+name+'.jpg'} />
                        <span className="Route_L_StartItem_dropbox2">{intl.formatMessage({id: 'weapons.'+name})}</span>
                    </div>
                )
            } else {
                return (
                    <div className="Route_L_PickItem_dropbox" key={type+'_list'+idx} onClick={(e) => this.selectHandler(e, type, name)}>
                        <div className="Route_L_PickItem_dropbox0">
                            <img className="Route_L_PickItem_dropbox1" src={'img/Item/BackGround/'+item[name]['grade']+'.jpg'} />
                            <img className="Route_L_PickItem_dropbox2" src={'img/Item/'+name+'.png'} />
                        </div>
                        <span className="Route_L_PickItem_dropbox3">{intl.formatMessage({id: 'items.'+name})}</span>
                    </div>
                )
            }
        });        
    }

    
    routeSelectHandler = (e, route) => {
        //console.log('selectRoute', route);
        this.setState({selectRoute:route});
    }
    routeListXView() {
        const { routeList } = this.state;

        return routeList.map((route, idx) => {
            return (
                <div className='Route_L_RouteX' key={'route_X'+idx}
                    onClick={(e) => this.routeSelectHandler(e, route)}>
                    {this.routeListYView(route)}
                </div>
            )
        });
    }
    routeListYView(route) {
        const { intl } = this.props;
        const { mapList } = this.state;
        return route['view'].map((view, idx) => {
            return (
                <div className='Route_L_RouteY' key={'route_Y'+idx}>
                    <div className='Route_L_Route_region'>{intl.formatMessage({id: mapList[view['name']]})}</div>
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

    selectMapHandler = (e, index) => {
        const { select, mapSrc, selectRoute } = this.state;
        const mapName = selectRoute['view'][index]['name'];
        let getSrc = [];

        const selectSrc = this.selectSrc();
        ['무기', '머리', '옷', '팔', '다리', '장식'].forEach(type => {
            selectSrc[type].forEach(src => { 
                if (!getSrc.includes(src)) getSrc.push(src);
            });
        });

        getSrc = mapSrc[mapName].filter(src => getSrc.includes(src));

        this.setState({selectMap:mapName, selectMapSrc:getSrc});
    }

    render() {
        const { intl } = this.props;
        const { filterType, filterMap, mapList, selectRoute, selectMap, selectMapSrc, addStat } = this.state;

        const metaData = {
            title: 'BSGG.kr - ' + intl.formatMessage({id: 'Title.Map'}),
            description: '영원회귀 : 블랙 서바이벌 통계, 캐릭터 티어, 아이템 트렌드, BS:ER Stats, Character Tier, Item Trend'
        }

        //console.log('selectRoute', selectRoute);

        return (
            <div>
                <Header data={metaData}/>
                <MainBanner />
                {/* <div className="Ad_box_Detail2">
                    <ins 
                        class="kakao_ad_area" 
                        style={{display: 'none'}}
                        data-ad-unit="DAN-eOZOZvEyRvmmrIAV" 
                        data-ad-width="728" 
                    data-ad-height="90"></ins>
                </div> */}
                <AdSense.Google
                    className='Ad_box_Detail2'
                    client='ca-pub-7215780243476450'
                    slot='9630487981'
                    style={{ display: 'block', width:728 }}
                    responsive='true'
                    />
                <div className="map_main">
                    <div className="tri"></div>
                    <div className="map_title">
                        <span className="map_title_span">MAP</span>
                    </div>
                    <div className="tabHeaders">
                        <span className="map_tab0 actived">{intl.formatMessage({id:'루트제작'})}</span>
                        <Link to='/Map'><span className="map_tab0">{intl.formatMessage({id:'지도 도감'})}</span></Link>
                    </div>
                    <div className="Route_L">
                        {this.itemFilterView()}
                        <div className='Route_L_Route'>
                            <div className='Route_L_Route_FilterX'>
                                <div className='Route_L_Route_Filter'>{intl.formatMessage({id:'우선 장비'})}</div>
                                {
                                    [1, 2, 3, 4, 5].map(index => 
                                        <div className='Route_L_Route_Filter' key={'Filter1_'+index}>
                                            <div onMouseUp={(e) => this.typeFilterDropHandler(e, index)}
                                                onDoubleClick={(e) => this.typeFilterDropDubleHandler(e, index)}>
                                                {filterType[index] ? intl.formatMessage({id: 'armor.'+filterType[index]}) : intl.formatMessage({id: 'filter1'})}
                                            </div>
                                            {this.typeFilterDropView(index)}
                                        </div>
                                    )
                                }
                                <button className='Route_L_Route_cal' onClick={(e) => this.routeCalc()}>{intl.formatMessage({id:'계산'})}</button>
                            </div>
                            <div className='Route_L_Route_FilterX'>                    
                                {
                                    [1, 2, 3, 4, 5, 6, 7].map(index => 
                                        <div className='Route_L_Route_Filter' key={'Filter2_'+index}>
                                            <div onMouseUp={(e) => this.mapFilterDropHandler(e, index)}
                                                onDoubleClick={(e) => this.mapFilterDropDubleHandler(e, index)}>
                                                {filterMap[index] ? intl.formatMessage({id: mapList[filterMap[index]]}) : intl.formatMessage({id: 'filter2'})}
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
                    </div>
                    <div className="Route_R">
                        <div className="Route_R_Map">
                            <div className="Route_R_Mapimg_box">
                                <img className="Route_R_Mapimg" src={mapImg} /> 
                                {
                                    Object.keys(mapList).map((key, idx) => {
                                        const en = mapList[key].toLowerCase();
                                        if (selectRoute['route'].includes(key)) {
                                            return <img className={"Route_R_Mapimg_"+en} src={'img/map/'+key+'.png'} key={'Mapimg_'+idx} /> 
                                        }
                                    })
                                }
                                <div className="Route_R_Mapspan_box">
                                    {
                                        Object.keys(mapList).map((key, idx) => {
                                            const en = mapList[key].toLowerCase();
                                            const index = selectRoute['route'].indexOf(key);
                                            const isSelect = selectMap === key ? ' actived' : '';
                                            if (index >= 0) {
                                                return (
                                                    <div key={'Mapspan_'+idx} onClick={(e) => this.selectMapHandler(e, index)}>
                                                        <span className={"Route_R_Mapspan_"+en+"1"+isSelect} key={'Mapspan_'+idx} > {index+1} </span>
                                                        <span className={"Route_R_Mapspan_"+en+isSelect}> {intl.formatMessage({id: mapList[key]})} </span>
                                                    </div>
                                                )
                                             }
                                        })
                                    }
                                </div>
                            </div>
                            <div className="Route_R_Mapitem_allbox">
                                <span className="Route_R_Mapitem_title">{intl.formatMessage({id:'드랍 아이템'})}</span>
                                {
                                    selectMap !== '' &&
                                        selectMapSrc.map((src, idx) => {
                                            return (
                                                <div className="Route_R_Mapitem_box" key={'Mapitem_'+idx}>
                                                    <img className="Route_R_Mapitem1" src={'img/Item/BackGround/'+item[src]['grade']+'.jpg'} />
                                                    <img className="Route_R_Mapitem2" src={'img/Item/'+src+'.png'} />
                                                </div>
                                            )
                                        })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <AdSense.Google
                    className='Ad_box_Detail2'
                    client='ca-pub-7215780243476450'
                    slot='8063267204'
                    style={{ display: 'block', width:728 }}
                    responsive='true'
                    />
                <Footer />
            </div>
        );
    };
}

export default injectIntl(RouteM);