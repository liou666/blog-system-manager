import axios, { AxiosInstance } from 'axios'
import { message } from 'antd'
const BASE_URL = 'http://localhost:3000/api'

const instance:AxiosInstance = axios.create({
  baseURL: `/api/`,
  timeout: 5000
})
// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 请求前
    return config
  }
  , err => {
    // 请求错误
    return Promise.reject(err)
  }
)
// 响应拦截器
instance.interceptors.response.use(
  response => {
    // 请求成功
    return response
  }
  , err => {
    message.error(err.message)
    // 请求失败
    return Promise.reject(err)
  }
)
export default instance
