<template>
  <div class="dialog">
    <!--外层的遮罩 点击事件用来关闭弹窗，isShow控制弹窗显示 隐藏的props-->
    <div class="dialog-cover back"  v-if="isShow"  @click="closeMyself"></div>
    <!-- transition 这里可以加一些简单的动画效果 -->
    <transition name="drop">
      <!--style 通过props 控制内容的样式  -->
      <div class="dialog-content" style="margin: 0 auto" :style="{ top:topDistance+'px',width:widNum+'px',left:leftSite+'px',height:heightNum+'px'}"  v-if="isShow">
        <div style="width: 100%;text-align:right;">
          <slot name="header">表头</slot>
        </div>
<!--        <div class="dialog_head back">-->
<!--&lt;!&ndash;          &lt;!&ndash;弹窗头部 title&ndash;&gt;&ndash;&gt;-->
<!--          <slot name="header">提示信息</slot>-->
<!--        </div>-->
<!--        <div class="ztDialogClass" :style="{paddingTop:pdt+'px',paddingBottom:pdb+'px'}">-->
          <!--弹窗的内容-->
          <slot name="main"></slot>
<!--        </div>-->
        <!--弹窗关闭按钮-->
        <div  class="foot_close" @click="closeMyself">
          <div class="close_img back"></div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  export default {
    name: 'ZtDialog',
    props: {
      ztDialogClass:{
        type:String,
        default:'',
      },
      isShow: {
        //弹窗组件是否显示 默认不显示
        type: Boolean,
        default: false,
        required:true, //必须
      },
      //下面这些属性会绑定到div上面 详情参照上面的html结构
      // 如： :style="{top:topDistance+'%',width:widNum+'%'}"
      widNum:{
        //内容宽度
        type: String,
        default:'86.5'
      },
      heightNum:{
        type:String,
        default:'300'
      },
      leftSite:{
        // 左定位
        type: String,
        default:'0'
      },
      topDistance: {
        //top上边距
        type: String,
        default:'35'
      },
      pdt:{
        //上padding
        type: String,
        default:"0"
      },
      pdb:{
        //下padding
        type: String,
        default:'0'
      }
    },
    methods:{
      closeMyself() {
        this.$emit("on-close");
        //如果需要传参的话，可以在"on-close"后面再加参数，然后在父组件的函数里接收就可以了。
      }

    }
  }
</script>

<style lang="scss" scoped>
 /*最外层 设置position定位 */
  .dialog {
    position: relative;
    color: #2e2c2d;
    font-size: 16px;
  }
  /*遮罩 设置背景层，z-index值要足够大确保能覆盖，高度 宽度设置满 做到全屏遮罩*/
  .dialog-cover {
    background: rgba(0,0,0, 0.8);
    position: fixed;
    z-index: 200;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  /* 内容层 z-index要比遮罩大，否则会被遮盖，*/
  .dialog-content{
    position: fixed;
    margin: 0 auto;
    /*移动端使用felx布局 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 300;
    background-color: #ffffff;
    .dialog_main {
      /*// 主体内容样式设置*/
      height: 100%;
    }
  }


</style>


