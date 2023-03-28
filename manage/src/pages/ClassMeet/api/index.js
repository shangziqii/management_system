import axios from 'axios'

// 获取班会记录列表
export const getMeetList = (params) => {
    return axios.get('/api/classMeeting/list', {
        headers: { 'token': localStorage.getItem('token') },
        params
    })
}

// 新增班会记录
export const addMeet = (data) => {
    return axios.post('/api/classMeeting/add', data, {
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}
// 删除班会记录
export const delMeet = (data) => {
    return axios.post('/api/classMeeting/delete', data, {
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}
// 修改班会记录
export const editMeet = (data) => {
    return axios.post('/api/classMeeting/modify', data, {
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}
// 查看班会记录
export const getDor = (params) => {
    return axios.get('/api/classMeeting/get', {
        headers: { 'token': localStorage.getItem('token') },
        params
    })
}
// 文件上传接口？？？