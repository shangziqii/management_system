<template>
  <div>
    <!-- 搜索框的显示 -->
      <div>
        <el-input v-model="search.meetingId" class="searchInput" placeholder="请输入寝室号">
        </el-input>
        <el-button icon="el-icon-search" circle class="search" @click="searchMeet"></el-button>
      </div>
      <!-- 添加信息按钮 -->
      <el-button type="primary" class="addInfo" @click="dialogVisible = true">添加信息</el-button>
      <!-- 点击按钮弹出表单添加信息 -->
      <el-dialog title="添加信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <el-form ref="form" :rules="rules" :model="form" label-width="80px">
          <el-form-item label="班级ID" prop="classId">
            <el-input placeholder="请输入开班会班级的ID" v-model="form.classId"></el-input>
          </el-form-item>
          <el-form-item label="开始时间" prop="startTime">
            <el-date-picker v-model="form.startTime" type="datetime" placeholder="请选择开始时间" format="yyyy-MM-dd-HH-mm-ss"
              value-format="yyyy-MM-dd-HH-mm-ss">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间" prop="endTime">
            <el-date-picker v-model="form.endTime" type="datetime" placeholder="请选择结束时间" format="yyyy-MM-dd-HH-mm-ss"
              value-format="yyyy-MM-dd-HH-mm-ss">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="班会地点" prop="location">
            <el-input placeholder="请输入班会地点" v-model="form.location"></el-input>
          </el-form-item>
          <el-form-item label="班会目标" prop="subject">
            <el-input placeholder="请输入班会目标" v-model="form.subject"></el-input>
          </el-form-item>
          <el-form-item label="内容记录" prop="contentRecord">
            <el-input placeholder="请输入班会关键内容" v-model="form.contentRecord"></el-input>
          </el-form-item>
          <el-form-item label="文件URL" prop="files">
            <el-input placeholder="请输入要上传文件的URL" v-model="form.files"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="submit">提 交</el-button>
        </span>
      </el-dialog>



      <!-- 展示查寝信息的表格 -->
      <Tables
        :tableColumns="columns" 
        :operaColums="operaColums"
        :tableData="tableData"
        :total="total"
        :limit="pageLimit"
        :currentPage="currentPage"
        @click_1="deleteStu"
        @click_2="modify"
        @changePage="changePage"
        />
  </div>
</template>

<script>
import Tables from '../../components/Tabels/index.vue'
import { columns, operaColums} from './const'
import { getMeetList, addMeet } from './api/index'
export default {
    name: 'ClassMeet',
    component: {
      Tables
    },
    data() {
      return {
        currentPage: 1, // 当前页
        pageLimit: 5, // 当前页面分页数
        total:0,//数据条数
        tableData: [],//数据列表
        columns:[],//列表配置
        operaColums:[],//操作按钮配置
        search: {
          meetingId: ''
        },
        form: {},
        dialogVisible: false,
        rules: {
        classId: [
          { required: true, message: '请输入开班会班级的ID'}
        ],
        startTime: [
          { required: true, message: '请选择班会开始时间' }
        ],
        endTime: [
          { required: true, message: '请选择班会结束时间' }
        ]
      }
      }
    },
    methods: {
    // 获取查寝信息列表
    showMeetList() {
        //发送请求参数
        const params = {
         page: this.currentPage,
         pageLimit: this.pageLimit,
       }
       //发送获取查寝信息列表的请求
      getMeetList(params).then((res) => {
          // console.log(res.data.data.prizeStudents);
          //将获取到的班会信息给到tableData
            // this.tableData = res.data.data.prizeStudents
            this.total=res.data.total
        }).catch((error)=>{
          this.$message.error('获取班会信息列表错误',error);
      })
      },
    // 弹窗关闭时重置表单
    handleClose() {
      this.$refs.form.resetFields()
      this.dialogVisible = false
    },
    //取消函数
    cancel() {
      this.handleClose()
    },
    // 添加信息提交表单
    submit() {
        this.$refs.form.validate((valid) => {
          if(valid) {
            addDor(this.form).then((res) => {
              console.log(res);
              this.$message({
                    message:res.data.msg,
                    type: 'success'
                    });
            // 重新获取列表的接口
            this.showMeetList()
            })
            this.handleClose()
          }
        })
    },
  },
  mounted() {
    this.showMeetList()
    this.columns = columns
    this.operaColums = operaColums
  },
}
</script>

<style scoped>
/* 搜索框样式 */
.searchInput{
  position: absolute;
  font-size: 14px;
  z-index: 11;
  top: -30px;
  left: 25px;
  width: 500px;
} 
/* 搜索的按钮 */
.search {
  position: absolute;
  top: 30px;
  left: 540px;
  z-index: 23;
}
/* 添加信息的按钮定位 */
.addInfo {
  position: absolute;
  right: 25px;
  top: 35px;
  z-index: 11;
}
</style>