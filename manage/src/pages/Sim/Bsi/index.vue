<template>
  <div class="classManage">
    <div class="page" v-show="$route.path == '/Main/Sim/Bsi'">
      <!-- 上传文件 -->
      <el-dialog title="选择文件进行导入" :visible.sync="addFileShow" width="30%" :before-close="handleClose">
        <form>
          <input type="file" ref="fileInput">
        </form>

        <el-radio v-model="radio" label="1">备 份</el-radio>
        <el-radio v-model="radio" label="2">不 备 份</el-radio>
        <el-button @click="openTip">确认导入</el-button>
      </el-dialog>
      <!-- 模糊搜索某学生 -->
      <div class="tabelTop">
        <div class="search">
          <div class="findInput">
            <el-input v-model="search.studentNum" class="input" placeholder="请输入学生学号" clearable>
            </el-input>
            <el-input v-model="search.studentName" class="input" placeholder="请输入学生姓名" clearable>
            </el-input>
            <el-input v-model="search.studentClass" class="input" placeholder="请输入班级" clearable>
            </el-input>
            <el-input v-model="search.studentGrade" class="input" placeholder="请输入年级" clearable>
            </el-input>
          </div>
          <el-button icon="el-icon-search" circle class="findButton" @click="searchMoreTo"></el-button>
          <!-- <el-button @click="dialogVisible = true" type="primary" class="findButton">添加班级</el-button> -->
        </div>
        <div class="addButton">
          <el-button type="primary" size="small" @click="addFormShow = true">新增学生信息</el-button>
          <el-button type="primary" size="small" @click="addFileShow = true">导入信息</el-button>
          <!-- <el-button type="primary" size="small" @click="showSelect = true">导出信息</el-button> -->
          <el-button type="primary" size="small" @click="submitSelect">导出信息</el-button>
        </div>
      </div>

      <!-- 搜索框的显示 -->
      <!-- <div class="searchInfo">
        <el-input v-model="search.studentNum" class="input" placeholder="请输入学生学号" clearable>
        </el-input>
        <el-input v-model="search.studentName" class="input" placeholder="请输入学生姓名" clearable>
        </el-input>
        <el-input v-model="search.studentClass" class="input" placeholder="请输入班级" clearable>
        </el-input>
        <el-input v-model="search.studentGrade" class="input" placeholder="请输入年级" clearable>
        </el-input>
        <el-button icon="el-icon-search" circle class="searchMore" @click="searchMoreTo"></el-button>
      </div> -->
      <!-- <div class="btn">
        <el-button type="primary" size="small" @click="addFormShow = true">新增学生信息</el-button>
        <el-button type="primary" size="small" @click="addFileShow = true">导入信息</el-button> -->
        <!-- <el-button type="primary" size="small" @click="showSelect = true">导出信息</el-button> -->
        <!-- <el-button type="primary" size="small" @click="submitSelect">导出信息</el-button>
      </div> -->
      <Tables :tableColumns="Columns" :tableData="tableList" :operaColums="OperaColums" :total="total" :limit="pageLimit"
        :currentPage="currentPage" @click_1="modify" @click_2="deleteStu" @changeLimit="changeLimit"
        @changePage="changePage" />
      <!-- @click_3="details" -->
      <AddStudentInfo :isShow="addFormShow" @change="changeShow" ref='addForm' @submit="submitForm"/>
      <!-- <ModifyFormInfo :isShow="modifyFormShow" @change="modifyShow" :studentInfo="studentInfo" @save="modifyStudnet" /> -->
      <ModifyFormInfo :isShow="modifyFormShow" @change="modifyShow" :studentInfo="studentInfo" @save="modifyStudnet" />

      <!-- <ExportStudentInfo :isShow="showSelect" :cityOptions="cityOptions" @change="exportShow" @submit="submitSelect" /> -->
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Tables from '../../../components/Tabels';
import AddStudentInfo from './components/addStudentInfo';
import ModifyFormInfo from './components/modifyStudentInfo';
import ExportStudentInfo from './../../../components/ExportStudentInfo'


import { getList, addStudent, deleteStudent, modifyStu, exportStuInfo, importStuInfo } from './api';
import { columns, operaColums } from './const';
export default {
  name: 'Bsi',
  data() {
    return {
      icon: null,//上传文件图标显示
      radio: '1',//单选框选中状态
      currentPage: 1, // 当前页
      pageLimit: 5, // 当前页面分页数
      tableList: [], // 数据列表
      Columns: [],// 列表配置
      OperaColums: [],//操作按钮配置
      addFormShow: false,
      total: 0, // 数据条数
      modifyFormShow: false, //修改表单是否展示
      studentInfo: {},//要修改的学生的信息
      showSelect: false,
      addFileShow: false,
      cityOptions: ['学号', '姓名', '班级', '年龄'],
      search: {
        studentNum: '',
        studentName: '',
        studentClass: '',
        studentGrade: ''
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
      instance.then((res) => {
        console.log(res);
        const { status, data } = res.data;
        const { students, sum } = data;
        console.log(sum);
        if (status === 0) {
          this.total = sum;
          console.log(this.total);
          this.tableList = students;
        } else {
          this.$message({
            type: 'error',
            message: '前方拥堵，请稍后再试!'
          })
        }
      })
        .catch((err) => {
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
    exportShow() {
      this.showSelect = !this.showSelect;
    },
    modifyStudnet(values) {
      const { userId, ...otherdata } = values;
      const params = { studentId: userId, ...otherdata };
      const instance = modifyStu(params);
      instance
        .then((res) => {
          const { status, msg } = res.data;
          if (status === 0) {
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
        .catch((err) => {
          this.$message({
            type: 'error',
            message: '前方拥堵，请稍后再试',
          })
          throw new Error(err);
        })
    },
    handleClose() {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.radio = '1'
          this.$refs.fileInput.value = null//关闭前将已选择文件清空
          this.getTableList()
          this.addFileShow = false
        })
        .catch(_ => { });
    },
    modify(values) {
      this.modifyFormShow = true;
      this.studentInfo = values;
    },
    submitForm(values) {
      const instance = addStudent(values);
      instance
        .then((res) => {
          const { status, msg } = res.data;
          if (status === 0) {
            this.$message({
              type: 'success',
              message: msg
            })
            console.log(this.$refs.addForm.ruleForm);
            this.addFormShow = Boolean(false);
            this.$refs.addForm.ruleForm = {}
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
        .catch((err) => {
          throw new Error(err)
        })
    },
    deleteStu(values) {
      const { studentId, studentName } = values;
      this.$confirm(`您确定要删除${studentName}的信息吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const instance = deleteStudent({ studentId })
        instance
          .then((res) => {
            const { status } = res.data;
            if (status === 0) {
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
    details(val) {
      console.log(val);
      this.$router.push('/Main/Sim/Bsi/InfoDetails')
    },
    submitSelect() {
      this.$confirm('确认导出？')
        .then(_ => {
          const value = ['学号', '姓名', '班级', '年龄']
          exportStuInfo(value).then((res) => {
            window.open(res.data.data)
            this.showSelect = false
            this.$message({
              message: '下载成功',
              type: 'success'
            });
          }).catch((error) => {
            this.$message.error('未知错误');
          })
        })
        .catch(_ => { });

    },
    //使用学生学号进行搜索
    searchMoreTo() {
      if (!this.search.studentNum && !this.search.studentName && !this.search.studentClass && !this.search.studentGrade) {
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
          studentNum: this.search.studentNum,
          studentName: this.search.studentName,
          className: this.search.studentClass,
          grade: this.search.studentGrade
        }
        getList(searchInfo).then((res) => {
          if (res.data.status === 0) {
            if (res.data.data.students.length > 0) {
              this.tableList = res.data.data.students
              this.$message({
                message: '搜索成功',
                type: 'success'
              });
            }
            else {
              this.$message({
                showClose: true,
                message: '无相关信息'
              });
              this.getTableList()
            }
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
        console.log(res.data.status);

        //这里status值
        if (res.data.status === 0) {
          this.$message({
            type: 'success',
            message: '导入成功!'
          });
          this.addFileShow = false
          this.getTableList();
        }
        else {
          this.$message({
            type: 'error',
            message: '未知错误'
          })
        }
      }).catch((error) => {
        console.error(error);
      })
    },
    fileTest(file) {
      const validFormats = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']; // .xlsx文件的MIME类型
      const isFormatValid = validFormats.includes(file.type); // 判断文件类型是否在可接受的格式列表中
      if (!isFormatValid) {
        this.$message.error('上传的导入文件只能是 xlsx 格式!');
      }
      return isFormatValid;
    },
    openTip() {
      const file = this.$refs.fileInput.files[0];
      if (this.fileTest(file)) {
        if (file) {
          this.$confirm('此操作将会覆盖掉原来的学生信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (this.radio === '1') {
              this.submitSelect()
            }
            this.handleFileUpload();
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消导入'
            })
          })
        }
        else {
          this.$message({
            type: 'error',
            message: '请选择文件!'
          })
        }
      }
      else {

      }

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
  position: relative;
  z-index: 999;
  transform: translate(-25px, 75px);
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 10px;
}

.exportInfo {
  display: flex;
}

/* 搜索的按钮 */
.searchMore {
  margin-left: 10px;
  border-radius: 4px;
}

/* 搜索框样式 */
.searchInfo {
  position: absolute;
  left: 320px;
  top: 150px;
  z-index: 11;
}

/* .input {
  width: 150px;
  margin-right: 10px;
} */

.classManage /deep/ .el-dialog__title {
  font-size: 24px;
  font-weight: bold;
}

div /deep/ .el-dialog {
  border-radius: 8px;
}

.el-dialog__wrapper {
  line-height: 28px;
}
.search {
  position: relative;
  display: inline-block;
  display: flex;
  justify-content:space-between;
}

.tabelTop {
  display: flex;
  width: 95%;
  position: absolute;
  z-index: 33;
  top: 10px;
  justify-content: space-between;
  padding:0 35px;
}

.classManage {
  position: relative;
}
.findInput {
  display: inline-block;
  z-index: 11;
  display: flex;
  justify-content:space-between;
}
.findInput .input{
  width: 150px;
  margin-right: 10px;
}
.findButton {
  position: absolute;
  right: -45px;
  z-index: 23;
  border-radius: 4px;
}
.addButton{
  line-height: 40px;
}


</style>