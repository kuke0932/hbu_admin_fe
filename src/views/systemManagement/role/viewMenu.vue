<template>
  <el-dialog
    title="选择菜单"
    :visible.sync="_visible"
    width="40%"
    :before-close="handleClose">
  <div class="container"
       v-loading="treeMenuLoading"
       :element-loading-text= "loadingText">
    <el-scrollbar class="scrollbar"  style="height: 300px; max-height: 300px;" >
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
    <!--<div class="saveBtn" :style="{marginTop: saveBtnMarginTop + 'px'}" >-->
    <div class="saveBtn">
      <el-button  class="el-button--primary " size="small" :loading="submitLoading" @click="addSelectPermission" >保存</el-button>
    </div>
  </div>
  </el-dialog>
</template>

<script>
  import { treeFunction } from '@/api/function'
  import { getRoleFunction, setFunctionToRole } from '@/api/role'
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
        treeMenu: null,
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        treeMenuLoading: false,
        submitLoading: false,
        loadingText: '正在加载...',
        elTreeHeight: 0,
        saveBtnMarginTop: 26 - 200
      }
    },
    watch: {
      roleId(val) {
        this.initFunctionTree().then(() => {
          this.getRoleFunction()
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
      // authMenuButton(location.hash.substring(2))
      // this.initFunctionTree().then(() => {
      //   this.getRoleFunction()
      //   this.elTreeHeight = this.$refs['treeMenu'].$el.scrollHeight
      //   const marginTop = (this.elTreeHeight - 200)
      //   this.marginTop = (marginTop > 0 ? 0 : marginTop) + 'px'
      // })
    },
    methods: {
      close() {
        this.$emit('update:visible', false)
      },
      handleClose(done) {
        if (this.treeMenuLoading === true || this.submitLoading === true) {
          return
        }
        this.$confirm('确认关闭吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          done()
          this.close()
        }).catch(() => {

        })
      },
      /* 初始化部门树 */
      initFunctionTree() {
        this.treeMenuLoading = true
        return treeFunction().then(response => {
          const data = response.data.data
          data[0].disabled = true
          this.treeMenu = data
          this.treeMenuLoading = false
          return response
        }).catch(e => {
          this.treeMenuLoading = false
        })
      },
      /* nodeExpand(data, node, nodeComponent) {
        this.elTreeHeight = this.$refs['treeMenu'].$el.scrollHeight
        const marginTop = (this.elTreeHeight - 200)
        this.saveBtnMarginTop = (marginTop > 15 ? 15 : marginTop) + 'px'
      },
      nodeCollapse(data, node, nodeComponent) {
        this.elTreeHeight = this.$refs['treeMenu'].$el.scrollHeight
        const marginTop = (this.elTreeHeight - 500 + 300)
        this.saveBtnMarginTop = (marginTop > 15 ? 15 : marginTop) + 'px'
      }, */
      /* 获取当前角色所拥有的菜单权限 */
      getRoleFunction() {
        const that = this
        getRoleFunction(this.roleId).then(response => {
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
        })
      },
      /* 设置权限保存按钮 */
      addSelectPermission() {
        this.submitLoading = true
        this.treeMenuLoading = true
        this.loadingText = '正在提交...'
        let keys = this.$refs['treeMenu'].getCheckedKeys()
        keys = keys.concat(this.$refs['treeMenu'].getHalfCheckedKeys())
        setFunctionToRole(this.roleId, keys).then(response => {
          this.$message({
            type: 'success',
            message: '保存成功',
            onClose: () => {
              this.submitLoading = false
              this.treeMenuLoading = false
              this.$emit('closeViewMenu')
              this.loadingText = '正在加载...'
            }
          })
        }).catch(e => {
          this.submitLoading = false
          this.treeMenuLoading = false
          this.loadingText = '正在加载...'
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
