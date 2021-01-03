import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { getWeaponType } from 'lib/data';

class Thend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trend: ['winRate', 'pickRate', 'avgKAM', 'avgRank'],
        };
    }

    trendView = (name, idx) => {
        const { intl, stat, tier, parameter } = this.props;

        if (!tier) return;

        const avg = tier[parameter['gameMode']-1]['avg'];
        const max = tier[parameter['gameMode']-1]['max'];
        const min = tier[parameter['gameMode']-1]['min'];

        const data = tier[parameter['gameMode']-1]['tier'][parameter['character']][parameter['bestWeapon']];

        const width = ((data[name]  - min[name])  / (max[name]  - min[name]) ) * 320;
        const _avg  = ((avg[name]   - min[name])  / (max[name]  - min[name]) ) * 320 - 22;

        return (
            <div className="S_Trend_square" key={'square_'+idx}>
                <div className="S_Trend_square1"><span>{intl.formatMessage({id: name})}</span></div>
                <div className="S_Trend_square2"><span>{name.indexOf('Rate')>0?(data[name]*100).toFixed(1)+"%":data[name].toFixed(1)}</span></div>
                <div className="S_Trend_square3"><span>#{data['rank'][name]}</span></div>
                <div className="S_Trend_Graph"></div>
                <div className="S_Trend_Graph2" style={{width: width}}></div>
                <div className="S_Trend_avg" style={{marginLeft: _avg}}>
                    <div className="S_Trend_Tri"></div>
                    <div className="S_Trend_avg1">
                        <span>{intl.formatMessage({id: 'detail.avg'})} {name.indexOf('Rate')>0?(avg[name]*100).toFixed(1)+"%":avg[name].toFixed(1)}</span>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const { intl } = this.props;
        const { trend } = this.state;

        return (
            <div className="S_Trend">
                <div className="S_Trend0">
                    <span className="S_Trend_T">Trend</span>
                </div>
                <div className="S_Trend2">
                    {
                        trend.map((name, idx) =>
                            this.trendView(name, idx)
                        )
                    }
                </div>
                {/* <div className="master">
                    <div className="master0">Master</div>
                    <div className="master_rank">
                        <span className="master_rank1">1</span>
                        <span className="master_rank2">에미디</span>
                        <span className="master_rank3">150게임</span>
                    </div>
                    <button className="master_button">더 보기</button>
                </div> */}
            </div>
        );
    };
}

export default injectIntl(Thend);