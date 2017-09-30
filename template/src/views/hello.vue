<template>
  <div  v-title data-title="hello">
    <h1>hello</h1>
    <p>{{msg}}</p>
    <ul>
      <li><router-link to="/demo">去往移动demo页 </router-link></li>
      <li><a href="https://vuejs.org" target="_blank">Vue.js 官网</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">讨论区</a></li>
    </ul>
    <h2>其他资料</h2>
    <ul>
      <li><a href="http://mint-ui.github.io/docs/#!/zh-cn">Mint UI 使用文档</a></li>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'hello',
  components: {
    //
  },
  created () {
    // 创建页面触发
  },
  activated () {
    // 激活页面除法
  },
  data () { // 数据
    return {
      msg: '欢迎使用！vue.js and Mint.ui'
    };
  },
  computed: {
     // 计算数据
   },
  watch: {
     // 数据变化过程
  },
  methods: {
    //
  }
};
</script>
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
