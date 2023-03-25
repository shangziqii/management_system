<template>
  <div>
    <el-button @click="dialogVisible = true" type="primary">添加班级</el-button>
    <!-- 添加用户信息弹窗 -->
    <el-dialog title="添加班级信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form ref="classInfo" :rules="rules" :model="classInfo" label-width="80px">
        <el-form-item label="班级名" placeholder="请输入班级名" prop="className">
          <el-input v-model="classInfo.className"></el-input>
        </el-form-item>
        <el-form-item label="学院" placeholder="请输入班级所属学院" prop="college">
          <el-input v-model="classInfo.college"></el-input>
        </el-form-item>
        <el-form-item label="专业" placeholder="请输入班级所属专业" prop="major">
          <el-input v-model="classInfo.major"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <el-table :data="tableData" style="width: 60%">
      <el-table-column fixed prop="classID" label="班级ID">
      </el-table-column>
      <el-table-column prop="className" label="班级名称">
      </el-table-column>
      <el-table-column prop="college" label="学院">
      </el-table-column>
      <el-table-column prop="major" label="专业">
      </el-table-column>
      <el-table-column prop="instructor" label="辅导员">
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small" @click="deleteClassInfo">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { classList, addClass } from './../api'
export default {
  name: 'Cim',
  data() {
    return {
      //添加班级信息
      classInfo: {
        className: '',//班级名
        college: '',//学院
        major: ''//专业
      },
      // tableData:[]
      //暂时用写好数据进行替代
      tableData: [{
        instructor: 'ww',
        major: '计科',
        college: '计算机',
        className: '2105',
        classID: '1'
      },
      ],
      dialogVisible: false,
      rules: {
        className: [
          { required: true, message: '请输入班级名称' }
        ],
        major: [
          { required: true, message: '请输入所属专业' }
        ],
        college: [
          { required: true, message: '请输入所属学院' }
        ]
      }
    }
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    handleClose() {
      this.$refs.classInfo.resetFields()
      this.dialogVisible = false
    },
    cancel() {
      console.log('hello');
      this.handleClose()
    },
    submit() {
      this.$refs.classInfo.validate((valid) => {
        if (valid) {
          // 后续对表单数据的处理
          const classInfo = {
            className: this.classInfo.className,
            major: this.classInfo.major,
            college: this.classInfo.college
          }
          addClass(classInfo).then((res) => {
            alert(res.data.msg);
            // 重新获取列表的接口
            this.getClassList()
          })
          // 重置表单
          this.$refs.classInfo.resetFields()
          // 关闭弹窗
          this.dialogVisible = false
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
        console.log(res.data);
      })
    },

    //添加班级信息
    addClassInfo() {
      addClass().then(res => {
        console.log(res.data);
      })
    },
    //删除班级信息
    deleteClassInfo() {

    }
  },
  mounted() {
    this.getClassList()
  }
}
</script>

<style>
.el-table-column {
  display: flex;
}

.el-table {
  margin-left: 150px;
}
</style>