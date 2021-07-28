<template>
  <div id="wrapper">
    <div class="content-wrapper" id="role_authority">
      <div class="container-fluid">
        <!-- Breadcrumb-->
        <div class="row pt-2 pb-2">
          <div class="col-sm-7">
            <h4 class="page-title">角色管理</h4>
            <ol class="breadcrumb">
              <li class="breadcrumb-item active" aria-current="page">系统管理</li>
              <li class="breadcrumb-item active" aria-current="page">角色管理</li>
            </ol>
          </div>
          <div class="col-sm-5">
          <div class="btn-group float-sm-right">
          <button type="button" class="btn btn-primary waves-effect waves-light" @click="dialogaddrole = true"><i class="fa fa-plus-square mr-1"></i>添加角色</button>
          </div>
          </div>
        </div>
        <!-- End Breadcrumb-->

        <el-container>
          <el-aside width="300px">
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
                    placeholder="输入角色名或id搜索"
                  />
                </template>
                <template slot-scope="scope">
                  <a href="javascript:void(0);">
                    <div @click="getchild(scope.row.roleId)">
                      <i class="el-icon-user"></i>【{{scope.row.roleId}}】{{scope.row.name}}
                      <!--<button v-if="scope.row.roleId !== 1" type="button" class="btn btn-outline-primary btn-sm btn-round waves-effect waves-light" @click="dialogroles = true" style="float: right;padding-bottom: 5px;padding-top: 5px">继承</button>-->
                    </div>
                  </a>
                </template>
              </el-table-column>
            </el-table>
          </el-aside>

          <el-container v-if="roletitle !== ''">
            <el-header style="text-align: center">
              <span style="font-size:18px;color: #3b5998;font-weight: bold">{{roletitle}}</span>
              <div class="btn-group mr-1" style="margin-left: 10px">
                <el-tooltip class="item" effect="dark" content="刷新" placement="bottom">
                  <button type="button" class="btn btn-outline-primary waves-effect waves-light" @click="fresh"><i class="fa fa-refresh"></i></button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="更新该角色" placement="bottom">
                  <button type="button" class="btn btn-outline-primary waves-effect waves-light" @click="dialogeditrole = true"><i class="fa fa-edit"></i></button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="删除该角色" placement="right">
                  <button type="button" class="btn btn-outline-primary waves-effect waves-light" @click="removerole"><i class="fa fa-trash-o"></i></button>
                </el-tooltip>
              </div>
              <div style="float: right">
              <span style="font-size:12px;color: #8e8e8e">是否允许警报</span>
                <el-switch
                  v-model="alarm"
                  active-color="#02ba5a"
                  inactive-color="#8e8e8e"
                  @change="changeStatus">
                </el-switch>
              </div>
            </el-header>

            <el-main>
              <el-table
                ref="multipleTable"
                :data="finalShow4"
                height="390"
                style="width: 50%;margin-right: 10px"
                :header-cell-style="{color: 'black', fontSize: '14px'}">
                <el-table-column
                  label="已继承角色列表">
                  <el-table-column
                    prop="id">
                    <template slot="header" slot-scope="scope">
                      <el-input
                        scope
                        style="width: 80%"
                        v-model="search4"
                        size="mini"
                        placeholder="输入角色名或id搜索"
                      />
                    </template>
                    <template slot-scope="scope">
                      【{{scope.row.roleId}}】{{scope.row.name}}
                      <button @click="roleremove(scope.row.roleId)" type="button" class="btn btn-outline-primary btn-sm btn-round  waves-effect waves-light"  style="float: right;padding-bottom: 5px;padding-top: 5px">移除</button>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>

              <el-table
                ref="multipleTable2"
                :data="finalShow"
                height="390"
                style="width: 50%;margin-left: 10px"
                :header-cell-style="{color: 'black', fontSize: '14px'}">
                <el-table-column
                  label="可继承角色概览">
                  <el-table-column
                    prop="id">
                    <template slot="header" slot-scope="scope">
                      <el-input
                        scope
                        style="width: 80%"
                        v-model="search"
                        size="mini"
                        placeholder="输入角色名或id搜索"
                      />
                    </template>
                    <template slot-scope="scope">
                      【{{scope.row.roleId}}】{{scope.row.name}}
                      <button @click="roleadd(scope.row.roleId)" v-if="scope.row.roleId !== 1" type="button" class="btn btn-outline-primary btn-sm btn-round waves-effect waves-light" style="float: right;padding-bottom: 5px;padding-top: 5px">添加</button>
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
              <h5 class="mb-0 mt-3">请先选择角色</h5>
            </div>
          </div>
        </el-container>

        <el-dialog title="添加角色" :visible.sync="dialogaddrole" width="30%">
        <el-form :model="form1">
        <el-form-item label="角色名" :label-width="formLabelWidth">
        <el-input v-model="form1.name" autocomplete="off"></el-input>
        </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
        <el-button @click="dialogaddrole = false" size="small">取 消</el-button>
        <el-button type="primary" @click="addrole" size="small" plain>确 定</el-button>
        </div>
        </el-dialog>

        <el-dialog title="更新角色" :visible.sync="dialogeditrole" width="30%">
          <el-form :model="form2">
            <el-form-item label="角色名" :label-width="formLabelWidth">
              <el-input v-model="form2.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogeditrole = false" size="small">取 消</el-button>
            <el-button type="primary" @click="editrole" size="small" plain>确 定</el-button>
          </div>
        </el-dialog>

      </div>
    </div>
  </div>
</template>

<script>
  import request from '../../utils/request'
  export default {
    name: 'roleList',
    inject: ['reload'],
    data () {
      return {
        alarm: 'false', //是否允许警报
        finalShow: [],  // 可继承角色概览
        finalShow3: [], //3侧边角色总览
        finalShow4: [], //4已继承角色列表
        search: '',
        search3: '',
        search4: '',
        roletitle: '',
        parentId: '',
        roleId: '',
        roleMenu: [], //3侧边角色总览
        roleMenu1: [], // 可继承角色概览
        subList: [], //4已继承角色列表
        dialogroles: false,
        dialogaddrole: false,
        dialogeditrole: false,
        form1:{
          name: ''
        },
        form2:{
          name: ''
        },
        formLabelWidth: '100px'
      };
    },
    created () {
      this.getroleData();
    },
    methods: {
      getroleData() {
        let _this = this;
        //左侧角色列表
        request.$get('/role/roles/valid', {}, (res) => {
          console.log(res.data.data);
          let rolemenu = res.data.data;
          _this.roleMenu = rolemenu;
          _this.finalShow3 = rolemenu
        }, _this);
      },
      // 指定一个key标识这一行的数据
      getRowKey (row) {
        return row.id //id为row的data属性之一，必须唯一且与tableData中保持一致
      },
      getchild (s) {
        this.parentId = s;
        this.getchildData();
      },
      getchildData() {
        let _this = this;
        this.search = '';
        this.search4 = '';
        request.$get('/role/role', {
          roleId: _this.parentId
        }, (res) => {
          console.log(res.data.data);
          // let tabledata = res.data.data.authorities;
          let sublist = res.data.data.sublist;
          let name = res.data.data.name;
          let alarm = res.data.data.alarm;
          console.log(sublist)
          _this.subList = sublist;
          _this.finalShow4 = sublist
          _this.roletitle = name;
          _this.form2.name = name;
          _this.alarm = alarm;
          // _this.tableData = tabledata;
          // _this.finalShow1 = tabledata
        }, _this);
        request.$get('/role/roles/extendable', {
          roleId: _this.parentId
        }, (res) => {
          console.log(res.data.data);
          let rolemenu = res.data.data;
          _this.roleMenu1 = rolemenu;
          _this.finalShow = rolemenu;
        }, _this);
      },
      changeStatus ($event){
        let _this = this;
        console.log($event)
        request.$post('/role/alarm/update', {
          roleId: _this.parentId,
          alarm: $event
        }, (res) => {
          console.log(res.data);
          let message = res.data.message;
          setTimeout(function () {
            // _this.reload();
            request.message(_this, message, 'success');
          }, 1000)
        }, _this)
      },
      fresh () {
        this.getchildData();
        request.message(this, '刷新成功', 'success');
      },
      addrole () {
        let _this = this;
        request.$post('/role/add', {
            name: _this.form1.name
          }, (res) => {
            console.log(res.data);
            _this.dialogaddrole = false;
            setTimeout(function () {
              _this.reload();
              request.message(_this, '角色添加成功', 'success');
            }, 1000)
          }, _this)
      },
      removerole () {
        let _this = this;
        this.$confirm('此操作将删除该角色，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          request.$post('/role/delete', {
            roleId: _this.parentId
          }, (res) => {
            console.log(res.data);
            setTimeout(function () {
              _this.reload();
              request.message(_this, '角色删除成功', 'success');
            }, 1000)
          }, _this)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      editrole () {
        let _this = this
        request.$post('/role/update', {
          name: _this.form2.name,
          roleId: _this.parentId
        }, (res) => {
          console.log(res.data);
          _this.dialogeditrole = false;
          setTimeout(function () {
            _this.roletitle = _this.form2.name;
            _this.getroleData();
            // _this.reload();
            request.message(_this, '角色更新成功', 'success');
          }, 1000)
        }, _this)
      },
      roleadd (e) {
        let _this = this
        this.roleId = e;
        request.$post('/role/extend', {
          roleId: e,
          parentId: _this.parentId
        }, (res) => {
          console.log(res.data);
          setTimeout(function () {
            _this.getchildData();
            // _this.reload();
            request.message(_this, '继承角色添加成功', 'success');
          }, 1000)
        }, _this)
      },
      roleremove (e) {
        let _this = this;
        this.roleId = e;
        this.$confirm('此操作将删除该继承角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          request.$post('/role/disinherit', {
            parentId: _this.parentId,
            roleId: e
          }, (res) => {
            console.log(res.data);
            setTimeout(function () {
              _this.getchildData();
              // _this.reload();
              request.message(_this, '继承角色删除成功', 'success');
            }, 1000)
          }, _this)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      // handleSelectionChange(val) {
      //   this.multipleSelection = val;
      //   this.batchPassArr = [] //每次点击需清空原本数组的内容
      //   this.multipleSelection.map(item => { //遍历数组，把id存进自定义的数组里
      //     this.batchPassArr.push(item.id)
      //   })
      //   this.batchPassArr = this.batchPassArr.join(',')
      //   console.log(this.batchPassArr)
      // },
      // handleSelectionChange2(val) {
      //   this.multipleSelection2 = val;
      //   this.batchPassArr2 = [] //每次点击需清空原本数组的内容
      //   this.multipleSelection2.map(item => { //遍历数组，把id存进自定义的数组里
      //     this.batchPassArr2.push(item.id)
      //   })
      //   this.batchPassArr2 = this.batchPassArr2.join(',')
      //   console.log(this.batchPassArr2)
      // },
      // bindit () {
      //   let _this = this;
      //   request.$post('/role/auths/bind', {
      //     authIds: _this.batchPassArr2,
      //     roleId: _this.parentId
      //   }, (res) => {
      //     console.log(res.data);
      //     setTimeout(function () {
      //       _this.reload();
      //       request.message(_this, '绑定权限成功', 'success');
      //     }, 1000)
      //   }, _this)
      // },
      // unbindit () {
      //   let _this = this;
      //   this.$confirm('此操作将批量解绑所选权限, 是否继续?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     request.$post('/role/auths/unbind', {
      //       authIds: _this.batchPassArr,
      //       roleId: _this.parentId
      //     }, (res) => {
      //       console.log(res.data);
      //       setTimeout(function () {
      //         _this.reload();
      //         request.message(_this, '权限解绑成功', 'success');
      //       }, 1000)
      //     }, _this)
      //   }).catch(() => {
      //     this.$message({
      //       type: 'info',
      //       message: '已取消解绑'
      //     });
      //   });
      // },
      handleSearch(val) {
        let search = val;
        if (search === '') {
          this.finalShow = this.roleMenu1;
        }
        if (search !== '') {
          this.finalShow = this.roleMenu1.filter(
            (data) =>
              !search || data.roleId.toString().includes(search.toString()) || data.name.toLowerCase().includes(search.toLowerCase())
          );
        }
      },
      // handleSearch1(val) {
      //   let search1 = val;
      //   if (search1 === '') {
      //     this.finalShow1 = this.tableData;
      //   }
      //   if (search1 !== '') {
      //     this.finalShow1 = this.tableData.filter(
      //       (data) =>
      //         !search1 || data.id.toString().includes(search1.toString()) || data.name.toLowerCase().includes(search1.toLowerCase())
      //     );
      //   }
      // },
      // handleSearch2(val) {
      //   let search2 = val;
      //   if (search2 === '') {
      //     this.finalShow2 = this.tableDataAll;
      //   }
      //   if (search2 !== '') {
      //     this.finalShow2 = this.tableDataAll.filter(
      //       (data) =>
      //         !search2 || data.id.toString().includes(search2.toString()) || data.name.toLowerCase().includes(search2.toLowerCase())
      //     );
      //   }
      // },
      handleSearch3(val) {
        let search3 = val;
        if (search3 === '') {
          this.finalShow3 = this.roleMenu;
        }
        if (search3 !== '') {
          this.finalShow3 = this.roleMenu.filter(
            (data) =>
              !search3 || data.roleId.toString().includes(search3.toString()) || data.name.toLowerCase().includes(search3.toLowerCase())
          );
        }
      },
      handleSearch4(val) {
        let search4 = val;
        if (search4 === '') {
          this.finalShow4 = this.subList;
        }
        if (search4 !== '') {
          this.finalShow4 = this.subList.filter(
            (data) =>
              !search4 || data.roleId.toString().includes(search4.toString()) || data.name.toLowerCase().includes(search4.toLowerCase())
          );
        }
      },
    },
    watch: {
      //watch监视input输入值的变化,只要是watch变化了 search()就会被调用
      search(newVal) {
        this.handleSearch(newVal);
      },
      // search1(newVal) {
      //   this.handleSearch1(newVal);
      // },
      // search2(newVal) {
      //   this.handleSearch2(newVal);
      // },
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
  .expand .el-table__expand-column .cell {
    display: none;
  }

  .el-container{
    height: 500px;
    border: 1px solid #eee
  }
  .el-header {
    background-color: #ffffff;
    line-height: 60px;
  }
  .el-aside {
    color: #333;
    background-color: rgb(238, 241, 246);
    overflow-y: hidden
  }
  .el-main {
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
