import axios from 'axios'

// 获取谈话记录列表
export const getTalkList = (params) => {
    return axios.get('/api/classInterview/list', {
        headers: { 'token': localStorage.getItem('token') },
        params
    })
}

// 新增谈话记录
export const addTalk = (data) => {
    return axios.post('/api/classInterview/add', data, {
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}
// 删除谈话记录
export const delTalk = (data) => {
    return axios.post('/api/classInterview/delete', data, {
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}
// 修改谈话记录
export const editTalk = (data) => {
    return axios.post('/api/classInterview/modify', data, {
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}
// 查看谈话记录
export const getTalk = (params) => {
    return axios.get('/api/classInterview/get', {
        headers: { 'token': localStorage.getItem('token') },
        params
    })
}
// 文件上传接口？？？
export const uploadFiles = (params) => {
    return axios.post('/api/classInterview/uploadFile', params, {
        headers: {
            'token': localStorage.getItem('token')
        }
    })
}