import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import $  from  "jquery"
import moment from 'moment'
Vue.prototype.moment = moment;
Vue.prototype.date2Str =(date)=>{
  return moment(date).format("YYYY-MM-DD HH:mm");
};
import { message,notification} from 'ant-design-vue'
Vue.prototype.$message = message;
Vue.prototype.$notification = notification;
import css from  "ant-design-vue/lib/message/style/css"
import notificationcss from  "ant-design-vue/lib/notification/style/css"
//全局配置
$.ajaxSetup({
  beforeSend: function (jqXHR, settings) {
    //在请求前给修改url（增加一个时间戳参数）
    settings.url += settings.url.match(/\?/) ? "&" : "?";
    settings.url += "_tms=" + new Date().getTime();

  },
});
Vue.prototype.$ = $;
Vue.prototype.utils = require("./js/utils");
/**
 * 屏蔽傻逼输出
 * */
console.info=()=>{

}
window.app=new Vue({
  render: h => h(App),
}).$mount('#app')
