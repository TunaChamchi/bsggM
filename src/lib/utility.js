import ko from 'locale/ko';
import en from 'locale/en';
import scn from 'locale/scn';
import jp from 'locale/jp';
import tcn from 'locale/tcn';
import pt from 'locale/pt';

export const locale = {
    "ko": {
        name: '한국어',
        data: ko
    },
    "en": {
        name: 'English',
        data: en
    },
    "jp": {
        name: '日本語',
        data: jp
    },
    "scn": {
        name: '简体中文',
        data: scn
    },
    "tcn": {
        name: '繁體中文',
        data: tcn
    },
    "pt": {
        name: 'Português',
        data: pt
    },
};

// 저장되어 있는 언어 데이터를 가져온다
export const defaultLang = () => {
    const lang = localStorage.getItem('lang') || 'ko';

    return locale[lang] ? lang : 'ko';
}

export const changeLang = (lang) => {
    localStorage.setItem("lang", lang);
    window.location.reload();
}

export const charList = () => {    
    const charList = locale[defaultLang()]['data']['characters'];

    const list = [];
    for (const key in charList) {
        const data = {
            key: key,
            name: charList[key]
        };
        list.push(data);
    }

    return list;
}
