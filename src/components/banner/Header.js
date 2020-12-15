import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';

class Header extends Component {
    render() {
        const { data } = this.props;

        const title = data.title;
        const description = data.description;
        const keywords = data.keywords;

        return (
            <Helmet>
                <title>{title}</title>
                <meta charset="utf-8" />
                <meta name="description" CONTENT={description} />
                <meta name="keywords" CONTENT="영원회귀, 블랙 서바이벌, 티어, BS:ER, Stats, Tier" />
                <meta property="og:type" content="website" /> 
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content="https://bsgg.kr/logo512.png" />
                <meta property="og:url" content="https://bsgg.kr" />
            
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content="https://bsgg.kr/logo512.png" />
                <meta name="twitter:domain" content="https://bsgg.kr" />
            
                <link rel="icon" href="https://bsgg.kr/bsggico.ico" />   
            </Helmet>
        );
    };
}

export default injectIntl(Header);