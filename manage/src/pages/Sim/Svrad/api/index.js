import axios from 'axios'
//拉取学生处分列表
export const punishList = (params) => {
    return axios.get('/api/punishStudent/list', {
        headers: { 'token': localStorage.getItem('token') },
        params
    })
}
//添加学生处分信息
export const addPunish = (data) => {
    return axios.post('/api/punishStudent/add', data, {
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}
//删除学生处分信息
export const removeInfo = (data) => {
    return axios.post('/api/punishStudent/delete', data, {
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}
//修改学生处分信息
export const changeInfo = (data) => {
    return axios.post('/api/punishStudent/modify', data, {
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}

//根据学号进行搜索学生信息
export const searchUseNum = (params) => {
    return axios.get('/api/punishStudent/list', {
        headers: { 'token': localStorage.getItem('token') },
        params
    })
}

//上传学生违规违纪文件
export const uploadFiles = (params) => {
    return axios.post('/api/punishStudent/uploadFile', params, {
        headers: {
            'token': localStorage.getItem('token')
        }
    })
}

//导出学生基本信息
export const exportStuInfo = (params) => {
    return axios.get('/api/punishStudent/export', {
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        params
    })
}

//导入学生信息
export const importStuInfo = (params) => {
    return axios.post('/api/punishStudent/import', params, {
        headers: { 'token': localStorage.getItem('token') }
    })
}