<!--发货请求显示模板-->
<template>
  <div>
    <div :class="['trapezoid', {'manag-tip':forManager}]"
         v-if="plandetail.expectLevel&&(plandetail.expectLevel===3||plandetail.expectLevel===2)">
      <div class="part1"
           :style="{borderBottomColor:plandetail.expectLevel===2?'green':'red'}"></div>
      <el-tooltip  >
        <div slot="content">
          {{plandetail.sendDate|simpleFormatTime}}数量:{{plandetail.resendNo}}
        </div>
        <div class="part2"
             :style="{backgroundColor:plandetail.expectLevel===2?'green':'red'}">
          {{plandetail.expectLevel===2?'急需☆':'加急'}}
        </div>
      </el-tooltip>
      <div class="part3"
           :style="{borderBottomColor:plandetail.expectLevel===2?'green':'red'}"></div>
    </div>
  </div>
</template>
<script>
  export  default{
    name:'send-tag',
    props:{
      plandetail:{
        type:Object,
        default:{}
      },
      forManager:{
        type:Boolean,
        default:false,
      }
    },
    data(){
      return{

      }
    },
    //方法
    methods:{

    },

  }

</script>
<style scoped>
  .trapezoid {
    opacity: 0.5;
    width: 100px;
    height: 60px;
    position: absolute;
    left: 461px;
    top: 14px;
    z-index: 22;
    color: white;
    display: inline-flex;
    -moz-transform: rotate(45deg); /*FF浏览器*/
    -webkit-transform: rotate(45deg); /*chrome浏览器*/
    -o-transform: rotate(45deg); /*oprea浏览器*/
    -ms-transform: rotate(45deg); /*IE浏览器*/
  }
  .manag-tip {
    left: 430px;
    top: 10px;
  }
  .part1 {
    height: 0px;
    width: 0px;
    border-top: 25px solid transparent;
    border-right: 25px solid transparent;
    border-bottom: 25px solid red;
    display: inline-block;
    /*-webkit-transform: translate(104px);*/
    transform: translate(74px, -25px);
  }

  .part2 {
    height: 25px;
    width: 51px;
    background-color: red;
    display: inline-block;
  }

  .part3 {
    height: 0px;
    width: 0px;
    /*border-style:solid;*/
    /*border-top-width:25px ;*/
    /*border-left-width:25px ;*/
    /*border-bottom-width:25px ;*/
    /*border-top-color: transparent;*/
    /*border-left-color: transparent;*/
    /*border-bottom-color: green;*/
    border-top: 25px solid transparent;
    border-left: 25px solid transparent;
    border-bottom: 25px solid red;
    display: inline-block;
    transform: translate(-74px, -25px);
  }
</style>

