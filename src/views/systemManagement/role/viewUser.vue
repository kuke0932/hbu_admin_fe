<template>
  <el-dialog
    title="查看用户"
    :visible.sync="_visible"
    width="80%"
    @close="close"
    :before-close="handleClose">
  <div class="container"
       v-loading="formLoading"
       element-loading-text="拼命加载中">
    <el-form>
      <el-row>
        <el-col :span="8">
          <el-form-item label-width="70px" label="登录名">
            <el-input style='min-width:120px;' v-model="searchLoginName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label-width="80px" label="用户昵称">
            <el-input style='min-width:120px;' v-model="searchUserName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-button style="margin-left: 20px;" type="primary" :loading="btnSearchLoading" @click="searchUser">查询</el-button>
        </el-col>
      </el-row>
      <div class="btn_box">
        <el-button class="el-button--primary" code="add" @click="goAddRoleUser">添加角色用户</el-button>
        <el-button class="el-button--danger" code="remove" :disabled="editDisabled" :loading="btnRemoveLoading" @click="deleteRoleUser">删除角色用户</el-button>
      </div>
      <el-dialog
        title="添加角色用户"
        :visible.sync="dialogVisible"
        width="80%"
        append-to-body
        :before-close="handleClose">
        <el-row v-loading="addFormLoading"
                :element-loading-text="addTextLoading">
          <el-col :span="5">
            <h4 style="margin-top: 0;color:#606266;font-size: 18px;font-weight: normal; margin-top: 5%">部门列表</h4>
            <el-scrollbar class="scrollbar"  :style="{ height: treeHeight + 'px' }" >
              <el-tree
                :data="departmentTree"
                node-key="id"
                ref="tree"
                highlight-current
                default-expand-all
                :expand-on-click-node="true"
                :props="defaultProps"
                @node-click="handleNodeClick">
              </el-tree>
            </el-scrollbar>
          </el-col>
          <el-col :span="18">
            <el-form>
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="70px" label="登录名">
                    <el-input v-model="searchUnLoginName" style='min-width:120px;'></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="9">
                  <el-form-item label-width="80px" label="用户昵称">
                    <el-input v-model="searchUnUserName" style='min-width:120px;'></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-button style="margin-left: 20px;" type="primary"  @click="searchUnUser" :loading="btnAddSearchLoading">查询</el-button>
                </el-col>
              </el-row>
              <el-table
                :data="userList"
                v-loading="addTableListLoading"
                element-loading-text="拼命加载中"
                border
                fit
                tooltip-effect="dark"
                highlight-current-row
                @selection-change="handleSelectionChange">
                <el-table-column
                  type="selection"
                  width="50">
                </el-table-column>
                <el-table-column label="登录名">
                  <template slot-scope="scope">
                    {{scope.row.loginName}}
                  </template>
                </el-table-column>
                <el-table-column label="部门">
                  <template slot-scope="scope">
                    {{scope.row.departmentName}}
                  </template>
                </el-table-column>
                <el-table-column label="用户昵称">
                  <template slot-scope="scope">
                    {{scope.row.userName}}
                  </template>
                </el-table-column>
                <el-table-column label="手机号">
                  <template slot-scope="scope">
                    {{scope.row.mobile}}
                  </template>
                </el-table-column>
                <el-table-column label="状态">
                  <template slot-scope="scope">
                    {{scope.row.enableStatus == 0 ? '禁用' : '启用'}}
                  </template>
                </el-table-column>
              </el-table>
              <el-button class="el-button--primary" size="small" code="save" :loading="btnAddSubmitLoading" @click="saveAddUser" style="float: left; margin-top:5%; margin-left: 30%;">保存</el-button>
              <el-pagination
                style="float:right;margin-top: 15px;"
                background
                layout="prev, pager, next"
                :total="unTotal"
                :page-size="unPageSize"
                @current-change="handleCurrentPageChangeUser">
              </el-pagination>
            </el-form>
          </el-col>
        </el-row>
      </el-dialog>
      <el-table
        :data="roleUserList"
        v-loading="listLoading"
        element-loading-text="拼命加载中"
        border
        fit
        tooltip-effect="dark"
        highlight-current-row
        @selection-change="handleRemoveSelection">
        <el-table-column
          type="selection"
          width="50">
        </el-table-column>
        <el-table-column
          prop="loginName"
          label="登录名"
          width="180">
        </el-table-column>
        <el-table-column label="部门">
          <template slot-scope="scope">
            {{scope.row.departmentName}}
          </template>
        </el-table-column>
        <el-table-column label="用户昵称">
          <template slot-scope="scope">
            {{scope.row.userName}}
          </template>
        </el-table-column>
        <el-table-column label="手机号">
          <template slot-scope="scope">
            {{scope.row.mobile}}
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{scope.row.enableStatus == 0 ? '禁用' : '启用'}}
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="float:right;margin-top: 15px;"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        @current-change="handleCurrentPageChangeRole">
      </el-pagination>
    </el-form>
  </div>
  </el-dialog>
</template>

<script>
  import { authMenuButton } from '@/utils/authMenuButton'
  import { showRoleUsers, listUser, addUserToRole, removeUserFromRole } from '@/api/role'
  import { tree } from '@/api/department'
  export default {
    name: 'checkUser',
    props: {
      roleId: {
        type: Number,
        required: true
      },
      visible: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
        treeHeight: 0,
        total: -1,
        unTotal: -1,
        pageNum: 1,
        pageSize: 10,
        unPageNum: 1,
        unPageSize: 10,
        userList: null,
        multipleSelection: [],
        removeSelection: [],
        departmentTree: null,
        searchLoginName: null,
        searchUserName: null,
        searchUnUserName: null,
        searchUnLoginName: null,
        roleUserList: null,
        listLoading: false, // 表格loading
        formLoading: false, // 对话框loading
        btnSearchLoading: false, // 查询按钮loading
        addFormLoading: false, // 添加对话框loading
        addTableListLoading: false, // 添加对话框里的表格loading
        btnAddSearchLoading: false, // 添加对话框里的查询按钮loading
        addTextLoading: '正在加载......', // 添加对话框里的查询按钮loading
        btnAddSubmitLoading: false, // 添加对话框里的查询按钮loading
        btnRemoveLoading: false, // 删除角色用户 按钮loading
        treeVisible: false,
        dialogVisible: false,
        editDisabled: false,
        addForm: {
          roleName: '',
          roleDes: ''
        },
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    computed: {
      _visible: {
        get: function() {
          return this.visible
        },
        set: function(val) {
        }
      }
    },
    watch: {
      roleId(val) {
        this.formLoading = true
        this.fetchData(this.roleId, null, null, this.pageNum, this.pageSize).then((resp) => {
          this.formLoading = false
        })
        this.initDepartmentTree()
      }
    },
    created() {
      this.treeHeight = document.body.clientHeight - 500
    },
    mounted() {
      authMenuButton(location.hash.substring(2))
      this.fetchData(this.roleId, null, null, this.pageNum, this.pageSize)
      this.initDepartmentTree()
    },
    methods: {
      close() {
        this.$emit('update:visible', false)
      },
      /* 初始化用户列表 */
      fetchData(roleId, loginName, userName, pageNum, pageSize) {
        this.listLoading = true
        return showRoleUsers(
          roleId,
          loginName,
          userName,
          pageNum,
          pageSize
        ).then(response => {
          this.roleUserList = response.data.data.rows
          this.roleUserList.forEach((e, i) => { e['idx'] = i })
          this.total = response.data.data.total
          this.pageNum = response.data.data.pageNum
          this.pageSize = response.data.data.pageSize
          this.listLoading = false
          return response
        }).catch(e => {
          this.listLoading = false
        })
      },
      /* 查询角色下用户 */
      searchUser() {
        this.btnSearchLoading = true
        this.fetchData(this.roleId, this.searchLoginName, this.searchUserName, this.pageNum, this.pageSize).then((resp) => {
          this.btnSearchLoading = false
        })
      },
      /* 查询未在角色下用户 */
      searchUnUser() {
        this.btnAddSearchLoading = true
        this.getUserList(this.roleId, this.departmentId, this.searchUnLoginName, this.searchUnUserName, 3, this.pageNum, this.pageSize).then((resp) => {
          this.btnAddSearchLoading = false
        })
      },
      /* 初始化部门树 */
      initDepartmentTree() {
        tree().then(response => {
          this.departmentTree = response.data.data
        })
      },
      /* 获取部门下用户信息 */
      getUserList(roleId, departmentId, loginName, userName, showOrAdd = 3, pageNum, pageSize) {
        this.addTableListLoading = true
        return listUser(
          roleId,
          departmentId,
          loginName,
          userName,
          showOrAdd,
          pageNum,
          pageSize
        ).then(response => {
          this.userList = response.data.data.rows
          this.userList.forEach((e, i) => { e['idx'] = i })
          this.unTotal = response.data.data.total
          this.unPageNum = response.data.data.pageNum
          this.unPageSize = response.data.data.pageSize
          this.addTableListLoading = false
          return response
        }).catch(e => {
          this.addTableListLoading = false
        })
      },
      /* 角色用户表格当前页事件 */
      handleCurrentPageChangeRole(currentPage) {
        this.pageNum = currentPage
        this.fetchData(this.roleId, this.searchLoginName, this.searchUserName, this.pageNum, this.pageSize)
      },
      /* 添加用户列表 */
      handleCurrentPageChangeUser(currentPage) {
        this.unPageNum = currentPage
        this.getUserList(this.roleId, this.departmentId, this.searchUnLoginName, this.searchUnUserName, 3, this.unPageNum, this.unPageSize)
      },
      /* 树点击事件，拿当前node的id */
      handleNodeClick(data) {
        this.departmentId = data.id
        if (!data.parentId) {
          this.departmentId = null
        }
        this.getUserList(this.roleId, this.departmentId, null, null, 3, this.unPageNum, this.unPageSize)
      },
      /* 获取所要添加的用户 */
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      /* 获取所要删除的用户 */
      handleRemoveSelection(val) {
        this.removeSelection = val
        if (val.length > 0) {
          val.forEach(v => {
            if (v.id === 1) {
              this.editDisabled = true
            } else {
              this.editDisabled = false
            }
          })
        } else {
          this.editDisabled = false
        }
      },
      /* 打开添加角色用户 */
      goAddRoleUser() {
        this.dialogVisible = true
        this.addFormLoading = true
        this.getUserList(this.roleId, this.departmentId, null, null, 3, this.unPageNum, this.unPageSize).then((resp) => {
          this.addFormLoading = false
        })
      },
      saveAddUser() {
        if (this.multipleSelection.length < 1) {
          this.$message({
            type: 'warning',
            message: '请至少选中一行再执行此操作',
            duration: '2000'
          })
          return
        }
        this.$confirm('确定保存？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.addFormLoading = true
          this.addTextLoading = '正在提交...'
          this.btnAddSubmitLoading = true
          const rows = this.multipleSelection
          const ids = []
          for (let i = 0; i < rows.length; i++) {
            ids.push(rows[i].id)
          }
          addUserToRole(this.roleId, ids.join(',')).then(() => {
            this.$message({
              type: 'success',
              message: '保存成功',
              duration: 1000,
              onClose: () => {
                this.fetchData(this.roleId, this.searchLoginName, this.searchUserName, this.pageNum, this.pageSize).then((resp) => {
                  this.addFormLoading = false
                  this.addTextLoading = '正在加载...'
                  this.btnAddSubmitLoading = false
                })
                this.dialogVisible = false
              }
            })
          }).catch(e => {
            this.addFormLoading = false
            this.addTextLoading = '正在加载...'
            this.btnAddSubmitLoading = false
          })
        })
      },
      /* 删除角色用户 */
      deleteRoleUser() {
        if (this.removeSelection.length < 1) {
          this.$message({
            type: 'warning',
            message: '请至少选中一行再执行此操作',
            duration: '2000'
          })
          return
        }
        this.$confirm('此操作将永久删除该角色，是否继续', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.btnRemoveLoading = true
          this.listLoading = true
          const rows = this.removeSelection
          const ids = []
          for (let i = 0; i < rows.length; i++) {
            ids.push(rows[i].id)
          }
          removeUserFromRole(this.roleId, ids.join(',')).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功',
              duration: 1000,
              onClose: () => {
                this.fetchData(this.roleId, this.searchLoginName, this.searchUserName, this.pageNum, this.pageSize).then((resp) => {
                  this.btnRemoveLoading = false
                  this.listLoading = false
                })
              }
            })
          }).catch(e => {
            this.btnRemoveLoading = false
            this.listLoading = false
          })
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      handleClose(done) {
        if (this.formLoading === true || this.btnSearchLoading === true || this.addFormLoading === true || this.btnAddSubmitLoading === true) {
          return
        }
        this.$confirm('确认关闭吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          done()
        }).catch(() => {

        })
      }
    }
  }
</script>
<style scoped>
  .el-tree{
    border: 1px solid #f2f2f2;
    margin-top: 3px;
  }
  .el-table--border, .el-table--group{
    margin-left: 10px;
    margin-top: 7px;
  }
</style>
