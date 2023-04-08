<template>
  <div class="details">
    <Banner/>
    <!-- 几个不同的记录 -->
    <div class="list-group">
      <!-- Vue中借助router-link实现页面切换 -->
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="宿舍探访信息" name="first">
        </el-tab-pane>
        <el-tab-pane label="班会记录信息" name="second">
        </el-tab-pane>
        <el-tab-pane label="班级听课记录" name="third">
        </el-tab-pane>
        <el-tab-pane label="班级谈话记录" name="fourth">
        </el-tab-pane>
        <!-- 指定组件的呈现位置 -->
        <router-view></router-view>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Banner from './components/Banner.vue'
export default {
    name: 'Details',
    data() {
      return {
        activeName: 'first',
      }
    },
    components: {
      Banner,
    },
    methods: {
      handleClick() {
        if(this.activeName === 'first') {
          this.$router.push('/Main/Cim/Details/Dormitory')
        } else if(this.activeName === 'second') {
          this.$router.push('/Main/Cim/Details/ClassMeet')
        } else if(this.activeName === 'third') {
          this.$router.push('/Main/Cim/Details/ClassLesson')
        } else if(this.activeName === 'fourth') {
          this.$router.push('/Main/Cim/Details/ClassTalk')
        }

      },
    },
}
</script>

<style scoped>
.list-group /deep/ .el-tabs--card>.el-tabs__header .el-tabs__nav{
  border: 0;
}
.list-group /deep/ .el-tabs__nav {
  display: flex;
  justify-content: space-between;
  width: 1663px;
  /* font-size: 20px; */
}


/* 新增样式 */
.list-group /deep/ .el-tabs__nav {
    display: flex;
    justify-content: space-between;
    width: 100%;
    /* font-size: 20px; */
}
.list-group {
    position: absolute;
    top: 210px;
    width:84%;
}
</style>