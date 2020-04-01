<!--合同管理-->
<template>
  <div>
    <el-container>
      <el-header class="new-contact">
        <div style=" text-align:left; ">
          <strong>合同管理</strong>
          <el-button type="primary" size="mini" v-show="tap===2" @click="addNewContact"> 新增</el-button>
          <el-button type="primary" size="mini" v-show="tap===1" @click="tap=2"> 返回</el-button>
        </div>
        <!--        <div style="text-align: left;margin-left: 20px;">-->
        <!--          <div class="fa fa-list-ul" :class="{stamp:tap===2}" @click="tap=2" style="cursor: pointer;">-->
        <!--            列表展示-->
        <!--          </div>-->
        <!--          <div class="fa fa-window-restore" :class="{stamp:tap===1}" @click="tap=1" style="margin-left: 30px;cursor: pointer;">产品分类（用途）-->
        <!--          </div>-->
        <!--        </div>-->
      </el-header>
      <el-container style="display: flex;flex-direction: column;" v-show="tap===2">
        <div style="height: 30px;margin: 0 20px;display: flex;flex-direction: row;justify-content: space-between;">
          <div style="display: inline">
            <el-input
              placeholder="通过名称搜索,记得回车哦..."
              clearable
              @change="keywordsChange"
              style="width: 300px;margin: 0;padding: 0;"
              size="mini"
              :disabled="advanceSearchViewVisible"
              @keyup.enter.native="searchEmp"
              prefix-icon="el-icon-search"
              v-model="keywords">
            </el-input>
            <el-button type="primary" size="mini" class="send-head-left-btn" icon="el-icon-search" @click="searchEmp">搜索
            </el-button>
            <el-button slot="reference" type="primary" size="mini" class="send-head-right-btn"
                       @click="showAdvanceSearchView"><i
              class="fa fa-lg send-head-left-btn"
              v-bind:class="[advanceSearchViewVisible ? faangledoubleup:faangledoubledown]"
            ></i>高级搜索
            </el-button>

          </div>
          <div style="margin-left: 5px;margin-right: 20px;display: inline">

          </div>
        </div>
        <el-main>
          <transition name="slide-fade">
            <div class="send-main-div"
                 v-show="advanceSearchViewVisible">
              <el-row>
                <el-col :span='6'>
                  合同名称:
                  <el-input prefix-icon="el-icon-edit" v-model="keywords" size="mini" class="send-input"
                            placeholder="合同名。。。">
                  </el-input>
                </el-col>
                <el-col :span='6'>
                  合同编号:
                  <el-input prefix-icon="el-icon-edit" v-model="keyContractNumber" size="mini" class="send-input"
                            placeholder="合同编号。。。">
                  </el-input>
                </el-col>
                <el-col :span='6'>
                  类型:
                  <!--                  <el-input prefix-icon="el-icon-edit" v-model="keyType" size="mini" style="width: 200px"-->
                  <!--                            placeholder="合同类型。。。">-->
                  <!--                  </el-input>-->
                </el-col>
              </el-row>
              <el-row style="margin-top: 10px;display: flex;justify-content: flex-end;">
                <el-col :span="5" :offset="4">
                  <el-button size="mini" @click="advanceSearchViewVisible=false">取消</el-button>
                  <el-button icon="el-icon-search" type="primary" size="mini" @click="searchEmp">搜索</el-button>
                </el-col>
              </el-row>
            </div>
          </transition>
          <el-table

            highlight-current-row
            :cell-style="{padding:'2px',fontSize:'12px'}"
            fit :data="contactList"
            style=" width: 100%;border: 1px solid #F7F7F7"
          >
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
              label="合同号"
            >
            </el-table-column>
            <el-table-column
              prop="contractName"
              align="left"
              fixed
              label="客户名称"
            >
            </el-table-column>
            <el-table-column
              prop="contractNumber"
              align="left"
              label="合同金额"
            >
            </el-table-column>

            <el-table-column
              prop="qualityDeposit"

              align="left"
              label="签订时间">
            </el-table-column>
            <el-table-column
              prop="type"

              align="left"
              label="合同内容">
            </el-table-column>
            <el-table-column
              prop="totalMoney"

              align="left"
              label="合同进度">
            </el-table-column>
            <el-table-column
              prop="signContractDate"

              align="left"
              label="质保状态">
              <template slot-scope="scope">
                <div>
                  {{signContractDate|formatDateTime}}
                </div>
              </template>
            </el-table-column>

            <el-table-column
              align="left"
              label="操作"
              fixed="right"
            >
              <template slot-scope="scope">
                <span @click="showDetails(scope.$index,scope.row)" style="padding: 3px 4px 3px 4px;margin: 2px"
                      size="mini">编辑
                </span>
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
        </el-main>
      </el-container>
      <!--  添加合同 -->
      <el-container v-show="tap===1" class="new-contact">

        <div class="contract-left">
          <el-form ref="form" size="mini" :model="form" label-width="80px" style="text-align: left;padding-left: 20px;">
            <el-form-item>
              <span> 合同详情:</span>
            </el-form-item>
            <el-form-item label="订单:">

              <a herf="#" @click="chooseProduct">选择订单</a>
            </el-form-item>
            <el-form-item label="序号:">
              <el-input size="mini" class="cantract-input" v-model="form.sequence"></el-input>
            </el-form-item>
            <el-form-item label="编号:">
              <el-input class="cantract-input" v-model="form.contractNumber"></el-input>
            </el-form-item>
            <el-form-item label="名称:">
              <el-input class="cantract-input" v-model="form.contractName"></el-input>
            </el-form-item>
            <el-form-item label="客户:">
              <el-input class="cantract-input" v-model="form.clientName"></el-input>
            </el-form-item>
            <el-form-item size="mini" label="金额:">
              <el-input class="cantract-input" size="mini" style="height: 28px;" v-model="form.totalMoney"></el-input>
            </el-form-item>
            <el-form-item label="时间:">
              <el-date-picker class="cantract-input"
                              v-model="form.signContractDate"
                              type="datetime"
                              placeholder="选择签订时间"
                              align="right"
                              :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="备注:">
              <el-input class="cantract-input" type="textarea" v-model="form.notes"></el-input>
            </el-form-item>
            <el-form-item label="进度:">
              <span @click="updateContact"><a herf="#">{{progressMsg}}</a></span>
              <!--            <el-radio-group v-model="form.speed">&ndash;&gt;-->
              <!--              <el-radio label="正在办"></el-radio>-->
              <!--              <el-radio label="办理完"></el-radio>-->
              <!--            </el-radio-group>-->
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="createContract">立即创建</el-button>
              <el-button size="mini">取消</el-button>
            </el-form-item>


          </el-form>
        </div>
        <span v-show="!orderShow" class="fa fa-angle-double-right" @click="packup">
          </span>
        <div v-show="orderShow" style="display: flex;flex-direction: row;justify-content: flex-start;">
          <div class="contract-mid">
            <span class="fa fa-angle-double-left" @click="packup"> </span> 订单列表

            <el-table height="450px"
                      :highlight-current-row="true"
                      id="contractTableId"
                      style="font-size: 12px;"
                      @cell-click="orderListClick"
                      @current-change="handleCurrentChange"
                      :data="orderList">
              <el-table-column label="订单号">
                <template slot-scope="scope">{{ scope.row.orderNo}}</template>
              </el-table-column>
              <el-table-column label="客户">
                <template slot-scope="scope">
                  {{ scope.row.cliente.parentName}}
                  -{{ scope.row.cliente.name}}
                </template>
              </el-table-column>
            </el-table>
            <el-button style="margin-top: 10px;" size="mini" type="primary" @click="chooseProcut">
              添加订单
            </el-button>
          </div>
          <!--        v-show="contractDetailShow"-->

        </div >
        <span v-show="!orderlistsShow" class="fa fa-angle-double-right" @click="listPackup">
         </span>
        <div v-show="orderlistsShow" class="contract-right">
           <span v-show="orderlistsShow" class="fa fa-angle-double-left" @click="listPackup"> 生产计划
           </span>
          <el-table :data="prePlans"
                    highlight-current-row
                    height="450px"
                    ref="orderTable"
                    @selection-change="handleSelectionChange"
                    style="font-size: 12px;height: auto;">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column label="计划号" width="140">
              <template slot-scope="scope">{{ scope.row.planNo}}</template>
            </el-table-column>
            <el-table-column label="客户1"  width="140">
              <template slot-scope="scope" >
                <span v-if="scope.row&&scope.row.salesPlan">
               {{scope.row.salesPlan.client.parentName}} - {{scope.row.salesPlan.client.name}}
                </span>
                <span v-else>
                  暂无
                </span>
              </template>
            </el-table-column>
            <el-table-column label="数量">
              <template slot-scope="scope">{{ scope.row.actualQuantity}}枚</template>
            </el-table-column>
            <el-table-column label="产品">
              <template slot-scope="scope">
                <span v-if="scope.row.salesPlan&&scope.row.salesPlan.productName">
                {{ scope.row.salesPlan.productName}}
                </span>
                <span v-if="scope.row&&scope.row.salesPlan">
                {{ scope.row.salesPlan.color.name}}
                </span>
              </template>
            </el-table-column>-
            <el-table-column label="下发时间">
              <template slot-scope="scope">{{ scope.row.createDate|formatDateTime}}</template>
            </el-table-column>
            <el-table-column label="备注">
              <template slot-scope="scope">{{ scope.row.note}}</template>
            </el-table-column>
            <el-table-column label="实际数量" width="120">
              <template slot-scope="scope">
                <el-input size="mini"  v-model="scope.row.actualCount"  type="primary"></el-input>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin-top: 8px; display: inline-flex;flex-direction: row;">

            <el-input autosize size="mini" placeholder="请输入备注" style="width: 200px;" type="textarea"
                      v-model="orderListNote"></el-input>
            <el-button size="mini" @click="createOrderforConctract" >创建订单</el-button>
            <el-button size="mini" @click="cancelAddOrders">取消</el-button>

          </div>
        </div>
        <div v-show="orderDetailShow" class="contract-right">
           <span> 订单详情
<!--             class="fa fa-angle1-double-left" @click="listPackup-->
           </span>
           <el-form  size="mini" style="text-align: left;"  label-width="120px" :model="orderMode">
              <el-form-item label="订单编号:">
                  {{orderMode.orderNo}}
              </el-form-item>
             <el-form-item label="客户:">
               <el-select v-model="orderMode.cliId"  class="product-input-btn-class" size="mini"
                          placeholder="请重新选择客户">
                 <el-option
                   v-for="item in clients"
                   :key="item.id"
                   :label="item.name"
                   :value="item.id">
                 </el-option>
               </el-select>{{orderMode.parentName}}

             </el-form-item>
             <el-form-item label="备注:">
               <span>{{orderMode.notes}}</span>
             </el-form-item>
           </el-form>
             <div style="text-align: left;font-size: 12px;">
               生产计划
             </div>
               <el-table size="mini" height="290px" :data="orderPlanslist" >
                 <el-table-column label="计划号"
                                  prop="resourcesNumber"
                 >
                 </el-table-column>
                 <el-table-column label="客户" >
                   <template slot-scope="scope">
                    <span> {{scope.row.productionPlanDetails.salesPlan.client.name}}</span>
                   </template>
                 </el-table-column>
                 <el-table-column label="产品型号">
                   <template slot-scope="scope">
                   <span> {{scope.row.productionPlanDetails.salesPlan.product.producteName}}
                   -
                   {{scope.row.productionPlanDetails.salesPlan.color.name}}</span>
                   </template>
                 </el-table-column>
                 <el-table-column label="数量">
                   <template slot-scope="scope">
                <span> {{scope.row.productNo}}</span>
                   </template>
                 </el-table-column>

                 <el-table-column label="计划时间">
                   <template slot-scope="scope">
                   <span> {{scope.row.createDate|formatDate}}</span>
                   </template>
                 </el-table-column>
                 <el-table-column label="备注">
                   <template slot-scope="scope">
                   <span> {{scope.row.remarks}}</span>
                   </template>
                 </el-table-column>
               </el-table>
          <div style="margin-top: 8px; display: inline-flex;flex-direction: row;">
            <el-button size="mini" type="primary" @click="">确定</el-button>
            <el-button size="mini"type="primary" @click="">修改</el-button>
            <el-button size="mini"  @click="orderDetailShow=false" >取消</el-button>
          </div>
        </div>
      </el-container>
    </el-container>
    <!--    合同进度添加 -->
    <el-dialog
      v-dialog-drag :title="contentTitle" style="padding: 0px;" :close-on-click-modal="false"
      :visible.sync="contentVisible" @close="cancelcontent" width="850px">
      <div class="detail-product">
        <div class="code-class"
             v-model="codeProcess">
          <div class="code-class-item" v-for="(item,index) in codeList"
               :key="'codelist'+index"
               @click="currentProcess(index,item)"
               @dblclick="codedbclick(item,index)">
            <div class="code-class-item-name">
              {{item.codeName}}
            </div>
            <div class="top-tip-top" v-show="item.codeTopShow" @click="deleteCode(index,item)">x</div>

          </div>
          <div
            class="code-class-item code-add-class">
            <el-input
              v-model="fastCodeName"
              size="mini"
              placeholder="添加进度词典。。。"
              @keyup.enter.native="fastAddCode">
              <template slot="prepend">+</template>
            </el-input>
          </div>
        </div>

        <div class="schedu-class">
          <el-form size="mini" ref="scheduleForm" class="schedu-form-class"
                   v-model="ContractSchedule" label-width="90px">
            <el-form-item label="进度:">
              <span> {{ ContractSchedule.codeName}}</span>
            </el-form-item>
            <el-form-item label="状态:">
              <el-radio-group v-model="ContractSchedule.state" @change="changeCodeState">
                <el-radio v-for="(item,index) in codeStates" :label="item.name"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="人员:">
              <el-select
                size="mini"
                class="product-input-btn-class"
                @change="fastCodeChange"
                v-model="ContractSchedule.epmId"
                placeholder="请选择操作人">
                <el-option
                  v-for="item in emps"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注:">
              <el-input type="textarea" placeholder="请输入备注"
                        @change="readcodeNote"
                        style="width: 200px"
                        autosize resize autofocus clearable
                        v-model="ContractSchedule.note"></el-input>
            </el-form-item>
            <el-form-item label="时间:">
              <span>{{ContractSchedule.createDate|formatDateTime}}</span>
            </el-form-item>
          </el-form>
        </div>
        <div style="display:flex; flex-direction: row;justify-content: center;">
          <el-button size="mini" type="primary" @click="cancelcontent">取消</el-button>
          <el-button size="mini" type="primary" @click="submitContactProgress">确定</el-button>
        </div>
      </div>
    </el-dialog>
    <!--    添加生产计划-->
    <!--    <el-dialog-->
    <!--      v-dialog-drag :title="" :close-on-click-modal="false"-->
    <!--      :visible.sync="" @close="" width="850px">-->
    <!--    </el-dialog>-->
  </div>
</template>
<script>
  import ElSlPanel from "element-ui/packages/color-picker/src/components/sv-panel";

  export default {
    components: {ElSlPanel},
    data() {

      let phonevalidate = (rule, value, callback) => {
        //后台方法
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (reg.test(value)) {
          callback()
        } else {
          callback("电话号码格式错误!")

        }
      };
      return {
        currentSelected:[],
        orderDetailShow:false,
        orderShow: true,
        orderlistsShow: false,
        productShow: false,
        orderList: [],
        prePlans: [],
        emps: [],
        //进度名列表
        codeList: [],
        innerVisible: false,
        codeModel: {
          id: '',
          codeName: '',
          createDate: '',
          state: '进行中',
          note: '',
          empId: '',
          empName: '',
          show: false,
        },

        coderules: {
          codeName: [{required: true, message: '必填:中文名', trigger: 'blur'}],
        },
        keyContractNumber: '',
        // 编辑合同进度
        ContractSchedule: {
          id: 0,
          codeName: '',
          note: '',
          epmId: '',
          contractCodeId: 0,
          createDate: new Date(),
        },
        contentVisible: false,
        contentTitle: '',
        contentCodeRecord: [],
        // 上传文件列表
        fileList: [
          {
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          },
          {
            name: 'food2.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          }
        ],
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        form: {
          sequence: '',
          contractName: '',
          contractNumber: '',
          clientName: '',
          totalMoney: '',
          signContractDacodeListte: '',
          notes: '',
          speed: '',
        },
        depItems: [],
        dialogVisible: false,
        showOrHidePop: false,
        depTextColor: '#c0c4cc',
        keywords: '',
        currentTreeData: '',
        currentTreeIds: [],
        rules: {
          name: [{required: true, message: '必填:姓名', trigger: 'blur'}],
        },

        defaultProps: {
          label: 'name',
          isLeaf: 'leaf',
          children: 'children'
        },
        dialogTitle: '',
        currentPage: 1,
        formLabelWidth: '120px',
        totalCount: -1,

        deps: [],
        posts: [],
        dialogTableVisible: false,
        dialogFormVisible: false,
        currentRowData: {},//当前选中行数据
        currentIndex: '',//当前选中行号
        //搜索
        advanceSearchViewVisible: false,
        faangledoubleup: 'fa-angle-double-up',
        faangledoubledown: 'fa-angle-double-down',
        clientName: '',
        keyempName: '',
        keydep: '',
        tap: 2,
        //
        createDateStart: '',
        createDateEnd: '',
        startDateStart: '',
        startDateEnd: '',
        endDateStart: '',
        endDateEnd: '',
        contactStatus: '',
        contactList: [],
        contact: {
          contractName: '',//合同名称
          contractNumber: '',//合同编号
          qualityDeposit: '',//质保金
          type: '',//合同类型
          totalMoney: '',//总金额
          signContractDate: '',//签约时间
          startDate: '',//开始时间
          endDate: '',//截止时间
          notes: '',//备注
          uploadName: '',//附件名字
          imageUrl: '',//附件url
        },
        tableLoading: false,
        orderMode:{
          orderNo:'N0000-01',
          cliId:1,

        },
        clients:[],
        codeProcess: [],
        // 快速添加字典字段
        dialogCodeAddVisible: false,
        fastCodeName: '',
        fastcodeShow: false,
        progressMsg: '请更新合同进度',
        contractDetailShow: false,
        orderListNote: '',
        orderPlanslist:[],
        // 生成订单的备注
        codeStates: [
          {
            name: '进行中',
            code: '1'
          },
          {
            name: "已完成",
            code: "2"
          },
          {
            name: "下一步",
            code: '3'
          }
        ]
      }
    },
    mounted: function () {
      this.initData();
    },
    methods: {
      createOrderforConctract(){
      // var s=  this.$refs.orderTable.getSelected();
      //  console.log(s);
       let _this=this;
       var  nowArr=this.currentSelected;
       var postData={
         orderDetails:'',
         note:this.orderListNote,
       }
       this.postRequest('/orders/addnew',postData).then(resp=>{
           if(resp && resp.status === 200 && resp.data.success){

           }

       })
      },
      handleSelectionChange(value){
        console.log(value);
        this.currentSelected=value;
      },
      //选择了订单
      handleCurrentChange(e) {

      },
      listPackup() {
        this.orderlistsShow = !this.orderlistsShow;
      },
      packup() {
        this.orderShow = !this.orderShow;
      },
      chooseProduct() {
        this.orderShow = !this.orderShow;
        this.orderlistsShow = !this.orderlistsShow;

        // if(!this.orderShow){
        //   this.getRequest("/productionplandetails/find")
        // }
      },
      chooseProcut() {
        let _this=this;
        this.getRequest("/productionplandetails/find").then(resp=>{
          if (resp && resp.status === 200 && resp.data.success){
                    let data=resp.data.data;
                    console.log(data);
            _this.orderlistsShow = true;
            _this.orderShow=false;
            _this.orderDetailShow=false;

          }else{
            _this.$message("请重试！")
          }
            })
      },
      cancelAddOrders(){
        this.orderlistsShow = false;
        this.orderShow=true;
      },

      // 快速添加code字典值
      fastAddCode() {
        let _this = this;
        if (this.fastCodeName === '') {
          return false;
        }
        var codeObject = {
          codeName: this.fastCodeName,
          createDate: new Date()
        };
        this.postRequest("/contractcode/add", codeObject).then(resp => {
          if (resp && resp.status === 200 && resp.data.success) {

            // _this.innerVisible = false;
            this.fastCodeName = '';
            this.fastcodeShow = false;
            _this.loadAllCode();
          } else {
            this.Message("添加失败 ，请重试")
          }
        });
      },
      codedbclick(item, index) {
        // this.$message('这是一条消息提示');
        item.codeTopShow = !item.codeTopShow;
        this.codeList.splice(index, 1, item);
      },
      changeCodeState(se) {
        console.log(se);
        // this.codeModel.state=se=="进行中"?1:se=="已完成"?2:"下一步";
      },
      handleClose() {

      },
      //选择进度 步骤
      currentProcess(index, item) {
        let that = this;
        console.log(index, item);
        var empId = this.$store.state.user.empId;
        this.ContractSchedule = {
          id: 0,
          codeName: item.codeName,
          state: "进行中",
          note: '',
          epmId: empId,
          contractCodeId: item.id,
          createDate: new Date(),
        }
      },

      //选择操作人；
      fastCodeChange(e) {
        console.log(e);
        this.ContractSchedule.empId = e;
      },
      submitContactProgress() {
        let that = this;
        console.log(this.ContractSchedule.empId);

        if (this.ContractSchedule.empId === undefined || this.ContractSchedule.empId === '' || this.ContractSchedule.empId === 0) {
          this.$message({
            type: 'info',
            message: '请选择用操作人'

          });
          return false;
        }

        var msg =
          this.ContractSchedule.codeName +
          this.ContractSchedule.state +
          this.ContractSchedule.note;
        this.$confirm('当前编辑的信息为' + msg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.progressMsg = this.ContractSchedule.codeName +
            this.ContractSchedule.state;

          // that.ContractSchedule.state = that.ContractSchedule.state == "进行中" ? 1 :
          //   that.ContractSchedule.state == "已完成" ? 2 : 3;
          that.contentVisible = false;
          //在整个合同提交时 将 model中的数据初始化；
          // that.addNewProgress(that.codeModel);
        }).catch(() => {
          this.$message('请重试 ^_^---||！');
        });
      },
      //保存
      // addNewProgress(model){
      //   this.
      // },


      readcodeNote(e, row, l) {
        console.log(e);
        console.log(row);
        console.log(l);
      },
      // 编辑进度备注
      editCodeProgress(row, column, cell, event, index) {
        console.log(row);
        console.log(column);
        console.log(cell);
        console.log(event);
        row.show = true;
        // this.contentCodeRecord.splice(index,1,row);
      },
      finishcodeSave(index, row) {
        console.log(row);
        row.show = false;
        this.contentCodeRecord.splice(index, 1, row);
      },
      andSNewCode() {
        this.fastcodeShow = !this.fastcodeShow;
        if (this.fastcodeShow) {
          this.fastCodeName = '';
        }
        //加载所有进度名称
        // this.loadAllCode();

      },
      loadAllCode() {
        let _this = this;
        _this.getRequest("/contractcode/findAll").then(resp => {
          if (resp && resp.status === 200 && resp.data.success) {
            let data = resp.data;
            console.log("codeList" + resp.data);
            _this.codeList = data.data || []
            _this.codeList.forEach(item => {
              item.codeTopShow = false;
            })

          }
        })
      },
      //进度字典新增进度名称
      andSpeed() {
        let _this = this;
        if (this.codeModel.name == '') {
          return;
        }
        let contractCode = {
          codeName: this.codeModel.name,
        };
        if (this.codeModel.id > 0) {
          contractCode.id = this.codeModel.id;
          contractCode.createDate = this.codeModel.createDate;
        }

        this.postRequest("/contractcode/add", contractCode).then(resp => {
          if (resp && resp.status === 200 && resp.data.success) {

            // _this.innerVisible = false;
            _this.codeModel.codeName = '';
            _this.codeModel.id = 0;
            _this.codeModel.createDate = '';

            _this.loadAllCode();

          } else {
            this.Message("添加失败 ，请重试")
          }
        })


      },
      //编辑
      editCode(index, row) {
        console.log('edit')
        this.codeModel.codeName = row.codeName;
        this.codeModel.id = row.id;
        this.codeModel.createDate = row.createDate;
      },
      //保存
      finishSave() {

      },
      // 字典删除
      deleteCode(index, row) {
        let that = this;
        this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.doDeletecode(row.id);
        }).catch(() => {
        });
      },
      doDeletecode(ids) {
        this.tableLoading = true;
        var _this = this;
        this.getRequest("/contractcode/delete?id=" + ids).then(resp => {
          _this.tableLoading = false;
          if (resp && resp.status == 200) {
            _this.codeModel.codeName = '';
            _this.loadAllCode();

          }
        })
      },
      //合同新建方法
      createContract() {

      },
      // 更新合同進度  查询到后台1. 该合同对应的进度 
      updateContact() {
        let _this = this;
        this.contentTitle = "更新合同进度";
        _this.getRequest("/contractcode/findAll").then(resp => {
          if (resp && resp.status === 200 && resp.data.success) {
            let data = resp.data;
            console.log("codeList" + resp.data);
            // _this.nations = data.nations;
            _this.codeList = data.data || [];
            // _this.contentCodeRecord = [];
            //   for (let i = 0; i <_this.codeList.length ; i++) {
            //     _this.contentCodeRecord.push({
            //       codeName:_this.codeList[i].codeName,
            //       createDate:new Date()
            //     });
            // }
            this.contentVisible = true;
          }
        })
        // this.getRequest("/contractSchedule/findAll?id=" + ids).then(resp=> {
        //   _this.tableLoading = false;
        //   if (resp && resp.status == 200) {
        //     _this.codeModel.codeName='';
        //
        //
        //   }
        // })
        //
      },
      cancelcontent() {
        this.contentVisible = false;
      },
      //新增合同方法  该方法要求 在新增加合同时同时新建立订单
      addNewContact() {
        let _this = this;
        this.tap = 1;
        console.log('1');
        //获取生产计划数据
        _this.getRequest("/contract/basicdata").then(resp => {
          if (resp && resp.status === 200 && resp.data.success) {
            let data = resp.data;
            _this.emps = data.root.employee;
            _this.clients = data.root.clients;

            _this.orderList = data.root.orderList;
          }
        })

      },
      //***********  合同附件上传
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
      },
      //**************************

      showAdvanceSearchView() {
        this.advanceSearchViewVisible = !this.advanceSearchViewVisible;
        this.keywords = '';
        if (!this.advanceSearchViewVisible) {
          this.emptyEmpData();
          this.loadContact();
        }
      },
      cancelSearch() {
        this.advanceSearchViewVisible = false;
        this.emptyEmpData();
        this.loadContact();
      },
      formatSex: function (row, column) {
        return row.gender === 1 ? '男' : row.gender === 2 ? '女' : '未知';
      },
      showDepTree() {
        this.showOrHidePop = !this.showOrHidePop;
      },
      handleNodeClick(data) {
        let that = this;
        let nodes = this.$refs.deptTree.getCheckedNodes() || [];
        console.log(nodes);
        this.currentTreeIds = [];
        that.employee.departmentName = '';
        for (let i = 0; i <= nodes.length - 1; i++) {
          if (that.employee.departmentName === '') {
            that.employee.departmentName = nodes[i].name;
          } else {
            that.employee.departmentName = that.employee.departmentName + "," + nodes[i].name;
          }
          that.currentTreeIds.push(nodes[i].id)
        }
        ;
        this.depTextColor = '#606266';
      },
      getDeptTreeData() {
        let _this = this;
        let allnodes = this.$refs.deptTree.getCheckedNodes() || [];
        console.log(allnodes);
        this.currentTreeData = '';
        this.currentTreeIds = [];
        allnodes.forEach(function (value) {
          _this.currentTreeIds.push(value.id);
          _this.currentTreeData += value.name + ",";
        });
        this.employee.departmentName = _this.currentTreeData;
      },
      initData() {
        let _this = this;
        _this.loadContact();
        _this.getBaseData();
      },

      getBaseData() {
        let _this = this;
        _this.getRequest("/contract/basicdata").then(resp => {
          if (resp && resp.status === 200 && resp.data.success) {
            let data = resp.data;
            _this.emps = data.root.employee;
            _this. prePlans= data.root.prePlans;

          }
        })
      },
      keywordsChange(val) {
        if (val === '') {
          this.loadContact();
        }
      },
      currentChange(currentChange) {
        this.currentPage = currentChange;
        console.log(this.currentPage);
        this.loadContact();
      },
      addAndFlushEmp() {
        this.dialogTitle = "添加员工";
        this.emptyEmpData();
        this.dialogFormVisible = true;
      },

      searchEmp() {
        this.loadContact();
      },
      showDetails(index, row) {
        this.dialogTitle = "编辑员工";
        // departmentIds: '',
        // positionIds: '',
        console.log(row);
        console.log(index);
        this.employee = row;
        this.currentRowData = JSON.parse(JSON.stringify(row));
        this.currentIndex = index;
        this.employee.name = row.name;
        this.employee.birthday = this.formatDate(new Date(row.birthday));
        this.employee.entryDate = this.formatDate(new Date(row.entryDate));
        this.employee.departmentIds = row.departmentIds.split(',').map(value => parseInt(value));
        this.employee.departmentName = row.departmentName;
        this.employee.positionIds = row.positionIds.split(',').map(value => parseInt(value));
        this.dialogFormVisible = true;
      },
      addEmp(addEmpForm) {
        var _this = this;
        this.dialogFormVisible = true;
        let deptIds = '';
        if (this.currentTreeIds) {
          deptIds = this.currentTreeIds.join()
        }
        var postIds = '';
        if (this.employee.positionIds) {
          postIds = this.employee.positionIds.join();
        }
        this.employee.positionId = 0;
        this.employee.departmentId = 0;
        this.$refs[addEmpForm].validate((valid) => {
          if (valid) {
            // this.employee.birthday=new Date(this.employee.birthday);
            // this.employee.entryDate=new Date(this.employee.entryDate)
            if (this.employee.id) {
              //更新
              this.tableLoading = true;
              console.log(this.employee);
              // this.employee.createDate=new Date(this.employee.createDate)
              this.postRequest("/emp/update", this.employee).then(resp => {
                _this.tableLoading = false;
                if (resp && resp.status === 200 && resp.data.success) {
                  // var data = resp.data;
                  _this.dialogFormVisible = false;
                  _this.loadContact();
                  _this.emptyEmpData();

                }
              })
            } else {
              //添加
              this.tableLoading = true;
              console.log(_this.employee);
              this.postRequest("/emp/empAdd?deptIds=" + deptIds + "&postIds=" + postIds, this.employee).then(resp => {
                _this.tableLoading = false;
                if (resp && resp.status === 200 && resp.data.success) {
                  var data = resp.data;
                  _this.dialogFormVisible = false;
                  _this.loadContact();
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
        this.loadContact();
        // this.emps[this.currentIndex] =this.currentRowData;
      },
      deleteEmp(row) {
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
        this.getRequest("/emp/deletEmp?id=" + ids).then(resp => {
          _this.tableLoading = false;
          if (resp && resp.status === 200) {
            var data = resp.data;
            _this.loadContact();
          }
        })
      },
      used(item) {
        let that = this;
        this.keydep = item.name;
        if (item.num > 0) {
          that.tap = 2;
        }
        this.keydep = '';
      },
      loadContact() {
        var _this = this;
        this.tableLoading = true;
        this.getRequest("/contract/findbypage?page="
          + this.currentPage
          + "&size=10&contractName=" + this.contractName
          + "&clientName=" + this.clientName
          + "&empName=" + this.empName
          + "&createDateStart=" + this.createDateStart
          + "&createDateEnd=" + this.createDateEnd
          + "&startDateStart=" + this.startDateStart
          + "&startDateEnd=" + this.startDateEnd
          + "&endDateStart=" + this.endDateStart
          + "&endDateEnd=" + this.endDateEnd
          + "&status=" + this.contactStatus
        ).then(resp => {
          this.tableLoading = false;
          if (resp && resp.status === 200) {
            var data = resp.data.data;
            _this.contactList = data;
            _this.totalCount = resp.data.total;
            _this.emptyEmpData();
          }
        })
      },
      handleCommand(cmd) {
        var _this = this;
        if (cmd == 'logout') {
          this.$confirm8('注销登录, 是否继续?', '提示', {
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
      // 订单列被点击触发方法，在右侧展示订单
      orderListClick(row, column, cell, event){

          let _this=this;

           console.log( row);
           this.orderMode=row;
           if(row.cliId&&row.cliId!=null){
            this.orderMode.cliId=row.cliId;
            if(row.cliente.parentName&&row.cliente.parentName!=undefined){
            this.orderMode.parentName=row.cliente.parentName;
            }else{
              this.orderMode.parentName='';
            }
           }
            this.orderMode.notes=row.notes;
            if(row.salesOrderDetails){

              this.orderPlanslist= row.salesOrderDetails
            }

        this.orderDetailShow=true;
        this.orderlistsShow=false;


      },
      emptyEmpData() {
        console.log('+++++_+++++_')
        this.contact = {
          contractName: '',//合同名称
          contractNumber: '',//合同编号
          qualityDeposit: '',//质保金
          type: '',//合同类型
          totalMoney: '',//总金额
          signContractDate: '',//签约时间
          startDate: '',//开始时间
          endDate: '',//截止时间
          notes: '',//备注
          uploadName: '',//附件名字
          imageUrl: '',//附件url
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
<style scoped>
  .product-input-btn-class{
    width: 160px;
  }
  .cantract-input {
    width: 160px;
    font-size: 12px;
  }

  handleCommand
  .code-add-class {
    display: inline-flex;
    flex-direction: row;
    justify-content: flex-start;
  }

  /*设置文字颜色，可以选择不设置*/
  .code-class {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    padding: 10px 20px;
    box-sizing: border-box;
    width: 100%;
  }

  .code-class-item {
    width: 20%;
    border-radius: 8px;
    padding: 12px;
    height: 40px;
  }

  .code-class-item-name {
    width: 100%;
    border: 1px solid #e4e4e4;
  }

  .code-class-item-name:hover {
    color: #8cc5ff;
    cursor: pointer;
  }


  .send-input {
    width: 160px;
    height: 28px;
  }


  .send-head-right-btn {
    margin-left: 5px;
    margin-right: 20px;
    display: inline
  }

  .send-head-left-btn {
    margin-left: 5px
  }


  .send-main-div {
    margin-bottom: 10px;
    border-radius: 5px;
    padding: 5px 0;
    box-sizing: border-box;
    border: 1px solid #20a0ff;
  }


  /*.el-table td, .el-table th {*/
  /*  padding: 9px 0;*/
  /*}*/

  .new-contact {
    background-color: #E5EFF1;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }

  .contract-left {
    width: 400px;
    height: auto;
    border: 1px solid #2fc5da;
  }

  .contract-right {
    min-width: 500px;
    height: 800px;
    margin-left: 4px;
    border: 1px solid #2fc5da;
  }
  .contract-mid {
    margin-left: 4px;
    width: 300px;
    border: 1px solid #2fc5da;

  }

  .top-tip-top {
    position: relative;
    right: -120px;
    top: -32px;
    border-radius: 50%;
    z-index: 15;
    color: white;
    height: 16px;
    width: 16px;
    font-size: 5px;
    line-height: 14px;
    background-color: red;
  }

  .schedu-class {
    padding-left: 160px;
    text-align: left;
    margin: 0 auto;
    width: 750px;
    background-color: #8cc5ff
  }

  #contractTableId .el-table__row td {
    padding: 0;
  }

  .el-table__body tr.current-row>td{
    background-color: #ff784a !important;
    color: #fff;
}
  .el-table .cell{
    line-height: 14px;
    font-size: 12px;
  }
</style>
