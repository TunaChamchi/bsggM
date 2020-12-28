import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { injectIntl  } from 'react-intl';
import { charList } from 'lib/utility'
import lotation from 'data/sub/lotation.json'

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

        for (var i = 0 ; i < searchList.length ; i+=4) {
            const sub = [searchList[i], searchList[i+1], searchList[i+2], searchList[i+3]];
            list.push(sub);
        }

        return list.map((sub, idx) => {
            const link0 = 'Detail?character='+sub[0]['key'];
            const link1 = sub[1] ? 'Detail?character='+sub[1]['key'] : '';
            const link2 = sub[2] ? 'Detail?character='+sub[2]['key'] : '';
            const link3 = sub[3] ? 'Detail?character='+sub[3]['key'] : '';
            
            return (
                <div className="cha4" key={'cha4_'+idx}>
                        <Link to={link0} className="cha5" key={'chaimg_'+sub[0]['key']} >
                            <img className="chaimg" style={lotation.includes(sub[0]['key']) ? {border:"1px solid rgb(244,216,35)"} : {}} 
                                src={'img/Characters/'+sub[0]['key']+'.jpg'} />
                            <div className="chaname">{intl.formatMessage({id: 'characters.'+sub[0]['key']})}</div>
                        </Link>&nbsp;
                    {sub[1] ? 
                        <Link to={link1} className="cha5" key={'chaimg_'+sub[1]['key']} >
                            <img className="chaimg" style={lotation.includes(sub[1]['key']) ? {border:"1px solid rgb(244,216,35)"} : {}} 
                                src={sub[1] ? 'img/Characters/'+sub[1]['key']+'.jpg' : ''} />
                            <div className="chaname">{intl.formatMessage({id: 'characters.'+sub[1]['key']})}</div>
                        </Link>
                        : 
                        <img className="chaimg-blank" key={'chaimg'+idx} />}&nbsp;
                    {sub[2] ? 
                        <Link to={link2} className="cha5"key={'chaimg_'+sub[2]['key']}>
                            <img className="chaimg" style={lotation.includes(sub[2]['key']) ? {border:"1px solid rgb(244,216,35)"} : {}} 
                                src={sub[2] ? 'img/Characters/'+sub[2]['key']+'.jpg' : ''} />
                            <div className="chaname">{intl.formatMessage({id: 'characters.'+sub[2]['key']})}</div>
                        </Link> 
                        : 
                        <img className="chaimg-blank" key={'chaimg'+idx+1} />}
                    {sub[3] ? 
                        <Link to={link3} className="cha5"key={'chaimg_'+sub[3]['key']} >
                            <img className="chaimg" style={lotation.includes(sub[3]['key']) ? {border:"1px solid rgb(244,216,35)"} : {}} 
                                src={sub[3] ? 'img/Characters/'+sub[3]['key']+'.jpg' : ''} />
                            <div className="chaname">{intl.formatMessage({id: 'characters.'+sub[3]['key']})}</div>
                        </Link> 
                        : 
                        <img className="chaimg-blank" key={'chaimg'+idx+2} />}
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