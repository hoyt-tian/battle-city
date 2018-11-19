/**
 * 根据返回json创建错误
 * @param {*} res 
 */
const errResponse = (res) => {
  const err = new Error(res && res.errMsg || '')
  err.res = res
  return err
}

export const rpcSuccess = (res) => {
  if (res && res.success && res.code === '200') {
    return Promise.resolve(res)
  }
  return Promise.reject(errResponse(res))
}
export const rpcFail = (res) => Promise.reject(errResponse(res))

export const rpc = ({
  url,
  data = {},
  resolve = rpcSuccess,
  reject =  rpcFail,
}) => {
  return fetch(url, data).then(res => res.json(), reject).then(resolve, reject)
}