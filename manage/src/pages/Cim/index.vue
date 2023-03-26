<template>
  <div class="classManage">
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
    <!-- 查询后展示班级信息的卡片 -->
    <el-card class="box-card" ref="infoCard">
      <div slot="header" class="clearfix">
        <span>班级信息</span>
        <el-button style="float: right; padding: 3px 0" type="text">编辑</el-button>
      </div>
      <ul class="classInfoShow">
        <li>班级Id: {{getClassData.classId}}</li>
        <li>班级名称: {{getClassData.className}}</li>
        <li>所属辅导员ID: {{getClassData.userId}}</li>
        <li>所属辅导员姓名: {{getClassData.userName}}</li>
        <li>学院: {{getClassData.department}}</li>
        <li>专业：{{getClassData.profession}}</li>
        <li>年级：{{getClassData.grade}}</li>
        <li>宿舍号信息: {{getClassData.domitory}}</li>
        <li>班长：{{getClassData.monitor}}</li>
        <li>学习委员：{{getClassData.studyCommittee}}</li>
      </ul>
    </el-card>
    <!-- 添加班级信息弹窗 -->
    <el-dialog title="添加班级信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form ref="classInfo" :rules="rules" :model="classInfo" label-width="80px">
        <el-form-item label="班级名" placeholder="请输入班级名" prop="className">
          <el-input v-model="classInfo.className"></el-input>
        </el-form-item>
        <el-form-item label="学院" placeholder="请输入班级所属学院" prop="department">
          <el-input v-model="classInfo.department"></el-input>
        </el-form-item>
        <el-form-item label="专业" placeholder="请输入班级所属专业" prop="profession">
          <el-input v-model="classInfo.profession"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button @click="dialogVisible = true" type="primary" class="addButton">添加班级</el-button>
      <el-button @click="dialogVisible2 = true" type="primary" class="searchButton">查询班级</el-button>
      <!-- 班级信息列表 -->
      <el-table
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
        </el-table>
    </div>
    
  </div>
</template>

<script>
import { classList, addClass, delClass, searchClass } from './api/index'
export default {
  name: 'Cim',
  data() {
    return {
      //添加班级信息
      classInfo: {
        className: '',//班级名
        department: '',//学院
        profession: ''//专业
      },
      // 查询班级信息
      searchInfo: {
        classId: '', //班级Id（根据后台文档，目前只能通过Id查询，后续增添查询功能）
      },
      // tableData:[]
      //暂时用写好数据进行替代
      tableData: [],
      dialogVisible: false,
      dialogVisible2: false,
      rules: {
        className: [
          { required: true, message: '请输入班级名称' }
        ],
        profession: [
          { required: true, message: '请输入所属专业' }
        ],
        department: [
          { required: true, message: '请输入所属学院' }
        ]
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
        domitory: '',
        monitor: '',
        studyCommittee: ''
      }
    }
  },
  methods: {
    showDetails(row) {
      console.log(row);
      // 这块路由跳转有问题
      this.$router.push('/Main/Cim/Details')
    },
    handleClose() {
      this.$refs.classInfo.resetFields()
      this.dialogVisible = false
    },
    handleClose2() {
      this.$refs.searchInfo.resetFields()
      this.dialogVisible2 = false
    },
    cancel() {
      this.handleClose()
    },
    cancel2() {
      this.handleClose2()
    },
    submit() {
      this.$refs.classInfo.validate((valid) => {
        if (valid && localStorage.getItem('role') === '1') {
          // 后续对表单数据的处理
          const classInfo = {
            className: this.classInfo.className,
            profession: this.classInfo.profession,
            department: this.classInfo.department
          }
          addClass(classInfo).then((res) => {
            // alert(res.data.msg);
            this.$message({
                    message:res.data.msg,
                    type: 'success'
                    });
            // 重新获取列表的接口
            this.getClassList()
          })
          this.handleClose()
        } else {
          alert('只有辅导员可以增删班级')
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
              // 获取到班级信息后，对应填入展示卡片中
              this.getClassData = data
              console.log(this.getClassData);

            })
            this.handleClose2()
            // 将原本隐藏的展示卡片显示出来
            this.$refs.infoCard.style = 'display:block'
          }
      })
    },
    //获取班级列表
    getClassList() {
      /*         let data={
                page:1,
                pageLimit:20
              } */
      classList().then(res => {
        this.tableData = res.data.data.classes
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
  },
  mounted() {
    this.getClassList()
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
.addButton {
  position: absolute;
  left: 210px;
}
.searchButton {
  position: absolute;
  right: 0px;
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

.box-card {
  width: 480px;
  display: none;
  position: absolute;
  top: 30px;
}
.classInfoShow {
  list-style: none;
}
</style>