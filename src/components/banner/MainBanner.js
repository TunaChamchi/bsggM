import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { injectIntl  } from 'react-intl';
import { Langauge, Search } from 'components/banner';
import { Version } from 'lib/data'
import { defaultLang } from 'lib/utility'
import logo from 'img/main_logo.svg';

class MainBanner extends Component {
    render() {
        const { intl, actived } = this.props

        return (
            <div> 
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
                                    <button className={"menubutton"+(actived==='Tier'?' actived':'')}>{intl.formatMessage({id:'main.banner.menu.tier'})}</button>
                                </Link>
                                <Link to={'/Route'}>
                                    <button className={"menubutton"+(actived==='Route'?' actived':'')}>{intl.formatMessage({id:'main.banner.menu.route'})}</button>
                                </Link>
                                <Link to={'/Rank'}>
                                    <button className={"menubutton"+(actived==='Rank'?' actived':'')}>{intl.formatMessage({id:'main.banner.menu.rank'})}</button>
                                </Link>
                        </div>
                    </div>
                </div>
                <Search/>
            </div>
        );
    };
}

export default injectIntl(MainBanner);