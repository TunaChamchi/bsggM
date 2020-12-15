import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Weapon, itemBgI, statList } from 'lib/data'

class Weapons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weaponList: []
        }
    }

    componentWillMount() {
        this.init();
    };
    componentDidUpdate(prevProps, prevState) {
        if (this.props.character !== prevProps.character || this.props.weapon !== prevProps.weapon
            || this.props.range !== prevProps.range || this.props.type !== prevProps.type) {
            this.init();
        }
    };

    init() {
        const { character, weapon, type } = this.props;        

        this.setState({ weaponList: Weapon(character, weapon, type) });
    };

    weaponView = () => {
        const { intl, weapon } = this.props;
        const { weaponList } = this.state;

        weaponList.sort((a, b) => b['win-rate'] - a['win-rate']);

        return weaponList.map((_weapon, idx) =>
            <div className={'S_item_rank'}
                key={'weapon' + idx}>
                <span className="S_item_rank1">{idx+1}</span>&nbsp;
                <div className="S_item_toolbox">
                    <img className="S_item_rank2" src={itemBgI(_weapon['weapon'])}/>
                    <img className="S_item_rank2" src={'img/Item/'+_weapon['weapon']+'.png'} />&nbsp;
                    <div className="S_item_tooltip2">
                        <span>{this.statView(_weapon['weapon'])}</span>
                    </div>
                </div>
                <span className="S_item_rank3">{intl.formatMessage({id:'items.'+_weapon['weapon']})}</span>&nbsp;
                <span className="S_item_rank4">{_weapon['win-rate'].toFixed(1)}%</span>&nbsp;
                <span className="S_item_rank5">{_weapon['pick-rate'].toFixed(1)}%</span>
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
            <div>
                <div className="S_item_sort">
                    <span className="S_item_sort1">{intl.formatMessage({id:'rank'})}</span>
                    <span className="S_item_sort2">{intl.formatMessage({id:'name'})}</span>
                    <span className="S_item_sort3">{intl.formatMessage({id:'win-rate'})}</span>
                    <span className="S_item_sort4">{intl.formatMessage({id:'pick-rate'})}</span>
                </div>
                {this.weaponView()}
            </div>
        );
    };
}

export default injectIntl(Weapons);