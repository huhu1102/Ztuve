<template>
  <div>
    <div style="padding: 0px;display:flex;justify-content:space-between;align-items: center">

      <div style="display: inline">
        <el-input placeholder="通过职位名搜索,记得回车哦..." clearable @change="keywordsChange"
          style="width: 300px;margin: 0px;padding: 0px;" size="mini" :disabled="advanceSearchViewVisible"
          @keyup.enter.native="searchEmp" prefix-icon="el-icon-search" v-model="keywords">
        </el-input>
        <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search" @click="searchEmp">搜索
        </el-button>
      </div>
      <div style="margin-left: 5px;margin-right: 20px;display: inline">

        <el-button type="primary" @click="addAndFlushEmp" size="mini" icon="el-icon-plus">添加职位</el-button>
      </div>
    </div>


    <el-dialog v-dialogDrag :title="dialogTitle" style="padding: 0px;" :close-on-click-modal="false"
      :visible.sync="dialogFormVisible" @close="cancelOpt" width="500px">
      <div style="width: 100% " v-if="dialogFormVisible">
        <el-form :model="position" :rules="rules" ref="addForm" size="sam" label-width="80px">

          <el-form-item label="名称:" prop="name">
            <el-input prefix-icon="el-icon-edit" v-model="position.name" size="mini" style="width: 200px"
              placeholder="请输入职位名称"></el-input>
          </el-form-item>
          <el-form-item label="描述:" prop="specification">
            <el-input prefix-icon="el-icon-edit" v-model="position.specification" size="mini" style="width: 200px"
              placeholder="职位描述..."></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="addData('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-table :data="positions"cell-style="padding:2px;font-size:12px"style="width: 100%">
      <el-table-column type="selection" align="left" v-loading="tableLoading" width="30">
      </el-table-column>
      <el-table-column prop="name" align="left" fixed label="名称" width="120">
      </el-table-column>
      <el-table-column prop="specification" align="left" fixed label="描述" width="120">
      </el-table-column>
      <el-table-column align="left" label="操作" width="195">
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
      <el-pagination background :page-size="10" :pager-count="11" :current-page="currentPage"
        @current-change="currentChange" layout="prev, pager, next" :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        keywords: '',
        tableLoading: false,
        advanceSearchViewVisible: false,
        rules: {
          name: [{
            required: true,
            message: '必填:名称',
            trigger: 'blur'
          }]
        },
        positions: [],
        dialogTitle: '',
        currentPage: 1,
        formLabelWidth: '120px',
        totalCount: -1,
        position: {
          name: '',
          specification: '',
        },
        dialogFormVisible: false,
        currentRowData: {}, //当前选中行数据
        currentIndex: '', //当前选中行号
      }
    },
    mounted: function () {
      this.initData();
    },
    methods: {
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
        this.dialogTitle = "添加职位";
        this.emptyData();
        this.dialogFormVisible = true;
        // var _this = this;
        // this.getRequest("/employee/basic/maxWorkID").then(resp=> {
        //   if (resp && resp.status == 200) {
        //     _this.emp.workID = resp.data;
        //   }
        // })
      },
      searchEmp() {
        this.loadData();
      },
      showEditEmpView(index, row) {
        console.log(row)
        this.dialogTitle = "编辑信息";
        this.position = row;
        this.currentRowData = JSON.parse(JSON.stringify(row));
        this.currentIndex = index;
        delete this.position.deNumber;
        this.dialogFormVisible = true;
      },

      addData(addForm) {
        this.dialogFormVisible = true;
        var _this = this;

        this.$refs[addForm].validate((valid) => {
          if (valid) {

            if (this.position.id) {
              //更新
              this.tableLoading = true;
              console.log(this.position);
              // this.position.createDate=new Date(this.position.createDate)
              this.postRequest("/position/posAdd", this.position).then(resp => {
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
              console.log(_this.position);
              this.postRequest("/position/posAdd", this.position).then(resp => {
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
        this.$confirm('此操作将删除[' + row.name + '], 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.doDelete(row.id);
        }).catch(() => {});
      },
      doDelete(ids) {
        this.tableLoading = true;
        var _this = this;
        this.getRequest("/position/deletPro?id=" + ids).then(resp => {
          _this.tableLoading = false;
          if (resp && resp.status == 200) {
            var data = resp.data;
            _this.loadData();

          }
        })
      },
      cancelOpt() {
        this.dialogFormVisible = false;
        this.loadData();
        // this.positions[this.currentIndex] =this.currentRowData;
      },
      loadData() {
        var _this = this;
        this.tableLoading = true;
        this.getRequest("/position/findbypage?page=" + this.currentPage + "&size=10&queryName=" + this.keywords).then(
          resp => {
            this.tableLoading = false;
            if (resp && resp.status == 200) {
              var data = resp.data.data;
              _this.positions = data;
              _this.totalCount = resp.data.total;
              _this.emptyData();
            }
          })
      },

      emptyData() {
        this.position = {
          name: '',
          describes: ''
        }
      }
    },

    computed: {}
  }

</script>
<style>
  .el-submenu .el-menu-item {
    width: 180px;
    min-width: 175px;
  }

</style>
