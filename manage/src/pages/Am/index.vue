<template>
  <div class="manage">
    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="25%" :before-close="handleClose">
      <!-- 账户人员的表单信息（新增按钮展开） -->
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input placeholder="请输入密码" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input placeholder="请输入电话号码" v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="身份" prop="role" v-show="roleShow === 1">
          <el-input v-model="form.role" disabled></el-input>
        </el-form-item>
        <el-form-item label="身份" prop="role" v-show="roleShow === 0">
          <el-select placeholder="请选择身份" v-model="form.role" class="commonWidth">
            <el-option label="管理员" value='0'></el-option>
            <el-option label="辅导员" value='1'></el-option>
            <!-- <el-option label="班主任" value='2'></el-option> -->
          </el-select>
        </el-form-item>
        <!-- 无管理班级选项 -->
        <!--  <el-form-item label="管理班级" prop="className">
          <el-input placeholder="请输入管理的班级" v-model="form.className"></el-input>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <el-button @click="dialogVisible = true" type="primary" class="addButton">
      + 新增
    </el-button>
    <div class="manage-header">
      <Tabels :tableColumns="columns" :tableData="tableData" :operaColums="operaColums" :total="total" :limit="pageLimit"
        :currentPage="currentPage" @click_1="handleDelete" @changeLimit="changeLimit" @changePage="changePage" class="tabel"/>
    </div>
  </div>
</template>

<script>
import Tabels from '../../components/Tabels/index.vue'
import { columns, operaColums } from './const'
import { getList, addUser, delUser } from './api'
export default {
  name: 'Am',
  components: {
    Tabels
  },
  data() {
    return {
      // 列表配置
      currentPage: 1, // 当前页
      pageLimit: 5, // 当前页面分页数
      tableData: [], // 数据列表
      columns: [],// 列表配置
      operaColums: [],//操作按钮配置
      total: 0, // 数据条数
      dialogVisible: false,
      form: {
        name: '',
        password: '',
        phone: '',
        role: '请选择身份',
        className: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名' }
        ],
        password: [
          { required: true, message: '请输入密码' }
        ],
        phone: [
          { required: true, message: '请输入电话号码' }
        ],
        role: [
          { required: true, message: '请选择身份' }
        ],
      },
      tableData: []
    }
  },
  methods: {
    // 提交用户表单
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.form.role === '班主任') {
            this.form.role = '2'
          }
          // 后续对表单数据的处理
          const form = {
            name: this.form.name,
            password: this.form.password,
            role: Number(this.form.role),
            phone: this.form.phone
          }
          addUser(form).then((res) => {
            if (res.data.status === 0) {
              console.log('添加成功');
              this.$message({
                message: '添加成功',
                type: 'success'
              })
            }
            else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              })
              // alert('添加失败', res.data.msg)
            }
            this.userList()
          })
          // console.log(this.form, 'form');
          // 重置表单
          this.$refs.form.resetFields()
          // 关闭弹窗
          this.dialogVisible = false
        }
      })
    },
    // 弹窗关闭时重置表单
    handleClose() {
      const filled = Object.entries(this.form).filter(([key, value]) => key !== 'role').some(([key, value]) => value !== '');
      if (filled) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.$refs.form.resetFields()
            this.dialogVisible = false
          })
          .catch(_ => { });
      }
      else {
        this.$refs.form.resetFields()
        this.dialogVisible = false
      }
    },
    cancel() {
      this.handleClose()
    },
    // 删除某条用户信息
    handleDelete(row) {
      // console.log(row);
      this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delUser({ userId: row.userId }).then(res => {
          console.log(res);
          if (res.data.msg === '信息修改成功') {
            this.$message({
              type: 'success',
              message: res.data.msg
            })
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }

          // 重新获取列表接口
          this.userList()
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 获取列表数据
    userList() {
      const params = {
        page: this.currentPage,
        pageLimit: this.pageLimit,
      }
      getList(params).then(({ data }) => {
        const users = data.data.users;
        console.log(users);
        for (let i = 0; i < users.length; i++) {
          console.log(users[i].role);
          if (users[i].role === 0) {
            users[i].role = '管理员'
          }
          else if (users[i].role === 1) {
            users[i].role = '辅导员'
          }
          else {
            users[i].role = '班主任'
          }
        }
        console.log(users);
        this.tableData = users
        this.total = data.data.sum
      })
    },
    changeLimit(val) {
      this.pageLimit = val;
      this.userList();
    },
    changePage(val) {
      this.currentPage = val
      this.userList()
    },
  },
  mounted() {
    // 获取用户列表数据
    this.userList()
    this.columns = columns
    this.operaColums = operaColums

    // 当 roleShow 等于 0 时，将 this.form.role 的初始值设置为 '请选择身份'
    if (this.roleShow === 0) {
      this.form.role = '请选择身份';
    }

    // 当 roleShow 等于 1 时，将 this.form.role 的初始值设置为 '班主任'
    if (this.roleShow === 1) {
      this.form.role = '班主任';
    }

  },
  computed: {
    //接收vuex中获取的权限状态，来进行条件禁用侧边栏的项目
    roleShow() {
      return this.$store.state.showNav.permission
    }
  }
}
</script>

<style scoped>
.demo-form-inline {
  display: flex;
  justify-content: center;
}

/* .el-input {
  width: 387px;
} */
.addButton {
  position: absolute;
  /* left: 210px; */
  z-index: 999;
  transform: translateY(80px);
  right: 50px;
  top: 70px;
}

.manage .el-dialog {
  border-radius: 8px;
}

.userList {
  top: 45px;
}

.manage-header {
  /* margin-top: 52px; */
}

.manage /deep/ .el-dialog__title {
  font-size: 24px;
  font-weight: bold;
}

div /deep/ .el-dialog {
  border-radius: 8px;
}
.commonWidth{
  width: 100%;
}
</style>