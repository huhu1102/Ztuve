
<!--合同管理-->
<template>
  <div>
    <el-container>
      <el-header>
        <div style=" text-align:left; ">
          <strong>合同管理</strong>
        </div>
        <div style="text-align: left;margin-left: 20px;">
<!--          <div class="fa fa-list-ul" :class="{stamp:tap===2}" @click="tap=2" style="cursor: pointer;">-->
<!--            列表展示-->
<!--          </div>-->
<!--          <div class="fa fa-window-restore" :class="{stamp:tap===1}" @click="tap=1" style="margin-left: 30px;cursor: pointer;">产品分类（用途）-->
<!--          </div>-->

        </div>
      </el-header>
      <el-container  style="display: flex;flex-direction: column;" v-if="tap===2">
        <div style="height: 30px;margin: 0 20px;display: flex;flex-direction: row;justify-content: space-between;">
          <div style="display: inline">
            <el-input
              placeholder="通过员工名搜索员工,记得回车哦..."
              clearable
              @change="keywordsChange"
              style="width: 300px;margin: 0;padding: 0;"
              size="mini"
              :disabled="advanceSearchViewVisible"
              @keyup.enter.native="searchEmp"
              prefix-icon="el-icon-search"
              v-model="keywords">
            </el-input>
            <el-button type="primary" size="mini" class="send-head-left-btn" icon="el-icon-search" @click="searchEmp">搜索
            </el-button>
            <el-button slot="reference" type="primary" size="mini" class="send-head-right-btn"
                       @click="showAdvanceSearchView"><i
              class="fa fa-lg send-head-left-btn"
              v-bind:class="[advanceSearchViewVisible ? faangledoubleup:faangledoubledown]"
            ></i>高级搜索
            </el-button>
          </div>
          <div style="margin-left: 5px;margin-right: 20px;display: inline">

<!--            <el-button type="primary" @click="addAndFlushEmp" size="mini" icon="el-icon-plus">添加员工</el-button>-->
          </div>
        </div>
        <el-main style="margin: 0 20px">
          <transition name="slide-fade">
            <div class="send-main-div"
                 v-show="advanceSearchViewVisible">
              <el-row>
                <el-col :span='6'>
                  合同名称:
                  <el-input prefix-icon="el-icon-edit" v-model="keywords" size="mini" class="send-input"
                            placeholder="合同名。。。">
                  </el-input>
                </el-col>
                <el-col :span='6'>
                  合同编号:
                  <el-input prefix-icon="el-icon-edit" v-model="keyContractNumber" size="mini" class="send-input"
                            placeholder="合同编号。。。">
                  </el-input>
                </el-col>
                <el-col :span='6'>
                  类型:
                  <el-input prefix-icon="el-icon-edit" v-model="keyType" size="mini" style="width: 200px"
                            placeholder="合同类型。。。">
                  </el-input>
                </el-col>

<!--                <el-col :span='6'>-->
<!--                  部门:-->
<!--                  <el-input prefix-icon="el-icon-edit" v-model="keydep" size="mini" style="width: 200px"-->
<!--                            placeholder="部门名称。。。">-->
<!--                  </el-input>-->
<!--                </el-col>-->
              </el-row>
              <el-row style="margin-top: 10px;display: flex;justify-content: flex-end;">
                <el-col :span="5" :offset="4">
                  <el-button size="mini" @click="cancelSearch">取消</el-button>
                  <el-button icon="el-icon-search" type="primary" size="mini" @click="searchEmp">搜索</el-button>
                </el-col>
              </el-row>
            </div>
          </transition>
          <el-table   v-zt-cell-style fit :data="contactList"  style=" width: 100%;border: 1px solid #F7F7F7">
            <el-table-column
              type="selection"
              align="left"
              v-loading="tableLoading"
              width="30">
            </el-table-column>
            <el-table-column
              prop="name"
              align="left"
              fixed
              label="姓名"
            >
            </el-table-column>
            <el-table-column
              prop="contractName"
              align="left"
              fixed
              label="合同名称"
            >
            </el-table-column>
            <el-table-column
              prop="contractNumber"
              align="left"
              label="合同编号"
            >
            </el-table-column>

            <el-table-column
              prop="qualityDeposit"

              align="left"
              label="质保金">
            </el-table-column>
            <el-table-column
              prop="type"

              align="left"
              label="合同类型">
            </el-table-column>
            <el-table-column
            prop="totalMoney"

            align="left"
            label="总金额">
          </el-table-column>
            <el-table-column
              prop="signContractDate"

              align="left"
              label="签约时间">
              <template slot-scope="scope">
                <div>
                  {{signContractDate|formatDateTime}}
                </div>
              </template>
            </el-table-column>
            <el-table-column
            prop="startDate"

            align="left"
            label="开始时间">
            <template slot-scope="scope">
              <div>
                {{startDate|formatDateTime}}
              </div>
            </template>
          </el-table-column>
            <el-table-column
              prop="endDate"
              align="left"
              label="截止时间">
              <template slot-scope="scope">
                <div>
                  {{endDate|formatDateTime}}
                </div>
              </template>
            </el-table-column>
<!--            <el-table-column-->
<!--              prop="gender"-->
<!--              align="left"-->
<!--              :formatter="formatSex"-->
<!--              label="性别">-->

<!--            </el-table-
-->
            <el-table-column
              align="left"
              label="操作"
              fixed="right"
            >
              <template slot-scope="scope">
                <span @click="showDetails(scope.$index,scope.row)" style="padding: 3px 4px 3px 4px;margin: 2px"
                           size="mini">编辑
                </span>

                <el-button type="danger" style="padding: 3px 4px 3px 4px;margin: 2px" size="mini"
                           @click="deleteEmp(scope.row)">删除
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
        </el-main>

      </el-container>
      <!--      //模块展示-->
      <el-container v-else class="product-model-base">
        <div class="product-model-item" v-for="item in depItems" :key="item.id" @click="used(item)">
          <span class="fa fa-bomb"></span>
          <span>{{item.name}}</span>
          <span>（{{item.num}}）</span>
        </div>
      </el-container>
    </el-container>
<!--    <el-dialog v-dialogDrag :title="dialogTitle"-->
<!--               style="padding: 0px;"-->
<!--               :close-on-click-modal="false"-->
<!--               :visible.sync="dialogFormVisible"-->
<!--               @close="cancelOpt"-->
<!--               width="500px">-->
<!--      <div style="width: 100% " v-if="dialogFormVisible">-->
<!--        <el-form :model="employee" :rules="rules" ref="addEmpForm" size="sam" label-width="120px">-->

<!--          <el-form-item style="text-align: left" label="姓名:" prop="name">-->
<!--            <el-input prefix-icon="el-icon-edit" v-model="employee.name" size="mini" class="product-input-btn-class"-->
<!--                      placeholder="请输入员工姓名"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="电话:" prop="phone">-->
<!--            <el-input prefix-icon="el-icon-phone" v-model="employee.phone" size="mini"-->
<!--                      class="product-input-btn-class"-->
<!--                      placeholder="电话号码..."></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="性别:" prop="gender">-->
<!--            <el-radio-group v-model="employee.gender" class="product-input-btn-class">-->
<!--              <el-radio :label=1>男</el-radio>-->
<!--              <el-radio style="margin-left: 15px" :label=2>女</el-radio>-->
<!--            </el-radio-group>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="部门:" prop="departmentName">-->
<!--            <el-popover-->
<!--              v-model="showOrHidePop"-->
<!--              placement="right"-->
<!--              title="请选择部门"-->
<!--              trigger="hover"-->
<!--              class="product-input-btn-class">-->
<!--              &lt;!&ndash;              @hide="getDeptTreeData"&ndash;&gt;-->
<!--              <el-tree :data="deps"-->
<!--                       :default-expand-all="true"-->
<!--                       multiple-->
<!--                       :props="defaultProps"-->
<!--                       :expand-on-click-node="false"-->
<!--                       show-checkbox-->
<!--                       ref="deptTree"-->
<!--                       @check="handleNodeClick"-->
<!--              ></el-tree>-->
<!--              &lt;!&ndash;              &ndash;&gt;-->
<!--              <div slot="reference"-->
<!--                   class="dept-tree"-->
<!--                   @click="showDepTree" v-bind:style="{color: depTextColor}">{{employee.departmentName}}-->
<!--              </div>-->
<!--            </el-popover>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="邮箱:" prop="email">-->
<!--            <el-input prefix-icon="el-icon-message" v-model="employee.email" size="mini"-->
<!--                      class="product-input-btn-class"-->
<!--                      placeholder="电子邮箱地址..."></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="职位:"  prop="positionIds">-->
<!--            <el-select v-model="employee.positionIds" multiple class="product-input-btn-class" size="mini"-->
<!--                       placeholder="请选择职位">-->
<!--              <el-option-->
<!--                v-for="item in posts"-->
<!--                :key="item.id"-->
<!--                :label="item.name"-->
<!--                :value="item.id">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="出生日期:" prop="birthday">-->
<!--            <el-date-picker-->
<!--              v-model="employee.birthday"-->
<!--              size="mini"-->
<!--              value-format="yyyy-MM-dd"-->
<!--              class="product-input-btn-class"-->
<!--              type="date"-->
<!--              placeholder="出生日期">-->
<!--            </el-date-picker>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="联系地址:" prop="address">-->
<!--            <el-input prefix-icon="el-icon-edit" v-model="employee.address" size="mini"-->
<!--                      class="product-input-btn-class"-->
<!--                      placeholder="联系地址..."></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="入职日期:" prop="entryDate">-->
<!--            <el-date-picker-->
<!--              v-model="employee.entryDate"-->
<!--              size="mini"-->
<!--              type="date"-->
<!--              class="product-input-btn-class"-->
<!--              value-format="yyyy-MM-dd"-->
<!--              placeholder="入职日期">-->
<!--            </el-date-picker>-->
<!--          </el-form-item>-->

<!--        </el-form>-->
<!--      </div>-->
<!--      <div slot="footer" class="dialog-footer">-->
<!--        <el-button @click="dialogFormVisible=false">取 消</el-button>-->
<!--        <el-button type="primary" @click="addEmp('addEmpForm')">确 定</el-button>-->
<!--      </div>-->
<!--    </el-dialog>-->
  </div>

</template>
<script>
  export default {
    data() {

      let phonevalidate = (rule, value, callback) => {
        //后台方法
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (reg.test(value)) {
          callback()
        } else {
          callback("电话号码格式错误!")

        }
      };
      return {
        depItems: [],
        dialogVisible: false,
        showOrHidePop: false,
        depTextColor: '#c0c4cc',
        keywords: '',

        currentTreeData:'',
        currentTreeIds:[],
        rules: {
          name: [{required: true, message: '必填:姓名', trigger: 'blur'}],
          // phone: [{required: true, message: '必填:电话号码', trigger: 'blur'},
          //   {
          //     validator: phonevalidate,
          //     trigger: 'blur'
          //   }],
        },

        defaultProps: {
          label: 'name',
          isLeaf: 'leaf',
          children: 'children'
        },
        dialogTitle: '',
        currentPage: 1,
        formLabelWidth: '120px',
        totalCount: -1,

        deps: [],
        posts: [],
        dialogTableVisible: false,
        dialogFormVisible: false,
        currentRowData: {},//当前选中行数据
        currentIndex: '',//当前选中行号
        //搜索
        advanceSearchViewVisible: false,
        faangledoubleup: 'fa-angle-double-up',
        faangledoubledown: 'fa-angle-double-down',
        clientName: '',
        keyempName: '',
        keydep: '',
        tap: 2,
        //
        createDateStart:'',
        createDateEnd:'',
        startDateStart:'',
        startDateEnd:'',
        endDateStart:'',
        endDateEnd:'',
        contactStatus:'',
        contactList: [],
        contact: {
          contractName: '',//合同名称
          contractNumber: '',//合同编号
          qualityDeposit: '',//质保金
          type: '',//合同类型
          totalMoney: '',//总金额
          signContractDate: '',//签约时间
          startDate: '',//开始时间
          endDate: '',//截止时间
          notes: '',//备注
          uploadName: '',//附件名字
          imageUrl: '',//附件url
        },
        tableLoading: false,
      }
    },
    mounted: function () {
      this.initData();
    },
    methods: {
      showAdvanceSearchView() {
        this.advanceSearchViewVisible = !this.advanceSearchViewVisible;
        this.keywords = '';
        if (!this.advanceSearchViewVisible) {
          this.emptyEmpData();
          this.loadContact();
        }
      },
      cancelSearch() {
        this.advanceSearchViewVisible = false;
        this.emptyEmpData();
        this.loadContact();
      },
      formatSex: function (row, column) {
        return row.gender === 1 ? '男' : row.gender === 2 ? '女' : '未知';
      },
      showDepTree() {
        this.showOrHidePop = !this.showOrHidePop;
      },
      handleNodeClick(data) {
        let that=this;
        let nodes=  this.$refs.deptTree.getCheckedNodes()||[];
        console.log(nodes);
        this.currentTreeIds=[];
        that.employee.departmentName='';
        for (let i = 0;i<=nodes.length-1;  i++) {
          if(that.employee.departmentName===''){
            that.employee.departmentName = nodes[i].name;
          }else{
            that.employee.departmentName=that.employee.departmentName+","+nodes[i].name;
          }
          that.currentTreeIds.push(nodes[i].id)
        };
        this.depTextColor = '#606266';
      },
      getDeptTreeData(){
        let _this=this;
        let allnodes=  this.$refs.deptTree.getCheckedNodes()||[];
        console.log(allnodes);
        this.currentTreeData='';
        this.currentTreeIds=[];
        allnodes.forEach(function (value) {
          _this.currentTreeIds.push(value.id);
          _this.currentTreeData+=value.name+",";
        });
        this.employee.departmentName=_this.currentTreeData;
      },
      initData() {
        let _this = this;
        _this.loadContact();
        _this.getBaseData();
      },

      getBaseData() {
        let _this = this;
        _this.getRequest("/emp/basicdata").then(resp => {
          if (resp && resp.status === 200 && resp.data.success) {
            let data = resp.data;
            // _this.nations = data.nations;
            let  det=data.root.deptlist || [];
            let dets=[];
            det.forEach(function (v) {
              dets.push({
                id:v[0],
                num:v[1],
                name:v[2]
              })
            })
            _this.depItems = dets;
            _this.deps = data.root.department;
            _this.posts = data.root.position;

          }
        })
      },
      keywordsChange(val) {
        if (val === '') {
          this.loadContact();
        }
      },
      currentChange(currentChange) {
        this.currentPage = currentChange;
        console.log(this.currentPage);
        this.loadContact();
      },
      addAndFlushEmp() {
        this.dialogTitle = "添加员工";
        this.emptyEmpData();
        this.dialogFormVisible = true;
      },

      searchEmp() {
        this.loadContact();
      },
      showDetails(index, row) {
        this.dialogTitle = "编辑员工";
        // departmentIds: '',
        // positionIds: '',
        console.log(row);
        console.log(index);
        this.employee = row;
        this.currentRowData = JSON.parse(JSON.stringify(row));
        this.currentIndex = index;
        this.employee.name = row.name;
        this.employee.birthday = this.formatDate(new Date(row.birthday));
        this.employee.entryDate = this.formatDate(new Date(row.entryDate));
        this.employee.departmentIds = row.departmentIds.split(',').map(value => parseInt(value));
        this.employee.departmentName = row.departmentName;
        this.employee.positionIds = row.positionIds.split(',').map(value => parseInt(value));
        this.dialogFormVisible = true;
      },
      addEmp(addEmpForm) {
        var _this = this;
        this.dialogFormVisible = true;
        let deptIds='';
        if(this.currentTreeIds){
          deptIds=this.currentTreeIds.join()
        }
        var postIds='';
        if(this.employee.positionIds){
          postIds=this.employee.positionIds.join();
        }
        this.employee.positionId=0;
        this.employee.departmentId=0;
        this.$refs[addEmpForm].validate((valid) => {
          if (valid) {
            // this.employee.birthday=new Date(this.employee.birthday);
            // this.employee.entryDate=new Date(this.employee.entryDate)
            if (this.employee.id) {
              //更新
              this.tableLoading = true;
              console.log(this.employee);
              // this.employee.createDate=new Date(this.employee.createDate)
              this.postRequest("/emp/update", this.employee).then(resp => {
                _this.tableLoading = false;
                if (resp && resp.status === 200 && resp.data.success) {
                  // var data = resp.data;
                  _this.dialogFormVisible = false;
                  _this.loadContact();
                  _this.emptyEmpData();

                }
              })
            } else {
              //添加
              this.tableLoading = true;
              console.log(_this.employee);
              this.postRequest("/emp/empAdd?deptIds="+deptIds+"&postIds="+postIds, this.employee).then(resp => {
                _this.tableLoading = false;
                if (resp && resp.status === 200 && resp.data.success) {
                  var data = resp.data;
                  _this.dialogFormVisible = false;
                  _this.loadContact();
                  _this.emptyEmpData();

                }
              })
            }
          } else {
            return false;
          }
        });
      },
      cancelOpt() {
        this.dialogFormVisible = false;
        this.loadContact();
        // this.emps[this.currentIndex] =this.currentRowData;
      },
      deleteEmp(row) {
        this.$confirm('此操作将删除[' + row.name + '], 是否继续?', '提示', {
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
        this.getRequest("/emp/deletEmp?id=" + ids).then(resp => {
          _this.tableLoading = false;
          if (resp && resp.status === 200) {
            var data = resp.data;
            _this.loadContact();
          }
        })
      },
      used(item){
        let that=this;
        this.keydep=item.name;
        if(item.num>0){
          that.tap=2;
        }
        this.keydep='';
      },
      loadContact() {
        var _this = this;
        this.tableLoading = true;
        this.getRequest("/contract/findbypage?page="
          + this.currentPage
          + "&size=10&contractName=" + this.contractName
          + "&clientName=" + this.clientName
          + "&empName=" + this.empName
          + "&createDateStart=" + this.createDateStart
          + "&createDateEnd=" + this.createDateEnd
          + "&startDateStart=" + this.startDateStart
          + "&startDateEnd=" + this.startDateEnd
          + "&endDateStart=" + this.endDateStart
          + "&endDateEnd=" + this.endDateEnd
          + "&status=" + this.contactStatus
        ).then(resp => {
          this.tableLoading = false;
          if (resp && resp.status === 200) {
            var data = resp.data.data;
            _this.contactList = data;
            _this.totalCount = resp.data.total;
            _this.emptyEmpData();
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
      emptyEmpData() {
        console.log('+++++_+++++_')
        this.contact = {
          contractName: '',//合同名称
          contractNumber: '',//合同编号
          qualityDeposit: '',//质保金
          type: '',//合同类型
          totalMoney: '',//总金额
          signContractDate: '',//签约时间
          startDate: '',//开始时间
          endDate: '',//截止时间
          notes: '',//备注
          uploadName: '',//附件名字
          imageUrl: '',//附件url
        }
      }
    },

    computed: {
      routes() {
        return this.$store.state.routes
      }
    }
  }
</script>
<style>
  .send-input {
    width: 160px;
  }

  .send-head {
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center
  }

  .send-head-right-btn {
    margin-left: 5px;
    margin-right: 20px;
    display: inline
  }

  .send-head-left-btn {
    margin-left: 5px
  }

  .send-main {
    padding-left: 0px;
    padding-top: 0px

  }

  .send-main-div {
    margin-bottom: 10px;
    border-radius: 5px;
    padding: 5px 0;
    box-sizing: border-box;
    border: 1px solid #20a0ff;
  }

  .page-tool {
    display: flex;
    justify-content: flex-end;
    margin: 2px;
  }

  .dept-tree {
    width: 220px;
    height: 26px;
    display: inline-flex;
    font-size: 13px;
    border-radius: 5px;
    padding-left: 13px;
    box-sizing: border-box;
    cursor: pointer;
    align-items: center
  }

  .dept-tree:hover {
    border: 1px solid #dcdfe6;
  }


  .el-form-item {
    text-align: left;
    border: none;
  }

  .el-form-item:focus:after {
    text-align: left;
    width: 220px;
    height: 26px;
    display: inline-flex;
    font-size: 13px;
    border-radius: 5px;
    padding-left: 13px;
    box-sizing: border-box;
    cursor: pointer;
    align-items: center
  }
  .el-table td, .el-table th{
    padding: 9px 0;
  }
</style>
