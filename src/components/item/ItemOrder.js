import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { getWeaponType } from 'lib/data';
import { routeCalc } from 'lib/route';
import { Item } from 'components/item';
import mapImg from 'img/map2.png';

class ItemOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemOrderFocus:-1,
            routeFocus:0,
            routeList: [],
            mapList: {
                '양궁장': 'Archery',
                '골목길': 'Alley',
                '학교': 'School',
                '호텔': 'Hotel',
                '모래사장': 'Beach',
                '숲': 'Forest',
                '고급주택가': 'Uptown',
                '연못': 'Pond',
                '절': 'Temple',
                '병원': 'Hospital',
                '성당': 'Chapel',
                '공장': 'Factory',
                '항구': 'Dock',
                '묘지': 'Cemetery',
                '번화가': 'Avenue'
            },
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { itemOrder, bestWeapon, gameMode } = this.props;
        const { itemOrderFocus } = this.state;

        if (itemOrderFocus !== -1 && itemOrderFocus !== prevState.itemOrderFocus) {
            const select = {
                type: getWeaponType(bestWeapon), 
                start: getWeaponType(bestWeapon),
                '무기': itemOrder[itemOrderFocus]['itemList'][0]['code'],
                '머리': itemOrder[itemOrderFocus]['itemList'][1]['code'],
                '옷':   itemOrder[itemOrderFocus]['itemList'][2]['code'],
                '팔':   itemOrder[itemOrderFocus]['itemList'][3]['code'],
                '다리': itemOrder[itemOrderFocus]['itemList'][4]['code'],
                '장식': itemOrder[itemOrderFocus]['itemList'][5]['code'],
            }

            this.setState({ routeList:routeCalc(select), routeFocus:0 });
        } else if (bestWeapon !== prevProps.bestWeapon || gameMode !== prevProps.gameMode) {
            this.setState({ routeList:[], itemOrderFocus:-1, routeFocus:0 });
        }
    }
    
    itemOrderTabHandler = (idx) => {
        this.setState({itemOrderFocus: idx});
    };
    itemOrderTabView = () => {
        const { intl, stat, itemOrder } = this.props;
        const { itemOrderFocus } = this.state;

        return itemOrder.slice(0, 10).map((order, idx) => 
            <div className={'item_tab'+(idx===itemOrderFocus ? ' actived' : '')} key={"item_tab_"+idx}
                onClick={(e) => this.itemOrderTabHandler(idx)}>
                <div className="item_tab_imgbox_all">
                    {
                        order['itemList'].map((item, idx) =>
                            <Item key={'Item_'+idx}
                                top={"item_tab_imgbox"}
                                grade={"item_tab_bg"} 
                                item={"item_tab_img"}
                                tooltip={"S_item_tooltip"+(idx%3+4)}
                                code={item['code']}
                                />
                        )
                    }
                </div>
                <div className='item_tab_span'>
                    <span className='item_tab_span1'>{intl.formatMessage({id: 'pickRate'})} {(order['pick']*100).toFixed(1)}%</span>
                    <span className='item_tab_span2'>{intl.formatMessage({id: 'winRate'})} {(order['win']/order['total']*100).toFixed(1)}%</span>
                    <span className='item_tab_span3'>{order['total']}</span>
                </div>
            </div>
        )
    }

    itemRouteTabView = () => {
        const { intl } = this.props;
        const { routeFocus } = this.state;
        return [0, 1, 2, 3, 4].map(i => 
            <div className={"item_route_tab"+(i===routeFocus?' actived':'')} key={"item_route_tab_"+i}
                onClick={(e) => this.setState({routeFocus: i})}>
                {intl.formatMessage({id: "main.banner.menu.route" })}{i+1}
            </div>
        )
    }
    itemRouteMapView = () => {
        const { intl } = this.props;
        const { mapList, routeList, routeFocus } = this.state;

        const route = routeList[routeFocus];
        return (
            <div className="item_route_map">
                <img className="item_route_map2" src={mapImg} /> 
                {
                    Object.keys(mapList).map((key, idx) => {
                        const en = mapList[key].toLowerCase();
                        if (route['route'].includes(key)) {
                            return <img className={"Route_R_Mapimg_"+en} src={'img/map/'+key+'.png'} key={'Mapimg_'+idx} /> 
                        }
                    })
                }
                <div className="Route_R_Mapspan_box">
                    {
                        Object.keys(mapList).map((key, idx) => {
                            const en = mapList[key].toLowerCase();
                            const index = route['route'].indexOf(key);
                            if (index >= 0) {
                                return (
                                    <div key={'Mapspan_'+idx}>
                                        <span className={"Route_R_Mapspan_"+en+"1"} key={'Mapspan_'+idx} > {index+1} </span>
                                        <span className={"Route_R_Mapspan_"+en}> {intl.formatMessage({id: mapList[key]})} </span>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </div>
        )
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

    itemRouteDropView = () => {
        const { intl } = this.props;
        const { mapList, routeList, routeFocus } = this.state;
        
        const viewList = routeList[routeFocus]['view'];

        return viewList.map((view, idx) => {
            return (
                <div className={"item_route_spawnY"+((idx+1)%3===0?'-R':'')} key={"route_spawnY"+idx}>
                    <div className="item_route_spawn_title">{idx+1} {intl.formatMessage({id: view['name']})}</div>
                    <div className="item_route_spawn_Make">
                        {
                            view['item'].map((item, idx) =>
                                <Item key={'Item_'+idx}
                                    top={"item_route_spawn_Make_img"}
                                    grade={"item_route_spawn_Make_img1"} 
                                    item={"item_route_spawn_Make_img2"}
                                    code={item['name']}
                                    />
                            )
                        }
                    </div>
                    <div className="item_route_spawn_Need">
                        {
                            view['getScr'].map((item, idx) =>
                                <Item key={'Item_'+idx}
                                    top={"item_route_spawn_Make_img"}
                                    grade={"item_route_spawn_Make_img1"} 
                                    item={"item_route_spawn_Make_img2"}
                                    code={item}
                                    />
                            )
                        }
                    </div>
                </div>
            )
        })
        
    }

    render() {
        const { intl } = this.props;
        const { mapList, routeList } = this.state;

        return (
            <div className="item_order">
                <div className='item_tabs'>
                    {this.itemOrderTabView()}
                </div>
                {
                    routeList.length !== 0 && 
                        <div className="item_route">
                            <img className="item_route_startimg" src="/img/Weapons/단검.jpg" />
                            <div className="tabHeaders">
                                {this.itemRouteTabView()}
                            </div>
                            {this.itemRouteMapView()}
                        </div>
                }
                <div className="item_route_spawn">
                    {routeList.length !== 0 && this.itemRouteDropView()}
                </div> 
            </div>
        );
    };
}

export default injectIntl(ItemOrder);