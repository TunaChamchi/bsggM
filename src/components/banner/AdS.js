import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';
import AdSense from 'react-adsense';


class AdS extends Component {
    constructor(props) {
        super(props);
        this.state = {
            start : 480,
            top : 480,
            vw: 1900,
            ad_style: {
                position: 'absolute',
                visibility: 'visible'
            }
        };
    }

    componentWillMount() {
        const { type } = this.props;
        const { vw } = this.state;

        let start, top;
        if (type === 'Main') {
            start = 465; top = 480;
        } else if (type === 'Detail') {
            start = 330; top = 345;
        } else if (type === 'Map') {
            start = 185; top = 200;
        }

        const ad_style1 = { position: 'fixed', top: top };
        let ad_style2 = { visibility: 'visible' };
        if (window.innerWidth < vw) {
            ad_style2 = { visibility: 'hidden' };
        }

        this.setState({start: start, top: top, ad_style: {...ad_style1, ...ad_style2}});
        window.addEventListener('scroll', this.scrollHandle);
        window.addEventListener('resize', this.resizeHandle);
    };

    scrollHandle = () => {
        const { ad_style, start, top } = this.state;

        if (window.scrollY > start) {
            const _ad_style = {...ad_style, position: 'fixed', top: 15};
            this.setState({ad_style: _ad_style});
        } else {
            const _ad_style = {...ad_style, position: 'absolute', top: top};
            this.setState({ad_style: _ad_style});
        }
    }
    resizeHandle = () => {
        const { ad_style, vw } = this.state;

        if (window.innerWidth > vw) {
            const _ad_style = {...ad_style, visibility: 'visible'};
            this.setState({ad_style: _ad_style});
        } else {
            const _ad_style = {...ad_style, visibility: 'hidden'};
            this.setState({ad_style: _ad_style});
        }
    }

    render() {
        const { ad_style } = this.state;

        return (
            <div className="Ad">
                {
                    ad_style.visibility === 'visible' &&
                        <AdSense.Google
                            className='Ad_box_L'
                            client='ca-pub-7215780243476450'
                            slot='7685058911'
                            style={{ display: 'block', width:300, ...ad_style }}
                            responsive='true'
                            />
                }
                {
                    ad_style.visibility === 'visible' &&
                        <AdSense.Google
                            className='Ad_box_R'
                            client='ca-pub-7215780243476450'
                            slot='8351079805'
                            style={{ display: 'block', width:300, ...ad_style }}
                            responsive='true'
                            />
                }
            </div>
        );
    };
}

export default injectIntl(AdS);