<template>
  <div class="container my-container">
    <el-row style="border-bottom: 0;" class="my-el-row">
      <el-col :span="4" class="my-el-tree-col4">
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
            :props="defaultProps"
            :expand-on-click-node='false'
            @node-click="currentNodeClick">
          </el-tree>
        </el-scrollbar>
      </el-col>
      <el-col :span="19" style="margin-left: 20px; padding-top: 37px;">
          <el-form :inline="true">
            <el-row>
                <el-form-item label-width="80px" label="部门名称">
                  <el-input v-model="searchDepartmentName" style="width: 162px;"></el-input>
                </el-form-item>
                <el-form-item label-width="80px" label="部门类型">
                  <el-select :clearable="true" v-model="searchDepartmentType" style="width: 162px;" placeholder="请选择" clearable filterable>
                    <el-option
                      v-for="item in departmentTypeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-button type="primary" @click="search" :loading="searchLoading">查询</el-button>
            </el-row>
            <div class="btn_box">
              <el-button class="el-button--primary hidden" code="add" @click="goAddDepartment"><i class="el-icons-jd-add"></i>&nbsp;添加部门</el-button>
              <el-button class="el-button--primary hidden" code="edit" :loading="editLoading" :disabled="editDisabled" @click="goEditDepartment"><i class="el-icons-jd-xiugai1"></i>&nbsp;修改部门</el-button>
              <el-button class="el-button--danger hidden" code="remove" :loading="removeLoading" :disabled="editDisabled" @click="deleteDepartment"><i class="el-icons-jd-shanchu"></i>&nbsp;删除部门</el-button>
            </div>
            <el-table
              :data="departmentList"
              v-loading.body="listLoading"
              element-loading-text="拼命加载中"
              border
              fit
              tooltip-effect="dark"
              highlight-current-row>
              <el-table-column label="部门名" width="250">
                <template slot-scope="scope">
                  {{scope.row.departmentName}}
                </template>
              </el-table-column>
              <el-table-column prop="departmentType" label="部门类型" width="250" :formatter="tableFormatter">
              </el-table-column>
              <el-table-column prop="departmentDesc" label="部门描述">
                <template slot-scope="scope">
                  {{scope.row.departmentDesc}}
                </template>
              </el-table-column>
              <el-table-column label="操作" fixed="right">
                <template slot-scope="scope">
                  <el-popover v-if="scope.row.id !== 1"
                    placement="top-start"
                    width="100"
                    trigger="hover"
                    content="修改部门">
                    <el-button class="icon-btn hidden" slot="reference" type="text" code="edit" icon="el-icons-jd-xiugai1" @click="goEditLine(scope.row.id)"></el-button>
                  </el-popover>
                  <el-popover v-if="scope.row.id !== 1"
                    placement="top-start"
                    width="100"
                    trigger="hover"
                    content="删除部门">
                    <el-button class="icon-btn hidden" slot="reference" type="text" code="remove" icon="el-icons-jd-shanchu" @click="removeLine(scope.row.id)"></el-button>
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
          </el-form>
      </el-col>
    </el-row>

    <el-dialog
      title="添加部门"
      :visible.sync="dialogVisible"
      width="35%"
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
          node-key="id"
          highlight-current
          :props="defaultProps"
          :expand-on-click-node='false'
          :check-strictly='true'
          @node-click="currentDepartmentAdd">
        </el-tree>
      </el-popover>
      <el-form ref="addForm" :rules="rules" :model="addForm" label-width="80px"
               v-loading="addFormLoading"
               :element-loading-text="loadingText">
        <el-form-item label="部门名" prop="departmentName">
          <el-input v-model="addForm.departmentName"></el-input>
        </el-form-item>
        <el-form-item label="父部门" prop="parentName">
          <el-input v-model="addForm.parentName"  v-popover:popoverTree readonly></el-input>
        </el-form-item>
        <el-form-item label="部门类型" prop="departmentType">
          <el-select v-model="addForm.departmentType" placeholder="请选择" clearable filterable>
            <el-option
              v-for="item in departmentTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门描述" prop="departmentDesc">
          <el-input type="textarea" v-model="addForm.departmentDesc"></el-input>
        </el-form-item>
        <el-form-item class="btn_box">
          <el-button type="primary" :loading="submitLoading" @click="submitForm('addForm')">提交</el-button>
          <el-button @click="resetForm('addForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="修改部门"
      :visible.sync="editDialogVisible"
      width="35%"
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
          node-key="id"
          highlight-current
          :props="defaultProps"
          :expand-on-click-node='false'
          :check-strictly='true'
          @node-click="currentDepartmentEdit">
        </el-tree>
      </el-popover>
      <el-form ref="editForm" :rules="rules" :model="editForm" label-width="78px"
               v-loading="editFormLoading"
               :element-loading-text="loadingText">
        <el-form-item label="部门名" prop="departmentName">
          <el-input v-model="editForm.departmentName"></el-input>
        </el-form-item>
        <br />
        <el-form-item label="父部门" prop="parentName">
          <el-input v-model="editForm.parentName"  v-popover:popoverTree readonly></el-input>
        </el-form-item>
        <br />
        <el-form-item label="部门类型" prop="departmentType">
          <el-select v-model="editForm.departmentType" placeholder="请选择" clearable filterable>
            <el-option
              v-for="item in departmentTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="部门描述" prop="departmentDesc">
          <el-input type="textarea" v-model="editForm.departmentDesc"></el-input>
        </el-form-item>
        <br />
        <el-form-item class="btn_box">
          <el-button type="primary" :loading="submitLoading" @click="submitForm('editForm')">提交</el-button>
          <el-button @click="resetForm('editForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { authMenuButton } from '@/utils/authMenuButton'
  import { tree, listDepartmentByParentId, addDepartment, getDepartmentById, updateDepartment, removeByIds } from '@/api/department'
  export default {
    name: 'department',
    data() {
      return {
        treeHeight: 0,
        total: -1,
        pageNum: 1,
        pageSize: 10,
        currentId: null,
        departmentTree: null,
        departmentList: null,
        searchDepartmentType: null,
        searchDepartmentName: null,
        treeLoading: false, // 左侧树
        listLoading: false, // table
        searchLoading: false, // 查询按钮
        editLoading: false, // 修改按钮
        editFormLoading: false, // 修改对话框
        addFormLoading: false, // 添加对话框
        loadingText: '拼命加载中......', // 提示的文字
        submitLoading: false, // 提交按钮
        removeLoading: false, // 删除按钮
        dialogVisible: false,
        editDialogVisible: false,
        editDisabled: false,
        addForm: {
          departmentName: '',
          departmentType: null,
          parentName: '',
          parentId: null,
          departmentDesc: ''
        },
        editForm: {
          id: '',
          departmentName: '',
          departmentType: null,
          parentName: '',
          parentId: null,
          departmentDesc: ''
        },
        rules: {
          departmentName: [
            { required: true, message: '请输入部门名', trigger: 'blur' }
          ],
          parentName: [
            { required: true, message: '请选择父部门', trigger: 'change' }
          ],
          departmentDesc: [
            { required: true, message: '请输入部门描述', trigger: 'blur' }
          ]
        },
        departmentTypeOptions: [{
          label: '总部',
          value: 1
        }, {
          label: '车间',
          value: 2
        }, {
          label: '店铺',
          value: 3
        }, {
          label: '视觉团队',
          value: 4
        }, {
          label: '技术部',
          value: 5
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    watch: {
      departmentList() {
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
      this.fetchData(null, null, null, this.pageNum, this.pageSize)
    },
    methods: {
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
      /* 根据父id获取子部门列表 */
      fetchData(currentId, departmentName, departmentType, pageNum, pageSize) {
        this.listLoading = true
        return listDepartmentByParentId(currentId, departmentName, departmentType, pageNum, pageSize).then(resp => {
          this.departmentList = resp.data.data.rows
          this.total = resp.data.data.total
          this.pageNum = resp.data.data.pageNum
          this.pageSize = resp.data.data.pageSize
          this.listLoading = false
          return resp
        }).catch(e => {
          this.listLoading = false
        })
      },
      /* 点击当前树节点 */
      currentNodeClick(current, node) {
        this.currentId = current.id
        this.fetchData(current.id, this.searchDepartmentName, this.searchDepartmentType, this.pageNum, this.pageSize)
        if (current.id === 1) {
          this.editDisabled = true
        } else {
          this.editDisabled = false
        }
      },
      /* 查询 */
      search() {
        this.searchLoading = true
        this.listLoading = true
        this.fetchData(this.currentId, this.searchDepartmentName, this.searchDepartmentType, this.pageNum, this.pageSize).then((resp) => {
          this.searchLoading = false
          this.listLoading = false
        })
      },
      /* 打开添加部门 */
      goAddDepartment() {
        this.dialogVisible = true
      },
      /* 打开修改部门对话框 */
      goEditDepartment() {
        if (!this.currentId) {
          this.$message({
            type: 'warning',
            message: '请在左侧部门列表中选一行再执行此操作!'
          })
          return
        }
        this.editLoading = true
        this.editFormLoading = true
        this.editForm.id = this.currentId
        getDepartmentById(this.editForm.id).then(resp => {
          this.editForm.departmentName = resp.data.data.departmentName
          this.editForm.parentName = resp.data.data.parentName
          this.editForm.departmentDesc = resp.data.data.departmentDesc
          this.editForm.departmentType = resp.data.data.departmentType
          this.editLoading = false
          this.editFormLoading = false
        }).catch(e => {
          this.editLoading = false
          this.editFormLoading = false
        })
        this.editDialogVisible = true
      },
      goEditLine(id) {
        this.editForm.id = id
        this.editLoading = true
        this.editFormLoading = true
        getDepartmentById(this.editForm.id).then(resp => {
          this.editForm.departmentName = resp.data.data.departmentName
          this.editForm.parentName = resp.data.data.parentName
          this.editForm.departmentDesc = resp.data.data.departmentDesc
          this.editForm.departmentType = resp.data.data.departmentType
          this.editLoading = false
          this.editFormLoading = false
        }).catch(e => {
          this.editLoading = false
          this.editFormLoading = false
        })
        this.editDialogVisible = true
      },
      /* 删除树形数组里面的node */
      iteratorTree(data, id) {
        data.forEach(v => {
          if (v.id === id) {
            const index = data.indexOf(v)
            data.splice(index, 1)
          } else {
            if (!v.children) {
              return
            }
            this.iteratorTree(v.children, id)
          }
        })
      },
      /* 删除部门 */
      deleteDepartment() {
        if (!this.currentId) {
          this.$message({
            type: 'warning',
            message: '请在左侧部门列表中选一行再执行此操作!',
            duration: 1500
          })
          return
        }
        this.$confirm('此操作将永久删除该部门，并且与该部门有关的所有权限也将一并删除，是否继续', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.removeLoading = true
          this.listLoading = true
          this.treeLoading = true
          const ids = []
          ids.push(this.currentId)
          removeByIds(ids.join(',')).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功',
              duration: 1000,
              onClose: () => {
                const id = this.$refs['tree'].getCurrentNode().id
                this.iteratorTree(this.departmentTree, id)
                this.currentId = null
                this.removeLoading = false
                this.listLoading = false
                this.treeLoading = false
              }
            })
          }).catch(e => {
            this.removeLoading = false
            this.listLoading = false
            this.treeLoading = false
          })
        })
      },
      removeLine(id) {
        this.$confirm('此操作将永久删除该部门，并且与该部门有关的所有权限也将一并删除，是否继续', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.removeLoading = true
          this.listLoading = true
          this.treeLoading = true
          removeByIds(id).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功',
              duration: 1000,
              onClose: () => {
                this.removeLoading = false
                this.treeLoading = false
                this.listLoading = false
                this.initDepartmentTree()
                this.fetchData(null, null, null, this.pageNum, this.pageSize)
              }
            })
          }).catch(e => {
            this.removeLoading = false
            this.treeLoading = false
            this.listLoading = false
          })
        })
      },
      /* 添加、修改部门提交 */
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (formName === 'addForm') {
              this.submitLoading = true
              this.addFormLoading = true
              this.loadingText = '正在提交......'
              addDepartment(
                this.addForm.departmentName,
                this.addForm.parentId,
                this.addForm.departmentType,
                this.addForm.departmentDesc
              ).then(() => {
                this.$message({
                  type: 'success',
                  message: '添加成功!',
                  duration: 1000,
                  onClose: () => {
                    this.initDepartmentTree()
                    this.fetchData(this.currentId, this.searchDepartmentName, this.searchDepartmentType, this.pageNum, this.pageSize).then((resp) => {
                      this.addFormLoading = false
                      this.submitLoading = false
                      this.loadingText = '拼命加载中......'
                    })
                    this.$refs[formName].resetFields()
                    this.dialogVisible = false
                  }
                })
              })
            } else if (formName === 'editForm') {
              this.submitLoading = true
              this.editFormLoading = true
              this.loadingText = '正在提交......'
              updateDepartment(
                this.editForm.id,
                this.editForm.departmentName,
                this.editForm.parentId,
                this.editForm.departmentType,
                this.editForm.departmentDesc
              ).then(() => {
                this.$message({
                  type: 'success',
                  message: '修改成功!',
                  duration: 1000,
                  onClose: () => {
                    this.initDepartmentTree()
                    this.fetchData(this.currentId, this.searchDepartmentName, this.searchDepartmentType, this.pageNum, this.pageSize).then((resp) => {
                      this.submitLoading = false
                      this.editFormLoading = false
                      this.loadingText = '拼命加载中......'
                    })
                    this.$refs[formName].resetFields()
                    this.editDialogVisible = false
                    this.currentId = null
                  }
                })
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
          done()
          this.$refs['addForm'].resetFields()
          this.$refs['editForm'].resetFields()
        }).catch(() => {

        })
      },
      handleSizeChange(pageSize) {
        this.pageNum = 1
        this.pageSize = pageSize
        this.fetchData(this.parentId, this.searchDepartmentName, this.searchDepartmentType, this.pageNum, this.pageSize)
      },
      handleCurrentPageChange(currentPage) {
        this.pageNum = currentPage
        this.fetchData(this.currentId, this.searchDepartmentName, this.searchDepartmentType, this.pageNum, this.pageSize)
      },
      /* 修改选择当前点击部门 */
      currentDepartmentEdit() {
        const nodes = this.$refs['treeEdit'].getCurrentNode()
        this.editForm.parentName = nodes.label
        this.editForm.parentId = nodes.id
      },
      /* 添加选择当前点击部门 */
      currentDepartmentAdd() {
        const nodes = this.$refs['treeAdd'].getCurrentNode()
        this.addForm.parentName = nodes.label
        this.addForm.parentId = nodes.id
      },
      tableFormatter(row, column, cellValue, index) {
        if (row.departmentType) {
          let val
          this.departmentTypeOptions.forEach(v => {
            if (row.departmentType === v.value) {
              val = v.label
            }
          })
          return val
        }
      }
    }
  }
</script>

<style scoped>
</style>
