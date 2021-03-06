import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Main from '@/components/main'
import Department from '@/components/emp/Department'
import Emp from '@/components/emp/Emp'
import EmpBase from '@/components/emp/EmployeeBase'
import CarBase from '@/components/dept/CarBase'
import Car from '@/components/dept/Car'
import PlanBase from '@/components/dept/BuyPlanBase'
import Position from "@/components/emp/Position";
import CarRecord from "@/components/dept/CarRecord";
import CarRepair from "@/components/dept/CarRepair";
import ProductBase from "@/components/produce/ProductBase";
import Product from "@/components/produce/Product";
import ProductColor from "@/components/produce/ProductColor";
import CarRequest from "@/components/dept/CarRequest.vue";
import CarReqRecord from "@/components/dept/CarReqRecord";
import ProductStep from "@/components/produce/ProductStep";
import Company from "@/components/emp/Company";
import CompanyType from "@/components/emp/CompanyType";
import CompanyBase from "@/components/emp/CompenyBase";
import CompanyConcat from "@/components/emp/CompanyContact";
import Chat from '@/components/chat/Chat';
import Sysrole from "@/components/sys/Sysrole";
import User from "@/components/sys/User";
import ProductFinshed from "@/components/produce/ProductFinshed";
import ProductMidBase from "@/components/produce/ProductMidBase";
import RowMaterialBase from "@/components/produce/RowMaterialBase";
import SysUnit from "@/components/sys/SysUnit";
import SaleBase from "@/components/sale/SaleBase";
import ProductSpec from "@/components/produce/ProductSpec";
import ProductOrder from "@/components/sale/ProductOrder";
import ProductionPlan from "@/components/sale/ProductionPlan";
import ProductionSend from "@/components/sale/ProductionSend";
import ProductionManger from "@/components/sale/ProductionManger";
import Sales from "@/components/sale/SalesPlan";
import ProductUse from "@/components/produce/ProductUse";
import StoreBase from "@/components/produce/StoreBase";
import ProductMidConfirm from "@/components/produce/ProductMidConfirm";
import ProductMiddle from '@/components/produce/ProductMiddle'
import ProductMidInRecord from '@/components/produce/ProductMidInRecord'
import ProductMidOutRecord from '@/components/produce/ProductMidOutRecord'
import RowMaterialOutReceive from '@/components/produce/RowMaterialOutReceive'
import RowMaterialConfirms from '@/components/produce/RowMaterialConfirms'
import RowMaterial from '@/components/produce/RowMaterial'
import RowMaterialInReceive from '@/components/produce/RowMaterialInReceive'
import notFound from '@/components/404';
import BuyPlan from '@/components/dept/BuyPlan';
import BuyPlanMidProduct from '@/components/dept/BuyPlanMidProduct';
import productMidRecieving from '@/components/produce/productMidRecieving';
import BuyAllProduct from '@/components/dept/BuyAllProduct';
import BuyAllPlanBase from '@/components/dept/BuyAllPlanBase';
import testMenu from '@/components/ZTTemplete/Ztmenu';
import Contact from '@/components/sale/ProductionContact';
// src/components/sale/ProductionContact.vue
Vue.use(Router);
export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      hidden: true
    // },{
    //   path: '/error',
    //   name: 'page404',
    //   hidden: true,
    //   component: notFound
    },{
      path: '/home',
      name: '主页',
      code: 'home',
      component: Home,
      hidden: true,
      meta: {
        requireAuth: true
      },
      children: [{
        path: '/chat',
        name: '消息',
        component: Chat,
        hidden: true,
        meta: {
          keepAlive: false,
          requireAuth: true
        }
      // }, {
      //   path: '/emp',
      //   name: '员工',
      //   component: Emp,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      //
      // }, {
      //   path: '/empbase',
      //   name: '人事管理',
      //   component: EmpBase,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      // }, {
      //   path: '/productBase',
      //   name: '产品管理',
      //   component: ProductBase,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      // }, {
      //   path: '/productcolor',
      //   name: '产品颜色',
      //   component: ProductColor,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      // }, {
      //   path: '/productspec',
      //   name: '产品规格',
      //   component: ProductSpec,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      // }, {
      //   path: '/product',
      //   name: '产品详情',
      //   component: Product,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      // }, {
      //
      //   path: '/sysRole',
      //   name: '角色',
      //   component: Sysrole,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      // }, {
      //   path: '/saleBase',
      //   name: '销售',
      //   component: SaleBase,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      // }, {
      //   path: '/saleBase',
      //   name: '销售',
      //   component: SaleBase,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      // }, {
      //   path: '/sales',
      //   name: '销售',
      //   component: Sales,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      // }, {
      //   path: '/orders',
      //   name: '销售',
      //   component: ProductOrder,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      // }, {
      //   path: '/productionplan',
      //   name: '生产计划',
      //   component: ProductionPlan,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      // }, {
      //   path: '/productionsend',
      //   name: '发货管理',
      //   component: ProductionSend,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      // }, {
      //   path: '/productionManager',
      //   name: '生产进度',
      //   component: ProductionManger,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      // }, {
      //   path: '/users',
      //   name: '用户',
      //   component: User,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      // }, {
      //   path: '/sysUnit',
      //   name: '单位管理',
      //   component: SysUnit,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      // }, {
      //   path: '/department',
      //   name: '部门',
      //   component: Department,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      // }, {
      //   path: '/carRecord',
      //   name: '行车记录',
      //   component: CarRecord,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      // }, {
      //   path: '/carRepair',
      //   name: '车辆维护',
      //   component: CarRepair,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      //
      // }, {
      //   path: '/position',
      //   name: '职位',
      //   component: Position,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      //
      // }, {
      //   path: '/askRequest',
      //   name: '用车申请',
      //   component: CarRequest,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      // }, {
      //   path: '/askBack',
      //   name: '分配车辆',
      //   component: CarReqRecord,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      // }, {
      //   path: '/workStep',
      //   name: '工序步骤',
      //   component: ProductStep,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      // }, {
      //   path: '/productUse',
      //   name: '产品用途',
      //   component: ProductUse,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      // }, {
      //   path: '/company',
      //   name: '客户',
      //   component: Company,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      // }, {
      //   path: '/companyType',
      //   name: '客户流派',
      //   component: CompanyType,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      // }, {
      //   path: '/companyBase',
      //   name: '客户管理',
      //   component: CompanyBase,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      // }, {
      //   path: '/companyConcat',
      //   name: '客户管理',
      //   component: CompanyConcat,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      // }, {
      //   path: '/buyPlan',
      //   name: '采购计划',
      //   component: BuyPlan,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      // }, {
      //   path: '/buymidPlan',
      //   name: '采购计划',
      //   component: BuyPlanMidProduct,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      // }, {
      //   path: '/planBase',
      //   name: '计划管理',
      //   component: PlanBase,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      // }, {
      //   path: '/buyallproduct',
      //   name: '生产计划',
      //   component: BuyAllProduct,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      // }, {
      //   path: '/buyallplanBase',
      //   name: '采购计划',
      //   component: BuyAllPlanBase,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      // }, {
      //   path: '/planmidreceive',
      //   name: '物料周转',
      //   component: productMidRecieving,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      // }, {
      //   path: '/productsFinished',
      //   name: '成品库存',
      //   component: ProductFinshed,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      // }, {
      //   path: '/materialbase',
      //   name: '仓库',
      //   component: RowMaterialBase,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      //
      // }, {
      //   path: '/rowmaterial',
      //   name: '原料库',
      //   component: RowMaterial,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      // }, {
      //   path: '/rowmaterialin',
      //   name: '入库记录',
      //   component: RowMaterialInReceive,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      // }, {
      //   path: '/materialout',
      //   name: '出库记录',
      //   component: RowMaterialOutReceive,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      // }, {
      //   path: '/materialoutconfirm',
      //   name: '原料采购确认',
      //   component: RowMaterialConfirms,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      // }, {
      //   path: '/storebase',
      //   name: '仓库',
      //   component: StoreBase,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      // }, {
      //   path: '/productmidBase',
      //   name: '半成品库',
      //   component: ProductMidBase,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      // }, {
      //   path: '/productconfir',
      //   name: '采购确认',
      //   component: ProductMidConfirm,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      // }, {
      //   path: '/productmid',
      //   name: '半成品库',
      //   component: ProductMiddle,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      // }, {
      //   path: '/productmidinrecord',
      //   name: '入库记录',
      //   component: ProductMidInRecord,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      // }, {
      //   path: '/productmidoutrecod',
      //   name: '出库记录',
      //   component: ProductMidOutRecord,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      // }, {
      //   path: '/carBase',
      //   name: '车辆管理',
      //   component: CarBase,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      // }, {
      //   path: '/testmenu',
      //   name: '测试',
      //   component: testMenu,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      //   }, {
      //   path: '/contact',
      //   name: '合同管理',
      //   component: Contact,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      // }, {
      //   path: '/car',
      //   name: '车辆管理',
      //   component: Car,
      //   hidden: true,
      //   meta: {
      //     keepAlive: false,
      //     requireAuth: true
      //   }
      }]
   // }, {
   //    path: '**',
   //    redirect: '/error',
    }]

})



