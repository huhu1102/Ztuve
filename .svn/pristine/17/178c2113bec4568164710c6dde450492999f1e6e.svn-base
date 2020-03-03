<templete>
  <div>
<!--  发货单模板-->
    <el-dialog v-dialog-drag :title="dialogSendTitle" style="padding: 0px;" :close-on-click-modal="false"
               :visible.sync="dialogSendVisible" @close="cancelSend" width="1150px">
      <div style="width: 100% " v-if="dialogSendVisible">
        <el-form :model="confirmData" :rules="rulesSend" ref="sendForm" size="mini" label-width="80px">

          <div style="border: 1px solid #eeeeee;">
            <!-- 客户信息 -->
            <el-row>
              <el-col :span="12">
                <el-form-item label="物流名:" prop="clientId">
                  <el-cascader
                    class="send-input"
                    placeholder="--选择物流公司--"
                    :options="clients"
                    :props="clientProps"
                    v-model="confirmData.clientId"
                    style="width: 400px;"
                  ></el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="货名:" prop="cargoName">
                  <el-input
                    prefix-icon="el-icon-edit"
                    type="text"
                    class="send-input"
                    placeholder="货名"
                    v-model="confirmData.cargoName">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="数量:" prop="planNumber">
                  <el-input
                    prefix-icon="el-icon-edit"
                    type="number"
                    min="0"
                    step="1000"
                    class="send-input"
                    placeholder="数量"
                    v-model="confirmData.planNumber">
                  </el-input>
                </el-form-item>
              </el-col>


            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="收货地:" prop="address">
                  <el-input
                    prefix-icon="el-icon-edit"
                    type="text"
                    class="send-input"
                    placeholder="收货地址"
                    v-model="confirmData.address">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="收货人:" prop="consignee">
                  <el-input
                    prefix-icon="el-icon-edit"
                    type="text"
                    class="send-input"
                    placeholder="收货人"
                    v-model="confirmData.consignee">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="电话:" prop="consigneePhone">
                  <el-input
                    prefix-icon="el-icon-edit"
                    min="0"
                    class="send-input"
                    placeholder="收货人电话"
                    v-model="confirmData.consigneePhone">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="方式:" prop="stype">
                  <el-select class="send-input" v-model="confirmData.stype" filterable placeholder="----支付方式----">
                    <el-option
                      v-for="item in payCode"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="服务:" prop="serviceCode">
                  <el-select v-model="confirmData.serviceCode" filterable placeholder="----请选择服务方式----"
                             class="send-input">
                    <el-option
                      v-for="item in serviceCodes"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="回单:" prop="receipt">
                  <el-input
                    prefix-icon="el-icon-edit"
                    type="text"
                    class="send-input"
                    placeholder="回单信息"
                    v-model="confirmData.receipt">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="上门费:" prop="shortHaulMoney">
                  <el-input
                    prefix-icon="el-icon-edit"
                    type="number"
                    min="0"
                    step="10"
                    class="send-input"
                    placeholder="上门费"
                    v-model="confirmData.shortHaulMoney">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="详情:" prop="freightDetails">
                  <el-input
                    prefix-icon="el-icon-edit"
                    type="text"
                    class="send-input"
                    placeholder="运费详情"
                    v-model="confirmData.freightDetails">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="发货人:" prop="consigner">
                  <el-input
                    prefix-icon="el-icon-edit"
                    type="text"
                    class="send-input"
                    placeholder="发货人"
                    v-model="confirmData.consigner">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="电话:" prop="consignerPhone">
                  <el-input
                    prefix-icon="el-icon-edit"
                    type="text"
                    class="send-input"
                    placeholder="发货人电话"
                    v-model="confirmData.consignerPhone">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="收货款:" prop="collFreight">
                  <el-input
                    prefix-icon="el-icon-edit"
                    type="number"
                    min="0"
                    class="send-input"
                    placeholder="代收货款"
                    v-model="confirmData.collFreight">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="大写:" prop="collFreightBig">
                  <el-input
                    prefix-icon="el-icon-edit"
                    type="text"
                    :disabled="true"
                    class="send-input"
                    placeholder="代收货款大写"
                    v-model="confirmData.collFreightBig">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="单号:" prop="dispatchBillNo">
                  <el-input
                    prefix-icon="el-icon-edit"
                    type="text"
                    class="send-input"
                    placeholder="单号"
                    v-model="confirmData.dispatchBillNo">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="运费:" prop="freights">
                  <el-input
                    prefix-icon="el-icon-edit"
                    type="number"
                    min="0"
                    class="send-input"
                    placeholder="运费"
                    v-model="confirmData.freights">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="件数:" prop="boxs">
                  <el-input
                    prefix-icon="el-icon-edit"
                    type="number"
                    min="0"
                    class="send-input"

                    placeholder="件数"
                    v-model="confirmData.boxs">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="备注:" prop="remarks">
                  <el-input
                    prefix-icon="el-icon-edit"
                    type="textarea"
                    class="send-input"
                    placeholder="备注"
                    v-model="confirmData.remarks">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogSendVisible=false">取 消</el-button>
        <el-button type="primary" @click="confirmAdd('sendForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</templete>
<script>
  // import {Message} from 'element-ui'
  export default{
    name: 'SendBagage',
    props:{
      dialogSendTitle:{
        type:String,
        default:'发货单'
      },
      dialogSendVisible:{
        type:Boolean,
        default:false,
      },
      sendData:{
        type:Object,
        default:{}
      }
    },
    data(){
      return {
        confirmData:{
          id: 0,
          shippingRequestDetailsId: 0,//发货请求详情ID
          clientId: [],//货运部id
          dispatchBillNo: '',//单号
          boxs: '',//件数
          consignee: '',//收货人
          consigneePhone: '',//收货人电话
          address: '',//收货地址
          consigner: '',//发货人
          consignerPhone: '',//发货人电话
          remarks: '',//备注
          cargoName: '',//货名
          freights: "",//运费
          shortHaulMoney: "",//上门费
          freightDetails: "",//运费详情
          collFreight: '',//代收货款
          collFreightBig: '',//代收货款大写
          serviceCode: '自提',//服务方式
          receipt: '',//回单信息
          totalMoney: '',//到站总应收
          // userName:'',//代收货款大写
          stype: '现金',//支付方式
          planNumber: '',//发货数量

        }
      }

    },
    mounted: function (){
      this.initFormData();
    },
    methods:{
      // 初始化页面数据
      initFormData(){
        this.confirmData = this.sendData
      },
      confirmAdd(sendForm) {
        let _this = this;
        let please = _.cloneDeep(this.confirmData);
        please.clientId = (please.clientId + '').split(",");
        please.clientId = parseInt(please.clientId[please.clientId.length - 1]);
        console.log(please.id);
        this.$refs[sendForm].validate((valid) => {
          if (valid) {
            if (please.id) {
              //更新
              this.tableLoading = true;
              this.postRequest("/shippingBill/update", please).then(resp => {
                _this.tableLoading = false;
                if (resp && resp.status === 200) {
                  _this.dialogSendVisible = false;
                  _this.loadData();
                  _this.cancelSend();
                }
              })
            } else {
              //添加
              this.tableLoading = true;
              this.postRequest("/shippingBill/add", please).then(resp => {
                _this.tableLoading = false;
                if (resp && resp.status === 200 && resp.data.success) {
                  _this.dialogSendVisible = false;
                  _this.loadData();
                  _this.cancelSend();
                } else {
                  // Message("添加失败")
                  console.log('Message')
                }
              })
            }
          } else {
            return false;
          }
        });
      },
      cancelSend() {
        this.confirmData = {
          id: 0,
          shippingRequestDetailsId: 0,//发货请求详情ID
          clientId: [],//货运部id
          dispatchBillNo: '',//单号
          boxs: '',//件数
          consignee: '',//收货人
          consigneePhone: '',//收货人电话
          address: '',//收货地址
          consigner: '',//发货人
          consignerPhone: '',//发货人电话
          remarks: '',//备注
          cargoName: '',//货名
          freights: "",//运费
          shortHaulMoney: "",//上门费
          freightDetails: "",//运费详情
          collFreight: '',//代收货款
          collFreightBig: '',//代收货款大写
          serviceCode: '',//服务方式
          receipt: '',//回单信息
          totalMoney: '',//代收货款大写
          // userName:'',//代收货款大写
          stype: '',//支付方式
          startDate: '',
          endDate: '',
        }
      },
      loadData(){
        this.$emit("loadData");
      }
    }
  }

</script>
<style scoped>

</style>
