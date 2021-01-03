import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { locale, defaultLang } from 'lib/utility';
import App from 'shared/App';

// 
function flattenMessages(nestedMessages, prefix = '') {
    return Object.keys(nestedMessages).reduce((messages, key) => {
        let value       = nestedMessages[key];
        let prefixedKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === 'string') {
            messages[prefixedKey] = value;
        } else {
            Object.assign(messages, flattenMessages(value, prefixedKey));
        }

        return messages;
    }, {});
}

let flattedMessages = flattenMessages(locale[defaultLang()]['data']);

const Root = () => (
    <BrowserRouter>
        <IntlProvider locale={defaultLang()} messages={flattedMessages} onError={() => {}}>
            <App/>
        </IntlProvider>
    </BrowserRouter>
);

export default Root;