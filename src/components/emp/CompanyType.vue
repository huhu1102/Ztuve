<template>
  <!-- 客户流派 -->
  <div>
    <el-container>
      <el-header class="product-use-header">
        <div class="product-header-right">
          <span style="margin-left: 5px">客户流派</span>
        </div>
      </el-header>
      <el-main style="padding: 0 20px;">
        <div style="text-align: left" v-loading="loading">
          <el-input
            placeholder="请输入流派名称..."
            size="mini"
            style="width: 250px"
            v-model="unitName">
          </el-input>
          <el-button type="primary" size="mini" style="margin-left: 5px" @click="addAndFlush">添加流派</el-button>
        </div>
        <el-table :data="units" :cell-style="{padding:'2px',fontSize:'12px'}"="{padding:'2px',fontSize:'12px'}" highlight-current-row  style="width: 100%">
          <el-table-column
            type="selection"
            align="left"
            width="30">
          </el-table-column>
          <el-table-column
            prop="name"
            align="left"
            fixed
            label="流派名称"
          >
          </el-table-column>
          <el-table-column
            align="left"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button class="fa fa-edit" @click="showEditDataView(scope.$index,scope.row)" style="padding: 3px 4px 3px 4px;color:#ffffff; background-color: #85ce61; margin: 2px"
                         size="mini">
              </el-button>

              <el-button class="fa fa-trash" type="danger" style="padding: 3px 4px 3px 4px;color: #ffffff; margin: 2px" size="mini"
                         @click="deleteData(scope.row)">
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>

    </el-container>

  </div>

</template>
<script>
  export default {
    data() {
      return {
        loading:false,
        keywords: '',
        tableLoading: false,
        advanceSearchViewVisible: false,
        rules: {
          name: [{required: true, message: '必填:中文名', trigger: 'blur'}],
        },
        units: [],
        unitName:'',
        currentPage: 1,
        formLabelWidth: '120px',
        totalCount: -1,
        unit: {
          id:0,
          name: '',
          code: ''
        },
        deps: [],
      }
    },
    mounted: function () {
      this.initData();
      // this.formatGender(row);
    },
    methods: {

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

      searchEmp() {
        this.loadDatas();
      },
      showEditDataView(index, row) {
        this.unit = row;
        this.unitName=row.name;
      },
      addAndFlush() {
        let _this = this;
        if(this.unitName.trim()===""){
          return;
        }
        this.unit.name=this.unitName;
        if (this.unit.id) {
          //更新
          this.tableLoading = true;
          console.log(this.unit);
          this.postRequest("/clientType/update", this.unit).then(resp => {
            _this.tableLoading = false;
            if (resp && resp.status === 200 && resp.data.success) {
              _this.loadDatas();
              _this.emptyData();

            }else{
              _this.emptyData();
            }
          })
        } else {
          //添加
          this.tableLoading = true;
          console.log(_this.unit);
          this.postRequest("/clientType/add", this.unit).then(resp => {
            _this.tableLoading = false;
            if (resp && resp.status === 200 && resp.data.success) {
              _this.dialogFormVisible = false;
              _this.loadDatas();
              _this.emptyData();
            }else{
              _this.emptyData();

            }
          })
        }

      },
      cancelOpt() {
        this.dialogFormVisible = false;
        this.loadDatas();
        // this.emps[this.currentIndex] =this.currentRowData;
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
        this.getRequest("/clientType/delete?id=" + ids).then(resp => {
          _this.tableLoading = false;
          if (resp && resp.status === 200 && resp.data.success) {
            _this.loadDatas();
          }
        })
      },
      loadDatas() {
        var _this = this;
        this.tableLoading = true;
        this.getRequest("/clientType/findAll").then(resp => {
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
        this.unitName=''
        this.unit = {
          id:0,
          name: '',
          code: '',
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
  .el-submenu .el-menu-item {
    width: 180px;
    min-width: 175px;
  }
</style>
