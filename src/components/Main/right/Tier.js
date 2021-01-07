import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { getCharacter, getWeaponType } from 'lib/data'

class Tier extends Component {
	constructor(props) {
        super(props);
        this.state = {
            isStartLoad: false,
            tierList: [],
            preRankList: {},
            type: ['total', 'winRate', 'pickRate'],
            typeFocus: 0,
        };
    }
    
    componentDidMount() {
        const { tier, preTier } = this.props;

    };

    componentDidUpdate(prevProps, prevState){
        const { isStartLoad, tier, preTier } = this.props;
        if (isStartLoad !== prevProps.isStartLoad) {
            //console.log('Tier Test');

            const tierList = {};
            tier.forEach((t, idx) => {
                tierList[idx] = [];
                for (const charKey in t['tier']) {
                    for (const weaKey in t['tier'][charKey]) {
                        const char = t['tier'][charKey][weaKey];
                        char['characterNum'] = charKey;
                        char['bestWeapon'] = weaKey;
                        tierList[idx].push(char);
                    }
                }
            });

            const preTierList = {};
            preTier.forEach((t, idx) => {
                preTierList[idx] = {};
                for (const charKey in t['tier']) {
                    preTierList[idx][charKey] = {};
                    for (const weaKey in t['tier'][charKey]) {
                        const char = t['tier'][charKey][weaKey];
                        char['characterNum'] = charKey;
                        char['bestWeapon'] = weaKey;
                        preTierList[idx][charKey][weaKey] = char;
                    }
                }
            });
    
            this.setState({ isStartLoad: true, tierList: tierList, preTier:preTierList });
        }
    };

    listSort = (_type) => {
        const { tierList, type, typeFocus } = this.state;

        if (!tierList[0]) return;

        tierList[_type].sort((a, b) => {
            const _a = a['rank'][type[typeFocus]];
            const _b = b['rank'][type[typeFocus]];
            return _a - _b;
        });
    };

    listView = () => {
        const { range, type, intl } = this.props;
        const { tierList, preTier, typeFocus } = this.state;

        if (!tierList[0]) return;

        this.listSort(type);

        return tierList[type].map((data, idx) => {
            const preRank = preTier[type][data['characterNum']] ? preTier[type][data['characterNum']][data['bestWeapon']] : null;
            const rankDiff = preRank ? preRank['rank'][this.state.type[typeFocus]] - (idx+1) : 0;
            const characterName = getCharacter(data['characterNum'])['name'];
            const weaponName = getWeaponType(data['bestWeapon']);

            if (preRank !== null) {
                return (
                    <div className="rank-1" key={'tier' + idx}>        
                          
                            <span className="rank3rank1">{idx+1}</span>&nbsp;
                            <img className="rank3Updown"   src={(rankDiff>0?'img/UpDown/상승.png':rankDiff<0?'img/UpDown/하락.png':'img/UpDown/유지.png')} />&nbsp;
                            <span className="rank3Updown1">{Math.abs(rankDiff)}</span>&nbsp;
                            <img className="rank3cha1" src={'img/Rank/'+characterName+(data['tier']>0?'':'_오피')+'.jpg'} />&nbsp;
                            <Link to={'Detail?gameMode='+(type+1)+'&character='+data['characterNum']+'&bestWeapon='+ data['bestWeapon']}>     
                                <span className="rank3chaname">{intl.formatMessage({id: 'characters.'+characterName})}</span>
                            </Link>
                            <img className="rank3weapon1"  src={'img/Weapons/'+weaponName+'.jpg'} />&nbsp;
                            <img className="rank3tier1"    src={data['tier']===0?'img/Tier/1티어.png':'img/Tier/'+data['tier']+'티어.png'} />&nbsp;
                            <span className="rank3win1"> {(data['winRate']*100).toFixed(1)}%</span>&nbsp;
                            <span className="rank3pick1">{(data['pickRate']*100).toFixed(1)}%</span>&nbsp;
                       
                    </div>
                );
            } else {
                return (
                    <div className="rank-1" key={'tier' + idx}>    
                                 
                            <span className="rank3rank1">{idx+1}</span>&nbsp;
                            <img className="rank3new"   src={'img/UpDown/new.png'} />&nbsp;
                            <img className="rank3cha1" src={'img/Rank/'+characterName+(data['tier']>0?'':'_오피')+'.jpg'} />&nbsp;
                            <Link to={'Detail?gameMode='+(type+1)+'&character='+data['characterNum']+'&bestWeapon='+ data['bestWeapon']}>      
                                <span className="rank3chaname">{intl.formatMessage({id: 'characters.'+characterName})}</span>
                            </Link>
                            <img className="rank3weapon1"  src={'img/Weapons/'+weaponName+'.jpg'} />&nbsp;
                            <img className="rank3tier1"    src={data['tier']===0?'img/Tier/1티어.png':'img/Tier/'+data['tier']+'티어.png'} />&nbsp;
                            <span className="rank3win1"> {(data['winRate']*100).toFixed(1)}%</span>&nbsp;
                            <span className="rank3pick1">{(data['pickRate']*100).toFixed(1)}%</span>&nbsp;
                        
                    </div>
                );
            }
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
                    <span className="rank3win">{intl.formatMessage({id: 'winRate'})}</span>&nbsp;
                    <span className="rank3pick">{intl.formatMessage({id: 'pickRate'})}</span>&nbsp;
                </div>
                {this.listView()}
            </div>
        );
    };
}

export default injectIntl(Tier);