<template>
  <el-container>
    <el-menu default-active="1" style="height: 100vh;" :collapse="true">
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">hoge</span>
      </el-menu-item>
    </el-menu>
    <el-main>
      <el-row>
        <el-col :span="24">
          <el-input placeholder="Please enter your task" v-model="taskName"></el-input>
        </el-col>
      </el-row>
      <el-row type="flex" justify="end">
        <el-col :span="3">
          <el-button type="primary" style="width: 100%;" @click="insertTask" round>add</el-button>
        </el-col>
      </el-row>
      <el-table :data="taskList" :show-header="false" stripe>
        <el-table-column prop="task" width="auto"></el-table-column>
        <el-table-column align="center" width="100px">
          <template slot-scope="record">
            <el-button size="mini" type="danger" @click="deleteTask(record.$index)">delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    name: 'main-page',
    data () {
      return {
        taskList: [],
        taskName: ''
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      insertTask () {
        this.taskList.push({task: this.taskName})
        this.taskName = ''
      },
      deleteTask (index) {
        this.taskList.splice(index, 1)
      }
    }
  }
</script>

<style>
  .el-row {
    margin-bottom: 10px;
  }
</style>
