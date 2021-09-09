<template>
  <!-- Start wrapper-->
  <div id="wrapper">
    <!--Start sidebar-wrapper-->
    <div id="sidebar-wrapper" data-simplebar="" data-simplebar-auto-hide="true">
      <div class="brand-logo">
          <img src="../assets/images/logo-icon.png" alt="logo icon" style="height: 31px;width: 16px;margin-right: 5px">
          <h5 class="logo-text">企业设备终端守护专家</h5>
      </div>
      <div class="user-details">
        <!--<div class="media align-items-center user-pointer collapsed" data-toggle="collapse" data-target="#user-dropdown">-->
          <!--<div class="avatar"></div>-->
          <!--<div class="media-body">-->
            <!--<h6 class="side-user-name">系统管理员</h6>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div id="user-dropdown" class="collapse">-->
          <ul class="user-setting-menu" style="margin-top: 0px">
            <!--<li><a><i class="icon-user"></i>管理员档案</a></li>-->
            <!--<li><a><i class="icon-settings"></i>设置</a></li>-->
            <li @click="tologin"><a href="javascript:void(0);" style="color: #f5365c"><i class="icon-power"></i>注销</a></li>
          </ul>
        <!--</div>-->
      </div>
      <ul class="sidebar-menu do-nicescrol">
        <li class="sidebar-header">管理中心</li>
        <li>
          <a class="waves-effect">
            <i class="zmdi zmdi-map"></i> <span>数据中心</span><i class="fa fa-angle-left pull-right"></i>
          </a>
          <ul class="sidebar-submenu">
            <li><router-link tag="a" to="/centercart"><i class="zmdi zmdi-long-arrow-right"></i>个人数据中心</router-link></li>
            <li><router-link tag="a" to="/equipcart"><i class="zmdi zmdi-long-arrow-right"></i>设备数据中心</router-link></li>
            <li><router-link tag="a" to="/usercart"><i class="zmdi zmdi-long-arrow-right"></i>人员数据中心</router-link></li>
          </ul>
        </li>
        <li>
          <a class="waves-effect">
            <i class="zmdi zmdi-view-dashboard"></i> <span>系统管理</span><i class="fa fa-angle-left pull-right"></i>
          </a>
          <ul class="sidebar-submenu">
            <li><router-link tag="a" to="/rolelist"><i class="zmdi zmdi-long-arrow-right"></i>角色管理</router-link></li>
            <li><router-link tag="a" to="/roleauthority"><i class="zmdi zmdi-long-arrow-right"></i>角色权限管理</router-link></li>
            <li><router-link tag="a" to="/authorityinterface"><i class="zmdi zmdi-long-arrow-right"></i>权限接口管理</router-link></li>
          </ul>
        </li>
        <li>
          <router-link tag="a" to="/guardlist" class="waves-effect">
            <i class="zmdi zmdi-store"></i> <span>门禁管理</span>
          </router-link>
        </li>
        <li>
          <router-link tag="a" to="/taglist" class="waves-effect">
            <i class="zmdi zmdi-label-alt"></i> <span>标签管理</span>
          </router-link>
        </li>
        <li>
          <router-link tag="a" to="/equiplist" class="waves-effect">
            <i class="zmdi zmdi-device-hub"></i> <span>设备管理</span>
          </router-link>
        </li>
        <li>
          <a class="waves-effect">
            <i class="zmdi zmdi-email"></i><span>安全中心</span><i class="fa fa-angle-left pull-right"></i>
          </a>
          <ul class="sidebar-submenu">
            <li><router-link tag="a" to="/forminbox"><i class="zmdi zmdi-long-arrow-right"></i>门禁警报表单</router-link></li>
            <!--<li><router-link tag="a" to="/inbox"><i class="zmdi zmdi-long-arrow-right"></i>查阅通知</router-link></li>-->
            <li><router-link tag="a" to="/equipinform"><i class="zmdi zmdi-long-arrow-right"></i>设备流转表单</router-link></li>
          </ul>
        </li>
        <li>
          <a class="waves-effect">
            <i class="zmdi zmdi-format-list-bulleted"></i> <span>人员信息管理</span><i class="fa fa-angle-left pull-right"></i>
          </a>
          <ul class="sidebar-submenu">
            <li><router-link tag="a" to="/userlist"><i class="zmdi zmdi-long-arrow-right"></i>基本信息管理</router-link></li>
            <li><router-link tag="a" to="/rolelist1"><i class="zmdi zmdi-long-arrow-right"></i>企业管理员</router-link></li>
            <li><router-link tag="a" to="/rolelist2"><i class="zmdi zmdi-long-arrow-right"></i>设备管理员</router-link></li>
            <li><router-link tag="a" to="/rolelist3"><i class="zmdi zmdi-long-arrow-right"></i>系统装维员</router-link></li>
            <li><router-link tag="a" to="/rolelist4"><i class="zmdi zmdi-long-arrow-right"></i>普通用户</router-link></li>
          </ul>
        </li>
        <li>
          <a class="waves-effect">
            <i class="zmdi zmdi-layers"></i>
            <span>人员审批管理</span> <i class="fa fa-angle-left pull-right"></i>
          </a>
          <ul class="sidebar-submenu">
            <li><router-link tag="a" to="/checkedlist"><i class="zmdi zmdi-long-arrow-right"></i>审批申请</router-link></li>
            <!--<li><router-link tag="a" to="/uncheckedlist"><i class="zmdi zmdi-long-arrow-right"></i>未审批</router-link></li>-->
          </ul>
        </li>
        <li>
          <a class="waves-effect">
            <i class="zmdi zmdi-card-travel"></i>
            <span>设备盘点管理</span>
            <i class="fa fa-angle-left pull-right"></i>
          </a>
          <ul class="sidebar-submenu">
            <li><a href="#"><i class="zmdi zmdi-long-arrow-right"></i>报废状态</a></li>
            <li><a href="#"><i class="zmdi zmdi-long-arrow-right"></i>维修状态</a></li>
            <li><a href="#"><i class="zmdi zmdi-long-arrow-right"></i>损坏遗失</a></li>
            <li><a href="#"><i class="zmdi zmdi-long-arrow-right"></i>更新状态</a></li>
            <li><a href="#"><i class="zmdi zmdi-long-arrow-right"></i>正常状态</a></li>
          </ul>
        </li>
      </ul>

    </div>
    <!--End sidebar-wrapper-->
  </div>
</template>

<script>
import request from '../utils/request'
export default {
  name: 'Sidebar',
  inject: ['reload'],
  data () {
    return {
      isCollapse: true
    };
  },
  methods: {
    tologin () {
      let _this = this;
      request.$post('/user/logout', {}, (res) => {
        console.log(res.data);
        request.localStorageSet('token', null);
        setTimeout(function () {
          _this.$router.push('/signin');
          location.reload();
        }, 3000)
        let message = res.data.message;
        request.message(_this, message, 'success');
      }, _this)
    }
  }
}
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .simplebar-scrollbar {
    position: absolute;
    right: 0px;
    width: 5px;
    min-height: 10px;
  }

  .simplebar-content{
    overflow-x: hidden
  }
</style>
