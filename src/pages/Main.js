import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';
import ScriptTag from 'react-script-tag';
import { MainBanner, AdS, Footer } from 'components/banner'
import { Search, Characters } from 'components/Main/left'
import { Rank } from 'components/Main/right'


class Main extends Component {
    render() {
        return (
            <div>
                <MainBanner />
                <div className='main'>
                    <Search />
                    <div className="Ad_box_Detail2">
                            {/*<ins 
                                class="kakao_ad_area" 
                                style={{display: 'none'}}
                                data-ad-unit="DAN-65cQeySsxkm44L6Y" 
                                data-ad-width="728" 
                            data-ad-height="90"></ins>*/}
                        </div>
                    <Characters />
                    <div className='main-right'>
                            <Rank />
                    </div>
                </div>
                <div className="Ad_box_Detail2">
                            {/*<ins 
                                class="kakao_ad_area" 
                                style={{display: 'none'}}
                                data-ad-unit="DAN-65cQeySsxkm44L6Y" 
                                data-ad-width="728" 
                            data-ad-height="90"></ins>*/}
                        </div>
                <Footer />
                <ScriptTag src="//t1.daumcdn.net/kas/static/ba.min.js" async />
            </div>
        );
    };
}

export default injectIntl(Main);