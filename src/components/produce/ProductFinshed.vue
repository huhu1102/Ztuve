<template>
  <!-- 成品库 -->
  <div>
    <div v-if="sendShow===1" >

    <div   style="padding: 0px;display:flex;justify-content:space-between;align-items: center">
      <div style="display: inline">
        <el-input
          placeholder="通过产品名搜索,记得回车哦..."
          clearable
          @change="keywordsChange"
          style="width: 300px;margin: 0;padding: 0;"
          size="mini"
          :disabled="advanceSearchViewVisible"
          @keyup.enter.native="searchEmp"
          prefix-icon="el-icon-search"
          v-model="keywords">
        </el-input>
        <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search" @click="searchEmp">搜索
        </el-button>
        <el-button size="mini" type="success" @click="initData" icon="el-icon-refresh"></el-button>
      </div>
      <div style="margin-left: 5px;margin-right: 20px;display: inline">
        <el-button type="primary" @click="addAndFlushData" size="mini" icon="el-icon-plus">添加</el-button>
      </div>
    </div>
      <el-table :data="productsList"
                fit highlight-current-row
                border

                :cell-style="{padding:'2px',fontSize:'12px'}"
                tooltip-effect="light"
                style="font-size:12px;width: 100%">
        <el-table-column
          align="left"
          prop="name"
          sortable
          label="客户">
          <template slot-scope="scope">
            <div v-if="scope.row.productionPlanDetails.salesPlan&&scope.row.productionPlanDetails.salesPlan.client">
              {{scope.row.productionPlanDetails.salesPlan.client.name}}
            </div>
            <div v-else>
              暂无
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="产品型号">
          <template slot-scope="scope">
            <div v-if="scope.row.product">
              {{scope.row.product.producteName}}
            </div>
            <div v-else>
              暂无
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          width="130"
          sortable
          prop="serialNumber"
          label="生产计划编号">
          <template slot-scope="scope">
            <div v-if="scope.row.productionPlanDetails">
              {{scope.row.productionPlanDetails.planNo}}
            </div>
            <div v-else>
              无编号
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="规格">
          <template slot-scope="scope">
            <div v-if="scope.row.productionPlanDetails.salesPlan&&scope.row.productionPlanDetails.salesPlan.specification">
              {{scope.row.productionPlanDetails.salesPlan.specification.name}}
            </div>
            <div v-else>
              暂无
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="颜色">
          <template slot-scope="scope">
            <div v-if="scope.row.productionPlanDetails.salesPlan&&scope.row.productionPlanDetails.salesPlan.color">
              {{scope.row.productionPlanDetails.salesPlan.color.name}}
            </div>
            <div v-else>
              暂无
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="库存/生产完成">
          <template slot-scope="scope">
            <div v-if="scope.row.productionPlanDetails">
              {{scope.row.productionPlanDetails.accomplishNO-scope.row.productionPlanDetails.sendQuantity}}/{{scope.row.productionPlanDetails.accomplishNO}}
            </div>
            <div v-else>
              暂无
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          sortable
          prop="shippingQuantity"
          label="已发货数量">
          <template slot-scope="scope">
            <div v-if="scope.row.productionPlanDetails&&scope.row.productionPlanDetails.sendQuantity">
              {{scope.row.productionPlanDetails.sendQuantity}}
            </div>
            <div v-else>
              暂未发货
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="proNumber"
          align="left"
          label="产品数量">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="left"
          label="备注">
          <template slot-scope="scope">
            {{scope.row.note==null?"无":scope.row.note}}
          </template>
        </el-table-column>

        <el-table-column
          align="left"
          label="操作"
        >
          <template slot-scope="scope">
            <el-tooltip content="发货" effect="light" placement="top">
            <span class="fa fa-truck" @click="sendLuggage(scope.$index,scope.row)"
                  style="padding: 3px 4px 3px 4px;margin: 2px;color: #2fc5da;" size="mini"></span>
            </el-tooltip>
            <el-tooltip content="查询发货记录" effect="light" placement="top"
            >
             <span class="fa fa-th-list" style="padding: 3px 4px 3px 4px;margin: 2px;color:#2fc5da;"
                   @click="showSendDetail(scope.row)">
          </span>
            </el-tooltip>

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


    <el-dialog v-dialogDrag :title="dialogTitle"
               style="padding: 0px;"
               :close-on-click-modal="false"
               :visible.sync="dialogFormVisible"
               @close="cancelOpt"
               width="500px">
      <div style="width: 100% " v-if="dialogFormVisible">
        <el-form :model="product" :rules="rules" ref="addEmpForm" size="sam" label-width="90px">
          <el-form-item label="产品名称:" prop="productId">
            <el-select v-model="product.productId" style="width: 200px" size="mini" placeholder="请选择职位">
              <el-option
                v-for="item in productes"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户:" prop="clientId">
            <el-popover
              v-model="showOrHidePop"
              placement="right"
              title="请选择公司"
              trigger="hover">
              <el-tree :data="shops" :default-expand-all="false" :props="defaultProps" :expand-on-click-node="false"
                       @node-click="handleNodeClick"></el-tree>
              <div slot="reference"
                   @click="showDepTree" v-bind:style="{color: depTextColor}">
                <el-input type="text" v-model="product.clientName" size="mini" clearable style="width: 200px"
                          @clear="clearChoose" @blur='cancelChoos'></el-input>
              </div>
            </el-popover>
          </el-form-item>
          <!-- proName: '',
          productId: '',
          proNumber: '',//数量
          clientName:'',
          note:'',
          clientId:'' -->
          <el-form-item label="产品数量:" prop="proNumber">
            <el-input prefix-icon="el-icon-edit" v-model="product.proNumber" size="mini" style="width: 200px"
                      placeholder="产品数量..."></el-input>
          </el-form-item>
          <el-form-item label="备注:" prop="note">
            <el-input prefix-icon="el-icon-edit" v-model="product.note" size="mini" style="width: 200px"
                      placeholder="备注..."></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="addEmp('addEmpForm')">确 定</el-button>
      </div>
    </el-dialog>
<!--      @loadData="loadData"-->
    <send-things
      @coloseSend="coloseSend"
      :clients="clients"
      @loadData="loadData"
     :current-manager-id="currentManagerId"
    :dialog-send-title="dialogSendTitle"
    :dialog-send-visible="dialogSendVisible">
<!--      :send-data="confirmData"-->
    </send-things>
    <sendView v-if="sendShow===2"
              :currentPlandetails="currentPlandetails"
              :currentVePage="currentVePage"
              :clients="clients"
              @loadeddata="loadData"
              @backMange="sendShowset"
              :plansRecord="plansRecord" >
    </sendView>
  </div>

</template>
<script>
  import SendThings from "../sale/send/ZtSendTemplete";
  import sendView from "../sale/send/SendRecord";
  export default {
    components: {SendThings,sendView},
    data() {
      return {
        plansRecord:[],
        currentPlandetails:[],
        currentVePage:1,
        sendShow:1,
        clients:[],
        productsList: [],
        dialogVisible: false,
        showOrHidePop: false,
        depTextColor: '#c0c4cc',
        keywords: '',
        tableLoading: false,
        advanceSearchViewVisible: false,
        rules: {
          productId: [{required: true, message: '必选:产品名称', trigger: 'change'}],
          proNumber: [{required: true, message: '必选:数量', trigger: 'blur'}]
        },
        products: [],
        defaultProps: {
          label: 'name',
          isLeaf: 'leaf',
          children: 'children'
        },
        dialogTitle: '',
        currentPage: 1,
        formLabelWidth: '120px',
        totalCount: -1,
        product: {
          proName: '',
          productId: '',
          proNumber: '',//数量
          clientName: '',
          note: '',
          clientId: ''
        },
        deps: [],
        posts: [],
        dialogTableVisible: false,
        dialogFormVisible: false,
        currentRowData: {},//当前选中行数据
        currentIndex: '',//当前选中行号
        pId: '',
        pName: '',
        // 发货*************************************

        dialogSendVisible:false,
        dialogSendTitle:'发货请求',
        currentManagerId:0,//当前选中的成品记录对应的生产管理Id；
      }
    },
    mounted: function () {
      this.initData();
      // this.formatGender(row);
    },
    methods: {
      sendShowset(...arg){
        console.log(...arg);
        this.sendShow=1;
      },
      //发货记录查询
      showSendDetail(plan) {
        let that = this;
        this.currentPlandetails=plan.productionPlanDetails;
        this.getRequest('/productionplandetails/findbyMangeId/'+plan.productionPlanDetails.id)
          .then(resp=> {
            if (resp && resp.status === 200) {
              console.log(resp.data);
              that.currentManagerId = resp.data;
              if(resp.data===0){
                that.$message({
                  message: '暂无数据,请稍后再试试',
                  type: 'info'
                });
              }else{
                that.getRequest('/shippingBill/findformanage?page='
                  + that.currentVePage
                  + "&size=10&productManageId="
                  +  that.currentManagerId).then(resp => {
                  if (resp && resp.status === 200 && resp.data.success) {
                    that.plansRecord = resp.data.data || [];
                    that.sendShow = 2;
                  } else {
                    that.$message({message: '错误！', type: 'errow'})
                  }
                })

              }
            } else {
              that.$message({
                message: '暂无数据,请稍后再试试',
                type: 'info'
              });
            }
          });



      },
      coloseSend(){
        this.dialogSendVisible=false;

      },

      sendLuggage(index,row){
        let that=this;
        this.getRequest('/productionplandetails/findbyMangeId/'+row.productionPlanDetails.id)
          .then(resp=> {
            if (resp && resp.status === 200) {
              console.log(resp.data);
              that.currentManagerId = resp.data;
              if(resp.data===0){
                that.$message({
                  message: '暂无数据,请稍后再试试',
                  type: 'info'
                });
              }else{
              that.dialogSendVisible=true;
              }
            } else {
              that.$message({
                message: '暂无数据,请稍后再试试',
                type: 'info'
              });
            }
          });


      },
      formatSex: function (row, column) {
        return row.gender == "1" ? '男' : row.gender == '2' ? '女' : '未知';
      },
      showDepTree() {
        this.showOrHidePop = !this.showOrHidePop;
      },
      handleNodeClick(data) {
        this.product.clientName = data.name;
        this.product.clientId = data.id;
        this.pId = data.id;
        this.pName = data.name;
        this.showOrHidePop = false;
        this.depTextColor = '#606266';
      },
      clearChoose() {
        this.product.clientName = '';
        this.product.clientId = '';
      },
      cancelChoos() {
        console.log(this.pName);
        this.product.clientName = this.pName;
        this.product.clientId = this.pId;
      },
      initData() {
        var _this = this;
        _this.loadData();
        this.getRequest("/finishedProduct/basedata").then(resp => {
          if (resp && resp.status == 200) {
            var data = resp.data.root;
            _this.clients =_this.toTree(data.clients);
            console.log(`this ${_this.clients}`);
            _this.products = data.pruducts;

          }
        })
      },
      toTree(data) {
        let result = []
        if (!Array.isArray(data)) {
          return result
        }
        data.forEach(item => {
          delete item.child;
        });
        let map = {};
        data.forEach(item => {
          map[item.id] = item;
        });
        data.forEach(item => {
          let parent = map[item.parentClientId];
          if (parent) {
            (parent.child || (parent.child = [])).push(item);
          } else {
            result.push(item);
          }
        });
        console.log(result);
        return result;
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
      addAndFlushData() {
        this.dialogTitle = "添加";
        this.emptyEmpData();
        this.dialogFormVisible = true;
      },

      searchEmp() {
        this.loadData();
      },
      showEditView(index, row) {
        this.dialogTitle = "编辑";
        console.log(row);
        console.log(index);
        this.product = row;
        this.currentRowData = JSON.parse(JSON.stringify(row));
        this.currentIndex = index;
        this.product.name = row.name;
        this.product.positionId = row.positionId;
        this.dialogFormVisible = true;
      },
      addEmp(addEmpForm) {
        this.dialogFormVisible = true;
        var _this = this;

        this.$refs[addEmpForm].validate((valid) => {
          if (valid) {
            // this.product.birthday=new Date(this.product.birthday);
            // this.product.entryDate=new Date(this.product.entryDate)
            if (this.product.id) {
              //更新
              this.tableLoading = true;
              console.log(this.product);
              // this.product.createDate=new Date(this.product.createDate)
              this.postRequest("/finishedProduct/add", this.product).then(resp => {
                _this.tableLoading = false;
                if (resp && resp.status == 200) {
                  // var data = resp.data;
                  _this.dialogFormVisible = false;
                  _this.loadData();
                  _this.emptyEmpData();

                }
              })
            } else {
              //添加
              this.tableLoading = true;
              console.log(_this.product);
              this.postRequest("/finishedProduct/add", this.product).then(resp => {
                _this.tableLoading = false;
                if (resp && resp.status == 200) {
                  var data = resp.data;
                  _this.dialogFormVisible = false;
                  _this.loadData();
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
        this.loadData();
        // this.emps[this.currentIndex] =this.currentRowData;
      },
      deleteData(row) {
        this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
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
        this.getRequest("/finishedProduct/delete?id=" + ids).then(resp => {
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
        this.getRequest("/finishedProduct/findbypage?page=" + this.currentPage + "&size=10&queryName=" + this.keywords).then(resp => {
          this.tableLoading = false;
          if (resp && resp.status == 200) {
            var data = resp.data.data;
            _this.productsList = data;
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
        this.product = {
          proName: '',
          productId: '',
          proNumber: '',//数量
          clientName: '',
          note: '',
          clientId: ''
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
