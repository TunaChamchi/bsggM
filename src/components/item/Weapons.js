import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Weapon, itemBgI, statList, getItem, getWeaponType } from 'lib/data';
import { Item } from 'components/item';
import qusetionlogo from 'img/questionlogo.png';

class Weapons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weaponList: [],
        }
    }

    weaponView = () => {
        const { intl, stat } = this.props;

        const weaponType = getWeaponType(stat['bestWeapon'])
        const weaponList = stat['itemStats'][0].filter(
            i => ['희귀', '영웅', '전설'].includes(getItem(i['_id'])['itemGrade']) 
            && weaponType === getItem(i['_id'])['weaponType']
        );

        const total = stat['totalGames'];
        return weaponList.map((item, idx) => 
            <div className={'S_item_rank'}
                key={'weapon' + idx}>
                <span className="S_item_rank1">{idx+1}</span>&nbsp;                
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

        try {
            const list = statList(name);

            let toolTip = "";
            for (const key in list) {
                toolTip += intl.formatMessage({id: 'stat.'+key}) + " " + list[key] + "\n";
            }

            return toolTip;
        }
        catch
        {
            return '';
        }
    }

    render() {
        const { intl } = this.props;

        return (
            <div className="S_right">
                <div className="S_item">
                    <div className="S_item_tab_banner">
                        <div className="S_item_tab1"><span className="S_item_tab1">{intl.formatMessage({id:'weapon'})}</span></div>
                        <div className="S_item_sort">
                            <span className="S_item_sort1">{intl.formatMessage({id:'rank'})}</span>
                            <span className="S_item_sort2">{intl.formatMessage({id:'name'})}</span>
                            <span className="S_item_sort3">{intl.formatMessage({id:'winRate'})}</span>
                            <span className="S_item_sort4">{intl.formatMessage({id:'pickRate'})}</span>
                        </div>
                    </div>
                    {this.weaponView()}
                </div>
            </div>
        );
    };
}

export default injectIntl(Weapons);