/**
 * @class
 * @classdesc 网络请求 */

import axios from 'axios'

import obj from '@/plugin/test'





/**
 * @function
 * @description 请求方法 */


let http = (options) => {

  /** api 请求参数 */
    options = options || {}

  let url = options.url || ''
  let method = options.method || 'get'
  let data = options.data || {}
  let headers = options.headers || {}
  let params = {}

  // 请求
  if(method.match(/get|delete/) !== null) {
    params = data
  }

  let request = {
    url: url,
    method: 'post',
    data: url == '/upload' ? data : JSON.stringify(data),
    params: params,
    headers: headers
  }

  // 测试数据
  console.log(request)
  setTimeout(() => {
      let d = obj[request.url] || {}
      let res = {
        status: true,
        msg: ''
      }
      if(url == '/upload') {
        res.data = obj.img(request.data)
      }else if(['/api/list/hot', '/api/list/news', '/api/list/goodlist', '/api/list/address'].includes(url)) {
        res.data = d.data
        res.page = d.page
      }else if(['/api/list/orderlist'].includes(url)) {
        let type = data.type
        res.data = d.data[type]
        res.page = {
          totals: d.page[type]
        }
        console.log(type)
      }else {
        res.data = d
  //  console.log(res)
      }
    options.success(res)
  }, 500)

  return
  // 测试数据 结束


  let $http = axios.create()
  $http.defaults.timeout = 120000

  $http(request).then((res) => {
    if(typeof options.httpResponse === 'function') {
      options.httpResponse(res)
      return false
    }

    let d = res.data

    if(d.status) {
      options.success ? options.success(d) : success(d)
    }else {
      options.error ? options.error(d) : error(d)
    }
  }).catch(() => {
    let msg = {msg: '网络错误'}

    if(options.error) {
      options.error(msg)
    }else if(options.netError) {
      options.netError(msg)
    }else {
      netError(msg)
    }
  //  options.error ? options.error(d) : error(d)
   // options.netError ? options.netError(msg) : netError(msg)
  })




  /**
   * @function
   * @description 请求完成后自定义操作
   * httpResponse(res)  需要使用时再定义
   * */

  /**
   * @function
   * @description 请求成功
   * */
  let success = (res)=> {
    //  new Vue().$message.error(res.data.errmsg || '请求成功')
  }

  /**
   * @function
   * @description 请求失败
   * */
  let error = (res) => {
    // new Vue().$message.error(res.msg || '请求失败')
  }

  /**
   * @function
   * @description 网络错误 */
  let netError = (res) => {
   // new Vue().$message.error(res.msg || '网络失败')
  }

}

export default http


