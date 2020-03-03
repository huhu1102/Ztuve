<template>
  <div>
    <el-container v-if="tap===2"  style="display: flex;flex-direction: column; font-size: 14px;">
       <div style="margin-left:20px;line-height: 30px;; height: 30px; text-align: start;padding-left: 20px;border-left: 4px solid red;font-weight: 700;">
         客户管理  <span style="cursor: pointer;font-weight: 400;color: blueviolet;margin-left: 20px;" @click="andCode">添加客户流派</span>
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
    <el-container v-else class="product-model-base">
      <div class="product-model-item" v-for="item in depItems" :key="item.id" @click="used(item)">
        <span class="fa fa-bomb"></span>
        <span>{{item.name}}</span>
        <span>（{{item.num}}）</span>
      </div>
    </el-container>

  </div>
</template>
<script>
  import Company from '@/components/emp/Company'
  import CompanyType from '@/components/emp/CompanyType'
  export default {
    data() {
      return {
        dialogFormVisible:false,
        activeName: 'product',
        typelist:[],
        tap:1,
      };
    },
    methods: {
      detials(e){
        this.$router.replace({
          path: e.path
        });
      },
      andCode(){
        this.dialogFormVisible=true
      },
      //获取
      getBaseData(){
        let _this = this;
        _this.getRequest("/client/baseData").then(resp => {
          if (resp && resp.status === 200 && resp.data.success) {
            let data = resp.data;
            // _this.nations = data.nations;
            let  typeinfo=data.root.typelist || [];
            let types=[];
            typeinfo.forEach(function (v) {
              dets.push({
                id:v[0],
                num:v[1],
                name:v[2]
              })
            })
            _this.typelist = types;

          }
        })

      }
    },
    mounted: function () {
      this.getBaseData();
      // this.formatGender(row);
    },
    components: {
      'compny': Company,
      'type': CompanyType,
    },
    computed: {
      stepOpt(){
        let currentCmp={};
        console.log(this.$store.state.routes);
        this.$store.state.routes.forEach(function (va) {
            if(va.path==='/companyBase'){
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
