export default {
    state: {
        permission: 0,//初始权限为0
        currentIndex: ''
    },
    mutations: {
        setPermission(state, permission) {
            state.permission = permission
        },
        setCurrentIndex(state, index) {
            state.currentIndex = index
        }
    }
}