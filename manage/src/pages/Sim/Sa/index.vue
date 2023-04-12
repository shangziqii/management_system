<template>
  <div>
    <!-- 搜索学生 -->
      <div class="searchInfo">
        <el-input onkeyup="this.value=this.value.replace(/\s+/g,'')" v-model="search.studentNum" class="input" placeholder="请输入学生学号">
          <!-- @change="onChange" -->
        </el-input>
        <el-button icon="el-icon-search" circle class="searchMore" @click="searchStudentNum"></el-button>
    </div>
    <div class="btn">
      <!-- 添加信息按钮 -->
      <el-button type="primary" size="small" class="addInfo" @click="dialogVisible = true">添加信息</el-button>
      <!-- 导出excel表格 -->
      <el-button type="primary" size="small" class="exportInfo" @click="showSelect = true">导出信息</el-button>
    </div>
    <!-- 点击按钮弹出表单添加信息 -->
    <el-dialog title="添加信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="学号" prop="studentNum">
          <el-input placeholder="请输入学号" v-model="form.studentNum"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="studentName">
          <el-input placeholder="请输入姓名" v-model="form.studentName"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="className">
          <el-input placeholder="请输入班级" v-model="form.className"></el-input>
        </el-form-item>
        <el-form-item label="奖项名称" prop="prizeName">
          <el-input placeholder="请输入奖项名称" v-model="form.prizeName"></el-input>
        </el-form-item>
        <el-form-item label="奖项等级" prop="prizeLevel">
          <el-input placeholder="请输入奖项等级" v-model="form.prizeLevel"></el-input>
        </el-form-item>
        <el-form-item label="获奖时间" prop="prizeTime">
          <!-- <el-input placeholder="请输入获奖时间" v-model="form.prizeTime"></el-input> -->
          <el-date-picker v-model="form.prizeTime" type="date" placeholder="请选择获奖时间" format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="指导老师" prop="teacher">
          <el-input placeholder="请输入指导老师" v-model="form.teacher"></el-input>
        </el-form-item>

        <!-- 上传电子版奖状（文件） -->
        <el-form-item label="奖状电子版" prop="files">
          <el-input placeholder="请选择奖状电子版" v-model="form.files" :disabled="true"></el-input>
          <div>
            <el-upload name="uploadFile" class="avatar-uploader" action="/api/prizeStudent/uploadFile" :headers="headers" :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>

          <!-- 覆盖默认的上传行为，可以自定义上传的实现 -->
          <!-- <div>
            <el-upload name="uploadFile" class="avatar-uploader" action="#" :http-request="submitPicture" :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div> -->
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">提 交</el-button>
      </span>
    </el-dialog>

    <!-- 修改信息按钮 -->
    <!-- 点击按钮弹出表单修改信息 -->
    <el-dialog title="修改信息" :visible.sync="changeInfoShow" width="30%" :before-close="handleCloseChangeInfo">
      <el-form ref="changeInfoForm" :rules="changRules" :model="changeInfoForm" label-width="80px">
        <el-form-item label="学号" prop="studentNum">
          <el-input placeholder="请输入学号" :disabled="true" v-model="changeInfoForm.studentNum"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="studentName">
          <el-input placeholder="请输入姓名" :disabled="true" v-model="changeInfoForm.studentName"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="className">
          <el-input placeholder="请输入班级" :disabled="true" v-model="changeInfoForm.className"></el-input>
        </el-form-item>
        <el-form-item label="奖项名称" prop="prizeName">
          <el-input placeholder="请输入奖项名称" v-model="changeInfoForm.prizeName"></el-input>
        </el-form-item>
        <el-form-item label="奖项等级" prop="prizeLevel">
          <el-input placeholder="请输入奖项等级" v-model="changeInfoForm.prizeLevel"></el-input>
        </el-form-item>
        <el-form-item label="获奖时间" prop="prizeTime">
          <!-- <el-input placeholder="请输入获奖时间" v-model="form.prizeTime"></el-input> -->
          <el-date-picker v-model="changeInfoForm.prizeTime" type="date" placeholder="请选择获奖时间" format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="指导老师" prop="teacher">
          <el-input placeholder="请输入指导老师" v-model="changeInfoForm.teacher"></el-input>
        </el-form-item>
        <el-form-item label="奖状电子版" prop="files">
          <!-- <el-input placeholder="请输入奖状电子版" v-model="changeInfoForm.files"></el-input> -->
          <el-input placeholder="请输入奖状电子版" v-model="changeInfoForm.files" :disabled="true"></el-input>
          <div>
            <el-upload name="uploadFile" class="avatar-uploader" action="/api/prizeStudent/uploadFile" :headers="headers" :on-success="handleAvatarSuccess2"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel2">取 消</el-button>
        <el-button type="primary" @click="submitChangeInfo">提 交</el-button>
      </span>
    </el-dialog>
    <ImgTabels :tableColumns="columns" :operaColums="operaColums" :tableData="tableData" :total="total" :limit="pageLimit"
      :currentPage="currentPage" @click_1="deleteStu" @click_2="modify" @changePage="changePage"
      @changeLimit="changeLimit" />
     <ExportStudentInfo :isShow="showSelect" :cityOptions="cityOptions" @change="exportShow" @submit="submitSelect"/>
  </div>
</template>

<script>
import ImgTabels from './../../../components/ImgTabels';
import ExportStudentInfo from './../../../components/ExportStudentInfo'
import { columns, operaColums } from './const'
import { winnerList, addWinner, removeInfo, changeInfo, searchUseNum ,submitPictureTo,exportStuInfo} from './api'
var token =  localStorage.getItem('token')
export default {
  name: 'Sa',
  components: {
    ImgTabels,
    ExportStudentInfo
  },
  data() {
    return {
      imageUrl: '',
      currentPage: 1, // 当前页
      pageLimit: 5, // 当前页面分页数
      total: 0,//数据条数
      form: {},//新增的form表单
      tableData: [],//数据列表
      columns: [],//列表配置
      operaColums: [],//操作按钮配置
      dialogVisible: false,//弹出窗口是否显示参数
      search: {
        studentNum: ''
      }, //根据字段进行搜索
      headers:{
        token:token
      },
      showSelect:false,
      cityOptions:['学号','学生姓名','学生班级','奖项名称','奖项等级','获奖时间','指导老师','奖状电子版'],
      rules: {
        studentNum: [
          { required: true, message: '请输入学生学号' }
        ],
        studentName: [
          { required: true, message: '请输入获奖学生姓名' }
        ],
        /* 班级必须规则
        className: [
          { required: true, message: '请输入获奖学生班级' }
        ], */
        className:[
          {
            required:false
          }
        ],
        prizeName: [
          { required: true, message: '请输入获奖名称' }
        ],
        prizeLevel: [
          { required: true, message: '请输入获奖等级' }
        ],
        prizeTime: [
          { required: true, message: '请输入获奖时间' }
        ],
        files: [
          { required: false }
        ],
        teacher: [
          { required: false }
        ]
      },//新增信息的输入规则
      changRules: {
        studentNum: [
          { required: true, message: '请输入学生学号' }
        ],
        studentName: [
          { required: true, message: '请输入获奖学生姓名' }
        ],
        className: [
          { required: true, message: '请输入获奖学生班级' }
        ],
        prizeName: [
          { required: true, message: '请输入获奖名称' }
        ],
        prizeLevel: [
          { required: true, message: '请输入获奖等级' }
        ],
        prizeTime: [
          { required: true, message: '请输入获奖时间' }
        ],
        files: [
          { required: true, message: '请输入电子版证书' }
        ],
        teacher: [
          { required: true, message: '请输入指导老师' }
        ],
      },//修改信息的规则
      changeInfoShow: false,
      changeInfoForm: {}
        }
  },
  methods: {
    //拉取获奖学生列表
    geWinnerList() {
      //发送请求参数
      const params = {
        page: this.currentPage,
        pageLimit: this.pageLimit,
      }
      console.log(params);
      //发送获取学生列表的请求
      winnerList(params).then((res) => {
        console.log(res.data.data.prizeStudents);
        //这条注释是将获取到的学生获奖情况给到tableData
        this.tableData = res.data.data.prizeStudents
        this.total = res.data.total
      }).catch((error) => {
        this.$message.error('拉取列表错误', error);
      })
    },
    // 提交用户表单函数
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          addWinner(this.form).then((res) => {
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
            this.geWinnerList()
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
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
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
            this.geWinnerList()
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
    },
    //修改信息提交按钮
    submitChangeInfo() {
      this.$refs.changeInfoForm.validate((valid) => {
        if (valid) {
          console.log('修改信息提交了');
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
            this.geWinnerList()
            // 重置表单
            this.$refs.changeInfoForm.resetFields()
            // 关闭弹窗
            this.changeInfoShow = false
          })
        }
      })
    },
    // 弹窗关闭时重置表单
    handleClose() {
      this.$refs.form.resetFields()
      this.dialogVisible = false
      this.geWinnerList()
    },
    //取消函数
    cancel() {
      this.handleClose()
    },
    handleCloseChangeInfo() {
      this.$refs.changeInfoForm.resetFields()
      this.geWinnerList()
      this.changeInfoShow = false
    },
    cancel2() {
      this.handleCloseChangeInfo()
    },
    //使用学生学号进行搜索
    searchStudentNum() {
      // console.log("使用学生学号进行搜索");
      const studentNum = this.search.studentNum.replace(/\s+/g, '');
      if (studentNum==='') {
        // console.log('数据为空');
        this.$message('请输入内容进行搜索');
        this.geWinnerList()
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
            this.tableData = res.data.data.prizeStudents
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
    changeLimit(val) {
      this.pageLimit = val;
      this.geWinnerList();
    },
    changePage(val) {
      this.currentPage = val
      this.geWinnerList();
    },

    //输入框内内容发生变化时的回调
    /*     onChange(){
          console.log(this.search.studentNum); 
          searchStudentNum()
        } */

    //提交获奖电子证书方法
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.files=res.data
    },
    //提交修改页面的电子证书方法
    handleAvatarSuccess2(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.changeInfoForm.files=res.data
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },

    // 覆盖默认的上传行为，可以自定义上传的实现
    // 提交表单信息具体方法
   /*  submitPicture(param){
      let fd=new FormData()
      fd.append('uploadFile',param.file)
      submitPictureTo(fd).then((res)=>{
        console.log(res);
      }) 
    } */
    //导出学生信息
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
    //导出信息页面的是否展示
    exportShow(){
      this.showSelect=!this.showSelect;
    }
  },

  mounted() {
    //进来页面直接调用获取学生列表函数
    this.geWinnerList()
    this.columns = columns
    this.operaColums = operaColums
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
margin-left:10px;
}

/* 搜索框样式 */
.searchInfo{
  position:absolute;
  left:250px;
  z-index:11;
  top:120px;
}
.input{
  width: 250px;
  margin-right:10px;
}

/* 上传图片文件的相关样式 */
.avatar-uploader {
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #999;
}

.avatar {
  width: 100%;
  height: auto;
}
</style>