import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';
import { Header, MainBanner, AdS, Footer } from 'components/banner'
import { Search, Characters } from 'components/Main/left'
import { Rank } from 'components/Main/right'

class Main extends Component {
    render() {
        const { intl } = this.props;
        
        const metaData = {
            title: 'BSGG.kr - ' + intl.formatMessage({id: 'Title.newMain'}),
        }

        return (
            <div>
                <Header data={metaData}/>
                <MainBanner />
                <div className="Loading_main">
                    <div id="loading_animation"></div>
                    <div className="Loading_main_span">{intl.formatMessage({id: '로딩'})}</div>
                </div>

            </div>
        );
    };
}

export default injectIntl(Main);