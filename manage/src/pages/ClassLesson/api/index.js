import axios from 'axios'

// 获取班会记录列表
export const getLessonList = (params) => {
    return axios.get('/api/classListening/list', {
        headers: { 'token': localStorage.getItem('token') },
        params
    })
}

// 新增班会记录
export const addLesson = (data) => {
    return axios.post('/api/classListening/add', data, {
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}
// 删除班会记录
export const delLesson = (data) => {
    return axios.post('/api/classListening/delete', data, {
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}
// 修改班会记录
export const editLesson = (data) => {
    return axios.post('/api/classListening/modify', data, {
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}
// 查看班会记录
export const getLesson = (params) => {
    return axios.get('/api/classListening/get', {
        headers: { 'token': localStorage.getItem('token') },
        params
    })
}
// 文件上传接口？？？