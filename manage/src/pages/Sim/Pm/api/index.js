import axios from 'axios'
//拉取学生党员列表
export const punishList = (params) => {
    return axios.get('/api/partyMember/list', {
        headers: { 'token': localStorage.getItem('token') },
        params
    })
}
//添加学生党员信息
export const addPunish = (data) => {
    return axios.post('/api/partyMember/add', data, {
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}
//删除学生党员信息
export const removeInfo = (data) => {
    return axios.post('/api/partyMember/delete', data, {
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}
//修改学生党员信息
export const changeInfo = (data) => {
    return axios.post('/api/partyMember/modify', data, {
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}