<template>
    <div>
      <!-- 搜索学生 -->
    <div class="searchInfo">
      <el-dropdown>
        <span class="el-dropdown-link">
          选择搜索条件<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="selectStudentNum">学生学号搜索</el-dropdown-item>
          <el-dropdown-item @click.native="selectPizeid">请选择政治面貌</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 搜索框的显示 -->
      <div v-show="showNum">
        <el-input v-model="search.studentNum" class="searchInput" placeholder="请输入学生学号">
        </el-input>
        <el-button icon="el-icon-search" circle class="search" @click="searchStudentNum"></el-button>
      </div>
      <div v-show="showPizeid">
        <el-input v-model="search.searchPoliticalStatus" placeholder="请选择政治面貌" class="searchInput">
        </el-input>
        <el-button icon="el-icon-search" circle class="search" @click="searchPolitical"></el-button>
      </div>
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
  
            <!-- 添加班级表单 -->
           <!--  <el-form-item label="班级" prop="studentClass">
              <el-input placeholder="请输入班级" v-model="form.studentClass"></el-input>
            </el-form-item> -->
  
            <el-form-item label="政治面貌" prop="politicalStatus">
              <!-- <el-input placeholder="请输入政治面貌" v-model="form.politicalStatus"></el-input> -->
              <el-select placeholder="请选择政治面貌" v-model="form.politicalStatus">
                <el-option label="积极分子" value='积极分子'></el-option>
                <el-option label="预备党员" value='预备党员'></el-option>
                <el-option label="转正党员" value='转正党员'></el-option>
              </el-select>
            </el-form-item>
  
            <!-- 请输入预备党员时间 -->
            <el-form-item label="预备党员" prop="prepareMemberTime">
              <el-date-picker v-model="form.prepareMemberTime" type="date" placeholder="请选择预备党员时间" format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
  
            <!-- 转正党员时间 -->
            <el-form-item label="转正党员" prop="fullMemberTime">
              <el-date-picker v-model="form.fullMemberTime" type="date" placeholder="请选择转正党员时间" format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>

          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="submit">提 交</el-button>
          </span>
        </el-dialog>
  
        <!-- 修改信息按钮 -->
        <!-- 点击按钮弹出表单修改信息 -->
        <el-dialog title="修改信息" :visible.sync="changeInfoShow" width="30%" :before-close="handleClosechangeInfo">
          <el-form ref="changeInfoForm" :rules="changRules" :model="changeInfoForm" label-width="80px">
            <el-form-item label="学号" prop="studentNum">
              <el-input placeholder="请输入学号" :disabled="true" v-model="changeInfoForm.studentNum">{{ changeInfoForm.studentNum }}</el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="studentName">
              <el-input placeholder="请输入姓名" :disabled="true" v-model="changeInfoForm.studentName">{{ changeInfoForm.studentName }}</el-input>
            </el-form-item>
            <el-form-item label="班级" prop="studentClass">
              <el-input placeholder="请输入班级" :disabled="true" v-model="changeInfoForm.studentClass">{{ changeInfoForm.studentClass }}</el-input>
            </el-form-item>
            <el-form-item label="政治面貌" prop="politicalStatus">
              <!-- <el-input placeholder="请选择政治面貌" v-model="changeInfoForm.politicalStatus">{{ changeInfoForm.politicalStatus }}</el-input> -->
              <el-select placeholder="请选择政治面貌" v-model="changeInfoForm.politicalStatus">
                <el-option label="积极分子" value='积极分子'></el-option>
                <el-option label="预备党员" value='预备党员'></el-option>
                <el-option label="转正党员" value='转正党员'></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="预备党员" prop="prepareMemberTime">
              <el-date-picker v-model="changeInfoForm.prepareMemberTime" type="date" placeholder="请选择预备党员时间" format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="转正党员" prop="fullMemberTime">
              <el-date-picker v-model="changeInfoForm.fullMemberTime" type="date" placeholder="请选择转正党员时间" format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancel2">取 消</el-button>
            <el-button type="primary" @click="submitchangeInfo">提 交</el-button>
          </span>
        </el-dialog>
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
      <!-- changeLimit改变页面拉取数据数量现在是固定的不需要去改变 -->
      <!-- @changeLimit="changeLimit" -->
    </div>
  </template>
  
  <script>
  import Tables from './../../../components/Tabels';
  import {columns,operaColums} from './const'
  import { punishList, addPunish,removeInfo,changeInfo,searchUseNum,searchUsePoliticalStatus } from './api'
  export default {
    name: 'Svrad',
    components:{
      Tables
    },
      data(){
        return {
        currentPage: 1, // 当前页
        pageLimit: 5, // 当前页面分页数
        total:0,//数据条数
        form: {},//新增的form表单
        tableData: [],//数据列表
        columns:[],//列表配置
        operaColums:[],//操作按钮配置
        dialogVisible: false,//弹出窗口是否显示参数
        search:{
          studentNum:'',
          searchPoliticalStatus:''
        }, //根据字段进行搜索
        showNum:true,//选择类型对应输入框的显示参数
        showPizeid:false,//选择类型对应输入框的显示参数
        rules: {
          studentNum: [
            { required: true, message: '请输入学生学号' }
        ],
  /*       studentName: [
            { required: true, message: '请输入获奖学生姓名' }
          ], */
        },//新增信息的输入规则
        changRules:{
        studentNum: [
            { required: true, message: '请输入学生学号' }
        ],
        studentName: [
            { required: true, message: '请输入学生姓名' }
          ],
          studentClass: [
            { required: true, message: '请输入学生班级' }
          ],
          politicalStatus: [
            { required: true, message: '请选择政治面貌' }
          ],
          prepareMemberTime: [
        { required: true, message: '请选择预备党员时间' }
          ],
          fullMemberTime: [
            { required: true,message:'请选择转正党员时间'}
          ]
        },//修改信息的规则
        changeInfoShow:false,
        changeInfoForm:{}
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
            this.tableData = res.data.data.partyMembers
            this.total=res.data.sum
        }).catch((error)=>{
          this.$message.error('拉取列表错误',error);
      })
      },
      // 提交用户表单函数
      submit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            addPunish(this.form).then((res) => {
            console.log(res);
              if(res.status===200)
          {
            console.log('添加成功');
            this.$message({
            message: '添加成功',
            type: 'success'
          });
          }
          else{
            alert('添加失败',res.data.msg)
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
        this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //value值对应的是点击删除用户对应该用户的信息
        removeInfo(value).then((res)=>{
          console.log(res.status);
          if(res.status===200){
            this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.gepunishList()
          }
          else{
          this.$message.error('删除用户信息失败',error);
          }
        }).catch((error)=>{
          this.$message.error('删除用户信息错误',error);
        })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      //修改用户
      modify(value){
        console.log(value);
        this.changeInfoShow = true
        this.changeInfoForm=value
      },
      //修改信息提交按钮
      submitchangeInfo(){
        console.log('修改信息提交了');
        changeInfo(this.changeInfoForm).then((res)=>{
          console.log(res);
          if(res.status===200){
            this.$message({
            message: '修改成功',
            type: 'success'
          });
          }
          else{
          this.$message.error('修改用户信息失败',error);
          }
          this.gepunishList()
          // 重置表单
          this.$refs.changeInfoForm.resetFields()
          // 关闭弹窗
          this.changeInfoShow = false
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
      handleClosechangeInfo(){
        this.$refs.changeInfoForm.resetFields()
        this.changeInfoShow = false
      },
      cancel2(){
        this.handleClosechangeInfo()
      },
      //选择了使用学生学号进行搜索调用的函数
      selectStudentNum(){
        this.showNum=true
        this.showPizeid=false
      },
      //选择了使用学生获奖id进行搜索调用设计
      selectPizeid(){
        this.showPizeid=true
        this.showNum=false
      },
      changeLimit(val) {
      this.pageLimit = val;
      this.gepunishList();
      },
      changePage(val){
        this.currentPage=val
        this.gepunishList();
      },

      //使用学生学号进行搜索
      searchStudentNum() {
      if (!this.search.studentNum) {
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
        if(res.data.status===0)
        {
          this.tableData=res.data.data.partyMembers
          this.$message({
          message: '搜索成功',
          type: 'success'
        });
        }
        else{
          this.$message({
          showClose: true,
          message: '查询失败',
          type: 'error'
        });
        }
        }).catch((error)=>{
          this.$message({
          showClose: true,
          message: '连接错误，请稍后',
          type: 'error'
        });
        })
      }
    },
    //根据政治面貌进行搜索
      searchPolitical(){
        if (!this.search.searchPoliticalStatus) {
        // console.log('数据为空');
        this.$message('请输入内容进行搜索');
        this.gepunishList()
      }
      else {
        const searchInfo = {
          page: this.currentPage,
          pageLimit: this.pageLimit,
          politicalStatus: this.search.searchPoliticalStatus
        }
        this.$message({
          showClose: true,
          message: '正在搜索请稍等'
        });
        searchUsePoliticalStatus(searchInfo).then((res) => {
        if(res.data.status===0)
        {
          this.tableData=res.data.data.partyMembers
          this.$message({
          message: '搜索成功',
          type: 'success'
        });
        }
        else{
          this.$message({
          showClose: true,
          message: '查询失败',
          type: 'error'
        });
        }
        }).catch((error)=>{
          this.$message({
          showClose: true,
          message: '连接错误，请稍后',
          type: 'error'
        });
        })
      }
      },
    },
  
    mounted() {
      //进来页面直接调用获取学生列表函数
      this.gepunishList()
      this.columns=columns
      this.operaColums=operaColums  
    }
    }
  
  </script>
  
  <style scoped>
.searchInfo {
  position: relative;
}

/* 下拉框选择的基本样式 */
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}

.el-icon-arrow-down {
  font-size: 12px;
}
/* 添加信息按钮和导出信息按钮样式 */
.btn {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 10px;
}
      /* 搜索框样式 */
.searchInput {
  position: absolute;
  font-size: 14px;
  z-index: 11;
  top: 12px;
  left: 145px;
  width: 500px;
}

/* 下拉选择框样式 */
.el-dropdown {
  display: inline-block;
  color: #606266;
  font-size: 14px;
  position: absolute;
  z-index: 23;
  top: 12px;
  left: 30px;
  height: 90px;
}

/* 搜索的按钮 */
.search {
  position: absolute;
  top: 71px;
  left: 650px;
  z-index: 23;
}

  </style>