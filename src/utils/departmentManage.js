const key = 'ownerDepartmentId'

export function getDepartmentId() {
  return window.sessionStorage.getItem(key)
}

export function setDepartmentId(departmentId) {
  return window.sessionStorage.setItem(key, departmentId)
}

export function removeDepartmentId() {
  return window.sessionStorage.removeItem(key)
}
