<template>
  <div>
     <div style="padding: 0px;display:flex;justify-content:space-between;align-items: center">

        <div style="display: inline">
          <el-input
            placeholder="通过车牌搜索,记得回车哦..."
            clearable
            @change="keywordsChange"
            style="width: 300px;margin: 0px;padding: 0px;"
            size="mini"
            :disabled="advanceSearchViewVisible"
            @keyup.enter.native="searchEmp"
            prefix-icon="el-icon-search"
            v-model="keywords">
          </el-input>
          <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search" @click="searchEmp">搜索
    
          </el-button>
        </div>
        <div style="margin-left: 5px;margin-right: 20px;display: inline">
    
          <el-button  type="primary"  @click="addAndFlushEmp" size="mini" icon="el-icon-plus">添加</el-button>
        </div>
     </div>

    <el-dialog v-dialogDrag  :title="dialogTitle"
                style="padding: 0px;"
                :close-on-click-modal="false"
                :visible.sync="dialogFormVisible"
                @close="cancelOpt"
                width="500px">
      <div style="width: 100% "v-if="dialogFormVisible">
        <el-form :model="car" :rules="rules" ref="addEmpForm"  size="small" label-width="90px"  >
          <el-form-item label="车牌:" prop="plateNumber">
            <el-input prefix-icon="el-icon-edit" v-model="car.plateNumber" size="mini" style="width: 200px"
                      placeholder="请输入车牌号。。"></el-input>
          </el-form-item>
<!--          <el-form-item label="车辆状态:" prop="carStatus">-->
<!--            <el-select v-model="car.carStatus" size="mini" style="width: 200px" placeholder="请选择状态">-->
<!--              <el-option label="使用中" value="USED"></el-option>-->
<!--              <el-option label="保养中" value="REPAIR"></el-option>-->
<!--              <el-option label="空闲" value="FREE"></el-option>-->
<!--              <el-option label="报废" value="USELESS"></el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
          <el-form-item label="生产厂家:" prop="manufacturer">
            <el-input prefix-icon="el-icon-edit" v-model="car.manufacturer" size="mini" style="width: 200px"
                      placeholder="生产厂家"></el-input>
          </el-form-item>
<!--          <el-form-item label="维护公里数:" prop="maintenanceMile">-->
<!--            <el-input prefix-icon="el-icon-edit" v-model="car.maintenanceMile" size="mini" style="width: 200px"-->
<!--                      placeholder="保养里数"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="最大乘载:" prop="carryingNumber">-->
<!--            <el-input prefix-icon="el-icon-edit" v-model="car.carryingNumber" size="mini" style="width: 200px"-->
<!--                      placeholder="最大乘载人数"></el-input>-->
<!--          </el-form-item>-->
          <el-form-item label="车辆型号:" prop="vehicleType">
            <el-input prefix-icon="el-icon-edit" v-model="car.vehicleType" size="mini" style="width: 200px"
                      placeholder="车辆型号"></el-input>
          </el-form-item>

          <el-form-item label="购买日期:" prop="buyedDate">
            <el-date-picker
              v-model="car.buyedDate"
              size="mini"
              value-format="yyyy-MM-dd"
              style="width: 200px"
              type="date"
              placeholder="购买日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="add('addEmpForm')">确 定</el-button>
      </div>
    </el-dialog>

    <el-table  :data="cars" border style="width: 100%">
      <el-table-column
        type="selection"
        align="left"
        v-loading="tableLoading"
        width="30">
      </el-table-column>
      <el-table-column
        prop="plateNumber"
        align="left"
        fixed
        label="车牌"
        width="120">
      </el-table-column>
      <el-table-column
        prop="carStatus"
        width="120"
        align="left"
        :formatter="formatStatus"
        label="状态">
      </el-table-column>
      <el-table-column
        width="100"
        align="left"
        label="购车时间">
        <template slot-scope="scope">{{ scope.row.buyedDate | formatDate}}</template>
      </el-table-column>
      <el-table-column
        prop="manufacturer"
        width="220"
        align="left"
        label="生产厂家">
      </el-table-column>
      <el-table-column
        prop="vehicleType"
        width="160"
        align="left"
        label="车型号">
      </el-table-column>
      <el-table-column
        align="left"
        label="操作"
        width="195">
        <template slot-scope="scope">
          <el-button type="danger"  @click="showEditEmpView(scope.$index,scope.row)" style="padding: 3px 4px 3px 4px;margin: 2px"
                     size="mini">编辑
          </el-button>

          <el-button type="danger" style="padding: 3px 4px 3px 4px;margin: 2px" size="mini"
                     @click="deleteData(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="display: flex;justify-content: flex-end;margin: 2px">
      <!--          <el-button type="danger" size="mini" v-if="emps.length>0" :disabled="multipleSelection.length==0"-->
      <!--                     @click="deleteManyEmps">批量删除-->
      <!--          </el-button>-->
      <el-pagination
        background
        :page-size="10"
        :pager-count="11"
        :current-page="currentPage"
        @current-change="currentChange"
        layout="prev, pager, next"
        :total="totalCount">
      </el-pagination>
    </div>
  </div>

</template>
<script>
  export default{
    data() {


      return {
        keywords: '',
        tableLoading: false,
        advanceSearchViewVisible: false,
        rules: {
          plateNumber: [{required: true, message: '必填:车牌', trigger: 'blur'}],
          buyedDate: [{required: true, message: '必填:购车时间', trigger: 'blur'}],
          manufacturer: [{required: true, message: '必选:生产厂家', trigger: 'blur'}],
          vehicleType: [{required: true, message: '必填:车辆型号', trigger: 'blur'}],
        },
        cars:[],
        dialogTitle: '',
        currentPage:1,
        totalCount: -1,
        car: {
          plateNumber: '',
          buyedDate: '',
          carryingNumber: '',
          manufacturer:'',
          maintenanceMile:'',
          vehicleType:'',
          carStatus:''
        },
        dialogFormVisible: false,
        currentRowData:{},//当前选中行数据
        currentIndex:'',//当前选中行号
        //   <el-menu style="background: #ececec;width: 180px;" unique-opened router>
        // <template v-for="(item,index) in menuitems" v-if="!item.hidden">
        //   <el-submenu :index="index+''" v-if="!item.leaf">
        //   <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
        // <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
        // </el-submenu>
        // <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
        // </template>
        // </el-menu>
      }
    },
    mounted: function () {
      this.initData();
    },

    methods: {
      formatStatus:function(row, column){
        return row.carStatus == "USED" ? '使用中' :row.carStatus == "REPAIR"? '修理中' : row.carStatus == "FREE"?'空闲':'报废';
      },

      initData(){
        var _this = this;
        _this.loadData();
      },
      keywordsChange(val){
        if (val == '') {
          this.loadData();
        }
      },
      currentChange(currentChange){
        this.currentPage = currentChange;
        console.log(this.currentPage);
        this.loadData();
      },
      addAndFlushEmp(){
        this.dialogTitle = "添加";
        this.emptyData();
        this.dialogFormVisible = true;

        // var _this = this;
        // this.getRequest("/employee/basic/maxWorkID").then(resp=> {
        //   if (resp && resp.status == 200) {
        //     _this.emp.workID = resp.data;
        //   }
        // })
      },
      searchEmp(){
        this.loadEmps();
      },
      showEditEmpView(index,row){
        console.log(row)
        this.dialogTitle = "编辑信息";
        this.car = row;
        this.currentRowData=JSON.parse(JSON.stringify(row));
        this.currentIndex=index;
        this.car.buyedDate = this.formatDate(row.buyedDate);
        delete this.car.noteMaker;
        this.dialogFormVisible = true;
      },
      add(addEmpForm){
        this.dialogFormVisible=true;
        var _this = this;
        this.$refs[addEmpForm].validate((valid) => {
          if (valid) {
            // this.car.buyedDate=new Date(this.car.buyedDate);
            var  flag=this.validateCarNo();
            if (this.car.id) {
              //更新
              this.tableLoading = true;
              console.log(this.car);
              // this.car.createDate=new Date(this.car.createDate);
              this.postRequest("/vehicle/addupvf", this.car).then(resp=> {
                _this.tableLoading = false;
                if (resp && resp.status == 200) {
                  // var data = resp.data;
                  _this.dialogFormVisible = false;
                  _this.loadData();
                  _this.emptyData();

                }
              })
            } else {
              //添加
              this.tableLoading = true;
              //车牌
              console.log(_this.car);
              this.postRequest("/vehicle/addupvf", this.car).then(resp=> {
                _this.tableLoading = false;
                if (resp && resp.status == 200) {
                  var data = resp.data;
                  _this.dialogFormVisible = false;
                  _this.loadData();
                  _this.emptyData();
                }
              })
            }
          } else {
            return false;
          }
        });
      },
      validateCarNo(){
        var flag=true;
       

       return flag;
      },
      cancelOpt(){
        this.dialogFormVisible = false;
        this.loadData();
        // var index=this.currentIndex;
        // this.cars[index] =this.currentRowData;
        console.log('o(*￣︶￣*)o')

      },
      deleteData(row){
        this.$confirm('此操作将删除[' + row.plateNumber + '], 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.doDelete(row.id);
        }).catch(() => {
        });
      },
      doDelete(ids){
        this.tableLoading = true;
        var _this = this;
        this.getRequest("/vehicle/deletvf?id=" + ids).then(resp=> {
          _this.tableLoading = false;
          if (resp && resp.status == 200) {
            var data = resp.data;
            _this.loadData();
          }
        })
      },
      loadData(){
        var _this = this;
        this.tableLoading = true;
        this.getRequest("/vehicle/findbypage?page=" + this.currentPage + "&size=10&queryName="+this.keywords).then(resp=> {
          this.tableLoading = false;
          if (resp && resp.status == 200) {
            var data = resp.data.data;
            _this.cars = data;
            _this.totalCount=resp.data.total;
            _this.emptyData();
          }
        })
      },
      handleCommand(cmd){
        var _this = this;
        if (cmd == 'logout') {
          this.$confirm('注销登录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // _this.getRequest("/logout");
            // _this.$store.commit('logout');
            _this.$router.replace({path: '/'});
          }).catch(() => {
            _this.$message({
              type: 'info',
              message: '取消'
            });
          });
        }
      },
      emptyData(){
        this.car = {
          plateNumber: '',
          carStatus: '',
          buyedDate: '',
          manufacturer:'',
          maintenanceMile:'',
          carryingNumber:'',
          vehicleType:''
        }
      }
    },
    computed: {
      // routes(){
      //   return this.$store.state.routes
      // }
    }
  }
</script>
<style>

  .el-submenu .el-menu-item {
    width: 180px;
    min-width: 175px;
  }
</style>
