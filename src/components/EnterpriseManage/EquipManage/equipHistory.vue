<template>
  <div id="wrapper">
    <div class="content-wrapper">
      <div class="container-fluid">
        <!-- Breadcrumb-->
        <div class="row pt-2 pb-2">
          <div class="col-sm-9">
            <h4 class="page-title">设备流转历史</h4>
            <ol class="breadcrumb">
              <li class="breadcrumb-item active" aria-current="page">设备管理</li>
              <li class="breadcrumb-item active" aria-current="page">设备流转历史</li>
            </ol>
          </div>
          <div class="col-sm-3">
            <div class="btn-group float-sm-right">
              <router-link tag="a" to="/equiplist" class="btn btn-danger btn-block" style="color: #ffffff;">返回列表</router-link>
            </div>
          </div>
        </div>
        <!-- End Breadcrumb-->

        <div class="row">
          <div class="col-lg-4">
            <div class="card">
              <div class="card-body">
                <ul class="list-group">
                  <li class="list-group-item d-flex justify-content-between align-items-center active">
                    【设备ID】设备名
                    <span>【{{ equipId }}】{{ equipData.name }}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    购入时间
                    <span>{{ equipData.purchaseDate | dateFormat}}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    用途
                    <span>{{ equipData.usefulness }}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    是否允许永久借出
                    <span>{{ equipData.allowPermanentLend ? '是':'否'}}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    是否入库
                    <span>{{ equipData.inWarehouse ? '是':'否'}}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    补充说明
                    <span>{{ equipData.supplement }}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    借出开始时间
                    <span v-if="equipData.fromLendDate !== null">{{ equipData.fromLendDate | dateFormat}}</span>
                    <span v-else>暂无</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    借出截至时间
                    <span v-if="equipData.toLendDate !== null">{{ equipData.toLendDate | dateFormat}}</span>
                    <span v-else>暂无</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    是否已永久借出
                    <span>{{ equipData.permanentLent ? '已':'未'}}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    是否归还
                    <span>{{ equipData.back ? '已':'未'}}</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>

          <div class="col-lg-8">
            <div class="card">
              <div class="card-body">
                <ul class="nav nav-tabs bg-facebook shadow-facebook nav-justified">
                  <li class="nav-item">
                    <a href="" data-target="#profile" data-toggle="pill" class="nav-link active"><i class="icon-user"></i> <span class="hidden-xs">设备通行历史</span></a>
                  </li>
                  <li class="nav-item">
                    <a href="" data-target="#messages" data-toggle="pill" class="nav-link"><i class="icon-envelope-open"></i> <span class="hidden-xs">设备借记历史</span></a>
                  </li>
                </ul>
                <div class="tab-content p-2">
                  <div class="tab-pane active" id="profile">
                    <div style="margin-top: 50px;width: 90%">
                    <el-timeline :reverse="false">
                        <el-timeline-item
                          v-for="(item,index) in tagHistory"
                          :key="index"
                          :timestamp="item.date | dateFormat"
                          placement="top">
                          <el-card>
                            <h6>【{{item.guard.id}}】{{item.guard.name}}
                              <el-tag type="danger" size="mini" v-if="item.guard.warehouse === true">仓库</el-tag>
                              <el-tag size="mini">{{item.guard.mac}}</el-tag>
                              <el-tag type="info" size="mini">{{item.guard.location}}</el-tag>
                            </h6>
                            <p>{{item.event}}</p>
                          </el-card>
                        </el-timeline-item>
                    </el-timeline>
                    </div>
                  </div>
                  <div class="tab-pane" id="messages">
                    <div style="margin-top: 50px;width: 90%">
                      <el-timeline :reverse="false">
                        <el-timeline-item
                          v-for="(item,index) in equipHistory"
                          :key="index"
                          :timestamp="item.date | dateFormat"
                          placement="top">
                          <el-card>
                            <div style="display: flex;flex-direction: row">
                            <h6 style="flex: 1">【执行者】{{item.executor.realName}}
                              <el-popover
                              placement="bottom"
                              width="400"
                              trigger="click"
                              style="margin-left: 10px">
                                <ul class="list-group">
                                  <li class="list-group-item d-flex justify-content-between align-items-center">
                                    账号
                                    <span>{{ item.executor.account }}</span>
                                  </li>
                                  <li class="list-group-item d-flex justify-content-between align-items-center">
                                    邮箱
                                    <span>{{ item.executor.mailbox }}</span>
                                  </li>
                                  <li class="list-group-item d-flex justify-content-between align-items-center">
                                    联系方式
                                    <span>{{ item.executor.phone }}</span>
                                  </li>
                                  <li class="list-group-item d-flex justify-content-between align-items-center">
                                    补充说明
                                    <span>{{ item.executor.supplement }}</span>
                                  </li>
                                </ul>
                              <el-button slot="reference" size="mini">详情</el-button>
                            </el-popover></h6>
                              <h6 style="flex: 1;" v-if="item.updateWarehouse">【仓库信息】{{item.warehouse.guardId}}-{{item.warehouse.name}}
                                <el-popover
                                  placement="bottom"
                                  width="400"
                                  trigger="click"
                                  style="margin-left: 10px">
                                  <ul class="list-group">
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                      mac
                                      <span>{{item.warehouse.mac}}</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                      位置
                                      <span>{{item.warehouse.location}}</span>
                                    </li>
                                  </ul>
                                  <el-button slot="reference" size="mini">详情</el-button>
                                </el-popover></h6>
                              <h6 style="flex: 1;" v-else>【借用者】{{item.lender.realName}}
                                <el-popover
                                  placement="bottom"
                                  width="400"
                                  trigger="click"
                                  style="margin-left: 10px">
                                  <ul class="list-group">
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                      账号
                                      <span>{{item.lender.account}}</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                      邮箱
                                      <span>{{item.lender.mailbox}}</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                      联系方式
                                      <span>{{item.lender.phone}}</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                      补充说明
                                      <span>{{item.lender.supplement}}</span>
                                    </li>
                                  </ul>
                                  <el-button slot="reference" size="mini">详情</el-button>
                                </el-popover></h6>
                            </div>
                            <p>{{item.event}}</p>
                          </el-card>
                        </el-timeline-item>
                      </el-timeline>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import request from '../../../utils/request'
import eventBus from '../../../utils/eventBus'
export default {
  name: 'equipHistory',
  data () {
    return {
      equipId: '',
      tagHistory: [],
      equipHistory: [],
      equipData: ''
    }
  },
  // beforeCreate(){
  //   let _this = this;
  //   eventBus.$on('equipId',(message)=>{
  //     this.equipId = message;
  //     request.$get('/equipment/equipment', {
  //       equipId: message
  //     }, (res) => {
  //       console.log(res.data.data);
  //       let equipData = res.data.data;
  //       _this.equipData = equipData;
  //     }, _this);
  //   });
  // },
  // beforeDestroy() {
  //   eventBus.$off();
  // },
  created () {
    let _this = this;
    let equipId = this.$route.query.equipId;
    _this.equipId = equipId;
    request.$get('/tag/web/histories', {
      equipId: equipId
    }, (res) => {
      console.log(res.data.data);
      let equipdata = res.data.data.equipHistory.equipment;
      let taghistory = res.data.data.tagHistory.histories;
      let equiphistory = res.data.data.equipHistory.histories;
      _this.equipData = equipdata;
      _this.tagHistory = taghistory;
      _this.equipHistory = equiphistory;
    }, _this);
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
