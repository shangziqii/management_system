<template>
  <div class="info">
    <el-dialog title="修改密码" :visible.sync="dialogVisible" width="25%" :before-close="handleClose">
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
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      </span>
    </el-dialog>


    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="title">个人信息</div>  
      </div>
      <div class="change-password-button">
        <el-button style="float: right" type="primary" @click="dialogVisible = true">修改密码</el-button>
      </div>
      <div class="bottom">
        <div class="person">
          <div class="text item">
            <div class="svg"><svg t="1683776386535" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3340" width="30" height="30"><path d="M513.849114 185.163163l417.004439 0c12.765745 0 25.530466 8.509814 25.530466 25.530466l0 0 0 591.464843c0 12.765745-12.765745 25.530466-25.530466 25.530466l0 0L513.849114 827.688939l0-51.061956 391.472949 0L905.322064 236.225119 513.849114 236.225119 513.849114 185.163163 513.849114 185.163163zM513.849114 644.718721l263.818571 0c12.765745 0 21.275559-8.509814 21.275559-21.275559 0-8.509814-8.509814-21.275559-21.275559-21.275559l-263.818571 0L513.849114 644.718721 513.849114 644.718721zM513.849114 517.064342l263.818571 0c12.765745 0 21.275559-8.509814 21.275559-17.020652 0-12.765745-8.509814-21.275559-21.275559-21.275559l-263.818571 0L513.849114 517.064342 513.849114 517.064342zM513.849114 393.665895l263.818571 0c12.765745 0 21.275559-8.509814 21.275559-21.275559s-8.509814-21.275559-21.275559-21.275559l-263.818571 0L513.849114 393.665895zM92.589768 185.163163l421.259346 0 0 51.061956L118.120234 236.225119l0 540.402887 395.72888 0 0 51.061956L92.589768 827.689962c-12.765745 0-25.530466-12.765745-25.530466-25.530466L67.059302 210.694653C67.058278 193.674001 79.824023 185.163163 92.589768 185.163163L92.589768 185.163163zM513.849114 351.113753 245.774613 351.113753c-12.765745 0-21.275559 8.509814-21.275559 21.275559s8.509814 21.275559 21.275559 21.275559l268.074501 0L513.849114 351.113753 513.849114 351.113753zM513.849114 478.768131 245.774613 478.768131c-12.765745 0-21.275559 8.509814-21.275559 21.275559 0 8.509814 8.509814 17.020652 21.275559 17.020652l268.074501 0L513.849114 478.768131 513.849114 478.768131zM513.849114 602.167602 245.774613 602.167602c-12.765745 0-21.275559 12.765745-21.275559 21.275559 0 12.765745 8.509814 21.275559 21.275559 21.275559l268.074501 0L513.849114 602.167602z" fill="#dbdbdb" p-id="3341"></path></svg>
            </div>
            <div style="margin-right: 40px">姓名</div>
            {{ info.name }}
            </div>
          <div class="text item">
            <div class="svg">
              <svg t="1683776965578" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6426" width="30" height="30"><path d="M109.696 624.32a32 32 0 0 1-32-32V450.304a32 32 0 0 1 64 0v142.016a32 32 0 0 1-32 32zM787.008 956.032H237.696a160.192 160.192 0 0 1-160-160v-20.672a32 32 0 0 1 64 0v20.672c0 52.928 43.072 96 96 96h549.312c52.928 0 96-43.072 96-96V604.288a32 32 0 0 1 64 0v191.68a160.192 160.192 0 0 1-160 160.064zM915.008 443.328a32 32 0 0 1-32-32V228.032c0-52.928-43.072-96-96-96H237.696c-52.928 0-96 43.072-96 96v15.232a32 32 0 0 1-64 0v-15.232c0-88.192 71.808-160 160-160h549.312c88.256 0 160 71.808 160 160v183.296a32 32 0 0 1-32 32z" fill="#cdcdcd" p-id="6427"></path><path d="M913.472 619.008c-60.544 0-109.824-49.344-109.824-109.888s49.28-109.824 109.824-109.824 109.888 49.28 109.888 109.824-49.28 109.888-109.888 109.888z m0-168.512a58.624 58.624 0 1 0 0.192 117.312 58.624 58.624 0 0 0-0.192-117.312zM185.856 379.328H34.816a32 32 0 0 1 0-64h150.976a32 32 0 0 1 0.064 64zM711.36 379.328H353.344a32 32 0 0 1 0-64h358.016a32 32 0 0 1 0 64zM711.36 553.344H353.344a32 32 0 0 1 0-64h358.016a32 32 0 0 1 0 64zM711.36 715.328H353.344a32 32 0 0 1 0-64h358.016a32 32 0 0 1 0 64zM185.856 710.336H34.816a32 32 0 0 1 0-64h150.976a32 32 0 0 1 0.064 64z" fill="#cdcdcd" p-id="6428"></path></svg>
            </div>
            <div style="margin-right: 40px">身份</div>
            {{ info.role }}
          </div>
          <div class="text item">
            <div class="svg">
              <svg t="1683777001297" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7635" width="30" height="30"><path d="M914.496 576L896 556.544V896a64 64 0 0 1-64 64H192a64 64 0 0 1-64-64V556.992L109.504 576l-44.608-46.4L128 464.832V448h16.384l327.744-336.64-1.024-1.152 44.544-46.4L881.344 448H896v15.36l63.104 66.24-44.608 46.4zM448 896h128v-187.968H448V896z m384-406.656L516.48 157.952 192 491.2V896h192v-252.032h256V896h192V489.344z" p-id="7636" fill="#dbdbdb"></path></svg>
            </div>
            <div style="margin-right: 40px">账号</div>
            {{ info.phone }}
            </div>
        </div>
        <div class="avator">
          <svg t="1683775510196" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2386" width="120" height="120"><path d="M500 128.8c-95.2 5.6-173.6 83.2-180 178.4-7.2 112 80.8 205.6 191.2 205.6 106.4 0 192-86.4 192-192 0.8-110.4-92-198.4-203.2-192zM512 575.2c-128 0-383.2 64-383.2 192v96c0 17.6 14.4 32 32 32h702.4c17.6 0 32-14.4 32-32V766.4c0-127.2-255.2-191.2-383.2-191.2z" p-id="2387" fill="#cdcdcd"></path></svg>
        </div>
      </div>
      
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
.el-dialog__body {
  padding: 30px 50px !important;
}
.clearfix{
  display: flex;
  height: 70px;
  justify-content: center;
  align-items: center;
}
.change-password-button{
  transform: translateY(-95px);
}
.title {
  flex: 10;
  text-align: center;
  font-size: 28px;
  font-weight: 600;
}
.bottom{
  display: flex;
  justify-content: space-between;
}
.person{
  transform: translateY(10px);
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
}
.avator{
  transform: translate(80px);
}
.svg{
  margin-right: 5px;
  transform: translate(-5px, -5px);
}

.text {
  display: flex;
  align-content: center;
  margin: 10px 30px;
  height: 22px;
  line-height: 22px;
  font-size: 18px;
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
  /* transform: translate(200px, 100px); */
  width: 700px;
  height: 300px;
}

.info {
  position: relative;
  margin-left: 300px;
  margin-top: 100px;
}
.info /deep/ .el-dialog__title {
  font-size: 24px;
  font-weight: bold;
}
div /deep/ .el-dialog {
  border-radius: 8px;
}
</style>