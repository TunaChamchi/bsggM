import React, { Component } from 'react';
import { injectIntl  } from 'react-intl';
import { Tier } from 'components/Main/right'
import qusetionlogo from 'img/questionlogo.png';

class Rank extends Component {
	constructor(props) {
        super(props);
        this.state = {
            isStartLoad: false,
            type: ['solo', 'duo', 'squad'],
            typeFocus: 0,
        };
    }
    
    componentDidMount() {
        window.scrollTo(0, 0);

        this.fetchHandler();
    }

    componentDidUpdate(prevProps, prevState){
        const { tier, preTier, isStartLoad } = this.props;
        if (isStartLoad === true && (tier === undefined || preTier === undefined)) {
            this.fetchHandler();
        }
    };

    fetchHandler = async () => {
        await fetch('/api/Character/Tier')
            .then(res => res.json())
            .then(res => this.setState({ tier:res['tier'], preTier:res['preTier'], isStartLoad: true }));
    }
    
    typeHandler = (idx) => {
        this.setState({typeFocus: idx});
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
        const { intl } = this.props;
        const { isStartLoad, tier, preTier, typeFocus } = this.state;

        return (
            <div>
                <div className="rank0">
                    <div className="rank0-1">
                        <div className="rank_span">
                            <span >RANK</span>
                            <img className="question_logo" src={qusetionlogo} />
                            <div className="rank_span_tooltip">
                                <span>{intl.formatMessage({id:'question'})}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rank1">
                    <div className="tabHeaders">
                        {this.typeView()}
                    </div>
                </div>
                <Tier 
                    tier={tier}
                    preTier={preTier}
                    isStartLoad={isStartLoad}
                    type={typeFocus}/>
            </div>
        );
    };
}

export default injectIntl(Rank);