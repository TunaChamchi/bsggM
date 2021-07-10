import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { injectIntl  } from 'react-intl';
import queryString from 'query-string';
import { Header, MainBanner, Footer } from 'components/banner'
import { getCharacter, getCharacterKeys, getSeasonString } from 'lib/data'

class Rank_Character extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLode: false,
            character: -1,
            rank: [],
            rankTop: [],
            tierList: ['Iron 4', 'Iron 3', 'Iron 2', 'Iron 1', 'Bronze 4', 'Bronze 3','Bronze 2', 'Bronze 1',
                    'Silver 4', 'Silver 3', 'Silver 2', 'Silver 1', 'Gold 4', 'Gold 3','Gold 2', 'Gold 1',
                    'Platinum 4', 'Platinum 3', 'Platinum 2', 'Platinum 1', 'Diamond 4', 'Diamond 3','Diamond 2', 'Diamond 1',
                    'Demigod 4', 'Demigod 3', 'Demigod 2', 'Demigod 1', 'Eternity 4', 'Eternity 3','Eternity 2', 'Eternity 1']
        };
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        
        this.setState({ isLode: true });
    }

    componentDidUpdate(prevProps, prevState){
        const { location } = this.props;
        const query = queryString.parse(location.search);

        this.fetchHandler(query, prevState)
    }

    fetchHandler = async (query, prevState) => {
        const character = parseInt(query.character) || 1;
        console.log('character', character, prevState.character);

        if (character !== this.state.character) {
            console.log('character', character, prevState.character);
            let rank;
            
            await fetch('/api/Rank/character?characterCode='+character)
                .then(res => res.json())
                .then(_rank => rank = _rank);
            
            this.setState({ character:character, rank:rank });
        }
    }

    rankData = (rank) => {
        const { character, tierList } = this.state;
        const stat = rank['characterStats'][character];
        const isRank = rank['seasonStats'][getSeasonString()] ? true : false;
        const userStat = rank['seasonStats'][getSeasonString()] || rank['seasonStats'][0];

        if (!stat) return null;

        const total = stat['totalGames'];
        const top1  = stat['top1'];
        const top3  = stat['top3'] - stat['top1'];
        const loss  = total - stat['top3'];
        const rate  = Math.round(stat['top1']/total*100);

        const kam   = (stat['totalKills'] + stat['totalAssistants']) / total;

        const top1Width = top1/total *100;
        const top3Width = top3/total *100 + top1Width;
        const lossWidth = loss/total *100;

        let maxMmr = 0;
        if (isRank) {
            Object.keys(userStat).forEach(t => 
                maxMmr = Math.max(maxMmr, userStat[t]['mmr'])
            )
        }
        let tier  = Math.floor(maxMmr/100) || 1;
        let lp    = maxMmr-tier*100 || 0;

        if (tier > tierList.length - 1) {
            lp += (tier - tierList.length + 1)*100;
            tier = tierList.length - 1;
        }

        const _stat = {
            top1: top1,
            top3: top3,
            loss: loss,
            rate: rate,
            total: total,
            kam: kam,
            tier: tier,
            lp: lp,
            top1Width: top1Width,
            top3Width: top3Width,
            lossWidth: lossWidth,
        }

        return _stat;
    }

    rankTopView = () => {
        const { intl } = this.props;
        const { rank, tierList, character } = this.state;
        if (rank.length === 0) return;

        return [1, 0, 2].map((number, idx) => {
            const stat = this.rankData(rank[number]);

            if (!stat) return;

            const isRank = stat['lp'] !== -100;
            const tier = tierList[stat['tier']].slice(0, -2);
            const tierSub = 4-stat['tier']%4;

            return (
                <div className={"rank_top_"+number} key={"rank_top_"+idx}>
                    <img className="rank_top_iconimg" src={"img/Characters/"+getCharacter(character)['name']+".jpg"} />
                    <img className="rank_top_iconborder" src={isRank&&('img/border/'+tier+'.png')} />
                    <span className="rank_top_lv">{isRank&&stat['tier']%4+1}</span>
                    <Link to={'/Match?userName=' + rank[number]['nickname']}>
                        <div className="rank_top_span_box">
                            <div className="rank_top2_span1">{number+1}</div>
                            <div className="rank_top_span2">{rank[number]['nickname']}</div>
                            <div className="rank_top_span3">{isRank&&intl.formatMessage({id: 'ranks.'+tier})} {isRank&&tierSub} {isRank&&stat['lp']} {isRank&&'LP'}</div>
                            <div className="rank_top_graph" style={{background: 'linear-gradient(to right, rgb(244,216,35) 0% '+stat['top1Width']+'%, rgb(49, 106, 190) '+stat['top1Width']+'% '+stat['top3Width']+'%, gray '+stat['top3Width']+'% 100%)'}}>
                                <div className="rank_top_span4" >{stat['top1']}</div>
                                <div className="rank_top_span5" >{stat['top3']}</div>
                                <div className="rank_top_span6" >{stat['loss']}</div>
                                <div className="rank_top_span7" >{stat['rate']}%</div>
                            </div>
                            <div className="rank_top_span8">KA/M {stat['kam'].toFixed(2)}</div>
                        </div>
                    </Link>
                </div>
            );
        });
    }
    rankTableView = () => {
        const { intl } = this.props;
        const { rank, tierList, character } = this.state;
        if (rank.length === 0) return;
        
        return rank.slice(3, 50).map((user, idx) => {
            const stat = this.rankData(user);

            if (!stat) return;
            
            const isRank = stat['lp'] !== -100;
            const tier = tierList[stat['tier']].slice(0, -2);
            const tierSub = 4-stat['tier']%4;

            return (
                <div className="record_cha_box" key={'record_cha_'+idx}>
                    <div className="record_cha_span1">{idx+4}</div>
                    <img className="record_cha_img" src={"img/Rank/"+getCharacter(character)['name']+".jpg"} />
                    <Link to={'/Match?userName=' + user['nickname']}>
                        <div className="record_cha_span2">{user['nickname']}</div>
                    </Link>
                    <img className="record_cha_rankimg" src={isRank&&('img/Rankicon/'+tier+'.png')} />
                    <div className="record_rank_span11">{isRank&&intl.formatMessage({id: 'ranks.'+tier})} {isRank&&tierSub}</div>
                    <div className="record_rank_span22">{stat['total']}</div>
                    <div className="record_rank_span33">{stat['rate']}%</div>
                </div>
            );
        });
    }

    characterTabView = () => {
        const { intl } = this.props;
        return getCharacterKeys().map((code, idx) => 
            <Link to={'/RankCharacter?character='+code} key={'select_box_'+idx}>
                <div className="rank_cha_select_box">
                    <img className="record_select_img actived" src={"img/Rank/"+getCharacter(code)['name']+".jpg"} />
                </div>
            </Link>
        )
    }

    render() {
        const { intl } = this.props;
        const { rank } = this.state;

        const metaData = {
            title: 'BSGG.kr - ' + intl.formatMessage({id: 'Title.Rank2'}),
        }
        
        return (
            <div>
                <Header data={metaData}/>
                <MainBanner actived={'Rank'} />
                <div className="rank_top">
                    {this.rankTopView()}
                </div>
                <div className="record_main">
                    <div className="master_notice">{intl.formatMessage({id: '장인안내'})}</div>
                    <div className="record_cha">
                        <div className="record_cha0">
                            <span className="record_cha0_span">RANK</span>
                            <div className="record_cha0_tabs">
                                <Link to={'/Rank'}>
                                    <div className="record_cha0_tab">{intl.formatMessage({id: '전체'})}</div>
                                </Link>
                                <div className="record_cha0_tab actived">{intl.formatMessage({id: '장인'})}</div>
                            </div>
                        </div>
                        <div className="rank_cha_select">
                            {this.characterTabView()}
                        </div>
                        <div className="record_cha_filter">
                            <div className="record_rank_filter1">#</div>
                            <div className="record_rank_filter2">{intl.formatMessage({id: '플레이어'})}</div>
                            <div className="record_rank_filter3">{intl.formatMessage({id: '티어'})}</div>
                            <div className="record_rank_filter4">{intl.formatMessage({id: '게임수'})}</div>
                            <div className="record_rank_filter5">{intl.formatMessage({id: 'winRate'})}</div>
                        </div>
                        {
                            rank.length === 0 ?
                                <div className="record_cha_nodata">{intl.formatMessage({id: 'nodata'})}</div>
                                :
                                this.rankTableView()
                        }
                    </div>
                </div>
                <Footer />
            </div>
        );
    };
}

export default injectIntl(Rank_Character);