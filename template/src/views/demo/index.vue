<template>
  <div class="page-tabbar" v-title data-title="主页">
    <div class="page-wrap">
     <mt-tab-container class="page-tabbar-container" v-model="selected">
       <mt-tab-container-item id="主页">
        <h1 class="center">{{$t("hello.a")}}</h1>
        <div class="margin10">
          <mt-button class="page-part" size="large" @click.native="gotoPage('/demo/detail')" type="primary"> {{$t("index.btn[0]")}}</mt-button>
          <mt-button class="page-part" size="large" @click.native="openConfirm">{{$t("index.btn[1]")}}</mt-button>
        </div>
       </mt-tab-container-item>
       <mt-tab-container-item id="查询">
         <nja-query></nja-query>
       </mt-tab-container-item>
       <mt-tab-container-item id="语言">
         <img src="../../assets/img/logo.jpg" width="100%">
         <mt-radio align="left" class="page-part"   :title="$t('index.langMsg')" v-model="local" :options="langs" />
       </mt-tab-container-item>
     </mt-tab-container>
   </div>

   <mt-tabbar v-model="selected" fixed>
     <mt-tab-item id="主页">
       <img slot="icon" src="../../assets/img/icon.png">
       {{$t("index.tab[0]")}}
     </mt-tab-item>
     <mt-tab-item id="查询">
       <img slot="icon" src="../../assets/img/icon.png">
      {{$t("index.tab[1]")}}
     </mt-tab-item>
     <mt-tab-item id="语言">
       <img slot="icon" src="../../assets/img/icon.png">
       {{$t("index.tab[2]")}}
     </mt-tab-item>
   </mt-tabbar>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import Langs from '../../i18n/langs';
import { put } from '@/common/js/store';
import NjaQuery from './query';
const langs2 = [];
for (let v = 0; v < Langs.length; v++) {
  var l = Langs[v];
  langs2.push({ label: l.name, value: l.lang });
}

export default {
  name: 'index',
  components: {
    //
    NjaQuery
  },
  created () {
    // 创建页面触发
  },
  activated () {
    // 激活页面除法
  },
  data () { // 数据
    return {
      //
      local: this.$i18n.locale,
      langs: langs2,
      selected: '主页'
    };
  },
 computed: {
   // 计算数据
 },
 watch: {
   // 数据变化过程
   local (val) {
     this.$i18n.locale = val;
     put('system', 'local', val);
   }
 },
 methods: {
    // 我的方法
    lang (val) {
      this.$i18n.locale = val;
      put('system', 'local', val);
    },
    gotoPage (path) {
      this.$router.push(path);
    },
    openConfirm() {
       MessageBox.confirm('确定执行此操作?', '提示');
     }
  }
};
</script>
<style>
.page-tabbar {
  overflow: hidden;
  height: 100vh;
}
.page-wrap {
  overflow: auto;
  height: 100%;
  padding-bottom: 100px;
}
.page-part{
  margin-bottom: 10px;
}

.margin10{
  margin: 10px;
}
</style>
