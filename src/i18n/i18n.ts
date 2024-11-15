// Project: 7612770651107e1659371833c56a9b25e733c4615968bb7c5582cdc92aa6249b
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enCommonTranslation from './languages/en/common.json';
import enLoginTranslation from './languages/en/login.json';
import vnCommonTranslation from './languages/vn/common.json';
import vnLoginTranslation from './languages/vn/login.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { login: enLoginTranslation, common: enCommonTranslation },
            vn: { login: vnLoginTranslation, common: vnCommonTranslation },
        },
        fallbackLng: localStorage.getItem('i18nextLng') || 'vn',
        lng: localStorage.getItem('i18nextLng') || 'vn',
        ns: ['common,login'],
        defaultNS: 'common',
        keySeparator: false,
        interpolation: {
            escapeValue: false,
            formatSeparator: ',',
        },
        react: {
            useSuspense: false,
            bindI18nStore: 'added',
        },
    });

export default i18n;
