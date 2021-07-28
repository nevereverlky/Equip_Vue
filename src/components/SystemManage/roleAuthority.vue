<template>
<div id="wrapper">
  <div class="content-wrapper" id="role_authority">
    <div class="container-fluid">
      <!-- Breadcrumb-->
      <div class="row pt-2 pb-2">
        <div class="col-sm-9">
          <h4 class="page-title">角色权限管理</h4>
          <ol class="breadcrumb">
            <li class="breadcrumb-item active" aria-current="page">系统管理</li>
            <li class="breadcrumb-item active" aria-current="page">角色权限管理</li>
          </ol>
        </div>
      </div>
      <!-- End Breadcrumb-->

      <el-container style="height: 500px; border: 1px solid #eee">
        <el-aside width="300px" style="background-color: rgb(238, 241, 246);overflow-y: hidden">
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
                    <div @click="getauth(scope.row.roleId)">
                    <i class="el-icon-user"></i>【{{scope.row.roleId}}】{{scope.row.name}}
                    <!--<button v-if="scope.row.roleId !== 1" type="button" class="btn btn-outline-primary btn-sm btn-round waves-effect waves-light" @click="dialogroles = true" style="float: right;padding-bottom: 5px;padding-top: 5px">继承</button>-->
                    </div>
                  </a>
                </template>
              </el-table-column>
          </el-table>

          <!--<template v-for="(item, index) in roleMenu">-->
           <!--<el-menu :default-openeds="[]" text-color="#000000" active-text-color="#000000">-->
            <!--<el-submenu :index="index" v-if="item.sublist.length !== 0" :key="index*30">-->
              <!--<template slot="title">-->
                <!--<div @click="getauth(item.roleId)">-->
                <!--<i class="el-icon-user"></i>-->
                <!--【{{item.roleId}}】{{item.name}}-->
                <!--<button type="button" class="btn btn-outline-primary btn-sm btn-round waves-effect waves-light" @click="dialogroles = true" style="float: right;margin-top: 13px;right: 22px">继承</button>-->
                <!--</div>-->
              <!--</template>-->
              <!--<el-menu-item-group>-->
                <!--<template slot="title">继承的角色</template>-->
                <!--<el-menu-item :index="indexs" v-for="(items, indexs) in item.sublist" :key="indexs">-->
                  <!--<div @click="getids(items.roleId)">-->
                    <!--【{{items.roleId}}】{{items.name}}-->
                    <!--<button type="button" class="btn btn-outline-primary btn-sm btn-round  waves-effect waves-light" @click="roleremove" style="float: right;margin-top: 12px;">移除</button>-->
                  <!--</div>-->
                <!--</el-menu-item>-->
              <!--</el-menu-item-group>-->
            <!--</el-submenu>-->
              <!--<el-menu-item :index="index" v-else  :key="index*2">-->
                <!--<template slot="title">-->
                  <!--<div @click="getauth(item.roleId)">-->
                  <!--<i class="el-icon-user"></i>-->
                    <!--【{{item.roleId}}】{{item.name}}-->
                  <!--<button type="button" class="btn btn-outline-primary btn-sm btn-round waves-effect waves-light" @click="dialogroles = true" style="float: right;margin-top: 13px;right: 22px">继承</button>-->
                <!--</div>-->
                <!--</template>-->
              <!--</el-menu-item>-->
          <!--</el-menu>-->
         <!--</template>-->
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
          </el-header>

          <el-main>
            <!--:row-key="getRowKey"-->
            <el-table
              ref="multipleTable"
              tooltip-effect="dark"
              @selection-change="handleSelectionChange"
              :data="finalShow1"
              height="390"
              style="margin-right: 10px"
              :header-cell-style="{color: 'black', fontSize: '14px'}">
              <el-table-column
                type="selection"
                width="50">
              </el-table-column>
              <!--:reserve-selection="true"-->
              <el-table-column
                label="已绑定权限列表">
              <el-table-column
                prop="id">
                  <template slot="header" slot-scope="scope">
                    <el-input
                      scope
                      style="width: 80%"
                      v-model="search1"
                      size="mini"
                      placeholder="输入权限名或id搜索"
                    />
                  </template>
                  <template slot-scope="scope">
                    【{{scope.row.id}}】{{scope.row.name}}
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
              style="margin-left: 10px"
              :header-cell-style="{color: 'black', fontSize: '14px'}">
              <el-table-column
                type="selection"
                width="50">
              </el-table-column><!--:reserve-selection="true"-->
              <el-table-column
                label="可绑定权限概览">
                <el-table-column
                  prop="id">
                  <template slot="header" slot-scope="scope">
                    <el-input
                      scope
                      style="width: 80%"
                      v-model="search2"
                      size="mini"
                      placeholder="输入权限名或id搜索"
                    />
                  </template>
                  <template slot-scope="scope">
                    【{{scope.row.id}}】{{scope.row.name}}
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

      <!--<el-dialog title="添加继承角色" :visible.sync="dialogroles" width="50%">-->
        <!--<div style="display: flex;flex-direction: row">-->
          <!--<el-table-->
            <!--ref="multipleTable"-->
            <!--border-->
            <!--:data="finalShow4"-->
            <!--height="400"-->
            <!--style="width: 50%;margin-right: 10px"-->
            <!--:header-cell-style="{color: 'black', fontSize: '14px'}">-->
            <!--<el-table-column-->
              <!--label="已继承角色列表">-->
              <!--<el-table-column-->
                <!--prop="id">-->
                <!--<template slot="header" slot-scope="scope">-->
                  <!--<el-input-->
                    <!--scope-->
                    <!--style="width: 80%"-->
                    <!--v-model="search4"-->
                    <!--size="mini"-->
                    <!--placeholder="输入角色名或id搜索"-->
                  <!--/>-->
                <!--</template>-->
                <!--<template slot-scope="scope">-->
                  <!--【{{scope.row.roleId}}】{{scope.row.name}}-->
                  <!--<button @click="roleremove(scope.row.roleId)" type="button" class="btn btn-outline-primary btn-sm btn-round  waves-effect waves-light"  style="float: right;padding-bottom: 5px;padding-top: 5px">移除</button>-->
                <!--</template>-->
              <!--</el-table-column>-->
            <!--</el-table-column>-->
          <!--</el-table>-->

          <!--<el-table-->
            <!--ref="multipleTable2"-->
            <!--border-->
            <!--:data="finalShow"-->
            <!--height="400"-->
            <!--style="width: 50%;margin-left: 10px"-->
            <!--:header-cell-style="{color: 'black', fontSize: '14px'}">-->
            <!--<el-table-column-->
              <!--label="可继承角色概览">-->
              <!--<el-table-column-->
                <!--prop="id">-->
                <!--<template slot="header" slot-scope="scope">-->
                  <!--<el-input-->
                    <!--scope-->
                    <!--style="width: 80%"-->
                    <!--v-model="search"-->
                    <!--size="mini"-->
                    <!--placeholder="输入角色名或id搜索"-->
                  <!--/>-->
                <!--</template>-->
                <!--<template slot-scope="scope">-->
                  <!--【{{scope.row.roleId}}】{{scope.row.name}}-->
                  <!--<button @click="roleadd(scope.row.roleId)" v-if="scope.row.roleId !== 1" type="button" class="btn btn-outline-primary btn-sm btn-round waves-effect waves-light" style="float: right;padding-bottom: 5px;padding-top: 5px">添加</button>-->
                <!--</template>-->
              <!--</el-table-column>-->
            <!--</el-table-column>-->
          <!--</el-table>-->
        <!--</div>-->
        <!--&lt;!&ndash;<el-table&ndash;&gt;-->
          <!--&lt;!&ndash;:data="finalShow"&ndash;&gt;-->
          <!--&lt;!&ndash;style="width: 100%"&ndash;&gt;-->
          <!--&lt;!&ndash;height="245px"&ndash;&gt;-->
          <!--&lt;!&ndash;cell-style="font-size: 14px">&ndash;&gt;-->
          <!--&lt;!&ndash;<el-table-column>&ndash;&gt;-->
            <!--&lt;!&ndash;<template slot="header" slot-scope="scope">&ndash;&gt;-->
              <!--&lt;!&ndash;<el-input&ndash;&gt;-->
                <!--&lt;!&ndash;scope&ndash;&gt;-->
                <!--&lt;!&ndash;style="width: 80%"&ndash;&gt;-->
                <!--&lt;!&ndash;v-model="search"&ndash;&gt;-->
                <!--&lt;!&ndash;size="mini"&ndash;&gt;-->
                <!--&lt;!&ndash;placeholder="输入角色名或id搜索"&ndash;&gt;-->
              <!--&lt;!&ndash;/>&ndash;&gt;-->
            <!--&lt;!&ndash;</template>&ndash;&gt;-->
            <!--&lt;!&ndash;<template slot-scope="scope">&ndash;&gt;-->
              <!--&lt;!&ndash;<div @click="getsearch(scope.row.roleId)">&ndash;&gt;-->
              <!--&lt;!&ndash;【{{scope.row.roleId}}】{{scope.row.name}}&ndash;&gt;-->
              <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--&lt;!&ndash;</template>&ndash;&gt;-->
          <!--&lt;!&ndash;</el-table-column>&ndash;&gt;-->
        <!--&lt;!&ndash;</el-table>&ndash;&gt;-->
        <!--&lt;!&ndash;<div slot="footer" class="dialog-footer">&ndash;&gt;-->
          <!--&lt;!&ndash;<el-button @click="dialogroles = false">取 消</el-button>&ndash;&gt;-->
          <!--&lt;!&ndash;<el-button type="primary" @click="roleadd">确 定</el-button>&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--</el-dialog>-->

      <!--<el-dialog title="添加角色" :visible.sync="dialogaddrole" width="30%">-->
        <!--<el-form :model="form1">-->
          <!--<el-form-item label="角色名" :label-width="formLabelWidth">-->
            <!--<el-input v-model="form1.name" autocomplete="off"></el-input>-->
          <!--</el-form-item>-->
        <!--</el-form>-->
        <!--<div slot="footer" class="dialog-footer">-->
          <!--<el-button @click="dialogaddrole = false" size="small">取 消</el-button>-->
          <!--<el-button type="primary" @click="addrole" size="small" plain>确 定</el-button>-->
        <!--</div>-->
      <!--</el-dialog>-->

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
  name: 'roleAuthority',
  inject: ['reload'],
  // props: {
  //   notice: {
  //     type: String,
  //     required: true
  //   }
  // },
  data () {
      return {
        // finalShow: [],  // 可继承角色概览
        finalShow1: [], //1已绑定权限列表
        finalShow2: [], //2可绑定权限概览
        finalShow3: [], //3侧边角色总览
        // finalShow4: [], //4已继承角色列表
        // search: '',
        search1: '',
        search2: '',
        search3: '',
        // search4: '',
        roletitle: '',
        parentId: '',
        roleId: '',
        roleMenu: [], //3侧边角色总览
        // roleMenu1: [], // 可继承角色概览
        // subList: [], //4已继承角色列表
        tableData: [], //1已绑定权限列表
        tableDataAll: [], //2可绑定权限概览
        multipleSelection: [],
        batchPassArr: [],
        multipleSelection2: [],
        batchPassArr2: [],
        // dialogroles: false,
        dialogaddrole: false,
        dialogeditrole: false,
        // form1:{
        //   name: ''
        // },
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
    // 指定一个key标识这一行的数据（多选框相关）
    // getRowKey (row) {
    //   return row.id //id为row的data属性之一，必须唯一且与tableData中保持一致
    // },
    //点击角色
    getauth (s) {
      this.parentId = s;
      this.getauthData();
    },
    getauthData() {
      let _this = this;
      //清除已选
      this.$nextTick(() => {
        this.$refs.multipleTable.clearSelection();
        this.$refs.multipleTable2.clearSelection();
      });
      this.search1 = '';
      this.search2 = '';
      //获得该角色的已绑定权限列表，以及该角色可绑定权限列表
      request.$get('/role/role', {
        roleId: _this.parentId
      }, (res) => {
        console.log(res.data.data);
        let tabledata = res.data.data.authorities;
        // let sublist = res.data.data.sublist;
        let name = res.data.data.name;
        // console.log(sublist)
        // _this.subList = sublist;
        // _this.finalShow4 = sublist
        _this.roletitle = name;
        _this.form2.name = name;
        _this.tableData = tabledata;
        _this.finalShow1 = tabledata;
      }, _this);
      request.$get('/auth/auths/bindable', {
        roleId: _this.parentId
      }, (res) => {
        console.log(res.data.data);
        let tabledataall = res.data.data;
        _this.tableDataAll = tabledataall;
        _this.finalShow2 = tabledataall
      }, _this);
      // request.$get('/role/roles/extendable', {
      //   roleId: s
      // }, (res) => {
      //   console.log(res.data.data);
      //   let rolemenu = res.data.data;
      //   _this.roleMenu1 = rolemenu;
      //   _this.finalShow = rolemenu;
      // }, _this);
    },
    //刷新操作
    fresh () {
      this.getauthData();
      request.message(this, '刷新成功', 'success');
    },
    // addrole () {
    //   let _this = this;
    //   request.$post('/role/add', {
    //       name: _this.form1.name
    //     }, (res) => {
    //       console.log(res.data);
    //       _this.dialogaddrole = false;
    //       setTimeout(function () {
    //         _this.reload();
    //         request.message(_this, '角色添加成功', 'success');
    //       }, 1000)
    //     }, _this)
    // },
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
    // roleadd (e) {
    //   let _this = this
    //   this.roleId = e;
    //   request.$post('/role/extend', {
    //     roleId: e,
    //     parentId: _this.parentId
    //   }, (res) => {
    //     console.log(res.data);
    //     setTimeout(function () {
    //       _this.reload();
    //       request.message(_this, '继承角色添加成功', 'success');
    //     }, 1000)
    //   }, _this)
    // },
    // roleremove (e) {
    //   let _this = this;
    //   this.roleId = e;
    //   this.$confirm('此操作将删除该继承角色, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     request.$post('/role/disinherit', {
    //       parentId: _this.parentId,
    //       roleId: e
    //     }, (res) => {
    //       console.log(res.data);
    //       setTimeout(function () {
    //         _this.reload();
    //         request.message(_this, '继承角色删除成功', 'success');
    //       }, 1000)
    //     }, _this)
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     });
    //   });
    // },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.batchPassArr = [] //每次点击需清空原本数组的内容
      this.multipleSelection.map(item => { //遍历数组，把id存进自定义的数组里
        this.batchPassArr.push(item.id)
      })
      this.batchPassArr = this.batchPassArr.join(',')
      console.log(this.batchPassArr)
      // if(this.batchPassArr !== undefined || this.batchPassArr.length > 0){
      //   this.$refs.multipleTable2.clearSelection();
      //   // _this.batchPassArr2 = [];
      //   // _this.multipleSelection2 = [];
      // }
    },
    handleSelectionChange2(val) {
      this.multipleSelection2 = val;
      this.batchPassArr2 = [] //每次点击需清空原本数组的内容
      this.multipleSelection2.map(item => { //遍历数组，把id存进自定义的数组里
        this.batchPassArr2.push(item.id)
      })
      this.batchPassArr2 = this.batchPassArr2.join(',')
      console.log(this.batchPassArr2)
      // if(this.batchPassArr2 !== undefined || this.batchPassArr2.length > 0){
      //   this.$refs.multipleTable.clearSelection();
      //   // _this.batchPassArr = [];
      //   // _this.multipleSelection = [];
      // }
    },
    bindit () {
      let _this = this;
        request.$post('/role/auths/bind', {
          authIds: _this.batchPassArr2,
          roleId: _this.parentId
        }, (res) => {
          console.log(res.data);
          setTimeout(function () {
            _this.getauthData();
            // _this.reload();
            request.message(_this, '绑定权限成功', 'success');
          }, 1000)
        }, _this)
    },
    unbindit () {
      let _this = this;
      this.$confirm('此操作将批量解绑所选权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request.$post('/role/auths/unbind', {
          authIds: _this.batchPassArr,
          roleId: _this.parentId
        }, (res) => {
          console.log(res.data);
          setTimeout(function () {
            _this.getauthData();
            // _this.reload();
            request.message(_this, '权限解绑成功', 'success');
          }, 1000)
        }, _this)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消解绑'
        });
      });
    },
    // handleSearch(val) {
    //   let search = val;
    //   if (search === '') {
    //     this.finalShow = this.roleMenu1;
    //   }
    //   if (search !== '') {
    //     this.finalShow = this.roleMenu1.filter(
    //       (data) =>
    //         !search || data.roleId.toString().includes(search.toString()) || data.name.toLowerCase().includes(search.toLowerCase())
    //     );
    //   }
    // },
    handleSearch1(val) {
      let search1 = val;
      if (search1 === '') {
        this.finalShow1 = this.tableData;
      }
      if (search1 !== '') {
        this.finalShow1 = this.tableData.filter(
          (data) =>
            !search1 || data.id.toString().includes(search1.toString()) || data.name.toLowerCase().includes(search1.toLowerCase())
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
            !search2 || data.id.toString().includes(search2.toString()) || data.name.toLowerCase().includes(search2.toLowerCase())
        );
      }
    },
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
    // handleSearch4(val) {
    //   let search4 = val;
    //   if (search4 === '') {
    //     this.finalShow4 = this.subList;
    //   }
    //   if (search4 !== '') {
    //     this.finalShow4 = this.subList.filter(
    //       (data) =>
    //         !search4 || data.roleId.toString().includes(search4.toString()) || data.name.toLowerCase().includes(search4.toLowerCase())
    //     );
    //   }
    // },
  },
  watch: {
    //watch监视input输入值的变化,只要是watch变化了 search()就会被调用
    // search(newVal) {
    //   this.handleSearch(newVal);
    // },
    search1(newVal) {
      this.handleSearch1(newVal);
    },
    search2(newVal) {
      this.handleSearch2(newVal);
    },
    search3(newVal) {
      this.handleSearch3(newVal);
    },
    // search4(newVal) {
    //   this.handleSearch4(newVal);
    // },
  }
}
</script>

<style scoped>
  .expand .el-table__expand-column .cell {
    display: none;
  }

  .el-header {
    background-color: #ffffff;
    line-height: 60px;
  }
  .el-aside {
    color: #333;
  }
  .el-main {
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
