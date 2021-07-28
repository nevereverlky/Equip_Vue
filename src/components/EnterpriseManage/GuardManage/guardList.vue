<template>
  <div id="wrapper">
    <div class="content-wrapper">
      <div class="container-fluid">
        <!-- Breadcrumb-->
        <div class="row pt-2 pb-2">
          <div class="col-sm-9">
            <h4 class="page-title">门禁管理</h4>
            <ol class="breadcrumb">
              <li class="breadcrumb-item active" aria-current="page">门禁管理</li>
            </ol>
          </div>
          <div class="col-sm-3">
            <div class="btn-group float-sm-right">
              <button type="button" class="btn btn-primary waves-effect waves-light" @click="importgate"><i class="fa fa-search mr-1"></i>未初始化门禁</button>
            </div>
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
                label="现有门禁概览"
                prop="title">
              <el-table-column
                prop="id">
                <template slot="header" slot-scope="scope">
                  <el-input
                    scope
                    style="width: 80%"
                    v-model="search3"
                    size="mini"
                    placeholder="输入门禁名或id搜索"
                  />
                </template>
                <template slot-scope="scope">
                  <a href="javascript:void(0);">
                    <div @click="getlocation(scope.row.guardId)">
                      <i class="icon-location-pin icons"></i>【{{scope.row.guardId}}】{{scope.row.name}}
                    </div>
                  </a>
                </template>
              </el-table-column>
              </el-table-column>
            </el-table>

            <!--<template v-for="(item, index) in guardMenu">-->
              <!--<el-menu :default-openeds="[]" text-color="#000000" active-text-color="#000000">-->
                <!--<el-menu-item :index="index" :key="index*2">-->
                  <!--<template slot="title">-->
                    <!--<div @click="getlocation(item.guardId)">-->
                      <!--<i class="icon-location-pin icons"></i>-->
                      <!--【{{item.guardId}}】{{item.name}}-->
                    <!--</div>-->
                  <!--</template>-->
                <!--</el-menu-item>-->
              <!--</el-menu>-->
            <!--</template>-->
          </el-aside>

          <el-container v-if="guardtitle !== ''">
            <el-header style="text-align: center">
              <span style="font-size:18px;color: #3b5998;font-weight: bold">{{guardtitle}}</span>
              <div class="btn-group mr-1" style="margin-left: 10px">
                <el-popover
                  placement="bottom"
                  :title="'【mac】'+guardmac"
                  width="300"
                  trigger="click"
                  :content="'【位置】'+guardlocation">
                  <button type="button" class="btn btn-outline-primary waves-effect waves-light" slot="reference">详情</button>
                </el-popover>
                <el-tooltip class="item" effect="dark" content="添加附属门禁" placement="bottom">
                  <button type="button" class="btn btn-outline-primary waves-effect waves-light" @click="dialogguards = true">附属</button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="刷新" placement="bottom">
                  <button type="button" class="btn btn-outline-primary waves-effect waves-light" @click="fresh"><i class="fa fa-refresh"></i></button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="更新该门禁" placement="bottom">
                  <button type="button" class="btn btn-outline-primary waves-effect waves-light" @click="dialogeditguard = true"><i class="fa fa-edit" style="color: #3b5998;"></i></button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="删除该门禁" placement="right">
                  <button type="button" class="btn btn-outline-primary waves-effect waves-light" @click="removeguard"><i class="fa fa-trash-o" style="color: #3b5998;"></i></button>
                </el-tooltip>
              </div>
              <div style="float: right">
                <span style="font-size:12px;color: #8e8e8e">是否更新为仓库</span>
                <el-switch
                  v-model="warehouse"
                  active-color="#02ba5a"
                  inactive-color="#8e8e8e"
                  @change="changeStatus">
                </el-switch>
              </div>
            </el-header>

            <el-main>
              <template>
                <el-table
                  :data="tableData"
                  style="width: 100%"
                  height="390"
                  :header-cell-style="{color: 'black', fontSize: '14px'}">
                  <el-table-column
                    prop="guard"
                    label="附属门禁"
                    width="250">
                    <template slot-scope="scope">
                      【{{scope.row.id}}】{{scope.row.name}}<el-tag v-if="scope.row.warehouse" size="mini" style="margin-left: 10px">{{scope.row.warehouse? '仓库':''}}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="mac"
                    label="mac"
                    width="200">
                    <template slot-scope="scope">
                      {{scope.row.mac}}
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="location"
                    label="位置">
                    <template slot-scope="scope">
                      {{scope.row.location}}
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="action"
                    label="操作"
                    width="150">
                    <template slot-scope="scope">
                      <button type="button" class="btn btn-sm btn-round btn-warning waves-effect waves-light" @click="guardremove(scope.row.id)">移除</button>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </el-main>
          </el-container>

          <div v-else class="col-12 col-lg-2 col-xl-2 text-center" style="display: flex;align-items: center;margin-left: 30%">
            <div class="card-body">
              <div class="icon-box">
                <i class="fa fa-mouse-pointer text-facebook"></i>
              </div>
              <hr>
              <h5 class="mb-0 mt-3">请先选择门禁</h5>
            </div>
          </div>
        </el-container>

        <el-dialog title="添加附属门禁" :visible.sync="dialogguards" width="30%">
          <p>当前选中：【{{parentId}}】{{guardtitle}}</p>
          <el-table
            :data="finalShow"
            style="width: 100%"
            height="245px"
            cell-style="font-size: 14px">
            <el-table-column>
              <template slot="header" slot-scope="scope">
                <el-input
                  scope
                  style="width: 80%"
                  v-model="search"
                  size="mini"
                  placeholder="输入门禁名或id搜索"
                />
              </template>
              <template slot-scope="scope">
                <div @click="getsearch(scope.row.guardId)">
                  <a href="javascript:void(0);">【{{scope.row.guardId}}】{{scope.row.name}}</a>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogguards = false" size="small">取 消</el-button>
            <el-button type="primary" @click="guardadd" size="small" plain>确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="未初始化门禁" :visible.sync="dialogimportgate" width="40%">
                <div class="code-input-main">
                  <p>扫描网段</p>
                  <input
                    ref="lbj0"
                    pattern="\d*"
                    class="code-input-main-item"
                    v-model="gateway0"
                    oninput="value=value.length>3?value.substr(0,3):value;"
                    placeholder=""
                    maxlength="3"
                    type="number"/>
                  <input
                    ref="lbj1"
                    pattern="\d*"
                    class="code-input-main-item"
                    v-model="gateway1"
                    oninput="value=value.length>3?value.substr(0,3):value;"
                    placeholder=""
                    maxlength="3"
                    type="number"/>
                  <input
                    ref="lbj2"
                    pattern="\d*"
                    class="code-input-main-item"
                    v-model="gateway2"
                    oninput="value=value.length>3?value.substr(0,3):value;"
                    placeholder=""
                    maxlength="3"
                    type="number"/>
                  <el-tooltip class="item" effect="dark" content="示例：192 168 1" placement="right-start">
                    <i class="el-icon-question"></i>
                  </el-tooltip>
                  <button type="button" class="btn btn-outline-primary btn-sm btn-round waves-effect waves-light" @click="getmac" style="margin-left: 150px">扫描</button>
                </div>
            <el-table
              ref="multipleTable2"
              :data="macMenu"
              height="300"
              style="width: 100%;margin-top: 50px"
              :header-cell-style="{color: 'black', fontSize: '14px'}">
              <el-table-column
                label="mac概览"
                prop="mac">
                  <template slot-scope="scope">
                    {{scope.row}}
                  </template>
              </el-table-column>
            </el-table>
        </el-dialog>

        <el-dialog title="更新门禁" :visible.sync="dialogeditguard" width="30%">
          <el-form :model="form3">
            <el-form-item label="门禁名称" :label-width="formLabelWidth">
              <el-input v-model="form3.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="门禁位置" :label-width="formLabelWidth">
              <el-input v-model="form3.location" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogeditguard = false" size="small">取 消</el-button>
            <el-button type="primary" @click="editguard" size="small" plain>确 定</el-button>
          </div>
        </el-dialog>

      </div>
    </div>
  </div>
</template>

<script>
import request from '../../../utils/request'
export default {
  name: 'guardList',
  inject: ['reload'],
  data () {
    return {
      warehouse: '',
      finalShow: [], // 可附属门禁概览
      finalShow3: [], //3侧边门禁总览
      search: '', //input的值
      search3: '', //input的值
      guardtitle: '',
      guardlocation: '暂无位置信息',
      guardmac: '暂无mac',
      // location: '',
      parentId: '',
      guardId: '',
      guardMenu: [], //3侧边门禁总览
      guardMenu1: [], // 可附属门禁概览
      macMenu: [], //2mac概览
      tableData: [], //已附属门禁列表
      dialogguards: false,
      dialogimportgate: false,
      dialogeditguard: false,
      form3: {
        name: '',
        location: ''
      },
      formLabelWidth: '120px',
      gateway0: '', // 输入框1的值
      gateway1: '', // 输入框2的值
      gateway2: '', // 输入框3的值
    };
  },
  created () {
    this.getguardData();
  },
  methods: {
    getguardData() {
      let _this = this;
      request.$get('/guard/guards', {}, (res) => {
        console.log(res.data.data);
        let guardmenu = res.data.data;
        _this.guardMenu = guardmenu;
        _this.finalShow3 = guardmenu;
      }, _this);
    },
    getsearch (s) {
      this.search = s
    },
    getlocation (s) {
      this.parentId = s;
      this.getguardInfo();
    },
    getguardInfo() {
      let _this = this;
      request.$get('/guard/guard', {
        guardId: _this.parentId
      }, (res) => {
        console.log(res.data.data);
        let tabledata = res.data.data.guard.sublist;
        let name = res.data.data.guard.name;
        let location = res.data.data.guard.location;
        let mac = res.data.data.guard.mac;
        let warehouse =res.data.data.guard.warehouse;
        _this.guardmac = mac;
        _this.guardlocation = location;
        _this.form3.location = location;
        _this.guardtitle = name;
        _this.form3.name = name;
        _this.tableData = tabledata;
        _this.warehouse = warehouse;
      }, _this);
      request.$get('/guard/guards/appendable', {
        guardId: _this.parentId
      }, (res) => {
        console.log(res.data.data);
        let guardmenu = res.data.data;
        _this.guardMenu1 = guardmenu;
        _this.finalShow = guardmenu
      }, _this);
    },
    fresh () {
      this.getguardInfo();
      request.message(this, '刷新成功', 'success');
    },
    changeStatus ($event){
      let _this = this;
      console.log($event);
      _this.canUpdateWareHouse = $event;
      request.$post('/guard/wareHouse/update', {
        guardId: _this.parentId,
        wareHouse: _this.warehouse
      }, (res) => {
        console.log(res.data);
        let message = res.data.message;
        setTimeout(function () {
          _this.getguardInfo();
          // _this.reload();
          request.message(_this, message, 'success');
        }, 1000)
      }, _this)
      _this.getguardInfo();
    },
    importgate () {
      let _this = this;
      _this.dialogimportgate = true
      _this.$nextTick( () =>{
        _this.$refs.lbj0.focus()
      })
    },
    getmac () {
      // console.log(this.gateway0,this.gateway1,this.gateway2)
      let _this = this;
      console.log(_this.gateway0);
      console.log(_this.gateway1);
      console.log(_this.gateway2);
      request.$get('/guard/uninitializedMacs', {
        first: _this.gateway0,
        second: _this.gateway1,
        third: _this.gateway2
      }, (res) => {
        console.log(res.data.data);
        let macmenu = res.data.data;
        _this.macMenu = macmenu;
        request.message(_this, '网段扫描成功', 'success');
      }, _this);
    },
    removeguard () {
      let _this = this;
      this.$confirm('此操作将删除该门禁, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request.$post('/guard/delete', {
          guardId: _this.parentId
        }, (res) => {
          console.log(res.data);
          setTimeout(function () {
            _this.reload();
            request.message(_this, '门禁删除成功', 'success');
          }, 1000)
        }, _this)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    editguard () {
      let _this = this
      request.$post('/guard/update', {
        guardId: _this.parentId,
        location: _this.form3.location,
        name: _this.form3.name
      }, (res) => {
        console.log(res.data);
        _this.dialogeditguard = false;
        setTimeout(function () {
          _this.guardtitle = _this.form3.name;
          _this.guardlocation = _this.form3.location;
         _this.getguardData();
          // _this.reload();
          request.message(_this, '门禁更新成功', 'success');
        }, 1000)
      }, _this)
    },
    guardadd () {
      let _this = this
      request.$post('/guard/child/add', {
        guardId: _this.search,
        parentId: _this.parentId
      }, (res) => {
        console.log(res.data);
        _this.dialogguards = false;
        setTimeout(function () {
          _this.getguardInfo();
          // _this.reload();
          request.message(_this, '附属门禁添加成功', 'success');
        }, 1000)
      }, _this)
    },
    guardremove (e) {
      let _this = this;
      _this.guardId = e;
      this.$confirm('此操作将删除该附属门禁, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request.$post('/guard/child/remove', {
          parentId: _this.parentId,
          guardId: _this.guardId
        }, (res) => {
          console.log(res.data);
          setTimeout(function () {
            _this.getguardInfo();
            // _this.reload();
            request.message(_this, '附属门禁删除成功', 'success');
          }, 1000)
        }, _this)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleSearch(val) {
      let search = val;
      if (search === '') {
        this.finalShow = this.guardMenu1;
      }
      if (search !== '') {
        this.finalShow = this.guardMenu1.filter(
          (data) =>
            !search || data.guardId.toString().includes(search.toString()) || data.name.toLowerCase().includes(search.toLowerCase())
        );
      }
    },
    handleSearch3(val) {
      let search3 = val;
      if (search3 === '') {
        this.finalShow3 = this.guardMenu;
      }
      if (search3 !== '') {
        this.finalShow3 = this.guardMenu.filter(
          (data) =>
            !search3 || data.guardId.toString().includes(search3.toString()) || data.name.toLowerCase().includes(search3.toLowerCase())
        );
      }
    },
  },
  watch: {
    //watch监视input输入值的变化,只要是watch变化了 search()就会被调用
    search (newVal) {
      this.handleSearch(newVal);
    },
    // search2 (newVal) {
    //   this.handleSearch2(newVal);
    // },
    search3 (newVal) {
      this.handleSearch3(newVal);
    },
    'gateway0': {
      deep: true,
      handler(newVal,oldVal){
        if (newVal.length === 3){
          this.$nextTick(() =>{
            this.$refs.lbj1.focus()
          })
        }else if (newVal.length === 0){
          this.$nextTick(() =>{
            this.$refs.lbj0.focus()
          })
        }
      }
    },
    'gateway1': {
      deep: true,
      handler (newVal, oldVal) {
        if (newVal.length === 3) {
          this.$nextTick(() => {
            this.$refs.lbj2.focus()
          })
        } else if (newVal.length === 0) {
          this.$nextTick(() => {
            this.$refs.lbj0.focus()
          })
        }
      }
    },
      'gateway2': {
        deep: true,
        handler (newVal, oldVal) {
          if (newVal.length === 3){
            this.$nextTick(() =>{
              this.$refs.lbj2.focus()
            })
          }else if (newVal.length === 0) {
            this.$nextTick(() => {
              this.$refs.lbj1.focus()
            })
          }
        }
      }
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
    .el-main {
      background-color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
    }

  .code-input-main {
    display: flex;
    flex-direction: row;
    font-size: 17px;
    justify-content: space-around;
    width:100%;
    height: 30px;
    margin-top: 5px;
  }
  .code-input-main-item {
    width: 70px;
    height: 35px;
    border:1.5px solid rgba(230,230,230,1);
    border-radius:6px;
    display: inline-block;
    text-align: center;
    z-index: 1;
    font-size: 14px;
    vertical-align: top;
  }
</style>
