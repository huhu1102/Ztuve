<template>
    <!-- 产品顏色 -->
     <div>
        <el-container>
          <el-header style="padding: 0 20px;">
            <div style="   border-left: 4px solid red;margin-left: 5px;text-align: left;"><strong style="margin-left: 10px;">联系人管理</strong></div>
            <div class="contact-use-header">

            <div class="contact-header-right">
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
              <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search" @click="searchEmp">搜索
              </el-button>
              </div>
            <div class="product-header-left">
            <el-button  type="primary"  @click="addAndFlushConcat" size="mini" icon="el-icon-plus"  >添加</el-button>
              </div>
            </div>
          </el-header>
          <el-main style="padding: 0 20px;">
            <el-table   :cell-style="{padding:'2px',fontSize:'12px'}" highlight-current-row :data="units" fit  style="width: 100%">
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
                label="姓名"
                >
              </el-table-column>
              <el-table-column
                prop="phone"
                align="left"
                fixed
                label="电话"
              >
              </el-table-column>
                <el-table-column
                  prop="post"
                  align="left"
                  fixed
                  label="岗位"
                >
                </el-table-column>
                  <el-table-column
                    prop="note"
                    align="left"
                    fixed
                    label="备注"
                  >
              </el-table-column>
              <el-table-column
                align="left"
                label="操作"
                >
                <template slot-scope="scope">
                  <el-button @click="showEditDataView(scope.$index,scope.row)" style="padding: 3px 4px 3px 4px;margin: 2px"
                             size="mini">编辑
                  </el-button>

                  <el-button type="danger" style="padding: 3px 4px 3px 4px;margin: 2px" size="mini"
                             @click="deleteData(scope.row)">删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-main>


        </el-container>

       <el-dialog v-dialogDrag :title="dialogTitle"
                  style="padding: 0px;"
                  :close-on-click-modal="false"
                  :visible.sync="dialogFormVisible"
                  @close="cancelOpt"
                  width="500px">
         <div style="width: 100% " v-if="dialogFormVisible">
           <el-form  :model="unit" :rules="rules" ref="addDataForm"  size="sam" label-width="90px" >

             <el-form-item label="姓名:" prop="name">
               <el-input prefix-icon="el-icon-edit" v-model="unit.name" size="mini" style="width: 200px"
                         placeholder="姓名"></el-input>
             </el-form-item>
             <el-form-item label="电话:" prop="phone">
               <el-input prefix-icon="el-icon-edit" v-model="unit.phone" size="mini" style="width: 200px"
                         placeholder="电话"></el-input>
             </el-form-item>
             <el-form-item label="岗位:" prop="post">
               <el-input prefix-icon="el-icon-edit" v-model="unit.post" size="mini" style="width: 200px"
                         placeholder="岗位"></el-input>
             </el-form-item>
             <el-form-item label="备注:" prop="note">
               <el-input prefix-icon="el-icon-edit" v-model="unit.note" size="mini" style="width: 200px"
                         placeholder="备注"></el-input>
             </el-form-item>
           </el-form>
         </div>
         <div slot="footer" class="dialog-footer">
           <el-button @click="dialogFormVisible=false">取 消</el-button>
           <el-button type="primary" @click="addData('addDataForm')">确 定</el-button>
         </div>
       </el-dialog>
     </div>
   
   </template>
   <script>
     export default{
       data() {
         return {
           dialogVisible: false,
           showOrHidePop: false,
           depTextColor: '#c0c4cc',
           keywords: '',
           tableLoading: false,
           advanceSearchViewVisible: false,
           rules: {
             name: [{required: true, message: '必填:中文名', trigger: 'blur'}],
           },
           units:[],
           defaultProps: {
             label: 'name',
             isLeaf: 'leaf',
             children: 'children'
           },
           dialogTitle: '',
           currentPage:1,
           formLabelWidth: '120px',
           totalCount: -1,
           unit: {
             id:0,
             name: '',
             phone:'',
             post:'',
             note:''
           },
           deps: [],
          
           dialogTableVisible: false,
           dialogFormVisible: false,
           currentRowData:{},//当前选中行数据
           currentIndex:'',//当前选中行号
         }
       },
       mounted: function () {
         this.initData();
         // this.formatGender(row);
       },
       methods: {
 
         initData(){
           var _this = this;
           _this.loadDatas();
     
         },
         keywordsChange(val){
           if (val == '') {
             this.loadDatas();
           }
         },
         currentChange(currentChange){
           this.currentPage = currentChange;
           console.log(this.currentPage);
           this.loadDatas();
         },
         addAndFlushConcat(){
           this.dialogTitle = "添加联系人";
           this.emptyData();
           this.dialogFormVisible = true;
   
         },
   
         searchEmp(){
           this.loadDatas();
         },
         showEditDataView(index,row){
           this.dialogTitle = "编辑";
           console.log(row);
           console.log(index);
           this.unit=row;
            delete  this.unit.sysMenu;
            delete this.unit.users;
           this.dialogFormVisible = true;
         },
         addData(addDataForm){
           this.dialogFormVisible=true;
           var _this = this;
   
           this.$refs[addDataForm].validate((valid) => {
             if (valid) {
               if (this.unit.id) {
                 //更新
                 this.tableLoading = true;
                 console.log(this.unit);
                 this.postRequest("/clientConcat/update", this.unit).then(resp=> {
                   _this.tableLoading = false;
                   if (resp && resp.status === 200&&resp.data.success) {
                     // var data = resp.data;
                     _this.dialogFormVisible = false;
                     _this.loadDatas();
                     _this.emptyData();
   
                   }
                 })
               } else {
                 //添加
                 this.tableLoading = true;
                 console.log(_this.unit);
                 this.postRequest("/clientConcat/add", this.unit).then(resp=> {
                   _this.tableLoading = false;
                   if (resp && resp.status === 200&&resp.data.success) {
                     _this.dialogFormVisible = false;
                     _this.loadDatas();
                     _this.emptyData();
   
                   }
                 })
               }
             } else {
               return false;
             }
           });
         },
         cancelOpt(){
           this.dialogFormVisible=false;
           this.loadDatas();
           // this.emps[this.currentIndex] =this.currentRowData;
         },
         deleteData(row){
           this.$confirm('此操作将删除[' + row.name + '], 是否继续?', '提示', {
             confirmButtonText: '确定',
             cancelButtonText: '取消',
             type: 'warning'
           }).then(() => {
             this.doDelete(row.id);
           }).catch(() => {
           });
         },
         doDelete(ids){
           this.tableLoading = true;
           let _this = this;
           this.getRequest("/clientConcat/delete?id=" + ids).then(resp=> {
             _this.tableLoading = false;
             if (resp && resp.status ===200 &&resp.data.success) {
               _this.loadDatas();
             }
           })
         },
         loadDatas(){
           let _this = this;
           this.tableLoading = true;
           this.getRequest("/clientConcat/findByPage?queryName="+this.keywords
               +"&page="+this.currentPage
               +"&size=10"
                 ).then(resp=> {
             this.tableLoading = false;
             if (resp && resp.status === 200 &&resp.data.success) {
               _this.units = resp.data.data;
               _this.totalCount=resp.data.total;
               _this.emptyData();
             }
           })
         },
       
         emptyData(){
           console.log('+++++_+++++_')
           this.unit = {
             id:0,
             name: '',
             phone:'',
             post:'',
             note:''
           }
         }
       },
   
       computed: {
         routes(){
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
     .contact-header-right {
       display: inline;
       font-weight: 700;
       text-align: left;
       margin-top: 10px;
     }

     .contact-use-header {
       padding: 0 20px;
       display: flex;
       justify-content: space-between;
       align-items: center
     }
   </style>
