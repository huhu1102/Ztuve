<template>
  <div>
    <el-dialog v-dialogDrag :title="formTitle"
               style="padding: 0px;"
               :close-on-click-modal="false"
               :visible.sync="formVisible"
               @close="cancelOpt"
               width="500px">
      <div style="width: 100% " v-if="formVisible">
        <el-form :model="company" :rules="rules" ref="addDataForm" size="sam" label-width="90px">

          <el-form-item label="站名:" prop="name">
            <el-input prefix-icon="el-icon-edit" v-model="company.name" size="mini" style="width: 200px"
                      placeholder="请输入客户名称"></el-input>
          </el-form-item>
          <el-form-item label="简称:" prop="abbreviation">
            <el-input prefix-icon="el-icon-phone" v-model="company.abbreviation" size="mini" style="width: 200px"
                      placeholder="局简称..."></el-input>
          </el-form-item>

          <el-form-item label="电话:" prop="phone">
            <el-input prefix-icon="el-icon-edit" v-model="company.phone" size="mini" style="width: 200px"
                      placeholder="公司电话...">
            </el-input>
          </el-form-item>
          <el-form-item label="传真:" prop="fax">
            <el-input prefix-icon="el-icon-edit" v-model="company.fax" size="mini" style="width: 200px"
                      placeholder="公司传真...">
            </el-input>
          </el-form-item>
          <el-form-item label="邮箱:" prop="email">
            <el-input prefix-icon="el-icon-message" v-model="company.email" size="mini" style="width: 200px"
                      placeholder="公司邮箱...">
            </el-input>
          </el-form-item>
          <el-form-item label="性质:" prop="status">
            <el-radio-group :disabled="selectRadio" v-model="company.status">
              <el-radio label='down'>下游</el-radio>
              <el-radio style="margin-left: 15px" label='up'>上游</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="地址:" prop="address">
            <el-input prefix-icon="el-icon-edit" v-model="company.address" size="mini" style="width: 200px"
                      placeholder="公司地址...">
            </el-input>
          </el-form-item>
          <el-form-item label="详细地址:" prop="addressDetails">
            <el-input prefix-icon="el-icon-edit" v-model="company.addressDetails" size="mini" style="width: 200px"
                      placeholder="详细地址..."></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formVisible=false">取 消</el-button>
        <el-button type="primary" @click="addData('addDataForm')">确 定</el-button>
      </div>
    </el-dialog>

    <template>
      <el-table ref="multipleTable" :cell-style="{padding:'2px',fontSize:'12px'}" :data="formatData" :row-style="showRow" v-bind="$attrs">
        <!--  @header-click="chooseall" -->
        <el-table-column :render-header="renderHeader" width="50" align="center">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.checks" @change="toselect(scope.row)"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column v-if="columns.length===0" width="150">
          <template slot-scope="scope">
            <span v-for="space in scope.row._level" :key="space" class="ms-tree-space"></span>
            <span v-if="iconShow(0,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
              <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
              <i v-else class="el-icon-minus"></i>
        </span>
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column v-for="(column, index) in columns" v-else :key="column.value" :label="column.text"
                         :width="column.width">
          <template slot-scope="scope">
            <!-- Todo -->
            <!-- eslint-disable-next-line vue/no-confusing-v-for-v-if -->
            <span v-for="space in scope.row._level" v-if="index === 0" :key="space" class="ms-tree-space"/>
            <span v-if="iconShow(index,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-plus"/>
          <i v-else class="el-icon-minus"/>
        </span>
            {{ scope.row[column.value] }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="showEditEmpView(scope.row)" style="padding: 3px 4px 3px 4px;margin: 2px"
                       size="mini">编辑
            </el-button>
            <el-button @click="addChild(scope.row)" style="padding: 3px 4px 3px 4px;margin: 2px"
                       size="mini">添加子公司
            </el-button>
            <el-button v-if="!scope.row.child" type="danger" style="padding: 3px 4px 3px 4px;margin: 2px" size="mini"
                       @click="deleteData(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>

        <slot/>
        <!--        <el-table-column-->
        <!--          align="left"-->
        <!--          label="操作"-->
        <!--          width="195">-->
        <!--          <template slot-scope="scope">-->
        <!--            <el-button @click="showEditEmpView(scope.row)" style="padding: 3px 4px 3px 4px;margin: 2px"-->
        <!--                       size="mini">编辑-->
        <!--            </el-button>-->
        <!--            <el-button style="padding: 3px 4px 3px 4px;margin: 2px" size="mini"-->
        <!--                       @click="addChild(scope.row)">添加子公司</el-button>-->
        <!--            <el-button v-if="!scope.row.child.length" type="danger" style="padding: 3px 4px 3px 4px;margin: 2px" size="mini"-->
        <!--                       @click="deleteData(scope.row)">删除-->
        <!--            </el-button>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
      </el-table>
    </template>
    <div style="display: flex;justify-content:flex-end;margin: 2px">
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
</template>
<script>
  /**
   Auth: j
   Created: 2018/1/19-13:59
   */
  import treeToArray from "./eval";

  export default {
    name: "TreeTable",
    data() {
      let phonevalidate = (rule, value, callback) => {
        //后台方法
        const reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
        if (reg.test(value)) {
          callback()
        } else {
          callback("电话号码格式错误!")
        }
      }
      return {
        rules: {
          name: [{required: true, message: '必填:姓名', trigger: 'blur'}],
          status: [{required: true, message: '必选:性质', trigger: 'blur'}],
          parentClientId: [{required: true, message: '必选:总公司', trigger: 'blur'}],
          phone: [{required: true, message: '必填:电话号码', trigger: 'blur'},
            {
              validator: phonevalidate,

              message: '电话号码错误',
              trigger: 'blur'
            }],

          email: [{required: true, message: '必填:电子邮箱', trigger: 'blur'}, {
            type: 'email',
            message: '邮箱格式不正确',
            trigger: 'blur'
          }],
        },
        chooseson: true, //全选
        key: true, //单个点击直到全部选中
        formVisible: false,
        formTitle: '',
        depTextColor: '#c0c4cc',
        defaultProps: {
          label: 'name',
          isLeaf: 'leaf',
          children: 'child'
        },
        showOrHidePop: false,
        selectRadio: false,
        currentPage: 1,
        totalCount: -1,
        company: {
          name: '',
          phone: '',
          address: '',
          email: '',
          fax: '',
          status: "up",
          abbreviation: '',
          parentName: '',
          parentClientId: '',
          infor: '',
          createDate: ''
        },
        isChild: false,
        tempShops: [],
        pName: '',
        pId: 0,
      };
    },
    props: {
      /* eslint-disable */
      data: {
        type: [Array, Object],
        required: true
      },
      shops: {
        type: [Array, Object],
        required: true
      },
      columns: {
        type: Array,
        default: () => []
      },
      evalFunc: Function,
      evalArgs: Array,
      expandAll: {
        type: Boolean,
        default: false
      },
      activeName: {
        type: String,
        required: true
      }


    },
    computed: {
      // 格式化数据源
      formatData: function () {
        let tmp;
        if (!Array.isArray(this.data)) {
          tmp = [this.data];
        } else {
          tmp = this.data;
        }
        const func = this.evalFunc || treeToArray;
        const args = this.evalArgs
          ? [tmp, this.expandAll].concat(this.evalArgs)
          : [tmp, this.expandAll];
        console.log(args);
        return func.apply(null, args);
      }
    },
    methods: {
      showRow: function (row) {
        const show = row.row.parent
          ? row.row.parent._expanded && row.row.parent._show
          : true;
        row.row._show = show;
        return show
          ? "display:none;"
          : "animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;";
      },
      // 切换下级是否展开
      toggleExpanded: function (trIndex) {
        console.log("hehan666");
        let record = this.formatData[trIndex];
        let exp = record._expanded;
        console.log(exp);
        console.log(record);
        record._expanded = !exp;
      },
      //收起来所有子项
      toggleAllExpanded: function () {
        console.log("****____******999")
        this.formatData.forEach(function (v, arr) {
          if (v.parentClientId === 0 || v.parentClientId === v.id) {
            v._expanded = true;
          } else {
            v._expanded = false;
          }
        })


      },
      // 图标显示
      iconShow(index, record) {
        return index === 0 && record.child && record.child.length > 0;
      },

      //设置表头全选
      renderHeader(h, data) {
        return h("span", [
          h("input", {
            attrs: {
              id: "chooseall",
              type: "checkbox",
              style:
                "border: 1px solid #dcdfe6;border-radius: 2px;box-sizing: border-box;width: 14px;height: 14px;background-color: #fff;"
            }
          })
        ]);
      },
      //功能函数:选中部分子集
      setchildtobeselect(arr, key) {
        arr.forEach((v, i) => {
          v.checks = key;
          v._expanded = key;//选中后展开子项
          if (v.child) {
            this.setchildtobeselect(v.child, v.checks);
          }
        });
      },
      //是否所有的都被选中
      isallchecked(arr) {
        arr.forEach((v, i) => {
          if (!v.checks) {
            this.key = false;
          }
          if (v.child) {
            this.isallchecked(v.child);
          }
        });
      },
      //设置父级为 未选中状态（父级的父级没改变-有bug）
      // setparentfalse(arr, id, level) {
      //   arr.forEach((v, i) => {
      //     if (v._level === level - 1 && v.child) {
      //       v.child.forEach((val, ind) => {
      //         if (val.id === id) {
      //           v.checks = false;
      //           return false; //终止此次循环，减少循环次数
      //         }
      //       });
      //     }
      //     if (v.child) {
      //       this.setparentfalse(v.child, id, level);
      //     }
      //   });
      // },
      //设置父级为 选中状态
      setparenttrue(arr, id, level) {
        arr.forEach((v, i) => {
          if (v._level === level - 1 && v.child) {
            let key = true;
            let sameidkey = false;
            v.child.forEach((val, ind) => {
              if (val.id === id) {
                //确保当前点击的在该父级内
                sameidkey = true;
              }
              if (!val.checks) {
                key = false;
              }
            });
            if (key && sameidkey) {
              v.checks = true;
            }
          }
          if (v.child) {
            this.setparentfalse(v.child, id, level);
          }
        });
      },
      //某个复选框被点击时
      toselect(row) {
        console.log(row);
        // row._expanded = row.checks;//选中后是否展开
        //1、若有子集先让子选中
        if (row.child) {
          this.setchildtobeselect(row.child, row.checks);
        }
        //2、然后判断是否全选中
        this.key = true; //重置为true，防止上次已经是false的状态
        this.isallchecked(this.formatData);
        //3、设置多选框的状态
        if (!row.checks) {
          this.setparentfalse(this.formatData, row.id, row._level); //设置父级选中的状态为false
          document.getElementById("chooseall").checked = false; //设置全选框的状态
        } else {
          this.setparenttrue(this.formatData, row.id, row._level); //设置父级选中的状态为true
        }
        if (this.key) {
          document.getElementById("chooseall").checked = true; //设置全选框的状态
        }
      },

      showDepTree() {
        this.showOrHidePop = !this.showOrHidePop;
      },
      onTreeDataChange() {
      },
      handleNodeClick(data) {
        this.company.parentName = data.name;
        this.company.parentClientId = data.id;
        this.pId = data.id;
        this.pName = data.name;
        this.showOrHidePop = false;
        this.depTextColor = '#606266';
      },
      clearChoose() {
        this.company.parentName = '';
        this.company.parentClientId = 0;
      },
      cancelChoos() {
        console.log(this.pName);
        this.company.parentName = this.pName;
        this.company.parentClientId = this.pId;
      },
      initData() {
        let _this = this;
        let activeName = this.activeName;
        _this.loadData(activeName);

      },
      keywordsChange(val) {
        if (val === '') {
          let activeName = this.activeName;
          this.loadData(activeName);
        }
      },
      currentChange(currentChange) {
        this.currentPage = currentChange;
        let activeName = this.activeName;
        this.loadData(activeName);
      },
      addAndFlushData() {
        this.formTitle = "添加客户";
        this.formVisible = true;
      },
      searchData() {
        let activeName = this.activeName;
        this.loadData(activeName);
      },
      addChild(row) {
        console.log(row)
        this.formTitle = "添加子公司";
        let company = row;
        let copShop = _.cloneDeep(company);
        console.log(row);
        this.isChild = true;
        this.selectRadio = true;
        this.tempShops = [];
        if (copShop.parentClientId === 0 || copShop.parentClientId === copShop.id) {
          delete copShop.child;
        } else {
          if (copShop.parent !== undefined) {
            delete copShop.parent;
          }

        }
        this.tempShops.push(copShop);
        this.company.parentName = copShop.name;
        this.company.parentClientId = copShop.id;
        this.company.status = copShop.status;
        this.formVisible = true;
      },
      showEditEmpView(row) {
        console.log(row)
        this.isChild = false;
        this.tempShops = [];
        this.formTitle = "编辑客户信息";
        this.company = row;
        this.selectRadio = true;
        // this.tempShops=_.cloneDeep(this.shops);
        console.log(row);
        this.company.parentClientId = row.parentClientId;
        this.company.createDate = row.createDate;
        this.company.parentName = row.parentName;
        // delete this.company.parent;
        delete this.company.purchasePlan;
        delete this.company.product;

        this.formVisible = true;
      },
      addData(addDataForm) {
        this.formVisible = true;
        let _this = this;
        this.$refs[addDataForm].validate((valid) => {
          if (valid) {
            let cops = _.cloneDeep(this.company)
            let cache = [];
            let str = JSON.stringify(cops.child, function (key, value) {
              if (typeof value === 'object' && value !== null) {
                if (cache.indexOf(value) !== -1) {
                  // Circular reference found, discard key
                  return;
                }
                // Store value in our collection
                cache.push(value);
              }
              return value;
            });
            cache = null;
            cops.child = str;
            if (cops.parentClientId == undefined || cops.parentClientId == null || cops.parentClientId == '') {
              cops.parentClientId = 0;
              cops.parentName = '';
            }
            delete cops.parent;
            console.log(cops);
            if (this.company.id) {
              //更新
              _this.tableLoading = true;
              this.postRequest("/client/update", cops).then(resp => {
                _this.tableLoading = false;
                if (resp && resp.status === 200 && resp.data.success) {
                  // let data = resp.data;
                  _this.formVisible = false;
                  let activeName = _this.activeName;
                  _this.loadData(activeName);
                  _this.emptyData();

                } else {
                  this.$message({type: 'info', message: '更新失败'})
                }
              })
            } else {
              //添加
              this.tableLoading = true;
              this.postRequest("/client/add", cops).then(resp => {
                _this.tableLoading = false;
                if (resp && resp.status === 200 && resp.data.success) {
                  let data = resp.data;
                  _this.formVisible = false;
                  let activeName = _this.activeName;
                  _this.loadData(activeName);
                  _this.emptyData();

                } else {
                  this.$message({type: 'info', message: '添加失败'})
                }
              })
            }
          } else {
            return false;
          }
        });
      },
      cancelOpt() {
        this.formVisible = false;
        this.isChild = false;
        this.tempShops = [];
        this.selectRadio = false;
        this.emptyData();
      },
      deleteData(row) {
        let _this = this;
        this.$confirm('此操作将删除该条记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log('55')
          // _this.doDelete(row.id);
          _this.getRequest("/client/delete?id=" + row.id).then(resp => {
            _this.tableLoading = false;
            console.log('777777')
            if (resp && resp.status === 200 && resp.data.success) {
              let data = resp.data;

              let activeName = this.activeName;
              _this.loadData(activeName);
            } else {
              this.$message({type: 'info', message: '失败'})
            }
          })
        }).catch(() => {
        });
      },
      doDelete(ids) {
        console.log('666')
        this.tableLoading = true;
        let _this = this;
        _this.getRequest("/client/delete?id=" + row.id).then(resp => {
          _this.tableLoading = false;
          console.log('777777')
          if (resp && resp.status === 200 && resp.data.success) {

            let activeName = this.activeName;
            _this.loadData(activeName);
          } else {
            this.$message({type: 'info', message: '失败'})
          }
        })
      },
      loadData(activeName) {
        let _this = this;
        _this.$emit('headCallBack');
        // this.tableLoading = true;
        // this.getRequest("/client/findbypage?page=" + this.currentPage + "&size=10&queryName="+this.keywords+"&shopType="+activeName).then(resp=> {
        //   this.tableLoading = false;
        //   if (resp && resp.status == 200) {
        //     let data = resp.data.data;
        //     _this.companys = data;

        //     _this.totalCount=resp.data.total;
        //     _this.emptyData();
        //   }
        // });
        // this.getRequest("/client/baseData").then(resp=> {
        //   if (resp && resp.status == 200) {
        //     let data = resp.data.data;
        //     // _this.nations = data.nations;
        //     // _this.politics = data.politics;
        //     _this.shops = data;
        //     // _this.posts = data.root.position;

        //   }
        // })
      },
      emptyData() {
        console.log('+++++_+++++_')
        this.company = {
          name: '',
          phone: '',
          address: '',
          email: '',
          fax: '',
          status: '',
          abbreviation: '',
          parentName: '',
          parentClientId: '',
          infor: '',
          createDate: ''
        }
      },
      //设置父级为 未选中状态（父级的父级没改变-有bug）
      setparentfalse(arr, id, level) {
        arr.forEach((v, i) => {
          if (v._level == level - 1 && v.child) {
            v.child.forEach((val, ind) => {
              if (val.id == id) {
                v.checks = false;
                return false; //终止此次循环，减少循环次数
              }
            });
          }
          if (v.child) {
            this.setparentfalse(v.child, id, level);
          }
        });
      },
      //设置父级为 选中状态
      setparenttrue(arr, id, level) {
        arr.forEach((v, i) => {
          if (v._level == level - 1 && v.child) {
            let key = true;
            let sameidkey = false;
            v.child.forEach((val, ind) => {
              if (val.id == id) {
                //确保当前点击的在该父级内
                sameidkey = true;
              }
              if (!val.checks) {
                key = false;
              }
            });
            if (key && sameidkey) {
              v.checks = true;
            }
          }
          if (v.child) {
            this.setparentfalse(v.child, id, level);
          }
        });
      },
      //某个复选框被点击时
      toselect(row) {
        console.log(row);
        // row._expanded = row.checks;//选中后是否展开
        //1、若有子集先让子选中
        if (row.child) {
          this.setchildtobeselect(row.child, row.checks);
        }
        //2、然后判断是否全选中
        this.key = true; //重置为true，防止上次已经是false的状态
        this.isallchecked(this.formatData);
        //3、设置多选框的状态
        if (!row.checks) {
          this.setparentfalse(this.formatData, row.id, row._level); //设置父级选中的状态为false
          document.getElementById("chooseall").checked = false; //设置全选框的状态
        } else {
          this.setparenttrue(this.formatData, row.id, row._level); //设置父级选中的状态为true
        }
        if (this.key) {
          document.getElementById("chooseall").checked = true; //设置全选框的状态
        }
      },

    },
    mounted() {

      this.$nextTick(() => {
        let that = this;
        const all = document.getElementById("chooseall");
        all.onchange = function (e) {
          console.log(all.checked);
          if (all.checked == true) {
            that.setchildtobeselect(that.formatData, true);
          } else {
            that.setchildtobeselect(that.formatData, false);
          }
        };
        this.toggleAllExpanded()
      });
    },

  };
</script>
<style rel="stylesheet/css">
  @keyframes treeTableShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @-webkit-keyframes treeTableShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>

<style scoped>
  .ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: 18px;
    height: 14px;
  }

  .ms-tree-space::before {
    content: "";
  }

  .processContainer {
    width: 100%;
    height: 100%;
  }

  table td {
    line-height: 26px;
  }

  .tree-ctrl {
    position: relative;
    cursor: pointer;
    color: #2196f3;
    margin-left: -18px;
  }
</style>
