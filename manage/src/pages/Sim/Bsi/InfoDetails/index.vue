<template>
<div class="info">
<el-card class="box-card">
  <div class="header">
    <span>学生信息详情</span>
  </div>
  <div class="text item">1</div>
  <div class="text item">2</div>
  <div class="text item">3</div>
  <div class="text item">4</div>
  <div class="text item">5</div>
</el-card>
</div>
</template>

<script scoped>
export default {

}
</script>

<style scoped>
.text {
    font-size: 14px;
  }

  .item {
    height: 25px;
    margin-bottom: 18px;
  }

  .box-card {
    width: 480px;
    height: 500px;
  }
  .el-card__header {
    padding: 18px 20px;
    border-bottom: 1px solid #EBEEF5;
    box-sizing: border-box;
    height: 56px;
}
.header{
    border-bottom: 1px solid rgb(121, 118, 118);
    height: 50px;
    line-height: 50px;
}
</style>