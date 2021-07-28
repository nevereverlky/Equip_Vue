<template>
  <div id="wrapper">
    <div class="content-wrapper">
      <div class="container-fluid">

        <!--<div class="row">-->
          <!--&lt;!&ndash;<div class="col-12 col-lg-12 col-xl-6">&ndash;&gt;-->
            <!--&lt;!&ndash;<div class="card">&ndash;&gt;-->
              <!--&lt;!&ndash;<div class="card-header border-0">&ndash;&gt;-->
                <!--&lt;!&ndash;管理员操作实时通知&ndash;&gt;-->
              <!--&lt;!&ndash;</div>&ndash;&gt;-->
              <!--&lt;!&ndash;<div class="table-responsive">&ndash;&gt;-->
                <!--&lt;!&ndash;<table class="table align-items-center table-flush">&ndash;&gt;-->
                  <!--&lt;!&ndash;<tbody>&ndash;&gt;-->
                  <!--&lt;!&ndash;&lt;!&ndash;<tr>&ndash;&gt;&ndash;&gt;-->
                    <!--&lt;!&ndash;&lt;!&ndash;<td>&ndash;&gt;&ndash;&gt;-->
                      <!--&lt;!&ndash;&lt;!&ndash;<el-timeline :reverse="false">&ndash;&gt;&ndash;&gt;-->
                        <!--&lt;!&ndash;&lt;!&ndash;<el-timeline-item&ndash;&gt;&ndash;&gt;-->
                          <!--&lt;!&ndash;&lt;!&ndash;timestamp="2020-03-08 12:00:00">&ndash;&gt;&ndash;&gt;-->
                          <!--&lt;!&ndash;&lt;!&ndash;<span style="font-size: 12px">账号EMS_ADMIN_2【系统管理员】更新门禁【1123】仓库A门为仓库</span>&ndash;&gt;&ndash;&gt;-->
                        <!--&lt;!&ndash;&lt;!&ndash;</el-timeline-item>&ndash;&gt;&ndash;&gt;-->
                        <!--&lt;!&ndash;&lt;!&ndash;<el-timeline-item&ndash;&gt;&ndash;&gt;-->
                          <!--&lt;!&ndash;&lt;!&ndash;timestamp="2020-03-08 12:00:00">&ndash;&gt;&ndash;&gt;-->
                          <!--&lt;!&ndash;&lt;!&ndash;<span style="font-size: 12px">账号EMS_ADMIN_2【系统管理员】更新标签【1271】绑定门禁信息</span>&ndash;&gt;&ndash;&gt;-->
                        <!--&lt;!&ndash;&lt;!&ndash;</el-timeline-item>&ndash;&gt;&ndash;&gt;-->
                        <!--&lt;!&ndash;&lt;!&ndash;<el-timeline-item&ndash;&gt;&ndash;&gt;-->
                          <!--&lt;!&ndash;&lt;!&ndash;timestamp="2020-03-08 12:00:00">&ndash;&gt;&ndash;&gt;-->
                          <!--&lt;!&ndash;&lt;!&ndash;<span style="font-size: 12px">账号EMS_ADMIN_2【系统管理员】更新设备【1272】设备B信息</span>&ndash;&gt;&ndash;&gt;-->
                        <!--&lt;!&ndash;&lt;!&ndash;</el-timeline-item>&ndash;&gt;&ndash;&gt;-->
                        <!--&lt;!&ndash;&lt;!&ndash;<el-timeline-item&ndash;&gt;&ndash;&gt;-->
                          <!--&lt;!&ndash;&lt;!&ndash;timestamp="2020-03-08 12:00:00">&ndash;&gt;&ndash;&gt;-->
                          <!--&lt;!&ndash;&lt;!&ndash;<span style="font-size: 12px">账号EMS_ADMIN_2【系统管理员】更新账号EMS_ADMIN_4【系统管理员】人脸信息</span>&ndash;&gt;&ndash;&gt;-->
                        <!--&lt;!&ndash;&lt;!&ndash;</el-timeline-item>&ndash;&gt;&ndash;&gt;-->
                        <!--&lt;!&ndash;&lt;!&ndash;<el-timeline-item&ndash;&gt;&ndash;&gt;-->
                          <!--&lt;!&ndash;&lt;!&ndash;timestamp="2020-03-08 12:00:00">&ndash;&gt;&ndash;&gt;-->
                        <!--&lt;!&ndash;&lt;!&ndash;<span style="font-size: 12px">账号EMS_ADMIN_2【系统管理员】批量导入10位人员</span>&ndash;&gt;&ndash;&gt;-->
                      <!--&lt;!&ndash;&lt;!&ndash;</el-timeline-item>&ndash;&gt;&ndash;&gt;-->
                      <!--&lt;!&ndash;&lt;!&ndash;</el-timeline>&ndash;&gt;&ndash;&gt;-->
                    <!--&lt;!&ndash;&lt;!&ndash;</td>&ndash;&gt;&ndash;&gt;-->
                  <!--&lt;!&ndash;&lt;!&ndash;</tr>&ndash;&gt;&ndash;&gt;-->
                  <!--&lt;!&ndash;</tbody>&ndash;&gt;-->
                <!--&lt;!&ndash;</table>&ndash;&gt;-->
              <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
          <!--&lt;!&ndash;</div>&ndash;&gt;-->
          <!--<div class="col-12 col-lg-12 col-xl-12">-->
            <!--<div class="card">-->
              <!--<div class="card-header border-0">-->
                <!--<span class="fa fa-circle text-danger float-right"></span>系统通知-->
              <!--</div>-->
              <!--<div class="table-responsive">-->
                <!--<table class="table align-items-center table-flush">-->
                  <!--<tbody>-->
                  <!--<tr>-->
                    <!--&lt;!&ndash;<td>&ndash;&gt;-->
                      <!--&lt;!&ndash;<div class="w-circle-icon rounded-circle bg-facebook">&ndash;&gt;-->
                        <!--&lt;!&ndash;<i class="fa fa-desktop text-white"></i></div>&ndash;&gt;-->
                    <!--&lt;!&ndash;</td>&ndash;&gt;-->
                    <!--<td>-->
                      <!--<h6 class="mb-0">安全中心<span class="badge badge-pill badge-danger m-1">6</span></h6>-->
                    <!--</td>-->
                    <!--<td><span style="font-size: 12px">新增1条标签非法流通类门禁警报记录<br>-->
                      <!--新增3条未初始化门禁与标签类门禁警报记录<br>-->
                      <!--新增1条设备入库操作记录<br>新增1条人员间设备流转记录</span></td>-->
                    <!--<td>-->
                      <!--<h6 class="mb-0">人员审批管理<span class="badge badge-pill badge-danger m-1">5</span></h6>-->
                    <!--</td>-->
                    <!--<td><span style="font-size: 12px">新增5条申请待审批</span></td>-->
                  <!--</tr>-->

                  <!--&lt;!&ndash;<tr>&ndash;&gt;-->
                    <!--&lt;!&ndash;&lt;!&ndash;<td>&ndash;&gt;&ndash;&gt;-->
                      <!--&lt;!&ndash;&lt;!&ndash;<div class="w-circle-icon rounded-circle bg-facebook">&ndash;&gt;&ndash;&gt;-->
                        <!--&lt;!&ndash;&lt;!&ndash;<i class="fa fa-inbox text-white"></i></div>&ndash;&gt;&ndash;&gt;-->
                    <!--&lt;!&ndash;&lt;!&ndash;</td>&ndash;&gt;&ndash;&gt;-->
                    <!--&lt;!&ndash;<td>&ndash;&gt;-->
                      <!--&lt;!&ndash;<h6 class="mb-0">人员审批管理<span class="badge badge-pill badge-danger m-1">5</span></h6>&ndash;&gt;-->
                    <!--&lt;!&ndash;</td>&ndash;&gt;-->
                    <!--&lt;!&ndash;<td><span style="font-size: 12px">新增5条申请待审批</span></td>&ndash;&gt;-->
                  <!--&lt;!&ndash;</tr>&ndash;&gt;-->
                  <!--</tbody>-->
                <!--</table>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>&lt;!&ndash;End Row&ndash;&gt;-->

        <div class="row mt-3">
          <div class="col-12 col-lg-12 col-xl-6">
            <div class="row">
              <div class="col-12 col-lg-6 col-xl-6">
                <div class="card text-center ">
                  <div class="card-body p-4">
                    <div class="p-4 bg-twitter-2 widget-radius">
                      <h4 class="mb-0 text-twitter">1次</h4>
                      <p class="mb-0 text-twitter">设备归还超时次数</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 col-lg-6 col-xl-6">
                <div class="card text-center">
                  <div class="card-body p-4">
                    <div class="p-4 bg-twitter-2 widget-radius">
                      <h4 class="mb-0 text-twitter">22.5h</h4>
                      <p class="mb-0 text-twitter">设备归还超时时长</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 col-lg-6 col-xl-6">
                <div class="card text-center">
                  <div class="card-body p-4">
                    <div class="p-4 bg-twitter-2 widget-radius">
                      <h4 class="mb-0 text-twitter">0次</h4>
                      <p class="mb-0 text-twitter">设备非法通行次数</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 col-lg-6 col-xl-6">
                <div class="card text-center">
                  <div class="card-body p-4">
                    <div class="p-4 bg-facebook-2 widget-radius">
                      <h4 class="mb-0 text-facebook">98.5分</h4>
                      <p class="mb-0 text-facebook">综合评分</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-12 col-xl-6">
            <div class="card">
              <div class="card-header"><span class="fa fa-circle text-warning float-right"></span>即将到期且未归还的设备列表</div>
              <div class="card-body">
                <el-table
                  :data="equipData1"
                  height="230px"
                  :header-cell-style="{color: 'black', fontSize: '12px'}"
                  cell-style="font-size: 12px"
                  style="width: 100%"
                  stripe
                  border>
                  <el-table-column
                    label="设备"
                    prop="equipId">
                    <template slot-scope="scope">
                      【{{ scope.row.equipId }}】{{ scope.row.name }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="是否允许永久借出"
                    prop="allowPermanentLend"
                    width="150">
                    <template slot-scope="scope">
                      {{ scope.row.allowPermanentLend }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="借出截至时间"
                    prop="LendDate"
                    width="200">
                    <template slot-scope="scope">
                      {{ scope.row.LendDate }}
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div><!--End Row-->

        <div class="row mt-3">
          <div class="col-12 col-lg-12 col-xl-6">
          <div class="card">
            <div class="card-header"><span class="fa fa-circle text-primary float-right"></span>历史负责的设备列表</div>
            <div class="card-body">
              <div class="block">
                <el-timeline>
                  <el-timeline-item timestamp="2021/3/12 20:46:20" placement="top">
                    <el-card>
                      <div class="row">
                        <div class="col-lg-12">
                          <div class="card">
                            <div class="card-body">
                              <div class="card-title" style="font-size: 12px">
                                <p style="color: #3b5998">与人员【EMS_ADMIN_4】系统管理员发生设备交接事件后</p>
                                当时负责的设备列表</div>
                              <hr>
                              <el-table
                                :data="equipData1"
                                :header-cell-style="{color: 'black', fontSize: '12px'}"
                                style="width: 100%"
                                cell-style="font-size: 12px"
                                stripe
                                border>
                                <el-table-column
                                  label="设备ID"
                                  prop="equipId"
                                  width="200">
                                  <template slot-scope="scope">
                                    {{ scope.row.equipId }}
                                  </template>
                                </el-table-column>
                                <el-table-column
                                  label="设备名"
                                  prop="name">
                                  <template slot-scope="scope">
                                    {{ scope.row.name }}
                                  </template>
                                </el-table-column>
                              </el-table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </el-card>
                  </el-timeline-item>
                  <el-timeline-item timestamp="2021/3/10 20:46:20" placement="top">
                    <el-card>
                      <div class="row">
                        <div class="col-lg-12">
                          <div class="card">
                            <div class="card-body">
                              <div class="card-title" style="font-size: 12px">
                                <p style="color: #3b5998">与人员【EMS_ADMIN_4】系统管理员发生设备交接事件后</p>
                                当时负责的设备列表</div>
                              <hr>
                              <el-table
                                :data="equipData"
                                :header-cell-style="{color: 'black', fontSize: '12px'}"
                                style="width: 100%"
                                cell-style="font-size: 12px"
                                stripe
                                border>
                                <el-table-column
                                  label="设备ID"
                                  prop="equipId"
                                  width="200">
                                  <template slot-scope="scope">
                                    {{ scope.row.equipId }}
                                  </template>
                                </el-table-column>
                                <el-table-column
                                  label="设备名"
                                  prop="name">
                                  <template slot-scope="scope">
                                    {{ scope.row.name }}
                                  </template>
                                </el-table-column>
                              </el-table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </el-card>
                  </el-timeline-item>
                </el-timeline>
              </div>
            </div>
          </div>
        </div>
          <div class="col-12 col-lg-12 col-xl-6">
            <div class="card">
              <div class="card-header"><span class="fa fa-circle text-info float-right"></span>负责的设备流转频率</div>
              <div class="card-body">
                <canvas id="add-impressions-frequency-reach" height="145"></canvas>
              </div>
            </div>
          </div>
        </div><!--End Row-->

      </div>
      <!-- End container-fluid-->

    </div><!--End content-wrapper-->
  </div>
</template>

<script>
  import request from '../../utils/request'
  export default {
    name: 'centerCart',
    inject: ['reload'],
    data() {
      return{
        typeMenu: '',
        roleMenu: '',
        equipData: [
          {
            equipId: '1017',
            name: '智能设备-553443'
          },{
            equipId: '1039',
            name: '智能设备-875591'
          }
        ],
        equipData1: [
          {
            equipId: '1039',
            name: '智能设备-875591',
            LendDate: '2021/4/23 20:46:20',
            allowPermanentLend: '否'
          }
        ]
      }
    },
    mounted() {
      this.getData();
    },
    methods: {
      getData() {
        let _this = this;
        request.$get('/securityForm/types/alarm', {}, (res) => {
          console.log(res.data.data);
          let typemenu = res.data.data;
          _this.typeMenu = typemenu;
          _this.getadd_impressions_frequency_reach();
        }, _this);
        request.$get('/role/roles/valid', {}, (res) => {
          console.log(res.data.data);
          let role = res.data.data.map((item) => {
            let data = item.name
            return data;
          });
          _this.roleMenu = role;
          _this.getroleCart();
        }, _this);
      },
      getroleCart() {
        let _this = this
        let ctx = document.getElementById("impressions-add").getContext('2d');
        let myChart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: _this.roleMenu,//每个角色的名称
            datasets: [{
              backgroundColor: [
                'rgb(59, 89, 152)',
                'rgba(59, 89, 152, 0.80)',
                'rgba(59, 89, 152, 0.60)',
                'rgba(59, 89, 152, 0.40)',
                'rgba(59, 89, 152, 0.30)',
                'rgba(59, 89, 152, 0.10)'
              ],
              hoverBackgroundColor: [
                'rgb(59, 89, 152)',
                'rgba(59, 89, 152, 0.80)',
                'rgba(59, 89, 152, 0.60)',
                'rgba(59, 89, 152, 0.40)',
                'rgba(59, 89, 152, 0.30)',
                'rgba(59, 89, 152, 0.10)'
              ],
              data: [178, 178, 178],//每个角色的数据
              borderWidth: [1, 1, 1, 1, 1]
            }]
          },
          options: {
            cutoutPercentage: 65,
            legend: {
              position: 'right',
              display: true,
              labels: {
                boxWidth:40
              }
            },
            tooltips: {
              displayColors:false,
            }
          }
        });
      },
      getadd_impressions_frequency_reach() {
        // chart 1

        var ctx = document.getElementById('add-impressions-frequency-reach').getContext('2d');

        var myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", 'Aug', 'Sept' ,'Oct', 'Nov', 'Dec'],
            datasets: [{
              label: '设备通行数',
              data: [25, 23, 27, 15, 27, 23, 31, 41, 25, 23, 15, 27],
              backgroundColor: 'rgba(59, 89, 152, 0.55)',
              borderColor: "transparent",
              borderWidth: 3
            },{
              label: '设备借记数',
              data: [20, 18, 21, 10, 21, 18, 26, 36, 20, 18, 21, 10],
              backgroundColor: 'rgba(54, 241, 205, 0.55)',
              borderColor: "transparent",
              borderWidth: 3
            }, {
              label: '频率',
              type: 'line',
              data: [10, 8, 12, 5, 12, 8, 16, 25, 10, 8, 12, 5],
              backgroundColor: "rgba(59, 89, 152, 0.35)",
              borderColor: "#3b5998",
              pointBackgroundColor:'transparent',
              pointHoverBackgroundColor:'transparent',
              pointBorderWidth :0,
              pointRadius :0,
              pointHoverRadius :0,
              borderWidth: 2

            }]
          },
          options: {
            legend: {
              display: true,
              labels: {
                fontColor: '#585757',
                boxWidth:40
              }
            },
            tooltips: {
              displayColors:false
            },
            scales: {
              xAxes: [{
                barPercentage: .4,
                ticks: {
                  beginAtZero:true,
                  fontColor: '#585757'
                },
                gridLines: {
                  display: true ,
                  color: "rgba(0, 0, 0, 0.05)"
                },
              }],
              yAxes: [{
                ticks: {
                  beginAtZero:true,
                  fontColor: '#585757'
                },
                gridLines: {
                  display: true ,
                  color: "rgba(0, 0, 0, 0.05)"
                },
              }]
            }

          }
        });
      }
    }
  }

</script>

<style scoped>

</style>

