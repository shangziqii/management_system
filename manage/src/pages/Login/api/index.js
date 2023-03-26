import axios from "axios";

// 登录接口
export const Login = (params) => {
    return axios.post('/api/user/login',params)
}