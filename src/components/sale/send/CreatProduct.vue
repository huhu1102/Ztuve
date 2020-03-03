<!-- 生产进度-->
<template>
  <div>
    <el-container class="prog-head-grees">
<!--      <div style="width: 100%;text-align: left;padding-right:40px; ">-->
<!--        <span class="fa fa-arrow-left" style="color: #2fc5da;font-size: 16px;padding: 16px;" @click="backToMain">返回</span>-->
<!--      </div>-->
      <el-page-header style="padding: 16px" @back="backToMain" >
        <div slot="content">
          <span style="font-size: 14px;" >生产详情</span>
        </div>

      </el-page-header>
      <div class="prog">
        <div class="prog-up">
          <div class="prog-up-left">
           <div style="text-align: left; font-size: 16px;font-weight: 800;">
             生产计划详情：
           </div>
            <div style="flex-wrap: wrap; position: absolute; width: 560px;height: 140px; flex-direction: row;justify-content: start;display: flex;box-sizing: border-box;">
              <div class="detail-item">
                本次需求量：{{planDetails.actualQuantity|commafy}}
              </div>
              <div class="detail-item">
                本次已发货：{{planDetails.sendQuantity|commafy}}
              </div>
              <div class="detail-item">
              <span v-if="planDetails.employee">
            计划下发人：{{planDetails.employee.name}}
            </span>
              </div>
              <div class="detail-item">
                已完成数量：{{planDetails.accomplishNO|commafy}}
              </div >
              <div class="detail-item">
                下计划时间：{{planDetails.createDate|formatDateTime}}
              </div>
              <div class="detail-item">
                备注：{{planDetails.note}}
              </div>
            </div>

          </div>
          <div class="prog-up-right">
            <div style="width:100%;height:100%;" id="mannagePie">
            </div>

          </div>
        </div>
        <div class="prog-down">
          <div style="  display: flex;flex-direction: row;justify-content: flex-start">
            <el-date-picker size="mini" v-model="value5" type="datetimerange" :picker-options="pickerOptions2"
                            range-separator="至"
                            start-placeholder="开始日期" end-placeholder="结束日期" align="right" clearable
                            @clear="clearPlanDates">
            </el-date-picker>
             <el-button size="mini" type="primary" @click="showByDate" >查看 </el-button>
            <div style="display: flex;flex-direction: row;justify-content: flex-start;padding-left: 10px;">

            <el-button size="mini" type="primary" @click="preMouth" >上月 </el-button>
             <el-button size="mini" type="primary" @click="nowMouth" >当月 </el-button>
             <el-button size="mini" type="primary" @click="nextMouth" >下月</el-button>
            </div>

          </div>
          <div class="echcart" id="mannageChart"></div>
        </div>
      </div>
    </el-container>


  </div>
</template>
<script>
  // import SalesPlan from "../SalesPlan";

  var echart = require('echarts')
  export default {
    name: 'manage-chart',
    // components: {SalesPlan},
    props: {
      managerId: {
        type: Number,
        default: {},
      },
      planDetails: {
        type: Object,
        default: {},
      }
    },
    data() {
      return {
        // 月份使用？
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value4: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        value5: '',
        startDate:'',

        maxQuantity: 2000,
        dialogfinishedTitle: '修改记录',
        dialogFinshVisible: false,
        currentFinishPage: 1,
        totalFinishCount: -1,
        mychart:{},
        mypie:{},
      }
    },
    mounted() {
      this.initData();
    },
    methods: {
      preMouth(){
        let end = new Date();
        let start = new Date();
        this.startDate= new Date(this.startDate.setTime(this.startDate.getTime() - 3600 * 1000 * 24 * 60));
        this.endDate=new Date(this.endDate.setTime(this.endDate.getTime()-3600 * 1000 * 24 * 30));
        this.refreshData();
      },
      nowMouth(){
        let end = new Date();
        let start = new Date();
       this.startDate= new Date(start.setTime(start.getTime() - 3600 * 1000 * 24 * 30))  ;
       this.endDate=end;
        this.refreshData();
      },
      nextMouth(){
        let end = new Date();
        let start = new Date();
        console.log("endDate"+this.endDate);
        var now=new Date(this.endDate.getTime()+3600 * 1000 * 24 * 60);
          console.log(now+'nowsadnsdfna');
        if(now<end){
        this.startDate= new Date(  this.startDate.setTime(this.startDate.getTime() + 3600 * 1000 * 24 * 30));
        this.endDate= new Date(this.endDate.setTime(this.endDate.getTime()+3600 * 1000 * 24 * 60));
          this.refreshData();
        }else{
          this.$message({
            message:'未开始生产',
            type:'info'
          })
        }

      },
      clearPlanDates() {
        this.startDate = '';
        this.endDate = '';
      },
      showByDate(){
        if (this.value5 && this.value5.length) {
        this.startDate = this.value5[0];
        this.endDate = this.value5[1];
        this.refreshData();
        }
        console.log(this.startDate+"",this.endDate+"");
      },

      initData() {
        console.log("pie");
        this.mychart = echart.init(document.getElementById('mannageChart'));
        this.mypie = echart.init(document.getElementById('mannagePie'));
        var end = new Date();
         var start = new Date();
        start=start.getTime() - 3600 * 1000 * 24 * 30;
        start=new Date(start);
        this.startDate=start;
        this.endDate=end;
        this.refreshData()

      },
      refreshData(){
        let self = this;
        this.getRequest("/pmDetails/findByMangeId?manageId="
          + this.managerId
          + "&page=" + this.currentFinishPage
          + "&size=30"
          + "&start="+this.startDate
          + "&end="+this.endDate
        ).then(
          resp => {
            if (resp && resp.status === 200 && resp.data.success) {
              self.planFinishRecord = resp.data.data || [];
              self.totalFinishCount = resp.data.total;
              let xData = [], yData = [];
              self.planFinishRecord.map(item => {
                let mouth = new Date(item.createDate).getMonth() + 1;
                let day = new Date(item.createDate).getDate();
                let time = mouth + "月" + day + "日";
                xData.push(time);
                yData.push(item.qualifiedNo);
              });
              self.chartShow(self.mychart, xData, yData);
              self.showpieData(self.mypie);
            } else {
              self.$message({message: '查询失败', type: 'info'})
            }
          }
        )
      },
      showpieData(mypie) {
        let self = this;
        var legData = [], pieData = [];
        legData = ['未完成', '已完成'];
        var completeData = self.planDetails.accomplishNO;
        var totalData = self.planDetails.actualQuantity;
        var unCompleteData;
        var comRate, unRate;
        if (completeData <= totalData) {
          comRate = completeData > 0 ? (Math.round(completeData / totalData * 10000) / 100.00) + "%" : "0%";
          unCompleteData = totalData - completeData;
          unRate =   unCompleteData > 0 ? (Math.round(unCompleteData / totalData * 10000) / 100.00) + "%" : "0%";
        } else {
          comRate = "100%";
          unCompleteData = 0;
          unRate = '0';
        }
        pieData.push({
          value: completeData, name: '已完成' ,
        });
        pieData.push({
          value: unCompleteData, name: '未完成',
        });

        self.pieShow(mypie, legData, pieData);
      },
      pieShow(mypie, legData, pieData) {
        mypie.setOption({
          title: {
            text: '生产进度总览',

            left: 'left'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'right',
            data: legData,/*['未完成', '已完成']*/
          },
          series: [
            {
              name: '生产进度',
              type: 'pie',
              radius: '55%',
              barWidth:30,
              center: ['50%', '50%'],
              data: pieData /*[
                {value: 335, name: '未完成'},
                {value: 310, name: '已完成'},

              ]*/,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',

                }
              }
            }
          ]
        });
      },
      chartShow(mychart, xData, yData) {
        mychart.setOption({
          title: {text: '该生产详细进度'},
          tooltip: {},
          xAxis: {
            data: xData,// ['yms', 'xiaohe', 'doang', 'yms', 'xiaohe','yms', 'xiaohe', 'doang', 'yms', 'xiaohe','yms', 'xiaohe', 'doang', 'yms', 'xiaohe','yms', 'xiaohe', 'doang', 'yms', 'xiaohe','yms', 'xiaohe', 'doang', 'yms', 'xiaohe','yms', 'xiaohe', 'doang', 'yms', 'xiaohe'],
          },
          yAxis: {},
          series: [{

            name: '数量',
            type: 'bar',
            barWidth:30,
            data: yData,//[5, 89, 6, 5, 89, 6,5, 89, 6, 5, 89, 6,5, 89, 6, 5, 1500, 6,5, 89, 6, 5, 89, 6,5, 89, 6, 5, 89, 6]
            label: {
              show: true,
              position: "top",
              color: "#33CC66",
              formatter: "{c}"
            },
          }],
        })
      },
      backToMain() {
        this.$emit('backToMain')
      },

      //返回前一页面
      goPreManage() {
        this.detailProduct = false;
      },
      //编辑生产进度详情
      // cancelUpdate(){
      //
      // }

      //更新记录方法
      updateFinishStep() {
        let that = this;
        let manageId = this.managerId;
        let param = this.stepRecord;


      },

      // 删除详情


    }
  }
</script>
<style scoped>
  .prog-head-grees {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-right: 10px;

  }

  .echcart {
    height: 380px;
    width: 900px;
  }

  .prog {
    height: 1000px;
    width: 1170px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    /*border: 1px solid red;*/
  }

  .prog-up {
    height: 180px;
    width: 100%;
    border: 1px solid greenyellow;
    display: flex;
    flex-direction: row;
    justify-content: start;
  }

  .prog-up-left {
    height: 100%;
    width: 50%;
    border: 1px solid gold;
    padding: 10px;
  }

  .prog-up-right {
    height: 100%;
    width: 50%;
    border: 1px solid darkgreen;
    padding: 10px;
  }

  .prog-down {
    height: 400px;
    width: 100%;
    border: 1px solid salmon;
    padding-left: 20px;
  }

  .detail-item {
    width: 50%;
    box-sizing: border-box;
    border: 2px solid #8c939d;
    line-height: 40px;
    position: relative;
  }

  .prog-up-right-detail {
    cursor: pointer;
    color: #2fc5da;
    margin-left: 20px;
  }

  .prog-up-right-detail:hover {
    opacity: 0.6;
  }

</style>
