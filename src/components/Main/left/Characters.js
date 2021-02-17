import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { injectIntl  } from 'react-intl';
import { getCharacterKeys, getCharacter, getWeaponCode } from 'lib/data'
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
        const { intl } = this.props;
        const { searchList } = this.state;

        const list = [];
        const _searchList = searchList.reverse();

        for (var i = 0 ; i < _searchList.length ; i+=4) {
            const sub = [_searchList[i], _searchList[i+1], _searchList[i+2], _searchList[i+3]];
            list.push(sub);
        }
        
        return list.map((sub, idx) => {
            const characters = [];

            sub.forEach(s => {
                if (!s) return;
                const _character = getCharacter(s);
                const name = _character['name'];
                const weapon = getWeaponCode(_character['weapons'][0]);
                characters.push({
                    name : name,
                    link : 'Detail?character='+s+'&bestWeapon='+weapon
                })
            })

            return (
                <div className="cha4" key={'cha4'+idx}>
                    {
                        sub.map((s, idx) => 
                            s ? 
                                <Link to={characters[idx]['link']} className="cha5" key={'chaimg_'+idx}>
                                    <img className="chaimg" style={lotation.includes(characters[idx]['name']) ? {border:"1px solid rgb(244,216,35)"} : {}} 
                                        src={'img/Characters/'+characters[idx]['name']+'.jpg'} />
                                    <div className="chaname">{intl.formatMessage({id: 'characters.'+characters[idx]['name']})}</div>
                                </Link>
                            :
                                <img className="chaimg-blank" key={'chaimg_'+idx} />
                        )
                    }
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