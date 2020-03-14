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
        <el-main style="margin: 0 20px">
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
                  <el-button size="mini" @click="">取消</el-button>
                  <el-button icon="el-icon-search" type="primary" size="mini" @click="searchEmp">搜索</el-button>
                </el-col>
              </el-row>
            </div>
          </transition>
          <el-table :cell-style="{padding:'2px',fontSize:'12px'}" fit :data="contactList"
                    style=" width: 100%;border: 1px solid #F7F7F7">
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
        <el-form ref="form" size="mini" :model="form" label-width="100px">

          <el-form-item label="序号:">
            <el-input size="mini" v-model="form.sequence"></el-input>
          </el-form-item>
          <el-form-item label="合同编号">
            <el-input v-model="form.contractNumber"></el-input>
          </el-form-item>
          <el-form-item label="合同名称">
            <el-input v-model="form.contractName"></el-input>
          </el-form-item>
          <el-form-item label="客户名称">
            <el-input v-model="form.clientName"></el-input>
          </el-form-item>
          <el-form-item size="mini" label="合同金额">
            <el-input size="mini" style="height: 28px;" v-model="form.totalMoney"></el-input>
          </el-form-item>
          <el-form-item label="签订时间">
            <el-date-picker
              v-model="form.signContractDate"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="form.notes"></el-input>
          </el-form-item>
          <el-form-item label="合同进度">

            <span @click="updateContact"><a herf="#">请更新合同进度</a></span>
            <el-radio-group v-model="form.speed">-->
              <el-radio label="正在办"></el-radio>
              <el-radio label="办理完"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="合同详情">
            <a herf="#">添加生产计划</a>
          </el-form-item>


          <div style="text-align: center;  width: 800px;">
            <el-button type="primary" size="mini" @click="createContract">立即创建</el-button>
            <el-button size="mini">取消</el-button>
          </div>
        </el-form>
      </el-container>
    </el-container>
    <!--    合同进度添加 -->
    <el-dialog
      v-dialog-drag :title="contentTitle" style="padding: 0px;" :close-on-click-modal="false"
      :visible.sync="contentVisible" @close="cancelcontent" width="650px"
    >
      <div class="detail-product">
        <!--        <div>-->
        <!--          <tooltip content="进度编辑">-->
        <!--            <a herf="#"> <span class="fa fa-cog" @click="andSNewCode"></span></a>-->
        <!--          </tooltip>-->

        <!--        </div>-->
        <!--         嵌套的弹出框-->
        <!--        <el-dialog-->
        <!--          width="50%"-->
        <!--          title="编辑"-->
        <!--          :visible.sync="innerVisible"-->
        <!--          append-to-body>-->
        <!--          <el-form :model="codeModel" :rules="coderules" ref="addEmpForm" size="mini" label-width="90px">-->
        <!--            <el-form-item prop="codeName">-->
        <!--              <el-input prefix-icon="el-icon-edit" v-model="codeModel.codeName" size="mini" style="width: 200px"-->
        <!--                        placeholder="请输入合同进度名称"></el-input>-->
        <!--              <el-button type="primary" size="mini" @click="andSpeed">添加</el-button>-->
        <!--            </el-form-item>-->
        <!--            <el-table :data="codeList"-->
        <!--                      fit-->
        <!--                      border-->
        <!--                      :cell-style="{padding:'2px',fontSize:'12px'}"-->
        <!--                      v-model="codeModel" >-->
        <!--              <el-table-column prop="codeName"-->
        <!--                               align="left"-->
        <!--                               sortable-->
        <!--                               label="名称">-->
        <!--              </el-table-column>-->
        <!--              <el-table-column align="left" label="操作">-->
        <!--                <template slot-scope="scope">-->
        <!--                  <div style="margin-top: 10px;">-->
        <!--                    <tooltip content="编辑">-->
        <!--                      <span class="fa fa-pencil opt-color" @click="editCode(scope.$index,scope.row)"></span>-->
        <!--                    </tooltip>-->
        <!--                    <tooltip content="删除">-->
        <!--                      <span class="fa fa-trash del-color" @click="deleteCode(scope.$index,scope.row)"></span>-->
        <!--                    </tooltip>-->
        <!--                  </div>-->
        <!--                </template>-->
        <!--              </el-table-column>-->

        <!--            </el-table>-->

        <!--          </el-form>-->
        <!--        </el-dialog>-->
        <div>
          <el-checkbox-group class="code-class"
                             v-model="codeProcess"
                             @change="currentProcess">
            <el-checkbox size="mini" class="code-class-item"
                         v-for="(item,index) in codeList"
                         :key="'codelist'+index"
                         :label="item.codeName"
                         v-model="item.id"
                         border>
            </el-checkbox>
            +
            <el-checkbox-button
              size="mini"
              @click="andSNewCode">
            </el-checkbox-button>
          </el-checkbox-group>
        </div>

        <el-table :data="contentCodeRecord"
                  fit
                  border
                  :cell-style="{padding:'2px',fontSize:'12px'}"
                  :model="ContractSchedule"

                  style="width: 100%">

          <el-table-column align="left" label="合同状态">
            <template slot-scope="scope">
              <el-radio-group v-model="scope.row.state" @change="changeCodeState">
                <el-radio-button v-for="(item,index) in codeStates" :label="item.name"></el-radio-button>
              </el-radio-group>
            </template>
          </el-table-column>
          <el-table-column align="left" label="">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.isgo">{{scope.row.codeName}}</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column align="left" label="备注">
            <template slot-scope="scope">
              <el-input placeholder="请输入备注" v-show="scope.row.show"
                        @change="readcodeNote"
                        v-model="scope.row.notes"></el-input>
              <span v-show="!scope.row.show">{{scope.row.notes}}</span>
            </template>
          </el-table-column>

          <el-table-column align="left" label="操作人">
            <template slot-scope="scope">
              <el-input placeholder="请选择操作人" v-show="scope.row.show"
                        @change="readcodeNote"
                        v-model="scope.row.notes"></el-input>
              <span v-show="!scope.row.show">{{scope.row.notes}}</span>
            </template>
          </el-table-column>
          <el-table-column align="left" prop="createDate" sortable label="操作时间">
            <template slot-scope="scope">
              <span>
                 {{ scope.row.createDate|formatDateTime}}
              </span>
            </template>
          </el-table-column>
          <el-table-column align="left" label="操作">
            <template slot-scope="scope">
              <div style="margin-top: 10px;">
                <!--                <tooltip content="编辑">-->
                <!--                  <span class="fa fa-pencil opt-color" @click="editCodeProgress(scope.$index,scope.row)"></span>-->
                <!--                </tooltip>-->
                <tooltip content="保存">
                  <span class="fa fa-save opt-color opt-margin" @click="finishcodeSave(scope.$index, scope.row)"></span>
                </tooltip>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>


  </div>
</template>
<script>
  export default {
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
        //进度名列表
        codeList: [],
        innerVisible: false,
        codeModel: {
          codeName: '',
        },

        coderules: {
          codeName: [{required: true, message: '必填:中文名', trigger: 'blur'}],
        },
        keyContractNumber: '',
        // 编辑合同进度
        ContractSchedule: {
          id: 0,
          codeName: '',
          notes: '',
          operator: '',
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
        codeProcess: [],
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
      changeCodeState() {

      },
      //选择进度 步骤
      currentProcess(e, o, l) {
        let that = this;
        console.log(e);//当前选择的
        console.log(this.codeProcess);
        var nowArr = this.codeProcess;//当时数据
        var oldArr = this.contentCodeRecord;//旧数据
        var currentArr = this.compareArr(oldArr, nowArr);

        // this.contentCodeRecord = [];
        console.log(currentArr);
        this.contentCodeRecord= currentArr;
      },
      // 比较两个数组 并返回当前的
      compareArr(oldArr, nowArr) {
        let that = this;
        var temp = [];
        if (oldArr.length == 0) {
          for (var i = 0, n = nowArr.length; n > i; i++) {
            temp.push({
              codeName: nowArr[i],
              createDate: new Date(),
              state: '1',
              note: '',
            })
          }

        } else if (nowArr.length === 0) {

        } else {
          var falg = false;
          if (oldArr.length >= nowArr.length) {
            for (var j = oldArr.length-1; j > 0; j--) {
              var codeItem = oldArr[j];
              for (var k = nowArr.length-1; k > 0; k--) {
                var nowItem = nowArr[k];
                if (nowItem === codeItem.codeName) {
                  temp.push(codeItem);
                }
              }
            }
          } else {//获取新增加进度值
            var su = [];
            for (var m = 0; m < oldArr.length; m++) {
              su.push(oldArr[m].codeName);
            }
            ;
            var dif = this.getArrDifference(su, nowArr);
            //新增的
            for (let n = 0; n < dif.length; n++) {
              var newObj = {
                codeName: dif[n],
                createDate: new Date(),
                state: '1',
                note: '',
              };
            }
            oldArr.push(newObj);
            temp = oldArr;
          }
        }

        return temp;
      },
      //获取两个数组 不同值；
      getArrDifference(arr1, arr2) {
        return arr1.concat(arr2).filter(function (v, i, arr) {
          return arr.indexOf(v) === arr.lastIndexOf(v);
        });
      },

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
        console.log(index);
        row.show = true;
        // this.contentCodeRecord.splice(index,1,row);
      },
      finishcodeSave(index, row) {
        console.log(row);
        row.show = false;
        this.contentCodeRecord.splice(index, 1, row);
      },
      andSNewCode() {
        this.innerVisible = true;
        //加载所有进度名称
        this.loadAllCode();
      },
      loadAllCode() {
        let _this = this;
        _this.getRequest("/contractcode/findAll").then(resp => {
          if (resp && resp.status === 200 && resp.data.success) {
            let data = resp.data;
            console.log("codeList" + resp.data);
            // _this.nations = data.nations;
            _this.codeList = data.data || []
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


        this.codeModel.name = '';
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
            _this.contentCodeRecord = [];
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
        this.loadContact();
      },
      //新增合同方法  该方法要求 在新增加合同时同时新建立订单
      addNewContact() {
        this.tap = 1;
        console.log('1');
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
        _this.getRequest("/emp/basicdata").then(resp => {
          if (resp && resp.status === 200 && resp.data.success) {
            let data = resp.data;
            // _this.nations = data.nations;
            let det = data.root.deptlist || [];
            let dets = [];
            det.forEach(function (v) {
              dets.push({
                id: v[0],
                num: v[1],
                name: v[2]
              })
            })
            _this.depItems = dets;
            _this.deps = data.root.department;
            _this.posts = data.root.position;

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
  .code-class {
    display: flex;
    flex-direction: row;
    justify-content: stretch;
    flex-wrap: wrap;

  }

  .code-class-item {
    margin: 5px;
  }

  .opt-margin {
    margin-left: 10px;
  }

  .del-color {
    color: red;
    margin-left: 10px;
  }

  .send-input {
    width: 160px;
    height: 28px;
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
    border-radius: 5px;
    padding: 5px 0;
    box-sizing: border-box;
    border: 1px solid #20a0ff;
  }

  .page-tool {
    display: flex;
    justify-content: flex-end;
    margin: 2px;
  }

  .dept-tree {
    width: 220px;
    height: 26px;
    display: inline-flex;
    font-size: 13px;
    border-radius: 5px;
    padding-left: 13px;
    box-sizing: border-box;
    cursor: pointer;
    align-items: center
  }

  .dept-tree:hover {
    border: 1px solid #dcdfe6;
  }


  .el-form-item {
    text-align: left;
    border: none;
  }

  .el-form-item:focus:after {
    text-align: left;
    width: 220px;
    height: 26px;
    display: inline-flex;
    font-size: 13px;
    border-radius: 5px;
    padding-left: 13px;
    box-sizing: border-box;
    cursor: pointer;
    align-items: center
  }

  .el-table td, .el-table th {
    padding: 9px 0;
  }

  .new-contact {
    background-color: #E5EFF1;
  }
</style>
