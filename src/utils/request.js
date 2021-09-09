import axios from 'axios'
import qs from 'QS'
import router from './../../src/router/index'

export default {
  $post (url, params, success, that) {
    axios.post(url,
      qs.stringify(
        params
      ),
      {
        headers: {
          'Authorization': this.localStorageGet('token')
        }
      }
    ).then((res) => {
      if (res.data.code === '200') {
        success(res)
      } else {
        this.todoError(res, that)
      }
    }).catch(function (error) {
      console.log(error)
    })
  },
  $postFileList (url, fileList, params, success, that) {
    axios.post(url, fileList,
      {
        params: params,
        headers: {
          'Authorization': this.localStorageGet('token'),
          'Content-Type': 'multipart/form-data'
        }
      }
    ).then((res) => {
      if (res.data.code === '200') {
        success(res)
      } else {
        this.todoError(res, that)
      }
    }).catch(function (error) {
      console.log(error)
    })
  },
  $get (url, params, success, that) {
    axios.get(url,
      {
        params: params,
        headers: {
          'Authorization': this.localStorageGet('token')
        }
      }
    ).then((res) => {
      if (res.data.code === '200') {
        success(res)
      } else {
        this.todoError(res, that)
      }
    }).catch(function (error) {
      console.log(error)
    })
  },
  localStorageSet: function (key, value, ttl) {
    localStorage.setItem(key, qs.stringify({
      value: value,
      exp: new Date(new Date().getTime() + ttl).getTime()
    }))
  },
  localStorageGet: function (key) {
    // 若过期则删除
    let data = qs.parse(localStorage.getItem(key))
    if (data !== null) {
      if (data.exp != null && data.exp < new Date().getTime()) {
        localStorage.removeItem(key)
      } else {
        return data.value
      }
    }
    return null
  },
  todoError (res, that) {
    if (res.data.code === '401') {
      localStorage.removeItem('token')
    } else {
      this.message(that, res.data.message, 'error');
      this.closeFullScreen(this.openFullScreen(that));
    }
  },
  message (that, message, type) {
    that.$message({
      message: message,
      type: type
    })
  },
  // Loading加载
  openFullScreen (that) {
    const loading = that.$loading({
      lock: true,
      text: '操作执行中，请稍后',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    return loading;
  },
  closeFullScreen (loading) {
    loading.close();
  }
}
