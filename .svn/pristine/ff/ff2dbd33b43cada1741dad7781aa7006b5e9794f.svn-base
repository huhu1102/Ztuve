<template>
  <div>
    <el-collapse v-if="plans.length">
      <el-collapse-item class="plan-item-style" :name="plan.id" v-for="plan in plans" :key="plan.id">
        <template slot="title">
          <div style="border-bottom:1px solid red;">
            <span style="margin-left: 20px;">{{plan.createDate|formatDate}}</span>
            <i v-if="plan.details&&plan.details.length">({{plan.details.length}})</i>
          </div>
        </template>
        <div class="flex-plan">
          <div class="item-sales"
               v-for="(plandetail,index) in plan.details"
               @mouseover="plandetail.onhover=true"
               @mouseout="plandetail.onhover=false"
               :key="plandetail.id ">
            <div class="in-sales-show">
              <div v-if="plandetail.notes!=='addNew'">
                <div style="display:flex;flex-direction: row;justify-content: start;width: 100%;">
                  <div class="pro-plan-head">
                    <div class="compay-ifor " @click="chooseShop(plandetail)">
                      <div class="text-alight">
                        <div style="padding: 6px 0 0 5px;text-align:left;">编号:{{plandetail.id}}</div>

                        <div class="plan-num-companyName"
                             v-if="plandetail&&plandetail.salesPlan&&plandetail.salesPlan.client">
                          {{plandetail.salesPlan.client.name}}
                        </div>
                        <div
                          style="width: 140px; padding: 0 16px;color: #2E2E2F;text-align: right; text-overflow: ellipsis;overflow: hidden; white-space: nowrap;"
                          v-if="plandetail.salesPlan&&plandetail.salesPlan.client&&plandetail.salesPlan.client.parentName">
                          ┈┈{{plandetail.salesPlan.client.parentName}}
                        </div>
                      </div>
                      <div class="text-alight" style="text-align: center;padding-top: 10px;"
                           v-if="plandetail.salesPlan&&plandetail.salesPlan.product&&plandetail.salesPlan.product.producteName">
                        {{plandetail.salesPlan.product.producteName}}
                      </div>

                      <el-checkbox style="padding-left: 10px;" v-show="plandetail.toChange"
                                   v-model="plandetail.checked"></el-checkbox>
                    </div>
                    <div class="plan-num">
                      <div class="plan-num-left">
                        <div class="plan-item-right">
                          <div style="width: 140px">
                            <div style="padding: 30px 0 0 4px;font-size: 12px;">
                              <div class="plan-num-detail">
                                <span class="detail-text">已完成:</span>
                                <span class="detail-text">{{plandetail.accomplishNO}}</span>
                              </div>
                              <div class="plan-num-detail">
                                <span class="detail-text">本次下发:</span>
                                <el-tooltip v-if="plandetail.serialNumbers&&plandetail.serialNumbers.length"
                                            placement="top">-->
                                  <div slot="content">
                                    <div style="display: flex;flex-direction: column;width: auto;">
                                      <div v-for="serial in plandetail.serialNumbers " :key="serial.id">
                                                                      <span>{{ serial.startNo}}- {{ serial.endNo}}&nbsp
                                                                      <span
                                                                        v-if="serial.note!=null">{{ serial.note}}</span>
                                                                      <span v-else>{{ serial.note}} </span>
                                                                      </span>
                                      </div>
                                    </div>
                                  </div>
                                  <span class="detail-text">{{plandetail.actualQuantity}}</span>
                                </el-tooltip>
                              </div>
                              <div class="plan-num-detail">
                                <span class="detail-text">需求总量:</span>
                                <span class="detail-text"
                                      v-if="plandetail.salesPlan&&plandetail.salesPlan.quantity">{{plandetail.salesPlan.quantity}}</span>
                              </div>
                            </div>
                            <div v-if="plandetail.recordStr">{{plandetail.recordStr}}</div>
                          </div>
                          <div style="width: 280px;display: flex;flex-direction: row;justify-content:flex-start; align-items: center;padding: 30px 0px 0px 10px; ">
                            <div style="width: 60px;height: 100%;text-align: right;padding-left: 5px;">备注：</div>
                            <div class="plan-note" v-if="plandetail.note">
                              {{plandetail.note}}
                            </div>
                            <div class="plan-note" v-else>
                              <div style="width: 40px;height: 100%;text-align: start;padding-left: 5px;">备注：</div>
                              <div class="plan-notetext">
                                暂无
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          style="width:420px;display: flex;flex-direction: column;justify-content: start; padding:0 8px; ">
                          <tag-tip
                            :plandetail="plandetail"
                            :for-manager="false"
                          ></tag-tip>
                          <div
                            style="flex-direction: row; display: flex;justify-content: flex-end; height: 18px;line-height: 20px;width: auto;">
                            <div>
                              <el-tooltip class="item" effect="dark" content="查看" placement="top-start">
                              <span
                                class="fa fa-eye"
                                @click="addseeDetail(plandetail)"
                                style="padding: 2px;margin: 4px;color: #2fc5da;"
                              > </span>
                              </el-tooltip>

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="plandetail.notes==='addNew'"
                   style="width: 100%; text-align:center;color: #b3d8ff; line-height: 130px;font-size: 30px;font-weight: 600;">
                                              <span @click="depAddDetail(plan)">+
                                              </span>
              </div>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-collapse style="text-align: center;" v-else>
      暂无数据
    </el-collapse>
    <div style="display: flex;justify-content: flex-end;margin: 2px">
      <el-pagination background :page-size="10" :pager-count="11" :current-page="currentPage"
                     @current-change="currentChange" layout="prev, pager, next" :total="totalMaterialCount">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import tagTip from "../sale/send/Tagtip";
  export default {

    name:'ProductionPlanItem',
      components: {tagTip},
    data(){
      return{

      }
    }
  }

</script>
