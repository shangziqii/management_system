<template>
  <div class="classManage">

    <!-- 模糊搜索某学生 -->
    <div class="tabelTop">
      <div class="search">
        <div class="findInput">
          <el-input v-model="search.studentNum" class="input" placeholder="请输入学生学号" clearable></el-input>
        </div>
        <el-button icon="el-icon-search" circle class="findButton" @click="searchStudentNum"></el-button>
      </div>
      <div class="addButton">
        <!-- 添加信息按钮 -->
        <el-button type="primary" size="small" @click="dialogVisible = true">添加信息</el-button>
        <el-button type="primary" size="small" @click="addFileShow = true">导入信息</el-button>
        <!-- 导出excel表格 -->
        <el-button type="primary" size="small" class="exportInfo" @click="submitSelect">导出信息</el-button>
      </div>
    </div>

    <!-- 添加信息按钮 -->
    <!-- <div class="btn">
      <el-button type="primary" size="small" @click="dialogVisible = true">添加信息</el-button>
      <el-button type="primary" size="small" @click="addFileShow = true">导入信息</el-button>
      <el-button type="primary" size="small" class="exportInfo" @click="submitSelect">导出信息</el-button>
    </div> -->
    <!-- 上传文件 -->
    <el-dialog title="选择文件进行导入" :visible.sync="addFileShow" width="30%" :before-close="handleCloseFile">
      <el-form>
        <input type="file" ref="fileInput">
      </el-form>
      <el-radio v-model="radio" label="1">备 份</el-radio>
      <el-radio v-model="radio" label="2">不 备 份</el-radio>
      <el-button @click="openTip">确认导入</el-button>
    </el-dialog>
    <!-- 搜索框的显示 -->
    <!-- <div class="searchInfo">
      <el-input v-model="search.studentNum" class="input" placeholder="请输入学生学号" clearable>
      </el-input>
      <el-button icon="el-icon-search" circle class="searchMore" @click="searchStudentNum"></el-button>
    </div> -->
    <!-- 点击按钮弹出表单添加信息 -->
    <el-dialog title="添加信息" :visible.sync="dialogVisible" width="25%" :before-close="handleClose">
      <el-form ref="form" :rules="rules" :model="form" label-width="80px" class="addInfo">
        <el-form-item label="学号" prop="studentNum">
          <el-input placeholder="请输入学号" v-model="form.studentNum"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="studentName">
          <el-input placeholder="请输入姓名" v-model="form.studentName"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="studentClass">
          <el-input placeholder="请输入班级" v-model="form.studentClass"></el-input>
        </el-form-item>
        <el-form-item label="处分等级" prop="punishLevel">
          <el-input placeholder="请输入处分等级" v-model="form.punishLevel"></el-input>
        </el-form-item>
        <el-form-item label="处分名称" prop="punishName">
          <el-input placeholder="请输入处分名称" v-model="form.punishName"></el-input>
        </el-form-item>
        <el-form-item label="处分时间" prop="punishTime">
          <el-date-picker class="commonWidth" v-model="form.punishTime" type="date" placeholder="请选择处分时间" format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input placeholder="请输入备注" v-model="form.remarks"></el-input>
        </el-form-item>

        <!-- 添加信息文件上传部分 -->
        <el-form-item label="相关文件" prop="files">
          <div class="commonWidth">
            <input type="file" ref="fileInput" @change="uploadFile">
          <div v-for="item in fileList" :key="item" class="fileListShow" v-show="item">
            <div class="item">
              <a :href="item" download>
                <img :src="getFileIcon(item)" alt="file icon" style="width:50px;height:50px;" class="item">
                {{ getFileName(item) }}
              </a>
              <!-- 取消上传按钮 -->
              <div @click="cancelUp(item)" class="cancelDiv">
                <i class="el-icon-error"></i>
              </div>
            </div>
          </div>
        </div>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">提 交</el-button>
      </span>
    </el-dialog>

    <!-- 修改信息按钮 -->
    <!-- 点击按钮弹出表单修改信息 -->
    <el-dialog title="修改信息" :visible.sync="changeInfoShow" width="25%" :before-close="handleClosechangeInfo">
      <el-form ref="changeInfoForm" :rules="changRules" :model="changeInfoForm" label-width="80px" class="addInfo">
        <el-form-item label="学号" prop="studentNum">
          <el-input placeholder="请输入学号" :disabled="true" v-model="changeInfoForm.studentNum"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="studentName">
          <el-input placeholder="请输入姓名" :disabled="true" v-model="changeInfoForm.studentName"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="studentClass">
          <el-input placeholder="请输入班级" :disabled="true" v-model="changeInfoForm.studentClass"></el-input>
        </el-form-item>
        <el-form-item label="处分等级" prop="punishLevel">
          <el-input placeholder="请输入处分等级" v-model="changeInfoForm.punishLevel"></el-input>
        </el-form-item>
        <el-form-item label="处分名称" prop="punishName">
          <el-input placeholder="请输入处分名称" v-model="changeInfoForm.punishName"></el-input>
        </el-form-item>
        <el-form-item label="处分时间" prop="punishTime">
          <!-- <el-input placeholder="请输入获奖时间" v-model="form.punishTime"></el-input> -->
          <el-date-picker class="commonWidth" v-model="changeInfoForm.punishTime" type="date" placeholder="请选择处分时间" format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input placeholder="请输入备注" v-model="changeInfoForm.remarks"></el-input>
        </el-form-item>

        <!-- 修改信息页面文件上传 -->
        <el-form-item label="相关文件" prop="files">
          <div class="commonWidth">
            <input type="file" ref="fileInput" @change="uploadFile2">
          <div v-for="item in fileList" :key="item" class="fileListShow" v-show="item">
            <div class="item">
              <a :href="item" download>
                <img :src="getFileIcon(item)" alt="file icon" style="width:50px;height:50px;" class="item">
                {{ getFileName(item) }}
              </a>
              <!-- 取消上传按钮 -->
              <div @click="cancelUp(item)" class="cancelDiv">
                <i class="el-icon-error"></i>
              </div>
            </div>
          </div>
          </div>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel2">取 消</el-button>
        <el-button type="primary" @click="submitchangeInfo">保 存</el-button>
      </span>
    </el-dialog>
    <ImgTabels :tableColumns="columns" :operaColums="operaColums" :tableData="tableData" :total="total" :limit="pageLimit"
      :currentPage="currentPage" @click_1="modify" @click_2="deleteStu" @changePage="changePage"
      @changeLimit="changeLimit" />
    <!-- changeLimit改变页面拉取数据数量现在是固定的不需要去改变 -->
    <!-- @changeLimit="changeLimit" -->
    <!-- <ExportStudentInfo :isShow="showSelect" :cityOptions="cityOptions" @change="exportShow" @submit="submitSelect" /> -->
  </div>
</template>

<script>
import ImgTabels from './../../../components/ImgTabels';
import ExportStudentInfo from './../../../components/ExportStudentInfo';
import { columns, operaColums } from './const';
import { punishList, addPunish, removeInfo, changeInfo, searchUseNum, uploadFiles, exportStuInfo, importStuInfo } from './api'
export default {
  name: 'Svrad',
  components: {
    ImgTabels,
    ExportStudentInfo
  },
  data() {
    return {
      radio: '1',//单选框选中状态
      addFileShow: false,
      currentPage: 1, // 当前页
      pageLimit: 5, // 当前页面分页数
      total: 0,//数据条数
      form: {
        className: '',
        files: '',
        punishLevel: '',
        punishName: '',
        punishTime: '',
        remarks: '',
        studentClass: '',
        studentName: '',
        studentNum: ''
      },//新增的form表单
      tableData: [],//数据列表
      columns: [],//列表配置
      operaColums: [],//操作按钮配置
      dialogVisible: false,//弹出窗口是否显示参数
      search: {
        studentNum: ''
      }, //根据字段进行搜索
      showNum: true,//选择类型对应输入框的显示参数
      showPizeid: false,//选择类型对应输入框的显示参数
      //导出信息组件对应的参数
      showSelect: false,
      cityOptions: ['学生学号', '学生姓名', '学生班级', '处分等级', '处分名称', '处分时间', '备注', '相关文件'],
      rules: {
        studentNum: [
          { required: true, message: '请输入学生学号' }
        ],
        /*       studentName: [
                  { required: true, message: '请输入获奖学生姓名' }
                ], */
        punishLevel: [
          { required: false }
        ],
        punishName: [
          { required: false }
        ],
        punishTime: [
          { required: false }
        ],
        remarks: [
          { required: false }
        ],
        files: [
          { required: false }
        ]
      },//新增信息的输入规则
      changRules: {
        studentNum: [
          { required: true, message: '请输入学生学号' }
        ],
        studentName: [
          { required: true, message: '请输入学生姓名' }
        ],
        studentClass: [
          { required: true, message: '请输入学生班级' }
        ],
        punishName: [
          { required: true, message: '请输入处分名称' }
        ],
        punishLevel: [
          { required: true, message: '请输入处分等级' }
        ],
        punishTime: [
          { required: true, message: '请选择处分时间' }
        ],
        remarks: [
          { required: true, message: '请输入处分备注' }
        ],
        files: [
          { required: true, message: '请输入电子版证书' }
        ]
      },//修改信息的规则
      changeInfoShow: false,
      changeInfoForm: {
        files: ''
      },

      //关于文件上传的相关参数
      fileList: [],//存储上传的文件
      fileName: [],//存储上传后的文件名
      recordInfo: {}

    }
  },
  methods: {
    //拉取获奖学生列表
    gepunishList() {
      //发送请求参数
      const params = {
        page: this.currentPage,
        pageLimit: this.pageLimit,
      }
      console.log(params);
      //发送获取学生列表的请求
      punishList(params).then((res) => {
        console.log(res);
        //这条注释是将获取到的学生获奖情况给到tableData
        this.tableData = res.data.data.punishStudents
        this.total = res.data.data.sum
      }).catch((error) => {
        this.$message.error('拉取列表错误', error);
      })
    },
    // 提交用户表单函数
    submit() {
      // 将存储文件链接信息的数组转换为字符串
      this.form.files = this.fileList.toString()

      this.$refs.form.validate((valid) => {
        if (valid) {
          addPunish(this.form).then((res) => {
            console.log(res);
            if (res.status === 200) {
              console.log('添加成功');
              this.$message({
                message: '添加成功',
                type: 'success'
              });
            }
            else {
              alert('添加失败', res.data.msg)
            }
            // 重新获取列表的接口
            this.gepunishList()
          })
          // 重置表单
          this.$refs.form.resetFields()
          // 关闭弹窗
          this.dialogVisible = false
        }
      })
    },
    //删除用户
    deleteStu(value) {
      this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //value值对应的是点击删除用户对应该用户的信息
        removeInfo(value).then((res) => {
          console.log(res.status);
          if (res.status === 200) {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.gepunishList()
          }
          else {
            this.$message.error('删除用户信息失败', error);
          }
        }).catch((error) => {
          this.$message.error('删除用户信息错误', error);
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //修改用户
    modify(value) {
      console.log(value);
      this.changeInfoShow = true
      this.changeInfoForm = value
      this.recordInfo = Object.assign({}, value);

      //这里判断如果修改信息原本有文件上传，将其转数组存储
      if (this.changeInfoForm.files) {
        this.fileList = this.changeInfoForm.files.split(',')
      }

    },
    //修改信息提交按钮
    submitchangeInfo() {
      // 将存储文件链接信息的数组转换为字符串
      this.changeInfoForm.files = this.fileList.toString()

      changeInfo(this.changeInfoForm).then((res) => {
        console.log(res);
        if (res.status === 200) {
          this.$message({
            message: '修改成功',
            type: 'success'
          });
        }
        else {
          this.$message.error('修改用户信息失败', error);
        }
        this.gepunishList()
        // 重置表单
        this.$refs.changeInfoForm.resetFields()
        // 关闭弹窗
        this.changeInfoShow = false
      })
    },

    //取消函数
    cancel() {
      this.handleClose()
    },

    cancel2() {
      this.handleClosechangeInfo()
    },
    //选择了使用学生学号进行搜索调用的函数
    selectStudentNum() {
      this.showNum = true
      this.showPizeid = false
    },
    //选择了使用学生获奖id进行搜索调用设计
    selectPizeid() {
      this.showPizeid = true
      this.showNum = false
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
    },
    //使用获奖id进行搜索
    searchPizeId() {
      console.log("使用获奖id进行搜索");
    },
    changeLimit(val) {
      this.pageLimit = val;
      this.gepunishList();
    },
    changePage(val) {
      this.currentPage = val
      this.gepunishList();
    },
    changeLimit(val) {
      this.pageLimit = val;
      this.gepunishList();
    },
    //导出信息页面的是否展示
    exportShow() {
      this.showSelect = !this.showSelect;
    },

    //新增信息页面文件的上传
    uploadFile() {
      const file = this.$refs.fileInput.files[0];
      const formData = new FormData();
      formData.append('uploadFile', file);
      uploadFiles(formData).then((res) => {
        if (this.form.files) {
          this.form.files = this.form.files + ',' + res.data.data
        }
        else {
          this.form.files = res.data.data
        }
        this.fileList = this.form.files.split(',')
        const uploadedFile = {
          name: file.name,
          file: res.data.data
        };
        this.fileName.push(uploadedFile)
      }).catch((error) => {
        console.error(error);
      })
    },

    //修改信息页面的上传相关文件
    uploadFile2() {
      const file = this.$refs.fileInput.files[0];
      const formData = new FormData();
      formData.append('uploadFile', file);
      uploadFiles(formData).then((res) => {
        // this.changeInfoForm.files = res.data.data
        if (this.changeInfoForm.files) {
          this.changeInfoForm.files = this.changeInfoForm.files + ',' + res.data.data
        }
        else {
          this.changeInfoForm.files = res.data.data
        }
        this.fileList = this.changeInfoForm.files.split(',')
        const uploadedFile = {
          name: file.name,
          file: res.data.data
        };
        this.fileName.push(uploadedFile)
      }).catch((error) => {
        console.error(error);
      })
    },

    //获取文件类型对应图标
    getFileIcon(filePath) {
      const extension = filePath.split('.').pop();
      console.log(extension);
      switch (extension) {
        case 'jpg':
          return require('@/assets/img/JPG.png')
        case 'png':
          return require('@/assets/img/PNG.png')
        case 'pdf':
          return require('@/assets/img/Pdf.png')
        case 'xlsx':
          return require('@/assets/img/xlsx.png')
        case 'doc':
          return require('@/assets/img/doc.png')
        case 'docx':
          return require('@/assets/img/docx.png')
        case 'ppt':
          return require('@/assets/img/ppt.png')
        case 'pptx':
          return require('@/assets/img/pptx.png')
        // 其他文件类型的判断逻辑
        default:
          return require('@/assets/img/other.png');
      }
    },

    //获取本地上传时的文件名
    getFileName(item) {
      if (this.fileName.length != 0) {
        for (let i = 0; i < this.fileName.length; i++) {
          if (this.fileName[i].file === item) {
            console.log('yes', this.fileName[i].name);
            return this.fileName[i].name
          }
          else {
            // return filePath.name.split('/').pop();
            return item.split('/').pop();
          }
        }
      }
      else {
        return item.split('/').pop();
      }
    },

    // 删除上传文件函数
    cancelUp(item) {
      this.fileList.splice(this.fileList.indexOf(item), 1);
    },

    //修改信息窗口关闭时调用的函数
    handleClosechangeInfo() {
      if (!(JSON.stringify(this.changeInfoForm) === JSON.stringify(this.recordInfo))) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.$refs.changeInfoForm.resetFields()

            //关闭后将文件相关显示的数据清空
            this.fileList = []
            this.fileName = []

            this.gepunishList()
            this.changeInfoShow = false
          })
          .catch(_ => { });
      } else {
        this.$refs.changeInfoForm.resetFields()

        //关闭后将文件相关显示的数据清空
        this.fileList = []
        this.fileName = []

        this.gepunishList()
        this.changeInfoShow = false
      }

    },

    // 新增信息弹窗关闭时重置表单
    handleClose() {
      console.log(this.form);
      const filled = Object.values(this.form).some(value => value !== '')
      if (filled) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.$refs.form.resetFields()

            //关闭后将文件相关显示的数据清空
            this.fileList = []
            this.fileName = []

            this.gepunishList()
            this.dialogVisible = false
          })
          .catch(_ => { });
      }
      else {
        this.$refs.form.resetFields()

        //关闭后将文件相关显示的数据清空
        this.fileList = []
        this.fileName = []

        this.gepunishList()
        this.dialogVisible = false
      }
    },

    //导出学生信息
    submitSelect() {
      this.$confirm('确认导出？')
        .then(_ => {
          const value = ['学生学号', '学生姓名', '学生班级', '处分等级', '处分名称', '处分时间', '备注', '相关文件']
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
          this.gepunishList();
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
    },
    handleCloseFile() {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.radio = '1'
          this.$refs.fileInput.value = null//关闭前将已选择文件清空
          this.gepunishList()
          this.addFileShow = false
        })
        .catch(_ => { });
    }
  },

  mounted() {
    //进来页面直接调用获取学生列表函数
    this.gepunishList()
    this.columns = columns
    this.operaColums = operaColums
  }
}

</script>

<style scoped>
/* 添加信息按钮和导出信息按钮样式 */
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

/* 搜索的按钮 */
.searchMore {
  margin-left: 10px;
  position: relative;
  left: -60px;
  border-radius: 4px;
}

/* 搜索框样式 */
.searchInfo {
  position: absolute;
  left: 320px;
  top: 150px;
  z-index: 11;
}

.input {
  width: 300px;
  margin-right: 10px;
}

.item {
  position: relative;
}

.el-icon-error[data-v-5bbfeaee] {
  font-size: 21px;
  color: indianred;
}

.cancelDiv {
  position: absolute;
  top: 10px;
  left: 35px;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.fileListShow {
  margin-left: -39px;
}

.el-dialog__body a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #666;
}

.el-dialog__body a:hover {
  color: #409EFF;
}

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
  width: 300px;
  margin-right: 10px;
}
.findButton {
  position: absolute;
  right: 0;
  z-index: 23;
  border-radius: 4px;
}
.addButton{
  line-height: 40px;
}
.classManage{
  position:relative;
}

.addInfo {
  height: 300px;
  overflow: hidden;
}
.addInfo:hover{
  overflow-y:scroll;
}
.commonWidth{
  width: 100%;
}
</style>