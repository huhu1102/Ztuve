<template>
    <div>
<!--      <el-tabs v-model="activeName"type="border-card"  @tab-click="handleClick" style="margin-top: 10px">-->
<!--     -->
<!--      -->
<!--        <el-tab-pane label='车辆基本信息'  name="cars" lazy>-->
<!--            <cars ref="child"></cars>-->
<!--          </el-tab-pane>-->
<!--          <el-tab-pane label="车辆驾驶记录" name="carsRecord" lazy>-->
<!--            <carsrecord  ref="child"></carsrecord>-->
<!--          </el-tab-pane>-->
<!--          <el-tab-pane label="车辆维护" name="carsRepair" lazy>-->
<!--            <repair  ref="child"></repair>-->
<!--          </el-tab-pane>-->
<!--          <el-tab-pane label="车辆申请" name="carsRequest" lazy>-->
<!--            <carsres  ref="child"></carsres>-->
<!--          </el-tab-pane>-->
<!--          <el-tab-pane label="车辆分配" name="carsAlot" lazy>-->
<!--            <carred  ref="child"></carred>-->
<!--          </el-tab-pane>-->
<!--      </el-tabs>-->
      <el-container style="display: flex;flex-direction: column; font-size: 14px;">
        <div
          style="margin-left:20px;line-height: 30px;; height: 30px; text-align: start;padding-left: 20px;border-left: 4px solid red;font-weight: 700;">
          销售管理
        </div>
        <el-main class="product-base">
          <div class="product-item" v-for="item in  stepOpt" :key="item.id" @click="detials(item)">
            <div class="item-left">
              <div style="margin:60px 0;font-size: 16px">
                <span class="fa fa-product-hunt" style="display: block;"></span>
                <span style="display: block;">{{item.name}}</span>
              </div>
            </div>
            <div class="item-right">
            </div>
          </div>

        </el-main>
      </el-container>
    </div>
  </template>
  <script>
    // import Car from '@/components/dept/Car';
    // import CarRecord from '@/components/dept/CarRecord';
    // import CarRepair from '@/components/dept/CarRepair';
    // import CarReqRecord from '@/components/dept/CarReqRecord';
    // import CarRequest from '@/components/dept/CarRequest';
    export default {
      data() {
        return {
          activeName: 'cars'
        };
      },
      methods: {
        // handleClick(tab, event) {
        //   console.log(tab, event);
        // },
        detials(e) {
          this.$router.replace({
            path: e.path
          });
        }
      },
      components:{
        // 'cars':Car,
        // 'carsrecord':CarRecord,
        // 'repair':CarRepair,
        // 'carred':CarReqRecord,
        // 'carsres':CarRequest
    
      },
      computed: {

        stepOpt() {

          let currentCmp = {};
          console.log(this.$store.state.routes);
          this.$store.state.routes.forEach(function (va) {
            if (va.path === '/carBase') {
              currentCmp = va;
            }
          });
          console.log(currentCmp.id);
          let currentlist = [];
          this.$store.state.routes.forEach(function (va) {
            if (va.parentId === currentCmp.id) {
              currentlist.push(va);
            }
          });
          console.log(currentlist);
          return currentlist || [];
        }
      }
    };
  </script>
<style>

  .product-base {
    width: 100%;
    height: auto;
    display: flex;
    padding: 0 20px 20px 20px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    box-sizing: border-box;

  }

  .product-item {
    box-sizing: border-box;
    height: 140px;
    width: 560px;
    overflow: hidden;
    position: relative;
    margin-top: 10px;
    color: #ffffff;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: stretch;
    background-color: blanchedalmond;
  }

  .item-left {
    height: 140px;
    width: 140px;
    background-color: #2fc5da;
  }

  .item-right {
    height: 140px;
    width: 420px;
    background-color: #F5F6FA;
  }
</style>
