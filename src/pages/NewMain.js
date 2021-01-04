import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { injectIntl  } from 'react-intl';
import { Footer, Langauge, Header, Search } from 'components/banner';
import { getCharacterKeys, getCharacter } from 'lib/data'
import logo from 'img/main_logo.svg';
import { sync } from 'glob';

class Main extends Component {
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

    render() {
        const { intl } = this.props;
        const { searchType, search, searchList } = this.state;
        
        const metaData = {
            title: 'BSGG.kr - ' + intl.formatMessage({id: 'Title.newMain'}),
        }

        return (
            <div>
                <Header data={metaData}/>
                <div className="mainpage_banner">
                    <img className="mainpage_logo" src={logo} />
                    <div className="mainpage_banner_option">
                        <div className="mainpage_langauge">
                            <Langauge />
                        </div>
                        <div className="mainpage_buttons">
                            <Link to={'/Rank'}>
                                <button className="mainpage_button">
                                    {intl.formatMessage({id: '랭크'})}
                                </button>
                            </Link>
                            <Link to={'/Route'}>
                                <button className="mainpage_button">
                                 {intl.formatMessage({id: 'main.banner.menu.route'})}
                                </button>
                            </Link>
                            <Link to={'/Tier'}>
                                <button className="mainpage_button">
                                    {intl.formatMessage({id: '캐릭터/티어'})}
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <Search />
                <div className="mainpage_size"></div>
                <Footer />
            </div>
        );
    };
}

export default injectIntl(Main);