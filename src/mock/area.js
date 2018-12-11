/**
 *
 * @author Liuchaoqun
 * @create 2018-01-18 17:42
 **/
import Mock from 'mockjs'

/* 设置初始数据 */
const menuTree = []
// status 1启用  2禁用
const root = { id: 0, label: '中国', status: 1, children: [] }
const shenglist = [{ id: 1, parentid: 0, name: '河北省', status: 1 }, { id: 2, parentid: 0, name: '河南省', status: 1 }]
const shilist = [{ id: 1, parentid: 1, name: '石家庄', status: 1 }, { id: 2, parentid: 1, name: '张家口', status: 1 }, { id: 3, parentid: 2, name: '郑州', status: 1 }]

for (let i = 0; i < shenglist.length; i++) {
  const sheng = { id: shenglist[i].id, label: shenglist[i].name, parentid: shenglist[i].parentid, children: [] }
  for (let j = 0; j < shilist.length; j++) {
    if (shilist[j].parentid === shenglist[i].id) {
      var shi = { id: shilist[j].id, label: shilist[j].name, parentid: shenglist[i].parentid }
      sheng.children.push(shi)
    }
  }
  root.children.push(sheng)
}
menuTree.push(Mock.mock(root))

const menuList = []
menuTree.forEach(e => toList(e))

function toList(ml) {
  const item = {
    id: ml.id,
    label: ml.label
  }
  menuList.push(item)
  ml.children && ml.children.forEach(e => {
    toList(e)
  })
}

const menuInfo = []
for (let i = 0; i < menuList.length; i++) {
  const ids = []
  const menuName = []
  const fatherMenu = []
  menuList.forEach((e, i) => {
    ids.push(e.id)
    menuName.push(e.label)
    fatherMenu.push(e.label)
  })
  menuInfo.push(Mock.mock({
    id: ids[i],
    menuName: menuName[i],
    fatherMenu: fatherMenu[i]
  }))
}

export default {
  treeDivision: config => {
    return {
      status: 200,
      message: '',
      data: {
        rows: menuTree
      }
    }
  },
  updateStatus: config => {

  },
  removeFunction: config => {
    const body = config.body
    const params = body.split('=')
    const idsStr = decodeURIComponent(params[1])
    const ids = idsStr.split(',')
    const idsArr = JSON.parse('[' + String(ids) + ']')
    for (let i = 0; i < menuTree.length; i++) {
      idsArr.forEach(e => {
        if (e === menuTree[i].id) {
          menuTree.splice(i, 1)
        }
      })
    }
    return {
      status: 200,
      message: '',
      data: ''
    }
  },
  addFunction: config => {
    return {
      status: 200,
      message: '',
      data: ''
    }
  },
  updateFunction: config => {
    return {
      status: 200,
      message: '',
      data: ''
    }
  },
  menuInfo
}
