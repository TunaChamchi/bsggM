import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { injectIntl  } from 'react-intl';
import { Header, MainBanner, AdS, Footer } from 'components/banner'
import { SrcItem, Monster } from 'components/map/dex'
import map from 'data/inGame/map.json';
import mapImg from 'img/map.png';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectMap: '',
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
                '번화가': 'Avenue',
                '연구소': 'Research'
            },
        };
    }

    onClick = (e, selectMap) => {
        this.setState({selectMap: selectMap});
    }

    render() {
        const { intl } = this.props;
        const { selectMap, mapList } = this.state;

        const metaData = {
            title: 'BSGG.kr - ' + intl.formatMessage({id: 'Title.Map'}),
        }

        return (
            <div>
                <Header data={metaData}/>
                <MainBanner actived={'Route'} />
                <div className="map_main">
                    <div className="map_title">
                        <span className="map_title_span">MAP</span>
                    </div>
                    <div className="tabHeaders">
                        <Link to='/Route'><span className="map_tab0">{intl.formatMessage({id:'루트제작'})}</span></Link>
                        <span className="map_tab0 actived">{intl.formatMessage({id:'지도 도감'})}</span>
                    </div>
                    <div className="map_left">
                        <img className="mapimg" src={mapImg} />             
                        <div className="tabHeaders2">
                            {
                                Object.keys(map).map((key, idx) => {
                                    const mapName = map[key]['name'];
                                    const isSelect = selectMap === key ? ' actived' : '';
                                    return (
                                        <div className={"map_"+mapList[mapName]+isSelect} key={'Mapspan_'+idx} 
                                            onClick={(e) => this.onClick(e, key)}> 
                                            {intl.formatMessage({id: mapName})} 
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="map_right">
                        {
                            selectMap &&
                                <SrcItem 
                                    map={selectMap}/>
                        }
                        {
                            selectMap &&
                                <Monster 
                                    map={selectMap}/>
                        }                        
                    </div>
                </div>
                <Footer />
            </div>
        );
    };
}

export default injectIntl(Map);