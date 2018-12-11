<template>
  <div class="container my-container">
    <el-row style="border-bottom: 0;" class="my-el-row">
      <el-col :span="4" class="my-el-tree-col4">
        <h4 class="treeTitle">菜单列表</h4>
        <el-scrollbar class="scrollbar"  :style="{ height: treeHeight + 'px' }" >
          <el-tree
            :data="treeMenu"
            v-loading.body="treeLoading"
            element-loading-text="拼命加载中"
            node-key="id"
            ref="tree"
            highlight-current
            default-expand-all
            :expand-on-click-node="true"
            :props="defaultProps"
            @node-click="getCurrentObj">
          </el-tree>
        </el-scrollbar>
      </el-col>
      <el-col :span="19" style="margin-left: 20px; padding-top: 37px;">
        <el-form :inline="true">
          <el-row>
              <el-form-item label-width="70px" label="角色名">
                <el-input style="width: 162px;" v-model="searchRoleName" ></el-input>
              </el-form-item>
              <el-form-item label-width="80px" label="角色值">
                <el-input style="width: 162px;" v-model="searchRoleValue"></el-input>
              </el-form-item>
              <el-button type="primary" :loading="searchLoading" @click="searchRole">查询</el-button>
          </el-row>
          <div class="btn_box">
            <el-button class="el-button--primary hidden" code="addRole" @click="goAddRole">添加角色</el-button>
            <el-button class="el-button--danger hidden" code="removeRole" :loading="removeLoading" :disabled="editDisabled" @click="deleteRole">删除角色</el-button>
          </div>
          <el-dialog
            title="添加角色"
            :visible.sync="roleDialog"
            width="60%"
            :before-close="handleClose">
            <el-row>
              <el-col :span="8">
                <el-form-item label-width="70px" label="角色名">
                  <el-input style='min-width:120px;' v-model="searchUnRoleName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label-width="80px" label="角色值">
                  <el-input style='min-width:120px;' v-model="searchUnRoleValue"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-button style="margin-left: 20px;" type="primary" :loading="searchInAddLoading" @click="searchUnRole">查询</el-button>
              </el-col>
            </el-row>
            <el-table
              :data="unRoleList"
              v-loading="addFormLoading"
              :element-loading-text="loadingText"
              border
              fit
              tooltip-effect="dark"
              highlight-current-row
              @selection-change="handleUnRoleChange">
              <el-table-column type="selection" width="50">
              </el-table-column>
              <el-table-column prop="roleName" label="角色名" width="180">
              </el-table-column>
              <el-table-column prop="roleValue" label="角色值" width="180">
              </el-table-column>
              <el-table-column prop="roleDesc" label="角色描述">
              </el-table-column>
            </el-table>
            <el-button class="el-button--primary" style=" margin-top:2%; margin-left: 30%; margin-bottom: 2%; " @click="saveUsers">保存</el-button>
            <el-pagination
              style="margin-top: 15px;"
              background
              @size-change="handleSizeChange"
              @current-change="handleUnCurrentPageChange"
              :current-page.sync="unPageNum"
              :page-sizes="[10, 15, 20, 25, 30]"
              :page-size="unPageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="unRoleTotal">
            </el-pagination>
          </el-dialog>

          <el-table
            :data="roleList"
            v-loading.body="listLoading"
            element-loading-text="拼命加载中"
            border
            fit
            tooltip-effect="dark"
            highlight-current-row
            @selection-change="handleRoleChange">
            <el-table-column type="selection" width="50">
            </el-table-column>
            <el-table-column prop="roleName" label="角色名" width="180">
            </el-table-column>
            <el-table-column prop="roleValue" label="角色值" width="180">
            </el-table-column>
            <el-table-column prop="roleDesc" label="角色描述">
            </el-table-column>
            <el-table-column label="操作" fixed="right">
              <template slot-scope="scope">
                <el-popover v-if="scope.row.id !== 1"
                  placement="top-start"
                  width="100"
                  trigger="hover"
                  content="删除角色">
                  <el-button class="icon-btn hidden" slot="reference" type="text" code="removeRole" icon="el-icons-jd-shanchu" @click="deleteRoleLine(scope.row.id)"></el-button>
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
            :total="roleTotal">
          </el-pagination>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { authMenuButton } from '@/utils/authMenuButton'
  import { treeFunction, listRoleByFunctionId, addRoleToFunction, removeRoleFromFunction } from '@/api/function'
  export default {
    name: 'menuAuthor',
    data() {
      return {
        treeHeight: 0,
        treeMenu: null,
        unRoleList: null,
        roleList: null,
        treeLoading: false, // 左侧树
        listLoading: false,
        searchLoading: false, // 查询按钮
        removeLoading: false, // 删除按钮
        addFormLoading: false, // 添加对话框里的表格部分
        searchInAddLoading: false, // 添加对话框里的search按钮
        loadingText: '拼命加载中', // 加载提示文字
        functionId: null,
        searchRoleName: null,
        searchRoleValue: null,
        searchUnRoleName: null,
        searchUnRoleValue: null,
        roleTotal: 0,
        unRoleTotal: 0,
        pageNum: 1,
        pageSize: 10,
        unPageNum: 1,
        unPageSize: 10,
        roleDialog: false,
        roleSelections: [],
        unRoleSelections: [],
        editDisabled: false,
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    watch: {
      roleList() {
        this.$nextTick(() => {
          authMenuButton(location.hash.substring(2))
        })
      },
      unRoleList() {
        this.$nextTick(() => {
          authMenuButton(location.hash.substring(2))
        })
      }
    },
    created() {
      this.treeHeight = document.body.clientHeight - 200
    },
    mounted() {
      this.initTreeMenu()
    },
    methods: {
      /* 初始化菜单树 */
      initTreeMenu() {
        this.treeLoading = true
        treeFunction().then(resp => {
          this.treeMenu = resp.data.data
          this.treeLoading = false
          return resp
        }).catch(e => {
          this.treeLoading = false
        })
      },
      /* 已添加的角色列表 */
      roleData(functionId, roleName, roleValue, pageNum, pageSize) {
        this.listLoading = true
        return listRoleByFunctionId(functionId, roleName, roleValue, 1, pageNum, pageSize).then(resp => {
          this.roleList = resp.data.data.rows
          this.roleTotal = resp.data.data.total
          this.pageNum = resp.data.data.pageNum
          this.pageSize = resp.data.data.pageSize
          this.listLoading = false
          return resp
        }).catch(e => {
          this.listLoading = false
        })
      },
      /* 未添加的角色列表 */
      unRoleData(functionId, roleName, roleValue, pageNum, pageSize) {
        this.listLoading = true
        return listRoleByFunctionId(functionId, roleName, roleValue, 2, pageNum, pageSize).then(response => {
          this.unRoleList = response.data.data.rows
          this.unRoleTotal = response.data.data.total
          this.unPageNum = response.data.data.pageNum
          this.unPageSize = response.data.data.pageSize
          this.listLoading = false
          return response
        }).catch(e => {
          this.listLoading = false
        })
      },
      /* 获取菜单树当前点击节点及父节点 */
      getCurrentObj(obj, node) {
        this.functionId = obj.id
        this.roleData(this.functionId, this.searchRoleName, this.searchRoleValue, this.pageNum, this.pageSize)
      },
      /* 查询已添加角色列表 */
      searchRole() {
        this.searchLoading = true
        this.roleData(this.functionId, this.searchRoleName, this.searchRoleValue, this.pageNum, this.pageSize).then((resp) => {
          this.searchLoading = false
        })
      },
      /* 查询未添加角色列表 */
      searchUnRole() {
        this.searchInAddLoading = true
        this.addFormLoading = true
        this.unRoleData(this.functionId, this.searchUnRoleName, this.searchUnRoleValue, this.unPageNum, this.unPageSize).then((resp) => {
          this.searchInAddLoading = false
          this.addFormLoading = false
        })
      },
      /* 已添加角色列表当前页页事件 */
      handleCurrentPageChange(currentPage) {
        this.pageNum = currentPage
        this.roleData(this.functionId, this.searchRoleName, this.searchRoleValue, this.pageNum, this.pageSize)
      },
      /* 未添加角色列表当前页页事件 */
      handleUnCurrentPageChange(currentPage) {
        this.unPageNum = currentPage
        this.unRoleData(this.functionId, this.searchUnRoleName, this.searchUnRoleValue, this.unPageNum, this.unPageSize)
      },
      handleSizeChange(pageSize) {
        this.pageNum = 1
        this.pageSize = pageSize
        this.roleData(this.functionId, this.searchRoleName, this.searchRoleValue, this.pageNum, this.pageSize)
      },
      handleUnSizeChange(pageSize) {
        this.unPageNum = 1
        this.unPageSize = pageSize
        this.unRoleData(this.functionId, this.searchUnRoleName, this.searchUnRoleValue, this.unPageNum, this.unPageSize)
      },
      /* 已添加列表   获取所勾选角色 */
      handleRoleChange(val) {
        this.roleSelections = val
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
      /* 未添加列表   获取所勾选角色 */
      handleUnRoleChange(val) {
        this.unRoleSelections = val
      },
      /* 添加角色 */
      goAddRole() {
        this.roleDialog = true
        this.addFormLoading = true
        if (!this.functionId) {
          this.$message({
            type: 'warning',
            message: '请选择菜单',
            duration: 1500
          })
          return
        }
        this.unRoleData(this.functionId, null, null, this.unPageNum, this.unPageSize).then((resp) => {
          this.addFormLoading = false
        })
      },
      /* 保存添加角色 */
      saveUsers() {
        if (this.unRoleSelections.length < 1) {
          this.$message({
            type: 'warning',
            message: '请至少选中一行再执行此操作',
            duration: 1500
          })
          return
        }
        this.$confirm('确认保存？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.addFormLoading = true
          this.loadingText = '正在提交...'
          const rows = this.unRoleSelections
          const ids = []
          for (let i = 0; i < rows.length; i++) {
            ids.push(rows[i].id)
          }
          addRoleToFunction(this.functionId, ids.join(',')).then(response => {
            this.$message({
              type: 'success',
              message: '保存成功',
              duration: 1000,
              onClose: () => {
                this.roleDialog = false
                this.roleData(this.functionId, this.searchRoleName, this.searchRoleValue, this.pageNum, this.pageSize).then((resp) => {
                  this.addFormLoading = false
                  this.loadingText = '拼命加载中...'
                })
              }
            })
          }).catch(e => {
            this.addFormLoading = false
            this.loadingText = '拼命加载中...'
          })
        })
      },
      /* 删除角色 */
      deleteRole() {
        if (this.roleSelections.length < 1) {
          this.$message({
            type: 'warning',
            message: '请至少选中一行再执行此操作',
            duration: 1500
          })
          return
        }
        for (let i = 0; i < this.roleSelections.length; i++) {
          if (this.roleSelections[i].id === 1) {
            this.$message({
              type: 'warning',
              message: '超级角色禁止删除!',
              duration: 2000
            })
            return
          }
        }
        this.$confirm('此操作将永久删除该角色，是否继续', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.removeLoading = true
          this.listLoading = true
          const rows = this.roleSelections
          const ids = []
          for (let i = 0; i < rows.length; i++) {
            ids.push(rows[i].id)
          }
          removeRoleFromFunction(this.functionId, ids.join(',')).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功',
              duration: 1000,
              onClose: () => {
                this.roleData(this.functionId, this.searchRoleName, this.searchRoleValue, this.pageNum, this.pageSize).then((resp) => {
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
      deleteRoleLine(id) {
        this.$confirm('此操作将永久删除该角色，是否继续', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.removeLoading = true
          this.listLoading = true
          removeRoleFromFunction(this.functionId, id).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功',
              duration: 1000,
              onClose: () => {
                this.roleData(this.functionId, this.searchRoleName, this.searchRoleValue, this.pageNum, this.pageSize).then((resp) => {
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
      /* 手动关闭对话框 */
      handleClose(done) {
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
</style>
