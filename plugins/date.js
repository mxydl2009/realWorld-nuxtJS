import Vue from 'vue'
import dayjs from 'dayjs'

// 创建一个用于处理时间日期的插件，注册一个date过滤器
// format参数表示输出的字符串的格式
Vue.filter('date', (date, format = 'YYYY-MM-DDHH:mm:ss') => {
  return dayjs(date).format(format)
})