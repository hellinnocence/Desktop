<template>
  <el-container style="border: 1px solid #eee">
    <el-header style="background-color: #20a0ff; color:#FFF;">
      <table>
        <tr>
          <td style="text-align: left; font-size: 20px;">Title</td>
          <td style="text-align: right;">
            <el-dropdown split-button type="primary" trigger="click">
              <span class="el-dropdown-link">
                Admin
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item>重置密码</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
        </tr>
      </table>
    </el-header>
    <el-container>
      <el-aside width="200px" style="height: 100%;">
        <el-menu style="height: 100%;" :router="true">
          <el-menu-item index="/">用户列表</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main style="padding: 0px;">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
</style>
