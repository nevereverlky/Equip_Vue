<template>
  <div class="content-wrapper">
    <div class="container-fluid">
      <!-- Breadcrumb-->
      <div class="row pt-2 pb-2">
        <div class="col-sm-9">
          <h4 class="page-title">审批申请</h4>
          <ol class="breadcrumb">
            <li class="breadcrumb-item active" aria-current="page">人员审批管理</li>
            <li class="breadcrumb-item active" aria-current="page">审批申请</li>
          </ol>
        </div>
        <div class="col-sm-3">
          <div class="btn-group float-sm-right">
            <router-link tag="a" to="/checkedlist" class="btn btn-danger btn-block" style="color: #ffffff;">返回列表</router-link>
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
                  申请者信息
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  账号
                  <span>{{ userData.account}}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  姓名
                  <span>{{ userData.realName}}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  邮箱
                  <span>{{ userData.mailbox}}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  电话
                  <span>{{ userData.phone}}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  补充说明
                  <span>{{ userData.supplement}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card">
            <div class="card-body">
              <ul class="list-group">
                <li class="list-group-item d-flex justify-content-between align-items-center active">
                  申请详情
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  申请状态
                  <span class="badge badge-danger m-1" v-if="requestData.status === 'WAITING'">
                    待审批
                  </span>
                  <span class="badge badge-info m-1" v-else>
                    已审批
                  </span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  审批结果
                  <span>
                    <span v-if="requestData.status === 'WAITING'">
                    无
                    </span>
                    <span class="badge badge-info m-1" v-if="requestData.status === 'APPROVED'">
                    已通过
                    </span>
                    <span v-if="requestData.status === 'DENIED'">
                      <span class="badge badge-warning m-1">
                        已驳回
                      </span>
                        {{requestData.denyReason}}
                    </span>
                  </span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  借出时间
                  <span>{{requestData.fromLendDate | dateFormat}} ~ {{requestData.toLendDate | dateFormat}}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  是否永久借出
                  <span>{{requestData.permanentLend? '是':'否'}}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  借出原因
                  <span>{{requestData.reason}}</span>
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

      <div class="row"  v-if="requestData.status === 'WAITING'">
        <div class="col-lg-12">
              <div style="display: flex;justify-content:flex-end;">
                <div>
                  <el-radio v-model="pass" :label="true" size="small" border>通过</el-radio>
                  <el-radio v-model="pass" :label="false" size="small" border>驳回</el-radio>
                </div>
                <div style="margin-left: 50px" v-if="pass === false">
                  <el-input
                    placeholder="请输入驳回理由"
                    size="small"
                    style="width: 500px;"
                    v-model="denyReason">
                  </el-input>
                </div>
              </div>
          <button type="submit" class="btn btn-sm btn-primary px-5" style="float: right" @click="audit"><i class="icon-lock"></i>提交</button>
        </div>
      </div><!--End Row-->

    </div>
  </div>
</template>

<script>
import request from '../../../utils/request'
export default {
  name: 'checkDetail',
  inject: ['reload'],
  data() {
    return {
      equipRequestId: '',
      equipData: [],
      requestData: '',
      userData: '',
      pass: '',
      denyReason: ''
    }
  },
  created () {
    let _this = this;
    let equiprequestId = this.$route.query.equipRequestId;
    _this.equipRequestId = equiprequestId;
    this.getData();
  },
  methods: {
    getData() {
      let _this = this;
      request.$get('/equipRequest/request', {
        equipRequestId: _this.equipRequestId
      }, (res) => {
        console.log(res.data.data);
        let equipdata = res.data.data.equipments;
        let requestdata = res.data.data;
        let userdata = res.data.data.user;
        _this.requestData = requestdata;
        _this.equipData = equipdata;
        _this.userData = userdata;
      }, _this);
    },
    audit() {
      let _this = this;
      console.log(_this.pass)
      request.$post('/equipRequest/audit', {
        equipRequestId: _this.equipRequestId,
        denyReason: _this.denyReason,
        pass: _this.pass
      }, (res) => {
        console.log(res.data.data);
        _this.getData();
        request.message(_this,'提交成功','success');
      }, _this);
    }
  }
}
</script>

<style scoped>

</style>
