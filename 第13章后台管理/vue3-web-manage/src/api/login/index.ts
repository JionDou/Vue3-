import http from '@/utils/http'
import type { LoginData, UserRes } from './types'

/**
 * 登录
 */
// export function login(data: LoginData) {
//   return http.post<string>('/admin/user/login', data)
// }

/**
 * 获取登录用户信息
 */
// export function getUserInfo() {
//   return http.get<UserRes>('/admin/user/info')
// }

/**
 * 退出登陆
 */
// export function logout() {
//   return http.post('/admin/user/logout')
// }
export function login(data: LoginData) {
  return http.post<string>('/admin/acl/login', data)
}

/**
 * 获取登录用户信息
 */
export function getUserInfo() {
  return http.get<UserRes>('/admin/acl/info')
}

/**
 * 退出登陆
 */
export function logout() {
  return http.post('/admin/acl/logout')
}
