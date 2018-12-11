<template>
    <el-dialog
      title="设置管理部门"
      :visible.sync="_visible"
      width="40%"
      @close="close"
      :before-close="handleClose">
      <div class="container" v-loading="treeDepLoading" :element-loading-text= "loadingText">
        <el-scrollbar class="scrollbar"  style="height: 300px; max-height: 300px;">
          <el-tree
            :data="treeMenu"
            node-key="id"
            ref="treeMenu"
            highlight-current
            show-checkbox
            :expand-on-click-node="true"
            :props="defaultProps"
            style="padding:0 50px;">
          </el-tree>
        </el-scrollbar>

        <div class="saveBtn">
          <el-button  class="el-button--primary " size="small" :loading="submitLoading" @click="setManageDepartment" >保存</el-button>
        </div>
      </div>
    </el-dialog>
</template>

<script>
  import { authMenuButton } from '@/utils/authMenuButton'
  import { tree } from '@/api/department'
  import { listByUserId, setManageDepartments } from '@/api/userManageDepartment'
  export default {
    name: 'viewManageDepartment',
    props: {
      userId: {
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
        treeMenu: null,
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        treeDepLoading: false,
        submitLoading: false,
        loadingText: '拼命加载中',
        elTreeHeight: 0,
        saveBtnMarginTop: 26 - 200
      }
    },
    watch: {
      userId(val) {
        this.initFunctionTree().then(() => {
          this.getManageDepartment()
        })
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
    mounted() {
      authMenuButton(location.hash.substring(2))
      this.initFunctionTree().then(() => {
        this.getManageDepartment()
      })
    },
    methods: {
      close() {
        this.$emit('update:visible', false)
      },
      /* 手动关闭对话框 */
      handleClose(done) {
        if (this.treeDepLoading === true || this.submitLoading === true) {
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
      },
      /* 初始化部门树 */
      initFunctionTree() {
        this.treeDepLoading = true
        return tree().then(response => {
          const data = response.data.data
          data[0].disabled = true
          this.treeMenu = data
          return response
        }).catch(e => {
          this.treeDepLoading = false
        })
      },
      /* 获取已选择的管理部门 */
      getManageDepartment() {
        const that = this
        listByUserId(this.userId).then(response => {
          const keys = response.data.data
          const keysObject = {}
          const keysArray = []
          keys.forEach(e => {
            keysObject[e] = { id: e, _delete: false }
          })
          for (const k in keysObject) {
            const v = keysObject[k]
            if (v.id === 1) {
              v._delete = true
            } else {
              const node = that.$refs['treeMenu'].getNode(v.id)
              const id = node && node.parent && node.parent.data.id || 0
              if (id && keys.indexOf(id) !== -1) {
                keysObject[id]._delete = true
              }
            }
            keysArray.push(v)
          }
          that.$refs['treeMenu'].setCheckedKeys(keysArray.filter(v => v._delete === false).map(v => v.id))
          this.treeDepLoading = false
        }).catch(e => {
          this.treeDepLoading = false
        })
      },
      /* 设置权限保存按钮 */
      setManageDepartment() {
        this.treeDepLoading = true
        this.loadingText = '提交中......' // 提示的文字
        this.submitLoading = true // 提交按钮设为 loading状态
        let keys = this.$refs['treeMenu'].getCheckedKeys()
        keys = keys.concat(this.$refs['treeMenu'].getHalfCheckedKeys())
        const departmentIds = keys.join(',')
        setManageDepartments(this.userId, departmentIds).then(response => {
          this.$message({
            type: 'success',
            message: '保存成功',
            onClose: () => {
              this.treeDepLoading = false
              this.$emit('closeViewMenu')
              this.loadingText = '拼命加载中......' // 提示的文字
              this.submitLoading = false // 提交按钮设为 正常状态
            }
          })
        }).catch(e => {
          this.treeDepLoading = false
          this.loadingText = '拼命加载中......' // 提示的文字
          this.submitLoading = false // 提交按钮设为 loading状态
        })
      }
    }
  }
</script>
<style scoped>

  .saveBtn {
    margin:15px 0;
    text-align: center;
    left: 48%;
  }

  .saveBtnFixed {
    margin:15px 0;
    text-align: center;
    left: 48%;
    position: fixed;
    bottom: 16%;
  }

</style>
