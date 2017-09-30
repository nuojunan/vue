import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Langs from './langs';
import { get } from '@/common/js/store';

Vue.use(VueI18n);

const messages = {};
for (let v = 0; v < Langs.length; v++) {
  // console.log(Langs[v]);
  var l = Langs[v].lang;
  try {
    messages[l] = require('./langs/' + l + '.json');
  } catch (e) {
    console.log(e);
  }
}

const i18n = new VueI18n({
  locale: get('system', 'local', 'zhCN'),
  messages
});

if (module.hot) {
  console.log('熱加載....');
  // module.hot.accept(['./langs/en.json', './langs/ja.json', './langs/zhCN.json'], () => {
  //   i18n.setLocaleMessage('en', require('./langs/en.json'));
  //   i18n.setLocaleMessage('ja', require('./langs/ja.json'));
  //   i18n.setLocaleMessage('zhCN', require('./langs/zhCN.json'));
  //   console.log('hot reload', this, arguments);
  // });
}

export default i18n;
