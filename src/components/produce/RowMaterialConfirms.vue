<template>
        <div style="min-width: 600px;">
                <div style="display: inline;">
                  <el-input placeholder="通过名称搜索,记得回车哦..." clearable @change="confirmKeywordsChange"
                    style="width: 300px;margin: 0px;padding: 0px;" size="mini" :disabled="advanceSearchViewVisible"
                    @keyup.enter.native="searchConfirmData" prefix-icon="el-icon-search" v-model="confirmKewords">
                  </el-input>
                  <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search"
                    @click="searchConfirmData">搜索
                  </el-button>
                  <el-button size="mini" type="success" @click="initData" icon="el-icon-refresh"></el-button>
                </div>
                <el-table :data="confirms" :cell-style="{padding:'2px',fontSize:'12px'}" border style="width: 100%;" >
                  <el-table-column type="selection" align="left" v-loading="tableLoading" width="30">
                  </el-table-column>
                  <el-table-column prop="serialNumber" align="left" fixed label="采购单编号" width="120">
                  </el-table-column>
                  <el-table-column  align="left" fixed label="下发时间" width="140">
                    <template slot-scope="scope">
                      {{scope.row.planDate|formatDateTime}}
                    </template>
                  </el-table-column>
                  <el-table-column  align="left" fixed label="确认时间" width="140">
                    <template slot-scope="scope">
                      {{scope.row.createDate|formatDateTime}}
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" align="left" label="名称" width="120">
                  </el-table-column>
                  <el-table-column prop="specifications" align="left" label="规格" width="120">
                  </el-table-column>
                  <el-table-column prop="quantity" align="left" label="原料数量" width="120">
                  </el-table-column>
                  <el-table-column prop="practicalQuantity" align="left" label="确认数量" width="120">
                  </el-table-column>
                  <el-table-column prop="notes" align="left" label="备注" width="120">
                  </el-table-column>
                  <el-table-column prop="verifyStatus;" align="left" label="状态" :formatter="formatStatus" width="120">
                  </el-table-column>
                  <el-table-column align="left" label="操作" width="250">
                    <template slot-scope="scope">
                      <div style="margin-top: 10px;">
                        <el-button type="danger" v-if="scope.row.verifyStatus==1" style="padding: 3px 4px 3px 4px;margin: 2px" size="mini"
                          @click="cancelConfirm(scope.row)">撤销
                        </el-button>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
                <div style="display: flex;justify-content: flex-end;margin: 2px">
                  <el-pagination background :page-size="10" :pager-count="11" :current-page="confirmCurrentPage"
                    @current-change="currentConfirmChange" layout="prev, pager, next" :total="confirmTotalCount">
                  </el-pagination>
                </div>
              </div>
</template>
<script>
        import {
          Message
        } from 'element-ui'
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
              outRecive: {
                quantity: '',
                note: '',
                materialId: ''
              },
              dialogInTitle: '采购数量',
              dialogFormInVisible: false,
              activeName: 'material',
              confirmDialogTitle: '采购确认单',
              tempPlan: [],
              materialsReceives: [],
              confirms:[],
              nowMaterial: {
                quantity: '',
                notes: '',
                complete: '',
              },
              newMaterial: {
                name: '',
                specifications: '',
                quantity: '',
                unitName: '',
                notes: ''
              },
              tableLoading: false,
              confirmFormVisible: false,
              dialogVisible: false,
              showOrHidePop: false,
              depTextColor: '#c0c4cc',
              keywords: '',
              RecordKeywords: '',
              confirmKewords: '',
              tableLoading: false,
              advanceSearchViewVisible: false,
              rules: {
                materialName: [{
                  required: true,
                  message: '必填:原料名称',
                  trigger: 'blur'
                }],
                quantity: [{
                  required: true,
                  message: '必填:数量',
                  trigger: 'blur'
                }, {
                  validator: numbervalidate,
                  message: '数字格式错误',
                  trigger: 'blur'
                }],
                clientId: [{
                  required: true,
                  message: '必选:公司',
                  trigger: 'change'
                }],
                unitId: [{
                  required: true,
                  message: '必选:单位',
                  trigger: 'change'
                }]
              },
              materials: [],
              defaultProps: {
                label: 'name',
                isLeaf: 'leaf',
                children: 'child'
              },
              dialogTitle: '',
              currentPage: 1,
              confirmCurrentPage: 1,
 
              formLabelWidth: '120px',
              totalCount: -1,
              receiveTotalCount: -1,
              confirmTotalCount: -1,
              material: {
                materialName: '',
                unitId: '',
                specs: '',
              },
              clients: [],
              units: [],
              dialogTableVisible: false,
              dialogFormVisible: false,
              // currentRowData:{},//当前选中行数据
              currentIndex: '', //当前选中行号
              matriallist: []
            }
          },
          mounted: function () {
            this.initData();
           
          },
          
          methods: {
       
            formatStatus(row, column) {
              return row.verifyStatus == 1 ? '新建' : '已撤销';
            },
      
            searchConfirmData() {
              this.loadConfirmData();
            },
            //撤销采购确认单
            doDelete(row) {
              let that = this;
              this.getRequest("/rowPruchaseVerify/withdraw?id=" +
                row.id).then(resp => {
                if (resp && resp.status == 200) {
                  var data = resp.data;
                  that.loadConfirmData();
                }
              })
            },
          
      
            handleNodeClick(data) {
              this.material.supplier = data.name;
              this.material.clientId = data.id;
              this.pName = data.name;
              this.pId = data.id;
              this.showOrHidePop = false;
              this.depTextColor = '#606266';
            },
            clearChoose() {
              this.material.supplier = '';
              this.material.clientId = '';
            },
            cancelChoos() {
              console.log(this.pName);
              this.material.supplier = this.pName;
              this.material.clientId = this.pId;
            },
            initData() {
              var _this = this;
              _this.loadConfirmData();
             
            },
         
            confirmKeywordsChange(val) {
              if (val == '') {
                this.searchConfirmData();
              }
            },
            currentConfirmChange(currentChange) {
              this.confirmCurrentPage = currentChange;
              console.log(this.confirmCurrentPage);
              this.loadConfirmData();
            },
      
           
       
           
         
            cancelOptIn() {
              this.dialogFormInVisible = false;
              this.loadData();
            },
            cancelOpt() {
              this.dialogFormVisible = false;
              this.loadData();
              // this.emps[this.currentIndex] =this.currentRowData;
            },
            cancelConfirm(row) {
              this.$confirm('此操作将撤销该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.doDelete(row);
              }).catch(() => {});
            },
        
            
            loadConfirmData() {
              var _this = this;
              this.tableLoading = true;
              this.getRequest("/rowPruchaseVerify/findbypage?page=" + this.confirmCurrentPage + "&size=10&queryName=" +
                this.confirmKewords).then(resp => {
                  _this.tableLoading = false;
                if (resp && resp.status == 200) {
                  var data = resp.data.data;
                  _this.confirms = data;
                  _this.confirmTotalCount = resp.data.total;
               
                }
              })
            },
      
            emptyData() {
              console.log('+++++_+++++_')
              this.material = {
                materialName: '',
                standard: '',
                specs: '',
                materialNo: '',
                unitId: '',
                specifiCations: '',
                notes: '',
                quantity: ''
              }
            }
          },
      
          computed: {
            routes() {
            //   return this.$store.state.routes
            }
          }
        }
      </script>
      <style>
        .el-submenu .el-menu-item {
          width: 180px;
          min-width: 175px;
        }
      
        .el-table .warning-row {
          background: #e3e3e3ee;
        }
      
        .item {
          margin-top: 10px;
          margin-right: 40px;
        }
      
        .el-table .success-row {
          background: #ffffff;
        }
      </style>
