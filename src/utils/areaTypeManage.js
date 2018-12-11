const key = 'areaType'

export function getAreaType() {
  return window.sessionStorage.getItem(key)
}

export function setAreaType(areaType) {
  return window.sessionStorage.setItem(key, areaType)
}

export function removeAreaType() {
  return window.sessionStorage.removeItem(key)
}
