<template>
  <div class="container">
    <el-form class="searchForm" :inline="true">
      <el-row>
        <el-form-item label="变更类型" label-width="90px">
          <el-select v-model="changeType" style="width: 180px;" placeholder="请选择变更类型" clearable filterable>
            <el-option
              v-for="item in changeTypeList"
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

    <el-table
      :data="pwdChangeList"
      v-loading.body="listLoading"
      element-loading-text="拼命加载中"
      border
      fit
      tooltip-effect="dark"
      highlight-current-row>
      <el-table-column label="变更内容" width="400">
        <template slot-scope="scope">
          {{scope.row.info}}
        </template>
      </el-table-column>
      <el-table-column label="操作者" width="150">
        <template slot-scope="scope">
          {{scope.row.operateName}}
        </template>
      </el-table-column>
      <el-table-column label="变更时间">
        <template slot-scope="scope">
          {{scope.row.createTime}}
        </template>
      </el-table-column>
      <el-table-column label="变更类型" width="150">
        <template slot-scope="scope">
          {{scope.row.changeType === 1 ? '手机号重置' : scope.row.changeType === 2 ? '人脸识别重置' : '人工申诉重置'}}
        </template>
      </el-table-column>
      <el-table-column label="IP地址">
        <template slot-scope="scope">
          {{scope.row.ip}}
        </template>
      </el-table-column>
      <el-table-column label="终端类型">
        <template slot-scope="scope">
          {{scope.row.terminalType}}
        </template>
      </el-table-column>
      <el-table-column label="浏览器类型">
        <template slot-scope="scope">
          {{scope.row.browserType}}
        </template>
      </el-table-column>
      <el-table-column label="浏览器内核">
        <template slot-scope="scope">
          {{scope.row.browserKernel}}
        </template>
      </el-table-column>
      <el-table-column label="用户ID或者微信ID">
        <template slot-scope="scope">
          {{scope.row.openIdOrUserId}}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click.native="checkDetails(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

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
    <el-dialog
      title="变更详情"
      :visible.sync="showDetails"
      width="50%"
      :before-close="handleClose"
      class="details">
      <div v-if="detailsType === 1">
        <el-row :gutter="10" class="detailsItem"><el-col :span="6">账号</el-col><el-col :span="18" class="itemRight">{{details.userAccount}}</el-col></el-row>
        <el-row :gutter="10" class="detailsItem"><el-col :span="6">手机号</el-col><el-col :span="18" class="itemRight">{{details.mobile}}</el-col></el-row>
        <el-row :gutter="10" class="detailsItem"><el-col :span="6">申请时间</el-col><el-col :span="18" class="itemRight">{{details.createTime}}</el-col></el-row>
      </div>
      <div v-if="detailsType === 3">
        <el-row :gutter="10" class="detailsItem"><el-col :span="6">账号</el-col><el-col :span="18" class="itemRight">{{details.account}}</el-col></el-row>
        <el-row :gutter="10" class="detailsItem"><el-col :span="6">姓名</el-col><el-col :span="18" class="itemRight">{{details.userName}}</el-col></el-row>
        <el-row :gutter="10" class="detailsItem"><el-col :span="6">电话</el-col><el-col :span="18" class="itemRight">{{details.mobile}}</el-col></el-row>
        <el-row :gutter="10" class="detailsItem"><el-col :span="6">身份证号</el-col><el-col :span="18" class="itemRight">{{details.idCardNo}}</el-col></el-row>
        <el-row :gutter="10" class="detailsItem">
          <el-col :span="6" style="margin-top: 4rem;">手持身份证</el-col>
          <el-col :span="18" class="itemRight">
            <!--<img src="/static/images/qrcode.jpg" alt="" width="40%">-->
            <img :src="details.handIdCard" alt="" width="40%">
          </el-col>
        </el-row>
        <el-row :gutter="10" class="detailsItem"><el-col :span="6">申请时间</el-col><el-col :span="18" class="itemRight">{{details.createTime}}</el-col></el-row>
        <el-row :gutter="10" class="detailsItem"><el-col :span="6">更新时间</el-col><el-col :span="18" class="itemRight">{{details.updateTime}}</el-col></el-row>
        <el-row :gutter="10" class="detailsItem"><el-col :span="6">审核状态</el-col><el-col :span="18" class="itemRight">{{details.auditStatus}}</el-col></el-row>
        <el-row :gutter="10" class="detailsItem"><el-col :span="6">审核人</el-col><el-col :span="18" class="itemRight">{{details.auditUserName}}</el-col></el-row>
        <el-row :gutter="10" class="detailsItem"><el-col :span="6">审核原因</el-col><el-col :span="18" class="itemRight">{{details.reason}}</el-col></el-row>
      </div>
      <div v-if="detailsType === 2">
        <el-row :gutter="10" class="detailsItem"><el-col :span="6">账号</el-col><el-col :span="18" class="itemRight">{{details.userAccount}}</el-col></el-row>
        <el-row :gutter="10" class="detailsItem">
          <el-col :span="6" style="margin-top: 4rem;">照片1</el-col>
          <el-col :span="18" class="itemRight">
            <!--<img src="/static/images/qrcode.jpg" alt="" width="40%">-->
            <img :src="details.headImg1" alt="" width="40%">
          </el-col>
        </el-row>
        <el-row :gutter="10" class="detailsItem">
          <el-col :span="6" style="margin-top: 4rem;">照片2</el-col>
          <el-col :span="18" class="itemRight">
            <!--<img src="/static/images/qrcode.jpg" alt="" width="40%">-->
            <img :src="details.headImg2" alt="" width="40%">
          </el-col>
        </el-row>
        <el-row :gutter="10" class="detailsItem">
          <el-col :span="6" style="margin-top: 4rem;">照片3</el-col>
          <el-col :span="18" class="itemRight">
            <!--<img src="/static/images/qrcode.jpg" alt="" width="40%">-->
            <img :src="details.headImg3" alt="" width="40%">
          </el-col>
        </el-row>
        <el-row :gutter="10" class="detailsItem"><el-col :span="6">申请时间</el-col><el-col :span="18" class="itemRight">{{details.createTime}}</el-col></el-row>
        <el-row :gutter="10" class="detailsItem"><el-col :span="6">验证状态</el-col><el-col :span="18" class="itemRight">{{details.result}}</el-col></el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showDetails = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { list, getInfo } from '@/api/passwordChangeLog'

  export default {
    name: 'passwordChangeLog',
    data() {
      return {
        pwdChangeList: [],
        changeTypeList: [
          {
            value: 1,
            label: '手机号重置'
          },
          {
            value: 2,
            label: '人脸识别重置'
          },
          {
            value: 3,
            label: '人工申诉重置'
          },
          {
            value: 4,
            label: '密码初始化'
          }
        ],
        changeType: null,
        pageNum: 1,
        pageSize: 10,
        listLoading: false,
        searchLoading: false,
        showDetails: false,
        details: {},
        detailsType: null
      }
    },
    mounted() {
      this.fetchData(null, this.pageNum, this.pageSize)
    },
    methods: {
      /* 初始化角色列表 */
      fetchData(changeType, pageNum, pageSize) {
        this.listLoading = true
        return list(
          changeType,
          pageNum,
          pageSize
        ).then(resp => {
          this.pwdChangeList = resp.data.data.rows
          this.total = resp.data.data.total
          this.pageNum = resp.data.data.pageNum
          this.pageSize = resp.data.data.pageSize
          this.listLoading = false
          return resp
        }).catch(e => {
          this.listLoading = false
        })
      },
      handleSizeChange(pageSize) {
        this.pageNum = 1
        this.pageSize = pageSize
        this.fetchData(this.changeType, this.pageNum, this.pageSize)
      },
      /* table表格当前页事件 */
      handleCurrentPageChange(currentPage) {
        this.pageNum = currentPage
        this.fetchData(this.changeType, this.pageNum, this.pageSize)
      },
      /* 查询 */
      search() {
        this.searchLoading = true
        this.fetchData(this.changeType, this.pageNum, this.pageSize).then((resp) => {
          this.searchLoading = false
        })
      },
      /* 重置表单 */
      resetForm(formName) {
        this.changeType = ''
      },
      checkDetails(val) {
        this.detailsType = val.changeType
        this.showDetails = true
        getInfo(val.id).then(resp => {
          this.details = resp.data.data
        })
      },
      handleClose(done) {
        done()
      }
    }
  }
</script>
<style>
  .details .detailsItem {
    padding: 1rem;
  }
  .details .detailsItem .itemRight {
    text-align: center;
  }
</style>
