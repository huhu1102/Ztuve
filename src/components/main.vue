<template>
  <el-container class="main-container">

    <el-main class="main-main">
      <div class="main-left">
        <div class="main-left-ceil">最近操作记录</div>
        <div class="main-left-floor">
          <div class="floor-left">
            <Calendar :selection="value" @selectionChange="newDate=$event" style="width:100%;height:400px;"></Calendar>
            <!--            <p>{{newDate |formatDate}}</p>-->
          </div>
          <div class="floor-right">会议记要</div>
        </div>
      </div>
      <div class="main-right">
        <div class="main-right-ceil">
          <div style="height: 100%;width: 100%;">
            <div>
              通知
            </div>
            <div>
              <div v-for="note in infos" :key="note.id">
                <div class="infor-itmes" v-if="note.note">{{note.note}}</div>
              </div>
            </div>

          </div>


        </div>
        <div class="main-right-floor">
          <div class="dirty">

            值日消息
          </div>
          <div class="dirty-ifor">
           本周：王磊、王海亮
          </div>
        </div>
      </div>

    </el-main>
  </el-container>

</template>

<script>
  export default {
    data() {
      return {
        value: new Date(),

        infos: [{
          id: 1,
          note: '各岗位做好疫情期间防护工作',
        }, {
          id: 7,
          note: '本周线上项目开始测试',
        }, {
          id: 6,
          note: '本周厂部完成盘库工作',

        }, {
          id: 4,
          note: '大家外出注意安全！',


        }]

      }

    },
    methods: {}
  }

</script>

<style scoped>
  .infor-itmes {
    width: 100%;
    padding: 16px 0 10px 6px;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-bottom: 1px solid #e4e4e4;
    font-size: 14px;
  }

  .main-container {
    display: flex;
    flex-direction: column;
    background-color: #E5EFF1;
  }


  .main-main {
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    /*border: 1px solid red;*/
    height: auto;

  }

  .main-left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /*border: 1px solid #696969;*/
    height: auto;
    width: 61%;

  }

  .main-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /*border: 1px solid #696969;*/
    height: auto;
    width: 38%;
  }

  .main-left-ceil {
    width: 98%;
    /*border: 1px solid #696969;*/
    height: 400px;
    background-color: #ffffff;
  }

  .main-left-floor {
    margin-top: 15px;
    width: 98%;
    /*border: 1px solid #696969;*/
    height: 400px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .main-right-ceil {
    width: 100%;
    height: 400px;
    /*border: 1px solid #696969;*/
    background-color: #ffffff;
  }

  .main-right-floor {
    margin-top: 15px;
    width: 100%;
    height: 400px;
    /*border: 1px solid #696969;*/
    background-color: #ffffff;
  }

  .floor-right {
    width: 49%;
    height: 400px;
    /*border: 1px solid #696969;*/
    background-color: #ffffff;
  }

  .floor-left {
    width: 49%;
    height: 400px;
    /*border: 1px solid #696969;*/
    background-color: #ffffff;
  }

  .items-detail {
    line-height: 24px;
    font-size: 22px;
    color: yellow;

  }



</style>
