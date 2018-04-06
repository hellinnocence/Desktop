<template>
  <el-container class="list">
    <el-header height="45px">
      <table>
        <tr>
          <td class="text-l">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>角色管理</el-breadcrumb-item>
              <el-breadcrumb-item>角色列表</el-breadcrumb-item>
            </el-breadcrumb>
          </td>
          <td class="text-r">
            <el-button size="small" icon="el-icon-search" @click="openDialogQuery">查询</el-button>
            <el-button size="small" icon="el-icon-plus" @click="edit('insert')">添加</el-button>
            <el-button size="small" icon="el-icon-edit" @click="edit('update')">编辑</el-button>
            <el-button size="small" icon="el-icon-delete" @click="remove()">删除</el-button>
          </td>
        </tr>
      </table>
    </el-header>
    <el-main>
      <el-dialog title="查询" :visible.sync="dialog.query.visible">
        <el-form label-position="left" label-width="60px" :model="dialog.query.form">
          <el-form-item label="角色名称">
            <el-input v-model="dialog.query.form.Name"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="executeDialogQuery">确 定</el-button>
        </div>
      </el-dialog>
      <el-table :data="pagination.data" border stripe highlight-current-row @current-change="highlightCurrentRowChange" @sort-change="sortChange">
        <el-table-column type="index" label="序号" width="50" />
        <el-table-column prop="Name" label="角色名称" />
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
import RoleService from '@/Service/Role'
export default {
  name: 'RoleList',
  data() {
    return {
      dialog: {
        query: {
          visible: false,
          form: {
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
        sort: { field: 'ID', order: 'descending' },
        data: [],
        highlightCurrentRow: null
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
    sortChange(arg) {
      this.pagination.sort.field = arg.prop ? arg.prop : 'ID'
      this.pagination.sort.order = arg.order ? arg.order : 'descending'
      this.executeQuery()
    },
    executeQuery () {
      this.pagination.highlightCurrentRow = null
      var data = {
        size: this.pagination.size,
        index: this.pagination.index,
        condition: this.pagination.condition,
        sort: this.pagination.sort
      }
      RoleService.Page(data).then((result) => {
        this.pagination.data = result.data.Data
        this.pagination.total = result.data.Total
      })
    },
    highlightCurrentRowChange (val) {
      this.pagination.highlightCurrentRow = val
    },
    edit(type) {
      if (type == 'insert') {
        this.$router.push({ name: 'RoleEdit' })
      } else if (type == 'update') {
        if (this.pagination.highlightCurrentRow) {
          var params = { id: this.pagination.highlightCurrentRow.ID }
          this.$router.push({ name: 'RoleEdit', params: params })
        } else {
          this.$notify.warning({ title: '',  message: '请选择要编辑的行' })
        }
      }
    },
    async remove() {
      if (this.pagination.highlightCurrentRow) {
          await RoleService.Remove(this.pagination.highlightCurrentRow.ID)
          this.$notify.success({ title: '',  message: '删除成功' })
          this.executeQuery()
        } else {
          this.$notify.warning({ title: '',  message: '请选择要删除的行' })
        }
    }
  }
};
</script>

<style scoped>

</style>
