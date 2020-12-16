import React, { Component } from 'react';
import { injectIntl } from 'react-intl';

class Skill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skill: ['T', 'Q', 'W', 'E', 'R', 'D'],
            skillTree: [],
            skillTreeFocus: 0,
        };
    }
    
    skillView = () => {
        const { intl, parameter } = this.props;
        const { skill } = this.state;

        return skill.map((name, idx) => {
            const img = name === 'D' ? 
                'img/Weapons/'+parameter['weapon']+'.jpg' : 
                'img/Skill/'+parameter['character']+'/'+parameter['character']+'_'+name+'.jpg';
            const skilName = name === 'D' ? 
                intl.formatMessage({ id: 'skill.'+parameter['weapon']+'.name' }) : 
                intl.formatMessage({ id: 'skill.'+parameter['character']+'.'+name+'.name' });
            const detail = name === 'D' ? 
                intl.formatMessage({ id: 'skill.'+parameter['weapon']+'.Detail' }) : 
                intl.formatMessage({ id: 'skill.'+parameter['character']+'.'+name+'.Detail' });

            return (
                <div className='S_Skill_tab' key={'type' + idx}>
                    <div className="S_skill_toolbox">
                        <img className='S_Skill_img' src={img} />
                         <div className="S_skill_tooltip">
                            <span><b>{skilName}</b></span><br />
                            <span>{detail}</span>
                        </div>
                    </div>
                    <div className="S_SKill_key"><span>{name}</span></div>          
                </div>
            )
        });
    };
    skillTreeTabHandler = (idx) => {
        this.setState({skillTreeFocus: idx});
    };
    skillTreeTabView = () => {
        const { skillTree } = this.props;
        const { skillTreeFocus } = this.state;

        const list = [...skillTree];

        console.log('skillTree.length', skillTree.length);
        for (var i = 0 ; i < 3-skillTree.length ; i++) {
            console.log('i', i);
            list.push({name:''});
        }
        
        return list.map((tree, idx) => 
            <div className='tabHeaders' key={'treeTab'+idx} >
                <div className={"skill_tab" + (idx===skillTreeFocus ? ' actived' : '')} 
                    onClick={(e) => tree['name']!==''?this.skillTreeTabHandler(idx):''}>
                    <span>{tree['name']}</span>
                </div>
            </div>
        )
    }
    skillTreePick = () => {
        const { parameter, skillTree } = this.props;
        const { skillTreeFocus } = this.state;

        const tree = skillTree[skillTreeFocus]['tree'];

        return tree.map((name, idx) => 
            <img className="skill_span" key={'tree'+idx} src={'img/Skill/'+parameter['character']+'/'+parameter['character']+'_'+name+'.jpg'} />
        )
    }
    skillTreeTdView = () => {
        const { parameter } = this.props;
        const { skill } = this.state;

        return skill.slice(0, 5).map((name, idx) =>
            <div className='skill_td' key={'td'+idx}>
                <div className={'skill_tr skill_'+name} key={'tr'+idx} >
                    <img className="skill_img" key={'tree'+idx} src={'img/Skill/'+parameter['character']+'/'+parameter['character']+'_'+name+'.jpg'} />
                </div>
                {this.skillTreeTrView(name)}
            </div>
        )
    }
    skillTreeTrView = (name) => {
        const tree = ["Q", "W", "E", "Q", "Q", "R", "Q", "W", "Q", "W", "R", "W", "W", "E", "E", "R", "E", "E", "T", "T"]

        return tree.map((_name, idx) =>
            <div className={"skill_tr" + (_name===name ? ' skill_'+name : '')} key={'tr'+idx} 
                dangerouslySetInnerHTML={ {__html: _name===name ? name : '&nbsp;'} }>
            </div>
        )
    }

    render() {
        const { intl } = this.props

        return (            
            <div className="S_Skill">
                <span className="S_Skill0">{intl.formatMessage({ id: 'detail.skill_info' })}</span>
                    <div className="S_Skill1">
                        {this.skillView()}
                    </div>
                <div className="S_Skill2">
                    <span>{intl.formatMessage({ id: 'detail.스킬트리' })}</span>
                    {this.skillTreeTabView()}
                    <div className="skill_centent">
                        <div className="skill_imgbox">
                            {this.skillTreePick()}
                        </div>
                        <div className="skill_box0">
                            <div className='skill_td'>
                                {
                                    ["S", ...Array.from({length: 20}, (v,i) => i+1)].map(i => 
                                        <div className="skill_level" key={'level'+i}>{i}</div>
                                    )
                                }
                            </div>
                            {this.skillTreeTdView()}
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default injectIntl(Skill);