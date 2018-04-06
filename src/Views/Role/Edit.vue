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
      <el-form ref="form" :model="form.model" :rules="form.rules" status-icon label-width="80px">
        <el-form-item label="名称" prop="Name">
          <el-input v-model="form.model.Name"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="Remark">
          <el-input v-model="form.model.Remark" type="textarea" :autosize="{ minRows: 3, maxRows: 5 }"></el-input>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import ToolService from '@/Service/Tool'
import RoleService from '@/Service/Role'
export default {
  name: 'RoleEdit',
  async created (){
    if (this.$route.params.id) {
      var result = await RoleService.GetEdit(this.$route.params.id)
      this.form.model = result.data
    } else {
      var result = await ToolService.GenerateID()
      this.form.model.ID = result.data
    }
  },
  data () {
    return {
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
          RoleService.PostEdit(this.form.model).then((result) => {
            this.$notify.success({ title: '', message:  '保存成功' })
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
