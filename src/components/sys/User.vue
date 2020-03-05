<template>
    <div>
      <div style="display: inline">
        <el-input
          placeholder="通过姓名搜索,记得回车哦..."
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
  
        <el-button  type="primary"  @click="addAndFlushEmp" size="mini" icon="el-icon-plus"  >添加</el-button>
      </div>
      <el-dialog  v-dialogDrag :title="dialogTitle"
                  style="padding: 0px;"
                  :close-on-click-modal="false"
                  :visible.sync="dialogFormVisible"
                  @close="cancelOpt"
                  width="500px">
        <div style="width: 100% " v-if="dialogFormVisible">
          <el-form  :model="user" :rules="rules" ref="addEmpForm"  size="sam" label-width="90px" >
  
            <el-form-item label="昵称:" prop="username">
              <el-input prefix-icon="el-icon-edit" v-model="user.username" size="mini" style="width: 200px"
                        placeholder="请输入昵称"></el-input>
            </el-form-item>
            <el-form-item label="电话:" prop="phone">
              <el-input prefix-icon="el-icon-phone" v-model="user.phone" size="mini" style="width: 200px"
                        placeholder="电话号码..."></el-input>
            </el-form-item>
              
            <el-form-item label="密码:" prop="password">
                <el-input prefix-icon="el-icon-edit" v-model="user.password" size="mini" style="width: 200px"
                          placeholder="密码..."></el-input>
              </el-form-item>

            <el-form-item label="员工:" prop="empId">
             <el-select v-model="user.empId"  style="width: 200px" size="mini" placeholder="请选择员工">
              <el-option
                v-for="item in emps"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
           
            </el-form-item>
            <el-form-item label="角色:" prop="roles">
                <el-select v-model="user.roles" filterable
             
                multiple
               
                style="width: 200px" size="mini" placeholder="请选择角色">
                 <el-option
                   v-for="item in roles"
                   :key="item.id"
                   :label="item.roleName"
                   :value="item.id">
                 </el-option>
               </el-select>
            </el-form-item>
  
          </el-form>
        </div>  
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible=false">取 消</el-button>
          <el-button type="primary" @click="addEmp('addEmpForm')">确 定</el-button>
        </div>
      </el-dialog>
  
      <el-table  :data="users"  :cell-style="{padding:'2px',fontSize:'12px'}"  border style="width: 100%">
        <el-table-column
          type="selection"
          align="left"
          v-loading="tableLoading"
          width="30">
        </el-table-column>
        <el-table-column
          prop="username"
          align="left"
          fixed
          label="昵称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="phone"
          align="left"
          fixed
          label="电话"
          width="120">
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
                       @click="deleteEmp(scope.row)">删除
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
    export default{
      data() {
  
        const item = {};
        let   phonevalidate= (rule, value, callback) => {
          //后台方法
          const reg =   /^1[3|4|5|7|8][0-9]\d{8}$/;
          if(reg.test(value)){
            callback()
          }else{
            callback("电话号码格式错误!")
            // this.getRequest("/emp/uniqetel?telphone="+value).then(res => {
            //   if (res && res.data.success === 'true') {
            //     callback()
            //   } else if (res && res.data.success === 'false') {
            //     callback('电话号码已存在!')
            //   }
            // })
          }
        }
        return {
          dialogVisible: false,
          showOrHidePop: false,
          depTextColor: '#c0c4cc',
          keywords: '',
          tableLoading: false,
          advanceSearchViewVisible: false,
          rules: {
            username: [{required: true, message: '必填:姓名', trigger: 'blur'}],
            phone: [{required: true, message: '必填:电话号码', trigger: 'blur'},
              {
                validator:phonevalidate,
                message: '电话号码错误',
                trigger: 'blur'
              }],
          
            password: [{required: true, message: '必填:密码', trigger: 'blur'}],
            roles: [{required: true, message: '必选:角色', trigger: 'change'}],
            empId:[{required: true, message: '必选:员工', trigger: 'change'}]
          },
          roles:[],
          defaultProps: {
            label: 'name',
            isLeaf: 'leaf',
            children: 'children'
          },
          dialogTitle: '',
          currentPage:1,
          formLabelWidth: '120px',
          totalCount: -1,
          user: {
            username: '',
            phone: '',
          },
          users:[],
          deps: [],
          emps:[],
          dialogTableVisible: false,
          dialogFormVisible: false,
          currentRowData:{},//当前选中行数据
          currentIndex:'',//当前选中行号
        }
      },
      mounted: function () {
        this.initData();
        // this.formatGender(row);
      },
      methods: {
        formatSex: function (row, column) {
          return row.gender == "1" ? '男' : row.gender == '2' ? '女' : '未知';
        },
        showDepTree(){
            this.showOrHidePop = !this.showOrHidePop;
        },
        handleNodeClick(data) {
          this.user.departmentName = data.name;
          this.user.departmentId = data.id;
          this.showOrHidePop = false;
          this.depTextColor = '#606266';
        },
        initData(){
          var _this = this;
          _this.loadData();
          this.getRequest("/users/basicdata").then(resp=> {
                if (resp && resp.status == 200) {
                  var data = resp.data;
                  // _this.nations = data.nations;
                  // _this.politics = data.politics;
                  _this.emps = data.root.emps;
                  _this.roles = data.root.roles;
  
                }
          })
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
          this.dialogTitle = "添加用户";
          this.emptyData();
          this.dialogFormVisible = true;
   
        },
  
        searchEmp(){
          this.loadData();
        },
        showEditEmpView(index,row){
          this.dialogTitle = "编辑用户";
          console.log(row);
          console.log(index);
          this.user=row;
          this.currentIndex=index;
          this.user.username = row.username;
          this.user.empId = row.empId;
          this.user.empName = row.empName;
          let roleslist=[];
          row.roles.forEach(e => {
            roleslist.push(e.id);
         });
          this.user.roles=roleslist;
          this.dialogFormVisible = true;
        },
       
        addEmp(addEmpForm){
          this.dialogFormVisible=true;
          var _this = this;
          this.$refs[addEmpForm].validate((valid) => {
            if (valid) {
           
              if (this.user.id) {
                //更新
                this.tableLoading = true;
                console.log(this.user);
                this.postRequest("/users/update", this.user).then(resp=> {
                  _this.tableLoading = false;
                  if (resp && resp.status == 200) {
                    // var data = resp.data;
                    console.log(resp);
                    _this.dialogFormVisible = false;
                    _this.loadData();
                    _this.emptyData();
  
                  }
                })
              } else {
                //添加
                this.tableLoading = true;
                console.log(_this.user);
                console.log("添加")
                this.postRequest("/users/addAndUpdate", this.user).then(resp=> {
                  _this.tableLoading = false;
                  console.log(resp);
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
        cancelOpt(){
          this.dialogFormVisible=false;
          this.loadData();
          // this.emps[this.currentIndex] =this.currentRowData;
        },
        deleteEmp(row){
          this.$confirm('此操作将删除[' + row.name + '], 是否继续?', '提示', {
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
          this.getRequest("/users/delete?id=" + ids).then(resp=> {
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
          this.getRequest("/users/findbypage?page=" + this.currentPage + "&size=10&queryName="+this.keywords).then(resp=> {
            this.tableLoading = false;
            if (resp && resp.status == 200) {
              var data = resp.data.data;
              _this.users = data;
              _this.totalCount=resp.data.total;
              _this.emptyData();
            }
          })
        },
      
        emptyData(){
          console.log('+++++_+++++_')
          this.user = {
            username: '',
            phone: '',
            password: '',
          }
        }
      },
      computed: {
        routes(){
          return this.$store.state.routes
        }
      }
    }
  </script>
  <style>
    .el-submenu .el-menu-item {
      width: 180px;
      min-width: 175px;
    }
  </style>
