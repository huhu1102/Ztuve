<template>
  <!-- 半成品出入库记录 -->
  <div>
    <div style="padding: 0px;display:flex;justify-content:space-between;align-items: center">

      <div style="display: inline">
        <el-input placeholder="通过产品名搜索,记得回车哦..." clearable @change="keywordsChange"
          style="width: 300px;margin: 0px;padding: 0px;" size="mini" :disabled="advanceSearchViewVisible"
          @keyup.enter.native="searchData" prefix-icon="el-icon-search" v-model="keywords">
        </el-input>
        <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search" @click="searchData">搜索
        </el-button>
        <el-button size="mini" type="success" @click="initData" icon="el-icon-refresh"></el-button>
      </div>
    </div>
    <el-table :data="midConfirms"cell-style="padding:2px;font-size:12px" border style="width: 100%">
      <el-table-column type="selection" align="left" v-loading="tableLoading" width="30">
      </el-table-column>
      <el-table-column align="left" prop='name' fixed label="名称" width="120">
        </el-table-column>
      <el-table-column align="left" prop='serialNumber' fixed label="计划单编号" width="120">
      </el-table-column>
      <el-table-column align="left" label="计划采购数量" width="120">
        <template slot-scope="scope">
          {{ scope.row.quantity}} {{ scope.row.unitName}}
        </template>
      </el-table-column>
      <el-table-column align="left" label="实收数量" width="120">
        <template slot-scope="scope">
          {{ scope.row.practicalQuantity}} {{ scope.row.unitName}}
        </template>
      </el-table-column>
      <el-table-column align="left" label="记录人" width="140">
        <template slot-scope="scope">
          {{ scope.row.employee.name}}
        </template>
      </el-table-column>
      <el-table-column align="left" label="操作时间" width="140">
        <template slot-scope="scope">
          {{ scope.row.createDate|formatDateTime}}
        </template>
      </el-table-column>
      <el-table-column align="left" label="下发时间" width="120">
        <template slot-scope="scope">
          {{ scope.row.planDate|formatDateTime}}
        </template>
      </el-table-column>
      <el-table-column prop="notes" align="left" label="备注" width="120">
      </el-table-column>
      <el-table-column prop="verifyStatus;" align="left" label="状态" :formatter="formatStatus" width="120">
      </el-table-column>
      <el-table-column align="left" label="操作" width="250">
        <template slot-scope="scope">
          <div style="margin-top: 10px;">
            <el-button type="danger" v-if="scope.row.verifyStatus==1"style="padding: 3px 4px 3px 4px;margin: 2px" size="mini"
              @click="cancelRecordData(scope.row)">撤销
            </el-button>
          </div>
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
        clients: [],
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

      }
    },
    mounted: function () {
      console.log('嘿嘿哈！')
      this.initData();
      // this.formatGender(row);
    },
    methods: {
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
        var plants = row.plant;
        that.positions.forEach(function (v, i, arr) {
          plants.forEach(function (v2, i2, arr2) {
            if (v.id == v2) {
              planName += v.name + " , ";
            }

          })
        })
        return planName;
      },
      showDepTree() {
        this.showOrHidePop = !this.showOrHidePop;
      },
      initData() {
        var _this = this;
        _this.loadData();
        this.getRequest("/middleProduct/basedata").then(resp => {
          if (resp && resp.status == 200) {
            var data = resp.data;
            _this.units = data.root.units;
            _this.clients = data.root.clients;
            _this.products = data.root.products;

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
        }).catch(() => {});
      },
      doDelete(ids) {
        this.tableLoading = true;
        var _this = this;
        this.getRequest("/midPruchaseVerify/withdraw?id=" + ids).then(resp => {
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
        this.getRequest("/midPruchaseVerify/findbypage?page=" + this.currentPage + "&size=10&queryName=" + this
          .keywords).then(resp => {
          this.tableLoading = false;
          if (resp && resp.status == 200) {
            var data = resp.data.data;

            _this.midConfirms = data;
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

</style>
