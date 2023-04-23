export default {
    state: {
        activeIndex: '' // 当前选中的菜单项索引

    },
    mutations: {
        setActiveIndex(state, index) {
            state.activeIndex = index
        }
    }
}
