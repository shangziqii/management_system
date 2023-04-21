<template>
  <div class="tabs">
    <el-tag
        v-for="(item, index) in tags"
        :key="item.label"
        :closable="item.name !== 'Pim'"
        :effect="$route.name === item.name ? 'dark' : 'plain'"
        @click="changeMenu(item)"
        @close="handleClose(item, index)"
        >
        {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
    name: 'CommonTag',
    data() {
        return {
            
        }
    },
    methods: {
        ...mapMutations(['closeTag']),
        // 点击tag跳转
        changeMenu(item) {
            this.$router.push({ name: item.name })
        },
        // 点击tag删除
        handleClose(item, index) {
            // 调用store中的mutation
            this.closeTag(item)
            // 索引长度
            const length = this.tags.length
            // 删除之后的跳转逻辑
            if(item.name !== this.$route.name) {
                return
            }
            if(index === length) {
                this.$router.push({name: this.tags[index - 1].name})
            } else {
                this.$router.push({name: this.tags[index].name}) 
            }
        }
    },
    computed: {
        ...mapState({
            tags: state => state.detail.tabsList
        })
    }
}
</script>

<style scoped>
.tabs {
    position: absolute;
    left: 210px;
    top: 40px;
    margin: 10px 0;
}
.tabs[data-v-7a918e6e][data-v-c9c526c0] {
    top: 60px;
}
.tabs .el-tag {
    margin-right: 10px;
    cursor: pointer;
}
</style>