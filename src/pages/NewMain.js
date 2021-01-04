import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { injectIntl  } from 'react-intl';
import { Footer, Langauge, Header, Search } from 'components/banner';
import logo from 'img/main_logo.svg';

class Main extends Component {
    render() {
        const { intl, actived } = this.props;
        
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
                                <button className={"mainpage_button"+(actived==='Tier'?' actived':'')}>
                                    {intl.formatMessage({id: '랭크'})}
                                </button>
                            </Link>
                            <Link to={'/Route'}>
                                <button className={"mainpage_button"+(actived==='Tier'?' actived':'')}>
                                    {intl.formatMessage({id: 'main.banner.menu.route'})}
                                </button>
                            </Link>
                            <Link to={'/Tier'}>
                                <button className={"mainpage_button"+(actived==='Tier'?' actived':'')}>
                                    {intl.formatMessage({id: '캐릭터/티어'})}
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <Search />
                <Footer />
            </div>
        );
    };
}

export default injectIntl(Main);