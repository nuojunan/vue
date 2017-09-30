<template>
  <header>
    <a href="#" class="page-back router-link-active"  @click="back()"><i class="mintui mintui-back"></i></a>
    <h1 class="page-title" v-text="title"></h1>
  </header>
</template>
<script>
export default {
  props: {
    title: String
  },
  methods: {
    back () {
      this.$router.go(-1);
    }
  }
};
</script>
<style>
.page-title {
    font-size: 20px;
    margin: 20px auto;
    text-align: center;
    display: block;
    line-height: 1;
}
a:active, a:hover {
    outline-width: 0;
}
a {
    color: inherit;
}
.page-back {
    display: inline-block;
    top: 12px;
    left: 10px;
    position: absolute;
    width: 40px;
    height: 40px;
    text-align: center;
}
.page-back i {
    font-size: 24px;
    line-height: 40px;
}

</style>
