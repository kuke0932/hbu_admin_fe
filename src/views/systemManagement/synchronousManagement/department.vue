<template>
  <div class="container">
    <el-form ref="searchForm" class="searchForm" :inline="true">
      <el-row>
        <el-form-item label="本地库同步状态" label-width="120px">
          <el-select v-model="localStatus" style="width: 200px;" placeholder="请选择本地库同步状态" clearable filterable>
            <el-option
              v-for="item in localStatusList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="微信同步状态" label-width="110px">
          <el-select v-model="wechatStatus" style="width: 180px;" placeholder="请选择微信同步状态" clearable filterable>
            <el-option
              v-for="item in wechatStatusList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="变更版本号" label-width="90px">
            <el-select v-model="changeVersion" style="width: 180px;" placeholder="请选择变更版本号" clearable filterable>
              <el-option
                v-for="item in changeVersionList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        <el-button type="primary" @click="search" :loading="searchLoading">查询</el-button>
        <el-button type="primary" @click="resetForm('searchForm')">重置</el-button>
      </el-row>
    </el-form>
    <div class="btn_box">
      <el-button class="el-button--primary " code="" @click="doDepartmentSyncModified()"><i class="el-icon-refresh"></i>&nbsp; 获取变更</el-button>
      <el-button class="el-button--primary " code="" @click="doDepartmentSync('local')"><i class="el-icon-refresh"></i>&nbsp; 中间库同步</el-button>
      <el-button class="el-button--primary " code="" @click="doAllDepartmentSync('local')"><i class="el-icon-refresh"></i>&nbsp; 中间库全部同步</el-button>
      <el-button class="el-button--primary " code="" @click="doDepartmentSync('weWork')"><i class="el-icon-refresh"></i>&nbsp; 微信同步</el-button>
      <el-button class="el-button--primary " code="" @click="doAllDepartmentSync('weWork')"><i class="el-icon-refresh"></i>&nbsp; 微信全部同步</el-button>
      <el-button class="el-button--primary " code="" @click="getDepartmentProgress('local')"><i class="el-icon-refresh"></i>&nbsp; 查询部门同步中间库进度</el-button>
      <el-button class="el-button--primary " code="" @click="getDepartmentProgress('weWork')"><i class="el-icon-refresh"></i>&nbsp; 查询部门同步微信进度</el-button>
      <!--<el-button class="el-button&#45;&#45;primary " code="" @click=""><i class="el-icon-refresh"></i>&nbsp; 查询部门同步微信进度</el-button>-->
    </div>
    <el-table
      :data="dataList"
      v-loading.body="listLoading"
      element-loading-text="拼命加载中"
      border
      fit
      tooltip-effect="dark"
      highlight-current-row
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50">
      </el-table-column>
      <el-table-column label="数据中心数据" align="center">
        <el-table-column label="单位ID">
          <template slot-scope="scope">
            {{scope.row.zfDepartmentId}}
          </template>
        </el-table-column>
        <el-table-column label="原始单位ID">
          <template slot-scope="scope">
            {{scope.row.zfYsDepartmentId}}
          </template>
        </el-table-column>
        <el-table-column label="父单位ID">
          <template slot-scope="scope">
            {{scope.row.zfParentDepartmentId}}
          </template>
        </el-table-column>
        <el-table-column label="单位名称">
          <template slot-scope="scope">
            {{scope.row.name}}
          </template>
        </el-table-column>
        <el-table-column label="级别">
          <template slot-scope="scope">
            {{scope.row.level}}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="中间库数据" align="center">
        <el-table-column label="单位ID" width="70">
          <template slot-scope="scope">
            {{scope.row.authDepartment == null ? '-' :scope.row.authDepartment.zfDepartmentId}}
          </template>
        </el-table-column>
        <el-table-column label="原始单位ID" width="100">
          <template slot-scope="scope">
            {{scope.row.authDepartment == null ? '-' :scope.row.authDepartment.zfYsDepartmentId}}
          </template>
        </el-table-column>
        <el-table-column label="父单位ID" width="80">
          <template slot-scope="scope">
            {{scope.row.authDepartment == null ? '-' :scope.row.authDepartment.zfParentDepartmentId}}
          </template>
        </el-table-column>
        <el-table-column label="单位名称" width="80">
          <template slot-scope="scope">
            {{scope.row.authDepartment == null ? '-' :scope.row.authDepartment.name}}
          </template>
        </el-table-column>
        <el-table-column label="级别" width="60">
          <template slot-scope="scope">
            {{scope.row.authDepartment == null ? '-' :scope.row.authDepartment.level}}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="变更类型" align="center" width="100">
        <template slot-scope="scope">
          {{modifyTypeStatus[scope.row.modifyType]}}
        </template>
      </el-table-column>
      <el-table-column label="变更版本号" align="center" width="100">
        <template slot-scope="scope">
          {{scope.row.version}}
        </template>
      </el-table-column>
      <el-table-column label="同步状态" align="center">
        <el-table-column label="中间库同步状态" align="center" width="180">
          <template slot-scope="scope">
            {{localStatusList[scope.row.toLocalSuccess].label}}
            <el-button v-if="scope.row.toLocalSuccess === 0" type="primary" @click="doDepartmentSyncSingle(scope.row.id, 'local')" style="padding: 4px 9px;font-size: 12px">立即同步</el-button>
            <el-popover
              v-if="scope.row.toLocalSuccess === 2"
              placement="bottom"
              title="失败原因"
              width="200"
              trigger="click"
              :content="scope.row.toLocalFailReason">
              <el-button slot="reference" type="danger" style="padding: 4px 9px;font-size: 12px">查看原因</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="微信同步状态" align="center" width="180">
          <template slot-scope="scope">
            {{wechatStatusList[scope.row.toWeWorkSuccess].label}}
            <el-button v-if="scope.row.toWeWorkSuccess === 0" type="primary" @click="doDepartmentSyncSingle(scope.row.id, 'weWork')" style="padding: 4px 9px;font-size: 12px">立即同步</el-button>
            <el-popover
              v-if="scope.row.toWeWorkSuccess === 2"
              placement="bottom"
              title="失败原因"
              width="200"
              trigger="click"
              :content="scope.row.toWeWorkFailReason">
              <el-button slot="reference" type="danger" style="padding: 4px 9px;font-size: 12px">查看原因</el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="title"
      :visible.sync="showProcess"
      width="60%"
      :before-close="closeDialog"
      style="margin-top: 25vh">
      <el-progress :text-inside="true" :stroke-width="18" :percentage="percentage" :status="percentage === 100 ? 'success' : ''"></el-progress>
    </el-dialog>

    <el-pagination
      style="margin-top: 15px;"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentPageChange"
      :current-page.sync="pageNum"
      :page-sizes="[10, 20, 30]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  import { listDataVersion, listDepartmentSync, doDepartmentSyncModified, doDepartmentSyncToLocal, doAllDepartmentSyncToLocal, doDepartmentSyncToWeWork, doAllDepartmentSyncToWeWork, getDepartmentLocalProgress, getDepartmentWeWorkProgress } from '@/api/sync'
  export default {
    name: 'departmentSynchronousManagerment',
    data() {
      return {
        dataList: [],
        pageNum: 1,
        pageSize: 10,
        total: 0,
        localStatusList: [
          {
            value: 0,
            label: '未同步'
          },
          {
            value: 1,
            label: '同步成功'
          },
          {
            value: 2,
            label: '同步失败'
          }
        ],
        localStatus: '',
        wechatStatusList: [
          {
            value: 0,
            label: '未同步'
          },
          {
            value: 1,
            label: '同步成功'
          },
          {
            value: 2,
            label: '同步失败'
          }
        ],
        wechatStatus: '',
        changeVersionList: [],
        modifyTypeStatus: {
          0: '新增',
          1: '删除',
          2: '修改'
        },
        changeVersion: '',
        searchLoading: false,
        listLoading: false,
        multipleSelection: [],
        title: '',
        showProcess: false,
        timer: null,
        percentage: 0
      }
    },
    mounted() {
      listDataVersion('DEPARTMENT').then(resp => {
        const dataVersions = resp.data.data || []
        this.changeVersionList = dataVersions.map(t => ({ value: t.version, label: '版本号:' + t.version + ' 同步时间:' + t.createTime }))
      })
      this.fetchData(this.localStatus, this.wechatStatus, this.changeVersion, this.pageNum, this.pageSize)
    },
    methods: {
      fetchData(toLocalSuccess, toWeWorkSuccess, version, pageNum, pageSize) {
        return listDepartmentSync(toLocalSuccess, toWeWorkSuccess, version, pageNum, pageSize).then(resp => {
          this.dataList = resp.data.data.rows
          this.pageNum = pageNum
          this.pageSize = pageSize
          this.total = resp.data.data.total
        })
      },
      search() {
        this.searchLoading = true
        this.fetchData(this.localStatus, this.wechatStatus, this.changeVersion, this.pageNum, this.pageSize).then((resp) => {
          this.searchLoading = false
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleSizeChange(pageSize) {
        this.pageNum = 1
        this.pageSize = pageSize
        this.fetchData(this.localStatus, this.wechatStatus, this.changeVersion, this.pageNum, this.pageSize)
      },
      handleCurrentPageChange(currentPage) {
        this.pageNum = currentPage
        this.fetchData(this.localStatus, this.wechatStatus, this.changeVersion, this.pageNum, this.pageSize)
      },
      resetForm(formName) {
        this.localStatus = ''
        this.wechatStatus = ''
        this.changeVersion = ''
      },
      /* 单个同步 */
      doDepartmentSync(type) {
        if (this.multipleSelection.length < 1) {
          this.$message({
            type: 'warning',
            message: '请至少选中一行再执行此操作',
            duration: 1500
          })
          return
        }
        const rows = this.multipleSelection
        const ids = []
        for (let i = 0; i < rows.length; i++) {
          ids.push(rows[i].id)
        }
        if (type === 'local') { // 中间库本地同步
          doDepartmentSyncToLocal(ids.join(',')).then(resp => {
            if (resp.status === 200) {
              this.$message({
                type: 'success',
                message: '中间库同步成功！'
              })
            } else {
              this.$message({
                message: resp.data.message,
                type: 'error'
              })
            }
          }).catch(e => {
            console.log(e)
          })
        } else { // 微信同步
          doDepartmentSyncToWeWork(ids.join(',')).then(resp => {
            if (resp.status === 200) {
              this.$message({
                type: 'success',
                message: '微信同步成功！'
              })
            } else {
              this.$message({
                message: resp.data.message,
                type: 'error'
              })
            }
          }).catch(e => {
            console.log(e)
          })
        }
      },
      /* 三种全部同步 */
      doAllDepartmentSync(type) {
        if (this.changeVersion === '') {
          this.$message({
            type: 'warning',
            message: '请先选择变更版本号',
            duration: 1500
          })
          return
        }
        this.$confirm('耗时较长， 是否进行?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (type === 'local') { // 全部同步到本地中间库
            doAllDepartmentSyncToLocal(this.changeVersion).then(resp => {
              if (resp.status === 200) {
                this.$message({
                  type: 'info',
                  message: '已开始同步，可点击查询进度按钮查看同步进度'
                })
              } else {
                this.$message({
                  message: resp.data.message,
                  type: 'error'
                })
              }
            }).catch(e => {
              console.log(e)
            })
          }
          if (type === 'weWork') { // 全部同步到微信
            doAllDepartmentSyncToWeWork(this.changeVersion).then(resp => {
              if (resp.status === 200) {
                this.$message({
                  type: 'info',
                  message: '已开始同步，可点击查询进度按钮查看同步进度'
                })
              } else {
                this.$message({
                  message: resp.data.message,
                  type: 'error'
                })
              }
            }).catch(e => {
              console.log(e)
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消同步'
          })
        })
      },
      doDepartmentSyncModified() {
        doDepartmentSyncModified().then(resp => {
          if (resp.status === 200) {
            this.$message({
              type: 'info',
              message: '已开始获取变更记录，请稍后查看最新版本号的变更记录！'
            })
          } else {
            this.$message({
              message: resp.data.message,
              type: 'error'
            })
          }
        }).catch(e => {
          console.log(e)
        })
      },
      /* 中间库单个同步 */
      doDepartmentSyncSingle(id, type) {
        if (type === 'local') {
          doDepartmentSyncToLocal(id).then(resp => {
            if (resp.status === 200) {
              this.$message({
                type: 'success',
                message: '中间库同步成功！'
              })
            } else {
              this.$message({
                message: resp.data.message,
                type: 'error'
              })
            }
          }).catch(e => {
            console.log(e)
          })
        } else {
          doDepartmentSyncToWeWork(id).then(resp => {
            if (resp.status === 200) {
              this.$message({
                type: 'success',
                message: '微信同步成功！'
              })
            } else {
              this.$message({
                message: resp.data.message,
                type: 'error'
              })
            }
          }).catch(e => {
            console.log(e)
          })
        }
      },
      /* 查询进度 */
      getDepartmentProgress(type) {
        if (this.changeVersion === '') {
          this.$message({
            type: 'warning',
            message: '请先选择变更版本号',
            duration: 1500
          })
          return
        }
        this.showProcess = true
        if (type === 'local') { // 全部同步到中间库进度
          this.title = '部门同步中间库进度'
          this.timer = setInterval(_ => {
            getDepartmentLocalProgress(this.changeVersion).then(resp => {
              if (resp.status === 200) {
                this.percentage = resp.data.data
              } else {
                this.$message({
                  message: resp.data.message,
                  type: 'error'
                })
              }
            }).catch(e => { console.log(e) })
          }, 1000)
        } else { // 全部同步到微信进度
          this.title = '部门同步微信进度'
          this.timer = setInterval(_ => {
            getDepartmentWeWorkProgress(this.changeVersion).then(resp => {
              if (resp.status === 200) {
                this.percentage = resp.data.data
              } else {
                this.$message({
                  message: resp.data.message,
                  type: 'error'
                })
              }
            }).catch(e => { console.log(e) })
          }, 1000)
        }
      },
      /* 关闭对话框 */
      closeDialog(done) {
        done()
        clearInterval(this.timer)
        this.timer = null
        console.log(this.showProcess)
      }
    }
  }
</script>

<style>
  .btnItem {
    padding: 4px 9px;
    font-size: 12px
  }
</style>
