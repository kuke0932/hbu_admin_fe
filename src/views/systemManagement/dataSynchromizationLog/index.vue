<template>
  <div class="container">
    <el-form class="searchForm" :inline="true">
      <el-row>
        <el-form-item label="时间" label-width="42px">
          <el-date-picker
            v-model="searchForm.operateDate"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" clearable placeholder="请选择状态">
            <!--<el-option label="进行中" value="DEFAULT"></el-option>-->
            <el-option label="成功" value="TRUE"></el-option>
            <el-option label="失败" value="FALSE"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="变更类型">
          <el-select v-model="searchForm.dataVersionType" placeholder="请选择变更类型">
            <el-option label="部门" value="DEPARTMENT" selected></el-option>
            <el-option label="用户" value="USER"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="search" :loading="searchLoading">查询</el-button>
      </el-row>
    </el-form>
    <!--<div class="btn_box">-->
      <!--<el-button class="el-button&#45;&#45;primary " code="" @click="goDoSyncToLocal"><i class="el-icon-refresh"></i>&nbsp;正方数据同步数据到本地</el-button>-->
      <!--<el-button class="el-button&#45;&#45;primary " code="" @click="goDoSyncToWeWork"><i class="el-icon-refresh"></i>&nbsp;同步数据企业到微信</el-button>-->
      <!--<el-button class="el-button&#45;&#45;primary " code="" @click="searchProcess(1)"><i class="el-icon-search"></i>&nbsp;查看同步数据到本地进度</el-button>-->
      <!--<el-button class="el-button&#45;&#45;primary " code="" @click="searchProcess(2)"><i class="el-icon-search"></i>&nbsp;查看同步数据到微信进度</el-button>-->
    <!--</div>-->
    <el-table
      :data="dataSynList"
      v-loading.body="listLoading"
      element-loading-text="拼命加载中"
      border
      fit
      tooltip-effect="dark"
      highlight-current-row>
      <el-table-column label="变更内容">
        <template slot-scope="scope">
          {{scope.row.info}}
        </template>
      </el-table-column>
      <el-table-column label="操作者">
        <template slot-scope="scope">
          {{scope.row.operateName}}
        </template>
      </el-table-column>
      <el-table-column label="获取变更起止时间">
        <template slot-scope="scope">
          {{scope.row.beginTime}} 至 {{scope.row.endTime}}
        </template>
      </el-table-column>
      <el-table-column label="是否成功">
        <template slot-scope="scope">
          {{scope.row.status === 'DEFAULT' ? '进行中' : scope.row.status === 'TRUE' ? '成功' : '失败' }}
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="title"
      :visible.sync="showProcess"
      width="60%"
      :before-close="handleClose"
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
  import { listSyncLog } from '@/api/dataSynchronizationLog'

  export default {
    name: 'dataSynchronizationLog',
    data() {
      return {
        dataSynList: [],
        searchForm: {
          operateDate: '',
          status: '',
          dataVersionType: 'DEPARTMENT'
        },
        searchLoading: false,
        pageNum: 1,
        pageSize: 10,
        listLoading: false,
        title: '',
        percentage: 0,
        showProcess: false
      }
    },
    mounted() {
      this.fetchData('', '', this.searchForm.dataVersionType, this.pageNum, this.pageSize)
    },
    methods: {
      /* 初始化角色列表 */
      fetchData(operateDate, status, dataVersionType, pageNum, pageSize) {
        this.listLoading = true
        return listSyncLog(
          operateDate,
          status,
          dataVersionType,
          pageNum,
          pageSize
        ).then(resp => {
          this.dataSynList = resp.data.data.rows
          this.total = resp.data.data.total
          this.pageNum = resp.data.data.pageNum
          this.pageSize = resp.data.data.pageSize
          this.listLoading = false
          this.searchLoading = false
          return resp
        }).catch(e => {
          this.listLoading = false
          this.searchLoading = false
        })
      },
      search() {
        this.searchLoading = true
        this.fetchData(this.searchForm.operateDate, this.searchForm.status, this.searchForm.dataVersionType, this.pageNum, this.pageSize)
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          }).catch(_ => {})
      },
      handleSizeChange(pageSize) {
        this.pageNum = 1
        this.pageSize = pageSize
        this.fetchData(this.searchForm.operateDate, this.searchForm.status, this.searchForm.dataVersionType, this.pageNum, this.pageSize)
      },
      /* table表格当前页事件 */
      handleCurrentPageChange(currentPage) {
        this.pageNum = currentPage
        this.fetchData(this.searchForm.operateDate, this.searchForm.status, this.searchForm.dataVersionType, this.pageNum, this.pageSize)
      }
    }
  }
</script>

<style scoped>
</style>
