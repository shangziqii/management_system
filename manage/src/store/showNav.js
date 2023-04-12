export default {
    state: {
        permission: 0//初始权限为0
    },
    mutations: {
        setPermission(state, permission) {
            state.permission = permission
        }
    }
}