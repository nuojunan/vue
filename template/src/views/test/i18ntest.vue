<template lang="html">
  <div>
    <h1>  \{{$tp("title")}}</h1>
    <el-form :model="ruleForm2" status-icon :rules="rules" :validate-on-rule-change="false" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item :label="$tp('form.name')" prop="name">
        <el-input v-model.number="ruleForm2.name"></el-input>
      </el-form-item>
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
var checkAge = (rule, value, callback) => {
  if (!value) {
    return callback(new Error(rule.messages.notNull));
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error(rule.messages.notNumber));
    } else {
      if (value < 18) {
        callback(new Error(rule.messages.minNumber));
      } else {
        callback();
      }
    }
  }, 1000);
};
export default {
  data() {
  return {
    ruleForm2: {
       pass: '',
       checkPass: '',
       age: ''
     },
    lang: this.$i18n.loadedLang.lang
  };
},
computed: {
  langs () {
    return this.$i18n.locale;
  },
  rules () {
    return {
      age: [
        { validator: checkAge,
          trigger: 'blur',
          messages: {
            notNull: this.$i18n.tp('message.notNull'),
            notNumber: this.$i18n.tp('message.notNumber'),
            minNumber: this.$i18n.tp('message.minNumber', [18])
        }}
      ],
      name: [
        { required: true,
          message: this.$i18n.tp('message.notNull')},
        { min: 3, max: 5, message: this.$i18n.tp('message.notNumber'), trigger: 'blur' }
      ]
    };
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
