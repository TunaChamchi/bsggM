import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { Version, getCharacter, getWeaponType } from 'lib/data';

class Top extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tierColor: ['#007fd3', '#00d3b7', '#d38900', '#8b8b8b', '#583900']
        };
    }

    weaponListView = () => {
        const { stat, weaponData, parameter } = this.props;

        weaponData['weaponList'].sort((a, b) => b['total'] - a['total']);
        
        return weaponData['weaponList'].map((weapon, idx) => {
            const pick = (weapon['total'] / weaponData['weaponTotal'] * 100).toFixed(0);
            const name = getWeaponType(weapon['code']);

            return (
                <Link to={'Detail?gameMode='+parameter['gameMode']+'&character='+parameter['character']+'&bestWeapon='+weapon['code']} key={'weaponList' + idx}>
                    <div className={'tabHeader4 ' + (weapon['code'] === stat['bestWeapon'] ? 'actived' : '')}>
                        <img className="S_top-weapon1" src={'img/Weapons/' + name + '.jpg'} />
                        <span className="S_top-weapon2">{pick}%</span>
                    </div>
                </Link>
            )
        });
    }

    render() {
        const { intl, stat, tier, parameter } = this.props;
        const { tierColor } = this.state;

        const character = getCharacter(stat['characterNum']);
        const name = character['name'];
        const statlv = character['levelUp'];

        const _tier = tier[(parameter['gameMode']-1)]['tier'][stat['characterNum']][parameter['bestWeapon']]['tier']
        const img_char = 'img/Characters/' + name + '.jpg';
        const img_tier = 'img/Tier/'+_tier+'티어2.png'

        return (
            <div className="S_top">
                <div className="S_top-cha">
                    <img className="S_top-cha1" style={{border:"3px solid "+ tierColor[_tier-1]}} src={img_char} />
                    <img className="S_top-cha2" src={img_tier} />
                </div>
                <div className="S_top-box">  
                    <span className="S_top-cha3">{intl.formatMessage({id: 'characters.'+name})}</span>
                    <div className="tabHeaders2">
                    {this.weaponListView()}
                    </div>
                </div>
            </div>
        );
    };
}

export default injectIntl(Top);