import { getItem } from './robotDatabase'
/*
* 初始化socket, user, 获取所有信息列表
* 用于chat与dashboard初始化
* @params: {func} openSocket 开启socket
* @params: {func} initUser 初始化用户
* @params: {func} currentChatDetails 本地所有聊天信息
* @params: {func} getMsgList ajax拉取服务器的所有聊天信息
* @params: {object} user
* */
export default function (openSocket, initUser, currentChatDetails, getMsgList, user) {
  const { _id } = user

  if (!_id) {
    // 如果没有初始化用户， 应付页面刷新用户
    initUser().then(() => {
      // 通常可以直接获取
      getMsgList()
      openSocket()
    })
  } else {
    openSocket()
    if (currentChatDetails.length === getItem().length) getMsgList()
  }
}
