<template>
    <div class="info">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h1 class="header">学生详细信息</h1>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div class="flex-container">
                <div class="flexbox">
                    <span>姓名</span>
                </div>
                <div class="flexbox">
                    <span>年龄</span>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script scoped>
export default {

}
</script>

<style>
/* .text {
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
*/
*{
    padding:0;
    margin:0;
}
.info {
    position: relative;
}

.box-card {
    width: 1000px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    margin-top: 17%;
}

.el-card__header {
    height: 70px;
}

.header {
    position: absolute;
    top: -40px;
    left: 50%;
    transform: translate(-50%, 0px);
}
.flexbox{
    width: 100%;
}
.flex-container{
    gap:24px;
}
.flex-container{
    display: flex;
    flex-wrap: wrap;
    gap:24px;
}
</style>