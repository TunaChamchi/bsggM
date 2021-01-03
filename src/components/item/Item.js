import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Armor, itemBgI, statList, getItem, getWeaponType } from 'lib/data';
import armorData from 'data/inGame/armor.json';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            persentList1:['increaseSkillDamageRatio', 'attackSpeedRatio', 'lifeSteal', 
                'criticalStrikeChance', 'criticalStrikeDamage', 'hpRegenRatio', 'spRegenRatio', 
                'cooldownReduction'],
            persentList2:['increaseSkillDamageRatio', 'attackSpeedRatio', 'lifeSteal', 
                'criticalStrikeChance', 'criticalStrikeDamage', 'decreaseRecoveryToBasicAttack', 'decreaseRecoveryToSkill', 
                'preventBasicAttackDamaged', 'preventSkillDamagedRatio', 'hpRegenRatio', 'spRegenRatio', 
                'cooldownReduction'],
            exception:['decreaseRecoveryToBasicAttack', 'decreaseRecoveryToSkill']
        }
    }

    getItemStat = () => {
        const { intl, code } = this.props;
        const { persentList1, persentList2, exception } = this.state;

        const item = getItem(code);
        const list = Object.keys(item).filter(key => intl.formatMessage({id: 'stat.'+key}) !== 'stat.'+key );
        
        return list.map(key => 
            intl.formatMessage({id: 'stat.'+key}) + ' : '
            + (exception.includes(key) ? '-40': (persentList1.includes(key) ? (item[key]*100).toFixed(0) : item[key]))
            + (persentList2.includes(key) ? '%' : '') + '\n' 
        );
    }

    render() {
        const { intl, top, grade, item, tooltip, code } = this.props;

        return (
            <div className={top}>
                <img className={grade} src={"img/Item/BackGround/"+getItem(code)['itemGrade']+".jpg"}/>
                <img className={item} src={'img/Item/'+getItem(code)['name']+'.png'} />
                {
                    tooltip &&
                        <div className={tooltip}>
                            <span><b>{getItem(code)['name']}</b></span><br/>
                            <span>{this.getItemStat()}</span>
                        </div>
                }
            </div>
        );
    };
}

export default injectIntl(Item);