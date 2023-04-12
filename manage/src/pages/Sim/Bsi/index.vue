<template>
  <div>
    <div class="page" v-show="$route.path=='/Main/Sim/Bsi'">
    <!-- 上传文件 -->
    <el-dialog
        title="选择文件进行导入"
        :visible.sync="addFileShow"
        width="30%"
        :before-close="handleClose"
        >
      <form>
        <input type="file" ref="fileInput" @change="handleFileUpload">
      </form>
      <el-button>确认导入</el-button>
      </el-dialog>
    <!-- 搜索框的显示 -->
    <div class="searchInfo">
      <el-input v-model="search.studentNum" class="input" placeholder="请输入学生学号">
      </el-input>
      <el-input v-model="search.studentName" class="input" placeholder="请输入学生姓名">
      </el-input>
      <el-input v-model="search.studentClass" class="input" placeholder="请输入班级">
      </el-input>
      <el-input v-model="search.studentGrade" class="input" placeholder="请输入年级">
      </el-input>
      <el-button icon="el-icon-search" circle class="searchMore" @click="searchMoreTo"></el-button>
    </div>
       <div class="btn">
        <el-button type="primary" size="small" @click="addFormShow = true">新增学生信息</el-button>
        <el-button type="primary" size="small" @click="addFileShow=true">导入信息</el-button>
        <el-button type="primary" size="small" @click="showSelect = true">导出信息</el-button>
      </div>
       <Tables 
         :tableColumns="Columns" 
         :tableData="tableList" 
         :operaColums="OperaColums" 
         :total="total"
         :limit="pageLimit"
         :currentPage="currentPage"
         @click_1="deleteStu"
         @click_2="modify"
         @click_3="details"
         @changeLimit="changeLimit"
         @changePage="changePage"
        />
       <AddStudentInfo :isShow="addFormShow" @change="changeShow" @submit="submitForm"/>
       <ModifyFormInfo :isShow="modifyFormShow" @change="modifyShow" :studentInfo="studentInfo" @save="modifyStudnet"/>
       <ExportStudentInfo :isShow="showSelect" :cityOptions="cityOptions" @change="exportShow" @submit="submitSelect"/>
    </div>
    <router-view></router-view>
    </div>
</template>

<script>
import Tables from '../../../components/Tabels';
import AddStudentInfo from './components/addStudentInfo';
import ModifyFormInfo from './components/modifyStudentInfo';
import ExportStudentInfo from './../../../components/ExportStudentInfo'

import { getList, addStudent, deleteStudent, modifyStu, exportStuInfo ,importStuInfo} from './api';
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
    showSelect:false,
    addFileShow:false,
    cityOptions: ['学号', '姓名', '班级', '年龄'],
      search: {
        studentNum: '',
        studentName:'',
        studentClass:'',
        studentGrade:''
      }, //根据字段进行搜索
   }
  },
  components: {
    Tables,
    AddStudentInfo,
    ModifyFormInfo,
    ExportStudentInfo
},
  methods: {
    getTableList() {
       const params = {
         page: this.currentPage,
         pageLimit: this.pageLimit,
       }
       console.log(params)
       const instance = getList(params);
       instance.then(( res ) => {
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
    modifyStudnet(){
      console.log('提交选择信息');
    },
    changeShow() {
      this.addFormShow = !this.addFormShow;
    },
    modifyShow() {
      this.modifyFormShow = !this.modifyFormShow;
    },
    exportShow(){
      this.showSelect=!this.showSelect;
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
    handleClose() {
      this.getTableList()
      this.addFileShow = false
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
    details(val){
      console.log(val);
      this.$router.push('/Main/Sim/Bsi/InfoDetails')
    },
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
    searchMoreTo() {
      if (!this.search.studentNum&&!this.search.studentName&&!this.search.studentClass&&!this.search.studentGrade) {
        this.$message('请输入内容进行搜索');
        this.getTableList()
      }
      else {
        this.$message({
          showClose: true,
          message: '正在搜索请稍等'
        });
        const searchInfo = {
          page: this.currentPage,
          pageLimit: this.pageLimit,
          studentNum:this.search.studentNum,
          studentName:this.search.studentName,
          className: this.search.studentClass,
          grade:this.search.studentGrade
        }
        getList(searchInfo).then((res) => {
          if (res.data.status === 0) {
            this.tableList = res.data.data.students
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
    },
    handleFileUpload() {
      const file = this.$refs.fileInput.files[0];
      const formData = new FormData();
      formData.append('uploadFile', file);
      importStuInfo(formData).then((res) => {
        // this.form.files = res.data.data
        console.log(res);
      }).catch((error) => {
        console.error(error);
      })
    }
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
   justify-content: flex-end;
   align-items: center;
   margin-bottom: 10px;
 }
 .exportInfo{
  display:flex;
 }
/* 搜索的按钮 */
.searchMore {
margin-left:10px;
}

/* 搜索框样式 */
.searchInfo{
  position:absolute;
  left:250px;
  top:120px;
  z-index:11;
}
.input{
  width: 200px;
  margin-right:10px;
}

</style>