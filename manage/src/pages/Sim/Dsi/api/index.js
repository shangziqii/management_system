import axios from "axios";

// 新增贫困生信息
export const submitForm = (params) => {
    return axios.post('/api/difficultStudent/add', params, {
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}

//修改贫困生信息
export const changeFrom = (params) => {
    return axios.post('/api/difficultStudent/modify', params, {
        headers: {
            'token': localStorage.getItem('token'),
            "Content-Type": 'application/json'
        }
    })
}

// 查看贫困生基本信息列表
export const getList = (params) => {
    return axios.get('/api/difficultStudent/list', {
        headers: { 'token': localStorage.getItem('token') },
        params,
    })
}

// 删除贫困生信息
export const deleteStu = (params) => {
    return axios.post('/api/difficultStudent/delete', params, {
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}

//导出学生基本信息
export const exportStuInfo = (params) => {
    return axios.get('/api/difficultStudent/export', {
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        params
    })
}


//根据学生学号进行搜索
export const searchUseNum = (params) => {
    return axios.get('/api/difficultStudent/list', {
        headers: {
            'token': localStorage.getItem('token')
        },
        params
    })
}

//导入学生信息
export const importStuInfo = (params) => {
    return axios.post('/api/difficultStudent/import', params, {
        headers: { 'token': localStorage.getItem('token') }
    })
}