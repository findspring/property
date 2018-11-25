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
    zh_CN:field => field + '输入格式有误',
  },
  validate: value => {
    return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
  }
});

Validator.extend('valcode', {
  messages: {
    zh_CN:field => field + '必须为4为数字',
  },
  validate: value => {
    return /^\d{4}$/.test(value)
  }
});
Validator.extend('house', {
  messages: {
    zh_CN:field => field + '不能超出10个字',
  },
  validate: value => {
    return /^\{10}$/.test(value)
  }
});