<template>
  <el-dialog
    title="账号详情"
    :visible.sync="_visible"
    width="55%"
    @close="close"
    :before-close="handleClose">
    <h3>申请人信息</h3>
    <el-row :gutter="20" style="margin-left: 10px;">
      <div style="min-width: 30%; width:auto;float:left;">
        <el-col :span="3"><div class="grid-title">账号：</div></el-col>
        <el-col :span="3"><div class="grid-content bg-purple">{{account}}</div></el-col>
      </div>
      <div style="min-width: 30%; width:auto;float:left;">
        <el-col :span="3"><div class="grid-title">姓名：</div></el-col>
        <el-col :span="3"><div class="grid-content bg-purple">{{username}}</div></el-col>
      </div>
      <div style="min-width: 20%; width:auto;float:left;">
        <el-col :span="3"><div class="grid-title">手机号码：</div></el-col>
        <el-col :span="3"><div class="grid-content bg-purple">{{mobile}}</div></el-col>
      </div>
    </el-row>
    <el-row :gutter="20" style="margin-left: 10px;">
      <div style="min-width: 30%; width:auto;float:left;">
        <el-col :span="3"><div class="grid-title">身份证号：</div></el-col>
        <el-col :span="3"><div class="grid-content bg-purple">{{idCardNo}}</div></el-col>
      </div>
      <div style="min-width: 30%; width:auto;float:left;">
        <el-col :span="3"><div class="grid-title">手持身份证：</div></el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple">
            <el-popover placement="top-start" width="300" trigger="hover">
              <img src="/static/images/sample375.jpg" width="375" height="" alt="210">
              <a slot="reference" class="introduction" href="javascript:void(0)">查看照片</a>
            </el-popover>
          </div>
        </el-col>
        <!--<el-col :span="3"><div class="grid-content bg-purple">{{handIdCard}}</div></el-col>-->
      </div>
      <div style="min-width: 30%; width:auto;float:left;">
        <el-col :span="3"><div class="grid-title">申请时间：</div></el-col>
        <el-col :span="3"><div class="grid-content bg-purple">{{createTime}}</div></el-col>
      </div>
    </el-row>
    <el-row :gutter="20" style="margin-left: 10px;">
      <div style="min-width: 30%; width:auto;float:left;">
        <el-col :span="3"><div class="grid-title">申请IP地址：</div></el-col>
        <el-col :span="3"><div class="grid-content bg-purple">{{complaintIp}}</div></el-col>
      </div>
      <div style="min-width: 30%; width:auto;float:left;">
        <el-col :span="3"><div class="grid-title">申请者终端类型：</div></el-col>
        <el-col :span="3"><div class="grid-content bg-purple">{{terminalType}}</div></el-col>
      </div>
      <div style="min-width: 30%; width:auto;float:left;">
        <el-col :span="3"><div class="grid-title">申请者浏览器类型：</div></el-col>
        <el-col :span="3"><div class="grid-content bg-purple">{{browserType}}</div></el-col>
      </div>
    </el-row>
    <el-row :gutter="20" style="margin-left: 10px;">
      <div style="width:30%; float:left;">
        <el-col :span="3"><div class="grid-title">申请者浏览器内核：</div></el-col>
        <el-col :span="3"><div class="grid-content bg-purple">{{browserKernel}}</div></el-col>
      </div>
      <div style="width:30%; float:left;">
        <el-col :span="3"><div class="grid-title">不通过原因：</div></el-col>
        <el-col :span="3"><div class="grid-content bg-purple">{{reason}}</div></el-col>
      </div>
    </el-row>

    <h3>审核人信息</h3>
    <el-row :gutter="20" style="margin-left: 10px;">
      <div style="min-width: 30%; width:auto;float:left;">
        <el-col :span="3"><div class="grid-title">审核人姓名：</div></el-col>
        <el-col :span="3"><div class="grid-content bg-purple">{{auditUserName}}</div></el-col>
      </div>
      <div style="min-width: 30%; width:auto;float:left;">
        <el-col :span="3"><div class="grid-title">审核时间：</div></el-col>
        <el-col :span="3"><div class="grid-content bg-purple">{{updateTime}}</div></el-col>
      </div>
      <div style="min-width: 30%; width:auto;float:left;">
        <el-col :span="3"><div class="grid-title">审核IP地址：</div></el-col>
        <el-col :span="3"><div class="grid-content bg-purple">{{auditIp}}</div></el-col>
      </div>
    </el-row>
  </el-dialog>
</template>

<script>
  import { detail } from '@/api/complaintAudit'

  export default {
    props: {
      visible: {
        type: Boolean,
        required: true
      },
      id: {
        type: String,
        required: true
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
    data() {
      return {
        account: null,
        userName: null,
        mobile: null,
        idCardNo: null,
        handIdCard: null,
        createTime: null,
        complaintIp: null,
        terminalType: null,
        browserType: null,
        browserKernel: null,
        reason: null,
        auditUserName: null,
        updateTime: null,
        auditIp: null
      }
    },
    watch: {
      id() {
        detail(this.id).then(resp => {
          this.account = resp.data.data.account
          this.userName = resp.data.data.userName
          this.mobile = resp.data.data.mobile
          this.idCardNo = resp.data.data.idCardNo
          this.handIdCard = resp.data.data.handIdCard
          this.createTime = resp.data.data.createTime
          this.complaintIp = resp.data.data.complaintIp
          this.terminalType = resp.data.data.terminalType
          this.browserType = resp.data.data.browserType
          this.reason = resp.data.data.reason
          this.auditUserName = resp.data.data.auditUserName
          this.updateTime = resp.data.data.updateTime
          this.auditIp = resp.data.data.auditIp
        })
      }
    },
    methods: {
      fetchData(id) {
        this.listLoading = true
        detail(id).then(resp => {
          console.log(resp)
        })
      },
      close() {
        this.$emit('update:visible', false)
      },
      handleClose(done) {
        if (this.editFormLoading === true || this.submitLoading === true) {
          return
        }
        this.$confirm('确认关闭吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$refs['addForm'].resetFields()
          done()
        }).catch((e) => {
          // console.log(e)
          if (e !== 'cancel') {
            done()
          }
        })
      }
    }
  }
</script>

<style>
  .el-row {
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 15px;
  }
  .el-row:last-child {
    margin-bottom: 0;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    width: auto;
    /*background: #d3dce6;*/
    background: none;
    float: left;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    height: 26px;
    line-height: 18px;
    font-size: 14px;
    float: left;
    height: auto;
  }
  .grid-title{
    border-radius: 4px;
    height: 26px;
    line-height: 18px;
    /*background: #d3dce6;*/
    background: none;
    float: left;
    text-align: right;
    font-size: 14px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .orderLeft{
    width: 49.5%;
    float: left;
    height: auto;
  }
  .div-f{
    float: left;
    width: 100%;
    height: auto;
  }
  .container {
    margin: 30px;
  }
  .el-col-3{
    width: auto;
  }
  .el-col-5{
    width: auto;
  }

  h3{
    margin: 20px 0 15px;
    height: 40px;
    line-height: 44px;
    background: #f9f9f9;
    font-size: 16px;
    font-weight: bold;
    text-indent: 14px;
  }

  .divRecord{
    padding: 5px;
    overflow: hidden;
  }
  .el-dialog__body{
    padding-top: 0;
    padding-bottom: 60px;
  }
</style>
