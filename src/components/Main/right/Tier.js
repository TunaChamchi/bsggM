import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { CharacterScore, CharacterPreRank } from 'lib/data'

class Tier extends Component {
	constructor(props) {
        super(props);
        this.state = {
            tierList: [],
            preRankList: {},
            type: ['total', 'win-rate', 'pick-rate', 'avg-kill', 'avg-rank'],
            typeFocus: 0,
        };
    }
    
    componentDidMount() {
        this.init();
    };

    shouldComponentUpdate(nextProps, nextState) {
        const { range, type } = this.props;

        return this.state !== nextState || range !== nextProps.range || type !== nextProps.type;
    };

    componentDidUpdate(prevProps, prevState){
        const { range, type } = this.props;
        if (range !== prevProps.range || type !== prevProps.type) {
            this.init();
        }
    };

    init = () => {
        const { range, type } = this.props;
        
        this.setState({tierList: CharacterScore(range, type), preRankList: CharacterPreRank(range, type)});
    };

    listSort = () => {
        const { tierList, type, typeFocus } = this.state;

        tierList.sort((a, b) => {
            const _a = a['score'][type[typeFocus]];
            const _b = b['score'][type[typeFocus]];
            return _b - _a;
        });
    };

    listView = () => {
        const { range, type } = this.props;
        const { tierList, preRankList, typeFocus } = this.state;

        this.listSort();

        return tierList.map((data, idx) => {
            const rankDiff = preRankList[data['character']+'-'+ data['weapon']][this.state.type[typeFocus]] - (idx+1);
            return (
                <div className="rank-1" key={'tier' + idx}>                
                    <span className="rank3rank1">{idx+1}</span>&nbsp;
                    <img className="rank3Updown"   src={rankDiff>0?'img/UpDown/상승.png':rankDiff<0?'img/UpDown/하락.png':'img/UpDown/유지.png'} />&nbsp;
                    <span className="rank3Updown1">{Math.abs(rankDiff)}</span>&nbsp;
                    <Link to={'Detail?range='+range+'&type='+type+'&character='+data['character']+'&weapon='+ data['weapon']}>
                        <img className="rank3cha1" src={'img/Rank/'+data['character']+(data['tier']>0?'':'_오피')+'.png'} />
                    </Link>&nbsp;
                    <img className="rank3weapon1"  src={'img/Weapons/'+data['weapon']+'.png'} />&nbsp;
                    <img className="rank3tier1"    src={data['tier']===0?'img/Tier/1티어.png':'img/Tier/'+data['tier']+'티어.png'} />&nbsp;
                    <span className="rank3win1"> {data['data']['win-rate'].toFixed(1)}% </span>&nbsp;
                    <span className="rank3pick1">{data['data']['pick-rate'].toFixed(1)}%</span>&nbsp;
                    <span className="rank3kill1">{data['data']['avg-kill'].toFixed(1)}  </span>&nbsp;
                    <span className="rank3avg1"> {data['data']['avg-rank'].toFixed(1)}  </span>&nbsp;
                </div>
            );
        });
    };
    
    typeHandler = (idx) => {
        this.setState({typeFocus: idx});
    };
    typeView = () => {
        const { intl } = this.props;
        const { type, typeFocus } = this.state;

        return type.map((name, idx) => 
            <div className={'tabHeader2 ' + (idx === typeFocus ? 'actived' : '')}
                key={'type'+idx}
                onClick={(e) => this.typeHandler(idx)}>
                {intl.formatMessage({id: name})}
            </div>
        );
    };

    render() {
        const { intl } = this.props;

        return (
            <div>
                <div className="rank2">
                    <div className="tabHeaders">
                        {this.typeView()}
                    </div>
                </div>
                <div className="rank3">
                    <span className="rank3rank">{intl.formatMessage({id: 'rank'})}</span>&nbsp;
                    <span className="rank3cha">{intl.formatMessage({id: 'character'})}</span>&nbsp;
                    <span className="rank3weapon">{intl.formatMessage({id: 'weapon'})}</span>&nbsp;
                    <span className="rank3tier">{intl.formatMessage({id: 'tier'})}</span>&nbsp;
                    <span className="rank3win">{intl.formatMessage({id: 'win-rate'})}</span>&nbsp;
                    <span className="rank3pick">{intl.formatMessage({id: 'pick-rate'})}</span>&nbsp;
                    <span className="rank3kill">{intl.formatMessage({id: 'avg-kill'})}</span>&nbsp;
                    <span className="rank3avg">{intl.formatMessage({id: 'avg-rank'})}</span>&nbsp;
                </div>
                {this.listView()}
            </div>
        );
    };
}

export default injectIntl(Tier);