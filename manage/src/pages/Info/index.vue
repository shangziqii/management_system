<template>
    <el-container>
      <el-aside width="200px">
        <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        router
      >

      <!-- 个人信息管理 -->
      <el-menu-item index="/info/perInfo">
          <el-icon></el-icon>
          <span>个人信息管理</span>
        </el-menu-item>

      <!-- 账号管理 -->
      <el-menu-item index="/info/accInfo">
          <el-icon></el-icon>
          <span>账号管理</span>
        </el-menu-item>

      <!-- 班级信息管理  -->
      <el-menu-item index="/info/ClassMgt">
          <el-icon></el-icon>
          <span>班级信息管理</span>
        </el-menu-item>

        <!-- 学生信息管理 -->
        <el-sub-menu>
          <template #title>
            <el-icon></el-icon>
            <span>学生信息管理</span>
          </template>
            <el-menu-item index="/info/stuMgt/stuInfos">基本学生信息</el-menu-item>
            <el-menu-item index="/info/stuMgt/poorInfos">困难生信息</el-menu-item>
            <el-menu-item index="/info/stuMgt/winInfos">学生获奖情况</el-menu-item>
            <el-menu-item index="/info/stuMgt/outInfos">学生违规乱纪情况</el-menu-item>
        </el-sub-menu>

        <!-- 助学金评定记录 -->
      <el-menu-item index="/info/stuSubsidies">
          <el-icon></el-icon>
          <span>助学金评定记录</span>
        </el-menu-item>

     <!-- 奖学金评定记录 -->
     <el-menu-item index="/info/scholarship">
          <el-icon></el-icon>
          <span>奖学金评定记录</span>
        </el-menu-item>
      </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
</template>


<script>
export default {
    name:'Info'
}
</script>

<style scoped>

</style>