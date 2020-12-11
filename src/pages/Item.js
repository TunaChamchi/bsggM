import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';

class Item extends Component {
    render() {
        const { intl } = this.props;

        return (
            <div>
            </div>
        );
    };
}

export default injectIntl(Item);