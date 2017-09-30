<template>
  <div  v-title data-title="详情">
          <!-- <mt-header title="标题" fixed>
            <router-link to="/" slot="left">
              <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
          </mt-header> -->
          <nja-header title="标题"></nja-header>
          <div class="page-part">
            <mt-field label="用户名" placeholder="请输入用户名" :attr="{ maxlength: 10 }"></mt-field>
            <mt-field label="邮箱" placeholder="请输入邮箱" type="email"></mt-field>
            <mt-field label="密码" placeholder="请输入密码" type="password"></mt-field>
            <mt-field label="手机号" placeholder="请输入手机号" type="tel"></mt-field>
            <mt-field label="网站" placeholder="请输入网址" type="url"></mt-field>
            <mt-field label="数字" placeholder="请输入数字" type="number"></mt-field>
            <mt-field label="生日" placeholder="请输入生日" type="date"></mt-field>
            <mt-field label="自我介绍" placeholder="自我介绍" type="textarea" rows="4"></mt-field>
          </div>
          <div class="page-part">
            <mt-field label="用户名" placeholder="请输入用户名" :attr="{ maxlength: 10 }"></mt-field>
            <mt-field label="邮箱" placeholder="请输入邮箱" type="email"></mt-field>
            <mt-field label="密码" placeholder="请输入密码" type="password"></mt-field>
            <mt-field label="手机号" placeholder="请输入手机号" type="tel"></mt-field>
            <mt-field label="网站" placeholder="请输入网址" type="url"></mt-field>
            <mt-field label="数字" placeholder="请输入数字" type="number"></mt-field>
            <mt-field label="生日" placeholder="请输入生日" type="date"></mt-field>
            <mt-field label="自我介绍" placeholder="自我介绍" type="textarea" rows="4"></mt-field>
          </div>
          <div class="margin10">
            <mt-button class="page-part" size="large" @click.native="save()"  type="primary">保存</mt-button>
            <mt-button class="page-part" size="large"  type="danger">取消</mt-button>
          </div>
  </div>
</template>
<script>
import NjaHeader from '@/components/nja-header';
export default {
  name: 'common',
  components: {
    NjaHeader
  },
  methods: {
    save () {
      let that = this;
      that.$loading.open({
        text: '保存中...',
        spinnerType: 'fading-circle'
      });
      that.$ajax.post({
        url: 'http://www.baidu.com',
        data: {a: 'a'},
        success (response) {
          console.log(response);
            that.$loading.close();
        },
        error (err) {
          that.$loading.close();
          that.$message.alert('操作失败！' + err, '提示');
        }
      });
    }
  }
};
</script>
<style>
</style>
