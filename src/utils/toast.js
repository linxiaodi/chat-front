import { Toast } from 'antd-mobile'

const toastInfo = function (text, duration = 1.2) {
  return Toast.info(text, duration, () => {}, false)
}

const hideToast = function () {
  Toast.hide()
}

const toastLoading = function (text = 'Loading', duration = 4) {
  Toast.loading(text, duration)
}

const toastSuccess = function (text = '成功！') {
  Toast.success(text)
}

const toastFail = function (text = '失败') {
  Toast.fail(text)
}

export {
  toastInfo,
  hideToast,
  toastLoading,
  toastSuccess,
  toastFail,
}
