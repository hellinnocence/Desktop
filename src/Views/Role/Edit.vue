<template>
  <el-container class="list">
    <el-header height="45px">
      <table>
        <tr>
          <td class="text-l">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>角色管理</el-breadcrumb-item>
              <el-breadcrumb-item>编辑角色</el-breadcrumb-item>
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
        <el-tab-pane label="角色信息" name="role">    
          <el-form ref="form" :model="form.model" :rules="form.rules" status-icon label-width="80px">
            <el-form-item label="名称" prop="Name">
              <el-input v-model="form.model.Name"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="Remark">
              <el-input v-model="form.model.Remark" type="textarea" :autosize="{ minRows: 3, maxRows: 5 }"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="用户分配" name="user">
          <el-transfer v-model="users.selected" :data="users.data" :props="users.props" :titles="users.titles" class="choose-users"></el-transfer>
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
  name: 'RoleEdit',
  async created (){
    var result = await UserService.Options()
    this.users.data = result.data
    result = await PermitService.Options()
    this.permits.data = result.data
    if (this.$route.params.id) {
      result = await RoleService.GetEdit(this.$route.params.id)
      this.form.model = result.data
      result = await RoleService.GetChooseUsers(this.$route.params.id)
      result.data.forEach(item => { this.users.selected.push(item) })
      result = await RoleService.GetChoosePermits(this.$route.params.id)
      result.data.forEach(item => { this.permits.selected.push(item) })
    } else {
      result = await ToolService.GenerateID()
      this.form.model.ID = result.data
    }
  },
  data () {
    return {
      tabActive: 'role',
      form: {
        model:{
          ID: '',
          Name: '',
          Remark: ''
        },
        rules: {
          Name: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          Remark: []
        }
      },
      users:{
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
      this.$router.push({ name: 'RoleList' })
    },
    save(){
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          await RoleService.PostEdit(this.form.model)
          this.$notify.success({ title: '', message:  '保存角色基本信息成功' })
          await RoleService.PostChooseUsers(this.form.model.ID, this.users.selected)
          this.$notify.success({ title: '', message:  '保存用户成功' })
          await RoleService.PostChoosePermits(this.form.model.ID, this.permits.selected)
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
  .choose-users { width: 100%; display: flex; height: 100%; }
  .choose-users > .el-transfer-panel { flex: 1; }
  .choose-users > .el-transfer__buttons { display: flex; flex-direction: column; justify-content: center; }
  .choose-permits { width: 100%; display: flex; height: 100%; }
  .choose-permits > .el-transfer-panel { flex: 1; }
  .choose-permits > .el-transfer__buttons { display: flex; flex-direction: column; justify-content: center; }
</style>
