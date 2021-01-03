import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';
import { defaultLang } from 'lib/utility'

class Search extends Component {
	constructor(props) {
        super(props);
        this.state = {
            search: '',
        };
    }

    onChange = (e) => {
        this.setState({search: e.target.value});
    }

    onSubmit = (event) => {
        if (event.key === 'Enter') {
            const value = event.target.value;
            console.log('value', value);

            var link = 'http://matchhistory.playeternalreturn.com/kr/name=';

            if (defaultLang() === 'ko') {
                link = 'http://matchhistory.playeternalreturn.com/kr/name=';
            } else if (defaultLang() === 'en') {
                link = 'http://matchhistory.playeternalreturn.com/name=';
            } else if (defaultLang() === 'scn') {
                link = 'http://matchhistory.playeternalreturn.com/cn/name=';
            } else {
                link = 'http://matchhistory.playeternalreturn.com/'+defaultLang()+'/name=';
            }

            var win = window.open(link+value, '_blank');
            win.focus();
        }
    }

    render() {
        const { intl } = this.props;
        const { search } = this.state;

        return (            
            <div className="search">
                <div className="trisearch"></div>
                <input className="search1" placeholder={intl.formatMessage({id:'main.left.search.placeholder'})} 
                    value={search} onChange={(e) => {this.onChange(e)}} onKeyPress={(e) => {this.onSubmit(e)}} />                
            </div>
        );
    };
}

export default injectIntl(Search);