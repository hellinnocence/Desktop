<template>
  <el-container class="list">
    <el-header height="45px">
      <table>
        <tr>
          <td class="text-l">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>用户管理</el-breadcrumb-item>
              <el-breadcrumb-item>编辑用户</el-breadcrumb-item>
            </el-breadcrumb>
          </td>
          <td class="text-r">
            <el-button size="small" @click="save()">保存</el-button>
            <el-button size="small" @click="goBack()">返回</el-button>
          </td>
        </tr>
      </table>
    </el-header>
    <el-main>  
      <el-tabs v-model="tabActive">
        <el-tab-pane label="用户信息" name="user">    
          <el-form ref="form" :model="form.model" :rules="form.rules" status-icon label-width="80px">
            <el-form-item label="帐号" prop="Account">
              <el-input v-model="form.model.Account"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="Password">
              <el-input v-model="form.model.Password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="Name">
              <el-input v-model="form.model.Name"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="Remark">
              <el-input v-model="form.model.Remark" type="textarea" :autosize="{ minRows: 3, maxRows: 5 }"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="角色分配" name="role">
          <el-transfer v-model="roles.selected" :data="roles.data" :props="roles.props" :titles="roles.titles" class="choose-roles"></el-transfer>
        </el-tab-pane>
        <el-tab-pane label="权限分配" name="permit">
          <el-transfer v-model="permits.selected" :data="permits.data" :props="permits.props" :titles="permits.titles" class="choose-permits"></el-transfer>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>

<script>
import ToolService from '@/Service/Tool'
import UserService from '@/Service/User'
import RoleService from '@/Service/Role'
import PermitService from '@/Service/Permit'
export default {
  name: 'UserEdit',
  async created (){
    var result = await RoleService.Options()
    this.roles.data = result.data
    result = await PermitService.Options()
    this.permits.data = result.data
    if (this.$route.params.id) {
      result = await UserService.GetEdit(this.$route.params.id)
      this.form.model = result.data
      result = await UserService.GetChooseRoles(this.$route.params.id)
      result.data.forEach(item => { this.roles.selected.push(item) })
      result = await UserService.GetChoosePermits(this.$route.params.id)
      result.data.forEach(item => { this.permits.selected.push(item) })
    } else {
      result = await ToolService.GenerateID()
      this.form.model.ID = result.data
    }
  },
  data () {
    return {
      tabActive: 'user',
      form: {
        model:{
          ID: '',
          Account: '',
          Password: '',
          Name: '',
          Remark: ''
        },
        rules: {
          Account: [
            { required: true, message: '请输入帐号', trigger: 'blur' },
            { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
          ],
          Password: [
            { min: 6, max: 50, message: '长度在 6 到 50 个字符', trigger: 'blur' }
          ],
          Name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
          ],
          Remark: []
        }
      },
      roles:{
        data: [],
        selected: [],
        props: { key: 'Value', label: 'Text' },
        titles: ['未选择', '已选择']
      },
      permits:{
        data: [],
        selected: [],
        props: { key: 'Value', label: 'Text' },
        titles: ['未选择', '已选择']
      }
    }
  },
  methods: {
    goBack(){
      this.$router.push({ name: 'UserList' })
    },
    save(){
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          await UserService.PostEdit(this.form.model)
          this.$notify.success({ title: '', message:  '保存用户基本信息成功' })
          await UserService.PostChooseRoles(this.form.model.ID, this.roles.selected)
          this.$notify.success({ title: '', message:  '保存角色成功' })
          await UserService.PostChoosePermits(this.form.model.ID, this.permits.selected)
          this.$notify.success({ title: '', message:  '保存权限成功' })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style>
  .el-tabs { height: 100%; display: flex; flex-direction: column; }
  .el-tabs > .el-tabs__content { flex: 1; }
  .el-tabs > .el-tabs__content > .el-tab-pane { height: 100%; }
  .choose-roles { width: 100%; display: flex; height: 100%; }
  .choose-roles > .el-transfer-panel { flex: 1; }
  .choose-roles > .el-transfer__buttons { display: flex; flex-direction: column; justify-content: center; }
  .choose-permits { width: 100%; display: flex; height: 100%; }
  .choose-permits > .el-transfer-panel { flex: 1; }
  .choose-permits > .el-transfer__buttons { display: flex; flex-direction: column; justify-content: center; }
</style>

