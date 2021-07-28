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
      </div>
      <!-- End Breadcrumb-->
      <div class="row">

        <div class="col-lg-12">
          <div class="card">
            <div class="card-body">
              <!-- Tab panes -->
              <div v-if="requestData.length !== 0">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="card-deck">
                        <!--<div v-for="item in requestData.slice((currentPage-1)*pageSize,currentPage*pageSize)">-->
                        <div v-for="item in requestData">
                        <div style="margin: 0 0 15px 0">
                            <div class="card">
                              <div class="card-body">
                                <h5 class="card-title"><a href="javascript:void(0);" @click="getdetail(item.equipRequestId)">【申请者】{{item.realName}}</a></h5>
                                <p class="card-text">【相关设备】{{item.equipNameEtc}}</p>
                              </div>
                              <div class="card-footer">
                                <span class="badge badge-info m-1" v-if="item.status === 'APPROVED'">
                                  已通过审批
                                </span>
                                <span class="badge badge-warning m-1" v-if="item.status === 'DENIED'">
                                  已驳回审批
                                </span>
                                <span class="badge badge-danger m-1" v-if="item.status === 'WAITING'">
                                  待审批
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                <div class="block" style="margin-top:15px;float: right">
                  <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                 :current-page="currentPage"
                                 :page-sizes="[20,50,80]"
                                 :page-size="pageSize"
                                 layout="total, sizes, prev, pager, next, jumper"
                                 :total="requestData_length">
                  </el-pagination>
                </div>
              </div>

              <div v-else class="col-12 col-lg-2 col-xl-2 text-center" style="display: flex;align-items: center;margin-left: 40%">
                <div class="card-body">
                  <div class="icon-box">
                    <i class="fa fa-file-o text-facebook"></i>
                  </div>
                  <hr>
                  <h5 class="mb-0 mt-3">暂无</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div><!--End Row-->

    </div>
    <!-- End container-fluid-->

  </div><!--End content-wrapper-->
</template>

<script>
import request from '../../../utils/request'
export default {
  name: 'checkedList',
  inject: ['reload'],
  data() {
    return {
      requestData: [],
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      requestData_length: 0, //总条目数
      pageSize: 20, // 每页的数据条数
    };
  },
  created () {
    this.getrequestData();
  },
  methods: {
    getrequestData() {
      let _this = this;
      request.$get('/equipRequest/requests/all', {
        size: _this.pageSize,
        fromIndex: _this.pageSize*(_this.currentPage-1),
      }, (res) => {
        console.log(res.data.data);
        let counts = res.data.data.count;
        let requestdata = res.data.data.commonEquipRequests;
        _this.requestData = requestdata;
        _this.requestData_length = counts;
      }, _this);
    },
    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
      this.getrequestData();
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getrequestData();
    },
    getdetail(e) {
      this.$router.push({
        path: '/checkdetail',
        name: 'checkDetail',
        query: {
          equipRequestId: e
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
