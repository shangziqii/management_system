<template>
  <div class="details">
    <Banner/>
    <!-- 几个不同的记录 -->
    <div class="list-group">
      <!-- Vue中借助router-link实现页面切换 -->
      <el-tabs type="border-card">
        <el-tab-pane label="宿舍探访信息">
          <router-link class="list-group-item" active-class="active" to="/Main/Cim/Details/Domitory">宿舍探访信息</router-link>
        </el-tab-pane>
        <el-tab-pane label="班会记录信息">
          <router-link class="list-group-item" active-class="active" to="/Main/Cim/Details/ClassMeet">班会记录信息</router-link>
        </el-tab-pane>
        <el-tab-pane label="班级听课记录">
          <router-link class="list-group-item" active-class="active" to="/Main/Cim/Details/ClassLesson">班级听课记录</router-link>
        </el-tab-pane>
        <el-tab-pane label="班级谈话记录">
          <router-link class="list-group-item" active-class="active" to="/Main/Cim/Details/ClassTalk">班级谈话记录</router-link>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="panel">
      <div class="panel-body">
        <!-- 指定组件的呈现位置 -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from './components/Banner.vue'
export default {
    name: 'Details',
    components: {
      Banner
    }
}
</script>

<style>

</style>