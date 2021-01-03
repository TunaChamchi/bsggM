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
            </div>
        );
    };
}

export default injectIntl(Skill);