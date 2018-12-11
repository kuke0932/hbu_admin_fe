<template>
  <div class="container" style="min-height: 100%; width: 40%; padding: 40px 40px;">
    <el-form ref="passwordInitForm" :rules="rules" :model="passwordInitForm" style="width: 100%" label-width="90px"
             v-loading="passwordInitFormLoading"
             :element-loading-text="loadingText">
      <el-form-item label="账号" prop="account">
        <el-input clearable v-model="passwordInitForm.account" @blur="blurInput"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input clearable v-model="passwordInitForm.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input clearable v-model="passwordInitForm.mobile" disabled></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="idCardNo">
        <el-input clearable v-model="passwordInitForm.idCardNo" disabled></el-input>
      </el-form-item>

      <el-form-item class="btn_box">
        <el-button type="primary" :loading="submitLoading" @click="submitForm('passwordInitForm')">初始化</el-button>
        <el-button @click="resetForm('passwordInitForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { getUserInfoById, initPassword } from '@/api/passwordInit'

  export default {
    name: '密码初始化',
    data() {
      return {
        passwordInitFormLoading: false,
        loadingText: '正在初始化',
        submitLoading: false,
        passwordInitForm: {
          account: '',
          name: '',
          mobile: '',
          idCardNo: ''
        },
        rules: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      // 账号失去焦点 获取到姓名和身份证号
      blurInput() {
        getUserInfoById(this.passwordInitForm.account).then(resp => {
          this.passwordInitForm.name = resp.data.data.name
          this.passwordInitForm.mobile = resp.data.data.mobile
          this.passwordInitForm.idCardNo = resp.data.data.idCardNo
        })
      },
      /* 初始化按钮 */
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('确定初始化吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.submitLoading = true
              this.passwordInitFormLoading = true
              this.loadingText = '正在初始化......'
              initPassword(
                this.passwordInitForm.account,
                this.passwordInitForm.name,
                this.passwordInitForm.idCardNo
              ).then(() => {
                this.$message({
                  type: 'success',
                  message: '初始化成功!',
                  duration: 1000,
                  onClose: () => {
                    this.$refs[formName].resetFields()
                    this.submitLoading = false
                    this.passwordInitFormLoading = false
                    this.loadingText = ''
                  }
                })
              })
            }).catch(e => {
              this.submitLoading = false
              this.passwordInitFormLoading = false
              this.loadingText = ''
            })
          }
        })
      }
    }
  }
</script>

<style scoped>
  .el-form-item{
    margin-bottom: 15px;
  }
</style>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
