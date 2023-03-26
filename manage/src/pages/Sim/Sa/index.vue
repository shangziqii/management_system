  <template>
      <div>
        <!-- 搜索学生 -->
        <el-dropdown>
          <span class="el-dropdown-link">
            选择搜索条件<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="selectStudentNum">学生学号搜索</el-dropdown-item>
            <el-dropdown-item @click.native="selectPizeid">pizeid搜索</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div v-show="showNum">
          <el-input v-model="search.studentNum" class="searchInput" placeholder="请输入学生学号">
          </el-input>
          <el-button icon="el-icon-search" circle class="search" @click="searchStudentNum"></el-button>
        </div>
        <div v-show="showPizeid">
          <el-input v-model="search.studentNum" placeholder="请输入pizeid" class="searchInput">
          </el-input>
          <el-button icon="el-icon-search" circle class="search" @click="searchPizeId"></el-button>
        </div>
        <el-button type="primary" class="addInfo" @click="dialogVisible = true">添加信息</el-button>
        <!-- 点击按钮弹出表单添加信息 -->
        <el-dialog title="添加信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
          <el-form ref="form" :rules="rules" :model="form" label-width="80px">
            <el-form-item label="学号" prop="studentNum">
              <el-input placeholder="请输入学号" v-model="form.studentNum"></el-input>
            </el-form-item>
            <el-form-item label="奖项名称" prop="prizeName">
              <el-input placeholder="请输入奖项名称" v-model="form.prizeName"></el-input>
            </el-form-item>
            <el-form-item label="奖项等级" prop="prizeLevel">
              <el-input placeholder="请输入奖项等级" v-model="form.prizeLevel"></el-input>
            </el-form-item>
            <el-form-item label="获奖时间" prop="prizeTime">
              <!-- <el-input placeholder="请输入获奖时间" v-model="form.prizeTime"></el-input> -->
              <el-date-picker v-model="form.prizeTime" type="date" placeholder="请选择获奖时间" format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="指导老师" prop="teacher">
              <el-input placeholder="请输入指导老师" v-model="form.teacher"></el-input>
            </el-form-item>
            <el-form-item label="奖状电子版" prop="files">
              <el-input placeholder="请输入奖状电子版" v-model="form.files"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="submit">提 交</el-button>
          </span>
        </el-dialog>
        <el-table :data="tableData" style="height: 300px">
          <!-- style="width: 100%" -->
          <el-table-column fixed prop="studentNum" label="学号" width="150">
          </el-table-column>
          <el-table-column prop="prizeName" label="奖项名称" width="120">
          </el-table-column>
          <el-table-column prop="prizeLevel" label="奖项等级" width="120">
          </el-table-column>
          <el-table-column prop="prizeTime" label="获奖时间" width="120">
          </el-table-column>
          <el-table-column prop="teacher" label="指导老师" width="300">
          </el-table-column>
          <el-table-column prop="files" label="奖状电子版" width="120">
            <template slot-scope="scope">
              <img :src="scope.row.files" min-width="70" height="70">
            </template>
          </el-table-column>
        </el-table>
      </div>
  </template>
  
  <script>
  import { winnerList, addWinner } from './api'
  export default {
    name: 'Sa',
      data(){
        return {
          form: {},
        tableData: [
           /*              {
                    studentNum: '04211181',
                    prizeName: '00000000',
                    prizeLevel: '一等',
                    prizeTime: '2023-3-26',
                    files: 'https://img.tukuppt.com/ad_preview/00/06/94/5c98fb55d75e5.jpg!/fw/980',
                    teacher: '李华'
                  }  */
        ],
        dialogVisible: false,
        search:{
          studentNum:''
        }, 
        showNum:true,
        showPizeid:false,
        rules: {
          studentNum: [
            { required: true, message: '请输入学生学号' }
        ],
          prizeName: [
            { required: true, message: '请输入获奖名称' }
          ],
          prizeLevel: [
        { required: true, message: '请输入获奖等级' }
          ],
          prizeTime: [
            { required: false}
          ],
      files: [
            { required: false}
          ],
          teacher: [
            { required: false }
      ],
        }
      }
    },
    methods: {
      geWinnerList() {
      winnerList().then((res) => {
          console.log("获取学生信息到this.tableData中，但是暂无信息");
          console.log(res.data.data.prizeStudents);
          //这条注释是将获取到的学生获奖情况给到tableData
            this.tableData = res.data.data.prizeStudents
        }).catch((error)=>{
          this.$message.error('拉取列表错误',error);
      })
      },
      // 提交用户表单
      submit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            addWinner(this.form).then((res) => {
            console.log(res);
              if(res.status===200)
          {
            console.log('添加成功');
            this.$message({
            message: '添加成功',
            type: 'success'
          });

          }
          else{
            alert('添加失败',res.data.msg)
          }
              // 重新获取列表的接口
              this.geWinnerList()
            })
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
      selectStudentNum(){
        console.log('选择学生信息');
        this.showNum=true
        this.showPizeid=false
      },
      selectPizeid(){
        console.log('选择获奖id进行搜索');
        this.showPizeid=true
        this.showNum=false
      },
      //使用学生学号进行搜索
      searchStudentNum(){
  console.log("使用学生学号进行搜索");
      },
      //使用获奖id进行搜索
      searchPizeId(){
  console.log("使用获奖id进行搜索");
      }
    },
    mounted() {
      this.geWinnerList()
        }
      }
  </script>
  
  <style scoped>
   .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
      }

      .el-icon-arrow-down {
        font-size: 12px;
      }

      .addInfo {
        position: absolute;
        top: 85px;
        right: 89px;
        z-index: 1;
      }
      .searchInput{
        position: absolute;
        font-size: 14px;
        z-index: 11;
        top: 21px;
        left: 377px;
        width: 500px;
      } 

      .el-dropdown{
        display: inline-block;
        position: relative;
        color: #606266;
        font-size: 14px;
        position: absolute;
        z-index: 23;
        top: 19px;
        left: 262px;
        height: 90px;
      }

      .search {
      position: absolute;
      top: 80px;
      left: 879px;
      z-index: 23;
    } 
  </style>