import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Weapons, Armors } from 'components/item';
import { Weapon } from 'lib/data'
import qusetionlogo from 'img/questionlogo.png';

class ItemRank extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weaponList: [],
            itemType: ['무기', '옷', '머리', '팔', '다리', '장식'],
            itemTypeFocus: 0,
        }
    }
    
    itemTypeHandler = (idx) => {
        this.setState({itemTypeFocus: idx});
    }
    itemTypeView = () => {
        const { intl } = this.props;
        const { itemType, itemTypeFocus } = this.state;

        return itemType.map((name, idx) => 
            <div className={'S_item_tab ' + (idx === itemTypeFocus ? 'actived' : '')}
                key={'itemType'+idx}
                onClick={(e) => this.itemTypeHandler(idx)}>
                {intl.formatMessage({id: 'armor.'+name})}
            </div>
        );
    };

    render() {
        const { intl, stat } = this.props;
        const { itemType, itemTypeFocus } = this.state;
        return (
            <div className="S_right">
                <div className="S_item">
                    <div className="S_item_tab_banner">                        
                        <div className="tabHeaders">
                            {this.itemTypeView()}
                        </div>
                    </div>
                    {
                        itemTypeFocus === 0 ?
                            <Weapons 
                                stat={stat}
                                />
                            :
                            <Armors 
                                stat={stat}
                                typeFocus={itemTypeFocus}
                                />
                    }
                </div>
            </div>
        );
    };
}

export default injectIntl(ItemRank);