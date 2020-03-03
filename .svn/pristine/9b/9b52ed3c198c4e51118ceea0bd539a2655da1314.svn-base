<template>
  <div>
    <div  style="padding: 0px;display:flex;justify-content:space-between;align-items: center"> 

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
          <el-button type="primary" @click="addAndFlushEmp" size="mini" icon="el-icon-plus">添加</el-button>
        </div>
    </div>
    <el-dialog  v-dialogDrag :title="dialogTitle"
               style="padding: 0px;"
               :close-on-click-modal="false"
               :visible.sync="dialogFormVisible"
               @close="cancelOpt"
               width="500px">
      <div style="width: 100% "v-if="dialogFormVisible">
        <el-form :model="carReRepair" :rules="rules" ref="addEmpForm" size="small" label-width="90px">
          <el-form-item label="车辆:" prop="carNo">
            <el-popover
              v-model="showOrHidePop"
              placement="right"
              title="请选择车辆"
              trigger="hover">
              <el-tree :data="cars" :default-expand-all="true" :props="defaultProps" :expand-on-click-node="false"
                       @node-click="handleNodeClick"></el-tree>
              <div slot="reference"
                   style="width: 200px;height: 26px;display: inline-flex;font-size:13px;border: 1px;border-radius: 5px;border-style: solid;padding-left: 13px;box-sizing:border-box;border-color: #dcdfe6;cursor: pointer"
                   @click.left="showDepTree" v-bind:style="{color: depTextColor}">{{carReRepair.carNo}}
              </div>
            </el-popover>
          </el-form-item>
          <el-form-item label="出行时间:" prop="preStartDate">
            <el-date-picker
              v-model="carReRepair.preStartDate"
              size="mini"
              value-format="yyyy-MM-dd"
              style="width: 200px"
              type="date"
             
              placeholder="出行时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="返回时间:" prop="preEndDate">
            <el-date-picker
              v-model="carReRepair.preEndDate"
              size="mini"
              value-format="yyyy-MM-dd"
              style="width: 200px"
              type="date"
            
              placeholder="返回时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="执行人:" prop="operatorId">
            <el-select v-model="carReRepair.operatorId"  style="width: 200px" size="mini" placeholder="请选择员工">
             <el-option
               v-for="item in emps"
               :key="item.id"
               :label="item.name"
               :value="item.id">
             </el-option>
           </el-select>
          </el-form-item>
          <el-form-item label="备注:" prop="note">
            <el-input prefix-icon="el-icon-edit" v-model="carReRepair.note" size="mini" style="width: 200px"
                      placeholder="备注"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="add('addEmpForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-table  cell-style="padding:2px;font-size:12px":data="carReRepairs" border style="width: 100%">
      <el-table-column
        type="selection"
        align="left"
        v-loading="tableLoading"
        width="30">
      </el-table-column>
      <el-table-column
        align="left"
        fixed
        label="车牌号"
        width="120">
        <template slot-scope="scope">{{ scope.row.vech.plateNumber}}</template>
      </el-table-column>
      <el-table-column
        prop="aplyDate"
        width="120"
        align="left"
        label="申请时间">
        <template slot-scope="scope">{{ scope.row.aplyDate| formatDate}}</template>
      </el-table-column>
      <el-table-column 
        prop="preStartDate"
        width="120"
        align="left"
        label="计划出行时间">
        <template slot-scope="scope">{{ scope.row.preStartDate|formatDate}}</template>
      </el-table-column>
      <el-table-column 
        prop="preEndDate"
        width="120"
        align="left"
        label="计划返回时间">
        <template slot-scope="scope">{{ scope.row.preEndDate|formatDate}}</template>
      </el-table-column>
      <el-table-column
      prop="empName"
      align="left"
      label="申请人"
      width="200">
    </el-table-column>
      <el-table-column
      prop="operatorName"
      align="left"
      label="执行人"
      width="200">
    </el-table-column>
      <el-table-column
        prop="note"
        align="left"
        label="备注"
        width="200">
      </el-table-column>
      <el-table-column
        align="left"
        label="操作"
        width="195">
        <template slot-scope="scope">
          <el-button @click="showEditEmpView(scope.$index,scope.row)" style="padding: 3px 4px 3px 4px;margin: 2px"
                     size="mini">编辑
          </el-button>
          <el-button type="danger" style="padding: 3px 4px 3px 4px;margin: 2px" size="mini"
                     @click="deleteData(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="display: flex;justify-content:flex-end;margin: 2px">
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
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '张三',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        showOrHidePop: false,
        defaultProps: {
          label: 'plateNumber',
          isLeaf: 'leaf',
          children: 'children'
        },
        emps:[],
        depTextColor: '#c0c4cc',
        keywords: '',
        tableLoading: false,
        advanceSearchViewVisible: false,
        rules: {
          note: [{required: true, message: '必填:备注', trigger: 'blur'}],
          carNo: [{required: true, message: '必选:车辆', trigger: 'blur'}],
        },
        carReRepairs: [],
        dialogTitle: '',
        currentPage: 1,
        totalCount: -1,
        cars:[],
        carReRepair: {
          carNo: '',
          note: '',
  
          carRequestId: '',
          preStartDate: '',
          preEndDate:'',
          empName:'',
          operatorId:''
        },
        dialogFormVisible: false,
        currentRowData:{},//当前选中行数据
        currentIndex:'',//当前选中行号
      }
    },
    mounted: function () {


      this.initData();
      var _this=this;
      this.getRequest("/vehiclerecord/baseData").then(resp => {
        if (resp && resp.status == 200) {
          var data = resp.data;
          console.log(data);
          _this.cars = data.root.cars;

        }
      })
    },
    methods: {
      searchEmp(){
        this.loadData();
      },
      cancelOpt(){
        this.dialogFormVisible = false;
        this.loadData();
        // this.carReRepairs[this.currentIndex] =this.currentRowData;
      },
      showDepTree(){
        this.showOrHidePop = !this.showOrHidePop;
      },
      handleNodeClick(data){
        this.carReRepair.carNo = data.plateNumber;
      
        this.showOrHidePop = false;
        this.depTextColor = '#606266';
      },
      initData() {
        var _this = this;
        _this.loadData();
        this.getRequest("/users/basicdata").then(resp=> {
                if (resp && resp.status == 200) {
                  var data = resp.data;
                  // _this.nations = data.nations;
                  // _this.politics = data.politics;
                  _this.emps = data.root.emps;
                  // _this.roles = data.root.roles;
  
                }
          })
      },
      keywordsChange(val) {
        if (val == '') {
          this.loadData();
        }
      },
      currentChange(currentChange) {
        this.currentPage = currentChange;
        console.log(this.currentPage);
        this.loadData();
      },
      addAndFlushEmp() {
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
      searchData() {
        this.loadData();
      },
      showEditEmpView(index,row) {
        console.log(row)
        this.dialogTitle = "编辑信息";
        this.carReRepair = row;
        delete  this.carReRepair.vech;
        delete this.carReRepair.assingedId;
        this.carReRepair.carRequestId=row.carRequestId;
     
        // this.currentRowData=JSON.parse(JSON.stringify(row));
        // this.currentIndex=index;
        this.carReRepair.preStartDate = this.formatDate(row.preStartDate);
        this.carReRepair.preEndDate = this.formatDate(row.preEndDate);
        // this.employee.departmentId = row.department.id;
        // delete this.carReRepair.noteMaker;
        // delete this.emp.notWorkDate;   
        this.dialogFormVisible = true;
      },
      add(addEmpForm) {
        this.dialogFormVisible = true;
        var _this = this;

        this.$refs[addEmpForm].validate((valid) => {
          if (valid) {
            // this.carReRepair.maintainDate = new Date(this.carReRepair.maintainDate);
            if (this.carReRepair.id) {
              //更新
              this.tableLoading = true;
              console.log(this.carReRepair);
              // this.carReRepair.createDate = new Date(this.carReRepair.createDate);
              this.postRequest("/vehicleAllot/update", this.carReRepair).then(resp => {
                _this.tableLoading = false;
                if (resp && resp.status == 200) {
                  // var data = resp.data;
                  _this.dialogFormVisible = false;
                  _this.loadData();
                  _this.emptyData();

                }
              })
            }
            // else {
            //   //添加
            //   this.tableLoading = true;
            //   console.log(_this.carReRepair);
            //
            //   this.postRequest("/vehicleRepair/addvmt", this.carReRepair).then(resp => {
            //     _this.tableLoading = false;
            //     if (resp && resp.status == 200) {
            //       var data = resp.data;
            //       _this.dialogFormVisible = false;
            //       _this.loadData();
            //       _this.emptyData();
            //
            //     }
            //   })
            // }
          } else {
            return false;
          }
        });
      },
      deleteData(row) {
        this.$confirm('此操将删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.doDelete(row.id);
        }).catch(() => {
        });
      },
      doDelete(ids) {
        this.tableLoading = true;
        var _this = this;
        this.getRequest("/vehicleAllot/delevcalt?id=" + ids).then(resp => {
          _this.tableLoading = false;
          if (resp && resp.status == 200) {
            var data = resp.data;
            _this.loadData();
          }
        })
      },
      loadData() {
        var _this = this;
        this.tableLoading = true;
        this.getRequest("/vehicleAllot/findbypages?page=" + this.currentPage + "&size=10&queryName=" + this.keywords).then(resp => {
          this.tableLoading = false;
          if (resp && resp.status == 200) {
            var data = resp.data.data;
            _this.carReRepairs = data;
            _this.totalCount = resp.data.total;
            _this.emptyData();
          }
        })
      },
      handleCommand(cmd) {
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
      emptyData() {
        this.carReRepair = {
          carNo: '',
          note: '',
          carRequestId: '',
          preStartDate: '',
          preEndDate:'',
          empName:'',
          operatorId:''
        }
      }
    },
    computed: {
      routes() {
        return this.$store.state.routes
      }
    },
    watch: {}
  }
</script>
<style>

  .el-submenu .el-menu-item {
    width: 180px;
    min-width: 175px;
  }
</style>
