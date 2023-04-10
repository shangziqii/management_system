import Vue from 'vue'
import Vuex from 'vuex'
import detail from './detail'

Vue.use(Vuex)

// 创建vuex的实例
export default new Vuex.Store({
    modules: {
        detail
    }
})