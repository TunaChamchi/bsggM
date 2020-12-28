import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';
import AdSense from 'react-adsense';
import { Header, MainBanner, AdS, Footer } from 'components/banner'
import { Search, Characters } from 'components/Main/left'
import { Rank } from 'components/Main/right'


class Main extends Component {
    render() {
        const { intl } = this.props;
        
        const metaData = {
            title: 'BSGG.kr - ' + intl.formatMessage({id: 'Title.Main'}),
            description: '영원회귀 : 블랙 서바이벌 통계, 캐릭터 티어, 아이템 트렌드, BS:ER Stats, Character Tier, Item Trend'
        }

        return (
            <div>
                <Header data={metaData}/>
                <MainBanner />
                <div className='main'>
                    <Search />
                    <AdSense.Google
                        className='Ad_box_Detail2'
                        client='ca-pub-7215780243476450'
                        slot='9630487981'
                        style={{ display: 'block', width:728 }}
                        responsive='true'
                        />
                    {/* <div className="Ad_box_Detail2">
                        <ins 
                            class="kakao_ad_area" 
                            style={{display: 'none'}}
                            data-ad-unit="DAN-eOZOZvEyRvmmrIAV" 
                            data-ad-width="728" 
                        data-ad-height="90"></ins>
                    </div> */}
                    <Characters />
                    <div className='main-right'>
                        <Rank />
                    </div>
                </div>
                {/* <div className="Ad_box_Detail2">
                    <ins 
                        class="kakao_ad_area" 
                        style={{display: 'none'}}
                        data-ad-unit="DAN-2F5abPe9K508dSMu" 
                        data-ad-width="728" 
                    data-ad-height="90"></ins>
                </div> */}
                <AdSense.Google
                    className='Ad_box_Detail2'
                    client='ca-pub-7215780243476450'
                    slot='8063267204'
                    style={{ display: 'block', width:728 }}
                    responsive='true'
                    />
                <Footer />
            </div>
        );
    };
}

export default injectIntl(Main);