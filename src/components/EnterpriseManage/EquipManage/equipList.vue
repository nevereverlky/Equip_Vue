<template>
  <div id="wrapper">
    <div class="content-wrapper">
      <div class="container-fluid">
        <!-- Breadcrumb-->
        <div class="row pt-2 pb-2">
          <div class="col-sm-9">
            <h4 class="page-title">设备管理</h4>
            <ol class="breadcrumb">
              <li class="breadcrumb-item active" aria-current="page">设备管理</li>
            </ol>
          </div>
        </div>
        <!-- End Breadcrumb-->

        <div>
          <!--finalShow.slice((currentPage-1)*pageSize,currentPage*pageSize)-->
          <el-table
            :data="equipData"
            :header-cell-style="{color: 'black', fontSize: '13px'}"
            style="width: 100%"
            cell-style="font-size: 13px">
            <el-table-column>
              <template slot="header" slot-scope="scope">
                <div style="display: flex;flex-direction: row;justify-content: space-between">
                <el-input
                  scope
                  style="width: 15%"
                  v-model="search_name"
                  size="mini"
                  placeholder="按照设备名搜索"
                />
                <el-date-picker
                  v-model="search_purchaseDate"
                  style="width: 25%"
                  size="mini"
                  type="datetimerange"
                  start-placeholder="搜索购入开始时间"
                  end-placeholder="购入结束时间内"
                  :default-time="['12:00:00']">
                </el-date-picker>
                <div style="width: 20%">
                  <span style="font-size: 10px;color: #9e9e9e">按照是否允许永久借出搜索</span>
                  <el-radio-group v-model="search_allowPermanentLend" size="mini">
                    <el-radio-button :label="true">是</el-radio-button>
                    <el-radio-button :label="false">否</el-radio-button>
                  </el-radio-group>
                </div>
                <el-date-picker
                  v-model="search_LendDate"
                  style="width: 25%"
                  size="mini"
                  type="datetimerange"
                  start-placeholder="搜索借出开始时间"
                  end-placeholder="借出结束时间内"
                  :default-time="['12:00:00']">
                </el-date-picker>
                  <button type="button" class="btn btn-sm btn-dark waves-effect waves-light m-1" @click="reset">重置</button>
                </div>
              </template>
            <el-table-column
              label="设备"
              prop="equipId">
              <template slot-scope="scope">
                【{{scope.row.equipId}}】{{scope.row.name}}
              </template>
            </el-table-column>
            <el-table-column
              label="购入时间"
              prop="purchaseDate"
              width="160">
              <template slot-scope="scope">
                {{ scope.row.purchaseDate | dateFormat }}
              </template>
            </el-table-column>
            <el-table-column
              label="用途"
              prop="usefulness"
              width="100">
              <template slot-scope="scope">
                <el-popover
                  placement="bottom"
                  width="200"
                  trigger="click"
                  :content="scope.row.usefulness"
                  v-if="scope.row.usefulness !== ''">
                  <button slot="reference" type="button" class="btn btn-sm btn-outline-primary waves-effect waves-light m-1" style="color: #3b5998">查看</button>
                </el-popover>
                <button v-else type="button" class="btn btn-sm btn-light waves-effect waves-light m-1">暂无</button>
              </template>
            </el-table-column>
            <el-table-column
              label="是否允许永久借出"
              prop="allowPermanentLend"
              width="80">
              <template slot-scope="scope">
                {{scope.row.allowPermanentLend? '是':'否'}}
              </template>
            </el-table-column>
              <el-table-column
                label="是否入库"
                prop="inWarehouse"
                width="80">
                <template slot-scope="scope">
                  {{scope.row.inWarehouse? '是':'否'}}
                </template>
              </el-table-column>
            <el-table-column
              label="允许借出时间"
              prop="LendDate"
              width="170">
              <template slot-scope="scope" v-if="scope.row.fromLendDate !== null || scope.row.toLendDate !== null">
                {{scope.row.fromLendDate | dateFormat }}~<br>
                <span v-if="scope.row.toLendDate !== null">{{scope.row.toLendDate | dateFormat }}</span>
                <span v-else>暂无截至日期</span>
              </template>
            </el-table-column>
            <el-table-column
              label="借出状态"
              prop="status"
              width="160">
              <template slot-scope="scope">
                {{scope.row.back? '已':'未'}}归还<span class="badge badge-warning m-1" v-if="scope.row.allowPermanentLend">{{scope.row.permanentLent? '已':'未'}}永久借出</span>
              </template>
            </el-table-column>
            <el-table-column
              label="补充说明"
              prop="supplement"
              width="100">
              <template slot-scope="scope">
                <el-popover
                  placement="bottom"
                  width="200"
                  trigger="click"
                  :content="scope.row.supplement"
                  v-if="scope.row.supplement !== ''">
                  <button slot="reference" type="button" class="btn btn-sm btn-outline-primary waves-effect waves-light m-1" style="color: #3b5998">查看</button>
                </el-popover>
                <button v-else type="button" class="btn btn-sm btn-light waves-effect waves-light m-1">暂无</button>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              prop="action"
              width="240">
              <!--<template slot="header" slot-scope="scope">-->
                <!--<el-input-->
                  <!--scope-->
                  <!--style="width: 100%"-->
                  <!--v-model="search_name"-->
                  <!--size="mini"-->
                  <!--placeholder="输入设备名搜索"-->
                <!--/>-->
              <!--</template>-->
              <template slot-scope="scope">
                <button type="button" class="btn btn-sm btn-primary waves-effect waves-light m-1" @click="getid(scope.row.equipId);dialogFormVisible = true">更新设备</button>
                <button type="button" class="btn btn-sm btn-outline-primary waves-effect waves-light m-1" @click="viewhistory(scope.row.equipId)">查看流动历史</button>
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
                           :total="equipData_length">
            </el-pagination>
          </div>
        </div>

        <el-dialog title="更新设备" :visible.sync="dialogFormVisible" width="40%">
          <el-form ref="equipform" :model="equipform" label-width="150px" size="mini">
            <el-form-item label="设备名">
              <el-col :span="13">
              <el-input v-model="equipform.name" :disabled="true" width="50%"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="用途" required>
              <el-input v-model="equipform.usefulness"></el-input>
            </el-form-item>
            <el-form-item label="购入时间" required>
              <el-date-picker
                v-model="equipform.purchaseDate"
                type="datetime"
                placeholder="选择日期时间" required>
              </el-date-picker>
            </el-form-item>
            <el-form-item label="预期存放截止时间" required>
              <el-date-picker
                v-model="equipform.expectedStorageDate"
                type="datetime"
                placeholder="选择日期时间" required>
              </el-date-picker>
            </el-form-item>
            <el-form-item label="是否允许永久借出" required>
              <el-radio-group v-model="equipform.allowPermanentLend">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="补充说明">
              <el-input type="textarea" v-model="equipform.supplement"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="editequip" plain>更新</el-button>
              <el-button @click="dialogFormVisible = false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>

      </div>
    </div>
  </div>
</template>

<script>
import request from '../../../utils/request'
import eventBus from '../../../utils/eventBus'
export default {
  name: 'equipList',
  inject: ['reload'],
  data() {
    return {
      // finalShow: [],
      equipData: [],
      equipId: '',
      search_all: true,
      search_name: '',
      search_purchaseDate: '',
      search_LendDate: '',
      search_purchaseDateBegin: '',
      search_purchaseDateEnd: '',
      search_allowPermanentLend: '',
      search_fromLendDateBegin: '',
      search_toLendDateEnd: '',
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      equipData_length: 0, //总条目数
      pageSize: 10, // 每页的数据条数
      dialogFormVisible: false,
      equipform: {
        name: '',
        usefulness: '',
        purchaseDate: '',
        expectedStorageDate: '',
        supplement: '',
        allowPermanentLend: ''
      },
      formLabelWidth: '120px'
    };
  },
  created () {
    this.getequipData();
  },
  methods: {
    getequipData() {
      let _this = this;
      request.$get('/equipment/equipments', {
        size: _this.pageSize,
        fromIndex: _this.pageSize*(_this.currentPage-1),
        all: _this.search_all,
        name: _this.search_name,
        purchaseDateBegin: _this.search_purchaseDateBegin,
        purchaseDateEnd: _this.search_purchaseDateEnd,
        allowPermanentLend: false,
        fromLendDateBegin: _this.search_fromLendDateBegin,
        toLendDateEnd: _this.search_toLendDateEnd
      }, (res) => {
        console.log(res.data.data);
        let counts = res.data.data.counts;
        let equipData = res.data.data.equipments;
        _this.equipData = equipData;
        // _this.finalShow = equipData;
        _this.equipData_length = counts;
      }, _this);
    },
    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
      this.getequipData();
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getequipData();
    },
    getid (e){
      this.equipId = e;
      let _this=this;
      request.$get('/equipment/equipment', {
        equipId: e
      }, (res) => {
          console.log(res.data.data);
          let equipform = res.data.data;
          _this.equipform = equipform;
       }, _this);
    },
    editequip () {
      let _this=this;
      // let allowPermanentLend = _this.search_allowPermanentLend;
      // if (allowPermanentLend === '' || allowPermanentLend === false){
      //   allowPermanentLend = false;
      // }else {
      //   allowPermanentLend = true;
      // }
      request.$post('/equipment/update', {
        equipId: _this.equipId,
        // name: _this.equipform.name,
        usefulness: _this.equipform.usefulness,
        purchaseDate: _this.formateTime(_this.equipform.purchaseDate),
        expectedStorageDate: _this.formateTime(_this.equipform.expectedStorageDate),
        supplement: _this.equipform.supplement,
        allowPermanentLend: _this.equipform.allowPermanentLend
      }, (res) => {
        console.log(res.data.data);
        _this.dialogFormVisible = false
        setTimeout(function () {
          _this.getequipData();
          // _this.reload();
          request.message(_this, '设备更新成功', 'success');
        }, 1000)
      }, _this);
    },
    viewhistory (r) {
      // setTimeout(()=>{
      //     eventBus.$emit('equipId',r)
      // },2000)
      this.$router.push({
        path: '/equiphistory',
        name: 'equipHistory',
        query: {
          equipId: r
        }
      })
    },
    reset () {
      this.search_all = true;
      this.search_name = '';
      this.search_purchaseDate = '';
      this.search_LendDate = '';
      this.search_purchaseDateBegin = '';
      this.search_purchaseDateEnd = '';
      this.search_allowPermanentLend = '';
      this.search_fromLendDateBegin = '';
      this.search_toLendDateEnd = '';
      this.getequipData();
      request.message(this, '重置成功', 'success');
    },
    handleSearch_name(val) {
      let _this = this;
      let search = val;
      _this.search_name = search;
      _this.currentPage = 1;
      if (search === ''){
        _this.search_all = true;
      } else {
        _this.search_all = false;
      }
      _this.getequipData();
    },
    formateTime (time) {
      let times = new Date(time)
      let year = times.getFullYear()
      let month = times.getMonth() + 1 > 9 ? times.getMonth() + 1 : 0 + (times.getMonth() + 1)
      let date= times.getDate() > 9 ? times.getDate() : 0 + times.getDate()
      let hour = times.getHours() > 9 ? times.getHours() : 0 + times.getHours()
      let minute = times.getMinutes() > 9 ? times.getMinutes() : 0 + times.getMinutes()
      let second = times.getSeconds() > 9 ? times.getSeconds() : 0 + times.getMinutes()
      return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
    },
    handleSearch_purchaseDate(val) {
      let _this = this;
      console.log(val)
      if (val === null || val === ''){
        _this.search_all = true;
        _this.search_purchaseDate = '';
        _this.search_purchaseDateBegin = '';
        _this.search_purchaseDateEnd = '';
        console.log(_this.search_all)
      }else {
        let search1 = _this.formateTime(val[0]);
        let search2 = _this.formateTime(val[1]);
        console.log(search1)
        console.log(search2)
        _this.search_purchaseDateBegin = search1;
        _this.search_purchaseDateEnd = search2;
        _this.currentPage = 1;
        if (search1 === '' && search2 === ''){
          _this.search_all = true;
        } else {
          _this.search_all = false;
        }
      }
      _this.getequipData();
    },
    handleSearch_allowPermanentLend(val) {
      let _this = this;
      console.log(val)
      let search = val;
      _this.search_allowPermanentLend = search;
      _this.currentPage = 1;
      if (search === ''){
        _this.search_all = true;
      } else {
        _this.search_all = false;
      }
      request.$get('/equipment/equipments', {
        size: _this.pageSize,
        fromIndex: _this.pageSize*(_this.currentPage-1),
        all: _this.search_all,
        name: _this.search_name,
        purchaseDateBegin: _this.search_purchaseDateBegin,
        purchaseDateEnd: _this.search_purchaseDateEnd,
        allowPermanentLend: _this.search_allowPermanentLend,
        fromLendDateBegin: _this.search_fromLendDateBegin,
        toLendDateEnd: _this.search_toLendDateEnd
      }, (res) => {
        console.log(res.data.data);
        let counts = res.data.data.counts;
        let equipData = res.data.data.equipments;
        _this.equipData = equipData;
        // _this.finalShow = equipData;
        _this.equipData_length = counts;
      }, _this);
    },
    handleSearch_LendDate(val) {
      let _this = this;
      console.log(val)
      if (val === null || val === ''){
        _this.search_all = true;
        _this.search_LendDate = '';
        _this.search_fromLendDateBegin = '';
        _this.search_toLendDateEnd = '';
        console.log(_this.search_all)
      }else {
        let search1 = _this.formateTime(val[0]);
        let search2 = _this.formateTime(val[1]);
        console.log(search1)
        console.log(search2)
        _this.search_fromLendDateBegin = search1;
        _this.search_toLendDateEnd = search2;
        _this.currentPage = 1;
        if (search1 === '' && search2 === '') {
          _this.search_all = true;
        } else {
          _this.search_all = false;
        }
      }
      _this.getequipData();
    },
  },
  watch: {
    //watch监视input输入值的变化,只要是watch变化了 search()就会被调用
    search_name(newVal) {
      this.handleSearch_name(newVal);
    },
    search_purchaseDate(newVal) {
      this.handleSearch_purchaseDate(newVal);
    },
    search_allowPermanentLend(newVal) {
      this.handleSearch_allowPermanentLend(newVal);
    },
    search_LendDate(newVal) {
      this.handleSearch_LendDate(newVal);
    },
  }
}
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
