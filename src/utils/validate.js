import Vue from 'vue'
import VeeValidate, {Validator} from 'vee-validate'
import zh from 'vee-validate/dist/locale/zh_CN';//引入中文文件
 
// 配置中文
Validator.addLocale(zh);
 
const config = {
  locale: 'zh_CN'
};
 
Vue.use(VeeValidate,config);
 
// 自定义validate 
const dictionary = {
   zh_CN: {
      messages: {
        email: () => '请输入正确的邮箱格式1',
        required: ( field )=> "请输入" + field
      },
      attributes:{
        email:'邮箱',
        password:'密码',
        name: '账号',
        phone: '手机',
        valcode: '验证码'
      }
  }
};
 
Validator.updateDictionary(dictionary);
 
Validator.extend('phone', { //手机号
  messages: {
    zh_CN:field => '请输入11位的'+ field  ,
  },
  validate: value => {
    return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
  }
});

Validator.extend('valcode', { //验证码
  messages: {
    zh_CN:field => field + '必须为4为数字',
  },
  validate: value => {
    return /^\d{4}$/.test(value)
  }
});
Validator.extend('house', {  //社区地址、门牌号码
  messages: {
    zh_CN:field => field + '汉字、字母、数字且不能超出10个字',
  },
  validate: value => {
    // return /^[\u2E80-\u9FFF-Za-z0-9]{10}$/
    return /^[\u2E80-\u9FFF-ZA-Za-z0-9-]{1,10}$/.test(value)
  }
});

Validator.extend('realname', {  //姓名
  messages: {
    zh_CN:field => field + '需为2-8个汉字',
  },
  validate: value => {
    // return /^[\u2E80-\u9FFF-Za-z0-9]{10}$/
    return /^[\u4e00-\u9fa5]{2,8}$/.test(value)
  }
});

Validator.extend('sex', {  //性别
  messages: {
    zh_CN:field => '请选择'+field,
  },
  validate: value => {
    return /^[\u4e00-\u9fa5]{1,1}$/.test(value)
  }
});

Validator.extend('address', {  //地址
  messages: {
    zh_CN:field => field + '汉字、字母、数字且不能超出30个字',
  },
  validate: value => {
    return /^[\u2E80-\u9FFF-ZA-Za-z0-9-]{1,30}$/.test(value)
  }
});


Validator.extend('idNum', {  //身份证
  messages: {
    zh_CN:field => field + '信息格式有误',
  },
  validate: value => {
    // return /^[\u2E80-\u9FFF-Za-z0-9]{10}$/
    return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value)
  }
});

Validator.extend('relationShip', {  //与户主关系
  messages: {
    zh_CN:field => field + '需为2-8个汉字',
  },
  validate: value => {
    // return /^[\u2E80-\u9FFF-Za-z0-9]{10}$/
    return /^[\u4e00-\u9fa5]{2,8}$/.test(value)
  }
});






