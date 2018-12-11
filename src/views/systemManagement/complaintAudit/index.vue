<template>
  <div class="container">
    <el-form ref="searchForm" :model="searchForm" class="searchForm" :inline="true">
      <el-row>
        <el-form-item label-width="82px" label="审核人账号" prop="auditorAccount">
          <el-input v-model="searchForm.auditorAccount" style="width: 162px;"></el-input>
        </el-form-item>
        <el-form-item label-width="96px" label="审核人手机号" prop="auditorTelephone">
          <el-input v-model="searchForm.auditorTelephone" style="width: 162px;"></el-input>
        </el-form-item>
        <el-form-item label="审核状态" label-width="68px" prop="auditorState">
          <el-select v-model="searchForm.auditorState" style="width: 180px;" placeholder="请选择审核状态" clearable filterable>
            <el-option
              v-for="item in auditorStateList"
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

    <detail :visible.sync="detailDialogVisible" :id="id"></detail>

    <el-dialog
      title="审核不通过"
      :visible.sync="noPassDialogVisible"
      width="40%"
      :before-close="handleClose">
      <el-form ref="noPassForm" :rules="rules" :model="noPassForm" label-width="120px"
               v-loading="noPassFormLoading"
               :element-loading-text="loadingText">
        <el-form-item label="不通过原因" prop="reason">
          <el-input type="textarea" clearable v-model="noPassForm.reason"></el-input>
        </el-form-item>

        <el-form-item class="btn_box">
          <el-button type="primary" :loading="submitLoading" @click="submitForm('noPassForm')">提交</el-button>
          <el-button @click="resetForm('noPassForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-table
      :data="complaintAuditList"
      v-loading.body="listLoading"
      element-loading-text="拼命加载中"
      border
      fit
      tooltip-effect="dark"
      highlight-current-row>
      <el-table-column label="账号">
        <template slot-scope="scope">
          {{scope.row.account}}
        </template>
      </el-table-column>
      <el-table-column label="手机号">
        <template slot-scope="scope">
          {{scope.row.mobile}}
        </template>
      </el-table-column>
      <el-table-column label="姓名">
        <template slot-scope="scope">
          {{scope.row.userName}}
        </template>
      </el-table-column>
      <el-table-column label="身份证号">
        <template slot-scope="scope">
          {{scope.row.idCardNo}}
        </template>
      </el-table-column>
      <el-table-column label="手持身份证照片">
        <template slot-scope="scope">
          {{scope.row.handIdCard}}
        </template>
      </el-table-column>
      <el-table-column label="申请时间">
        <template slot-scope="scope">
          {{scope.row.createTime}}
        </template>
      </el-table-column>
      <el-table-column label="审核状态" :formatter="tableFormatter">
        <!--<template slot-scope="scope">-->
          <!--{{scope.row.auditStatus}}-->
        <!--</template>-->
      </el-table-column>
      <el-table-column label="审核人">
        <template slot-scope="scope">
          {{scope.row.auditUserName}}
        </template>
      </el-table-column>
      <el-table-column label="审核时间">
        <template slot-scope="scope">
          {{scope.row.updateTime}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" style="margin-right: 2px;padding: 7px 6px;margin-left: 0;" size="small" v-if="scope.row.auditStatus === 1" @click.native="doPass(scope.row.id)">通过</el-button>
          <el-button type="primary" style="margin-right: 2px;padding: 7px 6px;margin-left: 0;"size="small" v-if="scope.row.auditStatus === 1" @click.native="noPassDialog(scope.row.id)">不通过</el-button>
          <el-button type="primary" style="margin-right: 2px;padding: 7px 6px;margin-left: 0;"size="small" @click.native="goDetail(scope.row.id)">详情</el-button>
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
  </div>
</template>

<script>
  import { list, audit } from '@/api/complaintAudit'
  import Detail from './detail'

  export default {
    name: 'complaintAudit',
    components: {
      Detail
    },
    data() {
      return {
        complaintAuditList: [],
        searchForm: {
          auditorAccount: '',
          auditorTelephone: '',
          auditorState: ''
        },
        noPassForm: {
          id: '',
          reason: ''
        },
        auditorStateList: [{
          value: 1,
          label: '待审核'
        }, {
          value: 2,
          label: '通过审核'
        }, {
          value: 3,
          label: '未通过审核'
        }],
        searchLoading: false,
        total: 0,
        pageNum: 1,
        pageSize: 10,
        listLoading: false,
        detailDialogVisible: false,
        noPassDialogVisible: false,
        rules: {
          reason: [
            { required: true, message: '请输入原因', trigger: 'blur' }
          ]
        }
      }
    },
    mounted() {
      this.fetchData(null, null, null, this.pageNum, this.pageSize)
    },
    methods: {
      /* 查询列表 */
      fetchData(account, mobile, auditStatus, pageNum, pageSize) {
        this.listLoading = true
        return list(
          account,
          mobile,
          auditStatus,
          pageNum,
          pageSize
        ).then(response => {
          this.complaintAuditList = response.data.data.rows
          this.total = response.data.data.total
          this.pageNum = response.data.data.pageNum
          this.pageSize = response.data.data.pageSize
          this.listLoading = false
          this.searchLoading = false
          return response
        }).catch(e => {
          this.listLoading = false
          this.searchLoading = false
        })
      },
      search() {
        this.searchLoading = true
        this.fetchData(this.searchForm.auditorAccount, this.searchForm.auditorTelephone, this.searchForm.auditorState, this.pageNum, this.pageSize)
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
        this.fetchData(this.searchForm.auditorAccount, this.searchForm.auditorTelephone, this.searchForm.auditorState, this.pageNum, this.pageSize)
      },
      /* table表格当前页事件 */
      handleCurrentPageChange(currentPage) {
        this.pageNum = currentPage
        this.fetchData(this.searchForm.auditorAccount, this.searchForm.auditorTelephone, this.searchForm.auditorState, this.pageNum, this.pageSize)
      },
      goDetail(id) {
        this.id = id
        this.detailDialogVisible = true
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      noPassDialog(id) {
        this.noPassDialogVisible = true
        this.noPassForm.id = id
      },
      /* 不通过审核-确定按钮 */
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('确定不通过审核吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.submitLoading = true
              this.noPassFormLoading = true
              this.loadingText = '正在提交......'
              audit(
                this.noPassForm.id,
                3,
                this.noPassForm.reason
              ).then(() => {
                this.$message({
                  type: 'success',
                  message: '填写成功!',
                  duration: 1000,
                  onClose: () => {
                    this.fetchData().then((resp) => {
                      this.noPassFormLoading = false
                      this.submitLoading = false
                      this.loadingText = '拼命加载中......'
                    })
                    this.$refs[formName].resetFields()
                    this.dialogVisible = false
                    this.parentMenuId = null
                  }
                })
              }).catch(e => {
                this.noPassFormLoading = false
                this.submitLoading = false
                this.loadingText = '拼命加载中......'
              })
            }).catch(e => {
              this.noPassFormLoading = false
              this.submitLoading = false
              this.loadingText = '拼命加载中......'
            })
          }
        })
      },
      /* 通过审核 */
      doPass(id) {
        this.$confirm('确定通过审核吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.listLoading = true
          audit(
            id,
            2,
            null
          ).then(response => {
            this.$message({
              type: 'success',
              message: '审核成功',
              duration: 1000,
              onClose: () => {
                this.fetchData(
                  this.searchForm.auditorAccount,
                  this.searchForm.auditorTelephone,
                  this.searchForm.auditorState,
                  this.pageNum,
                  this.pageSize
                ).then((resp) => {
                  this.listLoading = false
                })
              }
            })
          }).catch(e => {
            this.listLoading = false
          })
        })
      },
      tableFormatter(row, column, cellValue, index) {
        if (row.auditStatus) {
          return this.auditorStateList[row.auditStatus - 1].label
        }
      }
    }
  }
</script>

<style scoped>
</style>
