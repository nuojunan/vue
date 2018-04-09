import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { get, put } from '@/common/js/store';
import langs from './langs';
import router from '@/router';
import axios from 'axios';
import Element from 'element-ui';

Vue.use(VueI18n);
let defaultLanguage = 'zh-CN';
if (navigator.language) {
  defaultLanguage = navigator.language;
} else if (navigator.browserLanguage) {
  defaultLanguage = navigator.browserLanguage;
}
let local = get('system', 'local', defaultLanguage);
// message 存放过多会导致性能下降， 所以这么只放一个当前语言 @ldy
const messages = {};
try {
  messages[local] = require(`./langs/${local}.json`);
} catch (e) {
  console.error(e);
  local = defaultLanguage;
  messages[local] = require(`./langs/${local}.json`);
}
const i18n = new VueI18n({
  locale: local,
  messages
});

i18n.loadedLang = {
  lang: local,
  last: false,
  first: true,
  loadMore: {}
};
Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
});
function setI18nLanguage (lang) {
  put('system', 'local', lang); // 存放选择语言
  axios.defaults.headers.common['Accept-Language'] = lang;
  document.querySelector('html').setAttribute('lang', lang);
  return lang;
}

function loadLanguageAsync (lang) {
  if (i18n.loadedLang.lang !== lang) {
      if (langs.filter(l => l.lang === lang).length === 0) {
        console.error('undefind lang:', lang);
        return;
      }
      return import(/* webpackChunkName: "lang-[request]" */ `@/i18n/langs/${lang}.json`).then(msgs => {
        i18n.setLocaleMessage(i18n.loadedLang.lang, []);
        i18n.setLocaleMessage(lang, msgs);
        i18n.locale = lang;
        i18n.loadedLang.lang = lang;
        i18n.loadedLang.loadMore = {};
        // 加载最后文件
        if (i18n.loadedLang.last) {
          loadPageLanguageAsync(i18n.loadedLang.last);
        }
        return setI18nLanguage(lang);
      });
  }
  return Promise.resolve(lang);
}
// 异步加载
function loadPageLanguageAsync (page) {
  i18n.loadedLang.last = page;
  let key = path2key(page);
  if (!i18n.loadedLang.loadMore[key]) {
      return import(/* webpackChunkName: "lang-[request]" */ `@/i18n/langs/${page}/${i18n.locale}.json`).then(msgs => {
        let local = i18n.getLocaleMessage(i18n.locale);
        local[key] = msgs; // 添加页面语言包
        i18n.setLocaleMessage(i18n.locale, local);
        i18n.loadedLang.loadMore[key] = true;
        return Promise.resolve(page);
      });
  }
  return Promise.resolve(page);
}
// 同步加载
function loadPageLanguage (page) {
  i18n.loadedLang.last = page;
  let key = path2key(page);
  if (!i18n.loadedLang.loadMore[key]) {
      let local = i18n.getLocaleMessage(i18n.locale);
      local[key] = require(`./langs/${page}/${i18n.locale}.json`); // 添加页面语言包
      i18n.setLocaleMessage(i18n.locale, local);
      i18n.loadedLang.loadMore[key] = true;
  }
}
// 异步加载语言包
i18n.loadLanguageAsync = loadLanguageAsync;
// 异步加载页面语言包
i18n.loadPageLanguageAsync = loadPageLanguageAsync;

const path2key = path => {
  return path.replace(/\//g, '_');
};

/**
* 扩展tp方法，获取对应页面的多语言数据
* @ldy
*/
i18n.tp = function(key, values) {
  let path = i18n.loadedLang.last;
  if (path) {
     let pagekey = path2key(path) + '.' + key;
     let value = i18n.t(pagekey, values);
     return value === pagekey ? i18n.t(key, values) : value;
  }
  console.warn('router undefind meta.i18n');
  return i18n.t(key, values);
};
/**
* 扩展$tp方法，获取对应页面的多语言数据
* @ldy
*/
Object.defineProperty(Vue.prototype, '$tp', {
    get () {
      return (key, values) => {
        let path = this.$router.currentRoute.meta.i18n;
        if (path) {
          let pagekey = path2key(path) + '.' + key;
          let value = i18n.t(pagekey, values);
          return value === pagekey ? i18n.t(key, values) : value;
        }
        console.warn('router undefind meta.i18n');
        return i18n.t(key, values);
      };
    }
  });
/**
* 路由后置函数调用国际化加载语言包处理
* @ldy
*/
router.afterEach((to, from) => {
  if ('i18n' in to.meta) {
    if (i18n.loadedLang.first) {
      loadPageLanguage(to.meta.i18n);
      i18n.loadedLang.first = false;
    } else {
      loadPageLanguageAsync(to.meta.i18n);
    }
  } else {
    i18n.loadedLang.last = false;
  }
});
export default i18n;
