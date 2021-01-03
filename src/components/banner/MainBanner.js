import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { injectIntl  } from 'react-intl';
import { Langauge  } from 'components/banner';
import { Version } from 'lib/data'
import { defaultLang } from 'lib/utility'
import logo from 'img/main_logo.svg';

class MainBanner extends Component {
    render() {
        const { intl } = this.props;

        return (
            <div className="banner"> 
            
                <div className="banner-top">
                    <Langauge />
                    
                    <div className="mainlogo">
                        <Link to={'/'}>
                            <img className="logo" src={logo}/>
                        </Link>
                    </div>
                </div>

                <div className="banner-menu">
                    <div className="banner-botton">
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
            </div>
        );
    };
}

export default injectIntl(MainBanner);