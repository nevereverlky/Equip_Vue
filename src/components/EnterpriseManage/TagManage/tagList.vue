<template>
  <div id="wrapper">
    <div class="content-wrapper">
      <div class="container-fluid">
        <!-- Breadcrumb-->
        <div class="row pt-2 pb-2">
          <div class="col-sm-9">
            <h4 class="page-title">标签管理</h4>
            <ol class="breadcrumb">
              <li class="breadcrumb-item active" aria-current="page">标签管理</li>
            </ol>
          </div>
        </div>
        <!-- End Breadcrumb-->

        <div>
          <!--finalShow.slice((currentPage-1)*pageSize,currentPage*pageSize)-->
          <el-table
            :data="tagData"
            :header-cell-style="{color: 'black', fontSize: '14px'}"
            style="width: 100%"
            cell-style="font-size:14px">
            <el-table-column
              label="标签ID"
              prop="tagId"
              width="200">
              <template slot-scope="scope">
                <i class="el-icon-collection-tag"></i>
                <span style="margin-left: 10px">{{ scope.row.tagId }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="绑定的设备"
              prop="equip"
              width="300">
              <template slot-scope="scope">
                <div>
                <span>【{{ scope.row.equipment.equipId}}】{{scope.row.equipment.name}}</span>
                <button style="float: right" type="button" class="btn btn-sm btn-outline-primary waves-effect waves-light m-1" @click="dialogEquip = true;getidequip(scope.row.tagId)">详情</button>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="最大可通行门禁"
              prop="guard">
              <template slot-scope="scope">
                <div v-if="scope.row.guard !== null">
                  <span>【{{ scope.row.guard.guardId }}】{{ scope.row.guard.name }}
                    <el-tag size="small" style="margin-left: 5px">{{ scope.row.guard.mac }}</el-tag>
                    <el-tag size="small" type="info" style="margin-left: 5px">{{ scope.row.guard.location }}</el-tag>
                  </span>
                </div>
                <button v-else type="button" class="btn btn-sm btn-light waves-effect waves-light m-1">暂无绑定</button>
              </template>
            </el-table-column>
            <el-table-column
              prop="action"
              width="200">
              <template slot="header" slot-scope="scope">
                <el-input
                  scope
                  style="width: 100%"
                  v-model="search_equipName"
                  size="mini"
                  placeholder="输入设备名搜索"
                />
              </template>
              <template slot-scope="scope">
                <button type="button" v-if="scope.row.guard !== null" class="btn btn-sm btn-warning waves-effect waves-light m-1" @click="dialogGuard = true;getidtobind(scope.row)">重新绑定</button>
                <button type="button" v-else class="btn btn-sm btn-outline-warning waves-effect waves-light m-1" @click="dialogGuard = true;getidtobind(scope.row)">点击绑定</button>
              </template>
            </el-table-column>
          </el-table>

          <div class="block" style="margin-top:30px;float: right">
            <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page="currentPage"
                           :page-sizes="[10,20,50]"
                           :page-size="pageSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="tagData_length">
            </el-pagination>
          </div>
        </div>

        <el-dialog
          title="设备详情"
          :visible.sync="dialogEquip"
          width="40%">
          <div class="card">
            <div class="card-body">
              <ul class="list-group">
                <li class="list-group-item d-flex justify-content-between align-items-center active">
                  【设备ID】设备名
                  <span>【{{ equipDetail.equipId }}】{{ equipDetail.name }}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  购入时间
                  <span>{{ equipDetail.purchaseDate | dateFormat}}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  用途
                  <span>{{ equipDetail.usefulness }}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  是否允许永久借出
                  <span>{{ equipDetail.allowPermanentLend ? '是':'否'}}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  是否入库
                  <span>{{ equipDetail.inWarehouse ? '是':'否'}}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  补充说明
                  <span>{{ equipDetail.supplement }}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  借出开始时间
                  <span v-if="equipDetail.fromLendDate !== null">{{ equipDetail.fromLendDate | dateFormat}}</span>
                  <span v-else>暂无</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  借出截至时间
                  <span v-if="equipDetail.toLendDate !== null">{{ equipDetail.toLendDate | dateFormat}}</span>
                  <span v-else>暂无</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  是否已永久借出
                  <span>{{ equipDetail.permanentLent ? '已':'未'}}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  是否归还
                  <span>{{ equipDetail.back ? '已':'未'}}</span>
                </li>
              </ul>
            </div>
          </div>
        </el-dialog>

        <el-dialog title="绑定门禁" :visible.sync="dialogGuard" width="30%">
          <p>当前选中设备：{{equipname}}</p>
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
                  v-model="search1"
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
            <el-button @click="dialogGuard = false" size="small">取 消</el-button>
            <el-button type="primary" @click="bindit" size="small" plain>确 定</el-button>
          </div>
        </el-dialog>

      </div>
    </div>
  </div>
</template>

<script>
  import request from '../../../utils/request'
  export default {
    name: 'tagList',
    inject: ['reload'],
    data() {
      return {
        // finalShow: [], //标签总表
        finalShow: [], //可绑定门禁总表
        search_equipName: '', //input的值
        search1: '', //input的值
        tagData: [], //标签总表
        guardMenu: [], //门禁总表
        equipDetail: '',
        tagId: '',
        equipname: '',
        currentPage: 1, // 当前页码
        total: 20, // 总条数
        tagData_length: 0, //总条目数
        pageSize: 10, // 每页的数据条数
        dialogEquip: false,
        dialogGuard: false,
        dialogPass: false,
        formLabelWidth: '120px'
      };
    },
    created () {
      this.gettagData();
    },
    methods: {
      gettagData() {
        let _this = this;
        request.$get('/tag/tags', {
          size: _this.pageSize,
          fromIndex: _this.pageSize*(_this.currentPage-1),
          equipName: _this.search_equipName
        }, (res) => {
          console.log(res.data.data);
          let counts = res.data.data.counts;
          let tagData = res.data.data.tags;
          _this.tagData = tagData;
          // _this.finalShow = tagData;
          _this.tagData_length = counts;
        }, _this);
      },
      getsearch (s) {
        this.search1 = s
      },
      //每页条数改变时触发 选择一页显示多少行
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.currentPage = 1;
        this.pageSize = val;
        this.gettagData();
      },
      //当前页改变时触发 跳转其他页
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.gettagData();
      },
      getidtobind (row) {
        this.tagId = row.tagId;
        this.equipname = row.equipment.name;
        let _this = this;
        request.$get('/guard/guards/bindable', {
          tagId: row.tagId
        }, (res) => {
          console.log(res.data.data);
          let guardmenu = res.data.data;
          _this.guardMenu = guardmenu;
          _this.finalShow = guardmenu
        }, _this);
      },
      bindit () {
        let _this = this;
        request.$post('/tag/guard/rebind', {
          tagId: _this.tagId,
          guardId: _this.search1
        }, (res) => {
          console.log(res.data);
          _this.dialogGuard = false;
          setTimeout(function () {
            _this.gettagData();
            // _this.reload();
            request.message(_this, '标签重新绑定门禁成功', 'success');
          }, 1000)
        }, _this);
      },
      getidequip (row) {
        let _this = this;
        this.tagId = row;
        request.$get('/tag/tag', {
          tagId: row
        }, (res) => {
          console.log(res.data.data);
          let equipdetail = res.data.data.equipment;
          _this.equipDetail = equipdetail;
        }, _this);
      },
      handleSearch(val) {
        let _this = this;
        let search = val;
        this.search_equipName = search;
        _this.currentPage = 1;
        _this.gettagData();
          // this.finalShow = this.tagData.filter(
          //   (data) =>
          //     !search || data.tagId.toString().includes(search.toString())
          // );
          // this.tagData_length = this.finalShow.length;
      },
      handleSearch1(val) {
        let search1 = val;
        if (search1 === '') {
          this.finalShow = this.guardMenu;
        }
        if (search1 !== '') {
          this.finalShow = this.guardMenu.filter(
            (data) =>
              !search1 || data.guardId.toString().includes(search1.toString()) || data.name.toLowerCase().includes(search1.toLowerCase())
          );
        }
      },
    },
    watch: {
      //watch监视input输入值的变化,只要是watch变化了 search()就会被调用
      search_equipName(newVal) {
        this.handleSearch(newVal);
      },
      search1(newVal) {
        this.handleSearch1(newVal);
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
