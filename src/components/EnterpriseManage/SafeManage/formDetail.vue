<template>
  <div id="wrapper">
    <div class="content-wrapper">
      <div class="container-fluid">
        <!-- Breadcrumb-->
        <div class="row pt-2 pb-2">
          <div class="col-sm-9">
            <h4 class="page-title">{{formtype}}</h4>
            <ol class="breadcrumb">
              <li class="breadcrumb-item active" aria-current="page">安全中心</li>
              <li class="breadcrumb-item active" aria-current="page">门禁警报表单</li>
            </ol>
          </div>
          <div class="col-sm-3">
            <div class="btn-group float-sm-right">
              <router-link tag="a" to="/forminbox" class="btn btn-danger btn-block" style="color: #ffffff;">返回列表</router-link>
            </div>
          </div>
        </div>
        <!-- End Breadcrumb-->

        <div class="row">
          <div class="col-lg-4">
            <div class="card">
              <div class="card-body">
                <ul class="list-group" v-if="equipment !== null">
                  <li class="list-group-item d-flex justify-content-between align-items-center active">
                    设备信息表
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    【设备ID】设备名
                    <span>【{{ equipment.equipId }}】{{ equipment.name }}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    购入时间
                    <span>{{ equipment.purchaseDate | dateFormat}}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    用途
                    <span>{{ equipment.usefulness }}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    是否允许永久借出
                    <span>{{ equipment.allowPermanentLend ? '是':'否'}}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    是否入库
                    <span>{{ equipment.inWarehouse ? '是':'否'}}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    补充说明
                    <span>{{ equipment.supplement }}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    借出开始时间
                    <span v-if="equipment.fromLendDate !== null">{{ equipment.fromLendDate | dateFormat}}</span>
                    <span v-else>暂无</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    借出截至时间
                    <span v-if="equipment.toLendDate !== null">{{ equipment.toLendDate | dateFormat}}</span>
                    <span v-else>暂无</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    是否已永久借出
                    <span>{{ equipment.permanentLent ? '已':'未'}}</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    是否归还
                    <span>{{ equipment.back ? '已':'未'}}</span>
                  </li>
                </ul>
                <ul class="list-group" v-else>
                  <li class="list-group-item d-flex justify-content-between align-items-center active">
                    设备无法识别
                  </li>
                </ul>
              </div>
            </div>

          </div>

          <div class="col-lg-8">
            <div class="card">
              <div class="card-body">
                <div class="list-group-item list-group-item-action flex-column align-items-start">
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{{formDetail.mac}}</h5>
                    <small class="text-muted">{{formDetail.when | dateFormat}}</small>
                  </div>
                  <p class="mb-1">位置：{{formDetail.location}}</p>
                </div>
                <div style="margin-top: 50px">
                </div>
                <video controls="controls"
                       style="width: 100%"
                       :src="'/api/securityForm/guardAlarmVideo/play?formId='+formId">
                </video>
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
  name: 'formDetail',
  inject: ['reload'],
  data () {
    return {
      formId: '',
      formtype: '',
      formDetail: '',
      equipment: ''
    }
  },
  // beforeCreate(){
  //   let _this = this;
  // eventBus.$on('formId',(message)=>{
  //   _this.formId = formId;
  //   request.$get('/securityForm/form', {
  //     formId: formId
  //   }, (res) => {
  //     console.log(res.data.data);
  //     let formdetail = res.data.data;
  //     _this.formDetail = formdetail;
  //   }, _this);
  // });
  // eventBus.$on('formtype',(message)=>{
  //   if (formtype ==='UNINITIALIZED_GUARD') {
  //     _this.formtype = '未初始化门禁';
  //   }else if (formtype === 'INVALID_TAG'){
  //     _this.formtype = '标签非法流通';
  //   }else if (formtype === 'UNINITIALIZED_TAG') {
  //     _this.formtype = '未初始化标签';
  //   }else if (formtype === 'UNINITIALIZED_GUARD_TAG') {
  //     _this.formtype = '未初始化门禁与标签';
  //   }
  // });
  // },
  // beforeDestroy() {
  //   eventBus.$off();
  // },
  created () {
    let _this = this;
    let formId = this.$route.query.formId;
    let formtype = this.$route.query.formtype;
    _this.formId = formId;
    _this.getformDetail();
    if (formtype === 'UNINITIALIZED_GUARD') {
      _this.formtype = '未初始化门禁';
    } else if (formtype === 'INVALID_TAG') {
      _this.formtype = '标签非法流通';
    } else if (formtype === 'UNINITIALIZED_TAG') {
      _this.formtype = '未初始化标签';
    } else if (formtype === 'UNINITIALIZED_GUARD_TAG') {
      _this.formtype = '未初始化门禁与标签';
    }
  },
  methods: {
    getformDetail () {
      let _this = this;
      request.$get('/securityForm/form/alarm', {
        formId: _this.formId
      }, (res) => {
        console.log(res.data.data);
        let formdetail = res.data.data;
        let equipment = res.data.data.equipment;
        _this.equipment = equipment;
        _this.formDetail = formdetail;
      }, _this);
    }
  }
}
</script>

<style scoped>
</style>
