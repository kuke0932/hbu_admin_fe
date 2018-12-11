/**
 *
 * @author Liuchaoqun
 * @create 2018-01-18 17:42
 **/
import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const carList = []
const roleJson = {}
for (let i = 0; i < 0; i++) {
  const role = Mock.mock({
    id: '@increment',
    CarTime: '@cname',
    roleName: '@cname',
    'roleValue|1': ['1', '2', '3', '4', '5'],
    roleDesc: '@ctitle(15, 25)'
  })
  carList.push(role)
  roleJson[role.id] = role
}

export default {
  listCar: config => {
    const { pageNum, pageSize } = param2Obj(config.url)
    const list = []
    for (let i = (pageNum - 1) * pageSize, j = 0; i < pageNum * pageSize && i < carList.length; i++, j++) {
      list[j] = carList[i]
    }
    return {
      status: 200,
      message: '',
      data: {
        pageNum: pageNum,
        pageSize: pageSize,
        total: carList.length,
        pages: (carList.length - 1) / 10 + 1,
        size: list.length,
        rows: list
      }
    }
  },
  getRoleById: config => {
    const { id } = param2Obj(config.url)
    return {
      status: 200,
      message: '',
      data: roleJson[id]
    }
  },
  addCar: config => {
    const body = config.body
    const params = body.split('&')
    const paramJson = {}
    params.forEach(e => {
      paramJson[e.split('=')[0]] = decodeURIComponent(e.split('=')[1])
    })
    carList.push(paramJson)
    return {
      status: 200,
      message: '',
      data: ''
    }
  },
  updateCar: config => {
    const body = config.body
    const params = body.split('&')
    const paramJson = {}
    params.forEach(e => {
      paramJson[e.split('=')[0]] = decodeURIComponent(e.split('=')[1])
    })
    roleJson[paramJson.id] = paramJson
    roleJson[paramJson.id.CarBrand] = paramJson['CarBrand']
    roleJson[paramJson.id.CarName] = paramJson['CarName']
    roleJson[paramJson.id.carLink] = paramJson['carLink']
    roleJson[paramJson.id.carType] = paramJson['carType']
    roleJson[paramJson.id.carCreator] = paramJson['carCreator']
    roleJson[paramJson.id.carDate] = paramJson['carDate']
    // roleJson[paramJson['id']].CarBrand = paramJson['CarBrand']
    // roleJson[paramJson['id']].CarName = paramJson['CarName']
    // roleJson[paramJson['id']].carLink = paramJson['carLink']
    // roleJson[paramJson['id']].carType = paramJson['carType']
    // roleJson[paramJson['id']].carCreator = paramJson['carCreator']
    // roleJson[paramJson['id']].carDate = paramJson['carDate']
    return {
      status: 200,
      message: '',
      data: ''
    }
  },
  removeCar: config => {
    const body = config.body
    const params = body.split('=')
    const idsStr = decodeURIComponent(params[1])
    const ids = idsStr.split(',')
    const idsArr = JSON.parse('[' + String(ids) + ']')
    for (let i = 0; i < carList.length; i++) {
      idsArr.forEach(e => {
        if (e === carList[i].id) {
          carList.splice(i, 1)
        }
      })
    }
    return {
      status: 200,
      message: '',
      data: ''
    }
  }
}
