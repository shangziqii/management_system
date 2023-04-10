import axios from 'axios'
//拉取学生获奖列表
export const winnerList = (params) => {
    return axios.get('/api/prizeStudent/list', {
        headers: { 'token': localStorage.getItem('token') },
        params
    })
}
//添加学生获奖信息
export const addWinner = (data) => {
    return axios.post('/api/prizeStudent/add', data, {
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}
//删除学生获奖信息
export const removeInfo = (data) => {
    return axios.post('/api/prizeStudent/delete', data, {
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}
//修改学生获奖信息
export const changeInfo = (data) => {
    return axios.post('/api/prizeStudent/modify', data, {
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}

//使用学生学号进行搜索
export const searchUseNum = (params) => {
    return axios.get('/api/prizeStudent/list', {
        headers: { 'token': localStorage.getItem('token') },
        params
    })
}

//提交电子版证书
export const submitPictureTo = (params) => {
    return axios.post('/api/prizeStudent/uploadFile', params, {
        headers: {
            'token': localStorage.getItem('token'),
            'content-type': 'multipart/form-data'
        }
    })
}
//导出学生基本信息
export const exportStuInfo = (params) => {
    return axios.get('/api/prizeStudent/export', {
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        params
    })
}