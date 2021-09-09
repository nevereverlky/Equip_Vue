<template>
  <div class="content-wrapper">
    <div class="container-fluid">
      <!-- Breadcrumb-->
      <div class="row pt-2 pb-2">
        <div class="col-sm-9">
          <h4 class="page-title">门禁警报表单</h4>
          <ol class="breadcrumb">
            <li class="breadcrumb-item active" aria-current="page">安全中心</li>
            <li class="breadcrumb-item active" aria-current="page">门禁警报表单</li>
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
                    <div class="list-group shadow-none" >
                      <a class="list-group-item active"><i class="fa fa-inbox mr-2"></i>表单类型概览</a>
                      <a href="javascript:void(0);" @click="gettype('UNINITIALIZED_GUARD')" class="list-group-item"><span class="fa fa-circle text-danger float-right"></span>{{typeMenu.UNINITIALIZED_GUARD}}</a>
                      <a href="javascript:void(0);" @click="gettype('INVALID_TAG')" class="list-group-item"><span class="fa fa-circle text-warning float-right"></span>{{typeMenu.INVALID_TAG}}</a>
                      <a href="javascript:void(0);" @click="gettype('UNINITIALIZED_TAG')" class="list-group-item"><span class="fa fa-circle text-success float-right"></span>{{typeMenu.UNINITIALIZED_TAG}}</a>
                      <!--<a href="javascript:void(0);" class="list-group-item"><span class="fa fa-circle text-secondary float-right"></span>设备逾期未归还</a>-->
                      <a href="javascript:void(0);" @click="gettype('UNINITIALIZED_GUARD_TAG')" class="list-group-item"><span class="fa fa-circle text-info float-right"></span>{{typeMenu.UNINITIALIZED_GUARD_TAG}}</a>
                    </div>
                  </div>
                </div>
                <!-- End Left sidebar -->

                <!-- Right Sidebar -->
                <div class="col-lg-9 col-md-8">

                  <div class="card mt-3 shadow-none">
                    <div class="card-body" v-if="typeform !== ''">
                      <!--<i v-if="typeform === 'UNINITIALIZED_GUARD'" class="fa fa-circle text-danger mr-2"></i>-->
                      <!--<i v-if="typeform === 'INVALID_TAG'" class="fa fa-circle text-warning mr-2"></i>-->
                      <!--<i v-if="typeform === 'UNINITIALIZED_TAG'" class="fa fa-circle text-success mr-2"></i>-->
                      <!--<i v-if="typeform === 'UNINITIALIZED_GUARD_TAG'" class="fa fa-circle text-info mr-2"></i>-->
                      <!--finalShow.slice((currentPage-1)*pageSize,currentPage*pageSize)-->
                      <el-table
                        :data="formList"
                        :header-cell-style="{color: 'black', fontSize: '14px'}"
                        style="width: 100%"
                        cell-style="font-size: 13px">
                        <el-table-column>
                          <!-- eslint-disable-next-line -->
                          <template slot="header" slot-scope="scope">
                            <div style="display: flex;flex-direction: row;justify-content: space-between">
                              <el-input
                                scope
                                style="width: 20%"
                                v-model="search_equipName"
                                size="mini"
                                placeholder="按照设备名搜索"
                              />
                              <el-input
                                scope
                                style="width: 25%"
                                v-model="search_location"
                                size="mini"
                                placeholder="按照门禁位置搜索"
                              />
                              <el-date-picker
                                v-model="search_when"
                                style="width: 40%"
                                size="mini"
                                type="datetimerange"
                                start-placeholder="搜索发生开始时间"
                                end-placeholder="发生结束时间内"
                                :default-time="['12:00:00']">
                              </el-date-picker>
                              <button type="button" class="btn btn-sm btn-danger waves-effect waves-light m-1" v-if="typeform === 'UNINITIALIZED_GUARD'" @click="reset">重置</button>
                              <button type="button" class="btn btn-sm btn-warning waves-effect waves-light m-1" v-if="typeform === 'INVALID_TAG'" @click="reset">重置</button>
                              <button type="button" class="btn btn-sm btn-success waves-effect waves-light m-1" v-if="typeform === 'UNINITIALIZED_TAG'" @click="reset">重置</button>
                              <button type="button" class="btn btn-sm btn-info waves-effect waves-light m-1" v-if="typeform === 'UNINITIALIZED_GUARD_TAG'" @click="reset">重置</button>
                            </div>
                          </template>
                        <el-table-column
                          label="设备名"
                          prop="equipName"
                          width="180">
                          <!--<template slot="header" slot-scope="scope">-->
                            <!--<el-input-->
                              <!--scope-->
                              <!--style="width: 100%;margin-bottom: 20px"-->
                              <!--v-model="search_equipName"-->
                              <!--size="mini"-->
                              <!--placeholder="按照设备名搜索"-->
                            <!--/><br>-->
                            <!--设备名-->
                          <!--</template>-->
                          <template slot-scope="scope">
                              <span>{{scope.row.equipName}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          label="门禁位置"
                          prop="location">
                          <!--<template slot="header" slot-scope="scope">-->
                            <!--<el-input-->
                              <!--scope-->
                              <!--style="width: 100%;margin-bottom: 20px"-->
                              <!--v-model="search_location"-->
                              <!--size="mini"-->
                              <!--placeholder="按照门禁位置搜索"-->
                            <!--/><br>-->
                            <!--门禁位置-->
                          <!--</template>-->
                          <template slot-scope="scope">
                              <span>{{ scope.row.location }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          label="发生时间"
                          prop="when"
                          width="270">
                          <!--<template slot="header" slot-scope="scope">-->
                          <!--<el-date-picker-->
                            <!--v-model="search_when"-->
                            <!--style="width: 100%;margin-bottom: 20px"-->
                            <!--size="mini"-->
                            <!--type="datetimerange"-->
                            <!--start-placeholder="搜索发生开始时间"-->
                            <!--end-placeholder="发生结束时间内"-->
                            <!--:default-time="['12:00:00']">-->
                          <!--</el-date-picker><br>-->
                            <!--发生时间-->
                          <!--</template>-->
                          <template slot-scope="scope">
                            <span>{{ scope.row.when | dateFormat}}</span>
                            <button style="float: right" type="button" class="btn btn-sm btn-outline-danger waves-effect waves-light m-1" @click="getform(scope.row.formId)" v-if="typeform === 'UNINITIALIZED_GUARD'">查看详情</button>
                            <button style="float: right" type="button" class="btn btn-sm btn-outline-warning waves-effect waves-light m-1" @click="getform(scope.row.formId)" v-if="typeform === 'INVALID_TAG'">查看详情</button>
                            <button style="float: right" type="button" class="btn btn-sm btn-outline-success waves-effect waves-light m-1" @click="getform(scope.row.formId)" v-if="typeform === 'UNINITIALIZED_TAG'">查看详情</button>
                            <button style="float: right" type="button" class="btn btn-sm btn-outline-info waves-effect waves-light m-1" @click="getform(scope.row.formId)" v-if="typeform === 'UNINITIALIZED_GUARD_TAG'">查看详情</button>
                          </template>
                        </el-table-column>
                        <!--<el-table-column-->
                          <!--prop="action"-->
                          <!--width="170">-->
                          <!--&lt;!&ndash;<template slot="header" slot-scope="scope">&ndash;&gt;-->
                            <!--&lt;!&ndash;<el-input&ndash;&gt;-->
                              <!--&lt;!&ndash;scope&ndash;&gt;-->
                              <!--&lt;!&ndash;style="width: 100%"&ndash;&gt;-->
                              <!--&lt;!&ndash;v-model="search_equipName"&ndash;&gt;-->
                              <!--&lt;!&ndash;size="mini"&ndash;&gt;-->
                              <!--&lt;!&ndash;placeholder="输入设备名搜索"&ndash;&gt;-->
                            <!--&lt;!&ndash;/>&ndash;&gt;-->
                          <!--&lt;!&ndash;</template>&ndash;&gt;-->
                          <!--<template slot-scope="scope">-->
                            <!--<button type="button" class="btn btn-sm btn-warning waves-effect waves-light m-1" @click="getform(scope.row.formId)">查看详情</button>-->
                          <!--</template>-->
                        <!--</el-table-column>-->
                        </el-table-column>
                      </el-table>

                      <div class="block" style="margin-top:30px;float: right">
                        <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                       :current-page="currentPage"
                                       :page-sizes="[10,20,50]"
                                       :page-size="pageSize"
                                       layout="total, sizes, prev, pager, next, jumper"
                                       :total="formList_length">
                        </el-pagination>
                      </div>

                    </div> <!-- card body -->

                    <div v-else class="col-12 col-lg-2 col-xl-2 text-center" style="display: flex;margin-left: 40%">
                      <div class="card-body">
                        <div class="icon-box">
                          <i class="fa fa-mouse-pointer text-facebook"></i>
                        </div>
                        <hr>
                        <h5 class="mb-0 mt-3">请先选择表单类型</h5>
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
    <!-- End container-fluid-->

  </div><!--End content-wrapper-->
</template>

<script>
import request from '../../../utils/request'
// import eventBus from '../../../utils/eventBus'
export default {
  name: 'formInbox',
  inject: ['reload'],
  data () {
    return {
      finalShow: [], // 表单总表
      search_all: true,
      search_equipName: '',
      search_location: '',
      search_whenBegin: '',
      search_whenEnd: '',
      search_when: '', // [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)]
      typeMenu: '', // 表单类型概览
      formList: [], // 表单总表
      formId: '',
      typeform: '',
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      formList_length: 0, // 总条目数
      pageSize: 10 // 每页的数据条数
    }
  },
  created () {
    let _this = this;
    request.$get('/securityForm/types/alarm', {}, (res) => {
      console.log(res.data.data);
      let typemenu = res.data.data;
      _this.typeMenu = typemenu;
    }, _this);
  },
  methods: {
    gettype (e) {
      console.log(e)
      this.typeform = e;
      this.getformData();
    },
    getformData () {
      let _this = this
      request.$get('/securityForm/forms/alarm', {
        type: _this.typeform,
        size: _this.pageSize,
        fromIndex: _this.pageSize * (_this.currentPage - 1),
        all: _this.search_all,
        equipName: _this.search_equipName,
        location: _this.search_location,
        whenBegin: _this.search_whenBegin,
        whenEnd: _this.search_whenEnd
      }, (res) => {
        console.log(res.data.data);
        let counts = res.data.data.counts;
        let formlist = res.data.data.forms;
        _this.formList = formlist;
        // _this.finalShow = formlist;
        _this.formList_length = counts;
      }, _this);
    },
    // 每页条数改变时触发 选择一页显示多少行
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
      this.getformData();
    },
    // 当前页改变时触发 跳转其他页
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getformData();
    },
    getform (e) {
      let _this = this
      _this.formId = e
      // setTimeout(()=>{
      //   eventBus.$emit('formId',e);
      //   eventBus.$emit('formtype',_this.typeform);
      // },2000)
      _this.$router.push({
        path: '/formdetail',
        name: 'formDetail',
        query: {
          formId: e,
          formtype: _this.typeform
        }
      })
    },
    reset () {
      this.search_all = true;
      this.search_equipName = '';
      this.search_location = '';
      this.search_when = '';
      this.search_whenBegin = '';
      this.search_whenEnd = '';
      this.getformData();
      request.message(this, '重置成功', 'success');
    },
    handleSearch_equipName (val) {
      let _this = this;
      let search = val;
      _this.search_equipName = search;
      _this.currentPage = 1;
      if (search === '') {
        _this.search_all = true;
      } else {
        _this.search_all = false;
      }
      _this.getformData();
    },
    handleSearch_location (val) {
      let _this = this;
      let search = val;
      _this.search_location = search;
      _this.currentPage = 1;
      if (search === '') {
        _this.search_all = true;
        console.log(_this.search_all)
      } else {
        _this.search_all = false;
        console.log(_this.search_all)
      }
      _this.getformData();
    },
    formateTime (time) {
      let times = new Date(time)
      let year = times.getFullYear()
      let month = times.getMonth() + 1 > 9 ? times.getMonth() + 1 : 0 + (times.getMonth() + 1)
      let date = times.getDate() > 9 ? times.getDate() : 0 + times.getDate()
      let hour = times.getHours() > 9 ? times.getHours() : 0 + times.getHours()
      let minute = times.getMinutes() > 9 ? times.getMinutes() : 0 + times.getMinutes()
      let second = times.getSeconds() > 9 ? times.getSeconds() : 0 + times.getMinutes()
      return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
    },
    handleSearch_when (val) {
      let _this = this;
      console.log(val)
      if (val === null || val === '') {
        _this.search_all = true;
        _this.search_when = '';
        _this.search_whenBegin = '';
        _this.search_whenEnd = '';
        console.log(_this.search_all)
      } else {
        let search1 = _this.formateTime(val[0]);
        let search2 = _this.formateTime(val[1]);
        console.log(search1)
        console.log(search2)
        _this.search_whenBegin = search1;
        _this.search_whenEnd = search2;
        _this.currentPage = 1;
        if (search1 === '' && search2 === '') {
          _this.search_all = true;
        } else {
          _this.search_all = false;
        }
      }
      _this.getformData();
    }
  },
  watch: {
    // watch监视input输入值的变化,只要是watch变化了 search()就会被调用
    search_equipName (newVal) {
      this.handleSearch_equipName(newVal);
    },
    search_location (newVal) {
      this.handleSearch_location(newVal);
    },
    search_when (newVal) {
      this.handleSearch_when(newVal);
    }
  }
}
</script>

<style scoped>

</style>
