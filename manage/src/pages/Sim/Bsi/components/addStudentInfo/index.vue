<template>
  <el-dialog title="新增学生信息" :visible.sync="isShow" width="25%" :before-close="handleClose">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm addInfo">
      <el-form-item label="学生学号" prop="studentNum">
        <el-input type="text" v-model="ruleForm.studentNum" placeholder="请输入学生学号"></el-input>
      </el-form-item>
      <el-form-item label="学生姓名" prop="studentName">
        <el-input type="text" v-model="ruleForm.studentName" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input type="text" v-model="ruleForm.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="班级名称" prop="className">
        <el-input type="text" v-model="ruleForm.className" placeholder="请输入班级名称"></el-input>
      </el-form-item>
      <el-form-item label="年级" prop="grade">
        <el-input type="text" v-model="ruleForm.grade" placeholder="例如：2023届/2019级"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-input type="text" v-model="ruleForm.sex" placeholder="男/女/其他"></el-input>
      </el-form-item>
      <el-form-item label="民族" prop="nation">
        <el-input type="text" v-model="ruleForm.nation" placeholder="汉族"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'addStudentInfo',
  props: {
    isShow: { type: Boolean, default: () => false },
  },
  data() {
    return {
      ruleForm: {
        studentNum: '',//学生学号
        studentName: '',//学生姓名
        phone: '',//手机号
        className: '',// 班级名称
        grade: '',// 年级
        sex: '', //性别
        nation: '' //民族
      },
      rules: {
        studentNum: { required: true, message: '学号不能为空' },
        studentName: { required: true, message: '学生姓名不能为空' },
      },
      // recordInfo: {}
    };
  },
  methods: {
    handleClose(done) {
      // 判断表单数据是否为空
      const filled = Object.values(this.ruleForm).some(value => value !== '')
      if (filled) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.$emit('change')
            this.$refs.ruleForm.resetFields();
          })
          .catch(_ => { });
      }
      else {
        this.$emit('change')
        this.$refs.ruleForm.resetFields();
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const values = this.ruleForm;
          this.$emit('submit', values)
        } else {
          this.$message({
            type: 'error',
            message: '请完善表单数据!',
          })
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  watch: {
    /* ruleForm: {
      handler(newVal) {
        this.originData = !Object.is(this.ruleForm, JSON.parse(JSON.stringify(this.originData)));
      },
      deep: true
    } */
    /* ruleForm: {
      handler(newVal) {
        this.recordInfo={...this.ruleForm};
      },
      deep: true
    } */
  }
};
</script>
<style scoped>
.addInfo {
  height: 300px;
  overflow-y: hidden;
}
.addInfo:hover{
  overflow-y: scroll;
}
</style>