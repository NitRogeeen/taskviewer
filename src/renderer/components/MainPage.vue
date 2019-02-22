<template>
  <el-container>
    <el-aside width="70px">
      <el-menu default-active="1" style="height: 100vh;" :collapse="true">
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">hoge</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <task-card date="20190222"></task-card>
    </el-main>
  </el-container>
</template>

<script>
  import TaskCard from './TaskCard'
  export default {
    name: 'main-page',
    components: { TaskCard },
    data () {
      return {
        taskList: []
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style>
  .el-row {
    margin-bottom: 10px;
  }
  .el-menu {
    position: fixed;
    z-index: 999;
  }
</style>
