<template>
  <!-- 产品规格 -->
  <div>
    <el-container>
      <el-header class="product-use-header">
        <div class="product-header-right">
          <span style="margin-left: 5px">产品用途</span>
        </div>
        <div class="product-header-left">
<!--          <el-button type="primary" @click="addAndFlush" size="mini" icon="el-icon-plus">添加</el-button>-->
        </div>
      </el-header>
      <el-main style="padding: 0 20px;">
        <div v-if="stepOpt.add" style="display:flex;flex-direction: row; justify-content: flex-start; text-align: left" >
          <el-input
            placeholder="请输入用途..."
            size="mini"
            style="width: 250px"
            v-model="unit.name">
          </el-input>
          <el-button type="primary" size="mini" style="margin-left: 5px" @click="addAndFlush">添加</el-button>
          <el-button size="mini" type="success" @click="initData" icon="el-icon-refresh"></el-button>
        </div>
        <el-table :cell-style="{padding:'2px',fontSize:'12px'}" :data="units" fit border style="width: 100%">
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
            label="用途">
          </el-table-column>
          <el-table-column
            align="left"
            label="操作"
            v-if="stepOpt.opt"
          >
            <template slot-scope="scope">
              <el-button @click="showEditDataView(scope.$index,scope.row)" style="padding: 3px 4px 3px 4px;margin: 2px"
                         v-if="stepOpt.update"    size="mini">编辑
              </el-button>

              <el-button v-if="stepOpt.del"type="danger" style="padding: 3px 4px 3px 4px;margin: 2px" size="mini"
                         @click="deleteData(scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
    <el-dialog v-dialogDrag :title="dialogTitle"
               style="padding: 0;"
               :close-on-click-modal="false"
               :visible.sync="dialogFormVisible"
               @close="cancelOpt"
               width="500px">
      <div style="width: 100% " v-if="dialogFormVisible">
        <el-form :model="unit" :rules="rules" ref="addForm" size="sam" label-width="90px">

          <el-form-item label="用途:" prop="name">
            <el-input prefix-icon="el-icon-edit" v-model="unit.name" size="mini" style="width: 200px"
                      placeholder="用途"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="addEmp('addForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>
<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        showOrHidePop: false,
        depTextColor: '#c0c4cc',
        keywords: '',
        tableLoading: false,
        advanceSearchViewVisible: false,
        rules: {
          name: [{required: true, message: '必填:中文名', trigger: 'blur'}],
        },
        units: [],
        dialogTitle: '',
        currentPage: 1,
        formLabelWidth: '120px',
        totalCount: -1,
        unit: {
          name: '',
          code: ''
        },
        deps: [],

        dialogTableVisible: false,
        dialogFormVisible: false,
        currentRowData: {},//当前选中行数据
        currentIndex: '',//当前选中行号
      }
    },
    mounted: function () {
      this.initData();
    },
    computed:{

    },
    methods: {
      // cellStyles({row, column, rowIndex, columnIndex}){
      //   return "padding:2px;font-size:12px";
      // },
      initData() {
        this.loadDatas();

      },
      keywordsChange(val) {
        if (val === '') {
          this.loadDatas();
        }
      },
      currentChange(currentChange) {
        this.currentPage = currentChange;
        console.log(this.currentPage);
        this.loadDatas();
      },
      // addAndFlush() {
      //   this.dialogTitle = "添加单位";
      //   this.emptyData();
      //   this.dialogFormVisible = true;
      //
      // },

      searchEmp() {
        this.loadDatas();
      },
      showEditDataView(index, row) {
        this.dialogTitle = "编辑";
        console.log(row);
        this.unit = row;
        this.dialogFormVisible = true;
      },
      addAndFlush(addForm) {
        var _this = this;
        console.log(this.unit.name)
        if(this.unit.name===''){
          return false;
        }
            if (this.unit.id) {
              //更新
              this.tableLoading = true;
              console.log(this.unit);
              this.postRequest("/productuse/add", this.unit).then(resp => {
                _this.tableLoading = false;
                if (resp && resp.status === 200&&resp.data.success) {
                  _this.loadDatas();
                  _this.emptyData();
                }
              })
            } else {
              //添加
              this.tableLoading = true;
              console.log(_this.unit);
              this.postRequest("/productuse/add", this.unit).then(resp => {
                _this.tableLoading = false;
                if (resp && resp.status === 200&&resp.data.success) {
                  _this.dialogFormVisible = false;
                  _this.loadDatas();
                  _this.emptyData();

                }
              })
            }
      },
      cancelOpt() {
        this.dialogFormVisible = false;
        this.loadDatas();
      },
      deleteData(row) {
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
        this.getRequest("/productuse/delete?id=" + ids).then(resp => {
          _this.tableLoading = false;
          if (resp && resp.status === 200) {
            var data = resp.data;
            _this.loadDatas();
          }
        })
      },
      loadDatas() {
        var _this = this;
        this.tableLoading = true;
        this.getRequest("/productuse/findAll").then(resp => {
          this.tableLoading = false;
          if (resp && resp.status === 200) {
            _this.units = resp.data.data;
            _this.totalCount = resp.data.total;
            _this.emptyData();
          }
        })
      },

      emptyData() {
        console.log('+++++_+++++_');
        this.unit = {
          name: '',
          code: '',
        }
      }
    },
    computed: {
      stepOpt() {
        let opt = {
          add: false,
          update: false,
          del: false,
        };
        let currentCmp = {};
        console.log(this.$store.state.routes);
        this.$store.state.routes.forEach(function (va) {
          if (va.path === '/productuse') {
            currentCmp = va;
          }
        });
        console.log(currentCmp.id);
        let currentlist = [];
        this.$store.state.routes.forEach(function (va) {
          if (va.parentId === currentCmp.id) {
            currentlist.push(va);
          }
        });
        console.log(currentlist);
        if (currentlist) {
          currentlist.forEach(function (value, index, array) {
            switch (value.path) {
              case "update":
                opt.update = true;
                break;
              case "del":
                opt.del = true;
                break;
              case "add":
                opt.add = true;
                break;
              default :
                break;
            }
          })
        }

        return opt;

      }
    },
  }
</script>
<style>
  .el-submenu .el-menu-item {
    width: 180px;
    min-width: 175px;
  }

  .product-use-header {
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center
  }

  .product-header-right {
    margin-left: 20px;
    display: inline;
    font-weight: 700;
    border-left: 4px solid red;
  }

  .product-header-left {
    margin-left: 5px;
    margin-right: 20px;
    display: inline
  }
</style>
