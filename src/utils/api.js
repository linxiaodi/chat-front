const api = {
  register: '/user/register',
  login: '/user/login',
  initUser: '/user/init',
  fillInfo: '/info/fillUserInfo',
  getList: '/api/discovery',
  logout: '/user/logout',
  getChatDetails: '/chat/details',
  markRead: '/chat/markRead'
}

// const host = 'http://localhost:8000'
//
// Object.keys(api).forEach((key) => {
//   api[key] = host + api[key]
// })

export default api
