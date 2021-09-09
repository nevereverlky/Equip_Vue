<template>
  <div id="wrapper">
    <div class="content-wrapper">
      <div class="container-fluid">

        <div class="row mt-3">
          <div class="col-12 col-lg-6 col-xl-3">
            <div class="card border-0 bg-transparent">
              <div class="card-body">
                <div class="media align-items-center">
                  <div class="w-icon"><i class="fa fa-eye text-facebook"></i></div>
                  <div class="media-body ml-3 border-left-xs border-light-2">
                    <h4 class="mb-0 ml-3 text-facebook">5</h4>
                    <p class="mb-0 ml-3 extra-small-font">角色数</p>
                  </div>
                  <div class="media-body ml-3 border-left-xs border-light-2">
                    <h4 class="mb-0 ml-3 text-facebook">4</h4>
                    <p class="mb-0 ml-3 extra-small-font">权限数</p>
                  </div>
                  <div class="media-body ml-3 border-left-xs border-light-2">
                    <h4 class="mb-0 ml-3 text-facebook">46</h4>
                    <p class="mb-0 ml-3 extra-small-font">接口数</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 col-lg-6 col-xl-3">
            <div class="card border-0 bg-transparent">
              <div class="card-body">
                <div class="media align-items-center">
                  <div class="w-icon"><i class="fa fa-pie-chart text-twitter"></i></div>
                  <div class="media-body ml-3 border-left-xs border-light-2">
                    <h4 class="mb-0 ml-3 text-twitter">3</h4>
                    <p class="mb-0 ml-3 extra-small-font">门禁数</p>
                  </div>
                  <div class="media-body ml-3 border-left-xs border-light-2">
                    <h4 class="mb-0 ml-3 text-twitter">33.3%</h4>
                    <p class="mb-0 ml-3 extra-small-font">仓库占比</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 col-lg-6 col-xl-3">
            <div class="card border-0 bg-transparent">
              <div class="card-body">
                <div class="media align-items-center">
                  <div class="w-icon"><i class="fa fa-tags text-facebook"></i></div>
                  <div class="media-body ml-3 border-left-xs border-light-2">
                    <h4 class="mb-0 ml-3 text-facebook">110</h4>
                    <p class="mb-0 ml-3 extra-small-font">标签数</p>
                  </div>
                  <div class="media-body ml-3 border-left-xs border-light-2">
                    <h4 class="mb-0 ml-3 text-facebook">91.8%</h4>
                    <p class="mb-0 ml-3 extra-small-font">已绑定门禁</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 col-lg-6 col-xl-3">
            <div class="card border-0 bg-transparent">
              <div class="card-body">
                <div class="media align-items-center">
                  <div class="w-icon"><i class="fa fa-briefcase text-twitter"></i></div>
                  <div class="media-body ml-3 border-left-xs border-light-2">
                    <h4 class="mb-0 ml-3 text-twitter">110</h4>
                    <p class="mb-0 ml-3 extra-small-font">设备数</p>
                  </div>
                  <div class="media-body ml-3 border-left-xs border-light-2">
                    <h4 class="mb-0 ml-3 text-twitter">1.9%</h4>
                    <p class="mb-0 ml-3 extra-small-font">已入库</p>
                  </div>
                  <div class="media-body ml-3 border-left-xs border-light-2">
                    <h4 class="mb-0 ml-3 text-twitter">10%</h4>
                    <p class="mb-0 ml-3 extra-small-font">已借出</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div><!--End Row-->

        <div class="row">
          <div class="col-12 col-lg-6 col-xl-4">
            <div class="card">
              <div class="card-body">
                <div class="card-title">近七日门禁警报情况</div>
                <canvas id="total-actions" height="200"></canvas>
                <hr>
                <p class="text-center mb-3 font-weight-bold">近七日各类警报数量</p>
                <ul class="list-group list-group-flush shadow-none">
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    {{typeMenu.UNINITIALIZED_GUARD}}
                    <span class="badge badge-primary badge-pill">0</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    {{typeMenu.INVALID_TAG}}
                    <span class="badge badge-primary badge-pill">15</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    {{typeMenu.UNINITIALIZED_TAG}}
                    <span class="badge badge-primary badge-pill">0</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    {{typeMenu.UNINITIALIZED_GUARD_TAG}}
                    <span class="badge badge-primary badge-pill">6</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
          <div class="col-12 col-lg-6 col-xl-4">
            <div class="card">
              <div class="card-body">
                <div class="card-title">近七日设备流转情况</div>
                <canvas id="page-views" height="200"></canvas>
                <hr>
                <p class="text-center mb-3 font-weight-bold">近七日各类流转操作的设备数量</p>
                <el-tooltip class="item" effect="dark" content="点击查看设备名单" placement="top">
                  <ul class="list-group list-group-flush shadow-none">
                    <li class="list-group-item d-flex justify-content-between align-items-center" style="cursor: pointer">
                      入库操作
                      <span class="badge bg-facebook text-white badge-pill">29</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center" style="cursor: pointer">
                      出库操作
                      <span class="badge bg-facebook text-white badge-pill">12</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center" style="cursor: pointer">
                      人员间流转
                      <span class="badge bg-facebook text-white badge-pill">30</span>
                    </li>
                  </ul>
                </el-tooltip>
              </div>

            </div>
          </div>
          <div class="col-12 col-lg-6 col-xl-4">
            <div class="card">
              <div class="card-body">
                <div class="card-title">近七日审批申请情况</div>
                <canvas id="audience-growth" height="200"></canvas>
                <hr>
                <p class="text-center mb-3 font-weight-bold">近七日各类申请状态数量</p>
                <ul class="list-group list-group-flush shadow-none">
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    待审批
                    <span class="badge badge-primary badge-pill">2</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    已通过
                    <span class="badge badge-primary badge-pill">5</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    已驳回
                    <span class="badge badge-primary badge-pill">1</span>
                  </li>
                </ul>
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
  name: 'equipCart',
  data () {
    return {
      typeMenu: ''
    }
  },
  mounted () {
    this.getData();
  },
  methods: {
    getData () {
      let _this = this;
      request.$get('/securityForm/types/alarm', {}, (res) => {
        console.log(res.data.data);
        let typemenu = res.data.data;
        _this.typeMenu = typemenu;
        _this.gettotal_actions();
        _this.getpage_views();
        _this.getaudience_growth();
      }, _this);
    },
    gettotal_actions () {
      let ctx = document.getElementById('total-actions').getContext('2d');

      let myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['01', '02', '03', '04', '05', '06', '07'],
          datasets: [{
            label: '门禁警报次数',
            data: [15, 8, 12, 5, 12, 8, 16],
            backgroundColor: 'rgba(20, 171, 239, 0.24)',
            borderColor: '#14abef',
            pointBackgroundColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointBorderColor: '#14abef',
            pointHoverBorderColor: '#14abef',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 4,
            borderWidth: 3
          }]
        },
        options: {
          legend: {
            position: false,
            display: true
          },
          tooltips: {
            displayColors: false
          }
        }
      });
    },
    getpage_views () {
      let ctx = document.getElementById('page-views').getContext('2d');

      let myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['01', '02', '03', '04', '05', '06', '07'],
          datasets: [{
            label: '流转设备数',
            data: [20, 35, 40, 20, 35, 25, 60],
            backgroundColor: 'rgba(59, 89, 152, 0.24)',
            borderColor: '#3b5998',
            pointBackgroundColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointBorderColor: '#3b5998',
            pointHoverBorderColor: '#3b5998',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 4,
            borderWidth: 3
          }]
        },
        options: {
          legend: {
            position: false,
            display: true
          },
          tooltips: {
            displayColors: false
          }
        }
      });
    },
    getaudience_growth () {
      let ctx = document.getElementById('audience-growth').getContext('2d');

      let myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['01', '02', '03', '04', '05', '06', '07'],
          datasets: [{
            label: '申请数',
            data: [55, 40, 45, 20, 40, 20, 40],
            backgroundColor: 'rgba(20, 171, 239, 0.24)',
            borderColor: '#14abef',
            pointBackgroundColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointBorderColor: '#14abef',
            pointHoverBorderColor: '#14abef',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 4,
            borderWidth: 3
          }]
        },
        options: {
          legend: {
            position: false,
            display: true
          },
          tooltips: {
            displayColors: false
          }
        }
      });
    }
  }
}
</script>

<style scoped>

</style>
