<template>
  <div>
    <div class="btn">
      <!-- 添加信息按钮 -->
      <el-button type="primary" size="small" @click="dialogVisible = true">添加信息</el-button>
    </div>
    <!-- 添加信息弹窗 -->
    <el-dialog title="添加奖学金评定记录" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form ref="scholInfo" :rules="rules" :model="scholInfo" label-width="80px">
        <el-form-item label="专业" prop="major">
          <el-input v-model="scholInfo.major" placeholder="请输入专业名称"></el-input>
        </el-form-item>
        <el-form-item label="年级" prop="grade">
          <el-input v-model="scholInfo.grade" placeholder="请输入所属年级"></el-input>
        </el-form-item>
        <!-- <el-form-item label="时间范围" prop="scholarshipTime"> -->
        <!-- <el-input v-model="scholInfo.scholarshipTime" placeholder="请输入评定的时间范围"></el-input> -->
        <el-form-item label="时间范围" prop="selectTime">
          <!-- 开始年份的下拉框 -->
          <el-select v-model="startYear" placeholder="请选择开始年份">
            <el-option v-for="year in years" :key="'start-' + year" :label="year + '年'" :value="year"></el-option>
          </el-select>

          <!-- 结束年份的下拉框 -->
          <el-select v-model="endYear" placeholder="请选择结束年份">
            <el-option v-for="year in years" :key="'end-' + year" :label="year + '年'" :value="year"></el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="评定阶段" prop="status">
          <!-- <el-input v-model="scholInfo.status" placeholder="请输入当前评定阶段"></el-input> -->
          <el-select v-model="scholInfo.status">
            <el-option label="已完成" value="已完成"></el-option>
            <el-option label="进行中" value="进行中"></el-option>
            <el-option label="未完成" value="未完成"></el-option>
          </el-select>
        </el-form-item>

        <!-- 上传综测成绩记录文件 -->
        <el-form-item label="综测成绩记录" prop="files1">
          <el-input placeholder="请选择相关文件" v-model="scholInfo.files1" :disabled="true"></el-input>
          <!-- 上传相关文件 -->
          <div>
            <input type="file" ref="fileInput1" @change="uploadFile1">
          </div>
        </el-form-item>

        <!-- 上传奖学金发放记录文件 -->
        <el-form-item label="奖学金发放记录" prop="files2">
          <el-input placeholder="请选择相关文件" v-model="scholInfo.files2" :disabled="true"></el-input>
          <!-- 上传相关文件 -->
          <div>
            <input type="file" ref="fileInput2" @change="uploadFile2">
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改评定记录 -->
    <el-dialog title="修改评定记录" :visible.sync="changeInfoShow" width="30%" :before-close="handleCloseChangeInfo">
      <el-form ref="changeInfoForm" :rules="changeInfoRules" :model="changeInfoForm" label-width="80px">
        <el-form-item label="专业" prop="major">
          <el-input placeholder="请输入专业名称" v-model="changeInfoForm.major"></el-input>
        </el-form-item>
        <el-form-item label="年级" prop="grade">
          <el-input placeholder="请输入专业年级" v-model="changeInfoForm.grade"></el-input>
        </el-form-item>
        <el-form-item label="评定时间范围" prop="scholarshipTime">
          <!-- <el-input placeholder="请选择评定时间范围" v-model="changeInfoForm.scholarshipTime"></el-input> -->
          <!-- 开始年份的下拉框 -->
          <el-select v-model="startYear" placeholder="请选择开始年份">
            <el-option v-for="year in years" :key="'start-' + year" :label="year + '年'" :value="year"></el-option>
          </el-select>

          <!-- 结束年份的下拉框 -->
          <el-select v-model="endYear" placeholder="请选择结束年份">
            <el-option v-for="year in years" :key="'end-' + year" :label="year + '年'" :value="year"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="当前评定阶段" prop="status">
          <!-- <el-input placeholder="请选择当前评定阶段" v-model="changeInfoForm.status"></el-input> -->
          <el-select v-model="changeInfoForm.status">
            <el-option label="已完成" value="已完成"></el-option>
            <el-option label="进行中" value="进行中"></el-option>
            <el-option label="未完成" value="未完成"></el-option>
          </el-select>
        </el-form-item>

        <!-- 综测成绩记录 -->
        <el-form-item label="综测成绩记录" prop="files1">
          <!-- <el-input placeholder="请输入相关文件" v-model="changeInfoForm.files"></el-input> -->
          <el-input placeholder="请选择相关文件" v-model="changeInfoForm.files1" :disabled="true"></el-input>
          <!-- 上传相关文件 -->
          <div>
            <input type="file" ref="fileInput1" @change="uploadChangeFile1">
          </div>
        </el-form-item>

        <!-- 奖学金发放记录 -->
        <el-form-item label="奖学金发放记录" prop="files2">
          <!-- <el-input placeholder="请输入相关文件" v-model="changeInfoForm.files"></el-input> -->
          <el-input placeholder="请选择相关文件" v-model="changeInfoForm.files2" :disabled="true"></el-input>
          <!-- 上传相关文件 -->
          <div>
            <input type="file" ref="fileInput2" @change="uploadChangeFile2">
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel1">取 消</el-button>
        <el-button type="primary" @click="submitChangeInfo">确 定</el-button>
      </span>
    </el-dialog>
    <ImgTabels :tableColumns="columns" :tableData="tableData" :operaColums="operaColums" :total="total" :limit="pageLimit"
      :currentPage="currentPage" @click_1="edit" @click_2="handleDelete" @changePage="changePage" />
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
        files2: ''
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
        this.total = res.data.total
      }).catch((error) => {
        this.$message.error('拉取列表错误', error);
      })
    },
    //提交新增信息记录
    submit() {
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
      this.dialogVisible = false
      this.$refs.scholInfo.resetFields()
      this.getList()
    },
    cancel() {
      this.handleClose()
    },
    edit(value) {
      this.changeInfoShow = true
      this.changeInfoForm = value
    },
    handleCloseChangeInfo() {
      this.changeInfoShow = false
      this.$refs.changeInfoForm.resetFields()
      this.getList()
    },
    cancel1() {
      this.handleCloseChangeInfo()
    },
    //提交修改后的信息
    submitChangeInfo() {
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
    handleCloseChangeInfo() {
      this.changeInfoShow = false
      this.$refs.changeInfoForm.resetFields()
      this.getList()
    },
    //添加信息页面上传文件
    //上传相关文件
    uploadFile1() {
      const file = this.$refs.fileInput1.files[0];
      const formData = new FormData();
      formData.append('uploadFile', file);
      console.log(formData);
      uploadFiles(formData).then((res) => {
        this.scholInfo.files1 = res.data.data
      }).catch((error) => {
        console.error(error);
      })
    },
    uploadFile2() {
      const file = this.$refs.fileInput1.files[0];
      const formData = new FormData();
      formData.append('uploadFile', file);
      console.log(formData);
      uploadFiles(formData).then((res) => {
        this.scholInfo.files2 = res.data.data
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
        this.changeInfoForm.files1 = res.data.data
      }).catch((error) => {
        console.error(error);
      })
    },
    uploadChangeFile2() {
      const file = this.$refs.fileInput1.files[0];
      const formData = new FormData();
      formData.append('uploadFile', file);
      console.log(formData);
      uploadFiles(formData).then((res) => {
        this.changeInfoForm.files2 = res.data.data
      }).catch((error) => {
        console.error(error);
      })
    }
  },
  mounted() {
    this.getList()
    this.columns = columns
    this.operaColums = operaColums
  },
  computed: {
    role() {
      return this.$store.state.showNav.permission
    },
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
</style>