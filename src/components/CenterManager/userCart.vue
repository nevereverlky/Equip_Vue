<template>
  <div id="wrapper">
    <div class="content-wrapper">
      <div class="container-fluid">

        <div class="row mt-3">
          <div class="col-12 col-lg-6 col-xl-3">
            <el-tooltip class="item" effect="dark" content="点击查看名单" placement="top">
              <div class="card" style="cursor: pointer">
                <div class="p-2">
                  <div class="card-content bg-twitter p-2 rounded">
                    <div class="media align-items-center">
                      <div class="media-body">
                        <h4 class="mb-0 text-white">5</h4>
                        <p class="mb-0 text-white">设备归还超时5次以上的人员名单</p>
                      </div>
                      <div class="w-icon"><i class="fa fa-users text-white"></i></div>
                    </div>
                    <div class="progress mt-3" style="height:4px;">
                      <div class="progress-bar bg-white" style="width:20%"></div>
                    </div>
                    <p class="mb-0 mt-2 text-white"><span>其中普通用户角色的人员数：</span> <span class="float-right">3</span></p>
                  </div>
                </div>
              </div>
            </el-tooltip>
          </div>
          <div class="col-12 col-lg-6 col-xl-3">
            <el-tooltip class="item" effect="dark" content="点击查看名单" placement="top">
              <div class="card" style="cursor: pointer">
                <div class="p-2">
                  <div class="card-content bg-facebook p-2 rounded">
                    <div class="media align-items-center">
                      <div class="media-body">
                        <h4 class="mb-0 text-white">2</h4>
                        <p class="mb-0 text-white">评分低于60分的人员名单</p>
                      </div>
                      <div class="w-icon"><i class="fa fa-eye text-white"></i></div>
                    </div>
                    <div class="progress mt-3" style="height:4px;">
                      <div class="progress-bar bg-white" style="width:8%"></div>
                    </div>
                    <p class="mb-0 mt-2 text-white"><span>其中设备管理员角色的人员数：</span> <span class="float-right"> 0</span></p>
                  </div>
                </div>
              </div>
            </el-tooltip>
          </div>
          <div class="col-12 col-lg-6 col-xl-3">
            <el-tooltip class="item" effect="dark" content="点击查看名单" placement="top">
              <div class="card" style="cursor: pointer">
                <div class="p-2">
                  <div class="card-content bg-twitter p-2 rounded">
                    <div class="media align-items-center">
                      <div class="media-body">
                        <h4 class="mb-0 text-white">20</h4>
                        <p class="mb-0 text-white">未导入人脸信息的人员名单</p>
                      </div>
                      <div class="w-icon"><i class="fa fa-user-circle-o text-white"></i></div>
                    </div>
                    <div class="progress mt-3" style="height:4px;">
                      <div class="progress-bar bg-white" style="width:35%"></div>
                    </div>
                    <p class="mb-0 mt-2 text-white"><span>其中设备管理员角色的人员数：</span> <span class="float-right">15</span></p>
                  </div>
                </div>
              </div>
            </el-tooltip>
          </div>
          <div class="col-12 col-lg-6 col-xl-3">
            <el-tooltip class="item" effect="dark" content="点击查看名单" placement="top">
              <div class="card" style="cursor: pointer">
                <div class="p-2">
                  <div class="card-content bg-facebook p-2 rounded">
                    <div class="media align-items-center">
                      <div class="media-body">
                        <h4 class="mb-0 text-white">11</h4>
                        <p class="mb-0 text-white">未归还设备的人员名单</p>
                      </div>
                      <div class="w-icon"><i class="fa fa-address-book-o text-white"></i></div>
                    </div>
                    <div class="progress mt-3" style="height:4px;">
                      <div class="progress-bar bg-white" style="width:30%"></div>
                    </div>
                    <p class="mb-0 mt-2 text-white"><span>其中永久借出的人员数:</span> <span class="float-right">0</span></p>
                  </div>
                </div>
              </div>
            </el-tooltip>
          </div>
        </div><!--End Row-->

        <div class="card">
          <div class="card-header">人员角色概览</div>
          <div class="card-content">
            <div class="row row-group m-0">
              <div class="col-12 col-lg-12 col-xl-6">
                <div class="card-body">
                  <table class="table">
                    <thead>
                    <tr>
                      <th>角色</th>
                      <th>对应人员数量</th>
                      <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in roleMenu" :key="item.id">
                      <td>{{item.name}}</td>
                      <td>{{item.number}}</td>
                      <td>
                        <button type="button" class="btn btn-outline-primary btn-sm btn-round waves-effect waves-light" >查看名单</button>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="col-12 col-lg-12 col-xl-6">
                <div class="card-body">
                  <div id="myChart" :style="{width: '100%' , height: '350px'}"></div>
                </div>
              </div>
            </div><!--End Row-->
          </div>
        </div>

      </div>
      <!-- End container-fluid-->

    </div><!--End content-wrapper-->
  </div>
</template>

<script>
export default {
  name: 'userCart',
  data () {
    return {
      roleMenu: [
        {
          name: '企业管理员',
          number: 5
        },
        {
          name: '设备管理员',
          number: 12
        },
        {
          name: '系统装维员',
          number: 12
        },
        {
          name: '普通用户',
          number: 28
        }
      ]
    }
  },
  mounted () {
    this.drawLine();
  },
  methods: {
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: '人员角色',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '15',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {value: 484, name: '企业管理员', itemStyle: { color: '#3b5998' }},
              {value: 580, name: '设备管理员', itemStyle: { color: '#55acee' }},
              {value: 735, name: '系统装维员', itemStyle: { color: '#fba540' }},
              {value: 1048, name: '普通用户', itemStyle: { color: '#f5365c' }}
            ]
          }
        ]
      });
    }
  }
}
</script>

<style scoped>

</style>
