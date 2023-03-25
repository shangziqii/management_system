import axios from "axios";
// 个人信息获取
export const getInfo = (params) => {
    return axios.get('api/user/inform/get', {
        headers: { 'token': params }
    })
}
//修改用户密码（失败，参数错误）
export const changePass = (params) => {
    return axios.post('/api/user/update_password', params, {
        headers: {
            'token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
}