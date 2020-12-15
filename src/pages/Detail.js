import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import queryString from 'query-string';
import ScriptTag from 'react-script-tag';
import { Header, MainBanner, Footer } from 'components/banner';
import { Top, Trend, Skill } from 'components/detail';
import { Item } from 'components/item';
import { charList } from 'lib/utility'
import { CharacterScore, skillTreeList } from 'lib/data';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            character: '',
            weapon: '',
            weaponList: [],
            rangeFocus: '',
            typeFocus: '',
            ad_style: {},
            search: '',
            searchList: [],
            skillTree: [],
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
            search:'',
            searchList: [],
            skillTree: skillTreeList(character),
        });
    };

    
    searchHandler = (event) => {
        const value = event.target.value.toLowerCase();

        if (!value) {
            this.setState({search:'', searchList: []});
            return;
        }

        const list = charList().filter(data => data['name'].toLowerCase().indexOf(value) !== -1);

        this.setState({search:value, searchList: list});
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
        const { data, character, weapon, rangeFocus, typeFocus, search, searchList, weaponList, weaponTotal, skillTree } = this.state;

        const metaData = {
            title: 'BSGG.kr - ' + intl.formatMessage({id: 'characters.'+data['character']}) + ' ' + intl.formatMessage({id: 'weapons.'+data['weapon']}),
            description: '영원회귀 : 블랙 서바이벌 통계, 캐릭터 티어, 아이템 트렌드, BS:ER Stats, Character Tier, Item Trend'
        }

        return (
            <div>
                <Header data={metaData}/>
                <MainBanner />
                <div className="S_main">
                    <div className="S_search">
                        <input className="S_search1" value={search} onChange={this.searchHandler} placeholder={intl.formatMessage({id:'main.banner.placeholder'})} /> 
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
                    <Top 
                        data={data}
                        weaponData={{weaponList, weaponTotal}}
                        parameter={{character, weapon, rangeFocus, typeFocus}}
                        />
                    <div className="S_left">                     
                        <Trend 
                            data={data}
                            parameter={{character, weapon, rangeFocus, typeFocus}}
                            />                            
                        <Skill
                            data={data}
                            skillTree={skillTree}
                            parameter={{character, weapon, rangeFocus, typeFocus}}
                            />
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