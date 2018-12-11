<template>
  <div class="container">
    <el-form class="searchForm" :inline="true">
      <el-row>
        <el-form-item label="角色名" label-width="63px">
          <el-input v-model="searchRoleName"></el-input>
        </el-form-item>
        <el-form-item label="角色值" label-width="63px">
          <el-input v-model="searchRoleValue"></el-input>
        </el-form-item>
        <el-button type="primary" @click="search" :loading="searchLoading">查询</el-button>
      </el-row>
    </el-form>
    <div class="btn_box">
      <el-button class="el-button--primary hidden" code="add" @click="goAddRole"><i class="el-icons-jd-add"></i>&nbsp;添加角色</el-button>
      <el-button class="el-button--primary hidden" code="edit" :disabled="editDisabled" @click="goEditRole"><i class="el-icons-jd-xiugai1"></i>&nbsp;修改角色</el-button>
      <el-button class="el-button--danger hidden" code="remove" :disabled="editDisabled" :loading="removeLoading" @click="deleteRole"><i class="el-icons-jd-shanchu"></i>&nbsp;删除角色</el-button>
    </div>
    <el-dialog
      title="添加角色 "
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose">
      <el-form ref="addForm" :rules="rules" :model="addForm" label-width="80px"
               v-loading="addFormLoading"
               :element-loading-text="loadingText">
        <el-form-item label="角色名" prop="roleName">
          <el-input v-model="addForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色值" prop="roleValue">
          <el-input v-model="addForm.roleValue"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input type="textarea" v-model="addForm.roleDesc"></el-input>
        </el-form-item>
        <el-form-item class="btn_box">
          <el-button type="primary" :loading="submitLoading" @click="submitForm('addForm')">提交</el-button>
          <el-button @click="resetForm('addForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="修改角色"
      :visible.sync="editDialogVisible"
      width="40%"
      :before-close="handleClose">
      <el-form ref="editForm" :rules="rules" :model="editForm" label-width="80px"
               v-loading="editFormLoading"
               :element-loading-text="loadingText">
        <el-form-item label="角色名" prop="roleName">
          <el-input v-model="editForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色值" prop="roleValue">
          <el-input v-model="editForm.roleValue" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input type="textarea" v-model="editForm.roleDesc"></el-input>
        </el-form-item>
        <el-form-item class="btn_box">
          <el-button type="primary" :loading="submitLoading" @click="submitForm('editForm')">提交</el-button>
          <el-button @click="resetForm('editForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-table
      :data="roleList"
      v-loading.body="listLoading"
      element-loading-text="拼命加载中"
      border
      fit
      tooltip-effect="dark"
      highlight-current-row
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50">
      </el-table-column>
      <el-table-column label="角色名" width="180">
        <template slot-scope="scope">
          {{scope.row.roleName}}
        </template>
      </el-table-column>
      <el-table-column label="角色值" width="180">
        <template slot-scope="scope">
          {{scope.row.roleValue}}
        </template>
      </el-table-column>
      <el-table-column label="角色描述">
        <template slot-scope="scope">
          {{scope.row.roleDesc}}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-popover v-if="scope.row.id !== 1"
            placement="top-start"
            width="100"
            trigger="hover"
            content="修改角色">
            <el-button class="icon-btn hidden" slot="reference" type="text" code="edit" icon="el-icons-jd-xiugai1" @click="goEditLine(scope.row)"></el-button>
          </el-popover>
          <el-popover
                      placement="top-start"
                      width="100"
                      trigger="hover"
                      content="查看用户">
            <el-button class="icon-btn hidden" slot="reference"  type="text" code="viewUser" icon="el-icons-jd-chakanyonghu" @click="viewUser(scope.row.id)"></el-button>
          </el-popover>
          <el-popover
                      placement="top-start"
                      width="100"
                      trigger="hover"
                      content="查看菜单">
            <el-button class="icon-btn hidden" slot="reference" type="text" code="viewMenu" icon="el-icons-jd-chakancaidan" @click="viewMenu(scope.row.id)"></el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
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

    <view-user :visible.sync="viewUserDialogVisible" :roleId="roleId"></view-user>
    <view-menu :visible.sync="viewMenuDialogVisible" :roleId="roleId" v-on:closeViewMenu="closeViewMenu"></view-menu>
  </div>
</template>

<script>
  import { authMenuButton } from '@/utils/authMenuButton'
  import { getRoleById, listRole, addRole, updateRole, removeRole } from '@/api/role'
  import ViewUser from './viewUser'
  import ViewMenu from './viewMenu'
  export default {
    name: 'role',
    components: {
      ViewUser, ViewMenu
    },
    data() {
      return {
        total: -1,
        pageNum: 1,
        pageSize: 10,
        roleList: null,
        multipleSelection: [],
        searchRoleName: null,
        searchRoleValue: null,
        listLoading: false,
        searchLoading: false, // 查询按钮
        // editLoading: false, // 修改按钮
        addFormLoading: false, // 添加对话框
        editFormLoading: false, // 修改对话框
        submitLoading: false, // 提交按钮
        loadingText: '拼命加载中......', // 提示的文字
        removeLoading: false, // 删除按钮
        dialogVisible: false,
        editDialogVisible: false,
        viewUserDialogVisible: false,
        viewMenuDialogVisible: false,
        editDisabled: false,
        roleId: 0,
        addForm: {
          roleName: '',
          roleValue: '',
          roleDesc: ''
        },
        editForm: {
          roleName: '',
          roleValue: '',
          roleDesc: ''
        },
        idx: null,
        rules: {
          roleName: [
            { required: true, message: '请输入角色名', trigger: 'blur' }
          ],
          roleValue: [
            { required: true, message: '请输入角色值', trigger: 'blur' }
          ],
          roleDesc: [
            { required: true, message: '请选择角色描述', trigger: 'blur' }
          ]
        }
      }
    },
    watch: {
      roleList() {
        this.$nextTick(() => {
          authMenuButton(location.hash.substring(2))
        })
      }
    },
    mounted() {
      this.fetchData(null, null, this.pageNum, this.pageSize)
    },
    methods: {
      /* 初始化角色列表 */
      fetchData(roleName, roleValue, pageNum, pageSize) {
        this.listLoading = true
        return listRole(
          roleName,
          roleValue,
          pageNum,
          pageSize
        ).then(resp => {
          this.roleList = resp.data.data.rows
          this.roleList.forEach((e, i) => { e['idx'] = i })
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
        this.fetchData(this.searchRoleName, this.searchRoleValue, this.pageNum, this.pageSize)
      },
      /* table表格当前页事件 */
      handleCurrentPageChange(currentPage) {
        this.pageNum = currentPage
        this.fetchData(this.searchRoleName, this.searchRoleValue, this.pageNum, this.pageSize)
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
      /* 查询 */
      search() {
        this.searchLoading = true
        this.fetchData(this.searchRoleName, this.searchRoleValue, this.pageNum, this.pageSize).then((resp) => {
          this.searchLoading = false
        })
      },
      /* 打开添加角色对话框 */
      goAddRole() {
        this.dialogVisible = true
      },
      goEditLine(role) {
        this.editDialogVisible = true
        this.editFormLoading = true
        this.editForm.id = role.id
        getRoleById(this.editForm.id).then(resp => {
          this.editForm.roleName = role.roleName
          this.editForm.roleValue = role.roleValue
          this.editForm.roleDesc = role.roleDesc
          this.idx = role.idx
          this.editFormLoading = false
        }).catch(e => {
          this.editFormLoading = false
        })
      },
      /* 打开修改角色对话框 */
      goEditRole() {
        if (this.multipleSelection.length !== 1) {
          this.$message({
            type: 'warning',
            message: '请选中一行再执行此操作!'
          })
          return
        }
        this.editDialogVisible = true
        this.editFormLoading = true
        const role = this.multipleSelection[0]
        this.editForm.id = role.id
        getRoleById(this.editForm.id).then(resp => {
          this.editForm.roleName = role.roleName
          this.editForm.roleValue = role.roleValue
          this.editForm.roleDesc = role.roleDesc
          this.idx = role.idx
          this.editFormLoading = false
        }).catch(e => {
          this.editFormLoading = false
        })
      },
      /* 删除角色 */
      deleteRole() {
        if (this.multipleSelection.length < 1) {
          this.$message({
            type: 'warning',
            message: '请至少选中一行再执行此操作',
            duration: 1500
          })
          return
        }
        for (let i = 0; i < this.multipleSelection.length; i++) {
          if (this.multipleSelection[i].id === 1) {
            this.$message({
              type: 'warning',
              message: '超级角色禁止删除!',
              duration: 2000
            })
            return
          }
          if (this.multipleSelection[i].id <= 20) {
            this.$message({
              type: 'warning',
              message: '内置角色禁止删除!',
              duration: 2000
            })
            return
          }
        }
        this.$confirm('此操作将永久删除该角色，并且与该角色有关的所有权限也将一并删除，是否继续', '提示', {
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
          removeRole(ids.join(',')).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功',
              duration: 1000,
              onClose: () => {
                this.fetchData(this.searchRoleName, this.searchRoleValue, this.pageNum, this.pageSize).then((resp) => {
                  this.removeLoading = false
                  this.listLoading = false
                })
              }
            })
          }).catch(e => {
            this.removeLoading = false
            this.listLoading = false
          })
        })
      },
      /* 添加、修改表单提交 */
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (formName === 'addForm') {
              this.submitLoading = true
              this.addFormLoading = true
              this.loadingText = '正在提交......'
              addRole(
                this.addForm.roleName,
                this.addForm.roleValue,
                this.addForm.roleDesc
              ).then(() => {
                this.$message({
                  type: 'success',
                  message: '添加成功!',
                  duration: 1000,
                  onClose: () => {
                    this.fetchData(this.searchRoleName, this.searchRoleValue, this.pageNum, this.pageSize).then((resp) => {
                      this.addFormLoading = false
                      this.submitLoading = false
                      this.loadingText = '拼命加载中......'
                    })
                    this.$refs[formName].resetFields()
                    this.dialogVisible = false
                  }
                })
              }).catch(e => {
                this.addFormLoading = false
                this.submitLoading = false
                this.loadingText = '拼命加载中......'
              })
            } else if (formName === 'editForm') {
              this.submitLoading = true
              this.editFormLoading = true
              this.loadingText = '正在提交......'
              const roleId = this.editForm.id
              updateRole(
                roleId,
                this.editForm.roleName,
                this.editForm.roleValue,
                this.editForm.roleDesc
              ).then(() => {
                this.$message({
                  type: 'success',
                  message: '修改成功!',
                  duration: 1000,
                  onClose: () => {
                    const newList = Object.assign(
                      this.roleList[this.idx],
                      {
                        id: roleId
                      },
                      this.editForm
                    )
                    this.fetchData(this.searchRoleName, this.searchRoleValue, this.pageNum, this.pageSize).then((resp) => {
                      this.submitLoading = false
                      this.editFormLoading = false
                      this.loadingText = '拼命加载中......'
                    })
                    this.editDialogVisible = false
                    this.$set(this.roleList, this.idx, newList)
                    this.$refs[formName].resetFields()
                    this.editDialogVisible = false
                  }
                })
              }).catch(e => {
                this.submitLoading = false
                this.editFormLoading = false
                this.loadingText = '拼命加载中......'
              })
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      /* 打开查看用户 */
      viewUser(roleId) {
        this.roleId = Number.parseInt(roleId)
        this.viewUserDialogVisible = true
      },
      /* 打开查看菜单 */
      viewMenu(roleId) {
        this.roleId = Number.parseInt(roleId)
        this.viewMenuDialogVisible = true
      },
      closeViewMenu() {
        this.viewMenuDialogVisible = false
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
          done()
          this.$refs['addForm'].resetFields()
          this.addLoading = false
          this.$refs['editForm'].resetFields()
        }).catch(() => {

        })
      }
    }
  }
</script>

<style scoped>
</style>
