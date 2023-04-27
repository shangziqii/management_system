<template>
  <div>
    <div class="classManage">
      <!-- 模糊搜索某记录 -->
      <!-- <div>
        <el-input v-model="findClass.className" placeholder="请输入班级名称以查询班级" class="findInput">
        </el-input>
        <el-button icon="el-icon-search" circle  @click="WhichClass" class="findButton"></el-button>
      </div> -->
      <!-- 添加助学金信息弹窗 -->
      <el-dialog title="添加助学金信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose"
        v-show="role === 1">
        <el-form ref="subInfo" :rules="rules" :model="subInfo" label-width="80px">
          <el-form-item label="专业" prop="major">
            <el-input v-model="subInfo.major" placeholder="请输入专业名称"></el-input>
          </el-form-item>
          <el-form-item label="年级" prop="grade">
            <el-input v-model="subInfo.grade" placeholder="请输入所属年级"></el-input>
          </el-form-item>
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
            <el-select v-model="subInfo.status">
              <el-option label="已完成" value="已完成"></el-option>
              <el-option label="进行中" value="进行中"></el-option>
              <el-option label="未完成" value="未完成"></el-option>
            </el-select>
          </el-form-item>
          <!-- 添加信息文件上传部分 -->
          <el-form-item label="文件一" prop="files1">
            <el-input placeholder="申请助学金的学生列表，及证明材料" v-model="subInfo.files1" :disabled="true"></el-input>
            <div>
              <input type="file" ref="fileInput1" @change="uploadFile1">
            </div>
            <div v-for="item in fileList1" :key="item" class="fileListShow" v-show="item">
              <div class="item">
                <a :href="item" download>
                  <img :src="getFileIcon(item)" alt="file icon" style="width:50px;height:50px;" class="item">
                  {{ getFileName1(item) }}
                </a>
                <!-- 取消上传按钮 -->
                <div @click="cancelUp1(item)" class="cancelDiv">
                  <i class="el-icon-error"></i>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="文件二" prop="files2">
            <el-input placeholder="困难生评议记录以及评议结果" v-model="subInfo.files2" :disabled="true"></el-input>
            <div>
              <input type="file" ref="fileInput2" @change="uploadFile2">
            </div>
            <div v-for="item in fileList2" :key="item" class="fileListShow" v-show="item">
              <div class="item">
                <a :href="item" download>
                  <img :src="getFileIcon(item)" alt="file icon" style="width:50px;height:50px;" class="item">
                  {{ getFileName2(item) }}
                </a>
                <!-- 取消上传按钮 -->
                <div @click="cancelUp2(item)" class="cancelDiv">
                  <i class="el-icon-error"></i>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="文件三" prop="files3">
            <el-input placeholder="最终发放助学金的学生名单、助学金金额" v-model="subInfo.files3" :disabled="true"></el-input>
            <div>
              <input type="file" ref="fileInput3" @change="uploadFile3">
            </div>
            <div v-for="item in fileList3" :key="item" class="fileListShow" v-show="item">
              <div class="item">
                <a :href="item" download>
                  <img :src="getFileIcon(item)" alt="file icon" style="width:50px;height:50px;" class="item">
                  {{ getFileName3(item) }}
                </a>
                <!-- 取消上传按钮 -->
                <div @click="cancelUp3(item)" class="cancelDiv">
                  <i class="el-icon-error"></i>
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
      <!-- 表单修改信息 -->
      <el-dialog title="修改信息" :visible.sync="changeInfoShow" width="30%" :before-close="handleCloseChangeInfo">
        <el-form ref="changeInfoForm" :rules="changRules" :model="changeInfoForm" label-width="80px">
          <el-form-item label="专业" prop="major">
            <el-input placeholder="请输入专业名称" v-model="changeInfoForm.major">{{ changeInfoForm.major }}</el-input>
          </el-form-item>
          <el-form-item label="年级" prop="grade">
            <el-input placeholder="请输入所属年级" v-model="changeInfoForm.grade">{{ changeInfoForm.grade }}</el-input>
          </el-form-item>
          <el-form-item label="时间范围" prop="subsidiesTime">
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
            <el-select v-model="changeInfoForm.status">
              <el-option label="已完成" value="已完成"></el-option>
              <el-option label="进行中" value="进行中"></el-option>
              <el-option label="未完成" value="未完成"></el-option>
            </el-select>
          </el-form-item>
          <!-- 修改信息页面文件上传 -->
          <el-form-item label="文件一" prop="files1">
            <el-input placeholder="申请助学金的学生列表，及证明材料" v-model="changeInfoForm.files1" :disabled="true"></el-input>
            <div>
              <input type="file" ref="fileInput1" @change="uploadChangeFile1">
            </div>
            <div v-for="item in fileList1" :key="item" class="fileListShow" v-show="item">
              <div class="item">
                <a :href="item" download>
                  <img :src="getFileIcon(item)" alt="file icon" style="width:50px;height:50px;" class="item">
                  {{ getFileName1(item) }}
                </a>
                <!-- 取消上传按钮 -->
                <div @click="cancelUp1(item)" class="cancelDiv">
                  <i class="el-icon-error"></i>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="文件二" prop="files2">
            <el-input placeholder="困难生评议记录以及评议结果" v-model="changeInfoForm.files2" :disabled="true"></el-input>
            <div>
              <input type="file" ref="fileInput2" @change="uploadChangeFile2">
            </div>
            <div v-for="item in fileList2" :key="item" class="fileListShow" v-show="item">
              <div class="item">
                <a :href="item" download>
                  <img :src="getFileIcon(item)" alt="file icon" style="width:50px;height:50px;" class="item">
                  {{ getFileName2(item) }}
                </a>
                <!-- 取消上传按钮 -->
                <div @click="cancelUp2(item)" class="cancelDiv">
                  <i class="el-icon-error"></i>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="文件三" prop="files3">
            <el-input placeholder="最终发放助学金的学生名单、助学金金额" v-model="changeInfoForm.files3" :disabled="true"></el-input>
            <div>
              <input type="file" ref="fileInput3" @change="uploadChangeFile3">
            </div>
            <div v-for="item in fileList3" :key="item" class="fileListShow" v-show="item">
              <div class="item">
                <a :href="item" download>
                  <img :src="getFileIcon(item)" alt="file icon" style="width:50px;height:50px;" class="item">
                  {{ getFileName3(item) }}
                </a>
                <!-- 取消上传按钮 -->
                <div @click="cancelUp3(item)" class="cancelDiv">
                  <i class="el-icon-error"></i>
                </div>
              </div>
            </div>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel3">取 消</el-button>
          <el-button type="primary" @click="submitChangeInfo">保 存</el-button>
        </span>
      </el-dialog>
      <!-- 只能由辅导员(role = 1)增删 -->
      <el-button @click="dialogVisible = true" type="primary" class="addButton" v-show="role === '1'">添加记录</el-button>
      <!-- <el-button @click="dialogVisible2 = true" type="primary" class="searchButton">查询班级</el-button> -->
      <div class="manage-header">

        <ImgTabels :tableColumns="columns" :tableData="tableData" :operaColums="operaColums" :total="total"
          :limit="pageLimit" :currentPage="currentPage" @click_1="edit" @click_2="handleDelete"
          @changePage="changePage" />
      </div>
    </div>
  </div>
</template>
  
<script>
import ImgTabels from '../../components/ImgTabels/index.vue'
import { columns, operaColums } from './const'
import { subsList, addSub, delSub, editSub, uploadFiles } from './api/index'
export default {
  name: 'Gar',
  components: {
    ImgTabels
  },
  data() {
    return {
      role: localStorage.getItem('role'), //登录用户的身份
      // 列表配置
      currentPage: 1, // 当前页
      pageLimit: 5, // 当前页面分页数
      tableData: [], // 数据列表
      columns: [],// 列表配置
      operaColums: [],//操作按钮配置
      total: 0, // 数据条数
      //添加班级信息
      subInfo: {
        major: '', //专业
        grade: '', //年级
        subsidiesTime: '', //评定的时间范围
        status: '', //当前评定阶段
        files1: '',
        files2: '',
        files3: ''
      },
      // 查询班级信息
      searchInfo: {
        classId: '', //班级Id（根据后台文档，目前只能通过Id查询，后续增添查询功能）
      },
      dialogVisible: false,
      dialogVisible2: false,
      infoVisible: false,
      rules: {
        major: [
          { required: true, message: '请输入专业名称' }
        ],
        grade: [
          { required: true, message: '请输入所属年级' }
        ],
        subsidiesTime: [
          { required: true, message: '请输入评定的时间范围' }
        ],
        status: [
          { required: true, message: '请输入当前评定阶段' }
        ],
      },
      rules2: {
        classId: [
          { required: true, message: '请输入要查询班级的ID' }
        ]
      },
      changeInfoShow: false,
      changeInfoForm: {},
      //修改数据对象
      changeInfoShow: false,
      startYear: '2022',
      endYear: '2023',
      minYear: 2010, // 最小年份
      maxYear: new Date().getFullYear(), // 最大年份为当前年份
      changRules: {
        major: [
          { required: true, message: '请输入专业名称' }
        ],
        grade: [
          { required: true, message: '请输入所属年级' }
        ],
        subsidiesTime: [
          { required: true, message: '请输入评定的时间范围' }
        ],
        status: [
          { required: true, message: '请输入当前评定阶段' }
        ],
      },
      //关于文件上传的相关参数
      fileList1: [],//存储上传的文件
      fileName1: [],//存储上传后的文件名
      fileList2: [],
      fileName2: [],
      fileList3: [],
      fileName3: [],
    }
  },
  methods: {
    handleClose() {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$refs.subInfo.resetFields()
          //关闭后将文件相关显示的数据清空
          this.fileList = []
          this.fileName = []
          this.dialogVisible = false
        })
        .catch(_ => { });
    },
    // 修改表单关闭逻辑
    handleCloseChangeInfo() {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$refs.changeInfoForm.resetFields()
          //关闭后将文件相关显示的数据清空
          this.fileList = []
          this.fileName = []
          this.changeInfoShow = false
        })
        .catch(_ => { });
    },
    cancel() {
      this.handleClose()
    },
    cancel3() {
      this.handleCloseChangeInfo()
    },
    submit() {
      // 将存储文件链接信息的数组转换为字符串
      this.subInfo.files1 = this.fileList1.toString()
      this.subInfo.files2 = this.fileList2.toString()
      this.subInfo.files3 = this.fileList3.toString()

      const startYear = this.startYear || '';
      const endYear = this.endYear || '';
      // 将时间范围字符串存储在scholInfo对象中
      if (startYear && endYear) {
        this.subInfo.subsidiesTime = `${startYear} 至 ${endYear}`;
      } else {
        this.subInfo.subsidiesTime = '';
      }
      this.$refs.subInfo.validate((valid) => {
        if (valid) {
          addSub(this.subInfo).then((res) => {
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
            this.getSubsList()
          })
          this.handleClose()
        }
      })
    },
    //获取助学金列表
    getSubsList() {
      const params = {
        page: this.currentPage,
        pageLimit: this.pageLimit,
      }
      subsList(params).then(res => {
        // console.log(res.data);
        this.tableData = res.data.data.studentSubsidies
        this.total = res.data.data.sum
      }).catch((error) => {
        this.$message.error('拉取列表错误', error);
      })
    },
    edit(value) {
      this.changeInfoShow = true
      this.changeInfoForm = value
      //这里判断如果修改信息原本有文件上传，将其转数组存储
      if (this.changeInfoForm.files1) {
        this.fileList1 = this.changeInfoForm.files1.split(',')
      }
      if (this.changeInfoForm.files2) {
        this.fileList2 = this.changeInfoForm.files2.split(',')
      }
      if (this.changeInfoForm.files3) {
        this.fileList3 = this.changeInfoForm.files3.split(',')
      }
    },
    //修改信息提交按钮
    submitChangeInfo() {
      // 将存储文件链接信息的数组转换为字符串
      this.changeInfoForm.files1 = this.fileList1.toString()
      this.changeInfoForm.files2 = this.fileList2.toString()
      this.changeInfoForm.files3 = this.fileList3.toString()

      const startYear = this.startYear || '';
      const endYear = this.endYear || '';
      // 将时间范围字符串存储在scholInfo对象中
      if (startYear && endYear) {
        this.changeInfoForm.subsidiesTime = `${startYear} 至 ${endYear}`;
      } else {
        this.changeInfoForm.subsidiesTime = '';
      }
      this.$refs.changeInfoForm.validate((valid) => {
        if (valid) {
          // console.log('修改信息提交了');
          editSub(this.changeInfoForm).then((res) => {
            // console.log(res);
            if (res.status === 200) {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
            }
            else {
              this.$message.error('修改助学金信息失败', error);
            }
            this.getSubsList()
            // 重置表单
            this.$refs.changeInfoForm.resetFields()
            // 关闭弹窗
            this.changeInfoShow = false
          })
        }
      })
    },
    //上传相关文件
    uploadFile1() {
      const file = this.$refs.fileInput1.files[0];
      const formData = new FormData();
      formData.append('uploadFile', file);
      uploadFiles(formData).then((res) => {
        if (this.subInfo.files1) {
          this.subInfo.files1 = this.subInfo.files1 + ',' + res.data.data
        }
        else {
          this.subInfo.files1 = res.data.data
        }
        this.fileList1 = this.subInfo.files1.split(',')
        const uploadedFile = {
          name: file.name,
          file: res.data.data
        };
        this.fileName1.push(uploadedFile)
      }).catch((error) => {
        console.error(error);
      })
    },
    uploadFile2() {
      const file = this.$refs.fileInput2.files[0];
      const formData = new FormData();
      formData.append('uploadFile', file);
      uploadFiles(formData).then((res) => {
        if (this.subInfo.files2) {
          this.subInfo.files2 = this.subInfo.files2 + ',' + res.data.data
        }
        else {
          this.subInfo.files2 = res.data.data
        }
        this.fileList2 = this.subInfo.files2.split(',')
        const uploadedFile = {
          name: file.name,
          file: res.data.data
        };
        this.fileName2.push(uploadedFile)
      }).catch((error) => {
        console.error(error);
      })
    },
    uploadFile3() {
      const file = this.$refs.fileInput3.files[0];
      const formData = new FormData();
      formData.append('uploadFile', file);
      uploadFiles(formData).then((res) => {
        if (this.subInfo.files2) {
          this.subInfo.files2 = this.subInfo.files2 + ',' + res.data.data
        }
        else {
          this.subInfo.files2 = res.data.data
        }
        this.fileList3 = this.subInfo.files2.split(',')
        const uploadedFile = {
          name: file.name,
          file: res.data.data
        };
        this.fileName3.push(uploadedFile)
      }).catch((error) => {
        console.error(error);
      })
    },
    //修改信息页面的上传相关文件
    uploadChangeFile1() {
      const file = this.$refs.fileInput1.files[0];
      const formData = new FormData();
      formData.append('uploadFile', file);
      uploadFiles(formData).then((res) => {
        if (this.changeInfoForm.files1) {
          this.changeInfoForm.files1 = this.changeInfoForm.files1 + ',' + res.data.data
        }
        else {
          this.changeInfoForm.files1 = res.data.data
        }
        this.fileList1 = this.changeInfoForm.files1.split(',')
        const uploadedFile = {
          name: file.name,
          file: res.data.data
        };
        this.fileName1.push(uploadedFile)
      }).catch((error) => {
        console.error(error);
      })
    },
    uploadChangeFile2() {
      const file = this.$refs.fileInput2.files[0];
      const formData = new FormData();
      formData.append('uploadFile', file);
      uploadFiles(formData).then((res) => {
        if (this.changeInfoForm.files2) {
          this.changeInfoForm.files2 = this.changeInfoForm.files2 + ',' + res.data.data
        }
        else {
          this.changeInfoForm.files2 = res.data.data
        }
        this.fileList2 = this.changeInfoForm.files2.split(',')
        const uploadedFile = {
          name: file.name,
          file: res.data.data
        };
        this.fileName2.push(uploadedFile)
      }).catch((error) => {
        console.error(error);
      })
    },
    uploadChangeFile3() {
      const file = this.$refs.fileInput3.files[0];
      const formData = new FormData();
      formData.append('uploadFile', file);
      uploadFiles(formData).then((res) => {
        if (this.changeInfoForm.files3) {
          this.changeInfoForm.files3 = this.changeInfoForm.files3 + ',' + res.data.data
        }
        else {
          this.changeInfoForm.files3 = res.data.data
        }
        this.fileList3 = this.changeInfoForm.files3.split(',')
        const uploadedFile = {
          name: file.name,
          file: res.data.data
        };
        this.fileName3.push(uploadedFile)
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
    getFileName1(item) {
      if (this.fileName1.length != 0) {
        for (let i = 0; i < this.fileName1.length; i++) {
          if (this.fileName1[i].file === item) {
            console.log('yes', this.fileName1[i].name);
            return this.fileName1[i].name
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
    getFileName2(item) {
      if (this.fileName2.length != 0) {
        for (let i = 0; i < this.fileName2.length; i++) {
          if (this.fileName2[i].file === item) {
            console.log('yes', this.fileName2[i].name);
            return this.fileName2[i].name
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
    getFileName3(item) {
      if (this.fileName3.length != 0) {
        for (let i = 0; i < this.fileName3.length; i++) {
          if (this.fileName3[i].file === item) {
            console.log('yes', this.fileName3[i].name);
            return this.fileName3[i].name
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
    cancelUp1(item) {
      this.fileList1.splice(this.fileList1.indexOf(item), 1);
    },
    cancelUp2(item) {
      this.fileList2.splice(this.fileList2.indexOf(item), 1);
    },
    cancelUp3(item) {
      this.fileList3.splice(this.fileList3.indexOf(item), 1);
    },

    // 删除某条班级信息
    handleDelete(row) {
      if (this.role === '1') {
        this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delSub({ studentSubsidiesId: row.studentSubsidiesId }).then(res => {
            this.$message({
              message: res.data.msg,
              type: 'success'
            })

            // 重新获取列表接口
            this.getSubsList()
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

    },
    changePage(val) {
      this.currentPage = val
      this.getSubsList()
    },
  },
  computed: {
    years() {
      const years = [];
      for (let year = this.maxYear; year >= this.minYear; year--) {
        years.push(year);
      }
      return years;
    }
  },
  mounted() {
    // this.getSimpleList()
    this.getSubsList()
    this.columns = columns
    this.operaColums = operaColums
  }
}
</script>
  
<style scoped>
.demo-form-inline {
  display: flex;
  justify-content: center;
}

.el-table {
  margin-left: 150px;
}

div /deep/ .el-dialog {
  border-radius: 8px;
}

/* .addButton {
    position: absolute;
    left: 210px;
    top: 110px;
  } */
.addButton {
  position: absolute;
  right: 20px;
  top: 109px;
}

.searchButton {
  position: absolute;
  right: 10px;
  top: 108px;
}

.classList {
  top: 45px;
  left: -130px;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

/* .box-card {
    width: 480px;
    display: none;
    position: absolute;
    top: 30px;
  } */
.classInfoShow {
  list-style: none;
  line-height: 50px;
}

.classInfoShow li {
  text-align: left;
  font-size: 20px;
}

.classInfoShow li span {
  font-weight: bold;
}

.classManage /deep/ .el-dialog__title {
  font-size: 24px;
  font-weight: bold;
}

.el-dialog__wrapper {
  line-height: 28px;
}

.manage-header {
  margin-top: 52px;
}

.findInput {
  position: absolute;
  top: 130px;
  left: 250px;
  width: 300px;
  z-index: 11;
}

.findButton {
  position: absolute;
  top: 190px;
  left: 560px;
  z-index: 23;
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