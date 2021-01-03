import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Armor, itemBgI, statList, getItem, getWeaponType } from 'lib/data';
import { Item } from 'components/item';
import armorData from 'data/inGame/armor.json';

class Armors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemList: [],
            type: ['옷', '머리', '팔', '다리', '장식'],
            typeFocus: 0,
        }
    }

    typeHandler = (idx) => {
        this.setState({typeFocus: idx});
    }
    typeView = () => {
        const { intl } = this.props;
        const { type, typeFocus } = this.state;

        return type.map((name, idx) => 
            <div className={'S_item_tab ' + (idx === typeFocus ? 'actived' : '')}
                key={'type'+idx}
                onClick={(e) => this.typeHandler(idx)}>
                {intl.formatMessage({id:'armor.'+name})}
            </div>
        );        
    }

    armorsView = () => { 
        const { intl, stat } = this.props;
        const { typeFocus } = this.state;

        const itemList = stat['itemStats'][(typeFocus+1)].filter(i => 
            ['희귀', '영웅', '전설'].includes(getItem(i['_id'])['itemGrade'])
        );

        const total = stat['totalGames'];
        return itemList.map((item, idx) =>
            <div className="S_item_rank"
                key={'item' + idx}>
                <span className="S_item_rank1">{idx+1}</span>
                <Item
                    top={"S_item_toolbox1"}
                    grade={"S_item_rank2"} 
                    item={"S_item_rank2"}
                    tooltip={"S_item_tooltip3"}
                    code={item['_id']}
                    />
                <span className="S_item_rank3">{intl.formatMessage({id:'items.'+getItem(item['_id'])['name']})}</span>&nbsp;
                <span className="S_item_rank4">{(item['top1']/item['totalGames']*100).toFixed(1)}%</span>&nbsp;
                <span className="S_item_rank5">{(item['totalGames']/total*100).toFixed(1)}%</span>
            </div>
        );
    }
    statView = (name) => {
        const { intl } = this.props;

        const list = statList(name);

        let toolTip = "";
        for (const key in list) {
            toolTip += intl.formatMessage({id: 'stat.'+key}) + " " + list[key] + "\n";
        }

        return toolTip;
    }

    render() {
        const { intl } = this.props;

        return (
            <div className="S_right2">
                <div className="S_item_tab_banner2">
                    <div className="tabHeaders">
                        {this.typeView()}
                    </div>
                    <div className="S_item_sort">
                        <span className="S_item_sort1">{intl.formatMessage({id:'rank'})}</span>
                        <span className="S_item_sort2">{intl.formatMessage({id:'name'})}</span>
                        <span className="S_item_sort3">{intl.formatMessage({id:'winRate'})}</span>
                        <span className="S_item_sort4">{intl.formatMessage({id:'pickRate'})}</span>
                    </div>
                </div>
                <div className="item_scroll">
                    {this.armorsView()}
                </div>
            </div>
        );
    };
}

export default injectIntl(Armors);