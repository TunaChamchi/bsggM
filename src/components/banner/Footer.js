import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';
import AdSense from 'react-adsense';
import logo from 'img/sub_logo.svg';

class Footer extends Component {
    render() {
        const { intl } = this.props;

        return (
            <div>
                <AdSense.Google
                    className='Ad_box_Detail1'
                    client='ca-pub-7215780243476450'
                    slot='8063267204'
                    style={{ display: 'inline-block', width:728, height:90 }}
                    />
                <div className="footer">
                    <img className="footer_logo" src={logo}/>
                    <div  className="footer_span">
                        <span>{intl.formatMessage({id:'footer'})}</span>
                    </div>
                        <a className="footer_button" href="mailto:service@bsgg.kr">Contact</a>
                        <a className="footer_button" href="https://twitter.com/BsggKr">Twitter</a>
                </div>
            </div>
        );
    };
}

export default injectIntl(Footer);