<template>
  <div class="classManage">
    <!-- <div class="btn"> -->
    <div class="tabelTop">
      <el-button type="primary" @click="dialogVisible = true" v-show="role === '1'">添加记录</el-button>
    </div>
    <!-- 添加信息按钮 -->
    <!-- </div> -->
    <!-- 添加信息弹窗 -->
    <el-dialog title="添加奖学金评定记录" :visible.sync="dialogVisible" width="25%" :before-close="handleClose">
      <el-form ref="scholInfo" :rules="rules" :model="scholInfo" label-width="80px" class="addInfo">
        <el-form-item label="专业" prop="major">
          <el-input v-model="scholInfo.major" placeholder="请输入专业名称"></el-input>
        </el-form-item>
        <el-form-item label="年级" prop="grade">
          <el-input v-model="scholInfo.grade" placeholder="请输入所属年级"></el-input>
        </el-form-item>
        <!-- <el-form-item label="时间范围" prop="scholarshipTime"> -->
        <!-- <el-input v-model="scholInfo.scholarshipTime" placeholder="请输入评定的时间范围"></el-input> -->
        <el-form-item label="时间范围" prop="selectTime">
          <div class="commonWidth2">
            <!-- 开始年份的下拉框 -->
            <el-select v-model="startYear" placeholder="请选择开始年份" class="commonWidth">
              <el-option v-for="year in years" :key="'start-' + year" :label="year + '年'" :value="year"></el-option>
            </el-select>

            <!-- 结束年份的下拉框 -->
            <el-select v-model="endYear" placeholder="请选择结束年份" class="commonWidth">
              <el-option v-for="year in years" :key="'end-' + year" :label="year + '年'" :value="year"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="评定阶段" prop="status">
          <!-- <el-input v-model="scholInfo.status" placeholder="请输入当前评定阶段"></el-input> -->
          <el-select v-model="scholInfo.status" class="commonWidth2">
            <el-option label="已完成" value="已完成"></el-option>
            <el-option label="进行中" value="进行中"></el-option>
            <el-option label="未完成" value="未完成"></el-option>
          </el-select>
        </el-form-item>

        <!-- 上传综测成绩记录文件 -->
        <!-- 上传相关文件1 -->
        <el-form-item label="综测成绩" prop="files1">
          <div class="commonWidth2">
            <input type="file" ref="fileInput1" @change="uploadFile1">
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

        <!-- 上传奖学金发放记录文件 -->
        <el-form-item label="发放记录" prop="files2">
          <!-- <el-input placeholder="请选择相关文件" v-model="scholInfo.files2" :disabled="true"></el-input> -->
          <div class="commonWidth2">
            <input type="file" ref="fileInput2" @change="uploadFile2">
          <div v-for="item in fileList1" :key="item" class="fileListShow" v-show="item">
            <div class="item">
              <a :href="item" download>
                <img :src="getFileIcon(item)" alt="file icon" style="width:50px;height:50px;" class="item">
                {{ getFileName(item) }}
              </a>
              <!-- 取消上传按钮 -->
              <div @click="cancelUp1(item)" class="cancelDiv">
                <i class="el-icon-error"></i>
              </div>
            </div>
          </div>
        </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>


    <!-- 修改评定记录 -->
    <el-dialog title="修改评定记录" :visible.sync="changeInfoShow" width="25%" :before-close="handleCloseChangeInfo"
      class="my-dialog">
      <el-form ref="changeInfoForm" :rules="changeInfoRules" :model="changeInfoForm" label-width="80px" class="addInfo">
        <el-form-item label="专业" prop="major">
          <el-input placeholder="请输入专业名称" v-model="changeInfoForm.major"></el-input>
        </el-form-item>
        <el-form-item label="年级" prop="grade">
          <el-input placeholder="请输入专业年级" v-model="changeInfoForm.grade"></el-input>
        </el-form-item>
        <el-form-item label="时间范围" prop="scholarshipTime">
          <!-- <el-input placeholder="请选择评定时间范围" v-model="changeInfoForm.scholarshipTime"></el-input> -->
          <div class="commonWidth2">
            <!-- 开始年份的下拉框 -->
            <el-select v-model="startYear" placeholder="请选择开始年份" class="commonWidth">
              <el-option v-for="year in years" :key="'start-' + year" :label="year + '年'" :value="year"></el-option>
            </el-select>

            <!-- 结束年份的下拉框 -->
            <el-select v-model="endYear" placeholder="请选择结束年份" class="commonWidth">
              <el-option v-for="year in years" :key="'end-' + year" :label="year + '年'" :value="year"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="评定阶段" prop="status">
          <!-- <el-input placeholder="请选择当前评定阶段" v-model="changeInfoForm.status"></el-input> -->
          <el-select v-model="changeInfoForm.status" class="commonWidth2">
            <el-option label="已完成" value="已完成"></el-option>
            <el-option label="进行中" value="进行中"></el-option>
            <el-option label="未完成" value="未完成"></el-option>
          </el-select>
        </el-form-item>

        <!-- 综测成绩记录 -->
        <!-- 修改信息，上传相关文件1 -->
        <el-form-item label="综测成绩" prop="files1">
          <div class="commonWidth2">
            <input type="file" ref="fileInput1" @change="uploadChangeFile1">
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

        <!-- 奖学金发放记录 -->
        <!-- 修改信息，上传相关文件2 -->
        <el-form-item label="发放记录" prop="files2">

          <div class="commonWidth2">
            <input type="file" ref="fileInput2" @change="uploadChangeFile2">
          </div>
          <div v-for="item in fileList1" :key="item" class="fileListShow" v-show="item">
            <div class="item">
              <a :href="item" download>
                <img :src="getFileIcon(item)" alt="file icon" style="width:50px;height:50px;" class="item">
                {{ getFileName(item) }}
              </a>
              <!-- 取消上传按钮 -->
              <div @click="cancelUp1(item)" class="cancelDiv">
                <i class="el-icon-error"></i>
              </div>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel1">取 消</el-button>
        <el-button type="primary" @click="submitChangeInfo">保 存</el-button>
      </span>
    </el-dialog>
    <ImgTabels :tableColumns="columns" :tableData="tableData" :operaColums="operaColums" :total="total" :limit="pageLimit"
      :currentPage="currentPage" @click_1="edit" @click_2="handleDelete" @changePage="changePage"
      @changeLimit="changeLimit" class="tabel" />
  </div>
</template>

<script>
import ImgTabels from './../../components/ImgTabels'
import { columns, operaColums } from './const'
import { scholarshipList, addInfo, removeInfo, changeInfo, uploadFiles } from './api'
export default {
  components: {
    ImgTabels
  },
  data() {
    return {
      role: localStorage.getItem('role'), //登录用户的身份
      currentPage: 1, // 当前页
      pageLimit: 5, // 当前页面分页数
      tableData: [], // 数据列表
      columns: [],// 列表配置
      operaColums: [],//操作按钮配置
      total: 0, // 数据条数
      dialogVisible: false,
      scholInfo: {
        major: '',
        grade: '',
        scholarshipTime: '',
        status: '已完成',
        files1: '',
        files2: '',
        selectTime: ''
      },
      rules: {
        major: [
          { required: true, message: '请输入专业名称' }
        ],
        grade: [
          { required: true, message: '请输入所属年级' }
        ],
        /*         scholarshipTime: [
                  { required: true, message: '请输入评定的时间范围' }
                ], */
        // selectTime:[{ required: true, message: '请输入评定的时间范围' }],
        status: [
          { required: true, message: '请输入当前评定阶段' }
        ],
      },
      changeInfoRules: {
        major: [
          { required: true, message: '请输入专业名称' }
        ],
        grade: [
          { required: true, message: '请输入所属年级' }
        ],
        scholarshipTime: [
          { required: true, message: '请输入评定的时间范围' }
        ],
        status: [
          { required: true, message: '请输入当前评定阶段' }
        ],
      },
      changeInfoForm: {},
      //修改数据对象
      changeInfoShow: false,
      startYear: '2022',
      endYear: '2023',
      minYear: 2010, // 最小年份
      maxYear: new Date().getFullYear(), // 最大年份为当前年份
      //关于文件上传的相关参数
      // 文件参数1
      fileList: [],//存储上传的文件
      fileName: [],//存储上传后的文件名
      fileList1: [],
      fileName1: [],
      recordInfo: {}
    }
  },
  methods: {
    //拉取获奖学生列表
    getList() {
      const params = {
        page: this.currentPage,
        pageLimit: this.pageLimit,
      }
      console.log(params);
      scholarshipList(params).then((res) => {
        this.tableData = res.data.data.scholarships
        this.total = res.data.data.sum
      }).catch((error) => {
        this.$message.error('拉取列表错误', error);
      })
    },
    //提交新增信息记录
    submit() {
      // 将存储文件链接信息的数组转换为字符串
      this.scholInfo.files1 = this.fileList.toString()
      this.scholInfo.files2 = this.fileList.toString()

      const startYear = this.startYear || '';
      const endYear = this.endYear || '';
      // 将时间范围字符串存储在scholInfo对象中
      if (startYear && endYear) {
        this.scholInfo.scholarshipTime = `${startYear} 至 ${endYear}`;
      } else {
        this.scholInfo.scholarshipTime = '';
      }
      this.$refs.scholInfo.validate((valid) => {
        console.log('添加的评定记录信息为：', valid);
        if (valid) {
          console.log(this.scholInfo);
          addInfo(this.scholInfo).then((res) => {
            console.log(res.data);
            if (res.data.msg === '添加成功') {
              this.$message({
                type: 'success',
                message: res.data.msg
              })
            } else {
              this.$message({
                type: 'error',
                message: '添加失败'
              })
            }
            // 重新获取列表的接口
            this.getList()
          })
          this.handleClose()
        }
      })
    },
    handleClose() {
      console.log(this.scholInfo);
      const filled = Object.entries(this.scholInfo).filter(([key, value]) => key !== 'scholarshipTime' && key !== 'status' && key !== 'selectTime').some(([key, value]) => value !== '');
      if (filled) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.dialogVisible = false
            this.$refs.scholInfo.resetFields()
            //关闭后将文件相关显示的数据清空

            this.fileList = []
            this.fileName = []
            this.fileList1 = []
            this.fileName1 = []

            this.getList()
          })
          .catch(_ => { });
      }
      else {
        this.dialogVisible = false
        this.$refs.scholInfo.resetFields()
        //关闭后将文件相关显示的数据清空

        this.fileList = []
        this.fileName = []
        this.fileList1 = []
        this.fileName1 = []

        this.getList()
      }
    },
    cancel() {
      this.handleClose()
    },
    edit(value) {
      this.changeInfoShow = true
      this.changeInfoForm = value
      this.recordInfo = Object.assign({}, value);
      //这里判断如果修改信息原本有文件上传，将其转数组存储
      /*       if (this.changeInfoForm.files1 || this.changeInfoForm.files2) {
              if (this.changeInfoForm.files1) {
                this.fileList = this.changeInfoForm.files1.split(',')
              }
              if (this.changeInfoForm.files2) {
                this.fileList1 = this.changeInfoForm.files2.split(',')
              }
            } */
      if (this.changeInfoForm.files1) {
        this.fileList = this.changeInfoForm.files1.split(',')
      }
      if (this.changeInfoForm.files2) {
        this.fileList1 = this.changeInfoForm.files2.split(',')
      }
    },
    handleCloseChangeInfo() {
      if (!(JSON.stringify(this.changeInfoForm) === JSON.stringify(this.recordInfo))) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.changeInfoShow = false
            this.$refs.changeInfoForm.resetFields()

            //关闭后将文件相关显示的数据清空
            this.fileList = []
            this.fileName = []
            this.fileList1 = []
            this.fileName1 = []

            this.getList()
          })
          .catch(_ => { });
      }
      else {
        this.changeInfoShow = false
        this.$refs.changeInfoForm.resetFields()

        //关闭后将文件相关显示的数据清空
        this.fileList = []
        this.fileName = []
        this.fileList1 = []
        this.fileName1 = []

        this.getList()
      }
    },
    cancel1() {
      this.handleCloseChangeInfo()
    },
    //提交修改后的信息
    submitChangeInfo() {

      // 将存储文件链接信息的数组转换为字符串
      this.changeInfoForm.files1 = this.fileList.toString()
      this.changeInfoForm.files2 = this.fileList1.toString()

      const startYear = this.startYear || '';
      const endYear = this.endYear || '';
      // 将时间范围字符串存储在scholInfo对象中
      if (startYear && endYear) {
        this.changeInfoForm.scholarshipTime = `${startYear} 至 ${endYear}`;
      } else {
        this.changeInfoForm.scholarshipTime = '';
      }
      this.$refs.changeInfoForm.validate((valid) => {
        if (valid) {
          changeInfo(this.changeInfoForm).then((res) => {
            if (res.data.msg === '修改成功') {
              this.$message({
                type: 'success',
                message: res.data.msg
              })
            } else {
              this.$message({
                type: 'error',
                message: '修改错误'
              })
            }
            // 重新获取列表的接口
            this.getList()
          })
          this.handleCloseChangeInfo()
        }
      })
    },
    // 删除某条班级信息
    handleDelete(row) {
      console.log(this.role);
      if (this.role === 1) {
        this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          removeInfo({ scholarshipId: row.scholarshipId }).then(res => {
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
            // 重新获取列表接口
            this.getList()
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      } else {
        this.$message({
          message: '只有辅导员可以删除',
          type: 'warning'
        })
      }
      console.log('删除信息');
    },
    changePage(val) {
      this.currentPage = val
      this.getList()
    },
    changeLimit(val) {
      this.pageLimit = val;
      this.getList();
    },
    //添加信息页面上传文件
    //上传相关文件
    uploadFile1() {
      const file = this.$refs.fileInput1.files[0];
      const formData = new FormData();
      formData.append('uploadFile', file);
      console.log(formData);
      uploadFiles(formData).then((res) => {
        // this.scholInfo.files1 = res.data.data
        if (this.scholInfo.files1) {
          this.scholInfo.files1 = this.scholInfo.files1 + ',' + res.data.data
        }
        else {
          this.scholInfo.files1 = res.data.data
        }
        this.fileList = this.scholInfo.files1.split(',')
        const uploadedFile = {
          name: file.name,
          file: res.data.data
        };
        this.fileName.push(uploadedFile)
      }).catch((error) => {
        console.error(error);
      })
    },
    uploadFile2() {
      const file = this.$refs.fileInput2.files[0];
      const formData = new FormData();
      formData.append('uploadFile', file);
      console.log(formData);
      uploadFiles(formData).then((res) => {
        // this.scholInfo.files2 = res.data.data
        if (this.scholInfo.files2) {
          this.scholInfo.files2 = this.scholInfo.files2 + ',' + res.data.data
        }
        else {
          this.scholInfo.files2 = res.data.data
        }
        this.fileList1 = this.scholInfo.files2.split(',')
        const uploadedFile = {
          name: file.name,
          file: res.data.data
        };
        this.fileName1.push(uploadedFile)
      }).catch((error) => {
        console.error(error);
      })
    },
    uploadChangeFile1() {
      const file = this.$refs.fileInput1.files[0];
      const formData = new FormData();
      formData.append('uploadFile', file);
      console.log(formData);
      uploadFiles(formData).then((res) => {
        // this.changeInfoForm.files1 = res.data.data
        if (this.changeInfoForm.files1) {
          this.changeInfoForm.files1 = this.changeInfoForm.files1 + ',' + res.data.data
        }
        else {
          this.changeInfoForm.files1 = res.data.data
        }
        this.fileList = this.changeInfoForm.files1.split(',')
        const uploadedFile = {
          name: file.name,
          file: res.data.data
        };
        this.fileName.push(uploadedFile)
      }).catch((error) => {
        console.error(error);
      })
    },
    uploadChangeFile2() {
      const file = this.$refs.fileInput2.files[0];
      const formData = new FormData();
      formData.append('uploadFile', file);
      console.log(formData);
      uploadFiles(formData).then((res) => {
        // this.changeInfoForm.files2 = res.data.data
        if (this.changeInfoForm.files2) {
          this.changeInfoForm.files2 = this.changeInfoForm.files2 + ',' + res.data.data
        }
        else {
          this.changeInfoForm.files2 = res.data.data
        }
        this.fileList1 = this.changeInfoForm.files2.split(',')
        const uploadedFile = {
          name: file.name,
          file: res.data.data
        };
        this.fileName1.push(uploadedFile)
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
    cancelUp1(item) {
      this.fileList1.splice(this.fileList1.indexOf(item), 1);
    }


  },
  mounted() {
    this.getList()
    this.columns = columns
    this.operaColums = operaColums
  },
  computed: {
    /*     role() {
          return this.$store.state.showNav.permission
        }, */
    years() {
      const years = [];
      for (let year = this.maxYear; year >= this.minYear; year--) {
        years.push(year);
      }
      return years;
    }
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
}

/* 搜索框样式 */
.searchInfo {
  position: absolute;
  left: 250px;
  z-index: 11;
  top: 120px;
}

.input {
  width: 250px;
  margin-right: 10px;
}

.tabel {
  /* margin-top: 12px; */
}

/* 多文件显示样式 */
.item {
  position: relative;
}

.el-icon-error {
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

.classManage {
  position: relative;
}

div /deep/ .el-dialog {
  border-radius: 8px;
}

.el-dialog__wrapper {
  line-height: 28px;
}

.addInfo {
  height: 300px;
  overflow: hidden;
}

.tabelTop {
  display: flex;
  width: 95%;
  position: absolute;
  z-index: 999;
  top: 10px;
  justify-content: flex-end;
  padding: 0 35px;
}

.addInfo:hover {
  overflow-y: scroll;
}

.commonWidth {
  width: 40%;
  margin-right:10px;
}

.commonWidth2 {
  width: 100%;
}
</style>