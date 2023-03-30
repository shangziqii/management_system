<template>
  <div>
    <!-- 搜索某班级所有查寝记录列表 -->
    <div>
      <el-input v-model="search2.classId" class="searchInput2" placeholder="请输入班级ID查询查寝记录列表">
      </el-input>
      <el-button icon="el-icon-search" circle class="search2" @click="showDorList"></el-button>
    </div>
    <!-- 搜索框的显示 -->
    <div>
      <el-input v-model="search.dormitoryVisitId" class="searchInput" placeholder="请输入寝室号查看查寝记录">
      </el-input>
      <el-button icon="el-icon-search" circle class="search" @click="searchDormitory"></el-button>
    </div>
    <!-- 添加信息按钮 -->
    <el-button type="primary" class="addInfo" @click="dialogVisible = true">添加信息</el-button>
    <!-- 点击按钮弹出表单添加信息 -->
    <el-dialog title="添加信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="班级ID" prop="classId">
          <el-input placeholder="请输入寝室所属班级的ID" v-model="form.classId"></el-input>
        </el-form-item>
        <el-form-item label="查寝时间" prop="dorTime">
          <el-date-picker v-model="form.dorTime" type="datetime" placeholder="请选择查寝时间" format="yyyy-MM-dd-HH-mm-ss"
            value-format="yyyy-MM-dd-HH-mm-ss" class="pickTime">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="查寝目标" prop="subject">
          <el-input placeholder="请输入检查的寝室" v-model="form.subject"></el-input>
        </el-form-item>
        <el-form-item label="内容记录" prop="contentRecord">
          <el-input placeholder="请输入需要记录的关键内容" v-model="form.contentRecord"></el-input>
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

      <!-- 修改信息按钮 -->
      <!-- 点击按钮弹出表单修改信息 -->
      <el-dialog title="修改信息" :visible.sync="changeInfoShow" width="30%" :before-close="handleCloseChangeInfo">
        <el-form ref="changeInfoForm" :rules="changRules" :model="changeInfoForm" label-width="80px">
          <el-form-item label="寝室ID" prop="dormitoryVisitId">
            <el-input placeholder="请输入寝室ID" :disabled="true" v-model="changeInfoForm.dormitoryVisitId">{{ changeInfoForm.dormitoryVisitId }}</el-input>
          </el-form-item>
          <el-form-item label="查寝时间" prop="time">
            <el-date-picker v-model="changeInfoForm.time" type="datetime" placeholder="请选择查寝时间" format="yyyy-MM-dd-HH-mm-ss"
            value-format="yyyy-MM-dd-HH-mm-ss" class="pickTime">
          </el-date-picker>
          </el-form-item>
          <el-form-item label="查寝目标" prop="subject">
            <el-input placeholder="请输入查寝目标" :disabled="true" v-model="changeInfoForm.subject">{{ changeInfoForm.subject }}</el-input>
          </el-form-item>
          <el-form-item label="内容记录" prop="contentRecord">
            <el-input placeholder="请输入关键内容记录" v-model="changeInfoForm.contentRecord">{{ changeInfoForm.contentRecord }}</el-input>
          </el-form-item>
          <el-form-item label="上传文件" prop="files">
            <el-input placeholder="请上传文件" v-model="changeInfoForm.files"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel2">取 消</el-button>
          <el-button type="primary" @click="submitChangeInfo">提 交</el-button>
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
      @click_1="deleteDor"
      @click_2="modify"
      @changePage="changePage"
      />
  </div>
</template>

<script>
import Tables from '../../components/Tabels/index.vue'
import { columns, operaColums} from './const'
import { addDor, getDorList, editDor, delDor, getDor } from './api/index'

export default {
  name: 'Dormitory',
  components: {
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
        dormitoryVisitId: ''
      },
      search2: {
        classId: ''
      },
      form: {},
      dialogVisible: false,
      rules: {
        classId: [
          { required: true, message: '请输入寝室所属班级ID' }
        ],
        dorTime: [
          { required: true, message: '请选择查寝时间' }
        ]
      },
      changeInfoShow:false,
      changeInfoForm:{},
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
      }
    }
  },
  methods: {
    // 获取查寝信息列表
    showDorList() {
        //发送请求参数
        const params = {
         page: this.currentPage,
         pageLimit: this.pageLimit,
         classId: this.search2.classId
       }
       //发送获取查寝信息列表的请求
      getDorList(params).then((res) => {
          console.log(res.data);
          //将获取到的查寝信息给到tableData
            // this.tableData = res.data.data.prizeStudents
            this.total=res.data.total
        }).catch((error)=>{
          this.$message.error('获取查寝信息列表错误',error);
      })
      },
    // 查询宿舍查寝记录
    searchDormitory() {
      
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
            this.showDorList()
            })
            this.handleClose()
          }
        })
    },
    deleteDor(value) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //value值对应的是点击删除该查寝信息
      delDor(value).then((res)=>{
        console.log(res.status);
        if(res.status===200){
          this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.geWinnerList()
        }
        else{
        this.$message.error('删除查寝信息失败',error);
        }
      }).catch((error)=>{
        this.$message.error('删除查寝信息错误',error);
      })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    //修改信息
    modify(value){
      // console.log(value);
      this.changeInfoShow = true
      this.changeInfoForm=value
    },
    // 修改表单关闭逻辑
    handleCloseChangeInfo(){
      this.$refs.changeInfoForm.resetFields()
      this.changeInfoShow = false
    },
    cancel2(){
      this.handleCloseChangeInfo()
    },
    //修改信息提交按钮
    submitChangeInfo(){
      this.$refs.form.validate((valid) => {
        if (valid) {
      console.log('修改信息提交了');
      editDor(this.changeInfoForm).then((res)=>{
        console.log(res);
        if(res.status===200){
          this.$message({
          message: '修改成功',
          type: 'success'
        });
        }
        else{
        this.$message.error('修改查寝信息失败',error);
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
    changePage(val){
      this.currentPage=val
      this.showDorList()
    }
  },
  mounted() {
    // this.showDorList()
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
</style>