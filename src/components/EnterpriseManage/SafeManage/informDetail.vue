<template>
  <div class="content-wrapper">
    <div class="container-fluid">
      <!-- Breadcrumb-->
      <div class="row pt-2 pb-2">
        <div class="col-sm-9">
          <h4 class="page-title">{{formData.event}}</h4>
          <ol class="breadcrumb">
            <li class="breadcrumb-item active" aria-current="page">安全中心</li>
            <li class="breadcrumb-item active" aria-current="page">设备流转表单</li>
          </ol>
        </div>
        <div class="col-sm-3">
          <div class="btn-group float-sm-right">
            <router-link tag="a" to="/equipinform" class="btn btn-danger btn-block" style="color: #ffffff;">返回列表</router-link>
          </div>
        </div>
      </div>
      <!-- End Breadcrumb-->

      <div class="row">
        <div class="col-lg-6">
          <div class="card">
            <div class="card-body">
              <ul class="list-group">
                <li class="list-group-item d-flex justify-content-between align-items-center active">
                  执行者信息
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  账号
                  <span>{{executor.account}}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  姓名
                  <span>{{executor.realName}}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  邮箱
                  <span>{{executor.mailbox}}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  电话
                  <span>{{executor.phone}}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  补充说明
                  <span>{{executor.supplement}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card" v-if="!formData.updateWarehouse">
            <div class="card-body">
              <ul class="list-group">
                <li class="list-group-item d-flex justify-content-between align-items-center active">
                  转移对象信息
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  账号
                  <span>{{lender.account}}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  姓名
                  <span>{{lender.realName}}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  邮箱
                  <span>{{lender.mailbox}}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  电话
                  <span>{{lender.phone}}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  补充说明
                  <span>{{lender.supplement}}</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="card" v-else>
            <div class="card-body">
              <ul class="list-group">
                <li class="list-group-item d-flex justify-content-between align-items-center active">
                  仓库信息
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  门禁ID
                  <span>{{warehouse.guardId}}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  门禁名
                  <span>{{warehouse.name}}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  门禁mac
                  <span>{{warehouse.mac}}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  门禁位置
                  <span>{{warehouse.location}}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  门禁事件
                  <span>{{formData.event}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-body">
              <div class="card-title">相关设备信息列表</div>
              <hr>
              <el-table
                :data="equipData"
                :header-cell-style="{color: 'black', fontSize: '14px'}"
                style="width: 100%">
                <el-table-column
                  label="设备ID"
                  prop="equipId"
                  width="200">
                  <template slot-scope="scope">
                    {{ scope.row.equipId }}
                  </template>
                </el-table-column>
                <el-table-column
                  label="设备名"
                  prop="name"
                  width="300">
                  <template slot-scope="scope">
                    {{ scope.row.name }}
                  </template>
                </el-table-column>
                <el-table-column
                  label="用途"
                  prop="usefulness"
                  width="350">
                  <template slot-scope="scope">
                    {{ scope.row.usefulness }}
                  </template>
                </el-table-column>
                <el-table-column
                  label="补充说明"
                  prop="supplement">
                  <template slot-scope="scope">
                    {{ scope.row.supplement }}
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import request from '../../../utils/request'
export default {
  name: 'informDetail',
  inject: ['reload'],
  data () {
    return {
      equipInformId: '',
      equipData: [],
      formData: '',
      executor: '',
      lender: '',
      warehouse: ''
    }
  },
  created () {
    let _this = this;
    let equipinformId = this.$route.query.equipInformId;
    _this.equipInformId = equipinformId;
    this.getData();
  },
  methods: {
    getData () {
      let _this = this;
      request.$get('/securityForm/form/equipInform', {
        equipInformId: _this.equipInformId
      }, (res) => {
        console.log(res.data.data);
        let equipdata = res.data.data.equips;
        let formdata = res.data.data;
        let executor = res.data.data.executor;
        let lender = res.data.data.lender;
        let warehouse = res.data.data.warehouse;
        _this.warehouse = warehouse;
        _this.lender = lender;
        _this.executor = executor;
        _this.formData = formdata;
        _this.equipData = equipdata;
      }, _this);
    }
  }
}
</script>

<style scoped>

</style>
