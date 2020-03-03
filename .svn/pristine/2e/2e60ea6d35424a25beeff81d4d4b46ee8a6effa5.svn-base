<template>
  <!--  生产完成记录页面-->
  <div>
    <el-container class="finish-record">
      <el-page-header style="padding: 16px;" @back="goManage">
        <div slot="content">
         <span style="font-size: 16px;">
           生产记录
         </span>
        </div>
      </el-page-header>
      <div class="detail-product">
        <el-table :data="planFinishRecord"
                  fit
                  border
                  cell-style="padding:2px;font-size:12px;"
                  :model="stepRecord"
                  :summary-method="getSummaries"
                  :show-summary="true"
                  style="width: 100%">
          <el-table-column
            label="顺序"
            cell-style="padding:2px;font-size:12px"
            type="index"
            width="80px"
          ></el-table-column>
          <el-table-column align="left" prop="createDate" sortable label="完成时间">
            <template slot-scope="scope">
              <span v-if="scope.row.id!=0">
                 {{ scope.row.createDate|formatDateTime}}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="qualifiedNo"
                           align="left"
                           sortable
                           label="完成总数量">
            <template slot-scope="scope">
              <el-input placeholder="请输入数量" v-show="scope.row.show"
                        min="0" step="1000"
                        type="number"
                        @change="readAcount"
                        v-model="scope.row.qualifiedNo"></el-input>
              <span v-show="!scope.row.show">{{scope.row.qualifiedNo}}</span>
            </template>
          </el-table-column>
          <el-table-column align="left" label="备注">
            <template slot-scope="scope">
              <el-input placeholder="请输入备注" v-show="scope.row.show"
                        @change="readNote"
                        v-model="scope.row.notes"></el-input>
              <span v-show="!scope.row.show">{{scope.row.notes}}</span>
            </template>
          </el-table-column>
          <el-table-column align="left" label="操作">
            <template slot-scope="scope">
              <div style="margin-top: 10px;">
                <tooltip content="编辑">
                  <span class="fa fa-pencil opt-color" @click="editDetails(scope.$index,scope.row)"></span>
                </tooltip>
                <tooltip content="保存">
                  <span class="fa fa-save opt-color" @click="finishSave(scope.$index, scope.row)"></span>
                </tooltip>
                <tooltip content="删除">
                  <span class="fa fa-trash del-color" @click="deleteDetails(scope.$index,scope.row)"></span>
                </tooltip>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- 生产进度详情分页组件  该组件不需要-->
        <div style="display: flex;justify-content: flex-end;margin: 2px;">
          <el-pagination background :page-size="10" :pager-count="11" :current-page="currentFinishPage"
                         @current-change="currentfinishChange" layout="prev, pager, next" :total="totalFinishCount">
          </el-pagination>
        </div>
      </div>
    </el-container>
  </div>
</template>
<script>
  export default {
    name: 'manage-sendrecord',
    props: {
      proDetial: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        totalFinishCount: -1,
        currentFinishPage: 1,
        planFinishRecord: [],
        startDate:'',
        endDate:'',
        stepRecord: {
          id: 0,
          plant: '装配车间',
          qualifiedNo: '',//生产数量
          junkedNo: 0,//报废数
          unitsId: 1,//单位
          notes: '',//备注
        },
      }
    },
    mounted() {
      this.initData();

    },
    methods: {
      readAcount(e) {
        this.stepRecord.qualifiedNo = e;
      },
      readNote(e) {
        this.stepRecord.notes = e;
      },
      getSummaries(param) {
        const {columns, data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总量';
            return;
          }
          if (column.property === "createDate") {
            sums[index] = 'N/A';
            return;
          }
          console.log(column.property === "createDate");
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          } else {
            sums[index] = 'N/A';
          }
        });

        return sums;
      },
      // setp(id,plant,qualifiedNo,junkedNo,unitsId,notes,createDate){
      //   this.id=id;
      //   this.plant=plant;
      //   this.qualifiedNo=qualifiedNo;
      //   this.junkedNo=junkedNo;
      //   this.unitsId=unitsId;
      //   this.notes=notes;
      //   this.createDate=createDate
      // },
      initData() {
        this.showFinishDetail()
      },
      currentfinishChange(page) {
        this.currentFinishPage = page;
        this.showFinishDetail();
      },
      showFinishDetail() {
        let self = this;
        this.getRequest("/pmDetails/findByMangeId?manageId="
          + this.proDetial.id
          + "&page=" + this.currentFinishPage
          + "&size=10"
          + "&start="+this.startDate
          + "&end="+this.endDate
        ).then(
          resp => {
            if (resp && resp.status === 200 && resp.data.success) {
              self.planFinishRecord = resp.data.data || [];
              self.planFinishRecord.unshift({
                id: 0,
                plant: '装配车间',
                qualifiedNo: '',//生产数量
                junkedNo: 0,//报废数
                unitsId: 1,//单位
                notes: '',//备注
              });
              self.updataData();
              this.totalFinishCount = resp.data.total;
            } else {
              self.$message({message: '查询失败', type: 'info'})
            }
          }
        )

      },
      updataData() {
        this.planFinishRecord.map(item => {
          item.show = false;
        })
      },
      editDetails(index, row) {
        console.log("index" + index)
        console.log("row" + row)
        if (row.id !== 0) {
          this.stepRecord.id = row.id;
          this.stepRecord.qualifiedNo = row.qualifiedNo;
          this.stepRecord.junkedNo = row.junkedNo;
          this.stepRecord.unitsId = row.unitsId === null ? 1 : row.unitsId
          this.stepRecord.notes = row.notes == null ? "" : row.notes;
        }
        // this.$set(row,'show',true);
        this.updataData();
        row.show = true;
        this.planFinishRecord.splice(index, 1, row);
      },
      deleteDetails(index,row) {

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
        this.getRequest("/pmDetails/deleteFinish?manageDetailsId=" + ids).then(resp => {
          _this.tableLoading = false;
          if (resp && resp.status === 200) {
            var data = resp.data;
            _this.loadData();
            _this.showFinishDetail();
          }
        })
      },
      finishSave(index, row) {
        let that = this;
        let manageId = this.proDetial.id;
        let param = this.stepRecord;

        if (row.id != 0) {
          that.postRequest("/pmDetails/updateFinish?manageId=" + manageId, param).then(resp => {
            if (resp && resp.status === 200 && resp.data.success) {
              that.showFinishDetail();
              that.cancelUpdate();
              that.loadData();
            }
          })
        } else {
          that.postRequest("/pmDetails/addFinish?manageId=" + manageId, param).then(resp => {
            if (resp && resp.status === 200 && resp.data.success) {
              that.showFinishDetail();
              that.cancelUpdate();
              that.loadData();
            }
          })
        }
        row.show = false;
        this.planFinishRecord.splice(index, 1, row);
      },
      cancelUpdate() {
        this.stepRecord = {
          id: 0,
          plant: '装配车间',
          qualifiedNo: '',//生产数量
          junkedNo: 0,//报废数
          unitsId: 1,//单位
          notes: '',//备注
        }
      },
      loadData(){
        this.$emit('loadData')
      },
      goManage() {
        this.$emit('finishBack')
      }
    },
  }


</script>
<style scoped>
  .finish-record {
    min-height: 980px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;

  }

  .opt-color {
    color: #2fc5da;
    cursor: pointer;
    margin-left: 10px;
  }

  .del-color {
    color: red;
    margin-left: 10px;
    cursor: pointer;
  }
</style>
