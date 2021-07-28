<template>
<div id="wrapper">
  <!--Start topbar header-->
  <header class="topbar-nav">
    <nav class="navbar navbar-expand fixed-top">
      <ul class="navbar-nav mr-auto align-items-center">
        <!--<li class="nav-item">-->
          <!--<a class="nav-link toggle-menu" href="javascript:void();">-->
            <!--<i class="icon-menu menu-icon"></i>-->
          <!--</a>-->
        <!--</li>-->
        <!--<li class="nav-item">-->
          <!--<form class="search-bar">-->
            <!--<input type="text" class="form-control" placeholder="Enter keywords">-->
            <!--<a href="javascript:void();"><i class="icon-magnifier"></i></a>-->
          <!--</form>-->
        <!--</li>-->
      </ul>

      <ul class="navbar-nav align-items-center right-nav-link">
        <li class="nav-item dropdown-lg">
          <a class="nav-link dropdown-toggle dropdown-toggle-nocaret waves-effect" data-toggle="dropdown" href="javascript:void(0);">
            <i class="fa fa-envelope-open-o"></i><span class="badge badge-warning badge-up">6</span></a>
          <div class="dropdown-menu dropdown-menu-right">
            <ul class="list-group list-group-flush">
              <li class="list-group-item d-flex justify-content-between align-items-center">
                你有6条系统安全中心通知
                <span class="badge badge-warning">6</span>
              </li>
              <li class="list-group-item">
                <a href="javaScript:void(0);">
                  <div class="media">
                    <div class="media-body">
                      <p class="msg-info">新增1条标签非法流通类门禁警报记录</p>
                      <small>2021/4/11 12:00:00</small>
                    </div>
                  </div>
                </a>
              </li>
              <li class="list-group-item">
                <a href="javaScript:void(0);">
                  <div class="media">
                    <div class="media-body">
                      <p class="msg-info">新增3条未初始化门禁与标签类门禁警报记录</p>
                      <small>2021/4/11 05:02:59</small>
                    </div>
                  </div>
                </a>
              </li>
              <li class="list-group-item">
                <a href="javaScript:void(0);">
                  <div class="media">
                    <div class="media-body">
                      <p class="msg-info">新增1条设备入库操作记录</p>
                      <small>2021/4/10 22:00:00</small>
                    </div>
                  </div>
                </a>
              </li>
              <li class="list-group-item">
                <a href="javaScript:void(0);">
                  <div class="media">
                    <div class="media-body">
                      <p class="msg-info">新增1条人员间设备流转记录</p>
                      <small>2021/4/10 12:00:00</small>
                    </div>
                  </div>
                </a>
              </li>
              <li class="list-group-item text-center"><a href="javaScript:void(0);">查看所有通知</a></li>
            </ul>
          </div>
        </li>
        <li class="nav-item dropdown-lg">
          <a class="nav-link dropdown-toggle dropdown-toggle-nocaret waves-effect" data-toggle="dropdown" href="javascript:void(0);">
            <i class="fa fa-bell-o"></i><span class="badge badge-info badge-up">2</span></a>
          <div class="dropdown-menu dropdown-menu-right">
            <ul class="list-group list-group-flush">
              <li class="list-group-item d-flex justify-content-between align-items-center">
                你有2条申请待审批
                <span class="badge badge-info">2</span>
              </li>
              <li class="list-group-item">
                <a href="javaScript:void(0);">
                  <div class="media">
                    <i class="zmdi zmdi-accounts fa-2x mr-3 text-info"></i>
                    <div class="media-body">
                      <h6 class="mt-0 msg-title">【EMS_ADMIN_4】系统管理员</h6>
                      <p class="msg-info">设备交接申请</p>
                    </div>
                  </div>
                </a>
              </li>
              <li class="list-group-item">
                <a href="javaScript:void(0);">
                  <div class="media">
                    <i class="zmdi zmdi-accounts fa-2x mr-3 text-info"></i>
                    <div class="media-body">
                      <h6 class="mt-0 msg-title">【EMS_ADMIN_9】系统管理员</h6>
                      <p class="msg-info">设备交接申请</p>
                    </div>
                  </div>
                </a>
              </li>
              <!--<li class="list-group-item">-->
                <!--<a href="javaScript:void(0);">-->
                  <!--<div class="media">-->
                    <!--<i class="zmdi zmdi-coffee fa-2x mr-3 text-warning"></i>-->
                    <!--<div class="media-body">-->
                      <!--<h6 class="mt-0 msg-title">New Received Orders</h6>-->
                      <!--<p class="msg-info">Lorem ipsum dolor sit amet...</p>-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</a>-->
              <!--</li>-->
              <!--<li class="list-group-item">-->
                <!--<a href="javaScript:void(0);">-->
                  <!--<div class="media">-->
                    <!--<i class="zmdi zmdi-notifications-active fa-2x mr-3 text-danger"></i>-->
                    <!--<div class="media-body">-->
                      <!--<h6 class="mt-0 msg-title">New Updates</h6>-->
                      <!--<p class="msg-info">Lorem ipsum dolor sit amet...</p>-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</a>-->
              <!--</li>-->
              <li class="list-group-item text-center"><a href="javaScript:void(0);">查看所有申请</a></li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  </header>
  <!--End topbar header-->
</div>
</template>

<script>
export default {
  name: 'Topbar'
}
</script>

<style scoped>

</style>
