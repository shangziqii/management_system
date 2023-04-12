<template>
  <div class="page">
      <!-- 搜索框的显示 -->
    <div class="searchInfo">
      <el-input v-model="search.studentNum" class="input" placeholder="请输入学生学号">
      </el-input>
      <el-button icon="el-icon-search" circle class="searchMore" @click="searchStudentNum"></el-button>
    </div>
    <div class="btn">
      <el-button type="primary" size="small" @click="isShow = true">新增贫困生信息</el-button>
      <el-button type="primary" size="small" @click="showSelect = true">导出信息</el-button>
      </div>
     <Tables 
      :tableColumns="Columns" 
      :tableData="tableList" 
      :operaColums="OperaColums" 
      :total="total"
      :limit="pageLimit"
      :currentPage="currentPage"
      @click_1="deletePoorStudent"
      @changeLimit="changeLimit"
      @changePage="changePage"
     />
     <AddPoorStudentInfo :isShow="isShow" @changeShow="changeShow" @submit="submit"/>
     <ExportStudentInfo :isShow="showSelect" :cityOptions="cityOptions" @change="exportShow" @submit="submitSelect"/>
  </div>
</template>

<script>
import Tables from '../../../components/Tabels';
import ExportStudentInfo from './../../../components/ExportStudentInfo'
import AddPoorStudentInfo from './components/addPoorStudentInfo';
import { submitForm, getList, deleteStu ,exportStuInfo,searchUseNum} from './api';
import { columns, operaColumns } from './const';
export default {
 name: 'Dsi',
 data() {
   return {
      isShow: false,// 控制新增表单是否显示
      currentPage: 1, // 当前页
      pageLimit: 5, // 当前页面分页数
      tableList: [] , // 数据列表
      Columns: [],// 列表配置
      OperaColums: [],//操作按钮配置
      total: 0, // 数据条数
      studentInfo:{},//要修改的学生的信息
      showSelect:false,
      cityOptions:['学号','困难等级','个人情况','备注'],
      search:{
        studentNum:''
      }
    }
 },
 components: {
   Tables, // 注册Tables组件
   AddPoorStudentInfo, // 注册新增贫困生表单组件
   ExportStudentInfo
 },
 methods: {
   changeShow() {
     this.isShow = !this.isShow;
   },
   submit(val) {
     const instance = submitForm(val);
     instance
       .then(( res ) => {
            const { status, msg } = res.data;
            if( status === 0 ) {
               this.$message({
                 type: 'success',
                 message: msg,
               })
            // 记住再调一次列表接口
            this.currentPage = 1;
            this.pageLimit = 5;
            this.getTableList();
            this.changeShow();
            } else {
              this.message({
                type: 'error',
                message: msg
              })
            }
       })
       .catch(( err ) => {
         this.$message({
           type: 'error',
           message: '前方拥堵，请稍后再试!',
         })
       })
   },
   getTableList() {
     const params = {
       page:this.currentPage,
       pageLimit: this.pageLimit,
     }
     const instance = getList(params);
     instance
       .then(( res ) => {
         const { status, data, msg} = res.data;
         if( status === 0 ){
          const {difficultStudents, sum} = data;
          this.total =sum;
          this.tableList = difficultStudents;
         } else {
           this.$message({
           type: 'error',
           message: msg,
         })
         }
       })
       .catch(( err ) => {
         this.$message({
           type: 'error',
           message: '前方拥堵，请稍后再试！',
         })
         throw new Error( err );
       })
   },
   deletePoorStudent(val) {
     const difficultId  = val.voDifficultId;
     const params = {
      difficultId
     };
     const instance = deleteStu(params);
     instance.then( (res) => {
        const { status, msg } = res.data;
        if( status === 0 ){
          this.$message({
            type: 'success',
            message: msg
          })
          this.currentPage = 1;
          this.pageLimit = 5;
          this.getTableList();
        } else {
          this.$message({
           type: 'error',
           message: msg,
         })
        }
       })
       .catch( (err) => {
         this.$message({
           type: 'error',
           message: '前方拥堵，请稍后再试！',
         })
       })
   },
    changeLimit(val) {
      this.pageLimit = val;
      this.getTableList();
    },
    changePage(val) {
      this.currentPage = val;
      this.getTableList();
    },

    //导出信息方法
    submitSelect(value){
      exportStuInfo(value).then((res)=>{
        window.open(res.data.data)
        this.showSelect=false
        this.$message({
          message: '下载成功',
          type: 'success'
        });
      }).catch((error)=>{
        this.$message.error('未知错误');
      })
    },
    exportShow(){
      this.showSelect=!this.showSelect;
    },
    //导出信息
    submitSelect(value){
      exportStuInfo(value).then((res)=>{
        window.open(res.data.data)
        this.showSelect=false
        this.$message({
          message: '下载成功',
          type: 'success'
        });
      }).catch((error)=>{
        this.$message.error('未知错误');
      })
    },
    //使用学生学号进行搜索
    searchStudentNum() {
      if (!this.search.studentNum) {
        // console.log('数据为空');
        this.$message('请输入内容进行搜索');
        this.gepunishList()
      }
      else {
        this.$message({
          showClose: true,
          message: '正在搜索请稍等'
        });
        const searchInfo = {
          page: this.currentPage,
          pageLimit: this.pageLimit,
          studentNum: this.search.studentNum
        }
        searchUseNum(searchInfo).then((res) => {
          if (res.data.status === 0) {
            this.tableData = res.data.data.punishStudents
            this.$message({
              message: '搜索成功',
              type: 'success'
            });
          }
          else {
            this.$message({
              showClose: true,
              message: '查询失败',
              type: 'error'
            });
          }
        }).catch((error) => {
          this.$message({
            showClose: true,
            message: '连接错误，请稍后',
            type: 'error'
          });
        })
      }
    }
 },
 mounted() {
  this.Columns = columns;
  this.OperaColums = operaColumns;
  this.getTableList();
 },
}
</script>

<style scoped>
 .page {
   width: 100%;
   height: 100%;
 }
 .btn {
   display: flex;
   flex-direction: row;
   justify-content: flex-end;
   align-items: center;
   margin-bottom: 10px;
 }

/* 搜索的按钮 */
.searchMore {
margin-left:10px;
}

/* 搜索框样式 */
.searchInfo{
  position:absolute;
  left:250px;
  z-index:11;
  top:120px;
}
.input{
  width: 300px;
  margin-right:10px;
}
</style>