export default {
    state: {
        baseData: {}, //用于Details中Banner部分的数据
    },
    mutations: {
        // 获取baseData的方法
        getBaseData(state, params) {
            state.baseData = params
        }
    }
}