<template>
  <div>
   <div style="padding: 0px;display:flex;justify-content:space-between;align-items: center">

      <div style="display: inline">
        <el-input
          placeholder="通过部门名搜索,记得回车哦..."
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
    
        <el-button  type="primary"  @click="addAndFlush" size="mini" icon="el-icon-plus"  >添加部门</el-button>
      </div>
   </div>

  <el-dialog  v-dialogDrag :title="dialogTitle"
              style="padding: 0px;"
              :close-on-click-modal="false"
              :visible.sync="dialogFormVisible"
              @close="cancelOpt"
              width="500px">
    <div style="width: 100% "v-if="dialogFormVisible">
      <el-form  :model="depart" :rules="rules" ref="addForm"  size="sam" label-width="80px"  >

        <el-form-item label="名称:" prop="name">
          <el-input prefix-icon="el-icon-edit" v-model.layz="depart.name" size="mini" style="width: 200px"
                    placeholder="请输入部门名称"></el-input>
        </el-form-item>
        <el-form-item label="描述:" prop="describes">
          <el-input prefix-icon="el-icon-edit" v-model="depart.describes" size="mini" style="width: 200px"
                    placeholder="部门描述..."></el-input>
        </el-form-item>

      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible=false">取 消</el-button>
      <el-button type="primary" @click="addData('addForm')">确 定</el-button>
    </div>
  </el-dialog>
  <el-table :cell-style="{padding:'2px',fontSize:'12px'}" :data="departs"  style="width: 100%">
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
      label="名称"
      width="120">
    </el-table-column>
    <el-table-column
      align="left"
      label="操作"
      width="195">
      <template slot-scope="scope">
        <el-button @click="showEditView(scope.$index,scope.row)" style="padding: 3px 4px 3px 4px;margin: 2px"
                   size="mini">编辑
        </el-button>
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
          name: [{required: true, message: '必填:名称', trigger: 'blur'}]
        },
        departs:[{
          name: '',
          describes: ''
        }],
        dialogTitle: '',
        currentPage:1,
        formLabelWidth: '120px',
        totalCount: -1,
        depart: {
          name: '',
          phone: '',
        },
        dialogFormVisible: false,
        currentRowData:{},//当前选中行数据
        currentIndex:'',//当前选中行号
      }
    },
    mounted: function () {
      this.initData();

    },
    methods: {
      cancelOpt(){
        this.dialogFormVisible = false;
        this.loadData();
        // this.departs[this.currentIndex] =this.currentRowData;
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
      addAndFlush(){
        this.dialogTitle = "添加部门";
        this.emptyData();
        this.dialogFormVisible = true;

      },
      searchEmp(){
        this.loadData();  
      },
      showEditView(index,row){
        console.log(row)
        this.dialogTitle = "编辑信息";
        this.depart = row;
        this.depart.name = row.name;
        this.depart.describes = row.describes;
        this.currentRowData=JSON.parse(JSON.stringify(row));
        this.currentIndex=index;
        delete this.depart.deNumber;
        this.dialogFormVisible = true;
      },
      addData(addEmpForm){
        this.dialogFormVisible=true;
        var _this = this;

        this.$refs[addEmpForm].validate((valid) => {
          if (valid) {

            if (this.depart.id) {
              //更新
              this.tableLoading = true;
              console.log(this.depart);
              // this.depart.createDate=new Date(this.depart.createDate)
              this.postRequest("/depart/depAdd", this.depart).then(resp=> {
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
              console.log(_this.depart);
              this.postRequest("/depart/depAdd", this.depart).then(resp=> {
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
        this.getRequest("/depart/deletDep?id=" + ids).then(resp=> {
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
        this.getRequest("/depart/findbypage?page=" + this.currentPage + "&size=10&queryName="+this.keywords).then(resp=> {
          this.tableLoading = false;
          if (resp && resp.status == 200) {
            var data = resp.data.data;
            _this.departs = data;
            _this.totalCount=resp.data.total;
            _this.emptyData();
          }
        })
      },
      emptyData(){
        this.depart = {
          name: '',
          describes:''
        }
      }
    },
    computed: {},
  }
</script>
<style>



  .el-submenu .el-menu-item {
    width: 180px;
    min-width: 175px;
  }
</style>
