<template>

</template>

<script>
  import Tinymce from '@/components/Tinymce'
  import UploadImages from '@/components/UploadImages'
  import ShowCarouselImages from '@/components/ShowCarouselImages'

  export default {
    name: 'BaseTable',
    components: {
      Tinymce, /* 文本编辑器组件 */
      UploadImages,
      ShowCarouselImages
    },
    data() {
      return {
        getByIdMethod: null,
        listMethod: null,
        removeMethod: null,
        updateEnableStatusMethod: null,
        saveMethod: null,
        updateMethod: null,
        setAreaType: null,

        total: -1,
        pageNum: 1,
        pageSize: 10,
        dataList: null,
        multipleSelection: [],
        addDialogVisible: false,
        editDialogVisible: false,
        carouselDialogVisible: false,
        editLogisticsCompany: false,
        attachmentUrls: [],
        imgList: [],
        listLoading: false, // table
        searchLoading: false, // 查询按钮
        // editLoading: false, // 修改按钮
        addFormLoading: false, // 添加对话框
        editFormLoading: false, // 修改对话框
        submitLoading: false, // 提交按钮
        loadingText: '拼命加载中......', // 提示的文字
        removeLoading: false, // 删除按钮
        enableLoading: false, // 启用按钮
        disableLoading: false // 禁用按钮
      }
    },
    methods: {
      goAdd() {
        this.addDialogVisible = true
      },
      preEdit(id) {
        if (id === null || id === undefined) {
          if (this.multipleSelection.length !== 1) {
            this.$message({
              type: 'warning',
              message: '请选中一行再执行此操作!'
            })
            return Promise.reject(new Error('error'))
          }
          id = this.multipleSelection[0].id
        }
        this.editDialogVisible = true
        this.editFormLoading = true
        return this.getByIdMethod(id).then(resp => {
          this.editLogisticsCompany = true
          this.editFormLoading = false
          return resp
        }).catch(e => {
          this.editFormLoading = false
        })
      },
      removeLine(ids) {
        this.$confirm('确定删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.removeLoading = true
          this.listLoading = true
          this.removeMethod(ids).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功',
              duration: 1000,
              onClose: () => {
                this.pageNum = 1
                this.fetchData(...this._searchFormToList(), this.pageNum, this.pageSize).then((resp) => {
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
      remove() {
        if (this.multipleSelection.length < 1) {
          this.$message({
            type: 'warning',
            message: '请至少选中一行再执行此操作',
            duration: 1500
          })
          return
        }
        this.$confirm('确定删除吗？', '提示', {
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
          this.removeMethod(ids.join(',')).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功',
              duration: 1000,
              onClose: () => {
                this.pageNum = 1
                this.fetchData(...this._searchFormToList(), this.pageNum, this.pageSize).then((resp) => {
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
      fetchData(...args) {
        this.listLoading = true
        if (this.areaType) {
          this.setAreaType(this.areaType)
        }
        return this.listMethod(...args, this.pageNum, this.pageSize).then(resp => {
          this.dataList = resp.data.data.rows
          this.dataList.forEach((e, i) => {
            e['idx'] = i
          })
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
        this.listLoading = true
        this.fetchData(...this._searchFormToList(), this.pageNum, this.pageSize).then((resp) => {
          this.listLoading = false
        })
      },
      handleCurrentPageChange(currentPage) {
        this.pageNum = currentPage
        this.listLoading = true
        this.fetchData(...this._searchFormToList(), this.pageNum, this.pageSize).then((resp) => {
          this.listLoading = false
        })
      },
      /* 获取所勾选需求 */
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      search() {
        this.listLoading = true
        this.searchLoading = true
        this.fetchData(...this._searchFormToList(), this.pageNum, this.pageSize).then((resp) => {
          this.listLoading = false
          this.searchLoading = false
        })
      },
      /* 手动关闭对话框 */
      handleClose(done) {
        if (this.editFormLoading === true || this.submitLoading === true || this.attributeLoading === true || this.listLoading === true) {
          return
        }
        this.$confirm('确认关闭吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.imgList = []
          this.addForm.attachmentIds = ''
          this.editForm.attachmentIds = ''
          if (this.$refs['addForm']) {
            this.$refs['addForm'].resetFields()
          }
          if (this.$refs['editForm']) {
            this.$refs['editForm'].resetFields()
          }
          done()
        }).catch((e) => {
          console.log(e)
          if (e !== 'cancel') {
            done()
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
        this.value = ''
      },
      fileListChange(imgList) {
        const imgIds = imgList.map(img => img.attachmentId).join(',')
        this.addForm.attachmentIds = imgIds
        this.editForm.attachmentIds = imgIds
      },
      enableLine(ids, nowEnableStatus) {
        if (nowEnableStatus !== undefined && nowEnableStatus === 1) {
          this.$message({
            type: 'warning',
            message: '您选择的数据已经启用！',
            duration: 1500
          })
          return
        }
        this.enableLoading = true
        this.listLoading = true
        this.updateEnableStatusMethod(ids, 1).then(response => {
          this.$message({
            type: 'success',
            message: '启用成功',
            duration: 1000,
            onClose: () => {
              this.fetchData(...this._searchFormToList(), this.pageNum, this.pageSize).then((resp) => {
                this.listLoading = false
                this.enableLoading = false
              })
            }
          })
        }).catch(e => {
          this.listLoading = false
          this.enableLoading = false
        })
      },
      enable() {
        if (this.multipleSelection.length < 1) {
          this.$message({
            type: 'warning',
            message: '请至少选中一行再执行此操作',
            duration: 1500
          })
        } else {
          const rows = this.multipleSelection
          const status = rows.map(r => r.enableStatus)
          const index = status.indexOf(1)
          if (index >= 0) {
            this.$message({
              type: 'warning',
              message: '您选择的数据包含已经启用的，请取消后重试！',
              duration: 1500
            })
          } else {
            this.$confirm('是否启用', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              const rows = this.multipleSelection
              const ids = rows.map(r => r.id).join(',')
              // 不传nowEnableStatus
              this.enableLine(ids)
            })
          }
        }
      },
      disableLine(ids, nowEnableStatus) {
        if (nowEnableStatus !== undefined && nowEnableStatus === 0) {
          this.$message({
            type: 'warning',
            message: '您选择的数据已经禁用的！',
            duration: 1500
          })
          return
        }
        this.disableLoading = true
        this.listLoading = true
        this.updateEnableStatusMethod(ids, 0).then(response => {
          this.$message({
            type: 'success',
            message: '禁用成功',
            duration: 1000,
            onClose: () => {
              this.fetchData(...this._searchFormToList(), this.pageNum, this.pageSize).then((resp) => {
                this.disableLoading = false
                this.listLoading = false
              })
            }
          })
        }).catch(e => {
          this.disableLoading = false
          this.listLoading = false
        })
      },
      disable() {
        if (this.multipleSelection.length < 1) {
          this.$message({
            type: 'warning',
            message: '请至少选中一行再执行此操作',
            duration: 1500
          })
        } else {
          const rows = this.multipleSelection
          const status = rows.map(r => r.enableStatus)
          const index = status.indexOf(0)
          if (index >= 0) {
            this.$message({
              type: 'warning',
              message: '您选择的数据包含已经禁用的，请取消后重试！',
              duration: 1500
            })
          } else {
            this.$confirm('是否禁用', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              const rows = this.multipleSelection
              const ids = rows.map(r => r.id).join(',')
              // 不传nowEnableStatus
              this.disableLine(ids)
            })
          }
        }
      },
      _searchFormToList() {
        const args = []
        this.searchForm.map(s => {
          for (const form in s) {
            args.push(s[form])
          }
        })
        return args
      },
      showCarousel(attachmentList) {
        this.attachmentUrls = attachmentList.map(img => img.attachmentUrl)
        if (this.attachmentUrls.length === 0) {
          this.$message({
            type: 'warning',
            message: '暂无图片显示!',
            duration: 1500
          })
          return
        }
        this.carouselDialogVisible = true
      },
      save(...args) {
        this.$refs['addForm'].validate((valid) => {
          if (valid) {
            if (this.areaType) {
              this.setAreaType(this.areaType)
            }
            this.submitLoading = true
            this.addFormLoading = true
            this.loadingText = '正在提交......'
            this.saveMethod(...args).then(() => {
              this.$message({
                type: 'success',
                message: '添加成功!',
                duration: 1000,
                onClose: () => {
                  this.pageNum = 1
                  this.listLoading = true
                  this.fetchData(...this._searchFormToList(), this.pageNum, this.pageSize).then((resp) => {
                    this.addFormLoading = false
                    this.submitLoading = false
                    this.loadingText = '拼命加载中......'
                  })
                  this.resetForm('addForm')
                  this.imgList = []
                  this.addDialogVisible = false
                }
              })
            }).catch(e => {
              this.addFormLoading = false
              this.submitLoading = false
              this.loadingText = '拼命加载中......'
            })
          } else {
            console.log('error ')
          }
        })
      },
      update(...args) {
        this.$refs['editForm'].validate((valid) => {
          if (valid) {
            this.submitLoading = true
            this.editFormLoading = true
            this.loadingText = '正在提交......'
            this.updateMethod(...args).then(() => {
              this.$message({
                type: 'success',
                message: '修改成功!',
                duration: 1000,
                onClose: () => {
                  this.pageNum = 1
                  this.fetchData(...this._searchFormToList(), this.pageNum, this.pageSize).then((resp) => {
                    this.editFormLoading = false
                    this.submitLoading = false
                    this.loadingText = '拼命加载中......'
                    this.editFormLoading = false
                  })
                  this.resetForm('editForm')
                  this.editDialogVisible = false
                  this.editLogisticsCompany = false
                }
              })
            }).catch(e => {
              this.addFormLoading = false
              this.submitLoading = false
              this.loadingText = '拼命加载中......'
            })
          } else {
            console.log('error ')
          }
        })
      }
    }
  }
</script>
