<template>
  <div style="width: 100%;height: 20000px;">

    <el-container class="home-container">

      <el-aside :style="{width:asideWidth }" class="home-aside">
        <div class="home-head">
          <div class="head-up" v-show="!isCollapse">
             <span class="el-dropdown-link home_userinfo" style="display: flex;align-items: center">
              <i><img v-if="user.userface!==''" :src="user.userface"
                      style="width: 40px;height: 40px;margin-right: 5px;margin-left: 5px;border-radius: 40px"/></i>
               {{user.username}}
            </span>
          </div>
          <div class="head-up" v-show="isCollapse">
            <el-dropdown @command="homeCommand" class="el-dropdown-link home_userinfo"
                         style="display: flex;align-items: center">

              <i><img v-if="user.userface!==''" :src="user.userface"
                      style="width: 40px;height: 40px;margin-right: 5px;margin-left: 5px;border-radius: 40px"/></i>
              <!--              {{user.username}}-->
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="spec" class="fa fa-home"></el-dropdown-item>
                <el-dropdown-item command="secret" class="fa fa-lock"></el-dropdown-item>
                <el-dropdown-item command="out" class="fa fa-power-off"></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

          </div>
          <div class="head-down" v-show="!isCollapse">

            <div>
              <el-tooltip class="item" effect="light" content="返回首页" placement="top-start">
                <i class="fa fa-home" @click="goHome" style="cursor: pointer"></i>
              </el-tooltip>
            </div>
            <div>
              <div>
                <el-tooltip class="item" effect="light" content="修改密码" placement="top-start">
                  <i class="fa fa-lock" @click="goPassword" style="cursor: pointer"></i>
                </el-tooltip>
              </div>
            </div>
            <div>
              <div>
                <el-tooltip class="item" effect="light" content="注销" placement="top-start">
                  <i class="fa fa-power-off" @click="logout" style="cursor: pointer"></i>
                </el-tooltip>
              </div>
            </div>
          </div>
        </div>
        <div style="display: flex;justify-content: flex-start;width: 200px;text-align: left;">
          <el-menu background-color="#112943" text-color="#ffffff" class="el-menu-home" :collapse="isCollapse"
                   unique-opened router>
            <template v-for="(item,index) in menuitems" v-if="!item.hidden">
              <!--//menuitems-->
              <el-submenu :index="index+''" v-if="!item.leaf">
                <template slot="title"><i :class="item.iconCls"></i><span slot="title">{{item.name}}</span></template>
                <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path"
                              v-if="!child.hidden">{{child.name}}
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i
                :class="item.iconCls"></i><span slot="title"> {{item.children[0].name}}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </div>
      </el-aside>
      <el-container>
        <div style="height: 100%;width: 100%;">
          <el-backtop></el-backtop>
          <div class="home-header">
            <div>
              <!--              <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">-->
              <!--                <el-radio-button :label="false">展开</el-radio-button>-->
              <!--                <el-radio-button :label="true">收起</el-radio-button>-->
              <!--              </el-radio-group>-->
              <i class="fa fa-list" @click="changeCollapse"></i>
            </div>

            <div style="display: flex;align-items: center;margin-right: 7px">
              <div style="display: inline;margin-right: 20px;">
                <el-input placeholder="搜索菜单,按下回车搜索..." clearable @change="keywordsChange"
                          style="width: 300px;margin: 0;padding: 0;" size="mini"
                          @keyup.enter.native="" prefix-icon="el-icon-search" v-model="keywords">
                </el-input>

              </div>
              <!--          <el-breadcrumb separator-class="el-icon-arrow-right">-->
              <!--            <el-breadcrumb-item :to="{path:'/home'}">首页-->
              <!--            </el-breadcrumb-item>-->
              <!--&lt;!&ndash;            <el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>&ndash;&gt;-->
              <!--          </el-breadcrumb>-->
              <el-tooltip class="item" effect="light" content="通知" placement="top-start">
                <el-badge :is-dot="this.$store.state.nfDot" style="margin-right: 30px;">
                  <i class="fa fa-bell-o" @click="goChat" style="cursor: pointer"></i>
                </el-badge>
              </el-tooltip>

            </div>
          </div>
          <el-main class="home-main">
            <div style="display: flex;flex-direction: row;justify-content: space-between;">
              <div class="main-header" v-show="!hasChild">
<!--                <div style="height: 400px;"  v-for="(eye,index) in routes[0]" :key="eye" >-->
                <div class="main-header"  v-show="naIndex===0">
                  <el-button size="mini" :icon="item.iconCls" v-for=" (item,findex)  in routes[0]" :key="item.id"
                             :type="nowcurrentclick===findex?'success':'primary'"
                             @click="detailShowf(item,findex)" v-if="!item.leaf">
                    {{item.name}}
                  </el-button>
                </div>
                <div class="main-header"v-show="naIndex===1">
                  <el-button size="mini" :icon="item.iconCls" v-for=" (item,sindex)  in childlist" :key="item.id"
                             :type="nowcurrentclicks===sindex?'success':'primary'"
                             @click="detailShows(item,sindex)"v-if="!item.leaf">
                    {{item.name}}
                  </el-button>
                </div>
                <div class="main-header" v-show="naIndex===2">
                  <el-button size="mini" :icon="item.iconCls" v-for=" (item,tindex)  in childlist1" :key="item.id"
                             :type="nowcurrentclickt===tindex?'success':'primary'"
                             @click="detailShowt(item,tindex)"v-if="!item.leaf">
                    {{item.name}}
                  </el-button>
                </div>

              </div>
              <el-button type="success" size="mini" style=" margin-right: 20px" @click="toupers" icon="el-icon-top">返回
              </el-button>
            </div>
            <keep-alive>
              <router-view class="home-router-view" v-if="this.$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view class="home-router-view" v-if="!this.$route.meta.keepAlive"></router-view>
            <keep-alive v-if="this.$router.currentRoute.path==='/home'">
              <mainhome></mainhome>
            </keep-alive>
          </el-main>
        </div>

      </el-container>
    </el-container>

  </div>
</template>

<script>
  import mainhome from '@/components/main';

  export default {
    data() {
      return {
        naIndex:0,
        asideWidth: '200px',
        isCollapse: false,
        hasChild: false,
        childlist: [],
        childlist1: [],
        realList: [],
        keywords: '',
        tableLoading: false,
        advanceSearchViewVisible: false,
        rules: {
          name: [{
            required: true,
            message: '必填:姓名',
            trigger: 'blur'
          }],
          phone: [{
            required: true,
            message: '必填:电话号码',
            trigger: 'blur'
          }],
          gender: [{
            required: true,
            message: '必选:性别',
            trigger: 'blur'
          }],
          email: [{
            required: true,
            message: '必填:电子邮箱',
            trigger: 'blur'
          }, {
            type: 'email',
            message: '邮箱格式不正确',
            trigger: 'blur'
          }],
          beginDate: [{
            required: true,
            message: '必填:入职日期',
            trigger: 'blur'
          }],
        },
        totalCount: -1,
        employee: {
          name: '',
          phone: '',
          address: '',
          email: '',
          birthday: '',
          entryDate: '',
          gender: ''
        },
        isDot: false,
        dialogTableVisible: false,
        dialogFormVisible: false,
        optos: [{
          icon: "el-icon-truck",
          path: '/car',
          name: '车辆管理'
        }, {
          icon: "el-icon-s-cooperation",
          path: '/buyPlan',
          name: '采购计划'
        }, {
          icon: "el-icon-star-off",
          path: '/sale',
          name: '销售计划'
        }, {
          icon: "el-icon-goods",
          path: '/productsFinished',
          name: '成品库'
        }, {
          icon: "el-icon-s-finance",
          path: '/productMid',
          name: '半成品库'
        }, {
          path: '/material',
          name: '原材料库',
          icon: "el-icon-s-management",
        }],
        menuitems: [{
          iconCls: 'el-icon-menu',
          index: '/home',
          title: '首页',
          name: '员工管理',
          leaf: false,
          hidden: false,
          children: [{
            path: '/emp',
            name: '员工'
          }

          ]

        }, {
          iconCls: 'el-icon-menu',
          index: '/home',
          title: '客户',
          name: '客户管理',
          leaf: false,
          hidden: false,
          children: [{
            path: '/company',
            name: '客户'
          }]

        }, {
          iconCls: 'el-icon-menu',
          index: '/home',
          title: '产品',
          name: '产品管理',
          leaf: false,
          hidden: false,
          children: [{
            path: '/product',
            name: '产品'
          }]
        }, {
          iconCls: 'el-icon-menu',
          index: '/home',
          title: '系统管理',
          name: '系统管理',
          leaf: false,
          hidden: false,
          children: [{
            path: '/sysRole',
            name: '角色管理'
          },
            {
              path: '/users',
              name: '用户管理'
            },
            {
              path: '/sysUnit',
              name: '单位管理'
            },
          ]
        }],
        activeName: 'first',
        nowcurrentclick: 0,
        nowcurrentclicks:0,
        nowcurrentclickt:0,
      }
    },
    mounted: function () {
      this.loadNF();

    },
    components: {
      'mainhome': mainhome
    },
    methods: {
      changeCollapse() {
        this.isCollapse = !this.isCollapse;
        if (this.isCollapse) {
          this.asideWidth = '80px';
        } else {
          this.asideWidth = '200px';
        }
      },
      homeCommand(cmd) {
        console.log(cmd);
        switch (cmd) {
          case 'home':
            this.goHome();
            break;
          case 'out':
            this.logout();
            break;
          case 'secret':
            this.goPassword();
            break;
          default:
            break;
        }
      },
      keywordsChange(val) {
        if (val === '') {
        }
      },
      loadNF() {
        var _this = this;
        console.log("登入了" + this.$router);
        this.getRequest("/chat/sysmsgs").then(resp => {
          let isDot = false;
          resp.data.data.forEach(msg => {
            if (msg.msgState === 1) {
              isDot = true;
            }
          });
          _this.$store.commit('toggleNFDot', isDot);
        })
      },
      goHome() {
        this.backToUrl('/home');
      },
      detailShowf(e, index) {
        console.log(index);//e
        console.log(e);
         this.childlist = e.children || [];
         this.filtArr(this.childlist);
        this.nowcurrentclick=index;
        this.naIndex=1;
        this.detailShows(this.childlist[0],0)
      },
      detailShows(e, index){
        let that=this;
        let child=e.children||[];
        this.nowcurrentclicks=index;
        console.log(index+'home');
        if(child&&child.length===0){
          that.backToUrl(e.path);
        }else{
          if(child[0]&&child[0].isbtn!==4){
            that.backToUrl(e.path);
          }else{
            this.childlist1 =child;
            // this.filtArr(this.childlist1)
            this.naIndex=2;
            this.detailShowt(this.childlist1[0],0)
          }
        }
      },
      /**筛选出要显示的button；
       * */
      filtArr(arr){
        if(arr.length){
          for (let n=arr.length-1; n>=0; n--) {
                 console.log(arr[n].isbtn===1);
                if(arr[n].isbtn===1){
                  arr.splice(n,1);
                }
          }
        }

      },
      detailShowt(e, index){
        this.backToUrl(e.path);
        this.nowcurrentclickt=index;
      },
      //页面跳转
      backToUrl(url){
        this.$router.push({
          path: url
        });
      },
      toupers() {
          if(this.naIndex===1){
            this.naIndex=0
          }else if(this.naIndex===2){
            this.naIndex=1
          }else{
            this.naIndex=0
          }
      },
      handleClick() {

      },
      /**
       * 修改密码
       */
      goPassword() {

      },
      logout() {
        let _this = this;
        this.$confirm('注销登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.getRequest("/logout");
          _this.$store.commit('logout');
          _this.backToUrl('/')

        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '取消'
          });
        });

      },
      goChat() {
        this.backToUrl("/chat")
      },
      emptyEmpData() {
        this.employee = {
          name: '',
          phone: '',
          address: '',
          email: '',
          birthday: '',
          entryDate: '',
          gender: ''
        }
      }
    },
    beforeRouteEnter(to, from, next) {
      console.log('beforeRouteEnter');
      next((vm) => {
        vm.realList = to.meta.routeList;
        console.log(vm.realList);
      });
    },
    beforeRouteLeave(to, from, next) {
      // 导航离开该组件的对应路由时调用
      // 可以访问组件实例 `this`
      next((vm) => {
        vm.realList = [];
      });
    },
    // watch:{
    //  $route:function(newV,oldV) {
    //   this.realList =newV.meta.routeList;
    //  }
    // }
    computed: {
      user() {
        return this.$store.state.user;
      },
      routes() {
        let arr = [];

        if (this.$store.state.routes) {
          console.log(`hellow home~` );
          let f=[],s=[],thir=[];
          this.$store.state.routes.forEach(function (value) {
            let state=value.isbtn+'';
            // if(!value.children.length){
            //   value['leaf']=true
            // }else{
            //   value['leaf']=false
            // }
            switch (state) {
              case '2':f.push(value);break;
              case '3':s.push(value);break;
              case '4':thir.push(value);break;
              default:break;
            }

          })
          arr.push(f);
          arr.push(s);
          arr.push(thir);
        }
        return arr;

      }

    }
  }

</script>
<style>
  .home-container {
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #E5EFF1;
  }

  .el-menu-home:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    border: none;

  }

  .el-menu-home {
    border: none;
  }

  .home-header {
    background-color: #fff;
    color: #333;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: content-box;
    padding: 5px;
    margin-bottom: 10px;
    height: 40px;
  }

  .home-aside {
    background: #112943;
    color: white;
    height: 2000px;
  }

  .home-main {
    background-color: #E5EFF1;
    color: #000;
    text-align: center;
    margin: 0px;
    padding: 0px;;
  }

  .home_title {
    color: #82848a;
    font-size: 22px;
    display: inline;
    margin-left: 8px;
  }

  .home_userinfo {
    color: #fff;
    cursor: pointer;
  }

  .home_userinfoContainer {
    display: inline;
    margin-right: 20px;
  }

  .el-submenu .el-menu-item {
    width: 180px;
    min-width: 175px;
  }

  .home-head {
    width: 200px;
    height: auto;
    display: flex;
    flex-direction: column;

  }

  .head-up {
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: row;
    justify-items: center;
  }

  .head-down {
    padding: 6px 20px 20px 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .item-detail {
    /*line-height: 40px;*/
    /*font-size: 30px;*/
    /*color: yellow;*/
    /*line-height: 32px;*/
    font-size: 16px;
  }

  .item-font {
    display: block;
    width: 100%;
    text-align: left;
    margin-left: 12px;
    /*font-size: 12px;*/
  }

  .header-item {
    /*height: 80px;*/
    /*width: 80px;*/
    /*padding: 10px 10px 0 10px;*/
    /*border:1px solid red;*/
    /*display: inline;*/
    /*flex-direction: column;*/
  }

  /*.item-detail {*/
  /*height: 40px;*/
  /*width: 40px;*/
  /*margin: 10px 10px 0 10px;*/
  /*border-radius: 50%;*/
  /*background-color: #20a0ff;*/
  /*}*/

  .main-header {
    /*border: 1px solid #696969;*/
    height: 32px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin: 0 20px;
    background-color: #E5EFF1;
  }

  body {
    background-color: #E5EFF1;
    font-family: 'pingfang SC', 'helvetica neue', arial, 'hiragino sans gb', 'microsoft yahei ui', 'microsoft yahei', simsun, sans-serif;
  }

  .home-router-view {
    margin: 10px 20px;
    background-color: white;
  }

</style>
