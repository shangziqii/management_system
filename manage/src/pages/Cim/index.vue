<template>
  <div>
    <div class="classManage" v-show="$route.path == '/Main/Cim'">
      <!-- 模糊搜索某班级 -->
      <div>
        <el-input v-model="findClass.className" placeholder="请输入班级名称以查询班级" class="findInput" clearable>
        </el-input>
        <el-button icon="el-icon-search" circle @click="WhichClass" class="findButton"></el-button>
      </div>
      <!-- 查询班级信息弹窗 -->
      <!-- <el-dialog title="查询班级信息" :visible.sync="dialogVisible2" width="30%" :before-close="handleClose2">
      <el-form ref="searchInfo" :rules="rules2" :model="searchInfo" label-width="80px">
        <el-form-item label="班级ID" placeholder="请输入班级ID" prop="classId">
          <el-input v-model="searchInfo.classId"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel2">取 消</el-button>
        <el-button type="primary" @click="submit2">确 定</el-button>
      </span>
    </el-dialog> -->
      <!-- 查询后展示班级信息的对话框 -->
      <!-- <el-dialog title="班级信息" :visible.sync="infoVisible" width="30%" :before-close="handleClose3">
        <ul class="classInfoShow">
          <li><span>班级ID：</span> {{ getClassData.classId }}</li>
          <li><span>班级名称：</span> {{ getClassData.className }}</li>
          <li><span>所属辅导员ID：</span> {{ getClassData.userId }}</li>
          <li><span>所属辅导员姓名：</span> {{ getClassData.userName }}</li>
          <li><span>学院:</span> {{ getClassData.department }}</li>
          <li><span>专业：</span>{{ getClassData.profession }}</li>
          <li><span>年级：</span>{{ getClassData.grade }}</li>
          <li><span>宿舍号信息：</span> {{ getClassData.dormitory }}</li>
          <li><span>班长：</span>{{ getClassData.monitor }}</li>
          <li><span>学习委员：</span>{{ getClassData.studyCommittee }}</li>
        </ul>
      </el-dialog> -->
      <!-- 添加班级信息弹窗 -->
      <el-dialog title="添加班级信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <el-form ref="classInfo" :rules="rules" :model="classInfo" label-width="80px">
          <el-form-item label="班级名" prop="className">
            <el-input v-model="classInfo.className" placeholder="请输入班级名"></el-input>
          </el-form-item>
          <el-form-item label="辅导员" prop="userName" v-show="role === '0'">
            <!-- <el-input v-model="classInfo.userId" placeholder="请输入辅导员Id"></el-input> -->
            <el-autocomplete clearable class="userInput" v-model="classInfo.userName" value-key="name"
              :fetch-suggestions="FilterUserName" :trigger-on-focus="true" placeholder="请选择辅导员" @clear="blurForBug()"
              @select="handleSelect">
            </el-autocomplete>
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
          <el-form-item label="辅导员" prop="userName" v-show="role === '0'">
            <!-- <el-input placeholder="请输入辅导员Id" v-model="changeInfoForm.userId">{{ changeInfoForm.userId }}</el-input> -->
            <el-autocomplete clearable class="userInput" v-model="changeInfoForm.userName" value-key="name"
              :fetch-suggestions="FilterUserName" :trigger-on-focus="true" placeholder="请选择辅导员" @clear="blurForBug()"
              @select="handleSelect">
            </el-autocomplete>
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
            <el-input placeholder="请输入学习委员姓名" v-model="changeInfoForm.studyCommittee">{{ changeInfoForm.studyCommittee
            }}</el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel3">取 消</el-button>
          <el-button type="primary" @click="submitChangeInfo">提 交</el-button>
        </span>
      </el-dialog>
      <el-button @click="dialogVisible = true" type="primary" class="addButton">添加班级</el-button>
      <!-- <el-button @click="dialogVisible2 = true" type="primary" class="searchButton">查询班级</el-button> -->
      <div class="manage-header">

        <Tabels :tableColumns="columns" :tableData="tableData" :operaColums="operaColums" :total="total"
          :limit="pageLimit" :currentPage="currentPage" @click_1="showDetails" @click_2="edit" @click_3="handleDelete"
          @changePage="changePage" @changeLimit="changeLimit"/>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Tabels from '../../components/Tabels/index.vue'
import { columns, operaColums } from './const'
import { classList, addClass, delClass, searchClass, editClass, simpleList } from './api/index'
export default {
  name: 'Cim',
  components: {
    Tabels
  },
  data() {
    return {
      role: localStorage.getItem('role'), //登录用户的身份
      // 辅导员信息列表
      UserIdList: [],
      // 列表配置
      currentPage: 1, // 当前页
      pageLimit: 5, // 当前页面分页数
      tableData: [], // 数据列表
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
        userName: '',
        userId: ''
      },
      originalInfo: {
        userName: ''
      }, //用于判断表单是否修改
      // 查询班级信息
      searchInfo: {
        classId: '', //班级Id（根据后台文档，目前只能通过Id查询，后续增添查询功能）
      },
      dialogVisible: false,
      dialogVisible2: false,
      // infoVisible: false,
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
      changeInfoShow: false,
      changeInfoForm: {},
      originalData: null, //用于判断表单是否修改
      isFormInitialized: false, // 默认表单未初始化
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
      },
      // 搜索某班级名称
      findClass: {
        className: ''
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
      if (this.isInfoChanged) { // 如果修改过，就弹窗提示
        this.$confirm('表单已更改，确认关闭？')
        .then(_ => {
          this.$refs.classInfo.resetFields()
          this.dialogVisible = false
        })
        .catch(_ => { });
      } else {
        this.$refs.classInfo.resetFields()
        this.dialogVisible = false
      }
    },
    // handleClose2() {
    //   this.$refs.searchInfo.resetFields()
    //   this.dialogVisible2 = false
    // },
    // handleClose3() {
    //   this.infoVisible = false
    // },
    // 修改表单关闭逻辑
    handleCloseChangeInfo() {
      if (this.isDataChanged) { // 如果修改过，就弹窗提示
        this.$confirm('表单已更改，确认关闭？')
        .then(_ => {
          this.$refs.changeInfoForm.resetFields()
          this.changeInfoForm.name = ''
          this.changeInfoShow = false
        })
        .catch(_ => { });
      } else {
        this.$refs.changeInfoForm.resetFields()
        this.changeInfoShow = false
      }
    },
    cancel() {
      this.handleClose()
    },
    cancel2() {
      this.handleClose2()
    },
    cancel3() {
      this.handleCloseChangeInfo()
    },
    submit() {
      this.$refs.classInfo.validate((valid) => {
        if (valid) {
          // 后续对表单数据的处理
          const classInfo = {
            className: this.classInfo.className,
            profession: this.classInfo.profession,
            department: this.classInfo.department,
            grade: this.classInfo.grade,
            dormitory: this.classInfo.dormitory,
            monitor: this.classInfo.monitor,
            studyCommittee: this.classInfo.studyCommittee,
            userName: this.classInfo.userName,
            userId: this.classInfo.userId
          }
          // console.log(classInfo);
          addClass(classInfo).then((res) => {
            // console.log(res);
            if (res.data.msg === '权限不足') {
              this.$message({
                type: 'error',
                message: res.data.msg
              });
            } else {
              this.$message({
                message: res.data.msg,
                type: 'success'
              })
            }

            // 重新获取列表的接口
            this.getClassList()
          })
          this.$refs.classInfo.resetFields()
          this.dialogVisible = false

        }
      })
    },
    changeLimit(val) {
      this.pageLimit = val;
      this.getClassList();
    },
    changePage(val) {
      this.currentPage = val;
      this.getClassList();
    },
    // submit2() {
    //   this.$refs.searchInfo.validate((valid) => {
    //     if (valid) {
    //       // 后续对表单数据的处理
    //       const searchInfo = {
    //         classId: this.searchInfo.classId
    //       }
    //       searchClass(searchInfo).then((res) => {
    //         const { data } = res.data
    //         console.log(data);
    //         if (data === null) {
    //           this.$message({
    //             message: '不存在该班级信息',
    //             type: 'error'
    //           });
    //           return
    //         }
    //         // 获取到班级信息后，对应填入展示卡片中
    //         this.getClassData = data
    //         // console.log(this.getClassData);

    //       })
    //       this.handleClose2()
    //       // 将原本隐藏的展示卡片显示出来
    //       if (this.getClassData !== null) {
    //         this.infoVisible = true
    //       }
    //     }
    //   })
    // },
    //获取班级列表
    getClassList() {
      const params = {
        page: this.currentPage,
        pageLimit: this.pageLimit,
      }
      classList(params).then(res => {
        // console.log(res.data);
        this.total=res.data.data.sum
        this.tableData = res.data.data.classes
      })
    },
    // 搜索查询班级列表
    WhichClass() {
      const params = {
        page: this.currentPage,
        pageLimit: this.pageLimit,
        searchClassName: this.findClass.className
      }
      classList(params).then(res => {
        // console.log(res.data);
        this.tableData = res.data.data.classes
      })
    },
    edit(value) {
      // console.log(value);
      this.isFormInitialized = true // 初始化表单
      this.originalData = { ...value }; // 存储原始数据
      this.changeInfoShow = true
      this.changeInfoForm = value
    },
    //修改信息提交按钮
    submitChangeInfo() {
      this.$refs.changeInfoForm.validate((valid) => {
        if (valid) {
          // console.log('修改信息提交了');
          editClass(this.changeInfoForm).then((res) => {
            console.log(res);
            if (res.status === 200) {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
            }
            else {
              this.$message.error('修改班级信息失败', error);
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
        delClass({ classId: row.classId }).then(res => {
          if (res.data.msg === '该班级不存在，或权限不足') {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          } else {
            this.$message({
              type: 'success',
              message: res.data.msg
            });
          }

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
    changePage(val) {
      this.currentPage = val
      this.getClassList()
    },
    getSimpleList() {
      simpleList().then(res => {
        console.log(res.data.data);
        if (res.status === 200) {
          this.UserList = res.data.data
        }
      })
    },
    // 辅导员信息列表
    FilterUserName(queryString, cb) {
      if(queryString == '') {
        var results = queryString
        cb(results)
        return
      } else {
        var UserList2 = this.UserList;
        var results = queryString
          ? UserList2.filter(this.createFilter(queryString))
          : UserList2;
        // 调用 callback 返回建议列表的数据
        cb(results);
      }

    },
    // 只要该输入内容的都匹配
    createFilter(queryString) {
      return (res) => {
        return (res.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    // 最终选择的数据
    handleSelect(val) {
      this.classInfo.userName = val.name 
      this.classInfo.userId = val.userId
    },
    // 点击clearable清空小图标按钮以后，继续重新在输入框中输入数据，querySearch会触发，但是cb函数不会触发
    // 这样的话就会出现发请求了，也获取数据了，但是input框的输入建议下拉框不呈现在页面上的问题，所以解决方法就是
    // 只要用户点击了clearable清空按钮以后，就让当前获取焦点的输入框失去焦点，回到最初状态，一切重新开始
    blurForBug() {
      document.activeElement.blur()
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
      return JSON.stringify(this.classInfo) !== JSON.stringify(this.originalInfo);
    },
    
  },
  mounted() {
    this.getSimpleList()
    this.getClassList()
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
.userInput {
  /* width: 450.89px; */
  width: 100%;
}
</style>