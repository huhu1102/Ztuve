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

    <el-dialog  v-dialogDrag :title="dialogTitle"
               style="padding: 0px;"
               :close-on-click-modal="false"
               :visible.sync="dialogFormVisible"
               @close="cancelOpt"
               width="500px">
      <div style="width: 100% " v-if="dialogFormVisible">
        <el-form :model="carRequest" :rules="rules" ref="addEmpForm" size="small" label-width="90px">
          <el-form-item label="可选车辆:" prop="carNo">
            <el-popover
              v-model="showOrHidePop"
              placement="right"
              title="请选择车辆"
              trigger="manual">
              <el-tree :data="cars" :default-expand-all="true" :props="defaultProps" :expand-on-click-node="false"
                       @node-click="handleNodeClick"></el-tree>
              <div slot="reference"
                   style="width: 200px;height: 26px;display: inline-flex;font-size:13px;border: 1px;border-radius: 5px;border-style: solid;padding-left: 13px;box-sizing:border-box;border-color: #dcdfe6;cursor: pointer"
                   @click.left="showDepTree" v-bind:style="{color: depTextColor}">{{carRequest.carNo}}
              </div>
            </el-popover>
          </el-form-item>
          <el-form-item label="用车时长:" prop="duration">
            <el-input prefix-icon="el-icon-edit" v-model="carRequest.duration" size="mini" style="width: 200px"
                      placeholder="预计用车多少天..."></el-input>
          </el-form-item>
          <el-form-item label="申请事由:" prop="business">
            <el-input prefix-icon="el-icon-edit" v-model="carRequest.business" size="mini" style="width: 200px"
                      placeholder="出差事项..."></el-input>
          </el-form-item>
          <el-form-item label="出行时间:" prop="preStartDate">
            <el-date-picker
              v-model="carRequest.preStartDate"
              size="mini"
              value-format="yyyy-MM-dd"
              style="width: 200px"
              type="date"
              :picker-options="pickerOptions1"
              placeholder="出行时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="返回时间:" prop="preEndDate">
            <el-date-picker
              v-model="carRequest.preEndDate"
              size="mini"
              value-format="yyyy-MM-dd"
              style="width: 200px"
              type="date"
              :picker-options="pickerOptions1"
              placeholder="返回时间">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="备注:" prop="notes">
            <el-input prefix-icon="el-icon-edit" v-model="carRequest.notes" size="mini" style="width: 200px"
                      placeholder="备注"></el-input>
          </el-form-item>


        
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add('addEmpForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!--     分配车辆-->
    <el-dialog :title="dialogTitle"
               style="padding: 0px;"
               :close-on-click-modal="false"
               :visible.sync="dialogAlotVisible"
               @close="emptyAltData"
               width="500px">
      <div style="width: 100% ">
        <el-form :model="assigned" v-if="dialogAlotVisible" :rules="rules" ref="addNewRecord" size="small" label-width="90px">
         
          <el-form-item label="备注:" prop="note">
            <el-input prefix-icon="el-icon-edit" v-model="assigned.note" size="mini" style="width: 200px;"
             type='textarea' rows="5" cols="33"  placeholder="备注..."></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAlotVisible=false">取 消</el-button>
        <el-button type="primary" @click.prevent="denied('addNewRecord')">拒绝申请</el-button>
        <el-button type="primary" @click.prevent="allocate('addNewRecord')">同意申请</el-button>
      </div>
    </el-dialog>


    <el-table :data="carRequests" border style="width: 100%">
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
        width="100">
        <template slot-scope="scope">{{ scope.row.vcif.plateNumber}}</template>
      </el-table-column>
      <el-table-column 
        prop="preStartDate"
        width="120"
        align="left"
        label="预计出行时间">
        <template slot-scope="scope">{{ scope.row.preStartDate|formatDate}}</template>
      </el-table-column>
      <el-table-column 
        prop="preEndDate"
        width="120"
        align="left"
        label="预计返回时间">
        <template slot-scope="scope">{{ scope.row.preEndDate|formatDate}}</template>
      </el-table-column>
      <el-table-column
        prop="duration"
        align="left"
        label="持续时间"
        width="120">
      </el-table-column>
      <el-table-column
        prop="business"
        align="left"
        label="事由"
        width="120">
      </el-table-column>

      <el-table-column
        prop="notes"
        width="220"
        align="left"
        label="备注">
      </el-table-column>
      <el-table-column
        prop="operatorName"
        width="220"
        align="left"
        label="执行人">
      </el-table-column>
      <el-table-column
        prop="empName"
        width="220"
        align="left"
        label="申请人">
      </el-table-column>
      
      <el-table-column
        prop="requestStatus"
        align="left"
        label="状态"
        :formatter="formatStatus"
        width="120">
      </el-table-column>
      <el-table-column
        align="left"
        label="操作"
        width="195">
        <template slot-scope="scope">
          <el-button v-if="scope.row.requestStatus=='UN_MANAGED'"  @click="showAllotionView(scope.row)" style="padding: 3px 4px 3px 4px;margin: 2px"
                     size="mini">分配车辆
          </el-button>
          <!-- <el-button @click="showEditEmpView(scope.$index,scope.row)" style="padding: 3px 4px 3px 4px;margin: 2px"
                     size="mini">编辑
          </el-button> -->
          <el-button type="danger" style="padding: 3px 4px 3px 4px;margin: 2px" size="mini"
                     @click="deleteData(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="display:flex;justify-content: flex-end;margin: 2px">
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
        showHidePop:false,
        defaultProps: {
          label: 'plateNumber',
          isLeaf: 'leaf',
          children: 'children'
        },
        defaultData: {
          label: 'plateNumber',
          isLeaf: 'leaf',
          children: 'children'
        },
        depTextColor: '#c0c4cc',
        keywords: '',
        tableLoading: false,
        advanceSearchViewVisible: false,
        rules: {
          business: [{required: true, message: '必填:事由', trigger: 'blur'}],
          carNo: [{required: true, message: '必选:车辆', trigger: 'blur'}],
        },
        carRequests: [],
        dialogTitle: '',
        currentPage: 1,
        totalCount: -1,
        cars:[],
        carRequest: {
          carNo: '',
          business: '',
          preStartDate: '',
          duration: '',
          preEndDate:'',
          notes:''
        },
        assigned:{
          carNo: '',
          note:'',
          requestId:''

        },
        dialogFormVisible: false,
        dialogAlotVisible:false,
        currentRowData:{},//当前选中行数据
        currentIndex:'',//当前选中行号
        pickerOptions1: {
         disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          },
        }
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
      cancelOpt(){
        this.dialogFormVisible = false;
        this.loadData();
        // this.carRequests[this.currentIndex] =this.currentRowData;
      },
      searchEmp(){
        this.loadData();
      },

      formatStatus:function(row, column){ //REFUSE
        return row.requestStatus == "UN_MANAGED" ? '未分配' 
              :row.requestStatus == "MANAGED"? '已分配' :row.requestStatus == "REFUSE"? '已拒绝' :'已完成';
      },
      showDepTree(){
        this.showOrHidePop = !this.showOrHidePop;
      },
      showAllotTree(){
        this.showHidePop = !this.showHidePop;
      },
      handleAskClick(data){
        this.assigned.carNo = data.plateNumber;
        this.showHidePop = false;
        this.depTextColor = '#606266';
      },
      handleNodeClick(data){
        this.carRequest.carNo = data.plateNumber;
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
        this.emptyData();
        this.dialogFormVisible = true;
      },
      searchData() {
        this.loadData();
      },
      showEditEmpView(index,row) {
        console.log(row)
        this.dialogTitle = "编辑信息";
        this.carRequest = row;
        this.carRequest.preStartDate = this.formatDate(row.preStartDate);
        this.carRequest.preEndDate = this.formatDate(row.preEndDate);
        this.currentRowData=JSON.parse(JSON.stringify(row));
        this.currentIndex=index;
        // this.employee.departmentId = row.department.id;
        delete this.carRequest.emp;
        delete this.carRequest.vcif;
        // delete this.emp.notWorkDate;
        this.dialogFormVisible = true;
      },
      // 车辆分配
      showAllotionView(row) {
        console.log(row)
        this.dialogTitle = "分配车辆";
        this.carRequest = row;
        // this.carReRequest.aplyDate=row.createDate;
        // this.carRequest.preStartDate = this.formatDate(row.preStartDate);
        // delete this.emp.notWorkDate;
        this.dialogAlotVisible = true;
      },
      allocate(addNewRecord) {
        this.dialogAlotVisible = true;
        var _this = this;
        this.$refs[addNewRecord].validate((valid) => {
          if (valid) {
              //添加新分配记录
              this.tableLoading = true;
              console.log(_this.assigned);
              this.assigned.requestId=this.carRequest.id;
              this.postRequest("/vehicleAllot/add", this.assigned).then(resp => {
                _this.tableLoading = false;
                if (resp && resp.status == 200) {
                  var data = resp.data;
                  _this.dialogAlotVisible = false;
                  _this.loadData();
                  _this.emptyAltData();

                }
              })
            // }
          } else {
            return false;
          }
        });
      },
      denied(addNewRecord) {
        this.dialogAlotVisible = true;
        var _this = this;
        this.$refs[addNewRecord].validate((valid) => {
          if (valid) {
              //添加新分配记录
              this.tableLoading = true;
              console.log(_this.assigned);
              this.assigned.requestId=this.carRequest.id;
              this.postRequest("/vehicleAllot/refuse", this.assigned).then(resp => {
                _this.tableLoading = false;
                if (resp && resp.status == 200) {
                  var data = resp.data;
                  _this.dialogAlotVisible = false;
                  _this.loadData();
                  _this.emptyAltData();

                }
              })
            // }
          } else {
            return false;
          }
        });
      },
      add(addEmpForm) {
        this.dialogFormVisible = true;
        var _this = this;
        this.$refs[addEmpForm].validate((valid) => {
          if (valid) {
            // this.carRequest.preStartDate = new Date(this.carRequest.preStartDate);
            // this.carRequest.preEndDate = new Date(this.carRequest.preEndDate);
            if (this.carRequest.id) {
              //更新
              this.tableLoading = true;
              console.log(this.carRequest);
              // this.carRequest.createDate = new Date(this.carRequest.createDate);
              this.postRequest("/askedvehicle/addask", this.carRequest).then(resp => {
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
              console.log(_this.carRequest);
              this.postRequest("/askedvehicle/addask", this.carRequest).then(resp => {
                _this.tableLoading = false;
                if (resp && resp.status == 200) {
                  var data = resp.data;
                  if(data.success){
                    _this.dialogFormVisible = false;
                  _this.loadData();
                  _this.emptyData();
                  }             
                }
              })
            }
          } else {
            return false;
          }
        });
      },
      deleteData(row) {
        this.$confirm('此操作将删除[' + row.plateNumber + '], 是否继续?', '提示', {
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
        this.getRequest("/askedvehicle/deletask?id=" + ids).then(resp => {
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
        this.getRequest("/askedvehicle/findbypages?page=" + this.currentPage + "&size=10&queryName=" + this.keywords).then(resp => {
          this.tableLoading = false;
          if (resp && resp.status == 200) {
            var data = resp.data.data;
            _this.carRequests = data;
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
        this.carRequest = {
          carNo: '',
          business: '',
          preStartDate: '',
          preEndDate:'',
          duration: '',
          notes:''
        }
      },
      emptyAltData(){
        this.assigned ={
          carNo: '',
          note:'',
          requestId:''
        }

      },

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
