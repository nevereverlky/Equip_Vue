<template>
<div class="signin">
  <!-- Start wrapper-->
  <div id="wrapper">

      <div class="card-authentication2 mx-auto my-5">
          <div class="card-group">

              <div class="card mb-0">
                  <div class="bg-signin2"></div>
                  <div class="card-img-overlay rounded-left my-5">
                      <h1 class="text-white">Beta</h1>
                      <h3 class="text-white">企业设备终端守护专家</h3>
                      <p class="card-text text-white pt-3" style="margin-top: 30px">Beta企业设备终端守护专家（Enterprise Equipment Terminal Guard Expert）是非常通用的管理信息系统，使用它可以有效地管理设备资源、维护设备的正常运转，并能对追寻设备起到一个有效的辅助作用，从而提高工作效率。</p>
                  </div>
              </div>

              <div class="card mb-0 ">
                  <div class="card-body">
                      <div class="card-content p-3">
                          <div class="text-center">
                              <img src="../assets/images/logo-icon.png" alt="logo icon" style="width: 32px;height: 62px;">
                          </div>
                          <div class="card-title text-uppercase text-center py-3">登录</div>
                          <form>
                              <div class="form-group">
                                  <div class="position-relative has-icon-left">
                                      <label for="exampleInputUsername" class="sr-only">账号</label>
                                      <input type="text" v-model="loginForm.account" id="exampleInputUsername" class="form-control" placeholder="账号">
                                      <div class="form-control-position" style="padding-top: 20px">
                                          <i class="icon-user"></i>
                                      </div>
                                  </div>
                              </div>
                              <div class="form-group">
                                  <div class="position-relative has-icon-left">
                                      <label for="exampleInputPassword" class="sr-only">密码</label>
                                      <input type="password" v-model="loginForm.password" id="exampleInputPassword" class="form-control" placeholder="密码">
                                      <div class="form-control-position" style="padding-top: 20px">
                                          <i class="icon-lock"></i>
                                      </div>
                                  </div>
                              </div>
                              <button type="button" style="margin-top: 20px" @click.prevent="login" class="btn btn-primary btn-block waves-effect waves-light">登录</button>
                          </form>
                      </div>
                  </div>
              </div>

          </div>
      </div>

  </div>
</div>
</template>

<script>
import request from '../utils/request'
export default {
  name: 'Signin',
  data () {
    return {
      loginForm: {
        account: '',
        password: ''
      }
    };
  },
  methods: {
    login () {
      let _this = this;
      if (this.loginForm.account === '' || this.loginForm.password === '') {
        request.message(this, '账号或密码不能为空', 'warning');
      } else {
        request.$post('/user/login', {
          account: _this.loginForm.account,
          password: _this.loginForm.password
        }, (res) => {
          console.log(res.data);
          let message = res.data.message;
          let token = res.data.data.token;
          let systemNotice = res.data.data.systemNotice;
          let mailboxNotice = res.data.data.mailboxNotice;
          let wxOpenIdNotice = res.data.data.wxOpenIdNotice;
          request.localStorageSet('token', token);
          setTimeout(function () {
            localStorage.setItem('systemNotice', JSON.stringify(systemNotice))
            localStorage.setItem('mailboxNotice', JSON.stringify(mailboxNotice))
            localStorage.setItem('wxOpenIdNotice', JSON.stringify(wxOpenIdNotice))
            if (_this.$route.query.redirect) {
              _this.$router.push({path: decodeURIComponent(_this.$route.query.redirect)}) // 跳转到原页面
            } else {
              _this.$router.push({name: 'Index'});// 正常登录流程进入的页面
            }
            // _this.$router.push('/index');
            // _this.$router.push({ path: decodeURIComponent(url)})
            //   {
            //   path: '/index',
            //   name: 'Index',
            //   query: { notice: notice }
            //   // params: { notice: notice }
            // });
            location.reload();
          }, 2000)
          request.message(_this, message, 'success');
        }, _this)
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
