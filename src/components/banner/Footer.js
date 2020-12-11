import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';
import AdSense from 'react-adsense';
import logo from 'img/sub_logo.svg';

class Footer extends Component {
    render() {
        const { intl } = this.props;

        return (
            <div className="footer">
                <img className="footer_logo" src={logo}/>
                <button className="footer_button">Contact</button>
            </div>
        );
    };
}

export default injectIntl(Footer);