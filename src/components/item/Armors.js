import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Armor } from 'lib/data'

class Armors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemList: [],
            type: ['옷', '머리', '팔', '다리', '장식'],
            typeFocus: 0,
        }
    }

    componentWillMount() {
        this.init();
    };
    componentDidUpdate(prevProps, prevState) {
        if (this.props.range !== prevProps.range || this.state.typeFocus !== prevState.typeFocus) {
            this.init();
        }
    };

    init() {
        const { type, typeFocus } = this.state;
        const { range } = this.props;

        this.setState({ itemList: Armor(range, type[typeFocus]) });
    };

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
        const { intl } = this.props;
        const { itemList, type, typeFocus } = this.state;

        itemList.sort((a, b) => b['win-rate'] - a['win-rate']);

        return itemList.map((armor, idx) =>
            <div className="S_item_rank"
                key={'item' + idx}>
                <span className="S_item_rank1">{idx+1}</span>
                <img className="S_item_rank2" src={'img/Item/Armor/'+type[typeFocus]+'/'+armor['name']+'.png'} />
                <span className="S_item_rank3">{intl.formatMessage({id: 'items.'+armor['name']})}</span>
                <span className="S_item_rank6">{armor['win-rate']}%</span>
            </div>
        );
    }

    render() {
        const { intl } = this.props;

        return (
            <div className="S_right2">
                <div className="S_item_tab_banner2">
                    <div className="tabHeaders">
                        {this.typeView()}
                    </div>
                    <div className="S_item_sort_b">
                        <span className="S_item_sort_b1">{intl.formatMessage({id:'rank'})}</span>
                        <span className="S_item_sort_b2">{intl.formatMessage({id:'name'})}</span>
                        <span className="S_item_sort_b3">{intl.formatMessage({id:'win-rate'})}</span>
                    </div>
                </div>
                {this.armorsView()}
            </div>
        );
    };
}

export default injectIntl(Armors);