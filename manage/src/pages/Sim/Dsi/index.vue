<template>
  <div class="page">
     <div class="btn"><el-button type="primary" size="small" @click="isShow = true">新增贫困生信息</el-button></div>
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
  </div>
</template>

<script>
import Tables from '../../../components/Tabels';
import AddPoorStudentInfo from './components/addPoorStudentInfo';
import { submitForm, getList, deleteStu } from './api';
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
   }
 },
 components: {
   Tables, // 注册Tables组件
   AddPoorStudentInfo, // 注册新增贫困生表单组件
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
     const { difficultId } = val;
     const params = {
       difficultId
     };
     const instance = deleteStu(params);
     instance
       .then( (res) => {
        const { status, msg } = res.data;
        if( status === 0 ){
          this.message({
            type: 'success',
            message: msg,
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
   justify-content: flex-start;
   align-items: center;
   margin-bottom: 10px;
 }
</style>