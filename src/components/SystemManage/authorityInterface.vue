<template>
  <div id="wrapper">
    <div class="content-wrapper" id="role_authority">
      <div class="container-fluid">
        <!-- Breadcrumb-->
        <div class="row pt-2 pb-2">
          <div class="col-sm-9">
            <h4 class="page-title">权限接口管理</h4>
            <ol class="breadcrumb">
              <li class="breadcrumb-item active" aria-current="page">系统管理</li>
              <li class="breadcrumb-item active" aria-current="page">权限接口管理</li>
            </ol>
          </div>
          <div class="col-sm-3">
            <div class="btn-group float-sm-right">
              <button type="button" class="btn btn-primary waves-effect waves-light" @click="dialogaddauthority = true"><i class="fa fa-plus-square mr-1"></i>添加权限</button>
            </div>
          </div>
        </div>
        <!-- End Breadcrumb-->

        <el-container style="height: 500px; border: 1px solid #eee">
          <el-aside width="300px" style="background-color: rgb(238, 241, 246)">
            <el-table
              :data="finalShow3"
              style="width: 100%"
              :header-cell-style="{color: 'black', fontSize: '14px'}">
              <el-table-column
                prop="id">
                <template slot="header" slot-scope="scope">
                  <el-input
                    scope
                    style="width: 80%"
                    v-model="search3"
                    size="mini"
                    placeholder="输入权限名或id搜索"
                  />
                </template>
                <template slot-scope="scope">
                  <a href="javascript:void(0);">
                    <div @click="geturi(scope.row.id,scope.row.name)">
                      <i class="el-icon-lock"></i>【{{scope.row.id}}】{{scope.row.name}}
                    </div>
                  </a>
                </template>
              </el-table-column>
            </el-table>

            <!--<template v-for="(item, index) in authorityMenu">-->
            <!--<el-menu :default-openeds="[]" text-color="#000000" active-text-color="#000000">-->
                <!--<el-menu-item :index="index" :key="index*2">-->
                  <!--<template slot="title">-->
                    <!--<div @click="geturi(item.id,item.name)">-->
                      <!--<i class="el-icon-lock"></i>-->
                      <!--【{{item.id}}】{{item.name}}-->
                    <!--</div>-->
                  <!--</template>-->
                <!--</el-menu-item>-->
            <!--</el-menu>-->
            <!--</template>-->
          </el-aside>

        <el-container v-if="authoritytitle !== ''">
            <el-header style="text-align: center">
              <span style="font-size:18px;color: #3b5998;;font-weight: bold">{{authoritytitle}}</span>
              <div class="btn-group mr-1" style="margin-left: 10px">
                <el-tooltip class="item" effect="dark" content="刷新" placement="bottom">
                  <button type="button" class="btn btn-outline-primary waves-effect waves-light" @click="fresh"><i class="fa fa-refresh"></i></button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="更新该权限" placement="bottom">
                  <button type="button" class="btn btn-outline-primary waves-effect waves-light" @click="dialogeditauthority = true"><i class="fa fa-edit"></i></button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="删除该权限" placement="right">
                  <button type="button" class="btn btn-outline-primary waves-effect waves-light" @click="removeauthority"><i class="fa fa-trash-o"></i></button>
                </el-tooltip>
              </div>
            </el-header>

          <!--:row-key="getRowKeys"-->
            <el-main>
              <el-table
                ref="multipleTable"
                tooltip-effect="dark"
                @selection-change="handleSelectionChange"
                :data="finalShow1"
                height="390"
                style="width: 30%;margin-right: 10px"
                :header-cell-style="{color: 'black', fontSize: '14px'}">
                <el-table-column
                  type="selection"
                  :selectable="checkable"
                  width="50">
                  <!--:reserve-selection="true"-->
                </el-table-column>
                <el-table-column
                  label="已绑定接口列表">
                  <el-table-column
                    prop="name">
                    <template slot="header" slot-scope="scope">
                      <el-input
                        scope
                        style="width: 80%"
                        v-model="search1"
                        size="mini"
                        placeholder="输入接口名搜索"
                      />
                    </template>
                  <template slot-scope="scope">
                    <span :style="{'color':scope.row.using?'black':'grey'}">{{scope.row.uri}}</span>
                    <el-tooltip class="item" effect="dark" content="该接口当前已失效" placement="top-end">
                    <button @click="uridelete(scope.row.uri)" v-if="!scope.row.using" type="button" class="btn btn-outline-primary btn-sm btn-round waves-effect waves-light" style="float: right;padding-bottom: 5px;padding-top: 5px">移除</button>
                    </el-tooltip>
                  </template>
                  </el-table-column>
                </el-table-column>
              </el-table>

              <div style="display: flex;flex-direction: column">
                <button type="button"
                        class="btn waves-effect waves-light" :class="batchPassArr2 ===undefined || batchPassArr2.length <= 0? 'btn-light':'btn-warning'"
                        :style="batchPassArr2 ===undefined || batchPassArr2.length <= 0? 'cursor: not-allowed':''" style="margin-bottom: 20px"
                        @click="bindit" :disabled="batchPassArr2 ===undefined || batchPassArr2.length <= 0">
                  <i class="fa fa-chevron-left"></i>绑定
                </button>
                <button type="button"
                        class="btn waves-effect waves-light" :class="batchPassArr ===undefined || batchPassArr.length <= 0? 'btn-light':'btn-outline-warning'"
                        :style="batchPassArr ===undefined || batchPassArr.length <= 0? 'cursor: not-allowed':''"
                        @click="unbindit" :disabled="batchPassArr ===undefined || batchPassArr.length <= 0">
                  解绑<i class="fa fa-chevron-right"></i>
                </button>
              </div>

              <!--:row-key="getRowKey"-->
              <el-table
                ref="multipleTable2"
                tooltip-effect="dark"
                @selection-change="handleSelectionChange2"
                :data="finalShow2"
                height="390"
                style="width: 30%;margin-left: 10px"
                :header-cell-style="{color: 'black', fontSize: '14px'}">
                <el-table-column
                  type="selection"
                  width="50">
                  <!--:reserve-selection="true"-->
                </el-table-column>
                <el-table-column
                  label="可绑定接口概览">
                  <el-table-column
                    prop="name">
                    <template slot="header" slot-scope="scope">
                      <el-input
                        scope
                        style="width: 80%"
                        v-model="search2"
                        size="mini"
                        placeholder="输入接口名搜索"
                      />
                    </template>
                    <template slot-scope="scope">
                      {{scope.row}}
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>

            </el-main>
          </el-container>
          <div v-else class="col-12 col-lg-2 col-xl-2 text-center" style="display: flex;align-items: center;margin-left: 30%">
            <div class="card-body">
              <div class="icon-box">
                <i class="fa fa-mouse-pointer text-facebook"></i>
              </div>
              <hr>
              <h5 class="mb-0 mt-3">请先选择权限</h5>
            </div>
          </div>
        </el-container>

        <el-dialog title="添加权限" :visible.sync="dialogaddauthority" width="30%">
          <el-form :model="form1">
            <el-form-item label="权限名" :label-width="formLabelWidth">
              <el-input v-model="form1.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <el-table
            ref="multipleTable4"
            :data="finalShow4"
            height="300"
            style="width: 100%"
            :header-cell-style="{color: 'black', fontSize: '14px'}">
            <el-table-column
              label="参考接口">
              <el-table-column
                prop="name">
                <template slot="header" slot-scope="scope">
                  <el-input
                    scope
                    style="width: 80%"
                    v-model="search4"
                    size="mini"
                    placeholder="输入接口名搜索"
                  />
                </template>
                <template slot-scope="scope">
                  {{scope.row}}
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogaddauthority = false" size="small">取 消</el-button>
            <el-button type="primary" @click="addauthority" size="small" plain>确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="更新权限" :visible.sync="dialogeditauthority" width="30%">
          <el-form :model="form2">
            <el-form-item label="权限名" :label-width="formLabelWidth">
              <el-input v-model="form2.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogeditauthority = false" size="small">取 消</el-button>
            <el-button type="primary" @click="editauthority" size="small" plain>确 定</el-button>
          </div>
        </el-dialog>

      </div>
    </div>
  </div>
</template>

<script>
import request from '../../utils/request'
export default {
  name: 'authorityInterface',
  inject: ['reload'],
  data () {
    return {
      finalShow1: [], //1已绑定接口列表
      finalShow2: [], //2可绑定接口概览
      finalShow3: [], //3侧边权限总览
      finalShow4: [], //4接口概览
      search1: '', //input的值
      search2: '', //input的值
      search3: '', //input的值
      search4: '', //input的值
      authoritytitle: '',
      authId: '',
      authorityMenu: [], //3侧边权限总览
      tableData: [], //1已绑定接口列表
      tableDataAll: [], //2可绑定接口概览
      tableDataAll1: [], //4接口概览
      multipleSelection: [],
      batchPassArr: [],
      multipleSelection2: [],
      batchPassArr2: [],
      dialogaddauthority: false,
      dialogeditauthority: false,
      form1:{
        name: ''
      },
      form2:{
        name: ''
      },
      formLabelWidth: '80px'
    }
  },
  created () {
    this.getauthData();
    let _this = this;
    request.$get('/auth/uris/all', {}, (res) => {
      console.log(res.data.data);
      let tabledataall = res.data.data;
      _this.tableDataAll1 = tabledataall;
      _this.finalShow4 = tabledataall
    }, _this);
  },
  methods: {
    getauthData() {
      let _this = this;
      request.$get('/auth/auths', {}, (res) => {
        console.log(res.data.data);
        let authoritymenu = res.data.data;
        _this.authorityMenu = authoritymenu;
        _this.finalShow3 = authoritymenu
      }, _this);
    },
    checkable (row, rowIndex) {
      if(!row.using){
        return false;//禁用
      }else{
        return true;//不禁用
      }
    },
    // 指定一个key标识这一行的数据
    //可绑定接口概览
    // getRowKey (row) {
    //   return row //id为row的data属性之一
    // },
    // //已绑定接口列表
    // getRowKeys (row) {
    //   return row.uri //id为row的data属性之一
    // },
    geturi (s,e) {
      this.authId = s;
      this.authoritytitle = e;
      this.form2.name = e;
      this.geturiData();
    },
    geturiData() {
      let _this = this;
      this.$nextTick(() => {
        this.$refs.multipleTable.clearSelection();
        this.$refs.multipleTable2.clearSelection();
      });
      this.search1 = '';
      this.search2 = '';
      request.$get('/auth/uris', {
        authorityId: _this.authId
      }, (res) => {
        console.log(res.data.data);
        let tabledata = res.data.data;
        _this.tableData = tabledata;
        _this.finalShow1 = tabledata
      }, _this);
      request.$get('/auth/uris/valid', {
        authId: _this.authId
      }, (res) => {
        console.log(res.data.data);
        let tabledataall = res.data.data;
        _this.tableDataAll = tabledataall;
        _this.finalShow2 = tabledataall
      }, _this);
    },
    fresh () {
      this.geturiData();
      request.message(this, '刷新成功', 'success');
    },
    addauthority () {
      let _this = this;
        request.$post('/auth/add', {
          name: _this.form1.name
        }, (res) => {
          console.log(res.data);
          _this.dialogaddauthority = false;
          setTimeout(function () {
            _this.reload();
            request.message(_this, '权限添加成功', 'success');
          }, 1000)
        }, _this)
    },
    editauthority () {
      let _this = this
        request.$post('/auth/update', {
          name: _this.form2.name,
          authorityId: _this.authId
        }, (res) => {
          console.log(res.data);
          _this.dialogeditauthority = false;
          setTimeout(function () {
            _this.authoritytitle = _this.form2.name;
            _this.getauthData();
            // _this.reload();
            request.message(_this, '权限更新成功', 'success');
          }, 1000)
        }, _this)
    },
    removeauthority () {
      let _this = this;
      this.$confirm('此操作将删除该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request.$post('/auth/delete', {
          authorityId: _this.authId
        }, (res) => {
          console.log(res.data);
          setTimeout(function () {
            _this.reload();
            request.message(_this, '权限删除成功', 'success');
          }, 1000)
        }, _this)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.batchPassArr = [] //每次点击需清空原本数组的内容
      this.multipleSelection.map(item => { //遍历数组，把id存进自定义的数组里
        this.batchPassArr.push(item.uri)
      })
      this.batchPassArr = this.batchPassArr.join(',')
      console.log(this.batchPassArr)
      // if(this.batchPassArr !== undefined || this.batchPassArr.length > -1){
      //     this.$refs.multipleTable2.clearSelection();
      //   // _this.batchPassArr2 = [];
      //   // _this.multipleSelection2 = [];
      // }
    },
    handleSelectionChange2(val) {
      this.multipleSelection2 = val;
      this.batchPassArr2 = [] //每次点击需清空原本数组的内容
      this.multipleSelection2.map(item => { //遍历数组，把id存进自定义的数组里
        this.batchPassArr2.push(item)
      })
      this.batchPassArr2 = this.batchPassArr2.join(',')
      console.log(this.batchPassArr2)
      // if(this.batchPassArr2 !== undefined || this.batchPassArr2.length > -1){
      //     this.$refs.multipleTable.clearSelection();
      //   // _this.batchPassArr = [];
      //   // _this.multipleSelection = [];
      // }
    },
    uridelete (e) {
      let _this = this
      this.$confirm('此操作将移除该接口, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request.$post('/auth/uri/unbind', {
          uri: e,
          authorityId: _this.authId
        }, (res) => {
          console.log(res.data);
          setTimeout(function () {
            request.$get('/auth/uris', {
              authorityId: _this.authId
            }, (res) => {
              console.log(res.data.data);
              let tabledata = res.data.data;
              _this.tableData = tabledata;
              _this.finalShow1 = tabledata
            }, _this);
            // _this.reload();
            request.message(_this, '无效接口移除成功', 'success');
          }, 1000)
        }, _this)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消移除'
        });
      });
    },
    bindit () {
      let _this = this;
      request.$post('/auth/uris/bind', {
        uris: _this.batchPassArr2,
        authorityId: _this.authId
      }, (res) => {
        console.log(res.data);
        setTimeout(function () {
          _this.geturiData();
          // _this.reload();
          request.message(_this, '绑定接口成功', 'success');
        }, 1000)
      }, _this)
    },
    unbindit () {
      let _this = this;
      this.$confirm('此操作将批量解绑所选接口, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request.$post('/auth/uris/unbind', {
          uris: _this.batchPassArr,
          authorityId: _this.authId
        }, (res) => {
          console.log(res.data);
          setTimeout(function () {
            _this.geturiData();
            // _this.reload();
            request.message(_this, '接口解绑成功', 'success');
          }, 1000)
        }, _this)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消解绑'
        });
      });
    },
    handleSearch1(val) {
      let search1 = val;
      if (search1 === '') {
        this.finalShow1 = this.tableData;
      }
      if (search1 !== '') {
        this.finalShow1 = this.tableData.filter(
          (data) =>
            !search1 || data.uri.toLowerCase().includes(search1.toLowerCase())
        );
      }
    },
    handleSearch2(val) {
      let search2 = val;
      if (search2 === '') {
        this.finalShow2 = this.tableDataAll;
      }
      if (search2 !== '') {
        this.finalShow2 = this.tableDataAll.filter(
          (data) =>
            !search2 || data.toLowerCase().includes(search2.toLowerCase())
        );
      }
    },
    handleSearch3(val) {
      let search3 = val;
      if (search3 === '') {
        this.finalShow3 = this.authorityMenu;
      }
      if (search3 !== '') {
        this.finalShow3 = this.authorityMenu.filter(
          (data) =>
            !search3 || data.name.toLowerCase().includes(search3.toLowerCase()) || data.id.toString().includes(search3.toString())
        );
      }
    },
    handleSearch4(val) {
      let search4 = val;
      if (search4 === '') {
        this.finalShow4 = this.tableDataAll1;
      }
      if (search4 !== '') {
        this.finalShow4 = this.tableDataAll1.filter(
          (data) =>
            !search4 || data.toLowerCase().includes(search4.toLowerCase())
        );
      }
    },
  },
  watch: {
    //watch监视input输入值的变化,只要是watch变化了 search()就会被调用
    search1(newVal) {
      this.handleSearch1(newVal);
    },
    search2(newVal) {
      this.handleSearch2(newVal);
    },
    search3(newVal) {
      this.handleSearch3(newVal);
    },
    search4(newVal) {
      this.handleSearch4(newVal);
    },
  }
}
</script>

<style scoped>
  .el-header {
    background-color: #ffffff;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }

  /*::-webkit-scrollbar {*/
    /*display: none;*/
  /*}*/

  /*.container {*/
    /*-ms-overflow-style: none;  // IE 10+*/
  /*overflow: -moz-scrollbars-none;  // Firefox*/
  /*}*/
  /*.container::-webkit-scrollbar {*/
    /*display: none;  // Safari and Chrome*/
  /*}*/

  .el-main {
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

</style>
