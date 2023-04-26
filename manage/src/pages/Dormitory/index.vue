<template>
  <div>
    <!-- 搜索某班级所有查寝记录列表 -->
    <!-- <div>
      <el-input v-model="search2.classId" class="searchInput2" placeholder="请输入班级ID查询查寝记录列表">
      </el-input>
      <el-button icon="el-icon-search" circle class="search2" @click="showDorList"></el-button>
    </div> -->
    <!-- 搜索框的显示 -->
    <!-- <div>
      <el-input v-model="search.dormitoryVisitId" class="searchInput" placeholder="请输入寝室号查看查寝记录">
      </el-input>
      <el-button icon="el-icon-search" circle class="search" @click="searchDormitory"></el-button>
    </div> -->
    <!-- 添加信息按钮 -->
    <el-button type="primary" class="addInfo" @click="dialogVisible = true">添加信息</el-button>
    <!-- 点击按钮弹出表单添加信息 -->
    <el-dialog title="添加信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <!-- <el-form-item label="班级ID" prop="classId">
          <el-input placeholder="请输入寝室所属班级的ID" v-model="form.classId"></el-input>
        </el-form-item> -->
        <el-form-item label="查寝时间" prop="time">
          <el-date-picker v-model="form.time" type="datetime" placeholder="请选择查寝时间" format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss" class="pickTime">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="查寝目标" prop="subject">
          <el-input placeholder="请输入检查的寝室" v-model="form.subject"></el-input>
        </el-form-item>
        <el-form-item label="内容记录" prop="contentRecord">
          <el-input placeholder="请输入需要记录的关键内容" v-model="form.contentRecord"></el-input>
        </el-form-item>
        <!-- 添加信息文件上传部分 -->
        <el-form-item label="相关文件" prop="files">
          <div>
            <input type="file" ref="fileInput" @change="uploadFile">
          </div>
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
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">提 交</el-button>
      </span>
    </el-dialog>

    <!-- 表单修改信息 -->
    <el-dialog title="修改信息" :visible.sync="changeInfoShow" width="30%" :before-close="handleCloseChangeInfo">
      <el-form ref="changeInfoForm" :rules="changRules" :model="changeInfoForm" label-width="80px">
        <el-form-item label="寝室ID" prop="dormitoryVisitId">
          <el-input placeholder="请输入寝室ID" v-model="changeInfoForm.dormitoryVisitId">{{ changeInfoForm.dormitoryVisitId
          }}</el-input>
        </el-form-item>
        <!-- <el-form-item label="班级ID" prop="classId">
            <el-input placeholder="请输入班级ID" :disabled="true" v-model="changeInfoForm.classId">{{ changeInfoForm.classId }}</el-input>
          </el-form-item> -->
        <el-form-item label="查寝时间" prop="time">
          <el-date-picker v-model="changeInfoForm.time" type="datetime" placeholder="请选择查寝时间" format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss" class="pickTime">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="查寝目标" prop="subject">
          <el-input placeholder="请输入查寝目标" v-model="changeInfoForm.subject">{{ changeInfoForm.subject }}</el-input>
        </el-form-item>
        <el-form-item label="内容记录" prop="contentRecord">
          <el-input placeholder="请输入关键内容记录" v-model="changeInfoForm.contentRecord">{{ changeInfoForm.contentRecord
          }}</el-input>
        </el-form-item>
        <!-- 修改信息页面文件上传 -->
        <el-form-item label="相关文件" prop="files">
          <div>
            <input type="file" ref="fileInput" @change="uploadFile2">
          </div>
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
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel2">取 消</el-button>
        <el-button type="primary" @click="submitChangeInfo">保 存</el-button>
      </span>
    </el-dialog>


    <!-- 展示查寝信息的表格 -->
    <ImgTabels :tableColumns="columns" :operaColums="operaColums" :tableData="tableData" :total="total" :limit="pageLimit"
      :currentPage="currentPage" @click_1="deleteDor" @click_2="modify" @changePage="changePage" />
  </div>
</template>

<script>
import ImgTabels from '../../components/ImgTabels/index.vue'
import { columns, operaColums } from './const'
import { addDor, getDorList, editDor, delDor, uploadFiles } from './api/index'

export default {
  name: 'Dormitory',
  components: {
    ImgTabels
  },
  data() {
    return {
      currentPage: 1, // 当前页
      pageLimit: 5, // 当前页面分页数
      total: 0,//数据条数
      tableData: [],//数据列表
      columns: [],//列表配置
      operaColums: [],//操作按钮配置
      search: {
        dormitoryVisitId: ''
      },
      search2: {
        classId: ''
      },
      form: {
        classId: JSON.parse(sessionStorage.getItem('baseData')).classId,
        files: ''
      },
      originalForm: {
        classId: JSON.parse(sessionStorage.getItem('baseData')).classId,
        files: ''
      }, //用于判断表单是否修改
      dialogVisible: false,
      rules: {
        classId: [
          { required: true, message: '请输入寝室所属班级ID' }
        ],
        time: [
          { required: true, message: '请选择查寝时间' }
        ]
      },
      changeInfoShow: false,
      changeInfoForm: {},
      originalData: null, //用于判断表单是否修改
      isFormInitialized: false, // 默认表单未初始化
      changRules: {
        dormitoryVisitId: [
          { required: true, message: '请输入寝室ID' }
        ],
        time: [
          { required: true, message: '请选择查寝时间' }
        ],
        subject: [
          { required: true, message: '请输入查寝目标' }
        ],
        contentRecord: [
          { required: true, message: '请输入关键内容记录' }
        ],
      },
      //关于文件上传的相关参数
      fileList: [],//存储上传的文件
      fileName: []//存储上传后的文件名
    }
  },
  methods: {
    // 获取查寝信息列表
    showDorList() {
      //发送请求参数
      const params = {
        page: this.currentPage,
        pageLimit: this.pageLimit,
        classId: JSON.parse(sessionStorage.getItem('baseData')).classId
      }
      //发送获取查寝信息列表的请求
      getDorList(params).then((res) => {
        // console.log(res.data);
        //将获取到的查寝信息给到tableData
        this.tableData = res.data.data.visits
        this.total = res.data.total
        this.$message({
          message: '获取列表信息成功',
          type: 'success'
        })
      }).catch((error) => {
        this.$message.error('获取查寝信息列表错误', error);
      })
    },
    // 查询宿舍查寝记录
    searchDormitory() {
      if (!this.search.dormitoryVisitId) {
        this.$message('请输入内容进行搜索');
      }
      else {
        this.$message({
          showClose: true,
          message: '正在搜索请稍等'
        });
        const searchInfo = {
          page: this.currentPage,
          pageLimit: this.pageLimit,
          dormitoryVisitId: this.search.dormitoryVisitId
        }
        showDorList(searchInfo).then((res) => {
          if (res.data.status === 0) {
            this.tableData = res.data.data.visits
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
    // 弹窗关闭时重置表单
    handleClose() {
      if (this.isInfoChanged) { // 如果修改过，就弹窗提示
        this.$confirm('表单已更改，确认关闭？')
        .then(_ => {
          this.$refs.form.resetFields()
          //关闭后将文件相关显示的数据清空
          this.fileList = []
          this.fileName = []
          this.dialogVisible = false
        })
        .catch(_ => { });
      } else {
        this.$refs.form.resetFields()
        //关闭后将文件相关显示的数据清空
        this.fileList = []
        this.fileName = []
        this.dialogVisible = false
      }
    },
    //取消函数
    cancel() {
      this.handleClose()
    },
    // 添加信息提交表单
    submit() {
      // 将存储文件链接信息的数组转换为字符串
      this.form.files = this.fileList.toString()
      this.$refs.form.validate((valid) => {
        if (valid) {
          addDor(this.form).then((res) => {
            // console.log(res, '添加成功');
            if (res.status === 200) {
              // console.log('添加成功');
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.showDorList()
            }
            else {
              alert('添加失败', res.data.msg)
            }
          })
          // 重置表单
          this.$refs.form.resetFields()
          this.handleClose()
        }
      })
    },
    deleteDor(value) {
      // console.log(value);
      //发送请求参数
      const params = {
        page: this.currentPage,
        pageLimit: this.pageLimit,
        classId: value.classId
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //value值对应的是点击删除该查寝信息
        delDor(value).then((res) => {
          // console.log(params);
          if (res.status === 200) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.showDorList()
          }
          else {
            this.$message.error('删除查寝信息失败', error);
          }
        }).catch((error) => {
          this.$message.error('删除查寝信息错误', error);
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    //修改信息
    modify(value) {
      this.isFormInitialized = true // 初始化表单
      this.originalData = { ...value }; // 存储原始数据
      this.changeInfoShow = true
      this.changeInfoForm = value
      //这里判断如果修改信息原本有文件上传，将其转数组存储
      if (this.changeInfoForm.files) {
        this.fileList = this.changeInfoForm.files.split(',')
      }
    },
    // 修改表单关闭逻辑
    handleCloseChangeInfo() {
      if (this.isDataChanged) { // 如果修改过，就弹窗提示
        this.$confirm('表单已更改，确认关闭？')
        .then(_ => {
          this.$refs.changeInfoForm.resetFields()
          //关闭后将文件相关显示的数据清空
          this.fileList = []
          this.fileName = []
          this.changeInfoShow = false
        })
        .catch(_ => { });
      } else {
        this.$refs.changeInfoForm.resetFields()
        //关闭后将文件相关显示的数据清空
        this.fileList = []
        this.fileName = []
        this.changeInfoShow = false
      }
    },
    cancel2() {
      this.handleCloseChangeInfo()
    },
    //修改信息提交按钮
    submitChangeInfo() {
      // 将存储文件链接信息的数组转换为字符串
      this.changeInfoForm.files = this.fileList.toString()
      this.$refs.changeInfoForm.validate((valid) => {
        if (valid) {
          // console.log('修改信息提交了');
          editDor(this.changeInfoForm).then((res) => {
            // console.log(res);
            if (res.status === 200) {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
            }
            else {
              this.$message.error('修改查寝信息失败', error);
            }
            this.showDorList()
            // 重置表单
            this.$refs.changeInfoForm.resetFields()
            // 关闭弹窗
            this.changeInfoShow = false
          })
        }
      })
    },
    changePage(val) {
      this.currentPage = val
      this.showDorList()
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
      // console.log(extension);
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
            // console.log('yes', this.fileName[i].name);
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

  },
  computed: {
    isDataChanged() {
      if (!this.isFormInitialized) {
        return false; // 如果表单未初始化，代表新建操作，返回false
      }
      return JSON.stringify(this.changeInfoForm) !== JSON.stringify(this.originalData);
    },
    isInfoChanged() {
      return JSON.stringify(this.form) !== JSON.stringify(this.originalForm);
    },
  },
  mounted() {
    this.showDorList()
    this.columns = columns
    this.operaColums = operaColums
  },
}
</script>

<style scoped>
/* 搜索框样式 */
.searchInput {
  position: absolute;
  font-size: 14px;
  z-index: 11;
  top: -30px;
  left: 500px;
  width: 300px;
}

.searchInput2 {
  position: absolute;
  font-size: 14px;
  z-index: 11;
  top: -30px;
  left: 25px;
  width: 300px;
}

/* 搜索的按钮 */
.search {
  position: absolute;
  top: 30px;
  left: 810px;
  z-index: 23;
}

.search2 {
  position: absolute;
  top: 30px;
  left: 335px;
  z-index: 23;
}

/* 添加信息的按钮定位 */
.addInfo {
  position: absolute;
  right: 25px;
  top: 35px;
  z-index: 11;
}

/* 时间选择框的设置 */
.pickTime {
  width: 100%;
}

/* 文件上传相关 */
.fileListShow {
  margin-left: -39px;
}

.item {
  position: relative;
}

.el-icon-error {
  font-size: 21px;
  color: indianred;
}

.cancelDiv {
  position: absolute;
  top: 0;
  right: 0;
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
</style>