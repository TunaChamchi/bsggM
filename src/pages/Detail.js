import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import queryString from 'query-string';
import ScriptTag from 'react-script-tag';
import { MainBanner, Footer } from 'components/banner';
import { Item } from 'components/item';
import { CharacterScore, Max, Min, Avg, dmgPlus } from 'lib/data';
import { charList } from 'lib/utility'

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            character: '',
            weapon: '',
            weaponList: [],
            range: ['RANKER', 'ALL'],
            rangeFocus: '',
            type: ['solo', 'duo', 'squad'],
            typeFocus: '',
            ad_style: {},
            searchList: []
        };
    }
    componentWillMount() {
        window.scrollTo(0, 0);

        this.init();
    };
    componentDidUpdate(prevProps, prevState){
        const { location } = this.props;
        const prevquery = queryString.parse(prevProps.location.search);
        const query = queryString.parse(location.search);

        if (query.character !== prevquery.character || query.weapon !== prevquery.weapon
            || query.range !== prevquery.range || query.type !== prevquery.type) {
            if (query.character !== prevquery.character) {
                window.scrollTo(0, 0);
            }
            this.init();
        }
    };

    init() {
        const { location } = this.props;
        const query = queryString.parse(location.search);

        this.state.weaponList = [];

        const rangeFocus = query.range || 'RANKER';
        const typeFocus = query.type || 'solo';

        const list = CharacterScore(rangeFocus, typeFocus);

        const character = query.character;

        let weaponTotal = 0;
        list.forEach(data => {
            if (data['character'] === character) {
                weaponTotal += data['data']['pick-rate'];
                this.state.weaponList.push({
                    name: data['weapon'],
                    pick: data['data']['pick-rate']
                });
            }
        });

        this.state.weaponList.sort((a, b) => b['pick'] - a['pick']);
        let weapon = query.weapon || this.state.weaponList[0]['name'];

        list.forEach(data => {
            if (data['character'] === character) {
                if (data['weapon'] === weapon) {
                    this.setState({ data: data });
                }
            }
        });

        this.setState({ 
            weaponTotal: weaponTotal,
            rangeFocus: rangeFocus,
            typeFocus: typeFocus,
            character: character,
            weapon: weapon,
        });
    };

    weaponListView = () => {
        const { data, weaponList, weaponTotal, character, typeFocus, rangeFocus } = this.state;

        weaponList.sort((a, b) => b['pick'] - a['pick']);

        return weaponList.map((weapon, idx) => {
            const pick = (weapon['pick'] / weaponTotal * 100).toFixed(0);

            return (
                <Link to={'Detail?range='+rangeFocus+'&type='+typeFocus+'&character='+character+'&weapon='+weapon['name']} key={'weaponList' + idx}>
                    <div className={'tabHeader4 ' + (weapon['name'] === data['weapon'] ? 'actived' : '')}>
                        <img className="S_top-weapon1" src={'img/Weapons/' + weapon['name'] + '.png'} />
                        <span className="S_top-weapon2">{pick}%</span>
                    </div>
                </Link>
            )
        });
    }
    rangeView = () => {
        const { character, weapon, typeFocus, range, rangeFocus } = this.state;

        return range.map((name, idx) =>
            <Link to={'Detail?range='+name+'&type='+typeFocus+'&character='+character+'&weapon='+weapon} key={'range' + idx}>
                <div className={'tabHeader5 ' + (name === rangeFocus ? 'actived' : '')}>
                    {name}
                </div>
            </Link>
        );
    };
    typeView = () => {
        const { intl } = this.props;
        const { character, weapon, rangeFocus, type, typeFocus } = this.state;
        return type.map((name, idx) =>
            <Link to={'Detail?range='+rangeFocus+'&type='+name+'&character='+character+'&weapon='+weapon} key={'type' + idx}>
                <div className={'tabHeader6 ' + (name === typeFocus ? 'actived' : '')}>
                    {intl.formatMessage({ id: name })}
                </div>
            </Link>
        );
    };
    
    searchHandler = (event) => {
        const value = event.target.value.toLowerCase();

        if (!value) {
            this.setState({searchList: []});
            return;
        }

        const list = charList().filter(data => data['name'].toLowerCase().indexOf(value) !== -1);

        this.setState({searchList: list});
    }
    searchView = () => {
        const { searchList } = this.state;

        return searchList.map((data, idx) => 
            <Link to={'Detail?character='+data['key']} key={idx}>
                <div className="S_search4" >
                    <img className="searchimg" src={'img/Rank/'+data['key']+'.png'} />
                    <div className="searchfont"> {data['name']} </div>
                </div>
            </Link>
        );
    }

    render() {
        const { intl } = this.props;
        const { data, character, weapon, rangeFocus, typeFocus, ad_style, searchList } = this.state;

        const img_char = 'img/Characters/' + data['character'] + (data['tier'] > 0 ? '' : '_오피') + '.png';
        const img_tier = data['tier'] > 0 ? 'img/Tier/' + data['tier'] + '티어.png' : 'img/Tier/1티어.png';
        const avg = Avg(rangeFocus, typeFocus);
        const max = Max(rangeFocus, typeFocus);
        const min = Min(rangeFocus, typeFocus);

        const win_rate_width  = ((data['data']['win-rate']  - min['win-rate'])  / (max['win-rate']  - min['win-rate']) ) * 500;
        const pick_rate_width = ((data['data']['pick-rate'] - min['pick-rate']) / (max['pick-rate'] - min['pick-rate'])) * 500;
        const avg_kill_width  = ((data['data']['avg-kill']  - min['avg-kill'])  / (max['avg-kill']  - min['avg-kill']) ) * 500;
        const avg_rank_width  = ((data['data']['avg-rank']  - min['avg-rank'])  / (max['avg-rank']  - min['avg-rank']) ) * 500;

        const win_rate_avg  = ((avg['win-rate']  - min['win-rate'])  / (max['win-rate']  - min['win-rate']) ) * 500 - 27;
        const pick_rate_avg = ((avg['pick-rate'] - min['pick-rate']) / (max['pick-rate'] - min['pick-rate'])) * 500 - 27;
        const avg_kill_avg  = ((avg['avg-kill']  - min['avg-kill'])  / (max['avg-kill']  - min['avg-kill']) ) * 500 - 27;
        const avg_rank_avg  = ((avg['avg-rank']  - min['avg-rank'])  / (max['avg-rank']  - min['avg-rank']) ) * 500 - 27;

        return (
            <div>
                <MainBanner />
                <div className="S_main">
                    <div className="S_search">
                        <input className="S_search1" onChange={this.searchHandler} placeholder={intl.formatMessage({id:'main.banner.placeholder'})} /> 
                    </div>
                    {
                        searchList.length !== 0 &&
                            <div multiple className="S_search3">
                                {this.searchView()}
                            </div>
                    }
                    <div className="Ad_box_Detail2">
                        <ins 
                            class="kakao_ad_area" 
                            style={{display: 'none'}}
                            data-ad-unit="DAN-eOZOZvEyRvmmrIAV" 
                            data-ad-width="728" 
                        data-ad-height="90"></ins>
                    </div>
                    <div className="S_top">
                        <div className="S_top-cha">
                            <img className="S_top-cha1" src={img_char} />
                            <img className="S_top-cha2" src={img_tier} />
                            <span className="S_top-cha3">{intl.formatMessage({id: 'characters.'+data['character']})}</span>
                        </div>
                        <div className="S_top-stat">
                            <span className="S_top-stat1">{intl.formatMessage({ id: 'detail.duoStat' })}</span>
                            <span className="S_top-stat2">{intl.formatMessage({ id: 'detail.giveDmg' })}</span>
                            <span className="S_top-stat3">{dmgPlus(character, 'duo', 'inflict')}%</span>
                            <span className="S_top-stat2">{intl.formatMessage({ id: 'detail.takeDmg' })}</span>
                            <span className="S_top-stat3">{dmgPlus(character, 'duo', 'receive')}%</span>
                        </div>
                        <div className="S_top-stat">
                            <span className="S_top-stat1">{intl.formatMessage({ id: 'detail.squadStat' })}</span>
                            <span className="S_top-stat2">{intl.formatMessage({ id: 'detail.giveDmg' })}</span>
                            <span className="S_top-stat3">{dmgPlus(character, 'squad', 'inflict')}%</span>
                            <span className="S_top-stat2">{intl.formatMessage({ id: 'detail.takeDmg' })}</span>
                            <span className="S_top-stat3">{dmgPlus(character, 'squad', 'receive')}%</span>
                        </div>
                        <div className="tabHeaders">
                            {this.weaponListView()}
                        </div>
                    </div>
                    <div className="S_left">
                        <div className="S_Trend">
                            <div className="S_Trend0">
                                <div className="S_Trend_tab">
                                    <div className="tabHeaders">
                                        {this.rangeView()}
                                    </div>
                                </div>
                                <span className="S_Trend_T">Trend</span>
                            </div>
                            <div className="S_Trend1">
                                <div className="tabHeaders">
                                    {this.typeView()}
                                </div>
                            </div>
                            <div className="S_Trend2">
                                <div className="S_Trend_square">
                                    <div className="S_Trend_square1"><span>{intl.formatMessage({id: 'win-rate'})}</span></div>
                                    <div className="S_Trend_square3"><span>#{data['rank']['win-rate']}</span></div>
                                    <div className="S_Trend_square2"><span>{data['data']['win-rate'].toFixed(1)}%</span></div>
                                    <div className="S_Trend_Graph"></div>
                                    <div className="S_Trend_Graph2" style={{width: win_rate_width}}></div>
                                        <div className="S_Trend_avg" style={{marginLeft: win_rate_avg}}>
                                            <div className="S_Trend_Tri"></div>
                                            <div className="S_Trend_avg1"><span>{intl.formatMessage({id: 'detail.avg'})} {avg['win-rate']}%</span></div>
                                        </div>
                                        
                                </div>
                                <div className="S_Trend_square">
                                    <div className="S_Trend_square1"><span>{intl.formatMessage({id: 'pick-rate'})}</span></div>
                                    <div className="S_Trend_square3"><span>#{data['rank']['pick-rate']}</span></div>
                                    <div className="S_Trend_square2"><span>{data['data']['pick-rate'].toFixed(1)}%</span></div>
                                    <div className="S_Trend_Graph"></div>
                                    <div className="S_Trend_Graph2" style={{width: pick_rate_width}}></div>
                                        <div className="S_Trend_avg" style={{marginLeft: pick_rate_avg}}>
                                            <div className="S_Trend_Tri"></div>
                                            <div className="S_Trend_avg1"><span>{intl.formatMessage({id: 'detail.avg'})} {avg['pick-rate']}%</span></div>
                                        </div>
                                </div>
                                <div className="S_Trend_square">
                                    <div className="S_Trend_square1"><span>{intl.formatMessage({id: 'avg-kill'})}</span></div>
                                    <div className="S_Trend_square3"><span>#{data['rank']['avg-kill']}</span></div>
                                    <div className="S_Trend_square2"><span>{data['data']['avg-kill'].toFixed(1)}</span></div>
                                    <div className="S_Trend_Graph"></div>
                                    <div className="S_Trend_Graph2" style={{width: avg_kill_width}}></div>
                                    <div className="S_Trend_avg" style={{marginLeft: avg_kill_avg}}>
                                        <div className="S_Trend_Tri"></div>
                                        <div className="S_Trend_avg1"><span>{intl.formatMessage({id: 'detail.avg'})} {avg['avg-kill']}</span></div>
                                    </div>
                                </div>
                                <div className="S_Trend_square">
                                    <div className="S_Trend_square1"><span>{intl.formatMessage({id: 'avg-rank'})}</span></div>
                                    <div className="S_Trend_square3"><span>#{data['rank']['avg-rank']}</span></div>
                                    <div className="S_Trend_square2"><span>{data['data']['avg-rank'].toFixed(1)}</span></div>
                                    <div className="S_Trend_Graph"></div>
                                    <div className="S_Trend_Graph2" style={{width: avg_rank_width}}></div>
                                    <div className="S_Trend_avg" style={{marginLeft: avg_rank_avg}}>
                                        <div className="S_Trend_Tri"></div>
                                        <div className="S_Trend_avg1"><span>{intl.formatMessage({id: 'detail.avg'})} {avg['avg-rank']}</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <Item 
                        character={character}
                        weapon={weapon}
                        range={rangeFocus, typeFocus}
                        type={typeFocus}
                    />
                </div>
                <div className="Ad_box_Detail2">
                    <ins 
                        class="kakao_ad_area" 
                        style={{display: 'none'}}
                        data-ad-unit="DAN-2F5abPe9K508dSMu" 
                        data-ad-width="728" 
                    data-ad-height="90"></ins>
                </div>
                <Footer />
                <ScriptTag src="//t1.daumcdn.net/kas/static/ba.min.js" async />
            </div>
            
        );
    };
}

export default injectIntl(Detail);