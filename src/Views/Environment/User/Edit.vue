<<template>
  <el-container class="list">
    <el-header height="45px">
      <table>
        <tr>
          <td class="text-l">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>系统设置</el-breadcrumb-item>
              <el-breadcrumb-item>用户编辑</el-breadcrumb-item>
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
          <el-input v-model="form.model.Remark" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }"></el-input>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<<script>
import AgentService from '@/Service/Agent'
import EnvironmentUserService from '@/Service/Environment/User'
import axios from 'axios'
export default {
  name: 'EnvironmentUserEdit',
  async created (){
    var result = await AgentService.GenerateID()
    if (result.data.Success) {
      this.form.model.ID = result.data.Data
    }
  },
  data () {
    return {
      form: {
        model:{
          ID: '111',
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
      }
    }
  },
  methods: {
    goBack(){
      this.$router.push({ name: 'EnvironmentUserList' })
    },
    save(){
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          EnvironmentUserService.Edit(this.form.model).then((result) => {
            this.$notify.success({ title: '',  message: result.data.Message })
          }).catch((error) => {
            this.$notify.error({ title: '',  message: error.response.data.Message })
          })
          //this.$notify({ title: '',  message: result.data.Message, type: result.data.Success ? 'success' : 'error' });
        } else {
          return false
        }
      });
    }
  }
}
</script>
