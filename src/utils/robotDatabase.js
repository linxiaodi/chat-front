function setItem(data) {
  return window.localStorage.setItem('robotData', JSON.stringify(data))
}

function getItem() {
  const items = window.localStorage.getItem('robotData')
  return items ? JSON.parse(items) : []
}

function init() {
  const dataBase = window.localStorage.getItem('robotData') || []
  if (dataBase.length === 0) {
    setItem([])
  }
}

function create(pieceMsg) {
  init()
  const dataBase = getItem()
  dataBase.push(pieceMsg)
  setItem(dataBase)
  return dataBase
}

export {
  create,
  getItem,
  setItem,
}
