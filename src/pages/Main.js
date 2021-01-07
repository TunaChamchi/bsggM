import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';
import { Header, MainBanner, AdS, Footer } from 'components/banner'
import { Search, Characters } from 'components/Main/left'
import { Rank } from 'components/Main/right'

class Main extends Component {
    render() {
        const { intl } = this.props;
        
        const metaData = {
            title: 'BSGG.kr - ' + intl.formatMessage({id: 'Title.Main'}),
        }

        return (
            <div>
                <Header data={metaData}/>
                <MainBanner actived={'Tier'} />
                
                <div className='main'>
                    <div className='main-left'>
                        <Characters />
                        <div className="Ad_box_Main">
                            {/* {<ins 
                                className="kakao_ad_area" 
                                style={{display: 'none'}} 
                                data-ad-unit="DAN-WUlvSzBZfRSTMEEX" 
                                data-ad-width="300" 
                                data-ad-height="250"></ins> } */}
                        </div>
                    </div>
                    <div className='main-right'>
                        <Rank />
                    </div>
                </div>
                <Footer />
                {/* <ScriptTag src="//t1.daumcdn.net/kas/static/ba.min.js" async /> */}
                {/* <ScriptTag src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" async /> */}
            </div>
        );
    };
}

export default injectIntl(Main);