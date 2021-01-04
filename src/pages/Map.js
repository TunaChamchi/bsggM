import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { injectIntl  } from 'react-intl';
import { Header, MainBanner, AdS, Footer } from 'components/banner'
import { Item, Monster } from 'components/map/dex'
import map from 'img/map.png';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectMap: '',
        };
    }

    onClick = (e, selectMap) => {
        this.setState({selectMap: selectMap});
    }

    render() {
        const { intl } = this.props;
        const { selectMap } = this.state;

        const metaData = {
            title: 'BSGG.kr - ' + intl.formatMessage({id: 'Title.Map'}),
        }

        return (
            <div>
                <Header data={metaData}/>
                <MainBanner />
                
                <div className="map_main">
                    <div className="map_title">
                        <span className="map_title_span">MAP</span>
                    </div>
                    <div className="tabHeaders">
                        <Link to='/Route'><span className="map_tab0">{intl.formatMessage({id:'루트제작'})}</span></Link>
                        <span className="map_tab0 actived">{intl.formatMessage({id:'지도 도감'})}</span>
                    </div>
                    <div className="map_right">
                        {
                            selectMap &&
                                <Item 
                                    map={selectMap}/>
                        }
                        {
                            selectMap &&
                                <Monster 
                                    map={selectMap}/>
                        }                        
                    </div>
                    <div className="map_left">
                        <img className="mapimg" src={map} />                        
                        <div className="tabHeaders2">
                            {
                                selectMap === '양궁장' ? 
                                    <div className="map_Archery actived"  onClick={(e) => this.onClick(e, '양궁장')}>{intl.formatMessage({id: 'Archery'})}</div>
                                    :
                                    <div className="map_Archery"  onClick={(e) => this.onClick(e, '양궁장')}>{intl.formatMessage({id: 'Archery'})}</div>
                            }
                            {
                                selectMap === '절' ? 
                                    <div className="map_Temple actived"  onClick={(e) => this.onClick(e, '절')}>{intl.formatMessage({id: 'Temple'})}</div>
                                    :
                                    <div className="map_Temple"  onClick={(e) => this.onClick(e, '절')}>{intl.formatMessage({id: 'Temple'})}</div>
                            }
                            {
                                selectMap === '골목길' ? 
                                    <div className="map_Alley actived"  onClick={(e) => this.onClick(e, '골목길')}>{intl.formatMessage({id: 'Alley'})}</div>
                                    :
                                    <div className="map_Alley"  onClick={(e) => this.onClick(e, '골목길')}>{intl.formatMessage({id: 'Alley'})}</div>
                            }
                            {
                                selectMap === '학교' ? 
                                    <div className="map_School actived"  onClick={(e) => this.onClick(e, '학교')}>{intl.formatMessage({id: 'School'})}</div>
                                    :
                                    <div className="map_School"  onClick={(e) => this.onClick(e, '학교')}>{intl.formatMessage({id: 'School'})}</div>
                            }
                            {
                                selectMap === '호텔' ? 
                                    <div className="map_Hotel actived"  onClick={(e) => this.onClick(e, '호텔')}>{intl.formatMessage({id: 'Hotel'})}</div>
                                    :
                                    <div className="map_Hotel"  onClick={(e) => this.onClick(e, '호텔')}>{intl.formatMessage({id: 'Hotel'})}</div>
                            }
                            {
                                selectMap === '번화가' ? 
                                    <div className="map_Avenue actived"  onClick={(e) => this.onClick(e, '번화가')}>{intl.formatMessage({id: 'Avenue'})}</div>
                                    :
                                    <div className="map_Avenue"  onClick={(e) => this.onClick(e, '번화가')}>{intl.formatMessage({id: 'Avenue'})}</div>
                            }
                            {
                                selectMap === '연못' ? 
                                    <div className="map_Pond actived"  onClick={(e) => this.onClick(e, '연못')}>{intl.formatMessage({id: 'Pond'})}</div>
                                    :
                                    <div className="map_Pond"  onClick={(e) => this.onClick(e, '연못')}>{intl.formatMessage({id: 'Pond'})}</div>
                            }
                            {
                                selectMap === '병원' ? 
                                    <div className="map_Hospital actived"  onClick={(e) => this.onClick(e, '병원')}>{intl.formatMessage({id: 'Hospital'})}</div>
                                    :
                                    <div className="map_Hospital"  onClick={(e) => this.onClick(e, '병원')}>{intl.formatMessage({id: 'Hospital'})}</div>
                            }
                            {
                                selectMap === '묘지' ? 
                                    <div className="map_Cemetery actived"  onClick={(e) => this.onClick(e, '묘지')}>{intl.formatMessage({id: 'Cemetery'})}</div>
                                    :
                                    <div className="map_Cemetery"  onClick={(e) => this.onClick(e, '묘지')}>{intl.formatMessage({id: 'Cemetery'})}</div>
                            }
                            {
                                selectMap === '공장' ? 
                                    <div className="map_Factory actived"  onClick={(e) => this.onClick(e, '공장')}>{intl.formatMessage({id: 'Factory'})}</div>
                                    :
                                    <div className="map_Factory"  onClick={(e) => this.onClick(e, '공장')}>{intl.formatMessage({id: 'Factory'})}</div>
                            }
                            {
                                selectMap === '성당' ? 
                                    <div className="map_Chapel actived"  onClick={(e) => this.onClick(e, '성당')}>{intl.formatMessage({id: 'Chapel'})}</div>
                                    :
                                    <div className="map_Chapel"  onClick={(e) => this.onClick(e, '성당')}>{intl.formatMessage({id: 'Chapel'})}</div>
                            }
                            {
                                selectMap === '숲' ? 
                                    <div className="map_Forest actived"  onClick={(e) => this.onClick(e, '숲')}>{intl.formatMessage({id: 'Forest'})}</div>
                                    :
                                    <div className="map_Forest"  onClick={(e) => this.onClick(e, '숲')}>{intl.formatMessage({id: 'Forest'})}</div>
                            }
                            {
                                selectMap === '고급주택가' ? 
                                    <div className="map_Uptown actived"  onClick={(e) => this.onClick(e, '고급주택가')}>{intl.formatMessage({id: 'Uptown'})}</div>
                                    :
                                    <div className="map_Uptown"  onClick={(e) => this.onClick(e, '고급주택가')}>{intl.formatMessage({id: 'Uptown'})}</div>
                            }
                            {
                                selectMap === '항구' ? 
                                    <div className="map_Dock actived"  onClick={(e) => this.onClick(e, '항구')}>{intl.formatMessage({id: 'Dock'})}</div>
                                    :
                                    <div className="map_Dock"  onClick={(e) => this.onClick(e, '항구')}>{intl.formatMessage({id: 'Dock'})}</div>
                            }
                            {
                                selectMap === '모래사장' ? 
                                    <div className="map_Beach actived"  onClick={(e) => this.onClick(e, '모래사장')}>{intl.formatMessage({id: 'Beach'})}</div>
                                    :
                                    <div className="map_Beach"  onClick={(e) => this.onClick(e, '모래사장')}>{intl.formatMessage({id: 'Beach'})}</div>
                            }
                            {
                                selectMap === '연구소' ? 
                                    <div className="map_Research actived"  onClick={(e) => this.onClick(e, '연구소')}>{intl.formatMessage({id: 'Research'})}</div>
                                    :
                                    <div className="map_Research"  onClick={(e) => this.onClick(e, '연구소')}>{intl.formatMessage({id: 'Research'})}</div>
                            }
                        </div>
                    </div>
                </div>
                <AdS type={'Map'}/>
                <Footer />
            </div>
        );
    };
}

export default injectIntl(Map);