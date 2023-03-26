<template>
    <div class="page">
       <div class="btn"><el-button type="primary" size="small" @click="addFormShow = true">新增学生信息</el-button></div>
       <Tables 
         :tableColumns="Columns" 
         :tableData="tableList" 
         :operaColums="OperaColums" 
         :total="total"
         :limit="pageLimit"
         :currentPage="currentPage"
         @click_1="deleteStu"
         @click_2="modify"
         @changeLimit="changeLimit"
         @changePage="changePage"
        />
       <AddStudentInfo :isShow="addFormShow" @change="changeShow" @submit="submitForm"/>
       <ModifyFormInfo :isShow="modifyFormShow" @change="modifyShow" :studentInfo="studentInfo" @save="modifyStudnet"/>
    </div>
</template>

<script>
import Tables from '../../../components/Tabels';
import AddStudentInfo from './components/addStudentInfo';
import ModifyFormInfo from './components/modifyStudentInfo';
import { getList, addStudent, deleteStudent, modifyStu } from './api';
import { columns, operaColums } from './const';
export default {
  name: 'Bsi',
  data() {
   return {
    currentPage: 1, // 当前页
    pageLimit: 5, // 当前页面分页数
    tableList: [] , // 数据列表
    Columns: [],// 列表配置
    OperaColums: [],//操作按钮配置
    addFormShow: false,
    total: 0, // 数据条数
    modifyFormShow: false, //修改表单是否展示
    studentInfo:{},//要修改的学生的信息
   }
  },
  components: {
    Tables, //注册Tables组件
    AddStudentInfo, //注册新增学生基本信息表单
    ModifyFormInfo, //注册修改学生信息表单组件
  },
  methods: {
    getTableList() {
       const params = {
         page: this.currentPage,
         pageLimit: this.pageLimit,
       }
       console.log(params)
       const instance = getList(params);
       instance
       .then(( res ) => {
         console.log(res);
         const { status, data } = res.data;
         const { students, sum } = data;
         if(status === 0) { 
           this.total = sum;
           this.tableList = students;
         } else {
           this.$message({
             type: 'error',
             message: '前方拥堵，请稍后再试!'
           })
         }
       })
       .catch(( err ) => {
         this.$message({
             type: 'error',
             message: '前方拥堵，请稍后再试!'
           })
         throw new Error(err);
       })
       
    },
    changeShow() {
      this.addFormShow = !this.addFormShow;
    },
    modifyShow() {
      this.modifyFormShow = !this.modifyFormShow;
    },
    modifyStudnet(values) {
      const { userId , ...otherdata} = values;
      const params ={ studentId:userId , ...otherdata };
      const instance = modifyStu(params);
      instance
        .then(( res ) => {
          const { status, msg } = res.data;
          if(status === 0) {
            this.$message({
              type: 'success',
              message: msg,
            })
            this.pageLimit = 5;
            this.currentPage = 1;
            this.getTableList();
            this.modifyFormShow = Boolean(false);
          } else {
            this.$message({
              type: 'warning',
              message: msg,
            })
          }

        })
        .catch(( err ) => {
           this.$message({
             type: 'error',
             message: '前方拥堵，请稍后再试',
           })
           throw new Error(err);
        })
    },
    modify(values) {
      this.modifyFormShow = true;
      this.studentInfo = values;
    },
    submitForm(values) {
      const instance = addStudent(values);
      instance
       .then(( res ) => {
         const { status, msg } = res.data;
         if( status === 0){
           this.message({
             type: 'success',
             message: msg
           })
           this.currentPage = 1;
           this.pageLimit = 5;
           this.getTableList();
         } else {
           this.message({
             type: 'error',
             message: msg,
           })
         } 
       })
       .catch(( err ) => {
         throw new Error(err)
       })
    },
    deleteStu(values) {
      console.log(values)
      const {studentId, studentName} = values;
      this.$confirm(`您确定要删除${studentName}信息吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const instance = deleteStudent({studentId})
          instance
           .then(( res ) => {
             const { status } = res.data;
             if(status === 0) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              this.currentPage = 1;
              this.pageLimit = 5;
              this.getTableList();
             } else {
               this.$message({
                  type: 'error',
                  message: '前方拥堵，删除失败，请稍后再试!'
                });
             }
           })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
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
    this.OperaColums = operaColums;
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