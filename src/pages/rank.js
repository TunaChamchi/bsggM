import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { injectIntl  } from 'react-intl';
import queryString from 'query-string';
import { Header, MainBanner, Footer } from 'components/banner'
import { getCharacter } from 'lib/data'

class Rank extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isStartLoad: false,
            page: -1,
            gameMode: -1,
            search: '',
            gameModeList:['솔로', '듀오', '스쿼드'],
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

        this.setState({ isStartLoad: true })
    }

    componentDidUpdate(prevProps, prevState){
        const { location } = this.props;
        const query = queryString.parse(location.search);

        this.fetchHandler(query, prevState)
    }

    fetchHandler = async (query, prevState) => {
        let page = parseInt(query.page) || 1;
        let mode = parseInt(query.mode) || 0;
        const search = query.search || '';
        
        if (page < 0 || page > 10) {
            page = 1;
        }
        if (mode < 0 || mode > 2) {
            mode = 0;
        }

        const index = ((page-1)*100) + 3;
        if (mode !== this.state.gameMode) {
            console.log('gameMode', mode, prevState.gameMode);
            let rank;
            
            await fetch('/api/Rank?mode='+(mode+1)+'&skip=0&limit=103')
                .then(res => res.json())
                .then(_rank => rank = _rank);
                
            this.setState({ gameMode:mode, page:page, rankTop:rank.slice(0, 3), rank:rank.slice(3, 103) });
        } else if (page !== this.state.page) {
            window.scrollTo(0, 0);
            console.log('page', page, prevState.page);
            let rank;

            await fetch('/api/Rank?mode='+(mode+1)+'&skip='+index+'&limit=100')
                .then(res => res.json())
                .then(_rank => rank = _rank);

            this.setState({ page:page, rank:rank });
        } else if (search !== prevState.search) {
            console.log('search');

            fetch('/api/Rank?mode='+(mode+1)+'&search='+search)
                .then(res => res.json())
                .then(rank => this.setState({ rank }));

            this.setState({ search:search });
        }
    }

    rankData = (rank) => {
        const { gameMode, tierList } = this.state;
        const stat = rank['stat'].filter(s => s['index'].includes('1_'+(gameMode+1)))[0];

        if (!stat) return null;

        const total = stat['totalGames'];
        const top1 = Math.round(stat['top1']*total);
        const top3 = Math.round(stat['top3']*total) - top1;
        const loss = total - top1 - top3;
        const rate = Math.round(stat['top1']*100);

        const kam  = stat['averageKills']+stat['averageAssistants'];
        let tier = Math.floor(rank['mmr']/100);
        let lp   = rank['mmr']-tier*100;

        if (tier > tierList.length) {
            lp += (tier - tierList.length + 1)*100;
            tier = tierList.length - 1;
        }

        const top1Width = top1/total *100;
        const top3Width = top3/total *100 + top1Width;
        const lossWidth = loss/total *100;

        const charName = getCharacter(stat['mostCharacter'])['name'];

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
            character: charName
        }

        return _stat;
    }

    rankTopView = () => {
        const { intl } = this.props;
        const { rankTop, tierList } = this.state;
        if (rankTop.length === 0) return;

        console.log('rankTop', rankTop);
        return [1, 0, 2].map((number, idx) => {
            const stat = this.rankData(rankTop[number]);

            if (!stat) return;

            //console.log(stat['top1Width'], stat['top3Width']);
            const tier = tierList[stat['tier']].slice(0, -2);
            const tierSub = 4-stat['tier']%4;

            return (
                <div className={"rank_top_"+number} key={"rank_top_"+idx}>
                    <img className="rank_top_iconimg" src={"img/Characters/"+stat['character']+".jpg"} />
                    <img className="rank_top_iconborder" src={'img/border/'+tier+'.png'} />
                    <span className="rank_top_lv">{4-stat['tier']%4}</span>
                    <Link to={'/Match?userName=' + rankTop[number]['nickname']}>
                        <div className="rank_top_span_box">
                            <div className="rank_top2_span1">{rankTop[number]['rank']}</div>
                            <div className="rank_top_span2">{rankTop[number]['nickname']}</div>
                            <div className="rank_top_span3">{intl.formatMessage({id: 'ranks.'+tier})} {tierSub} {stat['lp']} LP</div>
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
        const { rank, tierList } = this.state;
        if (rank.length === 0) return;
        
        return rank.map((user, idx) => {
            const stat = this.rankData(user);

            if (!stat) return;
            
            const tier = tierList[stat['tier']].slice(0, -2);
            const tierSub = 4-stat['tier']%4;

            return (
                <div className="record_cha_box" key={'record_cha_'+idx}>
                    <div className="record_cha_span1">{user['rank']}</div>
                    <img className="record_cha_img" src={"img/Rank/"+stat['character']+".jpg"} />
                    <Link to={'/Match?userName=' + user['nickname']}>
                        <div className="record_cha_span2">{user['nickname']}</div>
                    </Link>
                    <img className="record_cha_rankimg" src={'img/Rankicon/'+tier+'.png'} />
                    <div className="record_rank_span11">{intl.formatMessage({id: 'ranks.'+tier})} {tierSub}</div>
                    <div className="record_rank_span22">{stat['lp']} LP</div>
                    <div className="record_rank_span33">{stat['rate']}%</div>
                </div>
            );
        });
    }

    gameModeHandler = (e, index) => {
        this.setState({gameMode: index, index:3, rankTop:[], rank:[]});
    }
    gameModeTabView = () => {
        const { intl } = this.props;
        const { page, gameMode, gameModeList } = this.state;
        return gameModeList.map((mode, idx) => 
            <Link to={'/Rank?mode='+idx+'&page='+page} key={'cha_tab_'+idx}>
                <div className={'rank_cha_tab1'+(idx===gameMode?' actived':'')}>
                    {intl.formatMessage({id: mode})}
                </div>
            </Link>
        )
    }

    render() {
        const { intl } = this.props;
        const { gameMode, page } = this.state;

        const metaData = {
            title: 'BSGG.kr - ' + intl.formatMessage({id: 'Title.Rank'}),
        }
        
        return (
            <div>
                <Header data={metaData}/>
                <MainBanner actived={'Rank'} />
                
                <div className="rank_top">
                    {this.rankTopView()}
                </div>
                <div className="record_main">
                    <div className="record_cha">
                        <div className="record_cha0">
                            <span className="record_cha0_span">RANK</span>
                            <div className="record_cha0_tabs">
                                <div className="record_cha0_tab actived">{intl.formatMessage({id: '전체'})}</div>
                                <Link to={'/RankCharacter'}>
                                    <div className="record_cha0_tab">{intl.formatMessage({id: '장인'})}</div>
                                </Link>
                            </div>
                        </div>
                        <div className="rank_cha_tabs">
                            {this.gameModeTabView()}
                        </div>
                        <div className="record_cha_filter">
                            <div className="record_rank_filter1">#</div>
                            <div className="record_rank_filter2">{intl.formatMessage({id: '플레이어'})}</div>
                            <div className="record_rank_filter3">{intl.formatMessage({id: '티어'})}</div>
                            <div className="record_rank_filter4">{intl.formatMessage({id: '점수'})}</div>
                            <div className="record_rank_filter5">{intl.formatMessage({id: 'winRate'})}</div>
                        </div>
                        {this.rankTableView()}
                    </div>
                    
                   
                    <div>
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(idx => 
                                <Link to={'/Rank?mode='+gameMode+'&page='+idx} key={'page_'+idx}>
                                    <button className="rank_center_button" ><div className="rank_button_tri">{idx}</div></button>
                                </Link>
                            )
                        }
                    </div>
                    
                </div>
                <Footer />
            </div>
        );
    };
}

export default injectIntl(Rank);