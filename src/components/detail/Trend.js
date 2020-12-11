import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';

class Thend extends Component {
    render() {
        const { intl } = this.props

        return (
            
            <div className="S_Trend">
                <div className="S_Trend0">
                    <span className="S_Trend_T">Trend</span>
                    <div className="S_Trend_tab">
                        <div className="tabHeaders">
                            <div className="tabHeader5 actived"><span>RANKER</span></div>
                            <div className="tabHeader5"><span>ALL</span></div>
                        </div>
                    </div>
                </div>
                <div className="S_Trend1">
                    <div className="tabHeaders">
                        <span className="tabHeader6 actived">솔로</span>
                        <span className="tabHeader6">듀오</span>
                        <span className="tabHeader6">스쿼드</span>
                    </div>
                </div>
                <div className="S_Trend2">
                    <div className="S_Trend_square">
                        <div className="S_Trend_square1"><span>승률</span></div>
                        <div className="S_Trend_square2"><span>8.3%</span></div>
                        <div className="S_Trend_square3"><span>#8</span></div>
                        <div className="S_Trend_Graph"></div>
                        <div className="S_Trend_avg">
                            <div className="S_Trend_Tri"></div>
                            <div className="S_Trend_avg1"><span>평균 2.7%</span></div>
                        </div>
                    </div>
                    <div className="S_Trend_square">
                        <div className="S_Trend_square1"><span>픽률</span></div>
                        <div className="S_Trend_square2"><span>17.2%</span></div>
                        <div className="S_Trend_square3"><span>#11</span></div>
                        <div className="S_Trend_Graph"></div>
                        <div className="S_Trend_avg">
                            <div className="S_Trend_Tri"></div>
                            <div className="S_Trend_avg1"><span>평균 12.7%</span></div>
                        </div>
                    </div>
                    <div className="S_Trend_square">
                        <div className="S_Trend_square1"><span>평균 킬</span></div>
                        <div className="S_Trend_square2"><span>2.3</span></div>
                        <div className="S_Trend_square3"><span>#4</span></div>
                        <div className="S_Trend_Graph"></div>
                        <div className="S_Trend_avg">
                            <div className="S_Trend_Tri"></div>
                            <div className="S_Trend_avg1"><span>평균 2.7</span></div>
                        </div>
                    </div>
                    <div className="S_Trend_square">
                        <div className="S_Trend_square1"><span>평균 순위</span></div>
                        <div className="S_Trend_square2"><span>6.4</span></div>
                        <div className="S_Trend_square3"><span>#15</span></div>
                        <div className="S_Trend_Graph"></div>
                        <div className="S_Trend_avg">
                            <div className="S_Trend_Tri"></div>
                            <div className="S_Trend_avg1"><span>평균 7.2</span></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default injectIntl(Thend);