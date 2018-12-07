/**
 * @class
 * @classdesc 网络请求 */

import axios from 'axios'

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
    method: method,
    data: data,
    params: params,
    headers: headers
  }

  // 测试数据
  console.log(request)
  setTimeout(() => {
    options.success({
      status: true,
      data: {
        uid: '1'
      },
      msg: ''
    })
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

/*class XHR {




  /!**
   * @function
   * @description 请求完成后自定义操作
   * httpResponse(res)  需要使用时再定义
   * *!/

  /!**
   * @function
   * @description 请求成功
   * *!/
  success (res) {
    //  new Vue().$message.error(res.data.errmsg || '请求成功')
  }

  /!**
   * @function
   * @description 请求失败
   * *!/
  error (res) {
   // new Vue().$message.error(res.msg || '请求失败')
  }

  /!**
   * @function
   * @description 网络错误 *!/
  netError(res) {

  }

  /!**
   * @function
   * @description 检查errcode
   * *!//!*
  checkErrorCode(code) {
    let that = this
    switch(code) {
      case 40203:  //如果token过期重新请求
        localStorage.removeItem('AccessToken')

        if(that.count < 3) {
          that.httpRequest()
        }else {
          new Vue().$message.error(this.errcode[code] || 'token 请求失败')
          setTimeout(()=>{
            window.location.href = `/login.html`
          }, 2000)
        }

        /!* if(that.count < 3) {
         let x = new Token({
         request: {
         url: this.request.url,
         method: this.request.method
         }
         })
         x.getTokenFailed = res => {
         new Vue().$message.error(this.errcode[code] || 'token 请求失败')
         setTimeout(()=>{
         window.location.href = `/login.html`
         }, 2000)
         }
         x.httpSuccess = (res) => {
         x.count = 0
         localStorage.setItem('AccessToken', res.data.AccessToken)
         if(that.count < 3) {
         that.httpRequest()
         }else {
         new Vue().$message.error(this.errcode[code] || '无效的客户端，请重新登录或稍候重试')
         setTimeout(()=>{
         window.location.href = `/login.html`
         }, 2000)
         }
         }
         x.httpRequest()
         }*!/

        break;
      case 40210:   //  没有权限
        if(!!this.errcode[code])new Vue().$message.error(this.errcode[code])
        break;
      case 40211:   //  账号在其他地方登录
      case 40205:   //  需要登录
      case 40206:   //  登录已过期
        if(!!this.errcode[code])new Vue().$message.error(this.errcode[code])
        localStorage.removeItem('Authorization')
        localStorage.removeItem('username')
        localStorage.removeItem('permission')
        localStorage.removeItem('AccessToken')

        setTimeout(()=>{
          window.location.href = `/login.html`
        }, 2000)
        break;
      default: break;
    }
  }*!/
}*/


/*

this.$http({
  url: '',
  method: 'get',
  data: {

  },
  success: (data) => {

  },
  error: (data) => {

  }


})

*/
