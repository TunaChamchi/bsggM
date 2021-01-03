import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';
//import AdSense from 'react-adsense';
import map from 'img/map.png';
import mapData from 'data/inGame/map.json'

class Dex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isClick: false,
        };
    }

    onClick = (e) => {
        e.target.className += " Active"
    }
    
    dexView = () => {
        const { intl } = this.props;
        return  (
            <div className="tabHeaders2">
                <div className="map_Archery" onClick={(e) => this.onClick(e)}>{intl.formatMessage({id: 'Archery'})}</div>
                <div className="map_Alley" onClick={(e) => this.onClick(e)}>{intl.formatMessage({id: 'Alley'})}</div>
                <div className="map_School" onClick={(e) => this.onClick(e)}>{intl.formatMessage({id: 'School'})}</div>
                <div className="map_Hotel" onClick={(e) => this.onClick(e)}>{intl.formatMessage({id: 'Hotel'})}</div>
                <div className="map_Avenue" onClick={(e) => this.onClick(e)}>{intl.formatMessage({id: 'Avenue'})}</div>
                <div className="map_Temple" onClick={(e) => this.onClick(e)}>{intl.formatMessage({id: 'Temple'})}</div>
                <div className="map_Pond" onClick={(e) => this.onClick(e)}>{intl.formatMessage({id: 'Pond'})}</div>
                <div className="map_Hospital" onClick={(e) => this.onClick(e)}>{intl.formatMessage({id: 'Hospital'})}</div>
                <div className="map_Cemetery" onClick={(e) => this.onClick(e)}>{intl.formatMessage({id: 'Cemetery'})}</div>
                <div className="map_Factory" onClick={(e) => this.onClick(e)}>{intl.formatMessage({id: 'Factory'})}</div>
                <div className="map_Chapel" onClick={(e) => this.onClick(e)}>{intl.formatMessage({id: 'Chapel'})}</div>
                <div className="map_Forest" onClick={(e) => this.onClick(e)}>{intl.formatMessage({id: 'Forest'})}</div>
                <div className="map_Uptown" onClick={(e) => this.onClick(e)}>{intl.formatMessage({id: 'Uptown'})}</div>
                <div className="map_Dock" onClick={(e) => this.onClick(e)}>{intl.formatMessage({id: 'Dock'})}</div>
                <div className="map_Beach" onClick={(e) => this.onClick(e)}>{intl.formatMessage({id: 'Beach'})}</div>
                <div className="map_Research" onClick={(e) => this.onClick(e)}>{intl.formatMessage({id: 'Research'})}</div>
            </div>
        )
    }

    render() {
        const { intl } = this.props;

        return (            
            <div className="map_left">
                <img className="mapimg" src={map} />
                {this.dexView()}
            </div>
        );
    };
}

export default injectIntl(Dex);