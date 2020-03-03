<template>
  <div>
<!--    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick"  style="margin-top: 10px">-->
<!--      <el-tab-pane label='半成品库'  name="midProduct">-->
<!--        <product ref="child"></product>-->
<!--      </el-tab-pane>-->
<!--      <el-tab-pane label="出库记录" name="midOutRecord" lazy>-->
<!--        <mpoutrecord  ref="child"></mpoutrecord>-->
<!--      </el-tab-pane>-->
<!--      <el-tab-pane label="入库记录" name="midInRecord"lazy>-->
<!--        <productinrecord  ref="child"></productinrecord>-->
<!--      </el-tab-pane>-->
<!--      <el-tab-pane label="采购确认" name="midConfirm"lazy>-->
<!--        <mpconfirm  ref="child"></mpconfirm>-->
<!--      </el-tab-pane>-->

<!--    </el-tabs>-->

    <el-container style="display: flex;flex-direction: column; font-size: 14px;">
      <div style="margin-left:20px;line-height: 30px;; height: 30px; text-align: start;padding-left: 20px;border-left: 4px solid red;font-weight: 700;">
        仓库管理
      </div>
      <el-main class="product-base">
        <div class="product-item"  v-for="item in  stepOpt" :key="item.id" @click="seedetials(item)">
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
  // import MidProduct from '@/components/produce/ProductMiddle'
  // import ProductMidInRecord from '@/components/produce/ProductMidInRecord'
  // import ProductMidOutRecord from '@/components/produce/ProductMidOutRecord'
  // import ProductMidConfirm from '@/components/produce/ProductMidConfirm'
  export default {
    data() {
      return {
        // activeName: 'midProduct',
      };
    },
    methods: {
      seedetials(e){
        this.$router.replace({
          path: e.path
        });
      }

    },
    components: {
      // 'product': MidProduct,
      // 'productinrecord': ProductMidInRecord,
      // 'mpoutrecord': ProductMidOutRecord,
      //
      // 'mpconfirm': ProductMidConfirm,
    },
    computed: {
      stepOpt() {
        let currentCmp = {};
        console.log(this.$store.state.routes);
        this.$store.state.routes.forEach(function (va) {
          if (va.path === '/productmidBase') {
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
    },
  };

</script>
