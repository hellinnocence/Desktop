<template>
  <el-container class="list">
    <el-header height="45px">
      <table>
        <tr>
          <td class="text-l">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>用户列表</el-breadcrumb-item>
            </el-breadcrumb>
          </td>
          <td class="text-r">
            <el-button size="small" icon="el-icon-search" @click="openDialogQuery">查询</el-button>
            <el-button size="small" icon="el-icon-plus" @click="edit()">添加</el-button>
          </td>
        </tr>
      </table>
    </el-header>
    <el-main>
      <el-dialog title="查询" :visible.sync="dialog.query.visible">
        <el-form label-position="left" label-width="60px" :model="dialog.query.form">
          <el-form-item label="帐号">
            <el-input v-model="dialog.query.form.Account"></el-input>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="dialog.query.form.Name"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="executeDialogQuery">确 定</el-button>
        </div>
      </el-dialog>
      <el-table :data="pagination.data" border stripe>
        <el-table-column prop="Account" label="帐号" width="180" />
        <el-table-column prop="Name" label="用户名" width="180" />
        <el-table-column prop="Address" label="地址" />
      </el-table>
    </el-main>
    <el-footer height="50px">
      <table>
        <tr>
          <td>
            <el-pagination :layout="pagination.layout"
              :total="pagination.total" :current-page="pagination.index"
              :page-size="pagination.size" :page-sizes="pagination.sizes"
              @current-change="paginationCurrentChange" @size-change="paginationSizeChange">
            </el-pagination>
          </td>
        </tr>
      </table>
    </el-footer>
  </el-container>
</template>

<script>
import UserService from '@/Service/User'
import axios from 'axios'
export default {
  name: 'UserList',
  data() {
    return {
      dialog: {
        query: {
          visible: false,
          form: {
            Account: '',
            Name: ''
          }
        }
      },
      pagination: {
        index: 1,
        size: 10,
        sizes: [10, 20, 30, 40, 50],
        total: 40,
        layout: 'total, sizes, prev, pager, next, jumper',
        condition: {},
        data: []
      }
    };
  },
  mounted () {
    this.executeQuery()
  },
  methods: {
    openDialogQuery() {
      this.dialog.query.visible = true
      for(name in this.pagination.condition) {
        this.dialog.query.form[name] = this.pagination.condition[name]
      }
    },
    executeDialogQuery(){
      this.dialog.query.visible = false
      for(name in this.dialog.query.form) {
        this.pagination.condition[name] = this.dialog.query.form[name]
      }
      this.executeQuery()
    },
    paginationCurrentChange(current){
      this.pagination.index = current
      this.executeQuery()
    },
    paginationSizeChange(size) {
      this.pagination.size = size
      this.executeQuery()
    },
    executeQuery () {
      var data = {
        size: this.pagination.size,
        index: this.pagination.index,
        condition: this.pagination.condition
      }
      UserService.Page(data).then((result) => {
        this.pagination.data = result.data.Data
        this.pagination.total = result.data.Total
      }).catch((error) => {
        this.$notify.error({ title: '',  message: error.response.data.Message })
      })
    },
    edit() {
      this.$router.push({ name: 'UserEdit' })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
