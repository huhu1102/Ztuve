<template>
  <div>
    <!--      <el-tabs v-model="activeName"type="border-card"  @tab-click="handleClick" style="margin-top: 10px">-->
    <!--        &lt;!&ndash; <el-tab-pane label="生产计划" name=" plan"><mp></mp></el-tab-pane> &ndash;&gt;-->
    <!--        <el-tab-pane label="销售计划" name="plan"><mp ref="plan"></mp></el-tab-pane>-->
    <!--&lt;!&ndash;        <el-tab-pane label="生产计划" name="planed"><mps ref="planed"></mps></el-tab-pane>&ndash;&gt;-->
    <!--        <el-tab-pane label="生产进度" name="planedManager"><mpm ref="planed"></mpm></el-tab-pane>-->
    <!--&lt;!&ndash;        <el-tab-pane label="物料周转" name="midTransform"lazy><mptrans  ref="child"></mptrans></el-tab-pane>&ndash;&gt;-->
    <!--        <el-tab-pane label="发货管理" name="send"lazy><send  ref="send"></send></el-tab-pane>-->
    <!--        <el-tab-pane label="订单管理" name="concat"lazy><concat  ref="send"></concat></el-tab-pane>-->
    <!--      </el-tabs>-->
    <!--      &lt;!&ndash;//模块展示&ndash;&gt;-->
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
  // import SalesPlan from '@/components/sale/SalesPlan';
  // import ProductionPlan from '@/components/sale/ProductionPlan';
  // import ProductionBase from '@/components/sale/ProductionManger';
  // import productMidRecieving from '@/components/produce/productMidRecieving'
  // import productSend from '@/components/sale/ProductionSend'
  // import productContact from '@/components/sale/ProductOrder'
  export default {
    data() {
      return {
        activeName: 'plan',
        typeItems: [],
      };
    },
    methods: {
      // handleClick(tab, event) {
      //   console.log(tab, event);
      //   if(this.$refs.plan){
      //     this.$refs.plan.initData();
      //   }
      //   if(this.$refs.planed){
      //     this.$refs.planed.initData();
      //   }
      //   if(this.$refs.planedManager){
      //     this.$refs.planedManager.initData();
      //   }
      //   if(this.$refs.midTransform){
      //     this.$refs.midTransform.initData();
      //   }
      //   if(this.$refs.send){
      //     this.$refs.send.initData();
      //   }
      //   if(this.$refs.concat){
      //     this.$refs.concat.initData();
      //   }
      // }
      detials(e) {
        this.$router.replace({
          path: e.path
        });
      }
    },
    components: {

    },
    computed: {

      stepOpt() {

        let currentCmp = {};
        console.log(this.$store.state.routes);
        this.$store.state.routes.forEach(function (va) {
          if (va.path === '/saleBase') {
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
