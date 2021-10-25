// Core
import Vue from 'vue';
// Libs
import VueI18n from 'vue-i18n';
// Config
import messages from '@/plugins/i18n/locales/en';

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en',
  messages: {
    en: messages,
  }, // set locale messages
});

const loadedLanguages = ['en']; // our default language that is preloaded

function setI18nLanguage(lang) {
  i18n.locale = lang;

  return lang;
}

export function loadLanguageAsync(lang) {
  // If the same language
  if (i18n.locale === lang) {
    return Promise.resolve(setI18nLanguage(lang));
  }

  // If the language was already loaded
  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang));
  }

  // If the language hasn't been loaded yet
  /* eslint-disable prefer-template */
  return import(/* webpackChunkName: "lang-[request]" */ '@/plugins/i18n/locales/' + lang + '.js').then((_messages) => {
    i18n.setLocaleMessage(lang, _messages.default);
    loadedLanguages.push(lang);

    return setI18nLanguage(lang);
  });
  /* eslint-enable */
}
