<template>
  <div>
    <div class="classManage">
      <!-- 模糊搜索某记录 -->
      <!-- <div>
        <el-input v-model="findClass.className" placeholder="请输入班级名称以查询班级" class="findInput">
        </el-input>
        <el-button icon="el-icon-search" circle  @click="WhichClass" class="findButton"></el-button>
      </div> -->
      <!-- 添加助学金信息弹窗 -->
      <el-dialog title="添加助学金信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <el-form ref="subInfo" :rules="rules" :model="subInfo" label-width="80px">
          <el-form-item label="专业" prop="major">
            <el-input v-model="subInfo.major" placeholder="请输入专业名称"></el-input>
          </el-form-item>
          <el-form-item label="年级" prop="grade">
            <el-input v-model="subInfo.grade" placeholder="请输入所属年级"></el-input>
          </el-form-item>
          <el-form-item label="时间范围" prop="subsidiesTime">
            <el-input v-model="subInfo.subsidiesTime" placeholder="请输入评定的时间范围"></el-input>
          </el-form-item>
          <el-form-item label="评定阶段" prop="status">
            <el-input v-model="subInfo.status" placeholder="请输入当前评定阶段"></el-input>
          </el-form-item>
          <el-form-item label="文件URL" prop="files">
            <el-input placeholder="请输入要上传文件的URL" v-model="subInfo.files" :disabled="true"></el-input>
            <!-- 上传相关文件 -->
            <div>
              <input type="file" ref="fileInput" @change="uploadFile">
            </div>
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
          <el-form-item label="专业" prop="major">
            <el-input placeholder="请输入专业名称" v-model="changeInfoForm.major">{{ changeInfoForm.major }}</el-input>
          </el-form-item>
          <el-form-item label="年级" prop="grade">
            <el-input placeholder="请输入所属年级" v-model="changeInfoForm.grade">{{ changeInfoForm.grade }}</el-input>
          </el-form-item>
          <el-form-item label="时间范围" prop="subsidiesTime">
            <el-input placeholder="请输入评定的时间范围" v-model="changeInfoForm.subsidiesTime">{{ changeInfoForm.subsidiesTime }}</el-input>
          </el-form-item>
          <el-form-item label="评定阶段" prop="status">
            <el-input placeholder="请输入当前评定阶段" v-model="changeInfoForm.status">{{ changeInfoForm.status }}</el-input>
          </el-form-item>
          <el-form-item label="上传文件" prop="files">
            <!-- <el-input placeholder="请上传文件" v-model="changeInfoForm.files"></el-input> -->
            <el-input placeholder="请选择相关文件" v-model="changeInfoForm.files" :disabled="true"></el-input>
              <!-- 上传相关文件 -->
            <div>
              <input type="file" ref="fileInput" @change="uploadFile2">
            </div>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel3">取 消</el-button>
          <el-button type="primary" @click="submitChangeInfo">提 交</el-button>
        </span>
      </el-dialog>
      <!-- 只能由辅导员(role = 1)增删 -->
      <el-button @click="dialogVisible = true" type="primary" class="addButton" v-show="role === '1'">添加记录</el-button>
      <!-- <el-button @click="dialogVisible2 = true" type="primary" class="searchButton">查询班级</el-button> -->
      <div class="manage-header">
  
        <Tabels 
           :tableColumns="columns" 
           :tableData="tableData" 
           :operaColums="operaColums" 
           :total="total"
           :limit="pageLimit"
           :currentPage="currentPage"
           @click_1="edit"
           @click_2="handleDelete"
           @changePage="changePage"
          />
      </div>
    </div>
  </div>
  </template>
  
  <script>
  import Tabels from '../../components/Tabels/index.vue'
  import { columns, operaColums} from './const'
  import { subsList, addSub, delSub, editSub, uploadFiles } from './api/index'
  export default {
    name: 'Gar',
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
        subInfo: {
          major: '', //专业
          grade: '', //年级
          subsidiesTime: '', //评定的时间范围
          status: '', //当前评定阶段
          files: '', //文件
        },
        // 查询班级信息
        searchInfo: {
          classId: '', //班级Id（根据后台文档，目前只能通过Id查询，后续增添查询功能）
        },
        dialogVisible: false,
        dialogVisible2: false,
        infoVisible: false,
        rules: {
          major: [
            { required: true, message: '请输入专业名称' }
          ],
          grade: [
            { required: true, message: '请输入所属年级' }
          ],
          subsidiesTime: [
            { required: true, message: '请输入评定的时间范围' }
          ],
          status: [
            { required: true, message: '请输入当前评定阶段' }
          ],
        },
        rules2: {
          classId: [
            { required: true, message: '请输入要查询班级的ID' }
          ]
        },
        changeInfoShow:false,
        changeInfoForm:{
          files:''
        },
        changRules: {
          major: [
            { required: true, message: '请输入专业名称' }
          ],
          grade: [
            { required: true, message: '请输入所属年级' }
          ],
          subsidiesTime: [
            { required: true, message: '请输入评定的时间范围' }
          ],
          status: [
            { required: true, message: '请输入当前评定阶段' }
          ],
        },
        // 搜索某班级名称
        // findClass: {
        //   className: ''
        // }
      }
    },
    methods: {
      handleClose() {
        this.$refs.subInfo.resetFields()
        this.dialogVisible = false
      },
      // 修改表单关闭逻辑
      handleCloseChangeInfo(){
        this.$refs.changeInfoForm.resetFields()
        this.changeInfoShow = false
      },
      cancel() {
        this.handleClose()
      },
      cancel3(){
        this.handleCloseChangeInfo()
      },
      submit() {
        this.$refs.subInfo.validate((valid) => {
          if (valid ) {
            addSub(this.subInfo).then((res) => {
              console.log(res.data);
              if(res.data.msg === '添加成功') {
                this.$message({
                  type: 'success',
                  message: res.data.msg
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '添加失败'
                })
              }
              // 重新获取列表的接口
              this.getSubsList()
            })
            this.handleClose()
          }
        })
      },
      //获取助学金列表
      getSubsList() {
          const params = {
            page: this.currentPage,
            pageLimit: this.pageLimit,
          }
          subsList(params).then(res => {
          // console.log(res.data);
          this.tableData = res.data.data.studentSubsidies
        })
      },
      // 搜索查询班级列表
      // WhichClass() {
      //   const params = {
      //     page: this.currentPage,
      //     pageLimit: this.pageLimit,
      //     searchClassName: this.findClass.className
      //   }
      //   classList(params).then(res => {
      //     // console.log(res.data);
      //     this.tableData = res.data.data.classes
      //   })
      // },
      edit(value) {
        this.changeInfoShow = true
        this.changeInfoForm=value
      },
      //修改信息提交按钮
      submitChangeInfo(){
        this.$refs.changeInfoForm.validate((valid) => {
          if (valid) {
        // console.log('修改信息提交了');
        editSub(this.changeInfoForm).then((res)=>{
          // console.log(res);
          if(res.status===200){
            this.$message({
            message: '修改成功',
            type: 'success'
          })
          }
          else{
          this.$message.error('修改助学金信息失败',error);
          }
          this.getSubsList()
          // 重置表单
          this.$refs.changeInfoForm.resetFields()
          // 关闭弹窗
          this.changeInfoShow = false
        })
        }
      })
      },
      //上传相关文件
      uploadFile() {
        const file = this.$refs.fileInput.files[0];
        const formData = new FormData();
        formData.append('uploadFile', file);
        uploadFiles(formData).then((res) => {
          this.subInfo.files = res.data.data
        }).catch((error) => {
          console.error(error);
        })
      },
      //修改信息页面的上传相关文件
      uploadFile2() {
        const file = this.$refs.fileInput.files[0];
        const formData = new FormData();
        formData.append('uploadFile', file);
        uploadFiles(formData).then((res) => {
          this.changeInfoForm.files = res.data.data
        }).catch((error) => {
          console.error(error);
        })
      },
      // 删除某条班级信息
        handleDelete(row) {
          if(this.role === '1') {
            this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
              delSub({ studentSubsidiesId: row.studentSubsidiesId}).then(res => {
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                })
                
                // 重新获取列表接口
                this.getSubsList()
              })
  
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });          
            });
          } else {
            this.$message({
              message: '只有辅导员可以删除',
              type: 'warning'
            })
          }
          
        },
        changePage(val){
          this.currentPage=val
          this.getSubsList()
        },
    },
    mounted() {
      // this.getSimpleList()
      this.getSubsList()
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
  </style>