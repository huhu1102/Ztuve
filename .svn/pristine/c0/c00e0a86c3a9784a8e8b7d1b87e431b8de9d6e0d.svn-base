<template>
  <div>
<!--    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick"  style="margin-top: 10px">-->
<!--      <el-tab-pane label="原料" name="midOutRecord" lazy>-->
<!--        <rowbase  ref="child"></rowbase>-->
<!--      </el-tab-pane>-->
<!--      <el-tab-pane label='半成品'  name="midProduct">-->
<!--        <midbase ref="child"></midbase>-->
<!--      </el-tab-pane>-->

<!--      <el-tab-pane label="成品" name="midInRecord"lazy>-->
<!--        <finish  ref="child"></finish>-->
<!--      </el-tab-pane>-->


<!--    </el-tabs>-->
    <el-container style="display: flex;flex-direction: column; font-size: 14px;">
      <div style="margin-left:20px;line-height: 30px;; height: 30px; text-align: start;padding-left: 20px;border-left: 4px solid red;font-weight: 700;">
        仓库管理
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
  // import MidBase from '@/components/produce/ProductMidBase'
  // import rowbase from '@/components/produce/RowMaterialBase'
  // import finish from '@/components/produce/ProductFinshed'

  export default {
    data() {
      return {
        activeName: 'midProduct',
      };
    },
    methods: {
      detials(e){
        this.$router.replace({
          path: e.path
        });
      }
    },
    components: {
      // 'midbase': MidBase,
      // 'rowbase': rowbase,
      // 'finish': finish,

    },
    computed: {
      stepOpt(){

        let currentCmp={};
        console.log(this.$store.state.routes);
        this.$store.state.routes.forEach(function (va) {
          if(va.path==='/storebase'){
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
