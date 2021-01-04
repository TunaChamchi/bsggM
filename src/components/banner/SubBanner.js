import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { injectIntl  } from 'react-intl';
import { Langauge  } from 'components/banner';
import logo from 'img/sub_logo.svg';
import { getCharacterKeys, getCharacter } from 'lib/data'

class MainBanner extends Component {
	constructor(props) {
        super(props);
        this.state = {
            searchType: true,
            search: '',
            searchList: [],
            tierList: ['Iron 4', 'Iron 3', 'Iron 2', 'Iron 1', 'Bronze 4', 'Bronze 3','Bronze 2', 'Bronze 1',
                    'Silver 4', 'Silver 3', 'Silver 2', 'Silver 1', 'Gold 4', 'Gold 3','Gold 2', 'Gold 1',
                    'Platinum 4', 'Platinum 3', 'Platinum 2', 'Platinum 1', 'Diamond 4', 'Diamond 3','Diamond 2', 'Diamond 1',
                    'Demigod 4', 'Demigod 3', 'Demigod 2', 'Demigod 1', 'Eternity 4', 'Eternity 3','Eternity 2', 'Eternity 1']
        };
    }

    selectHandler = (event) => {
        this.setState({search:'', searchList: []});
    }
    
    searchTypehHandler = (event) => {
        const { searchType } = this.state;

        this.setState({searchType: !searchType});
    }
    fetchHandler = async (name) => {
        await fetch('http://192.168.0.102:3001/api/User?search='+name)
                .then(res => res.json())
                .then(res => this.setState({searchList: res}));
    }
    
    searchHandler = (event) => {
        const { intl } = this.props;
        const value = event.target.value.toLowerCase();

        if (!value) {
            this.setState({search:'', searchList: []});
            return;
        } else if (value.length < 2) {
            this.setState({search:value, searchList: []});
            return;
        }
        this.fetchHandler(value);
        this.setState({search:value});
    }
    searchView = () => {
        const { intl } = this.props;
        const { searchList, tierList } = this.state;

        return searchList.map((user, idx) => {
            let maxMmr = 0;
            if (user['seasonStats'] && user['seasonStats'][1]) {
                Object.keys(user['seasonStats'][1]).forEach(t => {
                    maxMmr = Math.max(maxMmr, user['seasonStats'][1][t]['mmr']);
                })
            }
            const tier = Math.floor(maxMmr/100);
            const lp   = maxMmr-tier*100;

            return (
                <Link to={'/Match?userName='+user['nickname']} key={idx} onClick={(e)=> this.selectHandler(e)}>
                    <div className="S_search4" >
                        <img className="searchimg" src={"img/Rankicon/"+tierList[tier].slice(0, -2)+".png"} />
                        {/* <div className="record_rank_span2">{tierList[tier]} / {lp} LP</div> */}
                        <div className="searchfont"> {user['nickname']} </div>
                    </div>
                </Link>
            )
        });
    }
    searchSubmit = (event) => {
        const { search } = this.state;
        if (event.key === 'Enter') {
            this.selectHandler(event);
            window.location.href = '/Match?userName='+search;
        }
    }

    charactersSubmit = (event) => {
    }
    charactersHandler = (event) => {
        const { intl } = this.props;
        const value = event.target.value.toLowerCase();

        if (!value) {
            this.setState({search:'', searchList: []});
            return;
        }

        const list = getCharacterKeys().filter(code => (intl.formatMessage({id: 'characters.'+getCharacter(code)['name'] })).replace(' ', '').toLowerCase().indexOf(value) !== -1);

        this.setState({search:value, searchList: list});
    }
    charactersView = () => {
        const { intl } = this.props;
        const { searchList } = this.state;

        return searchList.map((data, idx) => 
            <Link to={'Detail?character='+data} key={idx} onClick={(e)=> this.selectHandler(e)}>
                <div className="S_search4" >
                    <img className="searchimg" src={'img/Rank/'+getCharacter(data)['name']+'.jpg'} />
                    <div className="searchfont"> {intl.formatMessage({id: 'characters.'+getCharacter(data)['name']})} </div>
                </div>
            </Link>
        );
    }

    render() {
        const { intl } = this.props
        const { searchType, search, searchList } = this.state;

        return (
            <div className="S_banner">
                <div className="S_banner-top">
                    <div className="S_banner-left">
                        <Langauge />
                        <div className="banner-button">
                            <Link to={'/Tier'}>
                                <button className="menubutton actived">{intl.formatMessage({id:'main.banner.menu.tier'})}</button>
                            </Link>
                            <Link to={'/Route'}>
                                <button className="menubutton">{intl.formatMessage({id:'main.banner.menu.route'})}</button>
                            </Link>
                            <Link to={'/Rank'}>
                                <button className="menubutton">{intl.formatMessage({id:'main.banner.menu.rank'})}</button>
                            </Link>
                        </div>
                    </div>
                        <div className="S_mainlogo">
                            <Link to="/" >
                                <img className="S_logo" src={logo} />
                            </Link>
                        </div>
                        <div className="S_search">
                            <input type="checkbox" id="switch" /><label className="mainpage_switch1" for="switch" onClick={this.searchTypehHandler}>Toggle</label>
                            <input className="S_search1" value={search} 
                                onChange={searchType ? this.searchHandler : this.charactersHandler} 
                                onKeyDown={searchType ? this.searchSubmit : this.charactersSubmit}
                                placeholder={
                                    searchType ? intl.formatMessage({id:'main.left.search.placeholder'}) : intl.formatMessage({id:'main.left.characters.placeholder'})
                                } /> 
                        </div>
                        {
                            searchList.length !== 0 &&
                                <div multiple className="S_search3">
                                    {searchType ? this.searchView() : this.charactersView()}
                                </div>
                        }
                </div>
            </div>
        );
    };
}

export default injectIntl(MainBanner);