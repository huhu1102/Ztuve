<template>
  <!-- 半成品出入库记录  物料周转记录u-->
  <div>
    <el-container>
      <el-header class="send-head">
          <div style="display: inline">
            <el-input placeholder="通过名称搜索,记得回车哦..." clearable @change="keywordsChange"
                      style="width: 300px;margin: 0px;padding: 0px;" size="mini" :disabled="advanceSearchViewVisible"
                      @keyup.enter.native="searchData" prefix-icon="el-icon-search" v-model="keywords">
            </el-input>
            <el-button type="primary" size="mini" class="send-head-left-btn" icon="el-icon-search" @click="searchData">搜索
            </el-button>
            <el-button size="mini" type="success" @click="initData" icon="el-icon-refresh"></el-button>
            <el-button slot="reference" type="primary" size="mini" class="send-head-right-btn"
                       @click="showAdvanceSearchView"><i
              class="fa fa-lg send-head-left-btn" v-bind:class="[advanceSearchViewVisible ? faangledoubleup:faangledoubledown]"
             ></i>高级搜索
            </el-button>
          </div>
      </el-header>
      <el-main class="send-main">
        <transition name="slide-fade">
          <div class="send-main-div"
               v-show="advanceSearchViewVisible">
            <el-row>
              <el-col :span='8'>
                产品:
                <el-input prefix-icon="el-icon-edit" v-model="keyproductName" size="mini" class="send-input"
                          placeholder="产品名称。。。">
                </el-input>
              </el-col>
              <el-col :span='8'>
                客户:
                <el-input prefix-icon="el-icon-edit" v-model="keyClientName" size="mini" class="send-input"
                          placeholder="客户名。。。">
                </el-input>
              </el-col>
              <el-col :span='8'>
                操作人:
                <el-input prefix-icon="el-icon-edit" v-model="keyempName" size="mini" style="width: 200px"
                          placeholder="员工名。。。">
                </el-input>
              </el-col>
            </el-row>
            <el-row style="margin-top: 10px;display: flex;justify-content: flex-end;">
              <el-col :span="5" :offset="4">
                <el-button size="mini" @click="cancelSearch">取消</el-button>
                <el-button icon="el-icon-search" type="primary" size="mini" @click="searchData">搜索</el-button>
              </el-col>
            </el-row>
          </div>
        </transition>
        <el-table :data="midConfirms":cell-style="{padding:'2px',fontSize:'12px'}" fit border style="width: 100%" onsort="">
          <el-table-column align="left" prop="name" fixed label="名称" sortable>
          </el-table-column>
          <el-table-column align="left" label="数量" sortable>
            <template slot-scope="scope">
              {{ scope.row.quantity}} {{ scope.row.unitName}}
            </template>
          </el-table-column>
          <el-table-column align="left" label="记录人" sortable>
            <template slot-scope="scope">
              {{scope.row.operator.name}}
            </template>
          </el-table-column>
          <el-table-column align="left" label="记录时间" sortable>
            <template slot-scope="scope">
              {{ scope.row.createDate|formatDateTime}}
            </template>
          </el-table-column>
          <el-table-column align="left" label="备注" width="120">
            <template slot-scope="scope">
              {{scope.row.notes===null?"无":scope.row.notes===""?"无":scope.row.notes}}
            </template>
          </el-table-column>
        </el-table>
        <div style="display: flex;justify-content: flex-end;margin: 2px">
          <el-pagination background :page-size="10" :pager-count="11" :current-page="currentPage"
                         @current-change="currentChange" layout="prev, pager, next" :total="totalCount">
          </el-pagination>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
  export default {
    data() {
      let numbervalidate = (rule, value, callback) => {
        const reg = /^\d+$/;
        if (reg.test(value)) {
          callback()
        } else {
          callback("数字格式错误!")
        }
      }
      return {
        tempPlan: [],
        confirmFormVisible: false,
        dialogVisible: false,
        showOrHidePop: false,
        depTextColor: '#c0c4cc',
        keywords: '',
        tableLoading: false,
        advanceSearchViewVisible: false,
        midConfirms: [],
        dialogTitle: '',
        currentPage: 1,
        formLabelWidth: '120px',
        units: [],
        totalCount: -1,
        middleProduct: {
          name: '',
          productId: '',
          standard: '',
          unitId: '',
          plant: [],
          clientId: '',
          note: '',
          selectType: 1,
        },
        products: [],
        dialogTableVisible: false,
        dialogFormVisible: false,
        currentRowData: {}, //当前选中行数据
        currentIndex: '', //当前选中行号
        pName: '',
        pId: '',
        matriallist: [],
        //搜索
        advanceSearchViewVisible: false,
        faangledoubleup: 'fa-angle-double-up',
        faangledoubledown: 'fa-angle-double-down',
        keyproductName:'',
        keyClientName:'',
        keyempName:'',
      }
    },
    mounted: function () {
      this.initData();
      // this.formatGender(row);
    },
    methods: {
      showAdvanceSearchView() {
        this.advanceSearchViewVisible = !this.advanceSearchViewVisible;
        this.keywords = '';
        if (!this.advanceSearchViewVisible) {
          this.emptyData();
          // this.beginDateScope = '';
          this.loadData();
        }
      },
      cancelSearch() {
        this.advanceSearchViewVisible = false;
        this.emptyData();
        // this.beginDateScope = '';
        this.loadData();
      },
      handleCurrentChange(row) {
        console.log(row);
        this.newMaterial = row;
      },
      formatStatus(row, column) {
        return row.verifyStatus == 1 ? '新建' : '已撤销';
      },
      selectChange(e) {
        console.log(e);
        let that = this;
        if (this.units) {
          this.units.forEach(function (v, arr) {
            console.log(v.id);
            if (v.id == e) {
              that.middleProduct.utilname = v.name;
            }
          })
        }

      },
      selectType(e) {
        this.middleProduct.selectType = e;
      },
      formatStyle: function (row, column) {
        return row.productStyle == "1" ? '常备' : row.productStyle == '2' ? '普通' : '未知';
      },
      formatPlant: function (row, column) {
        let that = this;
        let planName = ''
        let plants = row.plant;
        that.positions.forEach(function (v, i, arr) {
          plants.forEach(function (v2, i2, arr2) {
            if (v.id === v2) {
              planName += v.name + " , ";
            }

          })
        });
        return planName;
      },
      showDepTree() {
        this.showOrHidePop = !this.showOrHidePop;
      },
      initData() {
        let _this = this;
        _this.loadData();
        // this.getRequest("/middleProduct/basedata").then(resp => {
        //   if (resp && resp.status == 200) {
        //     let data = resp.data;
        //     _this.units = data.root.units;
        //     _this.clients = data.root.clients;
        //     _this.products = data.root.products;

        //   }
        // })
      },
      keywordsChange(val) {
        if (val === '') {
          this.loadData();
        }
      },
      currentChange(currentChange) {
        this.currentPage = currentChange;
        console.log(this.currentPage);
        this.loadData();
      },


      searchData() {
        this.loadData();
      },

      cancelRecordData(row) {
        this.$confirm('此操作将撤销该记录, 是否继续?', '提示', {
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
        let _this = this;
        this.getRequest("/midProgressRecieve/withdraw?id=" + ids).then(resp => {
          _this.tableLoading = false;
          if (resp && resp.status === 200) {
            let data = resp.data;
            _this.loadData();
          }
        })
      },
      loadData() {
        let _this = this;
        this.tableLoading = true;
        this.getRequest("/midProgressRecieve/findbypage?page=" + this.currentPage + "&size=10&queryName=" + this
          .keywords).then(resp => {
          this.tableLoading = false;
          if (resp && resp.status === 200) {
            _this.midConfirms = resp.data.data;
            _this.totalCount = resp.data.total;
          }
        })
      },

      emptyData() {
        console.log('+++++_+++++_')
        this.middleProduct = {
          name: '',
          productId: '',
          standard: '',
          unitId: '',
          plant: '',
          clientId: '',
          note: '',
          selectType: 1,
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
    border: 1px;
    border-radius: 5px;
    border-style: solid;
    padding: 5px 0px 5px 0px;
    box-sizing: border-box;
    border-color: #20a0ff
  }


</style>
