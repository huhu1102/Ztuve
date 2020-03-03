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
      <div style="width: 100% "v-if="dialogFormVisible">
        <el-form :model="carRecord" :rules="rules" ref="addEmpForm" size="small" label-width="90px">
          <el-form-item label="车牌:" prop="carNo">
            <el-popover
              v-model="showOrHidePop"
              placement="right"
              title="请选择车辆"
              trigger="hover">
              <el-tree :data="cars" :default-expand-all="true" :props="defaultProps" :expand-on-click-node="false"
                       @node-click="handleNodeClick"></el-tree>
              <div slot="reference"
                   style="width: 200px;height: 26px;display: inline-flex;font-size:13px;border: 1px;border-radius: 5px;border-style: solid;padding-left: 13px;box-sizing:border-box;border-color: #dcdfe6;cursor: pointer"
                   @click.left="showDepTree" v-bind:style="{color: depTextColor}">{{carRecord.carNo}}
              </div>
            </el-popover>
          </el-form-item>
          <el-form-item label="出车事由:" prop="startCause">
            <el-input prefix-icon="el-icon-edit" v-model="carRecord.startCause" size="mini" style="width: 200px"
                      placeholder="请输入出车事由"></el-input>
          </el-form-item>
          <el-form-item label="初始里程:" prop="startMileage">
            <el-input prefix-icon="el-icon-edit" v-model="carRecord.startMileage" size="mini" style="width: 200px"
            type='number'       placeholder="初始里程"></el-input>
          </el-form-item>
          <el-form-item label="出发日期:" prop="startDate">
            <el-date-picker
              v-model="carRecord.startDate"
              size="mini"
              value-format="yyyy-MM-dd"
              style="width: 200px"
              type="date"
              placeholder="出发日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="实际事由:" prop="endCause">
            <el-input prefix-icon="el-icon-edit" v-model="carRecord.endCause" size="mini" style="width: 200px"
                      placeholder="请输入该次出车实际事由"></el-input>
          </el-form-item>
          <el-form-item label="结束里程:" prop="endMileage">
            <el-input prefix-icon="el-icon-edit" v-model="carRecord.endMileage" size="mini" style="width: 200px"
            type='number'          placeholder="结束里程"></el-input>
          </el-form-item>
          <el-form-item label="结束日期:" prop="endDate">
            <el-date-picker
              v-model="carRecord.endDate"
              size="mini"
              value-format="yyyy-MM-dd"
              style="width: 200px"
              type="date"
              placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="备注:" prop="note">
            <el-input prefix-icon="el-icon-edit" v-model="carRecord.note" size="mini" style="width: 200px"
                      placeholder="备注"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click.prevent="add('addEmpForm')">确 定</el-button>
      </div>
    </el-dialog>
     <!-- 出发 -->
    <el-dialog  v-dialogDrag :title="dialogTitle"
               style="padding: 0px;"
               :close-on-click-modal="false"
               :visible.sync="dialogbeginVisible"
               @close="cancelOpt"
               width="500px">
      <div style="width: 100% "v-if="dialogbeginVisible">
        <el-form :model="carRecord" :rules="rules" ref="addForm" size="small" label-width="90px">
          <el-form-item label="车牌:" prop="carNo">
            <el-popover
              v-model="showOrHidePop"
              placement="right"
              title="请选择车辆"
              trigger="hover">
              <el-tree :data="cars" :default-expand-all="true" :props="defaultProps" :expand-on-click-node="false"
                       @node-click="handleNodeClick"></el-tree>
              <div slot="reference"
                   style="width: 200px;height: 26px;display: inline-flex;font-size:13px;border: 1px;border-radius: 5px;border-style: solid;padding-left: 13px;box-sizing:border-box;border-color: #dcdfe6;cursor: pointer"
                   @click.left="showDepTree" v-bind:style="{color: depTextColor}">{{carRecord.carNo}}
              </div>
            </el-popover>
          </el-form-item>
          <el-form-item label="出车事由:" prop="startCause">
            <el-input prefix-icon="el-icon-edit" v-model="carRecord.startCause" size="mini" style="width: 200px"
                      placeholder="请输入出车事由"></el-input>
          </el-form-item>
          <el-form-item label="初始里程:" prop="startMileage">
            <el-input prefix-icon="el-icon-edit" v-model="carRecord.startMileage" size="mini" style="width: 200px"
            type='number'       placeholder="初始里程"></el-input>
          </el-form-item>
          <el-form-item label="出发日期:" prop="startDate">
            <el-date-picker
              v-model="carRecord.startDate"
              size="mini"
              value-format="yyyy-MM-dd"
              style="width: 200px"
              type="date"
              placeholder="出发日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="备注:" prop="note">
            <el-input prefix-icon="el-icon-edit" v-model="carRecord.note" size="mini" style="width: 200px"
                      placeholder="备注"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogbeginVisible=false">取 消</el-button>
        <el-button type="primary" @click.prevent="add('addEmpForm')">确 定</el-button>
      </div>
    </el-dialog>
     <!-- 返回 -->
     <el-dialog  v-dialogDrag :title="dialogTitle"
     style="padding: 0px;"
     :close-on-click-modal="false"
     :visible.sync="dialogFormVisible"
     @close="cancelOpt"
     width="500px">
<div style="width: 100% "v-if="dialogFormVisible">
<el-form :model="carRecord" :rules="rules" ref="addEmpForm" size="small" label-width="90px">
<el-form-item label="车牌:" prop="carNo">
  <el-popover
    v-model="showOrHidePop"
    placement="right"
    title="请选择车辆"
    trigger="hover">
    <el-tree :data="cars" :default-expand-all="true" :props="defaultProps" :expand-on-click-node="false"
             @node-click="handleNodeClick"></el-tree>
    <div slot="reference"
         style="width: 200px;height: 26px;display: inline-flex;font-size:13px;border: 1px;border-radius: 5px;border-style: solid;padding-left: 13px;box-sizing:border-box;border-color: #dcdfe6;cursor: pointer"
         @click.left="showDepTree" v-bind:style="{color: depTextColor}">{{carRecord.carNo}}
    </div>
  </el-popover>
</el-form-item>
<el-form-item label="出车事由:" prop="startCause">
  <el-input prefix-icon="el-icon-edit" v-model="carRecord.startCause" size="mini" style="width: 200px"
            placeholder="请输入出车事由"></el-input>
</el-form-item>
<el-form-item label="初始里程:" prop="startMileage">
  <el-input prefix-icon="el-icon-edit" v-model="carRecord.startMileage" size="mini" style="width: 200px"
  type='number'       placeholder="初始里程"></el-input>
</el-form-item>
<el-form-item label="出发日期:" prop="startDate">
  <el-date-picker
    v-model="carRecord.startDate"
    size="mini"
    value-format="yyyy-MM-dd"
    style="width: 200px"
    type="date"
    placeholder="出发日期">
  </el-date-picker>
</el-form-item>
<el-form-item label="实际事由:" prop="endCause">
  <el-input prefix-icon="el-icon-edit" v-model="carRecord.endCause" size="mini" style="width: 200px"
            placeholder="请输入该次出车实际事由"></el-input>
</el-form-item>
<el-form-item label="结束里程:" prop="endMileage">
  <el-input prefix-icon="el-icon-edit" v-model="carRecord.endMileage" size="mini" style="width: 200px"
  type='number'          placeholder="结束里程"></el-input>
</el-form-item>
<el-form-item label="结束日期:" prop="endDate">
  <el-date-picker
    v-model="carRecord.endDate"
    size="mini"
    value-format="yyyy-MM-dd"
    style="width: 200px"
    type="date"
    placeholder="结束日期">
  </el-date-picker>
</el-form-item>
<el-form-item label="备注:" prop="note">
  <el-input prefix-icon="el-icon-edit" v-model="carRecord.note" size="mini" style="width: 200px"
            placeholder="备注"></el-input>
</el-form-item>
</el-form>
</div>
<div slot="footer" class="dialog-footer">
<el-button @click="dialogFormVisible=false">取 消</el-button>
<el-button type="primary" @click.prevent="add('addEmpForm')">确 定</el-button>
</div>
</el-dialog>

    <el-table :data="carRecords" style="width: 100%">
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
        label="车牌"
        width="120">
      </el-table-column>
      <el-table-column
        prop="startCause"
        align="left"
        fixed
        label="出发事由"
        width="120">
      </el-table-column>
      <el-table-column
        prop="startMileage"
        width="120"
        align="left"
        label="出发行程">
      </el-table-column>
      <el-table-column
        width="100"
        align="left"
        label="出发时间">
        <template slot-scope="scope">{{ scope.row.startDate | formatDate}}</template>
      </el-table-column>
      <el-table-column
        prop="endCause"
        width="220"
        align="left"
        label="实际事由">
      </el-table-column>
      <el-table-column
        prop="endMileage"
        width="120"
        align="left"
        label="结束行程">
      </el-table-column>
      <el-table-column
        width="100"
        align="left"
        label="结束日期">
        <template slot-scope="scope">{{ scope.row.endDate | formatDate}}</template>
      </el-table-column>
      <el-table-column
        prop="note"
        width="120"
        align="left"
        label="备注">
      </el-table-column>

      <el-table-column
        align="left"
        label="操作"
        width="195">
        <template slot-scope="scope">
          <el-button type="danger"  @click="showEditEmpView(scope.$index, scope.row)" style="padding: 3px 4px 3px 4px;margin: 2px"
                     size="mini">编辑
          </el-button>
          <el-button type="danger" style="padding: 3px 4px 3px 4px;margin: 2px" size="mini"
                     @click="deleteData(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="display: flex;justify-content:flex-end;margin: 2px">
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
  export default {
    data() {

      return {
        showOrHidePop: false,
        defaultProps: {
          label: 'plateNumber',
          isLeaf: 'leaf',
          children: 'children'
        },
        keywords: '',
        depTextColor: '#c0c4cc',
        tableLoading: false,
        advanceSearchViewVisible: false,
        rules: {
          carNo: [{required: true, message: '必填:车牌', trigger: 'blur'}],
          // manufacturer: [{required: true, message: '必选:生产厂家', trigger: 'blur'}],
          // carRecordryingNumber: [{required: true, message: '必填:承载人数', trigger: 'blur'}],
          // vehicleType: [{required: true, message: '必填:车辆型号', trigger: 'blur'}],
        },
        cars: [],
        carRecords: [],
        dialogTitle: '',
        currentPage: 1,
        totalCount: -1,
        carRecord: {
          startCause: '',
          startMileage: '',
          startDate: '',
          endMileage: '',
          endCause: '',
          endDate: '',
          note: '',
          carNo: ''
        },
        dialogFormVisible: false,
        dialogbeginVisible: false,
        currentRowData:{},//当前选中行数据
        currentIndex:'',//当前选中行号
      }
    },
    mounted: function () {
      this.initData();
    },

    methods: {
      searchEmp(){
        this.loadEmps();
      },
      cancelOpt(){
        this.dialogFormVisible = false;
        this.loadData();
        // this.carRecords[this.currentIndex] =this.currentRowData;
        console.log("heheh")
      },
      showDepTree() {
        this.showOrHidePop = !this.showOrHidePop;
      },
      handleNodeClick(data) {
        this.carRecord.carNo = data.plateNumber;
        this.showOrHidePop = false;
        this.depTextColor = '#606266';
      },
      initData() {
        var _this = this;
        _this.loadData();
        this.getRequest("/vehiclerecord/baseData").then(resp => {
          if (resp && resp.status == 200) {
            var data = resp.data;
            console.log(data);
            _this.cars = data.root.cars;

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
        this.carRecord = row;
        this.currentRowData=JSON.parse(JSON.stringify(row));
        this.currentIndex=index;
        this.carRecord.endDate = this.formatDate(row.endDate);
        this.carRecord.startDate = this.formatDate(row.startDate);
        // this.employee.beginContract = this.formatDate(row.beginContract);
        delete this.carRecord.user;
        delete this.carRecord.verification;
        delete this.carRecord.enabled;
        delete this.carRecord.distributeDate;//该字段取自申请表
        this.dialogFormVisible = true;
      },
      add(addEmpForm) {
        this.dialogFormVisible = true;
        var _this = this;

        this.$refs[addEmpForm].validate((valid) => {
          if (valid) {
            // this.carRecord.startDate = new Date(this.carRecord.startDate);
            // if(this.carRecord.endDate!=''){
              // this.carRecord.endDate = new Date(this.carRecord.endDate);
            // }
            if (this.carRecord.id) {
              //更新
              this.tableLoading = true;
              console.log(this.carRecord);
              // this.carRecord.createDate = new Date(this.carRecord.createDate);
              this.postRequest("/vehiclerecord/addvd", this.carRecord).then(resp => {
                _this.tableLoading = false;
                if (resp && resp.status == 200) {

                  _this.dialogFormVisible = false;
                  _this.loadData();
                  _this.emptyData();

                }
              })
            } else {
              //添加
              this.tableLoading = true;
                  console.log(_this.carRecord);
              this.postRequest("/vehiclerecord/addvd", this.carRecord).then(resp => {
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
        this.getRequest("/vehiclerecord/deletvd?id=" + ids).then(resp => {
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
        this.getRequest("/vehiclerecord/findbypages?page=" + this.currentPage + "&size=10&queryName=" + this.keywords).then(resp => {
          this.tableLoading = false;
          if (resp && resp.status == 200) {
            var data = resp.data.data;
            _this.carRecords = data;
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
        this.carRecord = {
          startCause: '',
          startMileage: '',
          startDate: '',
          endMileage: '',
          endCause: '',
          endDate: '',
          note: '',
          carNo: ''
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
