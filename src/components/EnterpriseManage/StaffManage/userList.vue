<template>
  <div class="content-wrapper">
    <div class="container-fluid">
      <!-- Breadcrumb-->
      <div class="row pt-2 pb-2">
        <div class="col-sm-7">
          <h4 class="page-title">基本信息管理</h4>
          <ol class="breadcrumb">
            <li class="breadcrumb-item active" aria-current="page">人员信息管理</li>
            <li class="breadcrumb-item active" aria-current="page">基本信息管理</li>
          </ol>
        </div>
        <div class="col-sm-5">
          <div class="btn-group float-sm-right">
            <div class="btn-group ">
              <button type="button" class="btn btn-primary waves-effect waves-light" @click="dialogusers = true"><i class="fa fa-file-excel-o mr-1"></i>Excel批量导入人员</button>
              <el-tooltip class="item" effect="dark" content="文件需要以人员账号命名" placement="bottom">
              <button type="button" class="btn btn-outline-primary waves-effect waves-light" @click="dialogfaces = true"><i class="fa fa-file-image-o mr-1"></i>批量导入人脸信息</button>
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>
      <!-- End Breadcrumb-->

      <div>
        <!--finalShow.slice((currentPage-1)*pageSize,currentPage*pageSize)-->
        <el-table
          :data="userData"
          :header-cell-style="{color: 'black', fontSize: '14px'}"
          style="width: 100%"
          cell-style="font-size: 13px">
          <el-table-column>
            <template slot="header" slot-scope="scope">
              <div style="display: flex;flex-direction: row;justify-content: space-between">
                <el-input
                  scope
                  style="width: 15%"
                  v-model="search_account"
                  size="mini"
                  placeholder="按照账号搜索"
                />
                <el-input
                  scope
                  style="width: 15%"
                  v-model="search_realName"
                  size="mini"
                  placeholder="按照姓名搜索"
                />
                <el-input
                  scope
                  style="width: 20%"
                  v-model="search_phone"
                  size="mini"
                  placeholder="按照联系方式搜索"
                />
                <el-input
                  scope
                  style="width: 25%"
                  v-model="search_mailbox"
                  size="mini"
                  placeholder="按照邮箱搜索"
                />
                <button type="button" class="btn btn-sm btn-dark waves-effect waves-light m-1" @click="reset">重置</button>
              </div>
            </template>
          <el-table-column
            label="账号"
            prop="userId"
            width="140">
            <template slot-scope="scope">
              {{scope.row.userInfo.account}}
            </template>
          </el-table-column>
          <el-table-column
            label="姓名"
            prop="realName"
            width="120">
            <template slot-scope="scope">
              {{scope.row.userInfo.realName}}
            </template>
          </el-table-column>
          <el-table-column
            label="联系方式"
            prop="phone"
            width="120">
            <template slot-scope="scope">
              {{scope.row.userInfo.phone}}
            </template>
          </el-table-column>
          <el-table-column
            label="邮箱"
            prop="mailbox"
            width="160">
            <template slot-scope="scope">
              {{scope.row.userInfo.mailbox}}
            </template>
          </el-table-column>
          <el-table-column
            label="补充说明"
            prop="supplement">
            <template slot-scope="scope">
              {{scope.row.userInfo.supplement}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            prop="action"
            width="380">
            <template slot-scope="scope">
              <button type="button" class="btn btn-sm btn-outline-primary waves-effect waves-light m-1" @click="getuser(scope.row.userInfo);dialogedituser = true">更新基本信息</button>
              <button type="button" class="btn btn-sm btn-primary waves-effect waves-light m-1" @click="getrole(scope.row.userInfo,scope.row.roles);dialogrole = true">角色管理</button>
              <button v-if="scope.row.hasFace" type="button" class="btn btn-sm btn-warning waves-effect waves-light m-1" @click="getid(scope.row.userInfo);dialogupdateface = true">更新人脸信息</button>
              <button v-else type="button" class="btn btn-sm btn-outline-warning waves-effect waves-light m-1" @click="getid(scope.row.userInfo);dialogimportface = true">导入人脸信息</button>
            </template>
          </el-table-column>
          </el-table-column>
        </el-table>

        <div class="block" style="margin-top:30px;float: right">
          <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         :current-page="currentPage"
                         :page-sizes="[10,20,50]"
                         :page-size="pageSize"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="userData_length">
          </el-pagination>
        </div>
      </div>

      <el-dialog title="更新基本信息" :visible.sync="dialogedituser" width="30%">
        <el-form ref="userform" :model="userform" label-width="80px" size="small">
          <el-form-item label="姓名">
            <el-col :span="24">
              <el-input v-model="userform.realName"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-col :span="24">
            <el-input suffix-icon="el-icon-phone-outline" v-model="userform.phone"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-col :span="24">
              <el-input suffix-icon="el-icon-paperclip" v-model="userform.mailbox"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="补充说明">
            <el-input type="textarea" v-model="userform.supplement"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="edituser(userform.userId)" plain>更新</el-button>
            <el-button @click="dialogedituser = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <el-dialog title="更新人脸信息" :visible.sync="dialogupdateface" :show-close="false" width="30%">
        <p>当前选中：{{username}}({{useraccount}})</p>
        <div style="display: flex;justify-content: center">
            <el-upload
              ref="upload1"
              class="upload-demo"
              action="#"
              :limit="1"
              multiple accept=".jpg,.png"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :on-change="handleChange"
              :on-exceed="handleExceed"
              :file-list="fileList"
              :auto-upload="false"
              drag>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传一个jpg/png文件，且不超过10mb</div>
            </el-upload>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="clearFiles">取 消</el-button>
          <el-button style="margin-left: 10px;" size="small" type="primary" @click="submitUpload1" plain>上传到服务器</el-button>
        </div>
      </el-dialog>

      <el-dialog title="导入人脸信息" :visible.sync="dialogimportface" :show-close="false" width="30%">
        <p>当前选中：{{username}}({{useraccount}})</p>
        <div style="display: flex;justify-content: center">
        <el-upload
          ref="upload2"
          class="upload-demo"
          action="#"
          :limit="1"
          multiple accept=".jpg,.png"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :on-change="handleChange"
          :on-exceed="handleExceed"
          :file-list="fileList"
          :auto-upload="false"
          drag>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传一个jpg/png文件，且不超过10mb</div>
        </el-upload>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="clearFiles">取 消</el-button>
          <el-button style="margin-left: 10px;" size="small" type="primary" @click="submitUpload2" plain>上传到服务器</el-button>
        </div>
      </el-dialog>

      <el-dialog title="Excel导入人员" :visible.sync="dialogusers" :show-close="false" width="30%">
        <div style="display: flex;justify-content: center">
          <el-upload
            ref="upload"
            class="upload-demo"
            action="#"
            :limit="1"
            multiple accept=".xls,.xlsx"
            :on-preview="handlePreview"
            :on-change="handleChange"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-exceed="handleExceed"
            :file-list="fileList"
            :show-file-list="fileList"
            :auto-upload="false"
            drag>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传一个.xls,.xlsx文件，且不超过10mb</div>
          </el-upload>
        </div>
          <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="clearFiles">取 消</el-button>
            <el-button style="margin-left: 10px;" size="small" type="primary" @click="submitUpload" plain>上传到服务器</el-button>
          </div>
      </el-dialog>

      <el-dialog title="批量导入人脸信息" :visible.sync="dialogfaces" :show-close="false" width="30%">
        <div style="display: flex;justify-content: center">
        <el-upload
          ref="upload3"
          class="upload-demo"
          action="#"
          multiple accept=".jpg,.png"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :on-change="handleChange"
          :file-list="fileList"
          :auto-upload="false"
          drag>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过10mb</div>
        </el-upload>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="clearFiles">取 消</el-button>
          <el-button style="margin-left: 10px;" size="small" type="primary" @click="submitUpload3" plain>上传到服务器</el-button>
        </div>
      </el-dialog>

      <el-dialog title="绑定角色" :visible.sync="dialogrole" width="50%">
        <p>当前选中：{{username}}({{useraccount}})</p>
        <div style="display: flex;flex-direction: row">
          <el-table
            ref="multipleTable"
            :row-key="getRowKey"
            tooltip-effect="dark"
            @selection-change="handleSelectionChange"
            :data="finalShow1"
            height="400"
            style="width: 50%;margin-right: 10px"
            :header-cell-style="{color: 'black', fontSize: '14px'}">
            <el-table-column
              type="selection"
              width="50"
              :reserve-selection="true">
            </el-table-column>
            <el-table-column
              label="已绑定角色列表">
              <el-table-column
                prop="id">
                <template slot="header" slot-scope="scope">
                  <el-input
                    scope
                    style="width: 80%"
                    v-model="search1"
                    size="mini"
                    placeholder="输入角色名或id搜索"
                  />
                </template>
                <template slot-scope="scope">
                  【{{scope.row.id}}】{{scope.row.name}}
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>

          <div style="display: flex;flex-direction: column;justify-content: center">
            <button type="button"
                    class="btn btn-sm waves-effect waves-light" :class="batchPassArr2 ===undefined || batchPassArr2.length <= 0? 'btn-light':'btn-warning'"
                    :style="batchPassArr2 ===undefined || batchPassArr2.length <= 0? 'cursor: not-allowed':''" style="margin-bottom: 20px"
                    @click="bindit" :disabled="batchPassArr2 ===undefined || batchPassArr2.length <= 0">
              <i class="fa fa-chevron-left"></i>绑定
            </button>
            <button type="button"
                    class="btn btn-sm waves-effect waves-light" :class="batchPassArr ===undefined || batchPassArr.length <= 0? 'btn-light':'btn-outline-warning'"
                    :style="batchPassArr ===undefined || batchPassArr.length <= 0? 'cursor: not-allowed':''"
                    @click="unbindit" :disabled="batchPassArr ===undefined || batchPassArr.length <= 0">
              解绑<i class="fa fa-chevron-right"></i>
            </button>
          </div>

          <el-table
            ref="multipleTable2"
            :row-key="getRowKey"
            tooltip-effect="dark"
            @selection-change="handleSelectionChange2"
            :data="finalShow2"
            height="400"
            style="width: 50%;margin-left: 10px"
            :header-cell-style="{color: 'black', fontSize: '14px'}">
            <el-table-column
              type="selection"
              width="50"
              :reserve-selection="true">
            </el-table-column>
            <el-table-column
              label="可绑定角色概览">
              <el-table-column
                prop="id">
                <template slot="header" slot-scope="scope">
                  <el-input
                    scope
                    style="width: 80%"
                    v-model="search2"
                    size="mini"
                    placeholder="输入角色名或id搜索"
                  />
                </template>
                <template slot-scope="scope">
                  【{{scope.row.roleId}}】{{scope.row.name}}
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import request from '../../../utils/request'
export default {
  name: 'userList',
  inject: ['reload'],
  data () {
    return {
      // finalShow: [], // 用户总表
      finalShow1: [], //1已绑定角色列表
      finalShow2: [], //2可绑定角色概览
      search_account: '',
      search_realName: '',
      search_phone: '',
      search_mailbox: '',
      search1: '', //input的值
      search2: '', //input的值
      userData: [], // 用户总表
      roleMenu: [], //2可绑定角色概览
      tableData:[], //1已绑定角色列表
      multipleSelection: [],
      batchPassArr: [],
      multipleSelection2: [],
      batchPassArr2: [],
      userId: '',
      username: '',
      useraccount: '',
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      userData_length: 0, //总条目数
      pageSize: 10, // 每页的数据条数
      dialogupdateface: false,
      dialogimportface: false,
      dialogfaces: false,
      dialogusers : false,
      dialogedituser: false,
      dialogrole: false,
      userform: {
        realName: '',
        phone: '',
        mailbox: '',
        supplement: ''
      },
      formLabelWidth: '120px',
      fileList: []
    };
  },
  created () {
    this.getuserData();
  },
  methods: {
    getuserData() {
      let _this = this;
      request.$get('/user/users', {
        size: _this.pageSize,
        fromIndex: _this.pageSize*(_this.currentPage-1),
        account: _this.search_account,
        realName: _this.search_realName,
        phone: _this.search_phone,
        mailbox: _this.search_mailbox
      }, (res) => {
        console.log(res.data.data);
        let counts = res.data.data.counts;
        let userData = res.data.data.userInfos;
        let tabledata = res.data.data.userInfos.roles;
        _this.userData = userData;
        // _this.finalShow = userData;
        _this.userData_length = counts;
        _this.tableData = tabledata;
        _this.finalShow1 = tabledata;
      }, _this);
    },
    submitUpload() {
      let _this = this
      // const loading = _this.$loading({
      //   lock: true,
      //   text: '操作执行中，请稍后',
      //   spinner: 'el-icon-loading',
      //   background: 'rgba(0, 0, 0, 0.7)'
      // });
      request.openFullScreen(_this);
      if (_this.fileList.length === 0) {
        request.message(_this, '请先选择文件', 'warning');
        request.closeFullScreen(request.openFullScreen(_this));
      } else {
        const isLt10240K = _this.fileList.every(file => file.size / 1024 / 1024 / 1024 < 10240);
        if (!isLt10240K) {
          request.message(_this, '请检查，上传文件大小不能超过10MB!', 'error');
          request.closeFullScreen(request.openFullScreen(_this));
        } else {
          var formData = new FormData(); //  用FormData存放上传文件
          _this.fileList.forEach(file => {
            formData.append('file', file.raw, file.raw.name);
          })
          //向webapi发起请求，等待后台接收
          request.$postFileList('/user/user/import', formData, {},(res) => {
            console.log(res.data.data)
            setTimeout(() => {
              request.closeFullScreen(request.openFullScreen(_this));
              _this.reload();
              request.message(_this, '导入成功!', 'success');
              _this.fileList = [];
              _this.dialogusers = false;
            }, 1000);
          }, _this);
          setTimeout(() => {
            loading.close();
          }, 2000);
        }
      }
    },
    submitUpload1() {
      let _this = this
      // const loading = _this.$loading({
      //   lock: true,
      //   text: '操作执行中，请稍后',
      //   spinner: 'el-icon-loading',
      //   background: 'rgba(0, 0, 0, 0.7)'
      // });
      request.openFullScreen(_this);
      if (_this.fileList.length === 0) {
        request.message(_this, '请先选择文件', 'warning');
        request.closeFullScreen(request.openFullScreen(_this));
      } else {
        const isLt10240K = _this.fileList.every(file => file.size / 1024 / 1024 / 1024 < 10240);
        if (!isLt10240K) {
          request.message(_this, '请检查，上传图像大小不能超过10MB!', 'error');
          request.closeFullScreen(request.openFullScreen(_this));
        } else {
          var formData = new FormData(); //  用FormData存放上传文件
          _this.fileList.forEach(file => {
            formData.append('picture', file.raw, file.raw.name);
          })
          //向webapi发起请求，等待后台接收
          request.$postFileList('/user/face/update', formData, {userId: _this.userId},(res) => {
            console.log(res.data.data)
            setTimeout(() => {
              _this.getuserData();
              // _this.reload();
              request.closeFullScreen(request.openFullScreen(_this));
              request.message(_this, '更新成功!', 'success');
              _this.fileList = [];
              _this.dialogupdateface = false;
            }, 1000);
          }, _this);
        }
      }
    },
    submitUpload2() {
      let _this = this
      // const loading = _this.$loading({
      //   lock: true,
      //   text: '操作执行中，请稍后',
      //   spinner: 'el-icon-loading',
      //   background: 'rgba(0, 0, 0, 0.7)'
      // });
      request.openFullScreen(_this);
      if (_this.fileList.length === 0) {
        request.message(_this, '请先选择文件', 'warning');
        request.closeFullScreen(request.openFullScreen(_this));
      } else {
        const isLt10240K = _this.fileList.every(file => file.size / 1024 / 1024 / 1024 < 10240);
        if (!isLt10240K) {
          request.message(_this, '请检查，上传图像大小不能超过10MB!', 'error');
          request.closeFullScreen(request.openFullScreen(_this));
        } else {
        var formData = new FormData(); //  用FormData存放上传文件
        _this.fileList.forEach(file => {
          formData.append('picture', file.raw, file.raw.name);
        })
        //向webapi发起请求，等待后台接收
        request.$postFileList('/user/face/import', formData, {userId: _this.userId},(res) => {
          console.log(res.data.data)
          setTimeout(() => {
            _this.getuserData();
            // _this.reload();
            request.closeFullScreen(request.openFullScreen(_this));
            request.message(_this, '录入成功!', 'success');
            _this.fileList = [];
            _this.dialogimportface = false;
          }, 1000);
        }, _this);
        }
      }
    },
    submitUpload3() {
      let _this = this
      // const loading = _this.$loading({
      //   lock: true,
      //   text: '操作执行中，请稍后',
      //   spinner: 'el-icon-loading',
      //   background: 'rgba(0, 0, 0, 0.7)'
      // });
      request.openFullScreen(_this);
      if (_this.fileList.length === 0) {
        request.message(_this, '请先选择文件', 'warning');
        request.closeFullScreen(request.openFullScreen(_this));
      } else {
        const isLt10240K = _this.fileList.every(file => file.size / 1024 / 1024 / 1024 < 10240);
        if (!isLt10240K) {
          request.message(_this, '请检查，上传图像大小不能超过10MB!', 'error');
          request.closeFullScreen(request.openFullScreen(_this));
        } else {
        var formData = new FormData(); //  用FormData存放上传文件
        _this.fileList.forEach(file => {
          formData.append('pictures', file.raw, file.raw.name);
        })
        //向webapi发起请求，等待后台接收
        request.$postFileList('/user/faces/import', formData, {},(res) => {
          console.log(res.data.data)
          setTimeout(() => {
            request.closeFullScreen(request.openFullScreen(_this));
            _this.reload();
            request.message(_this, '批量录入成功!', 'success');
            _this.fileList = [];
            _this.dialogfaces = false;
          }, 1000);
        }, _this);
        }
      }
    },
    clearFiles () {
      this.dialogusers = false;
      this.dialogupdateface = false;
      this.dialogimportface = false;
      this.dialogfaces = false;
      this.fileList = [];
    },
    handlePreview(file) {
      console.log(file);
    },
    //移除
    handleRemove(file, fileList) {
      this.fileList = fileList;
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    // 选取文件超过数量提示
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    //监控上传文件列表
    handleChange(file, fileList) {
      let existFile = fileList.slice(0, fileList.length - 1).find(f => f.name === file.name);
      if (existFile) {
        this.$message.error('当前文件已经存在!');
        fileList.pop();
      }
      this.fileList = fileList;
    },
    // 指定一个key标识这一行的数据
    getRowKey (row) {
      return row.roleId //id为row的data属性之一，必须唯一且与tableData中保持一致
    },
    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
      this.getuserData();
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getuserData();
    },
    getid (e) {
      this.userId = e.userId;
      this.username = e.realName;
      this.useraccount = e.account;
    },
    getuser (e) {
      this.userform = e;
    },
    getrole (s,e) {
      let _this = this;
      _this.userId = s.userId;
      _this.username = s.realName;
      _this.useraccount = s.account;
      _this.tableData = e;
      _this.finalShow1 = e;
      this.$nextTick(() => {
        this.$refs.multipleTable.clearSelection();
        this.$refs.multipleTable2.clearSelection();
      });
      request.$get('/role/roles/bindable', {
        userId: s.userId
      }, (res) => {
        console.log(res.data.data);
        let rolemenu = res.data.data;
        _this.roleMenu = rolemenu;
        _this.finalShow2 = rolemenu
      }, _this);
    },
    edituser (e) {
      let _this = this;
      _this.userId = e
      request.$post('/user/update', {
        userId: e,
        realName: _this.userform.realName,
        phone: _this.userform.phone,
        mailbox: _this.userform.mailbox,
        supplement: _this.userform.supplement
      }, (res) => {
        console.log(res.data.data);
        _this.dialogedituser = false
        setTimeout(function () {
          _this.getuserData();
          // _this.reload();
          request.message(_this, '人员信息更新成功', 'success');
        }, 1000)
      }, _this);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.batchPassArr = [] //每次点击需清空原本数组的内容
      this.multipleSelection.map(item => { //遍历数组，把id存进自定义的数组里
        this.batchPassArr.push(item.id)
      })
      this.batchPassArr = this.batchPassArr.join(',')
      console.log(this.batchPassArr)
      // if(this.batchPassArr !== undefined || this.batchPassArr.length > -1){
      //   this.$refs.multipleTable2.clearSelection();
      //   // _this.batchPassArr2 = [];
      //   // _this.multipleSelection2 = [];
      // }
    },
    handleSelectionChange2(val) {
      this.multipleSelection2 = val;
      this.batchPassArr2 = [] //每次点击需清空原本数组的内容
      this.multipleSelection2.map(item => { //遍历数组，把id存进自定义的数组里
        this.batchPassArr2.push(item.roleId)
      })
      this.batchPassArr2 = this.batchPassArr2.join(',')
      console.log(this.batchPassArr2)
      // if(this.batchPassArr2 !== undefined || this.batchPassArr2.length > -1){
      //   this.$refs.multipleTable.clearSelection();
      //   // _this.batchPassArr = [];
      //   // _this.multipleSelection = [];
      // }
    },
    bindit () {
      let _this = this;
      request.$post('/user/roles/bind', {
        roleIds: _this.batchPassArr2,
        userId: _this.userId
      }, (res) => {
        console.log(res.data);
        setTimeout(function () {
          request.$get('/role/roles/bindable', {
            userId: _this.userId
          }, (res) => {
            console.log(res.data.data);
            let rolemenu = res.data.data;
            _this.roleMenu = rolemenu;
            _this.finalShow2 = rolemenu
          }, _this);
          _this.getuserData();
          _this.$nextTick(() => {
            _this.$refs.multipleTable.clearSelection();
            _this.$refs.multipleTable2.clearSelection();
          });
          _this.dialogrole = false;
          // _this.reload();
          request.message(_this, '绑定角色成功', 'success');
        }, 1000)
      }, _this)
    },
    unbindit () {
      let _this = this;
      this.$confirm('此操作将解绑该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request.$post('/user/roles/unbind', {
          roleIds: _this.batchPassArr,
          userId: _this.userId
        }, (res) => {
          console.log(res.data);
          setTimeout(function () {
            request.$get('/role/roles/bindable', {
              userId: _this.userId
            }, (res) => {
              console.log(res.data.data);
              let rolemenu = res.data.data;
              _this.roleMenu = rolemenu;
              _this.finalShow2 = rolemenu
            }, _this);
           _this.getuserData();
            _this.$nextTick(() => {
              _this.$refs.multipleTable.clearSelection();
              _this.$refs.multipleTable2.clearSelection();
            });
            _this.dialogrole = false;
            // _this.reload();
            request.message(_this, '角色解绑成功', 'success');
          }, 1000)
        }, _this)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消解绑'
        });
      });
    },
    reset () {
      this.search_account = '';
      this.search_realName = '';
      this.search_phone = '';
      this.search_mailbox = '';
      request.message(this, '重置成功', 'success');
    },
    handleSearch_account (val) {
      let search = val;
      this.search_account = search;
      this.currentPage = 1;
      this.getuserData();
    },
    handleSearch_realName (val) {
      let search = val;
      this.search_realName = search;
      this.currentPage = 1;
      this.getuserData();
    },
    handleSearch_phone (val) {
      let search = val;
      this.search_phone = search;
      this.currentPage = 1;
      this.getuserData();
    },
    handleSearch_mailbox (val) {
      let search = val;
      this.search_mailbox = search;
      this.currentPage = 1;
      this.getuserData();
    },
    handleSearch1 (val) {
      let search1 = val;
      if (search1 === '') {
        this.finalShow1 = this.tableData;
      }
      if (search1 !== '') {
        this.finalShow1 = this.tableData.filter(
          (data) =>
            !search1 || data.roleId.toString().includes(search1.toString()) || data.name.toLowerCase().includes(search1.toLowerCase())
        );
      }
    },
    handleSearch2 (val) {
      let search2 = val;
      if (search2 === '') {
        this.finalShow2 = this.roleMenu;
      }
      if (search2 !== '') {
        this.finalShow2 = this.roleMenu.filter(
          (data) =>
            !search2 || data.roleId.toString().includes(search2.toString()) || data.name.toLowerCase().includes(search2.toLowerCase())
        );
      }
    },
  },
    watch: {
      //watch监视input输入值的变化,只要是watch变化了 search()就会被调用
      search_account(newVal) {
        this.handleSearch_account(newVal);
      },
      search_realName(newVal) {
        this.handleSearch_realName(newVal);
      },
      search_phone(newVal) {
        this.handleSearch_phone(newVal);
      },
      search_mailbox(newVal) {
        this.handleSearch_mailbox(newVal);
      },
      search1(newVal) {
        this.handleSearch1(newVal);
      },
      search2(newVal) {
        this.handleSearch2(newVal);
      },
    }
}
</script>

<style scoped>
  >>>.el-upload-list__item{
    height: 22px;
  }

  >>>.upload-demo{
    width: 100%
  }

  >>>.el-upload--text{
    width: 100%
  }

  >>>.el-upload-dragger{
    width: 100%
  }

</style>
