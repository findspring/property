//列表数据转换，显示字段和新增字段不一致情况下
const convert = function(data, showParas, showFlag, checkboxId) {
	var showList = data.showList = {};
	var dataList = data.dataList;
	showList.paras = showParas;
	showList.data = showFlag ? extract(showParas, true) : dataList;
	data.checkAll = checkboxId ? extract(showParas, false) : void 0;

	data.totolPage = Math.ceil(data.total / data.expectSize);

	function extract(paras, flag) {
		let item = [];
		if (flag) {
			for (let i = 0; i < dataList.length; i++) {
				let a = dataList[i];
				let b = {};
				for (let p in paras) {
					if (p in a) {
						b[p] = a[p];
					}
				}
				item.push(b);
			}
		} else {
			for (let i = 0; i < dataList.length; i++) {
				let a = dataList[i][checkboxId];
				if (a || a === 0) {
					item.push(a);
				}
			}
		}

		return item;
	}
	return data
};

//输入内容过滤xss
const xssFliter = {
	userNameFilter: function(userName, min, max) {
		var reg = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/g;
		var reg2 = /[·【】；”“‘’，。、！￥……（）——{}：“《》？]/g;
		if (reg.test(userName) || reg2.test(userName)) {
			return {
				boo: false,
				errorTxt: '用户名不能含有中文'
			};
		} else if (userName.length < min || userName.length > max) {
			return {
				boo: false,
				errorTxt: '用户名长度为' + min + '-' + max + '个字符'
			};
		} else {
			return {
				boo: true,
				errorTxt: ''
			};
		}
	},
	commonFilter: function(value, min, max) {

		if (value.length < min || value.length > max) {
			return false;
		} else {
			return true;
		}
	},
	descFilter: function(value, min, max) {
		if (value.length > 20) {
			return false;
		} else {
			return true;
		}
	},
	numFilter: function(value, min, max) {
		var val = parseFloat(value);
		if (!(val && val < max && val > min)) {
			return false;
		} else {
			return true;
		}
	},
	mobileFilter: function(mobile, min, max) {
		if (!RegExp("^0?(13|15|17|18|14)[0-9]{9}$").test(mobile) || mobile.length > 11) {
			return false;
		} else {
			return true;
		}
	},
	emailFilter: function(email, min, max) {
		var pattern = /^([a-zA-Z0-9_-])+([\w-\.]+)+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
		if (!pattern.test(email) || email.length > 35) {
			return false;
		} else {
			return true;
		}
	},
	postCodeFilter: function(postCode, min, max) {
		if (/^[0-9]\d{5}$/.test(postCode)) {
			return true;
		} else {
			return false;
		}
	}
};

const param = function(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}
//获取url参数
const getQuery = function(name) {
	const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	const r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}
const getQueryString = function(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return "";
}
//对象obj的深度复制
const objDeepCopy = function(source) {
	const obj = {};
	for (let key in source) {
		obj[key] = typeof source[key] === 'object' && source[key] ? objDeepCopy(source[key]) : source[key];
	}
	return obj;
}

// 日期格式化
const dateFormat = function(date,fmt){   
  var o = {   
    "M+" : date.getMonth()+1,                 //月份   
    "d+" : date.getDate(),                    //日   
    "h+" : date.getHours(),                   //小时   
    "m+" : date.getMinutes(),                 //分   
    "s+" : date.getSeconds(),                 //秒   
    "q+" : Math.floor((date.getMonth()+3)/3), //季度   
    "S"  : date.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}  

//时间格式转化
//2014-12-03T03:01:00.000Z => 2014-12-03 03:01:00
const dateTimeConvert = function(dateTime,type,isSecond) {
	if (dateTime === "") {
		return dateTime;
	}
	let date = new Date(dateTime).toLocaleDateString().replace(/\//g, "-");
	const a = date.split("-");
	if(type == 1){		
		date = a[0] + '-' + (a[1].length === 2 ? a[1] : ("0" + a[1].toString())) + '-' + (a[2].length === 2 ? a[2] : ("0" + a[2].toString()));
		const time = dateTime.toString().match(new RegExp(/\d{2}:\d{2}:\d{2}/));
		const actural = time && time[0] || '';
	  if(isSecond){
	    return date + ' ' + actural;
	  }else{
	    return date
	  }
	}else if(type == 2){
		date = (a[1].length === 2 ? a[1] : ("0" + a[1].toString())) + '月' + (a[2].length === 2 ? a[2] : ("0" + a[2].toString())) +'日';
		return date
	}	
}

// 金额格式化
const numberFloat = function(data){
	if(data!=null){
    return data.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
  }else{
    return ;
  }
}

//vue的mixin混合
const mixin = {
	methods: {
		inputCheck(type, objName, property, error, min, max) {
			min = min || 0;
			max = max || 100000;
			var that = this;
			var val = objName ? that[objName][property] : that[property];

			if (type === 'num' && (/[0-9]/g).test(val)) {
				objName ? that[objName][property] = parseFloat(that[objName][property]) : that[property] = parseFloat(that[property]);
			}

			if (type === 'userName') {
				var check = xssFliter[type + 　"Filter"](val, min, max);
				if (!check.boo) {
					that.checkError[error] = true;
					that.checkError[error + 'Txt'] = check.errorTxt;
					return false;
				} else {
					that.checkError[error] = false;
				}
			} else {
				if (!xssFliter[type + 　"Filter"](val, min, max)) {
					that.checkError[error] = true;
					return false;
				} else {
					that.checkError[error] = false;
				}
			}

			return true;
		},
		confirm(txt) {
			this.$confirm(txt, '提示', {
				confirmButtonText: '我知道了',
				showCancelButton: false,
				closeOnClickModal: false,
				type: 'warning',
			}).catch(() => {

			});
		},
		warning(txt, url) {
			this.$confirm(txt, '提示', {
				confirmButtonText: '我知道了',
				showCancelButton: false,
				closeOnClickModal: false,
				type: 'warning',
				beforeClose: (action, instance, done) => {
					window.location.href = url;
					done();
				}
			}).then(() => {
				window.location.href = url
			}).catch(() => {

			});
		}
	}
}

//获取cookie
const getCookie= function (name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg)){
    return (arr[2]);
  }
  else{
    return null;
  }
}

//设置cookie,增加到vue实例方便全局调用
const setCookie= function  (c_name, value, expiredays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
};

//删除cookie
const delCookie= function (name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};

const trigger = function (eventName,ClassOrId){
//IE
  if(document.all) {
    document.querySelector(ClassOrId).click()
  }
// 其它浏览器
  else {
    var e = document.createEvent("MouseEvents")
    e.initEvent(eventName, true, true)　　　　　　　　　　　　　//这里的eventName可以换成你想触发的行为
    document.querySelector(ClassOrId).dispatchEvent(e)　　　//这里的ClassOrId可以换成你想触发行为的DOM结点class或ID
  }
}


export default {
	convert,
	xssFliter,
	getQuery,
	objDeepCopy,
	dateTimeConvert,
	numberFloat,
	mixin,
  getQueryString,
  getCookie,
  setCookie,
  delCookie,
  trigger,
  param,
  dateFormat
}
