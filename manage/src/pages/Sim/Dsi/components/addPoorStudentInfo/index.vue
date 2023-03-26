<template>
    <el-dialog
        title="新增贫困生信息"
        :visible.sync="isShow"
        width="30%"
        :before-close="handleClose">
         <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="学生学号" prop="studentNum">
              <el-input type="text" v-model="ruleForm.studentNum" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="贫困等级" prop="difficultLevel" @change="changeSelectValue($event)">
               <el-select v-model="ruleForm.difficultLevel" >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="个人情况" prop="situation">
              <el-input 
              v-model="ruleForm.situation"
              type="textarea"
              placeholder="最长可输入255个字"
              maxlength="255"
              resize="none"
              >
              </el-input>
            </el-form-item>
            <el-form-item>
               <el-input
               v-model="ruleForm.remarks"
               type="textarea"
               placeholder="最长可输入255个字"
               maxlength="255"
               resize="none"
               >
               </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
</template>

<script>
import { options } from '../../const';
export default {
    name: 'addPoorStudentInfo',
    props: {
    isShow: { type:Boolean , default: () => false},
    },
    data() {
      return {
        ruleForm: {
            studentNum: '', // 学生学号
            difficultLevel: '普困', // 贫困等级
            situation: '', // 个人情况
            remarks: '', // 备注
          },
          rules: {
           studentNum: {required: true, message: '学号不能为空', trigger: 'blur' },
          },
          options: [], // 困难等级选择
        };
    },
    methods: {
      handleClose() {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.$emit('changeShow')
          })
          .catch(_ => {});
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const {studentNum ,difficultLevel, situation, remarks } = this.ruleForm;
            const params = {
              studentNum,
              difficultLevel,
              situation,
              remarks
            };
            this.$emit('submit',params);
          } else {
            this.$message({
              type: 'error',
              message: '请先完善表单必填项!',
            })
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      changeSelectValue(value) {
        console.log(value);
      }
    },
    mounted() {
      this.options = options;
    }
}
</script>