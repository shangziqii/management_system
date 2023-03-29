import axios from 'axios'

// 获取查寝记录列表
export const getDorList = (params) => {
    return axios.get('/api/classDormitory/list', {
        headers: { 'token': localStorage.getItem('token') },
        params
    })
}

// 新增查寝记录
export const addDor = (data) => {
    return axios.post('/api/classDormitory/add', data, {
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}
// 删除查寝记录
export const delDor = (data) => {
    return axios.post('/api/classDormitory/delete', data, {
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}
// 修改查寝记录
export const editDor = (data) => {
    return axios.post('/api/classDormitory/modify', data, {
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}
// 查看查寝记录
export const getDor = (params) => {
    return axios.get('/api/classDormitory/get', {
        headers: { 'token': localStorage.getItem('token') },
        params
    })
}
// 文件上传接口？？？