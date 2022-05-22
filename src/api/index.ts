import api from '~/api/request'
import type { Post,SearchParams, Label, SuccessResponse, PostResponse,MsgResponse } from 'types'

// 获取文章列表
export const getBlogList = (params?: SearchParams): Promise<SuccessResponse<PostResponse>> => {
  return api.get('/list', params)
}

// 获取标签列表
export const getLabelList = (): Promise<SuccessResponse<Label[]>> => {
  return api.get('/label')
}

// 获取文章详情
export const getBlogDetail = (id: string): Promise<SuccessResponse<Post>> => {
  return api.get(`/list/${id}/`)
}

// 修改文章
export const editBlog = (id: string,payload:any): Promise<SuccessResponse<Post>> => {
  return api.put(`/list/${id}/`,payload)
}

// 新建文章
export const addBlog = (payload:any): Promise<SuccessResponse<Post>> => {
  return api.post(`/list`,payload)
}

// 删除文章
export const deleteBlog = (id:string): Promise<MsgResponse> => {
  return api.del(`/list/${id}/`)
}
