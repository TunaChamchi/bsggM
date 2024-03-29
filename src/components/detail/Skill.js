import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { getSkill, getCharacter, getWeaponType } from 'lib/data';

class Skill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skill: ['T', 'Q', 'W', 'E', 'R', 'D'],
            skillTree: [],
            skillTreeFocus: 0,
        };
    }
    
    componentDidUpdate(prevProps, prevState) {
        const { parameter } = this.props;
        if (parameter['gameMode'] !== prevProps.parameter['gameMode'] 
            || parameter['bestWeapon'] !== prevProps.parameter['bestWeapon']) {
            this.setState({skillTreeFocus: 0});
        }
    }

    skillTreeTabHandler = (idx) => {
        this.setState({skillTreeFocus: idx});
    };
    skillTreeTabView = () => {
        const { intl, stat, skillTree } = this.props;
        const { skillTreeFocus } = this.state;

        const list = [...skillTree];
        
        return list.slice(0, 4).map((tree, idx) => 
            <div className='skill_tabs' key={'treeTab'+idx} 
                onClick={(e) => this.skillTreeTabHandler(idx)}>
                <div className={"skill_tab" + (idx===skillTreeFocus ? ' actived' : '')}  >
                    <div className="skill_tab_imgbox">
                        {
                            tree['tree'].map((skill, idx) => 
                                <div className={"skill_tab_"+skill} key={"skill_tab_"+idx}>{skill}</div>
                            )
                        }
                        <span className="skill_tab_mark1">&gt;</span>
                        <span className="skill_tab_mark2">&gt;</span>
                        <span className="skill_tab_mark3">&gt;</span>
                    </div>
                    <div className='skill_tab_span'>
                        <span className='skill_tab_span1'>{intl.formatMessage({id: 'pickRate'})} {(tree['pick']*100).toFixed(1)}%</span>
                        <span className='skill_tab_span2'>{intl.formatMessage({id: 'winRate'})} {(tree['win']/tree['total']*100).toFixed(1)}%</span>
                        <span className='skill_tab_span3'>{tree['total']}</span>
                    </div>
                </div>
            </div>
        )
    }
    skillTreePick = () => {
        const { stat, skillTree } = this.props;
        const { skillTreeFocus } = this.state;
        
        const tree = skillTree[skillTreeFocus]['tree'];

        return tree.map((name, idx) => 
            <div className={"skill_span skill_" + name} key={'tr'+idx} >
                {name}
            </div>
        )
    }
    skillTreeTdView = () => {
        const { intl, parameter } = this.props;
        const { skill } = this.state;
        
        const character = getCharacter(parameter['character'])['name'];
        return skill.slice(0, 5).map((name, idx) =>
            <div className='skill_td' key={'td'+idx}>
                {this.skillTreeTrView(name)}
            </div>
        )
    }

    skillTreeTrView = (name) => {
        const { stat, skillTree, skillTree2 } = this.props;
        const { skillTreeFocus } = this.state;

        return skillTree[skillTreeFocus]['order'].map((_name, idx) =>
            <div className={"skill_tr" + (_name===name ? ' skill_'+name : '')} key={'tr'+idx} 
                dangerouslySetInnerHTML={ {__html: _name===name ? name : '&nbsp;'} }>
            </div>
        )
    }

    render() {
        const { intl, parameter } = this.props

        const bestWeapon = getWeaponType(parameter['bestWeapon'])
        return (            
            <div className="S_Skill">
                <div className="S_Skill2">
                    <span>{intl.formatMessage({ id: 'detail.스킬트리' })}</span>
                </div>
                <div className="skill_tree_tab">
                    {this.skillTreeTabView()}
                </div>
                <div className="skill_centent">
                    <div className="skill_imgbox">
                        {this.skillTreePick()}
                        <span className="skill_mark1">&gt;</span>
                        <span className="skill_mark2">&gt;</span>
                        <span className="skill_mark3">&gt;</span>
                    </div>
                    <div className="skill_box0">
                        <div className='skill_td'>
                            {
                                [...Array.from({length: 20}, (v,i) => i+1)].map(i => 
                                    <div className="skill_level" key={'level'+i}>{i}</div>
                                )
                            }
                            
                        </div>
                        {this.skillTreeTdView()}
                    </div>
                </div>
            </div>
        );
    };
}

export default injectIntl(Skill);