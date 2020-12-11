import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';
import ScriptTag from 'react-script-tag';
import { MainBanner, AdS, Footer } from 'components/banner'
import { Search, Characters } from 'components/Main/left'
import { Rank } from 'components/Main/right'


class Character extends Component {
    render() {
        return (
            <div>
                <MainBanner />
                <div className='main'>
                    <Search />
                    <div className='main-left'>
                        <Characters />
                        <div className="Ad_box_Main">
                            <ins 
                                class="kakao_ad_area" 
                                style={{display: 'none'}} 
                                data-ad-unit="DAN-WUlvSzBZfRSTMEEX" 
                                data-ad-width="300" 
                                data-ad-height="250"></ins> 
                        </div>
                    </div>
                </div>
                <AdS type={'Main'}/>
                <Footer />
            </div>
        );
    };
}

export default injectIntl(Character);