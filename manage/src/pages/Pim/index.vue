<template>
  <div class="info">
    <el-dialog title="修改密码" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form :model="ruleForm" ref="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="输入旧密码" prop="oldPass">
          <el-input v-model="ruleForm.oldPass" type="password"></el-input>
        </el-form-item>
        <el-form-item label="请输入新密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="(dialogVisible = false), canale()">取 消</el-button>
        <!-- <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      </span>
    </el-dialog>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="title">个人信息</div>
        <el-button style="float: right" type="primary" @click="dialogVisible = true">修改密码</el-button>
      </div>
      <div class="text item"><span>姓名：</span>{{ info.name }}</div>
      <div class="text item"><span>身份：</span>{{ info.role }}</div>
      <div class="text item"><span>账号：</span>{{ info.phone }}</div>
    </el-card>
  </div>
</template>

<script>
import { getInfo, changePass } from "./api";
export default {
  name: "Pim",
  components: {},
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      info: {
        name: "",
        phone: "",
        role: "",
        userId: 0,
      },
      ruleForm: {
        pass: "",
        checkPass: "",
        oldPass: "",
      },
      dialogVisible: false,
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        oldPass: [{ required: true, message: "请输入旧的密码" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName]
        .validate((valid) => {
          if (valid) {
            const changePassword = {
              userId: this.info.userId,
              oldPassword: this.ruleForm.oldPass,
              password: this.ruleForm.pass,
            };

            changePass(changePassword).then((res) => {
              if (res.data.status === 0) {
                this.$message({
                  type: "success",
                  message: "修改成功!",
                });
              } else {
                this.$message({
                  type: "error",
                  message: "前方拥堵，删除失败，请稍后再试!",
                });
              }
              // console.log(res);
            });
            this.dialogVisible = false;
            this.ruleForm.pass = "";
            this.ruleForm.checkPass = "";
            this.ruleForm.oldPass = "";
          }
        })
        .catch((error) => {
          this.$message({
            type: "error",
            message: "前方拥堵，删除失败，请稍后再试!",
          });
        });
    },
    handleClose() {
      /* if (this.info ===  {
        name: "",
        phone: "",
        role: "",
        userId: 0,
      }) {
        this.$confirm("确认关闭？")
          .then((_) => {
            this.$refs.ruleForm.resetFields();
            this.dialogVisible = false;
          })
          .catch((_) => {});
      } */
      this.$refs.ruleForm.resetFields();
      this.dialogVisible = false;
    },
    canale() {
      this.handleClose();
      this.ruleForm.pass = "";
      this.ruleForm.checkPass = "";
      this.ruleForm.oldPass = "";
    },
  },
  mounted() {
    const params = localStorage.getItem("token");
    const infos = getInfo(params);
    infos.then((res) => {
      console.log(res);
      if (res.data.data.role == 0) {
        this.info.role = "管理员";
      } else if (res.data.data.role == 1) {
        this.info.role = "辅导员";
      } else if (res.data.data.role == 2) {
        this.info.role = "班主任";
      } else {
        alert("未知错误");
      }
      this.info.name = res.data.data.name;
      this.info.phone = res.data.data.phone;
      this.info.userId = res.data.data.userId;
    });
  },
};
</script>

<style scoped>
.title {
  position: absolute;
  font-size: 28px;
  font-weight: 600;
  /*     top: 42px;
    left: 399px; */
  top: -36px;
  left: 184px;
}

.text {
  font-size: 18px;
  line-height: 37px;
}

.item {
  margin-top: 10px;
  height: 37px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
  height: 293px;
}

.info {
  position: relative;
  margin-left: 300px;
  margin-top: 100px;
}
</style>