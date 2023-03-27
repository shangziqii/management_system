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