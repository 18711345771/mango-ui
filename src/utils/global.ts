/**
 * 全局常量、方法封装模块
 * 通过原型挂载到Vue模块
 * 通过this.global调用
 * @type {string}
 */
//后台管理系统服务器地址
export const baseUrl='http://localhost:8001';
//系统数据备份还原服务器地址
export const backupBaseUrl='http://localhost:8002';
export default {
    baseUrl,
    backupBaseUrl
}