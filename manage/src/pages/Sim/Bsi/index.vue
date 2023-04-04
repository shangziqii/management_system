<template>
  <div>
    <div class="page" v-show="$route.path=='/Main/Sim/Bsi'">
           <!-- 搜索学生 -->
     <el-dropdown>
      <span class="el-dropdown-link">
        选择搜索条件<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="selectStudentNum">学生学号搜索</el-dropdown-item>
        <el-dropdown-item @click.native="selectStuName">学生姓名搜索</el-dropdown-item>
        <el-dropdown-item @click.native="selectClass">班级搜索</el-dropdown-item>
        <el-dropdown-item @click.native="selectGrade">年级搜索</el-dropdown-item>
        <el-dropdown-item @click.native="selectMore">多条件进行搜索</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- 上传文件 -->
    <el-dialog
        title="选择文件进行导入"
        :visible.sync="addFileShow"
        width="30%"
        :before-close="handleClose">
        <input type="file" @change="handleFileUpload">
    </el-dialog>
    <!-- 搜索框的显示 -->
    <!-- 搜索框的显示 -->
    <!-- 学号 -->
    <div v-show="showNum">
      <el-input v-model="search.studentNum" class="searchInput" placeholder="请输入学生学号">
      </el-input>
      <el-button icon="el-icon-search" circle class="search" @click="searchStudentNum"></el-button>
    </div>
    <!-- 姓名 -->
    <div v-show="showStuName">
      <el-input v-model="search.studentName" placeholder="请输入学生姓名" class="searchInput">
      </el-input>
      <el-button icon="el-icon-search" circle class="search" @click="searchStudentName"></el-button>
    </div>
    <!-- 班级 -->
    <div v-show="showClass">
      <el-input v-model="search.studentClass" placeholder="请输入班级" class="searchInput">
      </el-input>
      <el-button icon="el-icon-search" circle class="search" @click="searchStudentClass"></el-button>
    </div>
    <!-- 年级 -->
    <div v-show="showGrade">
      <el-input v-model="search.studentGrade" placeholder="请输入年级" class="searchInput">
      </el-input>
      <el-button icon="el-icon-search" circle class="search" @click="searchStudentGrade"></el-button>
    </div>
    <!-- 多项搜索 -->
    <div v-show="showMore">
      <el-input v-model="search.studentNum" class="xuehao" placeholder="请输入学生学号">
      </el-input>
      <el-input v-model="search.studentName" class="xingming" placeholder="请输入学生姓名">
      </el-input>
      <el-input v-model="search.studentClass" class="banji" placeholder="请输入班级">
      </el-input>
      <el-input v-model="search.studentGrade" class="nianji" placeholder="请输入年级">
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

import { getList, addStudent, deleteStudent, modifyStu, exportStuInfo } from './api';
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
    showNum: true,//选择类型对应输入框的显示参数
      showStuName: false,//选择类型对应输入框的显示参数
      showClass:false,
      showGrade:false,
      showMore:false,
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
     //选择了使用学生学号进行搜索调用的函数
    selectStudentNum() {
      this.showNum = true
      this.showStuName = false
      this.showClass=false
      this.showGrade=false
      this.showMore=false
    },
    //选择了使用学生姓名进行搜索调用
    selectStuName() {
      this.showNum = false
      this.showStuName = true
      this.showClass=false
      this.showGrade=false
      this.showMore=false
    },
    selectClass() {
      this.showNum = false
      this.showStuName = false
      this.showClass=true
      this.showGrade=false
      this.showMore=false
    },
    selectGrade() {
      this.showNum = false
      this.showStuName = false
      this.showClass=false
      this.showGrade=true
      this.showMore=false
    },
    selectMore(){
      this.showNum = false
      this.showStuName = false
      this.showClass=false
      this.showGrade=false
      this.showMore=true
    },
     //使用学生学号进行搜索
     searchStudentNum() {
      if (!this.search.studentNum) {
        // console.log('数据为空');
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
          studentNum: this.search.studentNum
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
     searchStudentName() {
      if (!this.search.studentName) {
        // console.log('数据为空');
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
          studentName: this.search.studentName
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
    searchStudentClass() {
      if (!this.search.studentClass) {
        // console.log('数据为空');
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
          className: this.search.studentClass
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
    searchStudentGrade() {
      if (!this.search.studentGrade) {
        // console.log('数据为空');
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
          studentGrade: this.search.studentGrade
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
    searchMoreTo() {
      if (!this.search.studentNum&&!this.search.studentName&&!this.search.studentClass&&!this.search.studentGrade) {
        // console.log('数据为空');
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
    handleFileUpload(e) {
    const file = e.target.files[0];
    let reader = new FileReader();
    
    reader.onload = (e) => {
      let data = new Uint8Array(e.target.result);
      let workbook = XLSX.read(data, {type: 'array'});
      let worksheet = workbook.Sheets[workbook.SheetNames[0]];
      let json = XLSX.utils.sheet_to_json(worksheet);
      console.log(json);
      // 将数据发送到后台
      // this.sendDataToServer(json);
    };
    
    reader.readAsArrayBuffer(file);
  },
  
  // 发送数据到后台
/*   sendDataToServer(data) {
    // 使用 axios 或其他 HTTP 库发送 POST 请求
    axios.post('/api/data', data)
      .then(response => console.log(response))
      .catch(error => console.error(error));
  } */
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
 /* 下拉框选择的基本样式 */
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}

.el-icon-arrow-down {
  font-size: 12px;
}
/* 搜索框样式 */
.searchInput {
  position: absolute;
  font-size: 14px;
  z-index: 11;
  top: 84px;
  left: 377px;
  width: 500px;
}

/* 下拉选择框样式 */
.el-dropdown {
  display: inline-block;
  position: relative;
  color: #606266;
  font-size: 14px;
  position: absolute;
  z-index: 23;
  top: 84px;
  left: 262px;
  height: 90px;
}

/* 搜索的按钮 */
.search {
  position: absolute;
  top: 144px;
  left: 887px;
  z-index: 23;
}
.searchMore {
  position: absolute;
  top: 144px;
  left: 1266px;
  z-index: 23;
}
.xuehao{
  position: absolute;
  font-size: 14px;
  z-index: 11;
  top: 84px;
  left: 377px;
  width: 200px;
}
.xingming{
  position: absolute;
  font-size: 14px;
  z-index: 11;
  top: 84px;
  left: 600px;
  width: 200px;
}
.banji{
  position: absolute;
  font-size: 14px;
  z-index: 11;
  top: 84px;
  left: 823px;
  width: 200px;
}
.nianji{
  position: absolute;
  font-size: 14px;
  z-index: 11;
  top: 84px;
  left: 1046px;
  width: 200px;
}
</style>