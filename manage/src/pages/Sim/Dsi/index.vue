<template>
  <div class="page">
    <!-- 搜索框的显示 -->
    <div class="searchInfo">
      <el-input v-model="search.studentNum" class="input" placeholder="请输入学生学号" clearable>
      </el-input>
      <el-button icon="el-icon-search" circle class="searchMore" @click="searchStudentNum"></el-button>
    </div>
    <!-- 导入信息上传文件页面 -->
    <el-dialog title="选择文件进行导入" :visible.sync="addFileShow" width="30%" :before-close="handleClose">
      <form>
        <input type="file" ref="fileInput">
      </form>
      <el-radio v-model="radio" label="1">将原信息进行导出</el-radio>
      <el-radio v-model="radio" label="2">不导出原信息</el-radio>
      <el-button @click="openTip">确认导入</el-button>
    </el-dialog>
    <div class="btn">
      <el-button type="primary" size="small" @click="isShow = true">新增贫困生信息</el-button>
      <el-button type="primary" size="small" @click="addFileShow = true">导入信息</el-button>
      <el-button type="primary" size="small" @click="showSelect = true">导出信息</el-button>
    </div>
    <Tables :tableColumns="Columns" :tableData="tableList" :operaColums="OperaColums" :total="total" :limit="pageLimit"
      :currentPage="currentPage" @click_1="changeStudentInfo" @click_2="deletePoorStudent" @changeLimit="changeLimit"
      @changePage="changePage" />
    <AddPoorStudentInfo :isShow="isShow" @changeShow="changeShow" @submit="submit" />
    <ModifyStudentInfo :isChangeInfoShow="isChangeInfoShow" @changeInfoShow="changeInfoShow" @submit="submitChangeInfo"
      :studentInfo="studentInfo" />
    <ExportStudentInfo :isShow="showSelect" :cityOptions="cityOptions" @change="exportShow" @submit="submitSelect" />
  </div>
</template>

<script>
import Tables from '../../../components/Tabels';
import ExportStudentInfo from './../../../components/ExportStudentInfo'
import AddPoorStudentInfo from './components/addPoorStudentInfo';
import ModifyStudentInfo from './components/modifyStudentInfo'
import { submitForm, getList, deleteStu, exportStuInfo, searchUseNum, importStuInfo, changeFrom } from './api';
import { columns, operaColumns } from './const';
export default {
  name: 'Dsi',
  data() {
    return {
      radio: '1',//单选框选中状态
      isShow: false,// 控制新增表单是否显示
      isChangeInfoShow: false,//控制修改表单是否显示
      currentPage: 1, // 当前页
      pageLimit: 5, // 当前页面分页数
      tableList: [], // 数据列表
      Columns: [],// 列表配置
      OperaColums: [],//操作按钮配置
      total: 0, // 数据条数
      studentInfo: {},//要修改的学生的信息
      showSelect: false,
      addFileShow: false,//导入学生信息页面的显示
      cityOptions: ['学号', '困难等级', '个人情况', '备注'],
      search: {
        studentNum: ''
      }
    }
  },
  components: {
    Tables, // 注册Tables组件
    AddPoorStudentInfo, // 注册新增贫困生表单组件
    ExportStudentInfo,
    ModifyStudentInfo
  },
  methods: {

    //新增信息的弹窗显示
    changeShow() {
      this.isShow = !this.isShow;
    },
    //新增信息修改
    submit(val) {
      const instance = submitForm(val);
      instance
        .then((res) => {
          const { status, msg } = res.data;
          if (status === 0) {
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
        .catch((err) => {
          this.$message({
            type: 'error',
            message: '前方拥堵，请稍后再试!',
          })
        })
    },

    //显示列表
    getTableList() {
      const params = {
        page: this.currentPage,
        pageLimit: this.pageLimit,
      }
      const instance = getList(params);
      instance
        .then((res) => {
          const { status, data, msg } = res.data;
          if (status === 0) {
            const { difficultStudents, sum } = data;
            this.total = sum;
            this.tableList = difficultStudents;
          } else {
            this.$message({
              type: 'error',
              message: msg,
            })
          }
        })
        .catch((err) => {
          this.$message({
            type: 'error',
            message: '前方拥堵，请稍后再试！',
          })
          throw new Error(err);
        })
    },

    //删除对应信息调用函数
    deletePoorStudent(val) {
      const { studentName } = val;
      this.$confirm(`您确定要删除${studentName}信息吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
          const difficultId = val.difficultId;
          const params = {
            difficultId
          };
          const instance = deleteStu(params);
          instance.then((res) => {
            const { status, msg } = res.data;
            if (status === 0) {
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
            .catch((err) => {
              this.$message({
                type: 'error',
                message: '前方拥堵，请稍后再试！',
              })
            })
        })
        .catch(()=>{
          this.$message({
          type: 'info',
          message: '已取消删除'
        });
        });
    },

    //修改页面显示的数量和页面
    changeLimit(val) {
      this.pageLimit = val;
      this.getTableList();
    },
    changePage(val) {
      this.currentPage = val;
      this.getTableList();
    },

    //导出信息方法
    submitSelect(value) {
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
    },
    exportShow() {
      this.showSelect = !this.showSelect;
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
            this.tableList = res.data.data.difficultStudents;
            this.total = res.data.data.sum;
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


    //关闭导入信息页面前调用的函数
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

    //点击导入信息按钮调用的函数
    handleFileUpload() {
      const file = this.$refs.fileInput.files[0];
      const formData = new FormData();
      formData.append('uploadFile', file);
      importStuInfo(formData).then((res) => {
        // this.form.files = res.data.data
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

    //导入文件之前调用
    openTip() {
      const file = this.$refs.fileInput.files[0];
      console.log(file);
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
    },


    //修改表单是否显示
    changeInfoShow() {
      this.isChangeInfoShow = !this.isChangeInfoShow;
    },
    //提交修改信息的表单
    submitChangeInfo(val) {
      console.log('修改事件出发发发发');
      const instance = changeFrom(val);
      instance
        .then((res) => {
          const { status, msg } = res.data;
          if (status === 0) {
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
        .catch((err) => {
          this.$message({
            type: 'error',
            message: '前方拥堵，请稍后再试!',
          })
        })
    },
    changeStudentInfo(value) {
      // 传递数据到子组件
      this.isChangeInfoShow = true;
      this.studentInfo = value
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
  margin-left: 10px;
}

/* 搜索框样式 */
.searchInfo {
  position: absolute;
  left: 250px;
  z-index: 11;
  top: 120px;
}

.input {
  width: 300px;
  margin-right: 10px;
}
</style>