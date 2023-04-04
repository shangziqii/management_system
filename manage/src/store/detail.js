export default {
    state: {
        baseData: '', //用于Details中Banner部分的数据
        tabsList: [
            {
                path: "/Main/Pim",
                name: "Pim",
                label: "个人信息管理",
                icon: "user-solid",
                index: "/Main/Pim",
            },
        ] //面包屑的数据
    },
    mutations: {
        // 获取baseData的方法
        getBaseData(state, params) {
            // console.log(params);
            state.baseData = params
            sessionStorage.setItem('baseData', JSON.stringify(params))
        },
        // 更新面包屑数据
        selectMenu(state, val) {
            // console.log(val, 'val');
            const index =  state.tabsList.findIndex(item => item.name === val.name)
            // 如果不存在
            if(index === -1) {
                state.tabsList.push(val)
            }
        },
        // 删除tag触发的操作
        closeTag(state, item) {
            const index = state.tabsList.findIndex(val => val.name === item.name)
            state.tabsList.splice(index, 1)
        }
    }
}