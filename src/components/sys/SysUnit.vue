<template>
   <!-- 系统单位 -->
    <div>
      <div style="display: inline">
        <el-input
          placeholder="通过名搜索,记得回车哦..."
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
      <el-dialog v-dialogDrag :title="dialogTitle"
                  style="padding: 0px;"
                  :close-on-click-modal="false"
                  :visible.sync="dialogFormVisible"
                  @close="cancelOpt"
                  width="500px">
        <div style="width: 100% " v-if="dialogFormVisible">
          <el-form  :model="unit" :rules="rules" ref="addEmpForm"  size="sam" label-width="90px" >
  
            <el-form-item label="名称:" prop="name">
              <el-input prefix-icon="el-icon-edit" v-model="unit.name" size="mini" style="width: 200px"
                        placeholder="单位名称"></el-input>
            </el-form-item>
            <el-form-item label="缩写:" prop="code">
              <el-input prefix-icon="el-icon-edit" v-model="unit.code" size="mini" style="width: 200px"
                        placeholder="单位英文名..."></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible=false">取 消</el-button>
          <el-button type="primary" @click="addEmp('addEmpForm')">确 定</el-button>
        </div>
      </el-dialog>
  
      <el-table  :data="units"  :cell-style="{padding:'2px',fontSize:'12px'}" border style="width: 100%">
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
        label="单位名称"
        width="120">
      </el-table-column>
        <el-table-column
          prop="code"
          align="left"
          fixed
          label="英文缩写"
          width="120">
        </el-table-column>
        <el-table-column
          align="left"
          label="操作"
          width="195">
          <template slot-scope="scope">
            <el-button @click="showEditDataView(scope.$index,scope.row)" style="padding: 3px 4px 3px 4px;margin: 2px"
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
        // let   phonevalidate= (rule, value, callback) => {
        //   //后台方法
        //   const reg = /^[a-zA-Z]+$/;
        //   if(reg.test(value)){
        //     callback()
        //   }else{
        //     callback("格式错误!")
        //   }
        // }
        return {
          dialogVisible: false,
          showOrHidePop: false,
          depTextColor: '#c0c4cc',
          keywords: '',
          tableLoading: false,
          advanceSearchViewVisible: false,
          rules: {
            name: [{required: true, message: '必填:中文名', trigger: 'blur'}],
            // code: [{required: true, message: '必填:单位英文缩写', trigger: 'blur'},
            //   {
            //     validator:phonevalidate,
            //     message: '格式错误',
            //     trigger: 'blur'
            //   }]
          
          },
          units:[],
          defaultProps: {
            label: 'name',
            isLeaf: 'leaf',
            children: 'children'
          },
          dialogTitle: '',
          currentPage:1,
          formLabelWidth: '120px',
          totalCount: -1,
          unit: {
            name: '',
            code:''
          },
          deps: [],
         
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

        initData(){
          var _this = this;
          _this.loadDatas();
    
        },
        keywordsChange(val){
          if (val == '') {
            this.loadDatas();
          }
        },
        currentChange(currentChange){
          this.currentPage = currentChange;
          console.log(this.currentPage);
          this.loadDatas();
        },
        addAndFlushEmp(){
          this.dialogTitle = "添加单位";
          this.emptyData();
          this.dialogFormVisible = true;
  
        },
  
        searchEmp(){
          this.loadDatas();
        },
        showEditDataView(index,row){
          this.dialogTitle = "编辑";
          console.log(row);
          console.log(index);
          this.unit=row;
           delete  this.unit.sysMenu;
           delete this.unit.users;
          this.dialogFormVisible = true;
        },
        addEmp(addEmpForm){
          this.dialogFormVisible=true;
          var _this = this;
  
          this.$refs[addEmpForm].validate((valid) => {
            if (valid) {
              if (this.unit.id) {
                //更新
                this.tableLoading = true;
                console.log(this.unit);
                this.postRequest("/sysunit/addAndUpdate", this.unit).then(resp=> {
                  _this.tableLoading = false;
                  if (resp && resp.status == 200) {
                    // var data = resp.data;
                    _this.dialogFormVisible = false;
                    _this.loadDatas();
                    _this.emptyData();
  
                  }
                })
              } else {
                //添加
                this.tableLoading = true;
                console.log(_this.unit);
                this.postRequest("/sysunit/addAndUpdate", this.unit).then(resp=> {
                  _this.tableLoading = false;
                  if (resp && resp.status == 200) {
                    var data = resp.data;
                    _this.dialogFormVisible = false;
                    _this.loadDatas();
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
          this.loadDatas();
          // this.emps[this.currentIndex] =this.currentRowData;
        },
        deleteData(row){
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
          this.getRequest("/sysunit/delete?id=" + ids).then(resp=> {
            _this.tableLoading = false;
            if (resp && resp.status == 200) {
              var data = resp.data;
              _this.loadDatas();
            }
          })
        },
        loadDatas(){
          var _this = this;
          this.tableLoading = true;
          this.getRequest("/sysunit/findbypage?page=" + this.currentPage + "&size=10&queryName="+this.keywords).then(resp=> {
            this.tableLoading = false;
            if (resp && resp.status == 200) {
              var data = resp.data.data;
              _this.units = data;
              _this.totalCount=resp.data.total;
              _this.emptyData();
            }
          })
        },
      
        emptyData(){
          console.log('+++++_+++++_')
          this.unit = {
            name: '',
            code: '', 
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
