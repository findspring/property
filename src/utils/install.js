import axios from 'axios';
import Vue from 'vue';
import qs from 'qs';

axios.interceptors.request.use(config => {
	const _this = new Vue();
	return config
},error => {
	return Promise.reject(error)
})
axios.interceptors.response.use((res) => {
	const _this = new Vue();
	// 根据返回的code值做不同处理（和后台约定）
	switch (res.data.errCode) {
		case '0':
			return res
		case '8002':
			location.href = res.data.errMsg;
			return 
		case '8888':
			location.href = res.data.errMsg;
			return 
		case '0':
			return res
		case '9000':
			return _this.$vux.toast.text(res.data.errMsg,'middle')
		default:
			// statements_def
			break;
	}
},(err) => {
	if(err && err.response){
		switch (err.response.status) {
			case 400:
				err.message = '请求错误'
				break;
			case 401:
				err.message = '未授权，请登录'
				break;
			case 403:
				err.message = '拒绝访问'
				break;
			case 404:
				err.message = `请求地址出错: ${err.response.config.url}`
				break;
			case 408:
				err.message = '请求超时'
				break;
			case 500:
				err.message = '服务器内部错误'
				break;
			case 501:
				err.message = '服务未实现'
				break;
			case 502:
				err.message = '网关错误'
				break;
			case 503:
				err.message = '服务不可用'
				break;
			case 504:
				err.message = '网关超时'
				break;
			case 505:
				err.message = 'HTTP版本不受支持'
				break;
			default:
				// statements_def
				break;
		}
	}
	_this.$vux.toast.text(err.message,'middle');
	return Promise.reject(err);
})

export default {
	install: function(Vue,options){
		Vue.prototype.$http = axios;
		Vue.prototype.$axios = axios;
		Vue.prototype.$qs = qs;
		Vue.prototype.$road = process.env.road;		
	}
}