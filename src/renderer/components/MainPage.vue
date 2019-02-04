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
      <el-card>
        <el-row>
          <el-col :span="24">
            <el-input placeholder="Please enter your task" v-model="form.taskName"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex" justify="end">
          <el-col :span="3">
            <el-button type="primary" style="width: 100%;" @click="insertTask" round>add</el-button>
          </el-col>
        </el-row>
        <el-table :data="taskList" :show-header="false" style="width: 100%;" stripe>
          <el-table-column align="center" width="50px">
            <template slot-scope="record">
              <!-- <el-switch v-model="record.row.checked" active-color="#13ce66" inactive-color="#ff4949"></el-switch> -->
              <el-checkbox v-model="record.row.checked"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="task" width="auto"></el-table-column>
        </el-table>
      </el-card>
    </el-main>
    <el-dialog title="Add your task" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="Task name" :label-width="formLabelWidth">
          <el-input v-model="form.taskName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="insertTask">Add</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
  export default {
    name: 'main-page',
    data () {
      return {
        taskList: [
          {
            checked: false,
            task: 'hoge'
          },
          {
            checked: true,
            task: 'hogehoge'
          }
        ],
        form: {
          taskName: ''
        },
        dialogFormVisible: false,
        formLabelWidth: '120px',
        multipleSelection: []
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      insertTask () {
        this.taskList.push({checked: false, task: this.form.taskName})
        this.form.taskName = ''
        this.dialogFormVisible = false
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
  .el-menu {
    position: fixed;
    z-index: 999;
  }
</style>
