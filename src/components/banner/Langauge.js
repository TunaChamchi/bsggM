import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { locale, defaultLang, changeLang } from 'lib/utility';

class Langauge extends Component {
	constructor(props) {
        super(props);
        this.state = {
            searchList: [],
        };
    }

    langaugeHandler = (event) => {
        const value = event.target.value;

        changeLang(value);
    }
    langaugeView = () => {
        const list = [];

        for (const key in locale) {
            list.push(locale[key]['name']);
        }

        return Object.keys(locale).map((lang, idx) => 
            <option className="langaugebutton2" key={idx} value={lang}>{locale[lang]['name']}</option>
        );
    }

    render() {
        const { intl } = this.props;

        return (
            <div className="language">
                <img className="langaugelogo" src={"/img/langaugelogo.png"} />
                <select className="langaugebutton" value={defaultLang()} onChange={(e) => {this.langaugeHandler(e)}}>
                    {this.langaugeView()}
                </select>
            </div>
        );
    };
}

export default injectIntl(Langauge);