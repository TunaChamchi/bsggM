import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';

class Top extends Component {
    render() {
        const { intl } = this.props

        return (            
            <div className="S_Trend">
            </div>
        );
    };
}

export default injectIntl(Top);