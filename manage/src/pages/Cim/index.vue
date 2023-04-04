<template>
<div>
  <div class="classManage" v-show="$route.path=='/Main/Cim'">
    <!-- 查询用户信息弹窗 -->
    <el-dialog title="查询班级信息" :visible.sync="dialogVisible2" width="30%" :before-close="handleClose2">
      <el-form ref="searchInfo" :rules="rules2" :model="searchInfo" label-width="80px">
        <el-form-item label="班级ID" placeholder="请输入班级ID" prop="classId">
          <el-input v-model="searchInfo.classId"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel2">取 消</el-button>
        <el-button type="primary" @click="submit2">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 查询后展示班级信息的对话框 -->
    <el-dialog
      title="班级信息"
      :visible.sync="infoVisible"
      width="30%"
      :before-close="handleClose3">
      <ul class="classInfoShow">
        <li><span>班级ID：</span> {{getClassData.classId}}</li>
        <li><span>班级名称：</span> {{getClassData.className}}</li>
        <li><span>所属辅导员ID：</span> {{getClassData.userId}}</li>
        <li><span>所属辅导员姓名：</span> {{getClassData.userName}}</li>
        <li><span>学院:</span> {{getClassData.department}}</li>
        <li><span>专业：</span>{{getClassData.profession}}</li>
        <li><span>年级：</span>{{getClassData.grade}}</li>
        <li><span>宿舍号信息：</span> {{getClassData.dormitory}}</li>
        <li><span>班长：</span>{{getClassData.monitor}}</li>
        <li><span>学习委员：</span>{{getClassData.studyCommittee}}</li>
      </ul>
    </el-dialog>
    <!-- 添加班级信息弹窗 -->
    <el-dialog title="添加班级信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form ref="classInfo" :rules="rules" :model="classInfo" label-width="80px">
        <el-form-item label="班级名" prop="className">
          <el-input v-model="classInfo.className" placeholder="请输入班级名"></el-input>
        </el-form-item>
        <el-form-item label="辅导员ID" prop="userId" v-show="role === '0'">
          <el-input v-model="classInfo.userId" placeholder="请输入辅导员Id"></el-input>
        </el-form-item>
        <el-form-item label="学院" prop="department">
          <el-input v-model="classInfo.department" placeholder="请输入班级所属学院"></el-input>
        </el-form-item>
        <el-form-item label="专业" prop="profession">
          <el-input v-model="classInfo.profession" placeholder="请输入班级所属专业"></el-input>
        </el-form-item>
        <el-form-item label="年级" prop="grade">
          <el-input v-model="classInfo.grade" placeholder="请输入班级所属年级"></el-input>
        </el-form-item>
        <el-form-item label="宿舍信息" prop="dormitory">
          <el-input v-model="classInfo.dormitory" placeholder="请输入班级的宿舍信息"></el-input>
        </el-form-item>
        <el-form-item label="班长" prop="monitor">
          <el-input v-model="classInfo.monitor" placeholder="请输入班级的班长"></el-input>
        </el-form-item>
        <el-form-item label="学习委员" prop="studyCommittee">
          <el-input v-model="classInfo.studyCommittee" placeholder="请输入班级的学习委员"></el-input>
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
        <el-form-item label="班级ID" prop="classId">
          <el-input placeholder="请输入班级ID" v-model="changeInfoForm.classId">{{ changeInfoForm.classId }}</el-input>
        </el-form-item>
        <el-form-item label="班级名称" prop="className">
          <el-input placeholder="请输入班级名称" v-model="changeInfoForm.className">{{ changeInfoForm.className }}</el-input>
        </el-form-item>
        <el-form-item label="辅导员Id" prop="userId" v-show="role === '0'">
          <el-input placeholder="请输入辅导员Id" v-model="changeInfoForm.userId">{{ changeInfoForm.userId }}</el-input>
        </el-form-item>
        <el-form-item label="学院" prop="department">
          <el-input placeholder="请输入学院" v-model="changeInfoForm.department">{{ changeInfoForm.department }}</el-input>
        </el-form-item>
        <el-form-item label="专业" prop="profession">
          <el-input placeholder="请输入专业" v-model="changeInfoForm.profession">{{ changeInfoForm.profession }}</el-input>
        </el-form-item>
        <el-form-item label="年级" prop="grade">
          <el-input placeholder="请输入年级" v-model="changeInfoForm.grade">{{ changeInfoForm.grade }}</el-input>
        </el-form-item>
        <el-form-item label="宿舍号" prop="dormitory">
          <el-input placeholder="请输入宿舍号信息" v-model="changeInfoForm.dormitory">{{ changeInfoForm.dormitory }}</el-input>
        </el-form-item>
        <el-form-item label="班长" prop="monitor">
          <el-input placeholder="请输入班长姓名" v-model="changeInfoForm.monitor">{{ changeInfoForm.monitor }}</el-input>
        </el-form-item>
        <el-form-item label="学习委员" prop="studyCommittee">
          <el-input placeholder="请输入学习委员姓名" v-model="changeInfoForm.studyCommittee">{{ changeInfoForm.studyCommittee }}</el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel3">取 消</el-button>
        <el-button type="primary" @click="submitChangeInfo">提 交</el-button>
      </span>
    </el-dialog>
    <el-button @click="dialogVisible = true" type="primary" class="addButton">添加班级</el-button>
    <el-button @click="dialogVisible2 = true" type="primary" class="searchButton">查询班级</el-button>
    <div class="manage-header">

      <Tabels 
         :tableColumns="columns" 
         :tableData="tableData" 
         :operaColums="operaColums" 
         :total="total"
         :limit="pageLimit"
         :currentPage="currentPage"
         @click_1="showDetails"
         @click_2="edit"
         @click_3="handleDelete"
         @changePage="changePage"
        />
      <!-- 班级信息列表 -->
      <!-- <el-table
            :data="tableData"
            style="width: 100%"
            class="classList"
            >
            <el-table-column
              prop="classId"
              label="班级ID"
              >
            </el-table-column>
            <el-table-column
              prop="className"
              label="班级名称"
              >
            </el-table-column>
            <el-table-column
              prop="department"
              label="学院"
              >
            </el-table-column>
            <el-table-column
              prop="profession"
              label="专业"
              >
            </el-table-column>
            <el-table-column
              prop="instructor"
              label="辅导员"
              >
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                <el-button @click="showDetails(scope.row)" size="small">详情</el-button>
                <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table> -->
    </div>
  </div>
  <router-view></router-view>
</div>
</template>

<script>
import Tabels from '../../components/Tabels/index.vue'
import { columns, operaColums} from './const'
import { classList, addClass, delClass, searchClass, editClass } from './api/index'
export default {
  name: 'Cim',
  components: {
    Tabels
  },
  data() {
    return {
      role: localStorage.getItem('role'), //登录用户的身份
      // 列表配置
      currentPage: 1, // 当前页
      pageLimit: 5, // 当前页面分页数
      tableData: [] , // 数据列表
      columns: [],// 列表配置
      operaColums: [],//操作按钮配置
      total: 0, // 数据条数
      //添加班级信息
      classInfo: {
        className: '',//班级名
        department: '',//学院
        profession: '',//专业
        grade: '',//年级
        dormitory: '',//宿舍
        monitor: '',//班长
        studyCommittee: '',//学习委员
      },
      // 查询班级信息
      searchInfo: {
        classId: '', //班级Id（根据后台文档，目前只能通过Id查询，后续增添查询功能）
      },
      dialogVisible: false,
      dialogVisible2: false,
      infoVisible: false,
      rules: {
        className: [
          { required: true, message: '请输入班级名称' }
        ],
        department: [
          { required: true, message: '请输入学院名称' }
        ],
        profession: [
          { required: true, message: '请输入专业名称' }
        ],
        grade: [
          { required: true, message: '请输入年级' }
        ],
        dormitory: [
          { required: true, message: '请输入宿舍号' }
        ],
        monitor: [
          { required: true, message: '请输入班长姓名' }
        ],
        studyCommittee: [
          { required: true, message: '请输入学委姓名' }
        ],
      },
      rules2: {
        classId: [
          { required: true, message: '请输入要查询班级的ID' }
        ]
      },
      getClassData: {
        classId: '',
        className: '',
        userId: '',
        userName: '',
        department: '',
        profession: '',
        grade: '',
        dormitory: '',
        monitor: '',
        studyCommittee: ''
      },
      changeInfoShow:false,
      changeInfoForm:{},
      changRules: {
        classId: [
          { required: true, message: '请输入班级ID' }
        ],
        className: [
          { required: true, message: '请输入班级名称' }
        ],
        department: [
          { required: true, message: '请输入学院名称' }
        ],
        profession: [
          { required: true, message: '请输入专业名称' }
        ],
        grade: [
          { required: true, message: '请输入年级' }
        ],
        dormitory: [
          { required: true, message: '请输入宿舍号' }
        ],
        monitor: [
          { required: true, message: '请输入班长姓名' }
        ],
        studyCommittee: [
          { required: true, message: '请输入学委姓名' }
        ],
      }
    }
  },
  methods: {
    showDetails(row) {
      this.$store.commit('getBaseData', row)
      // this.$router.push(
      // {
      //   //添加需要传值到那个页面的路径
      //   path:'/Main/Cim/Details/Dormitory', 
      //   //携带需要传递的参数
      //   query:{baseData: row}
      // })
      this.$router.push('/Main/Cim/Details/Dormitory')
    },
    handleClose() {
      this.$refs.classInfo.resetFields()
      this.dialogVisible = false
    },
    handleClose2() {
      this.$refs.searchInfo.resetFields()
      this.dialogVisible2 = false
    },
    handleClose3() {
      this.infoVisible = false
    },
    // 修改表单关闭逻辑
    handleCloseChangeInfo(){
      this.$refs.changeInfoForm.resetFields()
      this.changeInfoShow = false
    },
    cancel() {
      this.handleClose()
    },
    cancel2() {
      this.handleClose2()
    },
    cancel3(){
      this.handleCloseChangeInfo()
    },
    submit() {
      this.$refs.classInfo.validate((valid) => {
        if (valid ) {
          // 后续对表单数据的处理
          const classInfo = {
            className: this.classInfo.className,
            userId: this.classInfo.userId,
            profession: this.classInfo.profession,
            department: this.classInfo.department,
            grade: this.classInfo.grade,
            dormitory: this.classInfo.dormitory,
            monitor: this.classInfo.monitor,
            studyCommittee: this.classInfo.studyCommittee 
          }
          addClass(classInfo).then((res) => {
            // console.log(res);
            this.$message({
                    message:res.data.msg,
                    type: 'success'
                    })
            // 重新获取列表的接口
            this.getClassList()
          })
          this.handleClose()
        }
      })
    },
    submit2() {
        this.$refs.searchInfo.validate((valid) => {
          if (valid) {
            // 后续对表单数据的处理
            const searchInfo = {
              classId: this.searchInfo.classId
            }
            searchClass(searchInfo).then((res) => {
              const { data } = res.data
              console.log(data);
              if(data === null) {
                this.$message({
                    message:'不存在该班级信息',
                    type: 'error'
                    });
                return
              }
              // 获取到班级信息后，对应填入展示卡片中
              this.getClassData = data
              // console.log(this.getClassData);

            })
            this.handleClose2()
            // 将原本隐藏的展示卡片显示出来
            if(this.getClassData !== null) {
              this.infoVisible = true
            }
          }
      })
    },
    //获取班级列表
    getClassList() {
        const params = {
          page: this.currentPage,
          pageLimit: this.pageLimit,
        }
      classList(params).then(res => {
        this.tableData = res.data.data.classes
      })
    },
    edit(value) {
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
      this.$refs.changeInfoForm.validate((valid) => {
        if (valid) {
      // console.log('修改信息提交了');
      editClass(this.changeInfoForm).then((res)=>{
        console.log(res);
        if(res.status===200){
          this.$message({
          message: '修改成功',
          type: 'success'
        })
        }
        else{
        this.$message.error('修改班级信息失败',error);
        }
        this.getClassList()
        // 重置表单
        this.$refs.changeInfoForm.resetFields()
        // 关闭弹窗
        this.changeInfoShow = false
      })
      }
    })
    },

    // 删除某条班级信息
      handleDelete(row) {
        this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).then(() => {
            delClass({ classId: row.classId}).then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              // 重新获取列表接口
              this.getClassList()
            })

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
      },
      changePage(val){
        this.currentPage=val
        this.getClassList()
      },
  },
  mounted() {
    this.getClassList()
    this.columns = columns
    this.operaColums = operaColums
  }
}
</script>

<style scoped>
.demo-form-inline {
  display: flex;
  justify-content:center;
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
.addButton{
    position: absolute;
    right: 121px;
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
</style>