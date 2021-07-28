<template>
  <div class="content-wrapper">
    <div class="container-fluid">
      <!-- Breadcrumb-->
      <div class="row pt-2 pb-2">
        <div class="col-sm-9">
          <h4 class="page-title">设备流转表单</h4>
          <ol class="breadcrumb">
            <li class="breadcrumb-item active" aria-current="page">安全中心</li>
            <li class="breadcrumb-item active" aria-current="page">设备流转表单</li>
          </ol>
        </div>
      </div>
      <!-- End Breadcrumb-->
      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-body">

              <div class="row">

                <!-- Left sidebar -->
                <div class="col-lg-3 col-md-4">
                  <!--<a href="" class="btn btn-danger btn-block">新通知</a>-->
                  <div class="card mt-3 shadow-none">
                    <div class="list-group shadow-none">
                      <a class="list-group-item active"><i class="fa fa-inbox mr-2"></i>
                        筛查
                        <!--<button type="button" class="btn btn-sm btn-outline-white waves-effect waves-light m-1 float-right" @click="reset">重置</button>-->
                      </a>
                      <a class="list-group-item">是否为仓库操作
                        <el-radio-group v-model="search_updateWarehouse" size="mini" class="float-right">
                          <el-radio-button :label="true">是</el-radio-button>
                          <el-radio-button :label="false">否</el-radio-button>
                        </el-radio-group>
                      </a>
                      <a class="list-group-item">是否入库
                        <el-radio-group v-model="search_inWarehouse" size="mini" class="float-right" :disabled="search_updateWarehouse === false">
                          <el-radio-button :label="true">是</el-radio-button>
                          <el-radio-button :label="false">否</el-radio-button>
                        </el-radio-group>
                      </a>
                      <a class="list-group-item">
                        <button type="button" class="btn btn-sm btn-dark waves-effect waves-light m-1 float-right" @click="reset">重置</button>
                      </a>
                    </div>
                  </div>
                </div>
                <!-- End Left sidebar -->

                <!-- Right Sidebar -->
                <div class="col-lg-9 col-md-8">

                  <div class="card mt-3 shadow-none">
                    <div class="card-body" v-if="formData.length !== 0">
                      <!-- Tab panes -->
                        <div class="row">
                          <div class="col-lg-12">
                            <div class="card-deck">
                              <!--<div v-for="item in requestData.slice((currentPage-1)*pageSize,currentPage*pageSize)">-->
                              <div v-for="item in formData">
                                <div style="margin: 0 0 15px 0">
                                  <div class="card">
                                    <div class="card-body">
                                      <h6 class="card-title"><a href="javascript:void(0);" @click="getdetail(item.equipInformId)">{{item.event}}</a></h6>
                                      <p class="card-text">【执行者】{{item.executorName}}</p>
                                    </div>
                                    <div class="card-footer">
                                      <small v-if="item.targetName !== null">【交接对象】{{item.targetName}}</small>
                                      <small v-else>【仓库】{{item.warehouseName}}</small>
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
                                         :total="formData_length">
                          </el-pagination>
                        </div>

                    </div> <!-- card body -->

                    <div v-else class="col-12 col-lg-2 col-xl-2 text-center" style="display: flex;align-items: center;margin-left: 40%">
                      <div class="card-body">
                        <div class="icon-box">
                          <i class="fa fa-file-o text-facebook"></i>
                        </div>
                        <hr>
                        <h5 class="mb-0 mt-3">暂无</h5>
                      </div>
                    </div>
                  </div> <!-- card -->
                </div> <!-- end Col-9 -->

              </div><!-- End row -->

            </div>
          </div>
        </div>
      </div><!-- End row -->

    </div>
  </div><!--End content-wrapper-->
</template>

<script>
  import request from '../../../utils/request'
  export default {
    name: 'equipInform',
    inject: ['reload'],
    data() {
      return {
        formData: [],
        currentPage: 1, // 当前页码
        total: 20, // 总条数
        formData_length: 0, //总条目数
        pageSize: 20, // 每页的数据条数
        search_inWarehouse: true,
        search_updateWarehouse: true
      };
    },
    created () {
      this.getformData();
    },
    methods: {
      getformData() {
        let _this = this;
        request.$get('/securityForm/forms/equipInform', {
          size: _this.pageSize,
          fromIndex: _this.pageSize*(_this.currentPage-1),
          inWarehouse: _this.search_inWarehouse,
          updateWarehouse: _this.search_updateWarehouse
        }, (res) => {
          console.log(res.data.data);
          let counts = res.data.data.counts;
          let formdata = res.data.data.commonEquipInforms;
          _this.formData = formdata;
          _this.formData_length = counts;
        }, _this);
      },
      //每页条数改变时触发 选择一页显示多少行
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.currentPage = 1;
        this.pageSize = val;
        this.getformData();
      },
      //当前页改变时触发 跳转其他页
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.getformData();
      },
      getdetail(e) {
        this.$router.push({
          path: '/informdetail',
          name: 'informDetail',
          query: {
            equipInformId: e
          }
        })
      },
      reset() {
        this.search_inWarehouse= true;
        this.search_updateWarehouse= true;
        this.getformData();
        request.message(this, '重置成功', 'success');
      },
      handleSearch_inWarehouse(val) {
        let _this = this;
        console.log(val)
        let search = val;
        _this.search_inWarehouse = search;
        _this.currentPage = 1;
        _this.getformData();
      },
      handleSearch_updateWarehouse(val) {
        let _this = this;
        console.log(val)
        let search = val;
        _this.search_updateWarehouse = search;
        _this.currentPage = 1;
        _this.getformData();
      },
    },
    watch: {
      //watch监视input输入值的变化,只要是watch变化了 search()就会被调用
      search_inWarehouse (newVal) {
        this.handleSearch_inWarehouse(newVal);
      },
      search_updateWarehouse (newVal) {
        this.handleSearch_updateWarehouse(newVal);
      }
    }
  }
</script>

<style scoped>

</style>
