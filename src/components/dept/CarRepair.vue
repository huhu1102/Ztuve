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
    
          <el-button type="primary" @click="addAndFlushEmp" size="mini" icon="el-icon-plus">添加</el-button>
        </div>
    </div>

    <el-dialog v-dialogDrag :title="dialogTitle"
               style="padding: 0px;"
               :close-on-click-modal="false"
               :visible.sync="dialogFormVisible"
               @close="cancelOpt"
               width="500px">
      <div style="width: 100% "v-if="dialogFormVisible">
        <el-form :model="carRepair" :rules="rules" ref="addEmpForm" size="small" label-width="90px">
          <el-form-item label="车牌号:" prop="carNo">

            <el-popover
              v-model="showOrHidePop"
              placement="right"
              title="请选择车辆"
              trigger="hover">
              <el-tree :data="cars" :default-expand-all="true" :props="defaultProps" :expand-on-click-node="false"
                       @node-click="handleNodeClick"></el-tree>
              <div slot="reference"
                   style="width: 200px;height: 26px;display: inline-flex;font-size:13px;border: 1px;border-radius: 5px;border-style: solid;padding-left: 13px;box-sizing:border-box;border-color: #dcdfe6;cursor: pointer"
                   @click.left="showDepTree" v-bind:style="{color: depTextColor}">{{carRepair.carNo}}
              </div>
            </el-popover>
          </el-form-item>
          <el-form-item label="保养地址:" prop="address">
            <el-input prefix-icon="el-icon-edit" v-model="carRepair.address" size="mini" style="width: 200px"
                      placeholder="保养地址"></el-input>
          </el-form-item>

          <el-form-item label="当前里程:" prop="nowMileage">
            <el-input prefix-icon="el-icon-edit" v-model="carRepair.nowMileage" size="mini" style="width: 200px"
            step='100'    min=0           placeholder="当前表盘里程"></el-input>
          </el-form-item>
          <el-form-item label="备注:" prop="mks">
            <el-input prefix-icon="el-icon-edit" v-model="carRepair.mks" size="mini" style="width: 200px"
                      placeholder="备注"></el-input>
          </el-form-item>
          <el-form-item label="维护里程:" prop="maintenanceMile">
                  <el-input prefix-icon="el-icon-edit" v-model="carRepair.maintenanceMile" size="mini" style="width: 200px"
                             placeholder="下次维护里程"></el-input>
                 </el-form-item>
          <el-form-item label="保养时间:" prop="maintainDate">
            <el-date-picker
              v-model="carRepair.maintainDate"
              size="mini"
              value-format="yyyy-MM-dd"
              style="width: 200px"
              type="date"
              placeholder="保养时间">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="add('addEmpForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-table :data="carRepairs" style="width: 100%">
      <el-table-column
        type="selection"
        align="left"
        v-loading="tableLoading"
        width="30">
      </el-table-column>
      <el-table-column
        prop="carNo"
        align="left"
        fixed
        label="车牌号"
      width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        align="left"
        label="保养地址"
      width="120">
      </el-table-column>
      <el-table-column
        prop="maintainDate"
        width="120"
        align="left"
        label="保养时间">
        <template slot-scope="scope">{{ scope.row.maintainDate| formatDate}}</template>
      </el-table-column>
      <el-table-column
        prop="nowMileage"
        width="220"
        align="left"
        label="当次保养里程">
      </el-table-column>
      <el-table-column
        prop="mks"
        width="120"
        align="left"
        label="备注">
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
    <div style="display: flex;justify-content: flex-end;margin: 2px">
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

      return {
        showOrHidePop: false,
        defaultProps: {
          label: 'plateNumber',
          isLeaf: 'leaf',
          children: 'children'
        },
        depTextColor: '#c0c4cc',
        keywords: '',
        tableLoading: false,
        advanceSearchViewVisible: false,
        rules: {
          address: [{required: true, message: '必填:保养地址', trigger: 'blur'}],
          carNo: [{required: true, message: '必选:车牌号', trigger: 'blur'}],
        },
        carRepairs: [],
        dialogTitle: '',
        currentPage: 1,
        totalCount: -1,
        cars:[],
        car:{},
        carRepair: {
          carNo: '',
          address: '',
          maintainDate: '',
          nowMileage: '',
          mks: ''
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
        this.loadEmps();
      },
      cancelOpt(){
        this.dialogFormVisible = false;
        this.loadData();
        // this.carRepairs[this.currentIndex] =this.currentRowData;
      },
      showDepTree(){
        this.showOrHidePop = !this.showOrHidePop;
      },
      handleNodeClick(data){
        this.carRepair.carNo = data.plateNumber;
        this.showOrHidePop = false;
        this.depTextColor = '#606266';
      },
      initData() {
        var _this = this;
        _this.loadData();
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
        this.dialogFormVisible = true;
        this.emptyData();

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
        this.carRepair = row;
        this.carRepair.maintainDate = this.formatDate(row.maintainDate);
        this.currentRowData=JSON.parse(JSON.stringify(row));
        this.currentIndex=index;
        // this.employee.departmentId = row.department.id;
        delete this.carRepair.noteMaker;
        // delete this.emp.notWorkDate;
        this.dialogFormVisible = true;
      },
      add(addEmpForm) {
        this.dialogFormVisible = true;
        var _this = this;
        this.$refs[addEmpForm].validate((valid) => {
          if (valid) {
            // this.carRepair.maintainDate = new Date(this.carRepair.maintainDate);
            if (this.carRepair.id) {
              //更新
              this.tableLoading = true;
              console.log(this.carRepair);
              // this.carRepair.createDate = new Date(this.carRepair.createDate);
              this.postRequest("/vehicleRepair/addvmt", this.carRepair).then(resp => {
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
              console.log(_this.carRepair);
              this.postRequest("/vehicleRepair/addvmt", this.carRepair).then(resp => {
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
      deleteData(row) {
        this.$confirm('此操作将删除该次记录, 是否继续?', '提示', {
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
        this.getRequest("/vehicleRepair/delevmt?id=" + ids).then(resp => {
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
        this.getRequest("/vehicleRepair/findbypages?page=" + this.currentPage + "&size=10&queryName=" + this.keywords).then(resp => {
          this.tableLoading = false;
          if (resp && resp.status == 200) {
            var data = resp.data.data;
            _this.carRepairs = data;
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
        this.carRepair= {
            carNo: '',
            address: '',
            maintainDate: '',
            nowMileage: '',
            mks: ''
        };
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
