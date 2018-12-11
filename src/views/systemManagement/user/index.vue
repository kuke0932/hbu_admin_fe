<template>
  <div class="container my-container">
    <el-row style="border-bottom: 0;" class="my-el-row">
    <el-col :span="4" style="min-width:190px" class="my-el-tree-col4">
      <h4 class="treeTitle">部门列表</h4>
      <el-scrollbar class="scrollbar"  :style="{ height: treeHeight + 'px' }" >
        <el-tree
          :data="departmentTree"
          v-loading.body="treeLoading"
          element-loading-text="拼命加载中"
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
    <el-col :span="19" style="margin-left: 20px; padding-top: 37px;">
      <el-form ref="searchForm"  class="searchForm" :inline="true" :model="searchForm">
        <el-row>
            <el-form-item label-width="70px" label="登录名" prop="searchLoginName">
              <el-input v-model="searchForm.searchLoginName" style="width: 162px;"></el-input>
            </el-form-item>
            <el-form-item label-width="80px" label="用户昵称" prop="searchUserName">
              <el-input v-model="searchForm.searchUserName" style="width: 162px;"></el-input>
            </el-form-item>
            <el-button type="primary"  @click="search" :loading="searchLoading">查询</el-button>
            <el-button type="primary" @click="resetForm('searchForm')">重置</el-button>
        </el-row>
      </el-form>
      <div class="btn_box">
        <el-button class="el-button--primary hidden" code="add" @click="goAddUser"><i class="el-icons-jd-add"></i>&nbsp;添加用户</el-button>
        <el-button class="el-button--primary hidden" :disabled="editDisabled" code="edit" @click="goEditUser"><i class="el-icons-jd-xiugai1"></i>&nbsp;修改用户</el-button>
        <el-button class="el-button--danger hidden" :disabled="editDisabled" code="remove" :loading="removeLoading" @click="deleteUser"><i class="el-icons-jd-shanchu"></i>&nbsp;删除用户</el-button>
        <el-button class="el-button--primary hidden" code="setManageDepartment" @click="goSetManageDepartment"><i class="el-icons-jd-xiugai1"></i>&nbsp;设置管理部门</el-button>
      </div>
      <el-dialog
        title="添加用户"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
        <el-popover
          ref="popoverTree"
          placement="bottom-start"
          title="部门列表"
          width="400"
          trigger="click">
          <el-tree
            :data="departmentTree"
            ref="treeAdd"
            show-checkbox
            node-key="id"
            highlight-current
            :props="defaultProps"
            :expand-on-click-node='false'
            :check-strictly='true'
            @check-change="currentDepartmentAdd">
          </el-tree>
        </el-popover>
        <el-form ref="addForm" :rules="rules" :model="addForm" label-width="80px"
                 v-loading="addFormLoading"
                 :element-loading-text="loadingText">
          <el-form-item label="登录名" prop="loginName">
            <el-input v-model="addForm.loginName"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="loginPwd">
            <el-input type="password" v-model="addForm.loginPwd"></el-input>
          </el-form-item>
          <el-form-item label="部门" prop="department">
            <el-input v-model="addForm.department" v-popover:popoverTree readonly></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="userName">
            <el-input v-model="addForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="角色列表" prop="roleList">
            <el-select v-model="addForm.roles" multiple placeholder="请选择角色" @change="selectRolesInAdd" >
              <el-option
                v-for="item in roleList"
                :key="item.id"
                :label="item.roleName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="addForm.mobile" maxlength="11" onkeyup="this.value=this.value.replace(/[^0-9.]/g,'')"></el-input>
          </el-form-item>
          <el-form-item label="座机号" prop="telephone">
            <el-input v-model="addForm.telephone" maxlength="11" onkeyup="this.value=this.value.replace(/[^0-9.]/g,'')"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱" prop="email">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>
          <el-form-item class="btn_box">
            <el-button type="primary" :loading="submitLoading" @click="submitForm('addForm')">提交</el-button>
            <el-button @click="resetForm('addForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog
        title="修改用户"
        :visible.sync="editDialogVisible"
        width="40%"
        :before-close="handleClose">
        <el-popover
          ref="popoverTree"
          placement="bottom-start"
          title="部门列表"
          width="400"
          trigger="click">
          <el-tree
            :data="departmentTree"
            ref="treeEdit"
            show-checkbox
            node-key="id"
            highlight-current
            :props="defaultProps"
            :expand-on-click-node='false'
            :check-strictly='true'
            @check-change="currentDepartmentEdit">
          </el-tree>
        </el-popover>
        <el-form ref="editForm"
                 :rules="rules"
                 :model="editForm"
                 label-width="80px"
                 v-loading="editFormLoading"
                 :element-loading-text="loadingText">
          <el-form-item label="登录名">
            <el-input v-model="editForm.loginName" readonly></el-input>
          </el-form-item>
          <el-form-item label="部门" prop="department">
            <el-input v-model="editForm.department" v-popover:popoverTree readonly></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="userName">
            <el-input v-model="editForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="角色列表" prop="roleList">
            <el-select v-model="editForm.roles" multiple placeholder="请选择角色" @change="selectRolesInEdit" >
              <el-option
                v-for="item in roleList"
                :key="item.id"
                :label="item.roleName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="editForm.mobile" maxlength="11" onkeyup="this.value=this.value.replace(/[^0-9.]/g,'')"></el-input>
          </el-form-item>
          <el-form-item label="座机号" prop="telephone">
            <el-input v-model="editForm.telephone" maxlength="11" onkeyup="this.value=this.value.replace(/[^0-9.]/g,'')"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱" prop="email">
            <el-input v-model="editForm.email"></el-input>
          </el-form-item>
          <el-form-item class="btn_box">
            <el-button type="primary" @click="submitForm('editForm')">提交</el-button>
            <el-button @click="resetForm('editForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <el-table
        :data="userList"
        v-loading.body="listLoading"
        element-loading-text="拼命加载中"
        ref="multipleTable"
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
            {{scope.row.status == 0 ? '禁用' : '启用'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="200">
          <template slot-scope="scope">
            <el-popover v-if="scope.row.id !== 1"
              placement="top-start"
              width="100"
              trigger="hover"
              content="修改用户">
              <el-button class="icon-btn hidden" slot="reference" type="text" code="edit" icon="el-icons-jd-xiugai1" @click="goEditUserLine(scope.row.id, scope.row)"></el-button>
            </el-popover>
            <el-popover v-if="scope.row.id !== 1 && scope.row.status === 0"
                        placement="top-start"
                        width="100"
                        trigger="hover"
                        content="启用用户">
              <el-button class="icon-btn hidden" slot="reference"  type="text" code="enable" icon="el-icons-jd-qiyong" @click="checkStatus(scope.$index, scope.row.id, scope.row.status)"></el-button>
            </el-popover>
            <el-popover v-if="scope.row.id !== 1 && scope.row.status === 1"
                        placement="top-start"
                        width="100"
                        trigger="hover"
                        content="禁用用户">
              <el-button class="icon-btn hidden" slot="reference" type="text" code="disable" icon="el-icons-jd-jinyong" @click="checkStatus(scope.$index, scope.row.id, scope.row.status)"></el-button>
            </el-popover>
            <el-popover v-if="scope.row.id !== 1"
                        placement="top-start"
                        width="100"
                        trigger="hover"
                        content="重置密码">
              <el-button class="icon-btn hidden" slot="reference" type="text" code="resetPassword" icon="el-icons-jd-chongzhimima" @click="goResetPassword(scope.row.id)"></el-button>
            </el-popover>
            <el-popover
                        placement="top-start"
                        width="100"
                        trigger="hover"
                        content="设置管理部门">
              <el-button class="icon-btn hidden" slot="reference" type="text" code="setManageDepartment" icon="el-icons-jd-role-setting" @click="setManageDepartmentLine(scope.row.id)"></el-button>
            </el-popover>

          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="重置密码"
        :visible.sync="resetPasswordVisible"
        width="30%"
        :before-close="handleClose">
        <el-form ref="resetPasswordForm" :rules="resetRules" :model="resetPasswordForm" label-width="80px"
                 v-loading="resetPwdLoading"
                 :element-loading-text="loadingText">
          <el-form-item label="密码" prop="loginPwd">
            <el-input type="password" v-model="resetPasswordForm.loginPwd" onfocus="changeIptType()" auto-complete="off" placeholder="请输入6位以上密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="submitLoading" @click="resetSubmit('resetPasswordForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-pagination
        style="margin-top: 15px;"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentPageChange"
        :current-page.sync="pageNum"
        :page-sizes="[10, 15, 20, 25, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-col>
  </el-row>
  </div>
</template>

<script>
  import { addUser, updateUser, removeUser, getUserById, listUser, updateStatus, resetPassword } from '@/api/user'
  import { tree } from '@/api/department'
  import { authMenuButton } from '@/utils/authMenuButton'
  import { listRole } from '@/api/role'
  export default {
    name: 'user',
    components: {
    },
    data() {
      return {
        treeHeight: 0,
        total: -1,
        pageNum: 1,
        pageSize: 10,
        userId: 0,
        userList: null,
        multipleSelection: [],
        departmentId: null,
        searchForm: {
          searchLoginName: '',
          searchUserName: ''
        },
        editDisabled: false,
        treeLoading: false, // 左侧树
        listLoading: false,
        searchLoading: false,
        addFormLoading: false, // 添加对话框
        editFormLoading: false, // 修改对话框
        loadingText: '拼命加载中......', // 提示的文字
        submitLoading: false, // 提交按钮
        removeLoading: false, // 删除按钮
        treeDepLoading: false, // 组件里部门树
        resetPwdLoading: false, // 重置密码表单
        departmentTree: null,
        dialogVisible: false,
        editDialogVisible: false,
        resetPasswordVisible: false,
        setManageDepartmentVisible: false,
        roleList: [],
        addForm: {
          loginName: '',
          loginPwd: '',
          department: '',
          userName: '',
          mobile: '',
          telephone: '',
          email: '',
          roles: '',
          roleIds: ''
        },
        editForm: {
          department: '',
          userName: '',
          mobile: '',
          telephone: '',
          email: '',
          roles: '',
          roleIds: ''
        },
        resetPasswordForm: {
          loginPwd: null
        },
        resetRules: {
          loginPwd: [
            { required: true, message: '请输入新密码', trigger: 'blur' },
            { min: 6, message: '请输入6位以上密码', trigger: 'blur' }
          ]
        },
        rules: {
          loginName: [
            { required: true, message: '请输入登录名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在3到10个字符之间', trigger: 'blur' }
          ],
          loginPwd: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            // { min: 6, max: 12, message: '长度在6到12个字符之间', trigger: 'blur' },
            { pattern: /^(?![^a-zA-Z]+$)(?!\D+$).{8,15}$/, message: '10-15个字符长度，必须含有英文字母和数字', trigger: 'blur' }
          ],
          department: [
            { required: true, message: '请选择部门' }
          ],
          userName: [
            { required: true, message: '请输入用户昵称', trigger: 'blur' },
            { min: 3, max: 12, message: '长度在3到12个字符之间', trigger: 'blur' }
          ],
          mobile: [
            { pattern: /^1(3[0-9]|5[0-35-9]|8[025-9])\d{8}$/, message: '手机号格式错误', trigger: 'blur' }
          ],
          telephone: [
            { pattern: /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/, message: '座机号格式错误', trigger: 'blur' }
          ],
          email: [
            { pattern: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/, message: '邮箱格式错误', trigger: 'blur' }
          ]
        },
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    watch: {
      userList() {
        this.$nextTick(() => {
          authMenuButton(location.hash.substring(2))
        })
      }
    },
    created() {
      this.treeHeight = document.body.clientHeight - 200
    },
    mounted() {
      this.initDepartmentTree()
      this.fetchData(null, '', '', 1, this.pageNum, this.pageSize)
    },
    methods: {
      showListRole(roleName, roleValue, pageNum, pageSize) {
        listRole(roleName, roleValue, pageNum, pageSize).then(response => {
          this.roleList = response.data.data.rows
        })
      },
      selectRolesInAdd(val) {
        const ids = []
        for (let i = 0; i < val.length; i++) {
          ids.push(val[i])
        }
        this.addForm.roleIds = ids.join(',')
      },
      selectRolesInEdit(val) {
        const ids = []
        for (let i = 0; i < val.length; i++) {
          ids.push(val[i])
        }
        this.editForm.roleIds = ids.join(',')
      },
      /* 树点击事件，拿当前node的id */
      handleNodeClick(data) {
        this.departmentId = data.id
        if (!data.parentId) {
          this.departmentId = null
        }
        this.fetchData(this.departmentId, '', '', 1, this.pageNum, this.pageSize)
      },
      /* 初始化部门树 */
      initDepartmentTree() {
        this.treeLoading = true
        return tree().then(resp => {
          this.departmentTree = resp.data.data
          this.treeLoading = false
          return resp
        }).catch(e => {
          this.treeLoading = false
        })
      },
      /* 获取部门下用户信息 */
      fetchData(departmentId, loginName, userName, showOrAdd = 1, pageNum, pageSize) {
        this.listLoading = true
        return listUser(
          departmentId,
          loginName,
          userName,
          showOrAdd,
          pageNum,
          pageSize
        ).then(resp => {
          this.userList = resp.data.data.rows
          this.userList.forEach((e, i) => { e['idx'] = i })
          this.total = resp.data.data.total
          this.pageNum = resp.data.data.pageNum
          this.pageSize = resp.data.data.pageSize
          this.listLoading = false
          return resp
        }).catch(e => {
          this.listLoading = false
        })
      },
      /* 查询 */
      search() {
        this.searchLoading = true
        this.listLoading = true
        this.fetchData(
          this.departmentId,
          this.searchForm.searchLoginName,
          this.searchForm.searchUserName,
          1,
          this.pageNum,
          this.pageSize
        ).then((resp) => {
          this.searchLoading = false
          this.listLoading = false
        })
      },
      /* 启用禁用 */
      checkStatus(index, id, status) {
        this.listLoading = true
        status = (status === 1) ? 0 : 1
        updateStatus(id, status).then(() => {
          this.$message({
            type: 'success',
            message: '操作成功!',
            duration: 1000,
            onClose: () => {
              this.userList[index].status = status
              this.listLoading = false
            }
          })
        }).catch(e => {
          this.listLoading = false
        })
      },
      handleSizeChange(pageSize) {
        this.listLoading = true
        this.pageNum = 1
        this.pageSize = pageSize
        this.fetchData(this.departmentId, this.searchForm.searchLoginName, this.searchForm.searchUserName, 1, this.pageNum, this.pageSize)
      },
      /* table表格当前页事件 */
      handleCurrentPageChange(currentPage) {
        this.listLoading = true
        this.pageNum = currentPage
        this.fetchData(this.departmentId, this.searchForm.searchLoginName, this.searchForm.searchUserName, 1, this.pageNum, this.pageSize)
      },
      /* 打开重置密码窗口 */
      goResetPassword(userId) {
        this.userId = userId
        this.resetPasswordVisible = true
      },
      /* 重置密码提交 */
      resetSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitLoading = true
            this.resetPwdLoading = true
            this.loadingText = '正在提交'
            resetPassword(this.userId, this.resetPasswordForm.loginPwd).then(() => {
              this.$message({
                type: 'success',
                message: '重置成功',
                duration: 1000,
                onClose: () => {
                  this.submitLoading = false
                  this.resetPwdLoading = false
                  this.loadingText = '正在拼命加载'
                  this.resetPasswordVisible = false
                  this.$refs[formName].resetFields()
                }
              })
            }).catch(e => {
              this.submitLoading = false
              this.loadingText = '正在拼命加载'
            })
          }
        })
      },
      /* 打开添加窗口 */
      goAddUser() {
        this.dialogVisible = true
        this.showListRole(null, null, 1, 100000)
      },
      /* 获取所勾选用户 */
      handleSelectionChange(val) {
        this.multipleSelection = val
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
      /* 打开修改窗口 */
      goEditUser() {
        if (this.multipleSelection.length !== 1) {
          this.$message({
            type: 'warning',
            message: '请选中一行再执行此操作!'
          })
          return
        }
        this.editFormLoading = true
        getUserById(this.multipleSelection[0].id).then(response => {
          const user = response.data.data
          let departmentName = ''
          this.$refs['treeEdit'].setCheckedKeys(user.departmentIdList)
          this.$refs['treeEdit'].getCheckedNodes() && this.$refs['treeEdit'].getCheckedNodes().forEach(v => {
            departmentName += '，' + v.label
          })
          this.editForm.id = user.id
          this.editForm.loginName = user.loginName
          this.editForm.department = departmentName.substr(1)
          this.editForm.userName = user.userName
          this.editForm.mobile = user.mobile
          this.editForm.telephone = user.telephone
          this.editForm.email = user.email
          this.editForm.roles = user.roleIdList
          this.editFormLoading = false
        }).catch(e => {
          this.editFormLoading = false
        })
        this.showListRole(null, null, 1, 100000)
        this.editDialogVisible = true
      },
      goEditUserLine(id, row) {
        this.$refs.multipleTable.clearSelection()
        this.multipleSelection = []
        this.multipleSelection.push(row)
        this.editFormLoading = true
        getUserById(id).then(response => {
          const user = response.data.data
          let departmentName = ''
          this.$refs['treeEdit'].setCheckedKeys(user.departmentIdList)
          this.$refs['treeEdit'].getCheckedNodes() && this.$refs['treeEdit'].getCheckedNodes().forEach(v => {
            departmentName += '，' + v.label
          })
          this.editForm.id = user.id
          this.editForm.loginName = user.loginName
          this.editForm.department = departmentName.substr(1)
          this.editForm.userName = user.userName
          this.editForm.mobile = user.mobile
          this.editForm.telephone = user.telephone
          this.editForm.email = user.email
          this.editForm.roles = user.roleIdList
          this.editFormLoading = false
        }).catch(e => {
          this.editFormLoading = false
        })
        this.showListRole(null, null, 1, 100000)
        this.editDialogVisible = true
      },
      /* 设置管理部门 */
      goSetManageDepartment() {
        if (this.multipleSelection.length !== 1) {
          this.$message({
            type: 'warning',
            message: '请选中一行再执行此操作!'
          })
          return
        }
        this.userId = this.multipleSelection[0].id
        this.setManageDepartmentVisible = true
      },
      setManageDepartmentLine(id) {
        this.userId = id
        this.setManageDepartmentVisible = true
      },
      closeViewMenu() {
        this.setManageDepartmentVisible = false
      },
      /* 删除用户 */
      deleteUser() {
        if (this.multipleSelection.length === 0) {
          this.$message({
            type: 'warning',
            message: '请至少选中一行再执行此操作!',
            duration: 2000
          })
          return
        }

        for (let i = 0; i < this.multipleSelection.length; i++) {
          if (this.multipleSelection[i].id === 1) {
            this.$message({
              type: 'warning',
              message: '超级用户禁止删除!',
              duration: 2000
            })
            return
          }
        }
        this.$confirm('此操作将永久删除该用户，是否继续', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.removeLoading = true
          this.listLoading = true
          const rows = this.multipleSelection
          const ids = []
          for (let i = 0; i < rows.length; i++) {
            ids.push(rows[i].id)
          }
          removeUser(ids.join(',')).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功',
              duration: 1000,
              onClose: () => {
                this.fetchData(this.departmentId, '', '', 1, this.pageNum, this.pageSize).then((resp) => {
                  this.listLoading = false
                  this.removeLoading = false
                })
              }
            })
          }).catch(e => {
            this.listLoading = false
            this.removeLoading = false
          })
        })
      },
      /* 添加修改提交 */
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let departmentIds = ''
            this.addFormLoading = true // 添加对话框设为 loading状态
            this.loadingText = '提交中......' // 提示的文字
            this.submitLoading = true // 提交按钮设为 loading状态
            if (formName === 'addForm') {
              const nodes = this.$refs['treeAdd'].getCheckedNodes()
              nodes.forEach(v => {
                departmentIds += ',' + v.id
              })
              addUser(
                this.addForm.loginName,
                this.addForm.loginPwd,
                departmentIds.substr(1),
                this.addForm.userName,
                this.addForm.mobile,
                this.addForm.telephone,
                this.addForm.email,
                this.addForm.roleIds
              ).then((response) => {
                this.$message({
                  type: 'success',
                  message: '添加成功!',
                  duration: 1000,
                  onClose: () => {
                    this.fetchData(this.departmentId, '', '', 1, this.pageNum, this.pageSize).then((resp) => {
                      this.addFormLoading = false // 添加对话框设为 正常状态
                      this.loadingText = '拼命加载中......' // 提示的文字
                      this.submitLoading = false // 提交按钮设为 正常状态
                      this.addLoading = false
                    })
                    this.$refs[formName].resetFields()
                    this.dialogVisible = false
                    this.$refs['treeAdd'].setCheckedNodes([])
                  }
                })
              }).catch(e => {
                if (e.response.status === 400) {
                  this.addFormLoading = false // 添加对话框设为 正常状态
                  this.loadingText = '拼命加载中......' // 提示的文字
                  this.submitLoading = false // 提交按钮设为 正常状态
                  this.addLoading = false
                } else {
                  this.addFormLoading = false // 添加对话框设为 正常状态
                  this.loadingText = '拼命加载中......' // 提示的文字
                  this.submitLoading = false // 提交按钮设为 正常状态
                  this.addLoading = false
                  this.dialogVisible = false
                }
              })
            } else if (formName === 'editForm') {
              const nodes = this.$refs['treeEdit'].getCheckedNodes()
              nodes.forEach(v => {
                departmentIds += ',' + v.id
              })
              this.submitLoading = true
              this.editFormLoading = true
              this.loadingText = '正在提交......'
              updateUser(
                this.editForm.id,
                departmentIds.substr(1),
                this.editForm.userName,
                this.editForm.mobile,
                this.editForm.telephone,
                this.editForm.email,
                this.editForm.roleIds
              ).then(() => {
                const that = this
                this.$message({
                  type: 'success',
                  message: '修改成功!',
                  duration: 1000,
                  onClose: () => {
                    const u = Object.assign(
                      that.userList[that.multipleSelection[0].idx], {
                        departmentIdList: departmentIds,
                        departmentNameList: that.editForm.department
                      },
                      that.editForm)
                    that.editDialogVisible = false
                    that.$set(that.userList, that.multipleSelection[0].idx, u)
                    that.submitLoading = false
                    that.editFormLoading = false
                    that.loadingText = '正在加载......'
                    that.$refs[formName].resetFields()
                    that.$refs['treeEdit'].setCheckedNodes([])
                    that.multipleSelection = []
                    that.editDialogVisible = false
                  }
                })
              }).catch(e => {
                this.submitLoading = false
                this.editFormLoading = false
                this.loadingText = '正在加载......'
              })
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      /* 重置表单 */
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      /* 手动关闭对话框 */
      handleClose(done) {
        if (this.editFormLoading === true || this.submitLoading === true) {
          return
        }
        this.$confirm('确认关闭吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.editDialogVisible === true) {
            this.multipleSelection = []
          }
          done()
          this.$refs['addForm'].resetFields()
          this.$refs['editForm'].resetFields()
          this.addLoading = false
          this.$refs['resetPasswordForm'].resetFields()
        }).catch(() => {

        })
      },
      /* 修改选择当前点击部门 */
      currentDepartmentEdit() {
        const nodes = this.$refs['treeEdit'].getCheckedNodes()
        let departmentName = ''
        nodes.forEach(v => {
          departmentName += '，' + v.label
        })
        this.editForm.department = departmentName.substr(1)
      },
      /* 添加选择当前点击部门 */
      currentDepartmentAdd() {
        const nodes = this.$refs['treeAdd'].getCheckedNodes()
        let departmentName = ''
        nodes.forEach(v => {
          departmentName += '，' + v.label
        })
        this.addForm.department = departmentName.substr(1)
      }
    }
  }
</script>

<style scoped>

</style>

<style>
  .el-select{
    width: 100%;
  }
</style>
