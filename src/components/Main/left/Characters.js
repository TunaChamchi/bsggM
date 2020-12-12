import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { injectIntl  } from 'react-intl';
import { charList } from 'lib/utility'

class Characters extends Component {
	constructor(props) {
        super(props);
        this.state = {
            searchList: [],
        };
    }
    
    componentDidMount() {
        this.setState({searchList: charList()});
    };

    searchHandler = (event) => {
        const value = event.target.value.toLowerCase();

        const list = charList().filter(data => data['name'].toLowerCase().indexOf(value) !== -1);

        this.setState({searchList: list});
    }

    characterList = () => {
        const { intl } = this.props;
        const { searchList } = this.state;

        const list = []

        for (var i = 0 ; i < searchList.length ; i+=3) {
            const sub = [searchList[i], searchList[i+1], searchList[i+2]];
            list.push(sub);
        }

        return list.map((sub, idx) => {
            const link0 = 'Detail?character='+sub[0]['key'];
            const link1 = sub[1] ? 'Detail?character='+sub[1]['key'] : '';
            const link2 = sub[2] ? 'Detail?character='+sub[2]['key'] : '';
            
            return (
                <div className="cha4" key={'cha4'+idx}>
                        <Link to={link0} className="cha5">
                                <img className="chaimg" key={'chaimg'+sub[0]['key']} src={'img/Characters/'+sub[0]['key']+'.png'} />
                                <div className="chaname">{intl.formatMessage({id: 'characters.'+sub[0]['key']})}</div>
                        </Link>&nbsp;
                    {sub[1] ? 
                        <Link to={link1} className="cha5">
                            <img className="chaimg" key={'chaimg'+sub[1]['key']} src={sub[1] ? 'img/Characters/'+sub[1]['key']+'.png' : ''} />
                            <div className="chaname">{intl.formatMessage({id: 'characters.'+sub[1]['key']})}</div>
                        </Link>
                        : 
                        <img className="chaimg-blank" key={'chaimg'+idx} />}&nbsp;
                    {sub[2] ? 
                        <Link to={link2} className="cha5">
                            <img className="chaimg" key={'chaimg'+sub[2]['key']} src={sub[2] ? 'img/Characters/'+sub[2]['key']+'.png' : ''} />
                            <div className="chaname">{intl.formatMessage({id: 'characters.'+sub[2]['key']})}</div>
                        </Link> 
                        : 
                        <img className="chaimg-blank" key={'chaimg'+idx+1} />}
                </div>
            )
        });
    }


    render() {
        const { intl } = this.props;

        return (
        <div>
            <div className="cha">
                <div className="cha0">
                    <span>{intl.formatMessage({id:'character'})}</span>
                </div>
                <div className="cha1">
                    <input className="chasearch" onChange={this.searchHandler} placeholder={intl.formatMessage({id:'main.left.characters.placeholder'})} /> 
                </div>
                <div className="cha2">
                    <div className="cha3">
                        {this.characterList()}
                    </div>
                </div>
            </div>
        </div>
        );
    };
}

export default injectIntl(Characters);