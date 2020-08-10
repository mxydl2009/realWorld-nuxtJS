// 去除字符串中的零宽字符
export default function (str) {
  str = str.split('')
  str = str.filter(item => item.charCodeAt(0) < 8203 || item.charCodeAt(0) > 8207)
  return str.join('')
}
