import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';
import { Header, MainBanner, AdS, Footer } from 'components/banner'
import { Search, Characters } from 'components/Main/left'
import { Rank } from 'components/Main/right'
import logo from 'img/main_logo.svg';

class Main extends Component {
    render() {
        const { intl } = this.props;
        
        const metaData = {
            title: 'BSGG.kr - ' + intl.formatMessage({id: 'Title.Main'}),
        }

        return (
            <div style={{width: 800, margin:'auto', textAlign:'center'}}>
                <Header data={metaData}/>
                <img src={logo} style={{marginTop: 100, width: 400, textAlign: 'center'}}/>
                <div style={{marginTop: 30, width: 800, textAlign: 'center', fontSize: 25, color: 'rgb(209, 209, 209)'}}>
                    해당 페이지는 없는 페이지 입니다.
                </div>
                <div style={{marginTop: 30, width: 800, textAlign: 'center', fontSize: 25, color: 'rgb(209, 209, 209)'}}>
                    This page does not exist.
                </div>
                <div style={{marginTop: 30, width: 800, textAlign: 'center', fontSize: 25, color: 'rgb(209, 209, 209)'}}>
                    該当ページはないページです。
                </div>
                <div style={{marginTop: 30, width: 800, textAlign: 'center', fontSize: 25, color: 'rgb(209, 209, 209)'}}>
                    该页是没有的页面。
                </div>
            </div>
        );
    };
}

export default injectIntl(Main);