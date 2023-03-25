<template>
    <div class="manage">
      <el-dialog
      title="添加用户"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
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
        <el-form-item label="身份" prop="role">
          <el-select placeholder="请选择身份" v-model="form.role">
            <el-option label="管理员" value="管理员"></el-option>
            <el-option label="辅导员" value="辅导员"></el-option>
            <el-option label="班主任" value="班主任"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="管理班级" prop="className">
          <el-input placeholder="请输入管理的班级" v-model="form.className"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
      </el-dialog>
      <div class="manege-header">
          <el-button @click="dialogVisible = true" type="primary" class="addButton">
              + 新增
          </el-button>
          <!-- 用户信息列表 -->
          <el-table
            :data="tableData"
            style="width: 100%"
            class="userList"
            >
            <el-table-column
              prop="userId"
              label="用户ID"
              >
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              >
            </el-table-column>
            <el-table-column
              prop="phone"
              label="电话号码"
              >
            </el-table-column>
            <el-table-column
              prop="role"
              label="身份"
              >
              <!-- 作用域插槽 -->
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{scope.row.role}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="classList"
              label="管理班级"
              >
            </el-table-column>
            <el-table-column
              prop="classList"
              label="管理班级"
              >
              <!-- 作用域插槽 -->
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
      </div>
    </div>
</template>

<script>
import { getList,addUser,delUser } from '../api/index'
export default {
    data() {
      return {
        dialogVisible: false,
        form: {
          name: '',
          password: '',
          phone: '',
          role: '',
          className: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入姓名'}
          ],
          password: [
            {required: true, message: '请输入密码'}
          ],
          phone: [
            {required: true, message: '请输入电话号码'}
          ],
          role: [
            {required: true, message: '请选择身份'}
          ],
        },
        tableData: []
      }
    },
    methods: {
      // 提交用户表单
      submit() {
        this.$refs.form.validate((valid) => {
          if(valid) {
            // 后续对表单数据的处理
            // addUser(this.form).then((res) => {
            //   console.log(res);
            //   // 重新获取列表的接口
            //   this.userList()
            // })
            console.log(this.form, 'form');
            // 重置表单
            this.$refs.form.resetFields()
            // 关闭弹窗
            this.dialogVisible = false

          }
        })
      },
      // 弹窗关闭时重置表单
      handleClose() {
        this.$refs.form.resetFields()
        this.dialogVisible = false

      },
      cancel() {
        this.handleClose()
      },
      // 删除某条用户信息
      handleDelete(row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).then(() => {
            delUser({ userId: row.userId}).then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
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
        getList().then(({ data }) => {
        // console.log(data.data);
        this.tableData = data.data.users
      })
      }
    },
    mounted() {
      // 获取用户列表数据
      this.userList()
    },
}
</script>

<style>
.demo-form-inline {
  display: flex;
  justify-content:center;
}
.el-input {
  width: 387px;
}
.addButton {
  position: absolute;
  left: 210px;
}
.el-dialog {
  border-radius: 8px;
}
.userList {
  top: 45px;
}
</style>