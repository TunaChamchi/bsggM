import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { injectIntl  } from 'react-intl';
import { Langauge  } from 'components/banner';
import { Upadated, Data_period } from 'lib/data'
import { defaultLang } from 'lib/utility'
import logo from 'img/main_logo.svg';
import newimg from 'img/new.png';

class MainBanner extends Component {
    render() {
        
        const { intl } = this.props;

        return (
            <div className="banner"> 
            
                <div className="banner-top">
                    <Langauge />
                    <div className="banner-botton">
                        <div className="trirank"></div>
                        <a href={'https://playeternalreturn.com/'+defaultLang()+'/ranking/'} target="_blank">
                            <button className="menubutton">{intl.formatMessage({id:'main.banner.menu.rank'})}</button>
                        </a>
                        <Link to={'/Route'}>
                            <button className="menubutton">{intl.formatMessage({id:'main.banner.menu.route'})}</button>
                        </Link>
                    </div>
                    
                    <div className="mainlogo">
                        <Link to="/" >
                            <img className="logo" src={logo} />
                        </Link>
                    </div>
                </div>

                <div className="banner-menu">

                    <div className="Data-period">
                        <span>{Upadated}</span>
                        <br />
                        <span>{Data_period}</span>
                    </div>
                </div>
            </div>
        );
    };
}

export default injectIntl(MainBanner);