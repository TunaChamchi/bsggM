import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';
//import AdSense from 'react-adsense';
import { itemBgI } from 'lib/data';
import { Item } from 'components/item';
import mapData from 'data/inGame/map.json'

class SrcItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    };
    
    itemView = () => {
        const { map } = this.props;

        const itemList = mapData[map]['quest'];

        return itemList.map((item, idx) => 
            <Item key={'Item_'+idx} key={'item'+idx}
                top={"map_item_locale"}
                grade={"map_img_item2"} 
                item={"map_img_item"}
                code={item}
                />
        );
    }

    render() {
        const { intl } = this.props;

        return (
            <div className="map_square">
                <div className="map_tab">{intl.formatMessage({id:'드랍 아이템'})}</div>
                {this.itemView()}
            </div>
        );
    };
}

export default injectIntl(SrcItem);