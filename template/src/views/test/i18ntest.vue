<template lang="html">
  <div>
    <h1>  \{{$tp("title")}}</h1>
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item :label="$tp('form.age')" prop="age">
        <el-input v-model.number="ruleForm2.age"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">\{{$tp('form.submit')}}</el-button>
        <el-button @click="resetForm('ruleForm2')">\{{$tp('form.reset')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
  var checkAge = (rule, value, callback) => {
    if (!value) {
      return callback(new Error(this.$i18n.tp('message.notNull')));
    }
    setTimeout(() => {
      if (!Number.isInteger(value)) {
        callback(new Error(this.$i18n.tp('message.notNumber')));
      } else {
        if (value < 18) {
          callback(new Error(this.$i18n.tp('message.minNumber')));
        } else {
          callback();
        }
      }
    }, 1000);
  };
  return {
    ruleForm2: {
       pass: '',
       checkPass: '',
       age: ''
     },
     rules2: {
       age: [
         { validator: checkAge, trigger: 'blur' }
       ]
     },
    lang: this.$i18n.loadedLang.lang
  };
},
computed: {
  langs () {
    return this.$i18n.locale;
  }
},
watch: {
  langs () {
     this.$refs['ruleForm2'].clearValidate();
  }
},
methods: {
   submitForm(formName) {
     this.$refs[formName].validate((valid) => {
       if (valid) {
         alert('submit!');
       } else {
         console.log('error submit!!');
         return false;
       }
     });
   },
   resetForm(formName) {
     this.$refs[formName].resetFields();
   }
 }
};
</script>

<style lang="css">
</style>
