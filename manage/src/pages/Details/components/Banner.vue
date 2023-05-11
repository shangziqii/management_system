// 详情部分每个页面顶部都会展示该组件信息
<template>
    <div class="base">
        <!-- <span>班级ID：{{baseData.classId}}</span> -->
        <span>班级名称：{{baseData.className}}</span>
        <span>所属学院：{{baseData.department}}</span>
        <span>专业：{{baseData.profession}}</span>
        <span>辅导员：{{baseData.userName}}</span>

    </div>
</template>

<script>
export default {
    data() {
        return {
            baseData: JSON.parse(sessionStorage.getItem('baseData'))
        }
    },
}
</script>

<style scoped>
.base {
    display: flex;
    justify-content: space-between;
    padding-right: 40px;
    padding-left: 10px;
}
span {
    font-size: 20px;
    font-weight: bold;
}
</style>