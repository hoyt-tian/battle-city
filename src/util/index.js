/**
 * 从给定字符串中解析url参数，默认解析location.search
 */
export const parseQueryString = (search = location && location.search) => {
  if (typeof(search) !== typeof('')) throw new Error('param must be a string')
  if (search.length < 3) return {}
  const query = search[0] === '?' ? search.slice(1) : search
  const reg = /([^=&#]+)=([^&#]*)/ig
  let match = null
  const result = {}
  while (match = reg.exec(query)) {
    result[decodeURIComponent(match[1])] = decodeURIComponent(match[2]);
  }
  return result
}
