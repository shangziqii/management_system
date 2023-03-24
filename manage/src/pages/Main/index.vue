<template>
    <div class="main">
      <el-container style="width:100%; height:100%">
        <el-aside width="200px">
             <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              router
              >
              <!-- 个人信息管理 -->
              <el-menu-item index="/Main/Pim">
                <i class="el-icon-setting"></i>
                <span slot="title">个人信息管理</span>
              </el-menu-item>
              <!-- 账号管理 -->
              <el-menu-item index="/Main/Am">
                <i class="el-icon-setting"></i>
                <span slot="title">账号管理</span>
              </el-menu-item>
              <!-- 班级信息管理 -->
              <el-menu-item index="/Main/Cim">
                <i class="el-icon-setting"></i>
                <span slot="title">班级信息管理</span>
              </el-menu-item>
              <!-- 学生信息管理 -->
              <el-submenu index="/Main/Sim">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>学生信息管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/Main/Sim/Bsi">基本学生信息</el-menu-item>
                  <el-menu-item index="/Main/Sim/Dsi">困难生信息</el-menu-item>
                  <el-menu-item index="/Main/Sim/Sa">学生获奖情况</el-menu-item>
                  <el-menu-item index="/Main/Sim/Svrad">学生违规乱纪情况</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <!-- 助学金评定记录 -->
              <el-menu-item index="/Main/Gar">
                <i class="el-icon-menu"></i>
                <span slot="title">助学金评定记录</span>
              </el-menu-item>
              <!-- 奖学金评定记录 -->
              <el-menu-item index="/Main/Ser">
                <i class="el-icon-document"></i>
                <span slot="title">奖学金评定记录</span>
              </el-menu-item>
            </el-menu>
        </el-aside>
        <el-container>
          <el-header>
            <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
          </el-breadcrumb>
          </el-header>
          <el-main>
             // 在这写显示区域,记得把这条注释删掉
            <router-view>
            </router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
</template>

<script>
export default {
    name: 'Main',
    components: {
      
    },
    data() {
       return {
      
       }
    },
    methods: {
        
    },
    computed: {
  }
}
</script>

<style scoped>
.main{
  width: 100%;
  height: 100vh;
}
  .el-header, .el-footer {
    height: 60px;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: skyblue;
    color: #333;
    text-align: center;
    line-height: 160px;
  }


</style>