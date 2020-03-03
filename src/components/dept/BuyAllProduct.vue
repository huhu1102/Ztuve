<template>
<!--  生产计划-->
    <div>
<!--      <el-tabs v-model="activeName"type="border-card"  @tab-click="handleClick" style="margin-top: 10px">-->
<!--        <el-tab-pane label="原材料采购计划" name="material"><mp></mp></el-tab-pane>-->
<!--        <el-tab-pane label="半成品采购计划" name="midproduct"><mps></mps></el-tab-pane>-->
<!--       -->
<!--      </el-tabs>-->
      <el-container style="display: flex;flex-direction: column; font-size: 14px;">
        <div style="margin-left:20px;line-height: 30px;; height: 30px; text-align: start;padding-left: 20px;border-left: 4px solid red;font-weight: 700;">
          采购管理
        </div>
        <el-main class="product-base">
          <div class="product-item"  v-for="item in  stepOpt" :key="item.id" @click="detials(item)">
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
    import BuyPlan from '@/components/dept/BuyPlan';
    import BuyPlanMidProduct from '@/components/dept/BuyPlanMidProduct';
    export default {
      data() {
        return {
          activeName: 'material'
        };
      },
      methods: {
        detials(e){
          this.$router.replace({
            path: e.path
          });
        },
        handleClick(tab, event) {
          console.log(tab, event);
        }
      },
      components:{
        'mp':BuyPlan,
        'mps':BuyPlanMidProduct
      },
      computed: {
        stepOpt(){
          let currentCmp={};
          console.log(this.$store.state.routes);
          this.$store.state.routes.forEach(function (va) {
            if(va.path==='/buyallproduct'){
              currentCmp=va;
            }
          });
          console.log(currentCmp.id);
          let currentlist=[];
          this.$store.state.routes.forEach(function (va) {
            if(va.parentId===currentCmp.id){
              currentlist.push(va);
            }
          });
          console.log(currentlist);
          return currentlist||[];
        }
      },
    };
  </script>
<style>
  .product-base{
    width: 100%;
    height: auto;
    display: flex;
    padding: 0 20px 20px 20px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    box-sizing: border-box;

  }
  .product-item{
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
  .item-left{
    height: 140px;
    width: 140px;
    background-color: #2fc5da;
  }
  .item-right{
    height: 140px;
    width: 420px;
    background-color: #F5F6FA;
  }
</style>
