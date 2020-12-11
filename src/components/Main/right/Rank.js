import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';
import { Tier } from 'components/Main/right'

class Rank extends Component {
	constructor(props) {
        super(props);
        this.state = {
            range: ['RANKER', 'ALL'],
            rangeFocus: 0,
            type: ['solo', 'duo', 'squad'],
            typeFocus: 0,
        };
    }
    
    rangeHandler = (idx) => {
        this.setState({rangeFocus: idx});
    }
    typeHandler = (idx) => {
        this.setState({typeFocus: idx});
    }
    
    rangeView = () => {
        const { range, rangeFocus } = this.state;

        return range.map((name, idx) => 
            <div className={'tabHeader0 ' + (idx === rangeFocus ? 'actived' : '')}
                key={'range'+idx}
                onClick={(e) => this.rangeHandler(idx)}>
                {name}
            </div>
        );
    }
    typeView = () => {
        const { intl } = this.props;
        const { type, typeFocus } = this.state;

        return type.map((name, idx) => 
            <div className={'tabHeader1 ' + (idx === typeFocus ? 'actived' : '')}
                key={'type'+idx}
                onClick={(e) => this.typeHandler(idx)}>
                {intl.formatMessage({id: name})}
            </div>
        );        
    }

    render() {
        const { range, rangeFocus, type, typeFocus } = this.state;

        return (
            <div>
                <div className="rank0">
                    <div className="tri"></div>
                    <div className="rank0-2">
                        <div className="tabHeaders">
                            {this.rangeView()}
                        </div>
                    </div>
                    <div className="rank0-1">
                        <span>RANK</span>
                    </div>
                </div>
                <div className="rank1">
                    <div className="tabHeaders">
                        {this.typeView()}
                    </div>
                </div>
                <Tier 
                    range={range[rangeFocus]}
                    type={type[typeFocus]}/>
            </div>
        );
    };
}

export default injectIntl(Rank);