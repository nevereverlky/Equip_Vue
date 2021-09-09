<template>
  <div id="index">
    <Sidebar></Sidebar>
    <Topbar></Topbar>
    <router-view v-if="isRouterAlive"></router-view>
    <!--v-bind:notice="notice"-->
    <Backtotop></Backtotop>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import Backtotop from '../components/Backtotop'
export default {
  name: 'Index',
  components: {Backtotop, Topbar, Sidebar},
  provide () { // 注册一个方法
    return {
      reload: this.reload
      // notice: ''
    }
  },
  data () {
    return {
      isRouterAlive: true,
      timer: null
    }
  },
  // created () {
  //   // let notice = this.$route.params.notice;
  //   let notice = this.$route.query.notice;
  //   console.log(notice)
  //   this.notice = notice
  // },
  created () {
    let _this = this;
    // let notice = this.$route.query.notice;
    let systemNotice = JSON.parse(localStorage.getItem('systemNotice'));
    let mailboxNotice = JSON.parse(localStorage.getItem('mailboxNotice'));
    let wxOpenIdNotice = JSON.parse(localStorage.getItem('wxOpenIdNotice'));
    if (systemNotice) {
      this.timer = window.setTimeout(() => {
        _this.$notify({
          title: '系统异常提醒',
          message: systemNotice,
          position: 'bottom-right',
          type: 'warning',
          duration: 0
        });
      });
    }
    if (mailboxNotice) {
      this.timer = window.setTimeout(() => {
        _this.$notify({
          title: '邮箱推送异常提醒',
          message: mailboxNotice,
          position: 'bottom-right',
          type: 'warning',
          duration: 0
        });
      });
    }
    if (wxOpenIdNotice) {
      this.timer = window.setTimeout(() => {
        _this.$notify({
          title: '微小推送异常提醒',
          message: wxOpenIdNotice,
          position: 'bottom-right',
          type: 'warning',
          duration: 0
        });
      });
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style scoped>

</style>
