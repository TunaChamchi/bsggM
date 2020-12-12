import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Armor } from 'lib/data'

class Armors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemList: []
        }
    }

    componentWillMount() {
        this.init();
    };
    componentDidUpdate(prevProps, prevState) {
        if (this.props.range !== prevProps.range || this.props.type !== prevProps.type) {
            this.init();
        }
    };

    init() {
        const { range, type } = this.props;

        this.setState({ itemList: Armor(range, type) });
    };

    armorsView = () => { 
        const { intl, type } = this.props;
        const { itemList } = this.state;

        itemList.sort((a, b) => b['win-rate'] - a['win-rate']);

        return itemList.map((armor, idx) =>
            <div className="S_item_rank"
                key={'item' + idx}>
                <span className="S_item_rank1">{idx+1}</span>
                <img className="S_item_rank2" src={'img/Item/Armor/'+type+'/'+armor['name']+'.png'} />
                <span className="S_item_rank3">{intl.formatMessage({id: 'items.'+armor['name']})}</span>
                <span className="S_item_rank6">{armor['win-rate']}%</span>
            </div>
        );
    }

    render() {
        const { intl } = this.props;

        return (
            <div>
                <div className="S_item_sort_b">
                    <span className="S_item_sort_b1">{intl.formatMessage({id:'rank'})}</span>
                    <span className="S_item_sort_b2">{intl.formatMessage({id:'name'})}</span>
                    <span className="S_item_sort_b3">{intl.formatMessage({id:'win-rate'})}</span>
                </div>
                {this.armorsView()}
            </div>
        );
    };
}

export default injectIntl(Armors);