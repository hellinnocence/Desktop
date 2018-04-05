<template>
  <div class="absolute-layout login-container">
    <div style="text-align: center; font-size: 20px; line-height: 40px;">用户登录</div>
    <el-form ref="form" :model="form.model" :rules="form.rules" status-icon label-width="0px">
      <el-form-item prop="Account">
        <el-input v-model="form.model.Account" placeholder="帐号"></el-input>
      </el-form-item>
      <el-form-item prop="Password">
        <el-input v-model="form.model.Password" placeholder="密码" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit" style="width: 100%;">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import UserService from '@/Service/User'
export default {
  name: 'Login',
  data() {
    return {
      form: {
        model: {
          Account: '',
          Password: ''
        },
        rules: {
          Account: [
            { required: true, message: '请输入帐号', trigger: 'blur' },
            { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
          ],
          Password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 50, message: '长度在 6 到 50 个字符', trigger: 'blur' }
          ]
        }
      }
    }
  },
  methods: {
    submit(){
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          var result = await UserService.Login(this.form.model)
          window.localStorage.setItem('AuthorizationToken', result.data.Token)
          this.$router.push({ name: 'Admin' })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
  .login-container
  {
    width: 400px; 
    height: 200px; 
    border: 1px solid #CCC; 
    margin: auto;
    padding: 20px;
    border-radius: 12px;
  }
</style>
