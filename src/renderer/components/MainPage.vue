<template>
  <el-container>
    <el-aside width="70px">
      <el-menu default-active="1" style="height: 100vh;" :collapse="true">
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">menu</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="daterange-picker">
          <el-date-picker
            v-model="date"
            type="date"
            placeholder="Pick a date"
            v-on:change="setDate(date)">
          </el-date-picker>
        </div>
      </el-header>
      <el-main>
        <task-card v-bind:mDate="mDate"></task-card>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import TaskCard from './TaskCard'
  import moment from 'moment'
  export default {
    name: 'main-page',
    components: { TaskCard },
    data () {
      return {
        taskList: [],
        mDate: {},
        date: ''
      }
    },
    mounted () {
      let self = this
      this.setDate(self.$cutTime(new Date()))
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      setDate (date) {
        this.mDate = moment(date)
        this.date = date
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
  .el-date-editor .el-range-separator {
    width: auto;
  }
  .daterange-picker {
    margin-top: 20px;
  }
</style>
