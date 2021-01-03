import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { injectIntl  } from 'react-intl';
import { getCharacterKeys, getCharacter } from 'lib/data'
import lotation from 'data/sub/lotation.json'

class Characters extends Component {
	constructor(props) {
        super(props);
        this.state = {
            searchList: [],
        };
    }
    
    componentDidMount() {
        this.setState({searchList: getCharacterKeys()});
    };

    searchHandler = (event) => {
        const { intl } = this.props;
        const value = event.target.value.toLowerCase();

        const list = getCharacterKeys().filter(code => (intl.formatMessage({id: 'characters.'+getCharacter(code)['name'] })).replace(' ', '').toLowerCase().indexOf(value) !== -1);

        this.setState({searchList: list});
    }

    characterList = () => {
        const { searchList } = this.state;

        const list = []

        for (var i = 0 ; i < searchList.length ; i+=3) {
            const sub = [searchList[i], searchList[i+1], searchList[i+2]];
            list.push(sub);
        }
        
        return list.map((sub, idx) => {
            const { intl } = this.props;
            const link0 = 'Detail?character='+sub[0];
            const link1 = sub[1] ? 'Detail?character='+sub[1] : '';
            const link2 = sub[2] ? 'Detail?character='+sub[2] : '';

            return (
                <div className="cha4" key={'cha4'+idx}>
                        <Link to={link0} className="cha5">
                            <img className="chaimg" style={lotation.includes(getCharacter(sub[0])['name']) ? {border:"1px solid rgb(244,216,35)"} : {}} 
                                key={'chaimg'+sub[0]} src={'img/Characters/'+getCharacter(sub[0])['name']+'.jpg'} />
                            <div className="chaname">{intl.formatMessage({id: 'characters.'+getCharacter(sub[0])['name']})}</div>
                        </Link>&nbsp;
                    {sub[1] ? 
                        <Link to={link1} className="cha5">
                            <img className="chaimg" style={lotation.includes(getCharacter(sub[1])['name']) ? {border:"1px solid rgb(244,216,35)"} : {}} 
                                key={'chaimg'+sub[1]} src={sub[1] ? 'img/Characters/'+getCharacter(sub[1])['name']+'.jpg' : ''} />
                            <div className="chaname">{intl.formatMessage({id: 'characters.'+getCharacter(sub[1])['name']})}</div>
                        </Link>
                        : 
                        <img className="chaimg-blank" key={'chaimg'+idx} />}&nbsp;
                    {sub[2] ? 
                        <Link to={link2} className="cha5">
                            <img className="chaimg" style={lotation.includes(getCharacter(sub[2])['name']) ? {border:"1px solid rgb(244,216,35)"} : {}} 
                                key={'chaimg'+sub[2]} src={sub[2] ? 'img/Characters/'+getCharacter(sub[2])['name']+'.jpg' : ''} />
                            <div className="chaname">{intl.formatMessage({id: 'characters.'+getCharacter(sub[2])['name']})}</div>
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
                    <span>Character</span>
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